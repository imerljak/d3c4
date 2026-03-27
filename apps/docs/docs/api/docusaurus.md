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

The plugin has **two independent pieces** that must both be registered:

| Piece | What it does | Where to register |
|-------|-------------|-------------------|
| **Theme** (`themes` array) | Provides the `<Structurizr>` React component at `@theme/Structurizr` | Top-level `themes` array |
| **Remark plugin** (`remarkPlugins`) | Transforms ` ```structurizr ` fenced code blocks into `<Structurizr>` JSX at build time | Inside each content plugin that processes MDX (`docs`, `blog`, `pages`) |

:::warning Common mistake
Registering the theme but **forgetting the remark plugin** is the most frequent setup error. The theme alone does nothing to fenced code blocks — diagrams will silently not render. The remark plugin must be added to every content source where you want code-fence support.
:::

Edit `docusaurus.config.ts`:

```ts
import remarkStructurizr from '@d3c4/docusaurus-theme-structurizr/remark-plugin';

export default {
  // 1. Register the theme — provides the <Structurizr> component
  themes: ['@d3c4/docusaurus-theme-structurizr'],

  presets: [
    ['classic', {
      docs: {
        // 2. Register the remark plugin — transforms ```structurizr code blocks
        remarkPlugins: [remarkStructurizr],
      },
      // If you also want diagrams in blog posts:
      // blog: { remarkPlugins: [remarkStructurizr] },
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

### Using diagrams in `src/pages/`

Standalone pages under `src/pages/` are processed separately from the docs preset. To enable fenced code blocks there too, pass the plugin to the `pages` key:

```ts
presets: [
  ['classic', {
    docs:  { remarkPlugins: [remarkStructurizr] },
    pages: { remarkPlugins: [remarkStructurizr] },
  }],
],
```

### Using the `<Structurizr>` component without the remark plugin

If you only use the `<Structurizr>` MDX component (no code fences), you only need the theme — the remark plugin is optional:

```ts
// Minimum setup for MDX component usage only
export default {
  themes: ['@d3c4/docusaurus-theme-structurizr'],
};
```

Then import and use the component directly in any `.mdx` file:

```mdx
import Structurizr from '@theme/Structurizr';

<Structurizr dsl={`workspace { ... }`} />
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
