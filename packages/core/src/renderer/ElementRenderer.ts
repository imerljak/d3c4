import { dia } from 'jointjs';
import type { LayoutNode } from '../layout/types.js';
import type { ResolvedElement } from '../parser/types.js';
import { createShapeCell, createBoundaryCell, type ShapeContent } from './ShapeRegistry.js';

export interface ElementRendererOptions {
  onElementClick?: (element: ResolvedElement) => void;
}

/**
 * Renders C4 elements as JointJS `dia.Element` cells.
 *
 * Each call to `render()` synchronises the graph to the new layout:
 *   - Existing cells whose IDs are no longer present are removed.
 *   - New cells are created with `node.id` as the stable cell ID.
 *   - Cells that already exist are repositioned in place.
 *
 * This replaces the D3 general-update-pattern from the previous implementation.
 */
export class ElementRenderer {
  private readonly graph: dia.Graph;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly paper: any; // dia.Paper
  private readonly options: ElementRendererOptions;

  /** IDs of cells currently owned by this renderer (elements + boundaries). */
  private ownedIds = new Set<string>();
  /** Maps cell ID → ResolvedElement for click callback lookup. */
  private elementById = new Map<string, ResolvedElement>();

  constructor(
    graph: dia.Graph,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paper: any,
    options: ElementRendererOptions = {},
  ) {
    this.graph = graph;
    this.paper = paper;
    this.options = options;
  }

  render(nodes: LayoutNode[], boundaries: Array<{ element: ResolvedElement }>): void {
    this.renderBoundaries(boundaries, nodes);
    this.renderNodes(nodes);
    this.attachClickHandler();
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private renderBoundaries(
    boundaries: Array<{ element: ResolvedElement }>,
    nodes: LayoutNode[],
  ): void {
    // Remove boundaries not in this render
    const nextBoundaryIds = new Set(boundaries.map((b) => `boundary-${b.element.name}`));
    for (const id of [...this.ownedIds]) {
      if (id.startsWith('boundary-') && !nextBoundaryIds.has(id)) {
        this.graph.getCell(id)?.remove();
        this.ownedIds.delete(id);
      }
    }

    for (const { element } of boundaries) {
      const id = `boundary-${element.name}`;
      const existing = this.graph.getCell(id);
      if (existing) {
        // Recompute and update the boundary rect
        existing.remove();
        this.ownedIds.delete(id);
      }
      const cell = createBoundaryCell(element, nodes);
      if (cell) {
        this.graph.addCell(cell);
        this.ownedIds.add(id);
      }
    }
  }

  private renderNodes(nodes: LayoutNode[]): void {
    const nextIds = new Set(nodes.map((n) => n.id));

    // Remove cells for elements no longer in the view
    for (const id of [...this.ownedIds]) {
      if (!id.startsWith('boundary-') && !nextIds.has(id)) {
        this.graph.getCell(id)?.remove();
        this.ownedIds.delete(id);
      }
    }

    for (const node of nodes) {
      const content = nodeToContent(node);
      const existing = this.graph.getCell(node.id) as dia.Element | undefined;

      if (existing) {
        // Reposition without full recreation (preserves any embedded state)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (existing as any).set({
          position: { x: node.x - node.width  / 2, y: node.y - node.height / 2 },
          size:     { width: node.width, height: node.height },
        });
      } else {
        const cell = createShapeCell(node, content);
        this.graph.addCell(cell);
        this.ownedIds.add(node.id);
      }
      this.elementById.set(node.id, node.element);
    }
  }

  /**
   * Wire the element:click Paper event to the onElementClick callback.
   * Called on every render to refresh the handler's node lookup.
   */
  private attachClickHandler(): void {
    if (!this.options.onElementClick) return;
    this.paper.off('element:click.d3c4-element');
    this.paper.on('element:click.d3c4-element', (view: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cellId = String((view as any).model?.id ?? '');
      if (!this.ownedIds.has(cellId) || cellId.startsWith('boundary-')) return;
      const el = this.elementById.get(cellId);
      if (el) this.options.onElementClick!(el);
    });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildTypeBadge(element: ResolvedElement): string | null {
  if (element.type === 'Person')         return '[Person]';
  if (element.type === 'SoftwareSystem') return '[Software System]';
  if (element.type === 'Container') {
    return element.technology ? `[Container: ${element.technology}]` : '[Container]';
  }
  if (element.type === 'Component') {
    return element.technology ? `[Component: ${element.technology}]` : '[Component]';
  }
  return null;
}

function nodeToContent(node: LayoutNode): ShapeContent {
  return {
    badge:       buildTypeBadge(node.element),
    name:        node.element.name,
    description: node.element.description,
    style:       node.element.style,
  };
}
