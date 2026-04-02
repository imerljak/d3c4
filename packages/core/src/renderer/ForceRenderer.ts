/**
 * ForceRenderer — JointJS-backed force-directed graph renderer.
 *
 * Replaces the D3 implementation. Internals:
 *   - dia.Graph + dia.Paper  — render layer (replaces SvgCanvas + d3-selection)
 *   - SpringForce            — custom spring/charge/collision physics (replaces d3-force)
 *   - JointJS native drag    — paper interactive mode (replaces d3-drag)
 *
 * Public API is unchanged from the D3 version:
 *   new ForceRenderer(container, workspace, { viewKey })
 *   .render(viewKey?)  .update(workspace)  .destroy()
 */

import { dia } from 'jointjs';
import type { StructurizrWorkspace, DiagramView, ContainerView, ComponentView } from '@d3c4/types';
import { WorkspaceParser } from '../parser/WorkspaceParser.js';
import { ViewSelector } from '../parser/ViewSelector.js';
import type { ResolvedElement, ResolvedRelationship, ResolvedWorkspace } from '../parser/types.js';

// ─── Public API (unchanged) ───────────────────────────────────────────────────

export interface ForceRendererOptions {
  viewKey: string;
  zoom?: boolean;
  pan?: boolean;
  minZoom?: number;
  maxZoom?: number;
  onElementClick?: (element: ResolvedElement) => void;
  onNavigate?: (viewKey: string) => void;
}

// ─── Internal types ───────────────────────────────────────────────────────────

interface PhysicsNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  resolvedElement: ResolvedElement;
  cell: dia.Element;
}

interface PhysicsLink {
  id: string;
  source: PhysicsNode;
  target: PhysicsNode;
  relationship: ResolvedRelationship;
  cell: dia.Link;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RADIUS_BY_TYPE: Record<string, number> = {
  Person: 30,
  SoftwareSystem: 24,
  Container: 20,
  Component: 16,
};

function nodeRadius(el: ResolvedElement): number {
  return RADIUS_BY_TYPE[el.type] ?? 20;
}

function findDrillDownView(element: ResolvedElement, views: DiagramView[]): string | null {
  if (element.type === 'SoftwareSystem') {
    const v = views.find(
      (v): v is ContainerView => v.type === 'Container' && v.softwareSystemId === element.id,
    );
    return v?.key ?? null;
  }
  if (element.type === 'Container') {
    const v = views.find(
      (v): v is ComponentView => v.type === 'Component' && v.containerId === element.id,
    );
    return v?.key ?? null;
  }
  return null;
}

// ─── SpringForce physics ──────────────────────────────────────────────────────

/**
 * Minimal spring-force physics simulator — replaces d3-force.
 *
 * Four forces applied per tick:
 *   1. Many-body repulsion  — pairwise Coulomb-like charge force
 *   2. Link spring          — Hooke attraction toward rest length
 *   3. Gravity              — soft centering toward (centerX, centerY)
 *   4. Collision            — prevents circle overlap
 *
 * Alpha (simulation heat) decays from 1 to 0 over ~300 ticks.
 * Dragged nodes are synced from their JointJS cell position rather than
 * being integrated, so JointJS's native drag remains in control.
 */
class SpringForce {
  nodes: PhysicsNode[] = [];
  links: PhysicsLink[] = [];
  centerX = 400;
  centerY = 300;
  linkRestDistance = 150;
  chargeStrength = -800;
  gravityStrength = 0.05;
  collisionPadding = 10;

  /** IDs of nodes currently being dragged by the user. */
  readonly dragging = new Set<string>();

  private alpha = 1.0;
  private alphaTarget_ = 0.0;
  // Decay rate: alpha reaches ~0.001 in ~300 ticks
  private readonly alphaDecay = 1 - Math.pow(0.001, 1 / 300);
  // Each step velocity is multiplied by (1 - velocityDecay) = 0.6
  private readonly velocityDecay = 0.4;
  private animFrame: number | null = null;
  private tickCallback: (() => void) | null = null;

  onTick(fn: () => void): this {
    this.tickCallback = fn;
    return this;
  }

