import dagre from 'dagre';
import type { ResolvedView } from '../parser/types.js';
import type { LayoutGraph, LayoutNode, LayoutEdge } from './types.js';

// Default node dimensions per shape
const DEFAULT_WIDTH = 160;
const DEFAULT_HEIGHT = 90;
const PERSON_WIDTH = 100;
const PERSON_HEIGHT = 120;

export interface LayoutOptions {
  rankDirection?: 'TB' | 'BT' | 'LR' | 'RL';
  rankSep?: number;
  nodeSep?: number;
  edgeSep?: number;
  marginX?: number;
  marginY?: number;
}

export class LayoutEngine {
  layout(view: ResolvedView, options: LayoutOptions = {}): LayoutGraph {
    const g = new dagre.graphlib.Graph({ multigraph: true });

    // Map rank direction from Structurizr format to Dagre format
    const rankdir = this.mapRankDirection(
      view.elements[0]?.type, // not used directly
      options.rankDirection ?? 'TB',
    );

    // Determine layout direction from view's automatic layout if available
    // (already applied via options passed from renderer)

    g.setGraph({
      rankdir,
      ranksep: options.rankSep ?? 80,
      nodesep: options.nodeSep ?? 60,
      edgesep: options.edgeSep ?? 20,
      marginx: options.marginX ?? 40,
      marginy: options.marginY ?? 40,
    });
    g.setDefaultEdgeLabel(() => ({}));

    // Add non-boundary nodes
    const nonBoundary = view.elements.filter((e) => !e.boundary);

    for (const el of nonBoundary) {
      const [w, h] = el.style.shape === 'Person'
        ? [PERSON_WIDTH, PERSON_HEIGHT]
        : [DEFAULT_WIDTH, DEFAULT_HEIGHT];
      g.setNode(el.id, { width: w, height: h, label: el.name });
    }

    // Add edges (only between non-boundary elements)
    const nodeIds = new Set(nonBoundary.map((e) => e.id));
    for (const rel of view.relationships) {
      if (nodeIds.has(rel.sourceId) && nodeIds.has(rel.destinationId)) {
        g.setEdge(rel.sourceId, rel.destinationId, {}, rel.id);
      }
    }

    dagre.layout(g);

    const nodes: LayoutNode[] = [];
    for (const el of nonBoundary) {
      const n = g.node(el.id);
      nodes.push({
        id: el.id,
        x: n.x,
        y: n.y,
        width: n.width,
        height: n.height,
        element: el,
      });
    }

    const edges: LayoutEdge[] = [];
    for (const rel of view.relationships) {
      if (!nodeIds.has(rel.sourceId) || !nodeIds.has(rel.destinationId)) continue;
      const e = g.edge({ v: rel.sourceId, w: rel.destinationId, name: rel.id });
      const points = e?.points ?? [];

      // Ensure we have at least source and destination points
      if (points.length === 0) {
        const src = g.node(rel.sourceId);
        const dst = g.node(rel.destinationId);
        if (src && dst) {
          points.push({ x: src.x, y: src.y });
          points.push({ x: dst.x, y: dst.y });
        }
      }

      edges.push({
        id: rel.id,
        sourceId: rel.sourceId,
        destinationId: rel.destinationId,
        points,
        relationship: rel,
      });
    }

    const graphData = g.graph();
    return {
      nodes,
      edges,
      width: graphData.width ?? 0,
      height: graphData.height ?? 0,
    };
  }

  private mapRankDirection(
    _elementType: string | undefined,
    dir: string,
  ): string {
    const map: Record<string, string> = {
      TB: 'TB',
      TopBottom: 'TB',
      BT: 'BT',
      BottomTop: 'BT',
      LR: 'LR',
      LeftRight: 'LR',
      RL: 'RL',
      RightLeft: 'RL',
    };
    return map[dir] ?? 'TB';
  }
}
