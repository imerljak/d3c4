---
sidebar_position: 3
sidebar_label: DSL Reference
---

# Structurizr DSL Reference

d3c4 parses a subset of the [Structurizr DSL](https://structurizr.com/dsl). This section documents the supported syntax.

## Workspace

Every DSL file starts with a `workspace` block:

```structurizr
workspace "Name" "Optional description" {
  model {
    // define elements and relationships
  }
  views {
    // define what to render
  }
}
```

The `name` and `description` strings are optional.

## Structure

A workspace has two top-level sections:

| Section | Purpose |
|---------|---------|
| `model` | Defines people, systems, containers, components, and their relationships |
| `views` | Defines which diagrams to render and how to lay them out |

Continue reading:

- [Model](./model) — people, software systems, containers, components, relationships
- [Views](./views) — view types and layout options
- [Styles](./styles) — colors, shapes, and visual styling
