---
sidebar_position: 1
sidebar_label: Model
---

# Model

The `model` block defines all elements and their relationships.

## Person

A person represents a human user of the system.

```
person "Name" "Description" "tags"
```

```structurizr
workspace {
  model {
    customer = person "Customer" "A paying customer"
    admin    = person "Admin"    "Internal administrator"
  }
  views {
    systemLandscape "Landscape" { include * autoLayout TB }
    styles { element "Person" { shape Person background #08427b color #ffffff } }
  }
}
```

## Software System

A software system is the highest-level abstraction.

```
softwareSystem "Name" "Description" "tags"
```

```structurizr
workspace {
  model {
    user     = person "User"
    app      = softwareSystem "My App"     "The main application"
    payments = softwareSystem "Payments"   "Third-party payment provider"

    user -> app      "Uses"
    app  -> payments "Processes payments via" "HTTPS"
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

## Container

Containers live inside a software system and represent deployable units (apps, services, databases).

```
container "Name" "Description" "Technology" "tags"
```

```structurizr
workspace {
  model {
    user = person "User"
    app  = softwareSystem "My App" {
      web = container "Web App"  "Serves the UI"   "React"
      api = container "API"      "Business logic"  "Node.js"
      db  = container "Database" "Stores data"     "PostgreSQL"

      web -> api "Calls"     "REST"
      api -> db  "Reads/writes" "SQL"
    }
    user -> app "Uses"
  }
  views {
    container app "Containers" {
      include *
      autoLayout TB
    }
    styles {
      element "Person"    { shape Person background #08427b color #ffffff }
      element "Container" { background #438dd5 color #ffffff }
    }
  }
}
```

## Component

Components live inside containers and represent logical groupings of code.

```
component "Name" "Description" "Technology" "tags"
```

```structurizr
workspace {
  model {
    app = softwareSystem "My App" {
      api = container "API" "Business logic" "Node.js" {
        router  = component "Router"     "Routes HTTP requests"   "Express"
        service = component "Service"    "Business logic"         "TypeScript"
        repo    = component "Repository" "Data access layer"      "TypeScript"
      }
      db = container "Database" "Stores data" "PostgreSQL"

      router  -> service "Delegates to"
      service -> repo    "Uses"
      repo    -> db      "Reads/writes" "SQL"
    }
  }
  views {
    component api "Components" {
      include *
      autoLayout TB
    }
    styles {
      element "Component" { background #85bbf0 color #000000 }
      element "Container" { background #438dd5 color #ffffff }
    }
  }
}
```

## Relationships

Use `->` to define a relationship between any two elements:

```
source -> destination "Description" "Technology" "tags"
```

All fields after `->` are optional:

```
user -> app
user -> app "Uses"
user -> app "Uses" "HTTPS"
user -> app "Uses" "HTTPS" "tag1,tag2"
```

## Element identifiers

Assign an element to a variable to reference it elsewhere:

```
mySystem = softwareSystem "My System"
mySystem -> otherSystem "Integrates with"
```

Identifiers can be used across the entire workspace, including in view definitions.
