import dagre from 'dagre';
import type { ResolvedView, ResolvedElement } from '../parser/types.js';
import type { LayoutGraph, LayoutNode, LayoutEdge } from './types.js';

// Default node dimensions per shape
const DEFAULT_WIDTH = 160;
const PERSON_WIDTH = DEFAULT_WIDTH;
// PERSON_BODY_Y must match the constant in ShapeRegistry (46)
const PERSON_BODY_Y = 46;

function estimateLineCount(text: string, charsPerLine: number): number {
  const words = text.split(' ');
  let lines = 1;
  let lineLen = 0;
  for (const word of words) {
    if (lineLen > 0 && lineLen + 1 + word.length > charsPerLine) {
      lines++;
      lineLen = word.length;
    } else {
      lineLen = lineLen > 0 ? lineLen + 1 + word.length : word.length;
    }
  }
  return lines;
}

function estimatePersonHeight(el: ResolvedElement): number {
  const fontSize = el.style.fontSize;
  const textWidth = PERSON_WIDTH - 16;
  const badgeFontSize = Math.max(fontSize - 3, 10);
  const charsPerLineNormal = Math.floor(textWidth / (fontSize * 0.55));
  const charsPerLineSmall = Math.floor(textWidth / (badgeFontSize * 0.55));

  const nameLines = estimateLineCount(el.name, charsPerLineNormal);
  const nameH = fontSize + (nameLines - 1) * fontSize * 1.2;
  const descLines = el.description ? estimateLineCount(el.description, charsPerLineSmall) : 0;
  const descH = descLines > 0 ? badgeFontSize + (descLines - 1) * badgeFontSize * 1.2 : 0;

  // 8px text-padding-top + badge + 4px + name + (6px + desc if present) + 8px bottom
  const bodyContentH = 8 + badgeFontSize + 4 + nameH + (descH > 0 ? 6 + descH : 0) + 8;
  return PERSON_BODY_Y + Math.max(bodyContentH, 40);
}

function estimateNodeHeight(el: ResolvedElement): number {
  const fontSize = el.style.fontSize;
  const textWidth = DEFAULT_WIDTH - 16;
  const badgeFontSize = Math.max(fontSize - 3, 10);
  const charsPerLineNormal = Math.floor(textWidth / (fontSize * 0.55));
  const charsPerLineSmall = Math.floor(textWidth / (badgeFontSize * 0.55));

  const nameLines = estimateLineCount(el.name, charsPerLineNormal);
  const nameH = fontSize + (nameLines - 1) * fontSize * 1.2;
  const descLines = el.description ? estimateLineCount(el.description, charsPerLineSmall) : 0;
  const descH = descLines > 0 ? badgeFontSize + (descLines - 1) * badgeFontSize * 1.2 : 0;

  // badge (1 line) + badge-to-name spacing + name + name-to-desc spacing + desc + top/bottom padding
  return Math.max(20 + badgeFontSize + 4 + nameH + (descH > 0 ? 6 + descH : 0), 80);
}

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
    const boundaryElements = view.elements.filter((e) => e.boundary);
    const useCompound = boundaryElements.length > 0;

    const g = new dagre.graphlib.Graph({ compound: useCompound, multigraph: true });

    // Map rank direction from Structurizr format to Dagre format
    const rankdir = this.mapRankDirection(
      view.elements[0]?.type, // not used directly
      options.rankDirection ?? 'TB',
    );

    g.setGraph({
      rankdir,
      ranksep: options.rankSep ?? 80,
      nodesep: options.nodeSep ?? 60,
      edgesep: options.edgeSep ?? 20,
      marginx: options.marginX ?? 40,
      marginy: options.marginY ?? 40,
    });
    g.setDefaultEdgeLabel(() => ({}));

    // Register cluster nodes for each boundary (dagre sizes them from their children)
    if (useCompound) {
      for (const b of boundaryElements) {
        g.setNode(`__boundary_${b.id}`, { label: b.name });
      }
    }

    // Add non-boundary nodes, assigning children to their cluster when applicable
    const nonBoundary = view.elements.filter((e) => !e.boundary);

    for (const el of nonBoundary) {
      const [w, h] = el.style.shape === 'Person'
        ? [PERSON_WIDTH, estimatePersonHeight(el)]
        : [DEFAULT_WIDTH, estimateNodeHeight(el)];
      g.setNode(el.id, { width: w, height: h, label: el.name });

      if (useCompound) {
        // SoftwareSystem boundary → cluster its Containers
        // Container boundary → cluster its Components
        const parent = boundaryElements.find(
          (b) =>
            (b.type === 'SoftwareSystem' && el.type === 'Container') ||
            (b.type === 'Container' && el.type === 'Component'),
        );
        if (parent) g.setParent(el.id, `__boundary_${parent.id}`);
      }
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
