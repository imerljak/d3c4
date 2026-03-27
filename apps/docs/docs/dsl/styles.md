---
sidebar_position: 3
sidebar_label: Styles
---

# Styles

The `styles` block inside `views` controls the visual appearance of elements and relationships. Styles are applied by **tag** — every element has implicit tags based on its type.

## Default tags

| Element type | Implicit tag |
|---|---|
| `person` | `Person` |
| `softwareSystem` | `Software System` |
| `container` | `Container` |
| `component` | `Component` |

## Element styles

```
element "TagName" {
  background  #rrggbb
  color       #rrggbb
  stroke      #rrggbb
  shape       ShapeName
  fontSize    14
  border      solid | dashed | dotted
  opacity     0-100
}
```

```structurizr
workspace {
  model {
    user = person "User"
    app  = softwareSystem "App"
    db   = softwareSystem "Database"
    user -> app "Uses"
    app  -> db  "Stores data"
  }
  views {
    systemContext app "Context" {
      include *
      autoLayout TB
    }
    styles {
      element "Person"          { shape Person     background #08427b color #ffffff }
      element "Software System" { shape RoundedBox background #1168bd color #ffffff }
    }
  }
}
```

## Shapes

| Shape | Description |
|-------|-------------|
| `Box` | Default rectangle |
| `RoundedBox` | Rectangle with rounded corners |
| `Circle` | Circle |
| `Ellipse` | Ellipse |
| `Hexagon` | Hexagon |
| `Cylinder` | Cylinder (databases) |
| `Pipe` | Horizontal pipe |
| `Person` | Person silhouette |
| `Robot` | Robot silhouette |
| `WebBrowser` | Browser window outline |
| `MobileDeviceLandscape` | Mobile phone (landscape) |
| `MobileDevicePortrait` | Mobile phone (portrait) |
| `Component` | Component box with filled top bar |

## Relationship styles

```
relationship "TagName" {
  color     #rrggbb
  thickness 1-10
  dashed    true | false
  fontSize  12
  opacity   0-100
}
```

```structurizr
workspace {
  model {
    user = person "User"
    app  = softwareSystem "App"
    db   = softwareSystem "Database"
    user -> app "Uses"         "HTTPS"
    app  -> db  "Reads/writes" "SQL"
  }
  views {
    systemContext app "Context" {
      include *
      autoLayout TB
    }
    styles {
      element "Person"          { shape Person background #08427b color #ffffff }
      element "Software System" { background #1168bd color #ffffff }
      relationship "Relationship" { color #666666 thickness 2 dashed false }
    }
  }
}
```

## Custom tags

:::note
Custom inline tags on elements and relationships are not yet supported by the d3c4 DSL parser. Only the implicit type-based tags (`Person`, `Software System`, `Container`, `Component`) are available today.
:::

In the full Structurizr DSL, you can add extra tags to any element to apply specific styles:

```
db = softwareSystem "Database" "PostgreSQL" "Database,External"
```

Then target those tags in `styles`:

```
element "Database" { shape Cylinder }
element "External" { background #999999 }
```

When multiple styles match an element, the last matching definition takes precedence.
