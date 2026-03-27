---
sidebar_position: 2
sidebar_label: Views
---

# Views

Views define which diagrams to render. Each view type corresponds to a level of the C4 model hierarchy.

## View types

| View | Shows |
|------|-------|
| `systemLandscape` | All people and software systems |
| `systemContext` | One system and its direct relationships |
| `container` | Containers inside one system |
| `component` | Components inside one container |

## System Landscape

Shows all people and software systems in one diagram. Takes no target element.

```
systemLandscape "key" "description" { ... }
```

```structurizr
workspace {
  model {
    customer = person "Customer"
    staff    = person "Staff"
    crm      = softwareSystem "CRM"
    billing  = softwareSystem "Billing"
    customer -> crm     "Manages account via"
    staff    -> crm     "Manages customers via"
    crm      -> billing "Sends invoices to"
  }
  views {
    systemLandscape "Landscape" "All systems" {
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

## System Context

Focuses on one software system and shows how people and other systems interact with it.

```
systemContext <system> "key" "description" { ... }
```

```structurizr
workspace {
  model {
    customer  = person "Customer"
    app       = softwareSystem "Internet Banking"
    mainframe = softwareSystem "Mainframe" "Core banking"
    email     = softwareSystem "Email System"

    customer -> app       "Manages accounts via"
    app      -> mainframe "Gets account data from" "XML/HTTPS"
    app      -> email     "Sends emails via"
    email    -> customer  "Delivers emails to"
  }
  views {
    systemContext app "SystemContext" {
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

## Container

Zooms into one software system and shows its containers.

```
container <system> "key" "description" { ... }
```

```structurizr
workspace {
  model {
    user = person "User"
    app  = softwareSystem "My App" {
      spa = container "SPA"      "Single-page app"  "React"
      api = container "API"      "REST API"         "Node.js/Express"
      db  = container "Database" "Relational store" "PostgreSQL"
    }
    user -> app "Uses"
    spa  -> api "Calls"   "REST/HTTPS"
    api  -> db  "Reads/writes" "SQL"
  }
  views {
    container app "Containers" {
      include *
      autoLayout LR
    }
    styles {
      element "Person"    { shape Person background #08427b color #ffffff }
      element "Container" { background #438dd5 color #ffffff }
    }
  }
}
```

## Component

Zooms into one container and shows its components.

```
component <container> "key" "description" { ... }
```

## `include` and `exclude`

Control which elements appear in the view:

```
include *              // all elements in scope
include user app       // specific elements by identifier
exclude mainframe      // remove specific elements
```

## `autoLayout`

Automatically position elements using the layout engine:

```
autoLayout TB   // top → bottom  (default)
autoLayout BT   // bottom → top
autoLayout LR   // left → right
autoLayout RL   // right → left
```
