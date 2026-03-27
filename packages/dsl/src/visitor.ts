import { AbstractParseTreeVisitor } from 'antlr4ng';
import type { StructurizrDslVisitor } from './generated/StructurizrDslVisitor.js';
import type {
    WorkspaceContext,
    ModelContext,
    PersonContext,
    SoftwareSystemContext,
    ContainerContext,
    ComponentContext,
    RelationshipContext,
    ViewsContext,
    SystemLandscapeViewContext,
    SystemContextViewContext,
    ContainerViewContext,
    ComponentViewContext,
    StylesContext,
    ElementStyleContext,
    RelationshipStyleContext,
    StringContext,
    IdentifierContext,
    TagsDefContext,
    ElementStylePropertyContext,
    RelationshipStylePropertyContext,
    AutoLayoutStatementContext,
    ViewStatementContext,
} from './generated/StructurizrDslParser.js';

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
    Shape,
    AutomaticLayout,
    ElementView,
    RelationshipView,
} from '@d3c4/types';

export class DslParseError extends Error {
    constructor(
        message: string,
        public readonly line: number,
        public readonly column: number,
        public readonly source?: string,
    ) {
        super(`[DSL Parse Error] Line ${line}, Col ${column}: ${message}`);
        this.name = 'DslParseError';
    }
}

type AliasMap = Map<string, string>;

