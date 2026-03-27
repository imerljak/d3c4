# d3c4

**d3c4** is a Structurizr C4 diagram renderer built on D3.js. It parses [Structurizr DSL](https://structurizr.com/dsl) workspace definitions and renders interactive SVG diagrams directly in the browser.

[![CI](https://github.com/imerljak/d3c4/actions/workflows/ci.yml/badge.svg)](https://github.com/imerljak/d3c4/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@d3c4/core)](https://www.npmjs.com/package/@d3c4/core)
[![license](https://img.shields.io/github/license/imerljak/d3c4)](./LICENSE)

---

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@d3c4/types`](./packages/types) | [![npm](https://img.shields.io/npm/v/@d3c4/types)](https://npmjs.com/package/@d3c4/types) | TypeScript interfaces for the Structurizr workspace model |
| [`@d3c4/dsl`](./packages/dsl) | [![npm](https://img.shields.io/npm/v/@d3c4/dsl)](https://npmjs.com/package/@d3c4/dsl) | Structurizr DSL parser |
| [`@d3c4/core`](./packages/core) | [![npm](https://img.shields.io/npm/v/@d3c4/core)](https://npmjs.com/package/@d3c4/core) | D3.js rendering engine |
| [`@d3c4/react`](./packages/react) | [![npm](https://img.shields.io/npm/v/@d3c4/react)](https://npmjs.com/package/@d3c4/react) | React wrapper component |
| [`@d3c4/docusaurus-theme-structurizr`](./packages/docusaurus-theme-structurizr) | [![npm](https://img.shields.io/npm/v/@d3c4/docusaurus-theme-structurizr)](https://npmjs.com/package/@d3c4/docusaurus-theme-structurizr) | Docusaurus theme and remark plugin |

**[Full documentation →](https://imerljak.github.io/d3c4/)**

---

## Quick start

### Vanilla TypeScript

```bash
npm install @d3c4/core @d3c4/dsl d3 dagre
```

```ts
import { parseDsl } from '@d3c4/dsl';
import { Renderer } from '@d3c4/core';

const dsl = `
workspace "My System" {
  model {
    user = person "User"
    app  = softwareSystem "My App"
    user -> app "Uses"
  }
  views {
    systemContext app "Context" {
      include *
      autoLayout TB
    }
  }
}
`;

const renderer = new Renderer(document.getElementById('diagram'), parseDsl(dsl), {
  viewKey: 'Context',
});

renderer.render();
```

### React

```bash
npm install @d3c4/react @d3c4/dsl d3 dagre
```

```tsx
import { useMemo } from 'react';
import { parseDsl } from '@d3c4/dsl';
import { D3C4Diagram } from '@d3c4/react';

export default function App() {
  const workspace = useMemo(() => parseDsl(dsl), []);

  return (
    <D3C4Diagram
      workspace={workspace}
      viewKey="Context"
      style={{ height: 500 }}
    />
  );
}
```

### Docusaurus

```bash
npm install @d3c4/docusaurus-theme-structurizr
```

```ts
// docusaurus.config.ts
import remarkStructurizr from '@d3c4/docusaurus-theme-structurizr/remark-plugin';

export default {
  themes: ['@d3c4/docusaurus-theme-structurizr'],
  presets: [['classic', { docs: { remarkPlugins: [remarkStructurizr] } }]],
  themeConfig: {
    structurizr: { defaultEngine: 'dagre', defaultMode: 'diagram' },
  },
};
```

Then use a fenced code block in any Markdown or MDX file:

````md
```structurizr
workspace "My System" {
  model {
    user = person "User"
    app  = softwareSystem "My App"
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

---

## Development

This is a [Turborepo](https://turbo.build) + [pnpm](https://pnpm.io) monorepo.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Type-check
pnpm typecheck

# Start demo app
pnpm dev
```

### Package dependency graph

```
@d3c4/types
    ├── @d3c4/dsl
    ├── @d3c4/core
    │       └── @d3c4/react
    └── @d3c4/docusaurus-theme-structurizr
```

Build order is handled automatically by Turborepo.

---

## Contributing

1. Fork the repo and create a branch
2. Make your changes
3. Add a changeset: `pnpm changeset`
4. Open a pull request

Releases are fully automated — merging the generated "Version Packages" PR publishes all packages to npm.

---

## License

[MIT](./LICENSE)