  alphaTarget(value: number): this {
    this.alphaTarget_ = value;
    return this;
  }

  restart(): this {
    // Heat up if currently cooler than target
    if (this.alpha < this.alphaTarget_) this.alpha = this.alphaTarget_;
    this.schedule();
    return this;
  }

  stop(): this {
    if (this.animFrame !== null) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = null;
    }
    return this;
  }

  private schedule(): void {
    if (this.animFrame === null) {
      this.animFrame = requestAnimationFrame(() => {
        this.animFrame = null;
        this.tick();
        if (this.alpha >= 0.001) this.schedule();
      });
    }
  }

  private tick(): void {
    const nodes = this.nodes;
    const n = nodes.length;

    // Cool alpha toward target
    this.alpha += (this.alphaTarget_ - this.alpha) * this.alphaDecay;
    const a = this.alpha;

    // 1. Many-body repulsion — O(n²), sufficient for C4 graph sizes
    for (let i = 0; i < n; i++) {
      const ni = nodes[i]!;
      for (let j = i + 1; j < n; j++) {
        const nj = nodes[j]!;
        const dx = nj.x - ni.x;
        const dy = nj.y - ni.y;
        const d2 = dx * dx + dy * dy || 1;
        const d = Math.sqrt(d2);
        const f = (this.chargeStrength * a) / d2;
        const ux = dx / d;
        const uy = dy / d;
        ni.vx += f * ux;
        ni.vy += f * uy;
        nj.vx -= f * ux;
        nj.vy -= f * uy;
      }
    }

    // 2. Link spring — pulls connected nodes toward rest distance
    for (const lk of this.links) {
      const s = lk.source;
      const t = lk.target;
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const rest = this.linkRestDistance + s.radius + t.radius;
      const f = ((d - rest) / d) * a;
      s.vx += dx * f;
      s.vy += dy * f;
      t.vx -= dx * f;
      t.vy -= dy * f;
    }

    // 3. Gravity — soft pull toward center
    const gs = this.gravityStrength * a;
    for (const nd of nodes) {
      nd.vx += (this.centerX - nd.x) * gs;
      nd.vy += (this.centerY - nd.y) * gs;
    }

    // 4. Collision — push overlapping circles apart
    for (let i = 0; i < n; i++) {
      const ni = nodes[i]!;
      for (let j = i + 1; j < n; j++) {
        const nj = nodes[j]!;
        const dx = nj.x - ni.x;
        const dy = nj.y - ni.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const minD = ni.radius + nj.radius + this.collisionPadding;
        if (d < minD) {
          const ov = ((minD - d) / d) * 0.5 * a;
          ni.vx -= dx * ov;
          ni.vy -= dy * ov;
          nj.vx += dx * ov;
          nj.vy += dy * ov;
        }
      }
    }

    // 5. Velocity integration
    const vRetain = 1 - this.velocityDecay;
    for (const nd of nodes) {
      if (this.dragging.has(nd.id)) {
        // Dragged node: read position from JointJS (which is managing it)
        const pos = nd.cell.position();
        nd.x = pos.x + nd.radius;
        nd.y = pos.y + nd.radius;
        nd.vx = 0;
        nd.vy = 0;
      } else {
        nd.vx *= vRetain;
        nd.vy *= vRetain;
        nd.x += nd.vx;
        nd.y += nd.vy;
        // Sync JointJS element position from physics
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (nd.cell as any).set('position', { x: nd.x - nd.radius, y: nd.y - nd.radius });
      }
    }

    this.tickCallback?.();
  }
}

// ─── ForceRenderer ────────────────────────────────────────────────────────────

/**
 * Force-directed graph renderer. Parallel to `Renderer` but uses a custom
 * spring force simulation instead of dagre — nodes are circles, drag feeds
 * the physics.
 *
 * Usage:
 * ```ts
 * const fr = new ForceRenderer(container, workspace, { viewKey: 'Containers' });
 * fr.update(newWorkspace);
 * fr.destroy();
 * ```
 */
export class ForceRenderer {
  private container: HTMLElement;
  private workspace: StructurizrWorkspace;
  private options: ForceRendererOptions;
  private currentViewKey: string;
  private resolved: ResolvedWorkspace | null = null;

