import type { Shape } from '@d3c4/types';

export interface ResolvedElementStyle {
  background: string;
  color: string;
  stroke: string;
  shape: Shape;
  fontSize: number;
  border: 'Solid' | 'Dashed' | 'Dotted';
  opacity: number;
}

export interface ResolvedRelationshipStyle {
  color: string;
  thickness: number;
  dashed: boolean;
  routing: 'Direct' | 'Orthogonal' | 'Curved';
  fontSize: number;
}

export interface ResolvedElement {
  id: string;
  name: string;
  description?: string;
  type: string;
  technology?: string;
  tags: string[];
  style: ResolvedElementStyle;
  /** True means render as a dashed boundary box rather than a filled node */
  boundary?: boolean;
}

export interface ResolvedRelationship {
  id: string;
  sourceId: string;
  destinationId: string;
  description?: string;
  technology?: string;
  style: ResolvedRelationshipStyle;
  /** For DynamicView: sequence order label */
  order?: string;
}

export interface ResolvedView {
  key: string;
  title?: string;
  type: string;
  elements: ResolvedElement[];
  relationships: ResolvedRelationship[];
}

export interface ResolvedWorkspace {
  elementMap: Map<string, ResolvedElement>;
  relationshipMap: Map<string, ResolvedRelationship>;
  views: import('@d3c4/types').DiagramView[];
  /** The original workspace for reference */
  raw: import('@d3c4/types').StructurizrWorkspace;
}
