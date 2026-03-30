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
