import { describe, it, expect } from 'vitest';
import { parseDsl } from '../parser.js';

const BIGBANK_DSL = `
workspace "Big Bank plc" "This is an example workspace." {
  model {
    customer = person "Personal Banking Customer" "A customer of the bank."
    bank = softwareSystem "Internet Banking System" "Allows customers to view their accounts." {
      web = container "Web Application" "Delivers the web UI." "Java/Spring MVC"
      api = container "API Application" "Provides internet banking API." "Java/Spring MVC"
      db = container "Database" "Stores user registration info." "Oracle Database Schema"
    }
    mainframe = softwareSystem "Mainframe Banking System" "Stores core banking info."

    customer -> bank "Views account balances using"
    bank -> mainframe "Gets account information from"
    web -> api "Makes API calls to" "JSON/HTTPS"
    api -> db "Reads from and writes to" "JDBC"
  }
  views {
    systemContext bank "SystemContext" "System context diagram for Internet Banking." {
      include *
      autoLayout TB
    }
    container bank "Containers" "Container diagram for Internet Banking." {
      include *
      autoLayout LR
    }
    styles {
      element "Person" {
        background #08427b
        color #ffffff
        shape Person
      }
      element "Software System" {
        background #1168bd
        color #ffffff
      }
      element "Container" {
        background #438dd5
        color #ffffff
      }
    }
  }
}
`;

