import type { ResolvedElement, ResolvedRelationship } from '../parser/types.js';

export interface LayoutNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  element: ResolvedElement;
}

export interface LayoutEdge {
  id: string;
  sourceId: string;
  destinationId: string;
  /** Waypoints from dagre, including start and end */
  points: Array<{ x: number; y: number }>;
  relationship: ResolvedRelationship;
}

export interface LayoutGraph {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  /** Total width/height of the graph bounding box */
  width: number;
  height: number;
}
