// Primary public API
export { Renderer } from './renderer/Renderer.js';
export type { RendererOptions } from './renderer/Renderer.js';

// Advanced / composable use
export { WorkspaceParser } from './parser/WorkspaceParser.js';
export { ViewSelector } from './parser/ViewSelector.js';
export { LayoutEngine } from './layout/LayoutEngine.js';
export type { LayoutGraph, LayoutNode, LayoutEdge } from './layout/types.js';
export type {
  ResolvedElement,
  ResolvedRelationship,
  ResolvedView,
  ResolvedWorkspace,
  ResolvedElementStyle,
  ResolvedRelationshipStyle,
} from './parser/types.js';

// Re-export all @d3c4/types so consumers only need one import
export type * from '@d3c4/types';
