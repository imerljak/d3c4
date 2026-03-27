import * as d3 from 'd3';
import type { StructurizrWorkspace, DiagramView, ContainerView, ComponentView } from '@d3c4/types';
import { WorkspaceParser } from '../parser/WorkspaceParser.js';
import { ViewSelector } from '../parser/ViewSelector.js';
import { SvgCanvas } from './SvgCanvas.js';
import type { ResolvedElement, ResolvedRelationship, ResolvedWorkspace } from '../parser/types.js';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ForceRendererOptions {
  viewKey: string;
  zoom?: boolean;
  pan?: boolean;
  minZoom?: number;
  maxZoom?: number;
  onElementClick?: (element: ResolvedElement) => void;
  onNavigate?: (viewKey: string) => void;
}

interface ForceNode extends d3.SimulationNodeDatum {
  id: string;
  element: ResolvedElement;
  radius: number;
}

interface ForceLink extends d3.SimulationLinkDatum<ForceNode> {
  id: string;
  relationship: ResolvedRelationship;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const RADIUS_BY_TYPE: Record<string, number> = {
  Person: 30,
  SoftwareSystem: 24,
  Container: 20,
  Component: 16,
};

function nodeRadius(el: ResolvedElement): number {
  return RADIUS_BY_TYPE[el.type] ?? 20;
}

/**
 * Clips a line between two circle centres so it starts/ends at the circle edges.
 * Adds `arrowGap` extra shortening at the target side for the arrowhead.
 */
function clipToCircle(
  sx: number, sy: number, sr: number,
  tx: number, ty: number, tr: number,
  arrowGap = 8,
): { x1: number; y1: number; x2: number; y2: number } {
  const dx = tx - sx;
  const dy = ty - sy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: sx + ux * sr,
    y1: sy + uy * sr,
    x2: tx - ux * (tr + arrowGap),
    y2: ty - uy * (tr + arrowGap),
  };
}

/** Returns the view key to drill into for an element, or null if none exists. */
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

// ─── ForceRenderer ───────────────────────────────────────────────────────────

