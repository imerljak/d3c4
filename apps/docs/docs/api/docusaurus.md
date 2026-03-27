---
sidebar_position: 3
sidebar_label: Docusaurus
---

# @d3c4/docusaurus-theme-structurizr

Docusaurus theme that adds Structurizr DSL diagram support — both as an MDX component and as fenced code blocks (like Mermaid).

## Installation

```bash
npm install @d3c4/docusaurus-theme-structurizr
```

## Setup

Edit `docusaurus.config.ts`:

```ts
import remarkStructurizr from '@d3c4/docusaurus-theme-structurizr/remark-plugin';

export default {
  // Register the theme (provides <Structurizr> component)
  themes: ['@d3c4/docusaurus-theme-structurizr'],

  presets: [
    ['classic', {
      docs: {
        // Register the remark plugin (transforms ```structurizr code blocks)
        remarkPlugins: [remarkStructurizr],
      },
    }],
  ],

  themeConfig: {
    structurizr: {
      defaultEngine: 'dagre',
      allowedEngines: ['dagre', 'force'],
      defaultMode: 'diagram',
      allowedModes: ['diagram', 'split'],
    },
  },
};
```

## Configuration

All options are set under `themeConfig.structurizr`:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultEngine` | `'dagre' \| 'force'` | `'dagre'` | Default layout engine |
| `allowedEngines` | `StructurizrEngine[]` | `['dagre','force']` | Engines shown in toolbar. Set to one to hide the picker |
| `defaultMode` | `'diagram' \| 'split'` | `'diagram'` | Default display mode |
| `allowedModes` | `StructurizrViewMode[]` | `['diagram','split']` | Modes shown in toolbar. Set to one to hide the picker |

## Fenced code blocks

The remark plugin transforms any `structurizr` fenced code block into an interactive diagram — no import needed:

````md
```structurizr
workspace "My System" {
  model {
    user = person "User"
    app  = softwareSystem "App"
    user -> app "Uses"
  }
  views {
    systemContext app "Context" { include * autoLayout TB }
    styles {
      element "Person"          { shape Person background #08427b color #ffffff }
      element "Software System" { background #1168bd color #ffffff }
    }
  }
}
```
````

## `<Structurizr>` component

For use in MDX files when you need per-instance configuration:

```mdx
import Structurizr from '@theme/Structurizr';

<Structurizr
  dsl={`workspace "..." { ... }`}
  defaultEngine="force"
  defaultMode="split"
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `dsl` | `string` | Required. The raw DSL string |
| `defaultView` | `string` | Override which view is selected on load |
| `defaultEngine` | `'dagre' \| 'force'` | Override `themeConfig.structurizr.defaultEngine` for this instance |
| `defaultMode` | `'diagram' \| 'split'` | Override `themeConfig.structurizr.defaultMode` for this instance |
| `className` | `string` | CSS class on the container |

## Split view

In `split` mode the code panel and diagram panel are displayed side by side. The divider between them is draggable — grab it to resize the panels.

The `allowedModes` config controls whether users can switch to split view. Set `allowedModes: ['diagram']` to disable the toggle entirely.
