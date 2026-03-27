---
sidebar_position: 2
sidebar_label: React
---

# @d3c4/react

React wrapper around `@d3c4/core`. Mounts the renderer once and uses `useEffect` hooks to update it on prop changes — no remounting on workspace or view changes.

## Installation

```bash
npm install @d3c4/react @d3c4/dsl d3 dagre
```

## D3C4Diagram

```tsx
import { D3C4Diagram } from '@d3c4/react';
import { parseDsl } from '@d3c4/dsl';

<D3C4Diagram
  workspace={parseDsl(dsl)}
  viewKey="SystemContext"
  style={{ height: 500 }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `workspace` | `StructurizrWorkspace` | required | Parsed workspace (use `parseDsl()`) |
| `viewKey` | `string` | required | Key of the view to display |
| `engine` | `'dagre' \| 'force'` | `'dagre'` | Layout engine |
| `className` | `string` | — | CSS class on the container div |
| `style` | `CSSProperties` | — | Inline style on the container div |
| `zoom` | `boolean` | `true` | Enable scroll-to-zoom |
| `pan` | `boolean` | `true` | Enable drag-to-pan |
| `fitOnRender` | `boolean` | `true` | Fit to container on first render |
| `minZoom` | `number` | `0.1` | Minimum zoom scale |
| `maxZoom` | `number` | `4` | Maximum zoom scale |
| `onElementClick` | `(el: ResolvedElement) => void` | — | Element click handler |
| `onRelationshipClick` | `(rel: ResolvedRelationship) => void` | — | Relationship click handler |
| `onRenderComplete` | `({ svgElement }) => void` | — | Called after each render |
| `onNavigate` | `(viewKey: string) => void` | — | Double-click drill-down handler |

## View switching

Pass a new `viewKey` prop to switch views without remounting:

```tsx
const [viewKey, setViewKey] = useState('SystemContext');

<D3C4Diagram
  workspace={workspace}
  viewKey={viewKey}
  onNavigate={(key) => setViewKey(key)}  // double-click to drill down
/>
```

## Parsing DSL

Always parse the DSL outside of render to avoid re-parsing on every render:

```tsx
// Good — parsed once
const workspace = useMemo(() => parseDsl(dsl), [dsl]);

// Bad — re-parsed on every render
<D3C4Diagram workspace={parseDsl(dsl)} ... />
```

## Full example

```tsx
import { useState, useMemo } from 'react';
import { parseDsl } from '@d3c4/dsl';
import { D3C4Diagram } from '@d3c4/react';

const dsl = `
workspace "Big Bank" {
  model {
    customer = person "Customer"
    bank = softwareSystem "Internet Banking" {
      web = container "Web App" "Delivers UI" "React"
      api = container "API"     "Business logic" "Node.js"
      db  = container "Database" "Stores data" "PostgreSQL"
    }
    customer -> bank "Uses"
    web -> api "Calls" "REST"
    api -> db  "Reads/writes" "SQL"
  }
  views {
    systemContext bank "Context" { include * autoLayout TB }
    container bank "Containers" { include * autoLayout LR }
    styles {
      element "Person"    { shape Person background #08427b color #ffffff }
      element "Software System" { background #1168bd color #ffffff }
      element "Container" { background #438dd5 color #ffffff }
    }
  }
}
`;

export default function DiagramViewer() {
  const workspace = useMemo(() => parseDsl(dsl), []);
  const [viewKey, setViewKey] = useState('Context');

  return (
    <div>
      <nav>
        <button onClick={() => setViewKey('Context')}>System Context</button>
        <button onClick={() => setViewKey('Containers')}>Containers</button>
      </nav>
      <D3C4Diagram
        workspace={workspace}
        viewKey={viewKey}
        engine="dagre"
        style={{ height: 500, border: '1px solid #ccc' }}
        onNavigate={setViewKey}
      />
    </div>
  );
}
```