/**
 * Force-directed graph renderer. Parallel to `Renderer` but uses D3 force
 * simulation instead of dagre — nodes are circles, drag feeds the physics.
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
  private svgCanvas: SvgCanvas | null = null;
  private simulation: d3.Simulation<ForceNode, ForceLink> | null = null;
  private tooltip: HTMLDivElement | null = null;

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
    if (!this.resolved || !this.svgCanvas) return;

    try {
      const resolvedView = this.viewSelector.select(this.resolved, this.currentViewKey);
      const canvas = this.svgCanvas.canvas;

      this.simulation?.stop();

      // ── Build simulation data ──────────────────────────────────────────────

      const forceNodes: ForceNode[] = resolvedView.elements
        .filter((e) => !e.boundary)
        .map((el) => ({ id: el.id, element: el, radius: nodeRadius(el) }));

      const nodeById = new Map(forceNodes.map((n) => [n.id, n]));

      const forceLinks: ForceLink[] = resolvedView.relationships
        .filter((r) => nodeById.has(r.sourceId) && nodeById.has(r.destinationId))
        .map((r) => ({
          id: r.id,
          source: r.sourceId,
          target: r.destinationId,
          relationship: r,
        }));

      // ── DOM ───────────────────────────────────────────────────────────────

      canvas.selectAll('.force-links, .force-nodes').remove();
      const linkLayer = canvas.append('g').attr('class', 'force-links');
      const nodeLayer = canvas.append('g').attr('class', 'force-nodes');

      // Links — plain <line> elements, clipped to circle edges in tick
      const links = linkLayer
        .selectAll<SVGLineElement, ForceLink>('line')
        .data(forceLinks, (d) => d.id)
        .enter()
        .append('line')
        .attr('fill', 'none')
        .attr('stroke', (d) => d.relationship.style.color)
        .attr('stroke-width', (d) => d.relationship.style.thickness * 0.5)
        .attr('stroke-dasharray', (d) => (d.relationship.style.dashed ? '6,3' : 'none'))
        .attr('marker-end', (d) =>
          this.svgCanvas!.getArrowMarkerUrl(d.relationship.style.color),
        );

      // Nodes — <g> containing circle + labels
      const nodeGroups = nodeLayer
        .selectAll<SVGGElement, ForceNode>('.force-node')
        .data(forceNodes, (d) => d.id)
        .enter()
        .append('g')
        .attr('class', 'force-node')
        .attr('data-id', (d) => d.id)
        .style('cursor', 'grab');

      nodeGroups
        .append('circle')
        .attr('r', (d) => d.radius)
        .attr('fill', (d) => d.element.style.background);

      const labelG = nodeGroups.append('g');

      labelG
        .append('text')
        .attr('x', (d) => d.radius + 8)
        .attr('y', -5)
        .attr('font-family', 'sans-serif')
        .attr('font-size', 13)
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text((d) => d.element.name);

      labelG
        .append('text')
        .attr('x', (d) => d.radius + 8)
        .attr('y', 9)
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('fill', '#666')
        .text((d) => {
          const t = d.element.type === 'SoftwareSystem' ? 'Software System' : d.element.type;
          return `[${t}]`;
        });

      // ── Interactions ──────────────────────────────────────────────────────

      // Highlight: clicked node + direct neighbours; dim everything else.
      const highlight = (focusId: string | null) => {
        if (!focusId) {
          nodeGroups.style('opacity', null);
          links.style('opacity', null);
          return;
        }
        const neighbourIds = new Set<string>([focusId]);
        forceLinks.forEach((l) => {
          const s = (l.source as ForceNode).id;
          const t = (l.target as ForceNode).id;
          if (s === focusId) neighbourIds.add(t);
          if (t === focusId) neighbourIds.add(s);
        });
        nodeGroups.style('opacity', (d) => (neighbourIds.has(d.id) ? null : '0.15'));
        links.style('opacity', (l) => {
          const s = (l.source as ForceNode).id;
          const t = (l.target as ForceNode).id;
          return s === focusId || t === focusId ? null : '0.1';
        });
      };

      // Click node → highlight; click background → clear
      nodeGroups.on('click', (event, d) => {
        event.stopPropagation();
        const already = nodeGroups.filter((n) => n.id === d.id).classed('focused');
        nodeGroups.classed('focused', false);
        if (!already) {
          d3.select(event.currentTarget as SVGGElement).classed('focused', true);
          highlight(d.id);
        } else {
          highlight(null);
        }
        this.options.onElementClick?.(d.element);
      });

      this.svgCanvas!.svg.on('click.highlight', () => {
        nodeGroups.classed('focused', false);
        highlight(null);
      });

      // Hover tooltip — show on enter, update position on move, hide on leave
      nodeGroups
        .on('mouseenter', (_event, d) => {
          this.showTooltip(d.element, d.x ?? 0, d.y ?? 0);
        })
        .on('mousemove', (_event, d) => {
          this.showTooltip(d.element, d.x ?? 0, d.y ?? 0);
        })
        .on('mouseleave', () => {
          this.hideTooltip();
        });

      // Drag — heats/cools simulation; fixes node while dragging
      const sim = () => this.simulation;
      nodeGroups.call(
        d3.drag<SVGGElement, ForceNode>()
          .on('start', function (event, d) {
            event.sourceEvent.stopPropagation();
            if (!event.active) sim()?.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            d3.select(this).style('cursor', 'grabbing');
          })
          .on('drag', (_event, d) => {
            d.fx = _event.x;
            d.fy = _event.y;
          })
          .on('end', function (event, d) {
            if (!event.active) sim()?.alphaTarget(0);
            d.fx = null;
            d.fy = null;
            d3.select(this).style('cursor', 'grab');
          }),
      );

      // Navigation — double-click to drill into related view
      const views = this.resolved!.views;
      const navigate = (key: string) => {
        this.render(key);
        this.options.onNavigate?.(key);
      };
      nodeGroups.each(function (d) {
        const targetKey = findDrillDownView(d.element, views);
        if (!targetKey) return;
        d3.select(this)
          .style('cursor', 'zoom-in')
          .on('dblclick.navigate', (event) => {
            event.stopPropagation();
            navigate(targetKey);
          });
      });

      // ── Force simulation ──────────────────────────────────────────────────

      const w = this.container.clientWidth || 800;
      const h = this.container.clientHeight || 600;

      const nodeCount = forceNodes.length;

      this.simulation = d3
        .forceSimulation<ForceNode>(forceNodes)
        .force(
          'link',
          d3.forceLink<ForceNode, ForceLink>(forceLinks)
            .id((d) => d.id)
            .distance((_, __, links) => 150 + (links.length * 10))
            // .distance(nodeCount > 50 ? 80 : 150),
        )
        .force('charge', d3.forceManyBody<ForceNode>().strength(-1000).distanceMax(500))
        // .force('center', d3.forceCenter(w / 2, h / 2))
        .force('x', d3.forceX(w / 2).strength(0.05))
        .force('y', d3.forceY(h / 2).strength(0.05))
        .force('collide', d3.forceCollide<ForceNode>().radius((d) => d.radius + 10))
        .on('tick', () => {
          links.each(function (d) {
            const s = d.source as ForceNode;
            const t = d.target as ForceNode;
            const { x1, y1, x2, y2 } = clipToCircle(
              s.x ?? 0, s.y ?? 0, s.radius,
              t.x ?? 0, t.y ?? 0, t.radius,
            );
            d3.select(this)
              .attr('x1', x1).attr('y1', y1)
              .attr('x2', x2).attr('y2', y2);
          });

          nodeGroups.attr('transform', (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
        })
        // .alphaDecay(0.02);
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
    this.simulation?.stop();
    this.simulation = null;
    this.svgCanvas?.destroy();
    this.svgCanvas = null;
    this.resolved = null;
    this.tooltip?.remove();
    this.tooltip = null;
  }

  private init(): void {
    this.resolved = this.parser.parse(this.workspace);
    this.svgCanvas = new SvgCanvas(this.container, {
      zoom: this.options.zoom,
      pan: this.options.pan,
      minZoom: this.options.minZoom,
      maxZoom: this.options.maxZoom,
    });
    this.createTooltip();
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
    // Container must be position:relative/absolute for absolute child to work
    if (getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }
    this.container.appendChild(tip);
    this.tooltip = tip;
  }

  private showTooltip(el: ResolvedElement, nodeX: number, nodeY: number): void {
    const tip = this.tooltip;
    if (!tip) return;

    const bg = el.style.background;
    const fg = el.style.color || '#ffffff';

    // Build badge label
    const typeLabel = el.type === 'SoftwareSystem' ? 'Software System' : el.type;
    const tech = (el as { technology?: string }).technology;
    const badgeText = tech ? `[${typeLabel}: ${tech}]` : `[${typeLabel}]`;

    // Tags as pills
    const tagPills = (el.tags ?? [])
      .map((tag) => `<span style="color:white;display:inline-block;margin:2px 3px 2px 0;padding:3px 8px;border:1px solid ${fg};border-radius:4px;font-size:11px;opacity:0.85">${tag}</span>`)
      .join('');

    tip.innerHTML = `
      <div style="font-size:17px;font-weight:700;color:${fg};margin-bottom:4px">${el.name}</div>
      <div style="font-size:12px;color:${fg};opacity:0.75;margin-bottom:${el.description ? '10px' : '0'}">${badgeText}</div>
      ${el.description ? `<div style="font-size:13px;color:${fg};opacity:0.9;margin-bottom:${tagPills ? '10px' : '0'};line-height:1.45">${el.description}</div>` : ''}
      ${tagPills ? `<div style="margin-top:2px">${tagPills}</div>` : ''}
    `;
    tip.style.background = bg;
    tip.style.display = 'block';

    // Position: offset right of the node, clamped within container
    const svgEl = this.svgCanvas!.svg.node()!;
    const svgRect = svgEl.getBoundingClientRect();
    const cRect = this.container.getBoundingClientRect();

    // nodeX/nodeY are in SVG canvas coords; get current transform to convert to screen
    const canvasNode = this.svgCanvas!.canvas.node()!;
    const ctm = canvasNode.getScreenCTM();
    if (!ctm) return;

    const screenX = ctm.a * nodeX + ctm.c * nodeY + ctm.e - cRect.left;
    const screenY = ctm.b * nodeX + ctm.d * nodeY + ctm.f - cRect.top;

    const GAP = 16;
    let left = screenX + GAP;
    let top = screenY - tip.offsetHeight / 2;

    // Clamp so panel stays inside the container
    const maxLeft = this.container.clientWidth - tip.offsetWidth - 8;
    const maxTop = this.container.clientHeight - tip.offsetHeight - 8;
    if (left > maxLeft) left = screenX - tip.offsetWidth - GAP;
    left = Math.max(8, left);
    top = Math.max(8, Math.min(top, maxTop));

    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  }

  private hideTooltip(): void {
    if (this.tooltip) this.tooltip.style.display = 'none';
  }
}
