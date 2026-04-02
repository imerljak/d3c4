import { dia } from 'jointjs';
import type { LayoutEdge } from '../layout/types.js';
import type { ResolvedRelationship } from '../parser/types.js';

export interface RelationshipRendererOptions {
  onRelationshipClick?: (rel: ResolvedRelationship) => void;
}

/**
 * Renders C4 relationships as JointJS `dia.Link` cells.
 *
 * Links use dagre waypoints from the layout engine, expressed as a
 * series of `vertices` on the link's `straight` router so the path
 * follows the pre-computed route.
 *
 * Replaces the previous D3-based implementation.
 */
export class RelationshipRenderer {
  private readonly graph: dia.Graph;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly paper: any; // dia.Paper
  private readonly options: RelationshipRendererOptions;

  /** IDs of link cells currently owned by this renderer. */
  private ownedIds = new Set<string>();
  /** Maps link cell ID → ResolvedRelationship for click callback. */
  private relById = new Map<string, ResolvedRelationship>();

  constructor(
    graph: dia.Graph,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paper: any,
    options: RelationshipRendererOptions = {},
  ) {
    this.graph = graph;
    this.paper = paper;
    this.options = options;
  }

  render(edges: LayoutEdge[]): void {
    const nextIds = new Set(edges.map((e) => `link-${e.id}`));

    // Remove links no longer in the view
    for (const id of [...this.ownedIds]) {
      if (!nextIds.has(id)) {
        this.graph.getCell(id)?.remove();
        this.ownedIds.delete(id);
        this.relById.delete(id);
      }
    }

    for (const edge of edges) {
      const linkId = `link-${edge.id}`;
      const style = edge.relationship.style;

      // Waypoints from dagre layout (first and last are the element positions —
      // skip them and use the intermediate points as JointJS vertices)
      const vertices = edge.points.slice(1, -1).map((p) => ({ x: p.x, y: p.y }));

      if (this.ownedIds.has(linkId)) {
        // Update vertices on re-render (source/target elements may have moved)
        const link = this.graph.getCell(linkId) as dia.Link;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (link as any).set('vertices', vertices);
      } else {
        const link = buildLink(linkId, edge, style, vertices);
        this.graph.addCell(link);
        this.ownedIds.add(linkId);
        this.relById.set(linkId, edge.relationship);
      }
    }

    this.attachClickHandler();
  }

  private attachClickHandler(): void {
    if (!this.options.onRelationshipClick) return;
    this.paper.off('link:click.d3c4-rel');
    this.paper.on('link:click.d3c4-rel', (view: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cellId = String((view as any).model?.id ?? '');
      const rel = this.relById.get(cellId);
      if (rel) this.options.onRelationshipClick!(rel);
    });
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function buildLink(
  id: string,
  edge: LayoutEdge,
  style: ResolvedRelationship['style'],
  vertices: Array<{ x: number; y: number }>,
): dia.Link {
  // VSCode WebView compatibility for marker URLs
  const markerFill = style.color;

  return new dia.Link({
    id,
    // Source and target by element ID (stable across re-renders)
    source: { id: edge.sourceId },
    target: { id: edge.destinationId },
    vertices,
    router:    { name: 'straight' },
    connector: { name: 'straight' },
    attrs: {
      line: {
        stroke:          style.color,
        strokeWidth:     style.thickness * 0.5,
        strokeDasharray: style.dashed ? '6,3' : 'none',
        targetMarker: {
          type:   'path',
          d:      'M 8 -4 0 0 8 4 z',
          fill:   markerFill,
          stroke: 'none',
        },
      },
      // Invisible wider hitbox for easier clicking
      wrapper: {
        stroke:      'transparent',
        strokeWidth: 12,
      },
    },
    // Label at midpoint
    labels: buildLabel(edge.relationship, style),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

function buildLabel(
  rel: ResolvedRelationship,
  style: ResolvedRelationship['style'],
): dia.Link.Label[] {
  const parts: string[] = [];
  if (rel.description) parts.push(rel.description);
  if (rel.technology)  parts.push(`[${rel.technology}]`);
  if (parts.length === 0) return [];

  return [{
    position: 0.5,
    attrs: {
      text: {
        text:       parts.join('\n'),
        fill:       style.color,
        fontSize:   style.fontSize,
        fontFamily: 'sans-serif',
        textAnchor: 'middle',
      },
      rect: {
        fill:        '#ffffff',
        stroke:      'none',
        rx:          2,
        refWidth:    '100%',
        refHeight:   '100%',
        refX:        0,
        refY:        0,
      },
    },
  }];
}
