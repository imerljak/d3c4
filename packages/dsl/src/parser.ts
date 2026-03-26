import { tokenize, type Token } from './lexer.js';
import { DslParseError } from './errors.js';
import type {
  StructurizrWorkspace,
  Model,
  Views,
  Person,
  SoftwareSystem,
  Container,
  Component,
  Relationship,
  ElementStyle,
  RelationshipStyle,
  AutomaticLayout,
  ElementView,
  RelationshipView,
  Shape,
} from '@d3c4/types';

// Mutable internal versions for building during parsing
interface MutableModel {
  people: Person[];
  softwareSystems: SoftwareSystem[];
  relationships: Relationship[];
  // top-level relationship IDs need a counter
}

let _idCounter = 0;
function nextId(): string {
  return String(++_idCounter);
}

// Map from identifier alias to element id
type AliasMap = Map<string, string>;

export function parseDsl(dsl: string): StructurizrWorkspace {
  _idCounter = 0;
  const tokens = tokenize(dsl);
  let pos = 0;

  function peek(offset = 0): Token {
    return tokens[pos + offset] ?? tokens[tokens.length - 1]!;
  }

  function consume(): Token {
    return tokens[pos++] ?? tokens[tokens.length - 1]!;
  }

  function expect(type: Token['type'], value?: string): Token {
    const t = peek();
    if (t.type !== type || (value !== undefined && t.value !== value)) {
      throw new DslParseError(
        `Expected ${value ?? type} but got '${t.value}'`,
        t.line,
        t.column,
      );
    }
    return consume();
  }

  function at(type: Token['type'], value?: string): boolean {
    const t = peek();
    return t.type === type && (value === undefined || t.value === value);
  }

  function atIdentifier(value: string): boolean {
    return at('IDENTIFIER', value);
  }

  /** Consume an optional string token, return its value or undefined */
  function optString(): string | undefined {
    if (at('STRING')) return consume().value;
    return undefined;
  }

  /** Parse a quoted string OR an identifier (for unquoted values) */
  function stringOrIdent(): string {
    if (at('STRING')) return consume().value;
    if (at('IDENTIFIER')) return consume().value;
    if (at('HASH_COLOR')) return consume().value;
    const t = peek();
    throw new DslParseError(`Expected string or identifier, got '${t.value}'`, t.line, t.column);
  }

  /** Parse optional [tags] bracket. Returns comma-separated tag string or undefined. */
  function optTags(): string | undefined {
    if (!at('LBRACKET')) return undefined;
    consume(); // [
    const tags: string[] = [];
    while (!at('RBRACKET') && !at('EOF')) {
      tags.push(stringOrIdent());
      if (at('IDENTIFIER', ',') || (at('IDENTIFIER') && peek().value === ',')) {
        // skip commas if present
      }
    }
    expect('RBRACKET');
    return tags.join(', ');
  }

  // ─── Top-level ──────────────────────────────────────────────────────────────

  // Optional workspace name/desc before {
  expect('IDENTIFIER', 'workspace');
  const wsName = optString();
  const wsDesc = optString();
  expect('LBRACE');

  let model: Model = { people: [], softwareSystems: [], relationships: [] };
  let views: Views = {};
  const aliasMap: AliasMap = new Map();

  while (!at('RBRACE') && !at('EOF')) {
    if (atIdentifier('model')) {
      consume();
      expect('LBRACE');
      const result = parseModel(aliasMap);
      model = result;
      expect('RBRACE');
    } else if (atIdentifier('views')) {
      consume();
      expect('LBRACE');
      views = parseViews(aliasMap);
      expect('RBRACE');
    } else {
      // skip unknown top-level blocks
      skipUnknownBlock();
    }
  }

  expect('RBRACE');

  return {
    name: wsName,
    description: wsDesc,
    model,
    views,
  };

  // ─── Model ──────────────────────────────────────────────────────────────────

  function parseModel(aliases: AliasMap): Model {
    const people: Person[] = [];
    const softwareSystems: SoftwareSystem[] = [];
    const relationships: Relationship[] = [];

    while (!at('RBRACE') && !at('EOF')) {
      // assignment: alias = person|softwareSystem|...
      if (at('IDENTIFIER') && peek(1).type === 'EQUALS') {
        const alias = consume().value;
        consume(); // =
        const element = parseModelElement(alias, aliases, relationships);
        if (element.type === 'Person') people.push(element as Person);
        else if (element.type === 'SoftwareSystem') softwareSystems.push(element as SoftwareSystem);
      } else if (atIdentifier('person')) {
        const p = parsePerson(undefined, aliases, relationships);
        people.push(p);
      } else if (atIdentifier('softwareSystem')) {
        const ss = parseSoftwareSystem(undefined, aliases, relationships);
        softwareSystems.push(ss);
      } else if (at('IDENTIFIER') && peek(1).type === 'ARROW') {
        // relationship: source -> dest "desc" "tech" [tags]
        const rel = parseRelationshipStatement(aliases);
        if (rel) relationships.push(rel);
      } else {
        skipUnknownBlock();
      }
    }

    return { people, softwareSystems, relationships };
  }

  function parseModelElement(
    alias: string | undefined,
    aliases: AliasMap,
    relationships: Relationship[],
  ): Person | SoftwareSystem {
    if (atIdentifier('person')) return parsePerson(alias, aliases, relationships);
    if (atIdentifier('softwareSystem')) return parseSoftwareSystem(alias, aliases, relationships);
    const t = peek();
    throw new DslParseError(
      `Expected element type (person, softwareSystem), got '${t.value}'`,
      t.line,
      t.column,
    );
  }

  function parsePerson(
    alias: string | undefined,
    aliases: AliasMap,
    _relationships: Relationship[],
  ): Person {
    expect('IDENTIFIER', 'person');
    const name = stringOrIdent();
    const description = optString();
    const tags = optTags();
    const id = nextId();
    if (alias) aliases.set(alias, id);

    // Optional inline block (currently ignored but consumed)
    if (at('LBRACE')) {
      consume();
      while (!at('RBRACE') && !at('EOF')) consume();
      consume();
    }

    return { type: 'Person', id, name, description, tags };
  }

  function parseSoftwareSystem(
    alias: string | undefined,
    aliases: AliasMap,
    relationships: Relationship[],
  ): SoftwareSystem {
    expect('IDENTIFIER', 'softwareSystem');
    const name = stringOrIdent();
    const description = optString();
    const tags = optTags();
    const id = nextId();
    if (alias) aliases.set(alias, id);

    const containers: Container[] = [];

    if (at('LBRACE')) {
      consume();
      while (!at('RBRACE') && !at('EOF')) {
        if (at('IDENTIFIER') && peek(1).type === 'EQUALS') {
          const cAlias = consume().value;
          consume(); // =
          if (atIdentifier('container')) {
            const c = parseContainer(cAlias, aliases, relationships);
            containers.push(c);
          } else {
            skipUnknownBlock();
          }
        } else if (atIdentifier('container')) {
          containers.push(parseContainer(undefined, aliases, relationships));
        } else if (at('IDENTIFIER') && peek(1).type === 'ARROW') {
          const rel = parseRelationshipStatement(aliases);
          if (rel) relationships.push(rel);
        } else {
          skipUnknownBlock();
        }
      }
      consume(); // }
    }

    return { type: 'SoftwareSystem', id, name, description, tags, containers };
  }

  function parseContainer(
    alias: string | undefined,
    aliases: AliasMap,
    relationships: Relationship[],
  ): Container {
    expect('IDENTIFIER', 'container');
    const name = stringOrIdent();
    const description = optString();
    const technology = optString();
    const tags = optTags();
    const id = nextId();
    if (alias) aliases.set(alias, id);

    const components: Component[] = [];

    if (at('LBRACE')) {
      consume();
      while (!at('RBRACE') && !at('EOF')) {
        if (at('IDENTIFIER') && peek(1).type === 'EQUALS') {
          const compAlias = consume().value;
          consume(); // =
          if (atIdentifier('component')) {
            const comp = parseComponent(compAlias, aliases, relationships);
            components.push(comp);
          } else {
            skipUnknownBlock();
          }
        } else if (atIdentifier('component')) {
          components.push(parseComponent(undefined, aliases, relationships));
        } else if (at('IDENTIFIER') && peek(1).type === 'ARROW') {
          const rel = parseRelationshipStatement(aliases);
          if (rel) relationships.push(rel);
        } else {
          skipUnknownBlock();
        }
      }
      consume(); // }
    }

    return { type: 'Container', id, name, description, technology, tags, components };
  }

  function parseComponent(
    alias: string | undefined,
    aliases: AliasMap,
    relationships: Relationship[],
  ): Component {
    expect('IDENTIFIER', 'component');
    const name = stringOrIdent();
    const description = optString();
    const technology = optString();
    const tags = optTags();
    const id = nextId();
    if (alias) aliases.set(alias, id);

    if (at('LBRACE')) {
      consume();
      while (!at('RBRACE') && !at('EOF')) {
        if (at('IDENTIFIER') && peek(1).type === 'ARROW') {
          const rel = parseRelationshipStatement(aliases);
          if (rel) relationships.push(rel);
        } else {
          skipUnknownBlock();
        }
      }
      consume();
    }

    return { type: 'Component', id, name, description, technology, tags };
  }

  function parseRelationshipStatement(aliases: AliasMap): Relationship | null {
    const sourceTok = peek();
    if (!at('IDENTIFIER')) return null;
    const sourceAlias = consume().value;
    if (!at('ARROW')) {
      // not a relationship, put back — but we can't really put back, so skip
      return null;
    }
    consume(); // ->
    const destAlias = stringOrIdent();
    const description = optString();
    const technology = optString();
    const tags = optTags();

    const sourceId = aliases.get(sourceAlias);
    const destinationId = aliases.get(destAlias);

    if (!sourceId) {
      throw new DslParseError(
        `Unknown identifier '${sourceAlias}'`,
        sourceTok.line,
        sourceTok.column,
      );
    }
    if (!destinationId) {
      throw new DslParseError(
        `Unknown identifier '${destAlias}'`,
        sourceTok.line,
        sourceTok.column,
      );
    }

    return {
      id: nextId(),
      sourceId,
      destinationId,
      description,
      technology,
      tags,
    };
  }

  // ─── Views ──────────────────────────────────────────────────────────────────

  function parseViews(aliases: AliasMap): Views {
    const systemContextViews = [];
    const containerViews = [];
    const componentViews = [];
    const systemLandscapeViews = [];
    let elementStyles: ElementStyle[] = [];
    let relationshipStyles: RelationshipStyle[] = [];

    while (!at('RBRACE') && !at('EOF')) {
      if (atIdentifier('systemContext')) {
        consume();
        systemContextViews.push(parseSystemContextView(aliases));
      } else if (atIdentifier('container')) {
        consume();
        containerViews.push(parseContainerView(aliases));
      } else if (atIdentifier('component')) {
        consume();
        componentViews.push(parseComponentView(aliases));
      } else if (atIdentifier('systemLandscape')) {
        consume();
        systemLandscapeViews.push(parseSystemLandscapeView());
      } else if (atIdentifier('styles')) {
        consume();
        expect('LBRACE');
        const s = parseStyles();
        elementStyles = s.elements;
        relationshipStyles = s.relationships;
        expect('RBRACE');
      } else {
        skipUnknownBlock();
      }
    }

    const result: Views = {
      ...(systemLandscapeViews.length && { systemLandscapeViews: systemLandscapeViews as any }),
      ...(systemContextViews.length && { systemContextViews: systemContextViews as any }),
      ...(containerViews.length && { containerViews: containerViews as any }),
      ...(componentViews.length && { componentViews: componentViews as any }),
      ...((elementStyles.length || relationshipStyles.length) && {
        configuration: {
          styles: {
            elements: elementStyles,
            relationships: relationshipStyles,
          },
        },
      }),
    };

    return result;
  }

  function parseSystemLandscapeView() {
    const key = at('STRING') ? consume().value : (at('IDENTIFIER') ? consume().value : 'landscape');
    const title = optString();
    const { elements, relationships, autoLayout } = parseViewBody();
    return { type: 'SystemLandscape' as const, key, title, elements, relationships, automaticLayout: autoLayout };
  }

  function parseSystemContextView(aliases: AliasMap) {
    // systemContext <softwareSystemIdentifier> [key] [title] { ... }
    const systemAlias = at('IDENTIFIER') ? consume().value : '';
    const softwareSystemId = aliases.get(systemAlias) ?? systemAlias;
    const key = at('STRING') ? consume().value : (at('IDENTIFIER') && !at('IDENTIFIER', '{') ? consume().value : systemAlias + '-context');
    const title = optString();
    const { elements, relationships, autoLayout } = parseViewBody();
    return { type: 'SystemContext' as const, key, title, softwareSystemId, elements, relationships, automaticLayout: autoLayout };
  }

  function parseContainerView(aliases: AliasMap) {
    const systemAlias = at('IDENTIFIER') ? consume().value : '';
    const softwareSystemId = aliases.get(systemAlias) ?? systemAlias;
    const key = at('STRING') ? consume().value : (at('IDENTIFIER') && !at('IDENTIFIER', '{') ? consume().value : systemAlias + '-containers');
    const title = optString();
    const { elements, relationships, autoLayout } = parseViewBody();
    return { type: 'Container' as const, key, title, softwareSystemId, elements, relationships, automaticLayout: autoLayout };
  }

  function parseComponentView(aliases: AliasMap) {
    const containerAlias = at('IDENTIFIER') ? consume().value : '';
    const containerId = aliases.get(containerAlias) ?? containerAlias;
    const key = at('STRING') ? consume().value : (at('IDENTIFIER') && !at('IDENTIFIER', '{') ? consume().value : containerAlias + '-components');
    const title = optString();
    const { elements, relationships, autoLayout } = parseViewBody();
    return { type: 'Component' as const, key, title, containerId, elements, relationships, automaticLayout: autoLayout };
  }

  function parseViewBody(): {
    elements: ElementView[];
    relationships: RelationshipView[];
    autoLayout?: AutomaticLayout;
  } {
    expect('LBRACE');
    let autoLayout: AutomaticLayout | undefined;
    const elements: ElementView[] = [];
    const relationships: RelationshipView[] = [];

    while (!at('RBRACE') && !at('EOF')) {
      if (atIdentifier('include')) {
        consume();
        // include * or include id1 id2 ...
        while (!at('LBRACE') && !at('RBRACE') && !at('EOF') &&
               !(at('IDENTIFIER') && isViewKeyword(peek().value))) {
          consume(); // we'll compute includes from model instead
        }
      } else if (atIdentifier('exclude')) {
        consume();
        while (!at('LBRACE') && !at('RBRACE') && !at('EOF') &&
               !(at('IDENTIFIER') && isViewKeyword(peek().value))) {
          consume();
        }
      } else if (atIdentifier('autoLayout')) {
        consume();
        autoLayout = parseAutoLayout();
      } else if (atIdentifier('title')) {
        consume();
        optString(); // consume title string
      } else if (atIdentifier('description')) {
        consume();
        optString();
      } else {
        skipUnknownBlock();
      }
    }

    expect('RBRACE');
    return { elements, relationships, autoLayout };
  }

  function isViewKeyword(v: string): boolean {
    return ['include', 'exclude', 'autoLayout', 'title', 'description', 'animation'].includes(v);
  }

  function parseAutoLayout(): AutomaticLayout {
    const dir = at('IDENTIFIER') ? consume().value : 'TB';
    const rankSep = at('IDENTIFIER') && !isNaN(Number(peek().value)) ? Number(consume().value) : undefined;
    const nodeSep = at('IDENTIFIER') && !isNaN(Number(peek().value)) ? Number(consume().value) : undefined;

    const dirMap: Record<string, AutomaticLayout['rankDirection']> = {
      TB: 'TopBottom',
      BT: 'BottomTop',
      LR: 'LeftRight',
      RL: 'RightLeft',
      TopBottom: 'TopBottom',
      BottomTop: 'BottomTop',
      LeftRight: 'LeftRight',
      RightLeft: 'RightLeft',
    };

    return {
      rankDirection: dirMap[dir] ?? 'TopBottom',
      rankSeparation: rankSep,
      nodeSeparation: nodeSep,
    };
  }

  // ─── Styles ─────────────────────────────────────────────────────────────────

  function parseStyles(): { elements: ElementStyle[]; relationships: RelationshipStyle[] } {
    const elements: ElementStyle[] = [];
    const relationships: RelationshipStyle[] = [];

    while (!at('RBRACE') && !at('EOF')) {
      if (atIdentifier('element')) {
        consume();
        const tag = stringOrIdent();
        expect('LBRACE');
        const style = parseElementStyleBody(tag);
        elements.push(style);
        expect('RBRACE');
      } else if (atIdentifier('relationship')) {
        consume();
        const tag = stringOrIdent();
        expect('LBRACE');
        const style = parseRelationshipStyleBody(tag);
        relationships.push(style);
        expect('RBRACE');
      } else {
        skipUnknownBlock();
      }
    }

    return { elements, relationships };
  }

  function parseElementStyleBody(tag: string): ElementStyle {
    let background: string | undefined;
    let color: string | undefined;
    let stroke: string | undefined;
    let shape: Shape | undefined;
    let fontSize: number | undefined;
    let border: ElementStyle['border'] | undefined;
    let opacity: number | undefined;

    while (!at('RBRACE') && !at('EOF')) {
      if (atIdentifier('background')) {
        consume();
        background = consumeColorValue();
      } else if (atIdentifier('color') || atIdentifier('colour')) {
        consume();
        color = consumeColorValue();
      } else if (atIdentifier('stroke')) {
        consume();
        stroke = consumeColorValue();
      } else if (atIdentifier('shape')) {
        consume();
        shape = stringOrIdent() as Shape;
      } else if (atIdentifier('fontSize')) {
        consume();
        fontSize = Number(stringOrIdent());
      } else if (atIdentifier('border')) {
        consume();
        border = stringOrIdent() as ElementStyle['border'];
      } else if (atIdentifier('opacity')) {
        consume();
        opacity = Number(stringOrIdent());
      } else {
        // unknown property, consume key + value
        consume();
        if (!at('RBRACE') && !at('LBRACE') && !at('EOF')) consume();
      }
      // optional semicolon
      if (at('SEMICOLON')) consume();
    }

    return { tag, background, color, stroke, shape, fontSize, border, opacity };
  }

  function parseRelationshipStyleBody(tag: string): RelationshipStyle {
    let color: string | undefined;
    let thickness: number | undefined;
    let dashed: boolean | undefined;
    let routing: RelationshipStyle['routing'] | undefined;
    let fontSize: number | undefined;

    while (!at('RBRACE') && !at('EOF')) {
      if (atIdentifier('color') || atIdentifier('colour')) {
        consume();
        color = consumeColorValue();
      } else if (atIdentifier('thickness')) {
        consume();
        thickness = Number(stringOrIdent());
      } else if (atIdentifier('dashed')) {
        consume();
        const val = stringOrIdent();
        dashed = val === 'true' || val === '1';
      } else if (atIdentifier('routing')) {
        consume();
        routing = stringOrIdent() as RelationshipStyle['routing'];
      } else if (atIdentifier('fontSize')) {
        consume();
        fontSize = Number(stringOrIdent());
      } else {
        consume();
        if (!at('RBRACE') && !at('LBRACE') && !at('EOF')) consume();
      }
      if (at('SEMICOLON')) consume();
    }

    return { tag, color, thickness, dashed, routing, fontSize };
  }

  function consumeColorValue(): string {
    if (at('HASH_COLOR')) return consume().value;
    if (at('STRING')) return consume().value;
    if (at('IDENTIFIER')) return consume().value;
    return '';
  }

  // ─── Utility ────────────────────────────────────────────────────────────────

  function skipUnknownBlock(): void {
    // Skip a property (key value) or a block (key { ... })
    if (at('EOF')) return;
    consume(); // consume the keyword/key

    if (at('LBRACE')) {
      // skip entire block
      consume();
      let depth = 1;
      while (!at('EOF') && depth > 0) {
        if (at('LBRACE')) depth++;
        else if (at('RBRACE')) depth--;
        consume();
      }
    } else {
      // skip until end of "line" (next IDENTIFIER that starts a statement, or RBRACE)
      while (!at('RBRACE') && !at('LBRACE') && !at('EOF')) {
        const t = peek();
        // If next token looks like a new statement keyword, stop
        if (t.type === 'IDENTIFIER' && isStatementKeyword(t.value)) break;
        consume();
      }
    }
  }

  function isStatementKeyword(v: string): boolean {
    return [
      'model', 'views', 'person', 'softwareSystem', 'container', 'component',
      'systemContext', 'systemLandscape', 'styles', 'element', 'relationship',
      'include', 'exclude', 'autoLayout', 'title', 'description',
    ].includes(v);
  }
}
