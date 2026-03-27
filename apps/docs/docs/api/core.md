---
sidebar_position: 1
sidebar_label: Core (Renderer)
---

# @d3c4/core

The core rendering engine. Parses a resolved workspace and draws it into an SVG element inside a container.

## Installation

```bash
npm install @d3c4/core @d3c4/dsl d3 dagre
```

`d3` and `dagre` are peer dependencies — they must be installed separately.

## Renderer

The primary API. Manages the full rendering lifecycle.

```ts
import { parseDsl } from '@d3c4/dsl';
import { Renderer } from '@d3c4/core';

const workspace = parseDsl(dsl);
const renderer = new Renderer(container, workspace, options);
renderer.render();
```

### Constructor

```ts
new Renderer(
  container: HTMLElement,
  workspace: StructurizrWorkspace,
  options: RendererOptions,
)
```

### RendererOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `viewKey` | `string` | required | Key of the view to render |
| `zoom` | `boolean` | `true` | Enable scroll-to-zoom |
| `pan` | `boolean` | `true` | Enable drag-to-pan |
| `fitOnRender` | `boolean` | `true` | Fit diagram to container on first render |
| `minZoom` | `number` | `0.1` | Minimum zoom scale |
| `maxZoom` | `number` | `4` | Maximum zoom scale |
| `onElementClick` | `(el: ResolvedElement) => void` | — | Called on element click |
| `onRelationshipClick` | `(rel: ResolvedRelationship) => void` | — | Called on relationship click |
| `onRenderComplete` | `({ svgElement }) => void` | — | Called after each render |
| `onNavigate` | `(viewKey: string) => void` | — | Called on element double-click (drill-down) |

### Methods

| Method | Description |
|--------|-------------|
| `render(viewKey?: string)` | Render or re-render a view. Pass a new `viewKey` to switch views |
| `update(workspace)` | Replace the workspace data and re-render |
| `fitToView(duration?)` | Animate zoom to fit all elements |
| `zoomTo(scale, duration?)` | Animate zoom to a specific scale |
| `getSvgElement()` | Returns the underlying `SVGElement` (useful for export) |
| `destroy()` | Remove event listeners and clean up the DOM |

### Example

```ts
import { parseDsl } from '@d3c4/dsl';
import { Renderer } from '@d3c4/core';

const workspace = parseDsl(dsl);
const container = document.getElementById('diagram')!;

const renderer = new Renderer(container, workspace, {
  viewKey: 'SystemContext',
  onElementClick: (el) => console.log('clicked', el.name),
  onNavigate: (viewKey) => renderer.render(viewKey),
});

renderer.render();

// Later: switch views
renderer.render('Containers');

// Later: update data without remounting
renderer.update(newWorkspace);

// Cleanup
renderer.destroy();
```

## ForceRenderer

An alternative renderer using D3 force-directed simulation. Nodes are draggable and settle into position using physics.

```ts
import { ForceRenderer } from '@d3c4/core';

const renderer = new ForceRenderer(container, workspace, options);
renderer.render();
```

### ForceRendererOptions

Same as `RendererOptions` minus layout-specific options. Nodes position themselves via simulation so `autoLayout` directives in the DSL are ignored.

## Advanced APIs

These are used internally but exported for advanced use cases such as custom renderers.

### WorkspaceParser

Flattens the hierarchical workspace model into a resolved map of elements with styles applied.

```ts
import { WorkspaceParser } from '@d3c4/core';

const parser = new WorkspaceParser();
const resolved = parser.parse(workspace);
// resolved.elements: Map<id, ResolvedElement>
// resolved.relationships: Map<id, ResolvedRelationship>
```

### ViewSelector

Filters the resolved workspace down to the elements and relationships visible in one view.

```ts
import { ViewSelector } from '@d3c4/core';

const selector = new ViewSelector();
const view = selector.select(resolved, 'SystemContext');
// view.elements, view.relationships
```

### LayoutEngine

Runs Dagre layout on a resolved view and returns nodes with `x`/`y` positions.

```ts
import { LayoutEngine } from '@d3c4/core';

const engine = new LayoutEngine();
const graph = engine.layout(view, { rankDir: 'TB' });
// graph.nodes: LayoutNode[]  (each has x, y, width, height)
// graph.edges: LayoutEdge[]
```