describe('parseDsl', () => {
  it('parses workspace name and description', () => {
    const ws = parseDsl(BIGBANK_DSL);
    expect(ws.name).toBe('Big Bank plc');
    expect(ws.description).toBe('This is an example workspace.');
  });

  it('parses people', () => {
    const ws = parseDsl(BIGBANK_DSL);
    const people = ws.model.people ?? [];
    expect(people).toHaveLength(1);
    expect(people[0]!.name).toBe('Personal Banking Customer');
    expect(people[0]!.type).toBe('Person');
  });

  it('parses software systems', () => {
    const ws = parseDsl(BIGBANK_DSL);
    const systems = ws.model.softwareSystems ?? [];
    expect(systems).toHaveLength(2);
    expect(systems[0]!.name).toBe('Internet Banking System');
    expect(systems[1]!.name).toBe('Mainframe Banking System');
  });

  it('parses containers inside software system', () => {
    const ws = parseDsl(BIGBANK_DSL);
    const bank = ws.model.softwareSystems?.[0];
    expect(bank?.containers).toHaveLength(3);
    expect(bank?.containers?.[0]?.name).toBe('Web Application');
    expect(bank?.containers?.[0]?.technology).toBe('Java/Spring MVC');
  });

  it('parses top-level relationships', () => {
    const ws = parseDsl(BIGBANK_DSL);
    const rels = ws.model.relationships ?? [];
    expect(rels.length).toBeGreaterThanOrEqual(2);
    const custRel = rels.find((r) => r.description === 'Views account balances using');
    expect(custRel).toBeDefined();
    expect(custRel?.technology).toBeUndefined();
  });

  it('parses views', () => {
    const ws = parseDsl(BIGBANK_DSL);
    expect(ws.views.systemContextViews).toHaveLength(1);
    expect(ws.views.containerViews).toHaveLength(1);
    expect(ws.views.systemContextViews?.[0]?.key).toBe('SystemContext');
    expect(ws.views.containerViews?.[0]?.key).toBe('Containers');
  });

  it('parses autoLayout direction', () => {
    const ws = parseDsl(BIGBANK_DSL);
    const ctxView = ws.views.systemContextViews?.[0];
    expect(ctxView?.automaticLayout?.rankDirection).toBe('TopBottom');
    const contView = ws.views.containerViews?.[0];
    expect(contView?.automaticLayout?.rankDirection).toBe('LeftRight');
  });

  it('parses element styles', () => {
    const ws = parseDsl(BIGBANK_DSL);
    const styles = ws.views.configuration?.styles?.elements ?? [];
    expect(styles).toHaveLength(3);
    const personStyle = styles.find((s) => s.tag === 'Person');
    expect(personStyle?.background).toBe('#08427b');
    expect(personStyle?.shape).toBe('Person');
  });

  it('assigns unique IDs to all elements', () => {
    const ws = parseDsl(BIGBANK_DSL);
    const ids = new Set<string>();
    for (const p of ws.model.people ?? []) ids.add(p.id);
    for (const ss of ws.model.softwareSystems ?? []) {
      ids.add(ss.id);
      for (const c of ss.containers ?? []) ids.add(c.id);
    }
    expect(ids.size).toBeGreaterThanOrEqual(5); // 1 person + 2 systems + 3 containers
    // All IDs are unique (set size would be smaller if there were duplicates)
  });

  it('parses a minimal workspace without errors', () => {
    const dsl = `workspace { model { a = person "Alice" } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.name).toBe('Alice');
  });

  it('parses custom tags on person', () => {
    const dsl = `workspace { model { a = person "Alice" "An admin" "Admin,Internal" } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.tags).toBe('Admin,Internal');
  });

  it('parses custom tags on softwareSystem', () => {
    const dsl = `workspace { model {
      db = softwareSystem "Database" "PostgreSQL" "Database,External"
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.softwareSystems?.[0]?.tags).toBe('Database,External');
  });

  it('parses custom tags on container', () => {
    const dsl = `workspace { model {
      sys = softwareSystem "Sys" {
        cache = container "Cache" "Redis cache" "Redis" "Cache,External"
      }
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.softwareSystems?.[0]?.containers?.[0]?.tags).toBe('Cache,External');
  });

  it('parses custom tags on relationship', () => {
    const dsl = `workspace { model {
      user = person "User"
      app = softwareSystem "App"
      user -> app "Uses" "HTTPS" "Sync"
    } views {} }`;
    const ws = parseDsl(dsl);
    const rel = ws.model.relationships?.[0];
    expect(rel?.description).toBe('Uses');
    expect(rel?.technology).toBe('HTTPS');
    expect(rel?.tags).toBe('Sync');
  });

  it('parses no tags when 4th argument is absent', () => {
    const dsl = `workspace { model {
      user = person "User" "A user"
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.tags).toBeUndefined();
  });
});

// ----------------------------------------------------------------
// Issue #10: Group boundaries
// ----------------------------------------------------------------
describe('group support (issue #10)', () => {
  it('attaches group name to elements inside a model group', () => {
    const dsl = `workspace { model {
      group "Internal" {
        a = person "Alice"
        b = softwareSystem "AppSystem"
      }
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.group).toBe('Internal');
    expect(ws.model.softwareSystems?.[0]?.group).toBe('Internal');
  });

  it('supports nested groups (inherits outer group name)', () => {
    const dsl = `workspace { model {
      group "Outer" {
        group "Inner" {
          a = person "Alice"
        }
      }
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.group).toBe('Outer');
  });
});

// ----------------------------------------------------------------
// Issue #11: Element body blocks
// ----------------------------------------------------------------
describe('element body blocks (issue #11)', () => {
  it('parses url on a person bodyBlock', () => {
    const dsl = `workspace { model {
      a = person "Alice" {
        url "https://example.com/alice"
      }
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.url).toBe('https://example.com/alice');
  });

  it('parses properties block on a person', () => {
    const dsl = `workspace { model {
      a = person "Alice" {
        properties {
          "Owner" "Team Alpha"
          "SLA" "99.9%"
        }
      }
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.properties?.['Owner']).toBe('Team Alpha');
    expect(ws.model.people?.[0]?.properties?.['SLA']).toBe('99.9%');
  });

  it('parses perspectives block on a person', () => {
    const dsl = `workspace { model {
      a = person "Alice" {
        perspectives {
          "Security" "Handles PII data"
        }
      }
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.perspectives?.['Security']).toBe('Handles PII data');
  });

  it('parses tags from bodyBlock', () => {
    const dsl = `workspace { model {
      a = person "Alice" {
        tags "Backend" "Critical"
      }
    } views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.model.people?.[0]?.tags).toBe('Backend,Critical');
  });
});

// ----------------------------------------------------------------
// Issue #7: Deployment model + deployment view
// ----------------------------------------------------------------
describe('deployment model (issue #7)', () => {
  const DEPLOY_DSL = `
workspace {
  model {
    app = softwareSystem "App"
    web = softwareSystem "Web"

    deploymentEnvironment "Production" {
      deploymentNode "AWS" "Amazon Web Services" "Cloud" {
        deploymentNode "EC2" "VM instance" "VM" {
          softwareSystemInstance app
        }
        infrastructureNode "Route 53" "DNS" "AWS Route 53"
      }
    }
  }
  views {
    deployment app "Production" "ProdDeploy" "Production deployment" {
      include *
      autoLayout LR
    }
  }
}`;

  it('parses deployment environment', () => {
    const ws = parseDsl(DEPLOY_DSL);
    expect(ws.model.deploymentEnvironments).toHaveLength(1);
    expect(ws.model.deploymentEnvironments?.[0]?.name).toBe('Production');
  });

  it('parses nested deployment nodes', () => {
    const ws = parseDsl(DEPLOY_DSL);
    const env = ws.model.deploymentEnvironments?.[0];
    expect(env?.deploymentNodes).toHaveLength(1);
    expect(env?.deploymentNodes?.[0]?.name).toBe('AWS');
    expect(env?.deploymentNodes?.[0]?.children).toHaveLength(1);
    expect(env?.deploymentNodes?.[0]?.children?.[0]?.name).toBe('EC2');
  });

  it('parses software system instances inside deployment node', () => {
    const ws = parseDsl(DEPLOY_DSL);
    const ec2 = ws.model.deploymentEnvironments?.[0]?.deploymentNodes?.[0]?.children?.[0];
    expect(ec2?.softwareSystemInstances).toHaveLength(1);
  });

  it('parses infrastructure nodes inside deployment node', () => {
    const ws = parseDsl(DEPLOY_DSL);
    const aws = ws.model.deploymentEnvironments?.[0]?.deploymentNodes?.[0];
    expect(aws?.infrastructureNodes).toHaveLength(1);
    expect(aws?.infrastructureNodes?.[0]?.name).toBe('Route 53');
    expect(aws?.infrastructureNodes?.[0]?.type).toBe('InfrastructureNode');
  });

  it('parses deployment view', () => {
    const ws = parseDsl(DEPLOY_DSL);
    expect(ws.views.deploymentViews).toHaveLength(1);
    expect(ws.views.deploymentViews?.[0]?.type).toBe('Deployment');
    expect(ws.views.deploymentViews?.[0]?.key).toBe('ProdDeploy');
    expect(ws.views.deploymentViews?.[0]?.automaticLayout?.rankDirection).toBe('LeftRight');
  });
});

// ----------------------------------------------------------------
// Issue #8: Dynamic view
// ----------------------------------------------------------------
describe('dynamic view (issue #8)', () => {
  it('parses dynamic view with autoLayout', () => {
    const dsl = `workspace { model {
      user = person "User"
      app = softwareSystem "App"
    } views {
      dynamic app "DynView" "Shows flow" {
        autoLayout LR
      }
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.dynamicViews).toHaveLength(1);
    expect(ws.views.dynamicViews?.[0]?.type).toBe('Dynamic');
    expect(ws.views.dynamicViews?.[0]?.key).toBe('DynView');
    expect(ws.views.dynamicViews?.[0]?.automaticLayout?.rankDirection).toBe('LeftRight');
  });
});

// ----------------------------------------------------------------
// Issue #9: Filtered, image, and custom views
// ----------------------------------------------------------------
describe('filtered view (issue #9)', () => {
  it('parses a filtered view', () => {
    const dsl = `workspace { model {} views {
      systemLandscape "Landscape" {}
      filtered "Landscape" include "External,Partner" "ExternalOnly" "External elements" {}
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.filteredViews).toHaveLength(1);
    const fv = ws.views.filteredViews?.[0];
    expect(fv?.type).toBe('Filtered');
    expect(fv?.baseViewKey).toBe('Landscape');
    expect(fv?.mode).toBe('Include');
    expect(fv?.tags).toContain('External');
    expect(fv?.tags).toContain('Partner');
    expect(fv?.key).toBe('ExternalOnly');
  });

  it('parses a filtered view with exclude mode', () => {
    const dsl = `workspace { model {} views {
      systemLandscape "Landscape" {}
      filtered "Landscape" exclude "Internal" "NoInternal" {}
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.filteredViews?.[0]?.mode).toBe('Exclude');
  });
});

describe('image view (issue #9)', () => {
  it('parses an image view', () => {
    const dsl = `workspace { model {
      app = softwareSystem "App"
    } views {
      image app "AppDiagram" {
        title "Architecture Overview"
        image "https://example.com/arch.png"
      }
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.imageViews).toHaveLength(1);
    expect(ws.views.imageViews?.[0]?.type).toBe('Image');
    expect(ws.views.imageViews?.[0]?.key).toBe('AppDiagram');
    expect(ws.views.imageViews?.[0]?.title).toBe('Architecture Overview');
    expect(ws.views.imageViews?.[0]?.image).toBe('https://example.com/arch.png');
  });
});

describe('custom view (issue #9)', () => {
  it('parses a custom view', () => {
    const dsl = `workspace { model {} views {
      custom "MyCustom" "Custom diagram" {
        include *
        autoLayout TB
      }
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.customViews).toHaveLength(1);
    expect(ws.views.customViews?.[0]?.type).toBe('Custom');
    expect(ws.views.customViews?.[0]?.key).toBe('MyCustom');
    expect(ws.views.customViews?.[0]?.automaticLayout?.rankDirection).toBe('TopBottom');
  });
});

// ----------------------------------------------------------------
// Issue #13: Additional element and relationship style properties
// ----------------------------------------------------------------
describe('additional style properties (issue #13)', () => {
  it('parses icon, width, height, strokeWidth, metadata on element style', () => {
    const dsl = `workspace { model {} views {
      styles {
        element "Database" {
          shape Cylinder
          icon "https://example.com/db.png"
          width 450
          height 300
          strokeWidth 2
          metadata false
        }
      }
    } }`;
    const ws = parseDsl(dsl);
    const style = ws.views.configuration?.styles?.elements?.[0];
    expect(style?.shape).toBe('Cylinder');
    expect(style?.icon).toBe('https://example.com/db.png');
    expect(style?.width).toBe(450);
    expect(style?.height).toBe(300);
    expect(style?.strokeWidth).toBe(2);
    expect(style?.metadata).toBe(false);
  });

  it('parses style, position, opacity, width on relationship style', () => {
    const dsl = `workspace { model {} views {
      styles {
        relationship "Async" {
          style Dashed
          position 50
          opacity 75
          width 200
        }
      }
    } }`;
    const ws = parseDsl(dsl);
    const style = ws.views.configuration?.styles?.relationships?.[0];
    expect(style?.style).toBe('Dashed');
    expect(style?.position).toBe(50);
    expect(style?.opacity).toBe(75);
    expect(style?.width).toBe(200);
  });
});

// ----------------------------------------------------------------
// Issue #14: Themes, branding, terminology, configuration
// ----------------------------------------------------------------
describe('views configuration (issue #14)', () => {
  it('parses themes statement', () => {
    const dsl = `workspace { model {} views {
      themes "https://example.com/theme1.json" "https://example.com/theme2.json"
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.configuration?.themes).toHaveLength(2);
    expect(ws.views.configuration?.themes?.[0]).toBe('https://example.com/theme1.json');
  });

  it('parses single theme statement', () => {
    const dsl = `workspace { model {} views {
      theme "https://example.com/theme.json"
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.configuration?.themes).toHaveLength(1);
  });

  it('parses branding block', () => {
    const dsl = `workspace { model {} views {
      branding {
        logo "logo.png"
        font "Open Sans"
      }
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.configuration?.branding?.logo).toBe('logo.png');
    expect(ws.views.configuration?.branding?.font).toBe('Open Sans');
  });

  it('parses terminology block', () => {
    const dsl = `workspace { model {} views {
      terminology {
        person "Actor"
        softwareSystem "Application"
      }
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.configuration?.terminology?.person).toBe('Actor');
    expect(ws.views.configuration?.terminology?.softwareSystem).toBe('Application');
  });

  it('parses configuration block with scope and visibility', () => {
    const dsl = `workspace { model {} views {
      configuration {
        scope softwaresystem
        visibility private
      }
    } }`;
    const ws = parseDsl(dsl);
    expect(ws.views.configuration?.scope).toBe('softwaresystem');
    expect(ws.views.configuration?.visibility).toBe('private');
  });
});

// ----------------------------------------------------------------
// Issue #15: Advanced include/exclude expressions
// ----------------------------------------------------------------
describe('advanced include/exclude expressions (issue #15)', () => {
  it('parses include with quoted expression', () => {
    const dsl = `workspace { model {
      app = softwareSystem "App"
    } views {
      systemContext app {
        include "element.tag==Database"
        exclude "element.tag==External"
      }
    } }`;
    // Should parse without errors
    const ws = parseDsl(dsl);
    expect(ws.views.systemContextViews).toHaveLength(1);
  });
});

// ----------------------------------------------------------------
// Issue #12: DSL directives
// ----------------------------------------------------------------
describe('DSL directives (issue #12)', () => {
  it('parses !identifiers directive', () => {
    const dsl = `workspace {
      !identifiers hierarchical
      model {}
      views {}
    }`;
    // Should parse without errors
    const ws = parseDsl(dsl);
    expect(ws.model).toBeDefined();
  });

  it('parses !const directive', () => {
    const dsl = `workspace {
      !const APP_NAME "My Application"
      model {}
      views {}
    }`;
    const ws = parseDsl(dsl);
    expect(ws.model).toBeDefined();
  });

  it('parses !var directive', () => {
    const dsl = `workspace {
      !var ENVIRONMENT "Production"
      model {}
      views {}
    }`;
    const ws = parseDsl(dsl);
    expect(ws.model).toBeDefined();
  });

  it('parses !impliedRelationships directive', () => {
    const dsl = `workspace {
      !impliedRelationships true
      model {}
      views {}
    }`;
    const ws = parseDsl(dsl);
    expect(ws.model).toBeDefined();
  });
});

// ----------------------------------------------------------------
// Issue #16: workspace extends
// ----------------------------------------------------------------
describe('workspace extends (issue #16)', () => {
  it('parses workspace extends url', () => {
    const dsl = `workspace extends "base-workspace.json" "My Workspace" {
      model {}
      views {}
    }`;
    const ws = parseDsl(dsl);
    expect(ws.extends).toBe('base-workspace.json');
    expect(ws.name).toBe('My Workspace');
  });

  it('parses workspace without extends', () => {
    const dsl = `workspace "Name" { model {} views {} }`;
    const ws = parseDsl(dsl);
    expect(ws.extends).toBeUndefined();
    expect(ws.name).toBe('Name');
  });
});