  private parser: WorkspaceParser;
  private viewSelector: ViewSelector;
  private graph: dia.Graph | null = null;
  private paper: dia.Paper | null = null;
  private physics: SpringForce | null = null;
  private tooltip: HTMLDivElement | null = null;

  private physicsNodes: PhysicsNode[] = [];
  private physicsLinks: PhysicsLink[] = [];
  private nodeById = new Map<string, PhysicsNode>();
  private focusedId: string | null = null;

  /** Current zoom scale, maintained for tooltip positioning. */
  private scale = 1.0;

  constructor(
    container: HTMLElement,
    workspace: StructurizrWorkspace,
    options: ForceRendererOptions,
  ) {
    this.container = container;
    this.workspace = workspace;
    this.options = options;
    this.currentViewKey = options.viewKey;
    this.parser = new WorkspaceParser();
    this.viewSelector = new ViewSelector();
    this.init();
    this.render(options.viewKey);
  }

  render(viewKey?: string): void {
    if (viewKey) this.currentViewKey = viewKey;
    if (!this.resolved || !this.graph || !this.paper) return;

    try {
      const resolvedView = this.viewSelector.select(this.resolved, this.currentViewKey);

      this.physics?.stop();
      this.graph.clear();
      this.physicsNodes = [];
      this.physicsLinks = [];
      this.nodeById.clear();
      this.focusedId = null;

      const w = this.container.clientWidth || 800;
      const h = this.container.clientHeight || 600;

      // ── Build nodes ────────────────────────────────────────────────────────

      const elements = resolvedView.elements.filter((e) => !e.boundary);

      for (const el of elements) {
        const r = nodeRadius(el);
        // Scatter initial positions randomly so the physics has work to do
        const angle = Math.random() * Math.PI * 2;
        const spread = 50 + Math.random() * 100;
        const x = w / 2 + Math.cos(angle) * spread;
        const y = h / 2 + Math.sin(angle) * spread;

        const typeLabel = el.type === 'SoftwareSystem' ? 'Software System' : el.type;
        const tech = (el as { technology?: string }).technology;
        const badgeText = tech ? `[${typeLabel}: ${tech}]` : `[${typeLabel}]`;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cell = new dia.Element({
          position: { x: x - r, y: y - r },
          size: { width: r * 2, height: r * 2 },
          markup: [
            { tagName: 'circle', selector: 'body' },
            { tagName: 'text',   selector: 'nameLabel' },
            { tagName: 'text',   selector: 'typeLabel' },
          ],
          attrs: {
            body: {
              cx: r,
              cy: r,
              r,
              fill: el.style.background,
              stroke: 'none',
            },
            nameLabel: {
              text:       el.name,
              x:          r * 2 + 8,
              y:          r - 5,
              fontFamily: 'sans-serif',
              fontSize:   13,
              fontWeight: 'bold',
              fill:       '#333',
              textAnchor: 'start',
            },
            typeLabel: {
              text:       badgeText,
              x:          r * 2 + 8,
              y:          r + 9,
              fontFamily: 'sans-serif',
              fontSize:   10,
              fill:       '#666',
              textAnchor: 'start',
            },
          },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);

        this.graph.addCell(cell);

        const node: PhysicsNode = {
          id: el.id, x, y, vx: 0, vy: 0, radius: r, resolvedElement: el, cell,
        };
        this.physicsNodes.push(node);
        this.nodeById.set(el.id, node);
      }

      // ── Build links ────────────────────────────────────────────────────────

      for (const rel of resolvedView.relationships) {
        const source = this.nodeById.get(rel.sourceId);
        const target = this.nodeById.get(rel.destinationId);
        if (!source || !target) continue;

        const link = new dia.Link({
          source: { id: source.cell.id },
          target: { id: target.cell.id },
          attrs: {
            line: {
              stroke:          rel.style.color,
              strokeWidth:     rel.style.thickness * 0.5,
              strokeDasharray: rel.style.dashed ? '6,3' : 'none',
              targetMarker: {
                type:   'path',
                d:      'M 8 -4 0 0 8 4 z',
                fill:   rel.style.color,
                stroke: 'none',
              },
            },
          },
          router:    { name: 'straight' },
          connector: { name: 'straight' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);

        this.graph.addCell(link);
        this.physicsLinks.push({ id: rel.id, source, target, relationship: rel, cell: link });
      }

      // ── Start physics ──────────────────────────────────────────────────────

      const physics = new SpringForce();
      physics.nodes = this.physicsNodes;
      physics.links = this.physicsLinks;
      physics.centerX = w / 2;
      physics.centerY = h / 2;
      this.physics = physics;
      physics.restart();

      this.attachPaperEvents();

    } catch (err) {
      console.error('[d3c4] ForceRenderer error:', err);
    }
  }

  update(workspace: StructurizrWorkspace): void {
    this.workspace = workspace;
    this.resolved = this.parser.parse(workspace);
    this.render(this.currentViewKey);
  }

  destroy(): void {
    this.physics?.stop();
    this.physics = null;
    this.graph?.clear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.paper as any)?.remove();
    this.paper = null;
    this.graph = null;
    this.resolved = null;
    this.tooltip?.remove();
    this.tooltip = null;
  }

  private init(): void {
    this.resolved = this.parser.parse(this.workspace);

    // Ensure container is positioned so absolute tooltip child works
    if (getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }

    this.graph = new dia.Graph();
    this.paper = new dia.Paper({
      el: this.container,
      model: this.graph,
      width:  this.container.clientWidth  || 800,
      height: this.container.clientHeight || 600,
      background: { color: '#ffffff' },
      // Allow element drag; prevent accidental link creation from magnets
      interactive: { elementMove: true, addLinkFromMagnet: false },
      gridSize: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    this.setupZoom();
    this.createTooltip();
  }

  /** Attach mouse-wheel zoom to the container. */
  private setupZoom(): void {
    if (this.options.zoom === false) return;
    const min = this.options.minZoom ?? 0.1;
    const max = this.options.maxZoom ?? 4.0;

    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      this.scale = Math.max(min, Math.min(max, this.scale * factor));
      this.paper?.scale(this.scale, this.scale);
    }, { passive: false });
  }

  /**
   * Wire up Paper events for drag, click, hover, and navigation.
   * Called after each render() so the current physicsNodes/Links are in scope.
   */
  private attachPaperEvents(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paper = this.paper as any;
    const physics = this.physics!;

    // Remove previously registered listeners to avoid duplicates
    paper.off('element:pointerdown element:pointerup element:click element:dblclick element:mouseenter element:mouseleave blank:click');

    const cellId = (view: unknown) => String((view as any).model?.id ?? '');

    // ── Drag: heat/cool physics coupled to user interaction ────────────────

    paper.on('element:pointerdown', (view: unknown) => {
      const node = this.findNode(cellId(view));
      if (node) {
        physics.dragging.add(node.id);
        physics.alphaTarget(0.3).restart();
      }
    });

    paper.on('element:pointerup', (view: unknown) => {
      const node = this.findNode(cellId(view));
      if (node) {
        physics.dragging.delete(node.id);
        physics.alphaTarget(0);
      }
    });

    // ── Click: toggle neighbor highlighting ────────────────────────────────

    paper.on('element:click', (view: unknown) => {
      const node = this.findNode(cellId(view));
      if (!node) return;

      if (this.focusedId === node.id) {
        this.focusedId = null;
        this.highlight(null);
      } else {
        this.focusedId = node.id;
        this.highlight(node.id);
      }
      this.options.onElementClick?.(node.resolvedElement);
    });

    paper.on('blank:click', () => {
      this.focusedId = null;
      this.highlight(null);
    });

    // ── Hover: tooltip ─────────────────────────────────────────────────────

    paper.on('element:mouseenter', (view: unknown) => {
      const node = this.findNode(cellId(view));
      if (node) this.showTooltip(node.resolvedElement, node.x, node.y);
    });

    paper.on('element:mouseleave', () => this.hideTooltip());

    // ── Double-click: drill-down navigation ───────────────────────────────

    paper.on('element:pointerdblclick', (view: unknown) => {
      const node = this.findNode(cellId(view));
      if (!node) return;
      const key = findDrillDownView(node.resolvedElement, this.resolved!.views);
      if (key) {
        this.render(key);
        this.options.onNavigate?.(key);
      }
    });
  }

  private findNode(cellId: string): PhysicsNode | null {
    return this.physicsNodes.find((n) => (n.cell.id as string) === cellId) ?? null;
  }

  /** Dim all non-neighboring nodes and links; pass null to clear highlighting. */
  private highlight(focusId: string | null): void {
    const setOpacity = (cell: dia.Cell, opacity: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const v = (this.paper as any).findViewByModel(cell);
      if (v?.el) (v.el as HTMLElement).style.opacity = opacity;
    };

    if (!focusId) {
      for (const n of this.physicsNodes) setOpacity(n.cell, '');
      for (const l of this.physicsLinks) setOpacity(l.cell, '');
      return;
    }

    const neighbors = new Set([focusId]);
    for (const l of this.physicsLinks) {
      if (l.source.id === focusId) neighbors.add(l.target.id);
      if (l.target.id === focusId) neighbors.add(l.source.id);
    }

    for (const n of this.physicsNodes) {
      setOpacity(n.cell, neighbors.has(n.id) ? '' : '0.15');
    }
    for (const l of this.physicsLinks) {
      const isAdj = l.source.id === focusId || l.target.id === focusId;
      setOpacity(l.cell, isAdj ? '' : '0.1');
    }
  }

  private createTooltip(): void {
    this.tooltip?.remove();
    const tip = document.createElement('div');
    tip.style.cssText = [
      'position:absolute',
      'pointer-events:none',
      'display:none',
      'max-width:260px',
      'padding:14px 16px',
      'border-radius:8px',
      'box-shadow:0 4px 20px rgba(0,0,0,0.25)',
      'z-index:100',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    ].join(';');
    this.container.appendChild(tip);
    this.tooltip = tip;
  }

  private showTooltip(el: ResolvedElement, nodeX: number, nodeY: number): void {
    const tip = this.tooltip;
    if (!tip) return;

    const fg = el.style.color || '#ffffff';
    const typeLabel = el.type === 'SoftwareSystem' ? 'Software System' : el.type;
    const tech = (el as { technology?: string }).technology;
    const badgeText = tech ? `[${typeLabel}: ${tech}]` : `[${typeLabel}]`;
    const tagPills = (el.tags ?? [])
      .map((tag) => `<span style="color:white;display:inline-block;margin:2px 3px 2px 0;padding:3px 8px;border:1px solid ${fg};border-radius:4px;font-size:11px;opacity:0.85">${tag}</span>`)
      .join('');

    tip.innerHTML = `
      <div style="font-size:17px;font-weight:700;color:${fg};margin-bottom:4px">${el.name}</div>
      <div style="font-size:12px;color:${fg};opacity:0.75;margin-bottom:${el.description ? '10px' : '0'}">${badgeText}</div>
      ${el.description ? `<div style="font-size:13px;color:${fg};opacity:0.9;margin-bottom:${tagPills ? '10px' : '0'};line-height:1.45">${el.description}</div>` : ''}
      ${tagPills ? `<div style="margin-top:2px">${tagPills}</div>` : ''}
    `;
    tip.style.background = el.style.background;
    tip.style.display = 'block';

    // Position tooltip to the right of the node, clamped within container
    const r = this.physicsNodes.find((n) => n.resolvedElement === el)?.radius ?? 20;
    const GAP = 16;
    const left = (nodeX + r) * this.scale + GAP;
    const top  = nodeY * this.scale - tip.offsetHeight / 2;
    const maxLeft = this.container.clientWidth  - tip.offsetWidth  - 8;
    const maxTop  = this.container.clientHeight - tip.offsetHeight - 8;
    tip.style.left = `${Math.max(8, Math.min(left, maxLeft))}px`;
    tip.style.top  = `${Math.max(8, Math.min(top,  maxTop))}px`;
  }

  private hideTooltip(): void {
    if (this.tooltip) this.tooltip.style.display = 'none';
  }
}