export class WorkspaceVisitor
    extends AbstractParseTreeVisitor<any>
    implements StructurizrDslVisitor<any> {
    private _idCounter = 0;
    private aliases: AliasMap = new Map();
    private relationships: Relationship[] = [];

    private nextId(): string {
        return String(++this._idCounter);
    }

    protected defaultResult(): any {
        return null;
    }

    private getString(ctx: StringContext | undefined | null): string | undefined {
        if (!ctx) return undefined;
        const text = ctx.getText();
        if (text.startsWith('"') && text.endsWith('"')) {
            // Unescape basic string
            return text
                .slice(1, -1)
                .replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t')
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\');
        }
        return text;
    }

    private getIdentifier(ctx: IdentifierContext | undefined | null): string | undefined {
        if (!ctx) return undefined;
        return ctx.getText();
    }

    private getTags(ctx: TagsDefContext | undefined | null): string | undefined {
        if (!ctx) return undefined;
        const strings = ctx.string_();
        return strings.map((s) => this.getString(s)).join(', ');
    }

    visitWorkspace = (ctx: WorkspaceContext): StructurizrWorkspace => {
        this._idCounter = 0;
        this.aliases.clear();
        this.relationships = [];

        const name = this.getString(ctx._name);
        const description = this.getString(ctx._description);

        let model: Model = { people: [], softwareSystems: [], relationships: [] };
        let views: Views = {};

        for (const body of ctx.workspaceBody()) {
            if (body.model()) {
                model = this.visitModel(body.model()!) as Model;
            } else if (body.views()) {
                views = this.visitViews(body.views()!) as Views;
            }
        }

        return {
            name,
            description,
            model,
            views,
        };
    };

    visitModel = (ctx: ModelContext): Model => {
        const people: Person[] = [];
        const softwareSystems: SoftwareSystem[] = [];

        for (const body of ctx.modelBody()) {
            // Handle direct elements
            if (body.person()) {
                people.push(this.visitPerson(body.person()!) as Person);
            } else if (body.softwareSystem()) {
                softwareSystems.push(this.visitSoftwareSystem(body.softwareSystem()!) as SoftwareSystem);
            } else if (body.relationship()) {
                const rel = this.visitRelationship(body.relationship()!) as Relationship;
                if (rel) this.relationships.push(rel);
            }

            // Handle assignments
            else if (body.elementAssignment()) {
                const assignment = body.elementAssignment()!;
                const alias = this.getIdentifier(assignment.identifier());
                if (assignment.person()) {
                    people.push(this.visitPersonWithAlias(assignment.person()!, alias));
                } else if (assignment.softwareSystem()) {
                    softwareSystems.push(this.visitSoftwareSystemWithAlias(assignment.softwareSystem()!, alias));
                } else if (assignment.container()) {
                    // not valid at top level but we ignore or handle gracefully
                } else if (assignment.component()) {
                    // not valid at top level
                }
            }
        }

        return {
            people,
            softwareSystems,
            relationships: this.relationships,
        };
    };

    private visitPersonWithAlias(ctx: PersonContext, alias: string | undefined): Person {
        const name = this.getString(ctx._name) || '';
        const description = this.getString(ctx._description);
        const tags = this.getTags(ctx._tags);
        const id = this.nextId();
        if (alias) this.aliases.set(alias, id);

        return { type: 'Person', id, name, description, tags };
    }

    visitPerson = (ctx: PersonContext): Person => {
        return this.visitPersonWithAlias(ctx, undefined);
    };

    private visitSoftwareSystemWithAlias(ctx: SoftwareSystemContext, alias: string | undefined): SoftwareSystem {
        const name = this.getString(ctx._name) || '';
        const description = this.getString(ctx._description);
        const tags = this.getTags(ctx._tags);
        const id = this.nextId();
        if (alias) this.aliases.set(alias, id);

        const containers: Container[] = [];
        const body = ctx.softwareSystemBody();
        if (body) {
            for (const stmt of body.softwareSystemStatement()) {
                if (stmt.container()) {
                    containers.push(this.visitContainerWithAlias(stmt.container()!, undefined));
                } else if (stmt.containerAssignment()) {
                    const cAlias = this.getIdentifier(stmt.containerAssignment()!.identifier());
                    containers.push(this.visitContainerWithAlias(stmt.containerAssignment()!.container()!, cAlias));
                } else if (stmt.relationship()) {
                    const rel = this.visitRelationship(stmt.relationship()!) as Relationship;
                    if (rel) this.relationships.push(rel);
                }
            }
        }

        return { type: 'SoftwareSystem', id, name, description, tags, containers };
    }

    visitSoftwareSystem = (ctx: SoftwareSystemContext): SoftwareSystem => {
        return this.visitSoftwareSystemWithAlias(ctx, undefined);
    };

    private visitContainerWithAlias(ctx: ContainerContext, alias: string | undefined): Container {
        const name = this.getString(ctx._name) || '';
        const description = this.getString(ctx._description);
        const technology = this.getString(ctx._technology);
        const tags = this.getTags(ctx._tags);
        const id = this.nextId();
        if (alias) this.aliases.set(alias, id);

        const components: Component[] = [];
        const body = ctx.containerBody();
        if (body) {
            for (const stmt of body.containerStatement()) {
                if (stmt.component()) {
                    components.push(this.visitComponentWithAlias(stmt.component()!, undefined));
                } else if (stmt.componentAssignment()) {
                    const cAlias = this.getIdentifier(stmt.componentAssignment()!.identifier());
                    components.push(this.visitComponentWithAlias(stmt.componentAssignment()!.component()!, cAlias));
                } else if (stmt.relationship()) {
                    const rel = this.visitRelationship(stmt.relationship()!) as Relationship;
                    if (rel) this.relationships.push(rel);
                }
            }
        }

        return { type: 'Container', id, name, description, technology, tags, components };
    }

    visitContainer = (ctx: ContainerContext): Container => {
        return this.visitContainerWithAlias(ctx, undefined);
    };

    private visitComponentWithAlias(ctx: ComponentContext, alias: string | undefined): Component {
        const name = this.getString(ctx._name) || '';
        const description = this.getString(ctx._description);
        const technology = this.getString(ctx._technology);
        const tags = this.getTags(ctx._tags);
        const id = this.nextId();
        if (alias) this.aliases.set(alias, id);

        const body = ctx.bodyBlock();
        if (body) {
            for (const relCtx of body.relationship()) {
                const rel = this.visitRelationship(relCtx) as Relationship;
                if (rel) this.relationships.push(rel);
            }
        }

        return { type: 'Component', id, name, description, technology, tags };
    }

    visitComponent = (ctx: ComponentContext): Component => {
        return this.visitComponentWithAlias(ctx, undefined);
    };

    visitRelationship = (ctx: RelationshipContext): Relationship | null => {
        const sourceAlias = this.getIdentifier(ctx._source);
        const destAlias = this.getString(ctx._destination); // destination can be string or ident
        if (!sourceAlias || !destAlias) return null;

        const description = this.getString(ctx._description);
        const technology = this.getString(ctx._technology);
        const tags = this.getTags(ctx._tags);

        const sourceId = this.aliases.get(sourceAlias);
        const destinationId = this.aliases.get(destAlias);

        if (!sourceId) {
            throw new DslParseError(
                `Unknown identifier '${sourceAlias}'`,
                ctx.start?.line ?? 1,
                ctx.start?.column ?? 0
            );
        }
        if (!destinationId) {
            throw new DslParseError(
                `Unknown identifier '${destAlias}'`,
                ctx._destination?.start?.line ?? 1,
                ctx._destination?.start?.column ?? 0
            );
        }

        return {
            id: this.nextId(),
            sourceId,
            destinationId,
            description,
            technology,
            tags,
        };
    };

    visitViews = (ctx: ViewsContext): Views => {
        const systemLandscapeViews: any[] = [];
        const systemContextViews: any[] = [];
        const containerViews: any[] = [];
        const componentViews: any[] = [];
        let elementStyles: ElementStyle[] = [];
        let relationshipStyles: RelationshipStyle[] = [];

        for (const body of ctx.viewsBody()) {
            if (body.systemLandscapeView()) {
                systemLandscapeViews.push(this.visitSystemLandscapeView(body.systemLandscapeView()!));
            } else if (body.systemContextView()) {
                systemContextViews.push(this.visitSystemContextView(body.systemContextView()!));
            } else if (body.containerView()) {
                containerViews.push(this.visitContainerView(body.containerView()!));
            } else if (body.componentView()) {
                componentViews.push(this.visitComponentView(body.componentView()!));
            } else if (body.styles()) {
                const styles = this.visitStyles(body.styles()!) as any;
                elementStyles = styles.elements;
                relationshipStyles = styles.relationships;
            }
        }

        return {
            ...(systemLandscapeViews.length && { systemLandscapeViews }),
            ...(systemContextViews.length && { systemContextViews }),
            ...(containerViews.length && { containerViews }),
            ...(componentViews.length && { componentViews }),
            ...((elementStyles.length || relationshipStyles.length) && {
                configuration: {
                    styles: {
                        elements: elementStyles,
                        relationships: relationshipStyles,
                    },
                },
            }),
        };
    };

    private parseViewBody(ctx: any): { autoLayout?: AutomaticLayout } {
        let autoLayout: AutomaticLayout | undefined;
        if (ctx && ctx.viewStatement()) {
            for (const stmt of (ctx.viewStatement() as ViewStatementContext[])) {
                if (stmt.autoLayoutStatement()) {
                    autoLayout = this.visitAutoLayoutStatement(stmt.autoLayoutStatement()!) as AutomaticLayout;
                }
            }
        }
        return { autoLayout };
    }

    visitSystemLandscapeView = (ctx: SystemLandscapeViewContext): any => {
        const key = this.getString(ctx._key) || 'landscape';
        const title = this.getString(ctx._description); // description actually maps to title optionally
        const { autoLayout } = this.parseViewBody(ctx.viewBody());
        return { type: 'SystemLandscape', key, title, elements: [], relationships: [], automaticLayout: autoLayout };
    };

    visitSystemContextView = (ctx: SystemContextViewContext): any => {
        const systemAlias = this.getIdentifier(ctx._systemIdentifier) || '';
        const softwareSystemId = this.aliases.get(systemAlias) ?? systemAlias;
        const key = this.getString(ctx._key) || systemAlias + '-context';
        const title = this.getString(ctx._description);
        const { autoLayout } = this.parseViewBody(ctx.viewBody());
        return { type: 'SystemContext', key, title, softwareSystemId, elements: [], relationships: [], automaticLayout: autoLayout };
    };

    visitContainerView = (ctx: ContainerViewContext): any => {
        const systemAlias = this.getIdentifier(ctx._systemIdentifier) || '';
        const softwareSystemId = this.aliases.get(systemAlias) ?? systemAlias;
        const key = this.getString(ctx._key) || systemAlias + '-containers';
        const title = this.getString(ctx._description);
        const { autoLayout } = this.parseViewBody(ctx.viewBody());
        return { type: 'Container', key, title, softwareSystemId, elements: [], relationships: [], automaticLayout: autoLayout };
    };

    visitComponentView = (ctx: ComponentViewContext): any => {
        const containerAlias = this.getIdentifier(ctx._containerIdentifier) || '';
        const containerId = this.aliases.get(containerAlias) ?? containerAlias;
        const key = this.getString(ctx._key) || containerAlias + '-components';
        const title = this.getString(ctx._description);
        const { autoLayout } = this.parseViewBody(ctx.viewBody());
        return { type: 'Component', key, title, containerId, elements: [], relationships: [], automaticLayout: autoLayout };
    };

    visitAutoLayoutStatement = (ctx: AutoLayoutStatementContext): AutomaticLayout => {
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

        const dir = this.getIdentifier(ctx._direction) || 'TB';
        const rankSep = ctx._rankSep ? Number(this.getIdentifier(ctx._rankSep)) : undefined;
        const nodeSep = ctx._nodeSep ? Number(this.getIdentifier(ctx._nodeSep)) : undefined;

        return {
            rankDirection: dirMap[dirUpperCase(dir)] ?? dirMap[dir] ?? 'TopBottom',
            rankSeparation: !isNaN(rankSep as any) ? rankSep : undefined,
            nodeSeparation: !isNaN(nodeSep as any) ? nodeSep : undefined,
        };
    };

    visitStyles = (ctx: StylesContext): any => {
        const elements: ElementStyle[] = [];
        const relationships: RelationshipStyle[] = [];

        for (const body of ctx.stylesBody()) {
            if (body.elementStyle()) {
                elements.push(this.visitElementStyle(body.elementStyle()!) as ElementStyle);
            } else if (body.relationshipStyle()) {
                relationships.push(this.visitRelationshipStyle(body.relationshipStyle()!) as RelationshipStyle);
            }
        }

        return { elements, relationships };
    };

    visitElementStyle = (ctx: ElementStyleContext): ElementStyle => {
        const tag = this.getString(ctx._tag) || '';
        let background: string | undefined;
        let color: string | undefined;
        let stroke: string | undefined;
        let shape: Shape | undefined;
        let fontSize: number | undefined;
        let border: ElementStyle['border'] | undefined;
        let opacity: number | undefined;

        for (const prop of ctx.elementStyleProperty()) {
            if (prop.BACKGROUND()) background = this.getString(prop._color);
            else if (prop.COLOR() || prop.COLOUR()) color = this.getString(prop._color);
            else if (prop.STROKE()) stroke = this.getString(prop._color);
            else if (prop.SHAPE()) shape = this.getString(prop._shape) as Shape;
            else if (prop.FONT_SIZE()) fontSize = Number(this.getString(prop._size));
            else if (prop.BORDER()) border = this.getString(prop._border) as ElementStyle['border'];
            else if (prop.OPACITY()) opacity = Number(this.getString(prop._opacity));
        }

        return { tag, background, color, stroke, shape, fontSize, border, opacity };
    };

    visitRelationshipStyle = (ctx: RelationshipStyleContext): RelationshipStyle => {
        const tag = this.getString(ctx._tag) || '';
        let color: string | undefined;
        let thickness: number | undefined;
        let dashed: boolean | undefined;
        let routing: RelationshipStyle['routing'] | undefined;
        let fontSize: number | undefined;

        for (const prop of ctx.relationshipStyleProperty()) {
            if (prop.COLOR() || prop.COLOUR()) color = this.getString(prop._color);
            else if (prop.THICKNESS()) thickness = Number(this.getString(prop._thickness));
            else if (prop.DASHED()) {
                const val = this.getString(prop._dashed);
                dashed = val === 'true' || val === '1';
            } else if (prop.ROUTING()) routing = this.getString(prop._routing) as RelationshipStyle['routing'];
            else if (prop.FONT_SIZE()) fontSize = Number(this.getString(prop._size));
        }

        return { tag, color, thickness, dashed, routing, fontSize };
    };
}

function dirUpperCase(dir: string): string {
    return dir.toUpperCase();
}
