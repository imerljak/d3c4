---
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# d3c4

**d3c4** is a Structurizr C4 diagram renderer built on D3.js. It parses [Structurizr DSL](https://structurizr.com/dsl) or JSON workspace definitions and renders interactive SVG diagrams directly in the browser.

## Features

- **Structurizr DSL parser** — full workspace parser with helpful error messages
- **Interactive SVG rendering** — zoom, pan, and click interactions out of the box
- **Two layout engines** — Dagre (hierarchical) and D3 force-directed
- **React component** — drop-in `<D3C4Diagram>` component
- **Docusaurus integration** — embed diagrams in docs via MDX component or fenced code blocks

## Packages

| Package | Description |
|---------|-------------|
| [`@d3c4/types`](https://npmjs.com/package/@d3c4/types) | TypeScript interfaces for the Structurizr workspace model |
| [`@d3c4/dsl`](https://npmjs.com/package/@d3c4/dsl) | Structurizr DSL parser |
| [`@d3c4/core`](https://npmjs.com/package/@d3c4/core) | D3.js rendering engine |
| [`@d3c4/react`](https://npmjs.com/package/@d3c4/react) | React wrapper component |
| [`@d3c4/docusaurus-theme-structurizr`](https://npmjs.com/package/@d3c4/docusaurus-theme-structurizr) | Docusaurus theme and remark plugin |

## Quick look

```structurizr
workspace "My System" {
  model {
    user = person "User"
    app  = softwareSystem "Application"
    user -> app "Uses"
  }
  views {
    systemContext app "Context" {
      include *
      autoLayout TB
    }
    styles {
      element "Person"          { shape Person background #08427b color #ffffff }
      element "Software System" { background #1168bd color #ffffff }
    }
  }
}
```
