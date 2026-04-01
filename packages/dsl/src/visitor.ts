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
    DynamicViewContext,
    DeploymentViewContext,
    FilteredViewContext,
    ImageViewContext,
    CustomViewContext,
    StylesContext,
    ElementStyleContext,
    RelationshipStyleContext,
    StringContext,
    IdentifierContext,
    ElementStylePropertyContext,
    RelationshipStylePropertyContext,
    AutoLayoutStatementContext,
    ViewStatementContext,
    GroupContext,
    DeploymentEnvironmentContext,
    DeploymentNodeContext,
    InfrastructureNodeContext,
    SoftwareSystemInstanceContext,
    ContainerInstanceContext,
    BodyBlockContext,
    BrandingBlockContext,
    TerminologyBlockContext,
    ConfigurationBlockContext,
    ThemeStatementContext,
    ThemesStatementContext,
} from './generated/StructurizrDslParser.js';

import type {
    StructurizrWorkspace,
    Model,
    Views,
    ViewsConfiguration,
    Branding,
    Terminology,
    Person,
    SoftwareSystem,
    Container,
    Component,
    Relationship,
    DeploymentEnvironment,
    DeploymentNode,
    InfrastructureNode,
    SoftwareSystemInstance,
    ContainerInstance,
    ElementStyle,
    RelationshipStyle,
    Shape,
    AutomaticLayout,
    ElementView,
    RelationshipView,
    FilteredView,
    ImageView,
    CustomView,
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

    private getTags(ctx: StringContext | undefined | null): string | undefined {
        return this.getString(ctx);
    }

    visitWorkspace = (ctx: WorkspaceContext): StructurizrWorkspace => {
        this._idCounter = 0;
        this.aliases.clear();
        this.relationships = [];

        const name = this.getString(ctx._name);
        const description = this.getString(ctx._description);
        const extendsUrl = this.getString(ctx._extendsUrl);

        let model: Model = { people: [], softwareSystems: [], relationships: [] };
        let views: Views = {};

        for (const body of ctx.workspaceBody()) {
            if (body.model()) {
                model = this.visitModel(body.model()!) as Model;
            } else if (body.views()) {
                views = this.visitViews(body.views()!) as Views;
            }
            // directives are parsed/stored but not currently acted on
        }

        return {
            name,
            description,
            ...(extendsUrl && { extends: extendsUrl }),
            model,
            views,
        };
    };

    visitModel = (ctx: ModelContext): Model => {
        const people: Person[] = [];
        const softwareSystems: SoftwareSystem[] = [];
        const deploymentEnvironments: DeploymentEnvironment[] = [];

        for (const body of ctx.modelBody()) {
            if (body.person()) {
                people.push(this.visitPerson(body.person()!) as Person);
            } else if (body.softwareSystem()) {
                softwareSystems.push(this.visitSoftwareSystem(body.softwareSystem()!) as SoftwareSystem);
            } else if (body.relationship()) {
                const rel = this.visitRelationship(body.relationship()!) as Relationship;
                if (rel) this.relationships.push(rel);
            } else if (body.group()) {
                const result = this.visitGroupInModel(body.group()!, undefined);
                people.push(...result.people);
                softwareSystems.push(...result.softwareSystems);
            } else if (body.deploymentEnvironment()) {
                deploymentEnvironments.push(this.visitDeploymentEnvironment(body.deploymentEnvironment()!));
            } else if (body.elementAssignment()) {
                const assignment = body.elementAssignment()!;
                const alias = this.getIdentifier(assignment.identifier());
                if (assignment.person()) {
                    people.push(this.visitPersonWithAlias(assignment.person()!, alias));
                } else if (assignment.softwareSystem()) {
                    softwareSystems.push(this.visitSoftwareSystemWithAlias(assignment.softwareSystem()!, alias));
                }
            }
        }

        return {
            people,
            softwareSystems,
            ...(deploymentEnvironments.length && { deploymentEnvironments }),
            relationships: this.relationships,
        };
    };

    private visitGroupInModel(ctx: GroupContext, groupName: string | undefined): { people: Person[]; softwareSystems: SoftwareSystem[] } {
        const name = groupName ?? this.getString(ctx._name);
        const people: Person[] = [];
        const softwareSystems: SoftwareSystem[] = [];

        for (const body of ctx.groupModelBody()) {
            if (body.person()) {
                const p = this.visitPersonWithAlias(body.person()!, undefined);
                people.push({ ...p, group: name });
            } else if (body.softwareSystem()) {
                const ss = this.visitSoftwareSystemWithAlias(body.softwareSystem()!, undefined);
                softwareSystems.push({ ...ss, group: name });
            } else if (body.relationship()) {
                const rel = this.visitRelationship(body.relationship()!) as Relationship;
                if (rel) this.relationships.push(rel);
            } else if (body.elementAssignment()) {
                const assignment = body.elementAssignment()!;
                const alias = this.getIdentifier(assignment.identifier());
                if (assignment.person()) {
                    const p = this.visitPersonWithAlias(assignment.person()!, alias);
                    people.push({ ...p, group: name });
                } else if (assignment.softwareSystem()) {
                    const ss = this.visitSoftwareSystemWithAlias(assignment.softwareSystem()!, alias);
                    softwareSystems.push({ ...ss, group: name });
                }
            } else if (body.group()) {
                // Nested group — inherit outer group name (or use nested name)
                const nested = this.visitGroupInModel(body.group()!, name);
                people.push(...nested.people);
                softwareSystems.push(...nested.softwareSystems);
            }
        }

        return { people, softwareSystems };
    }

    private parseBodyBlock(ctx: BodyBlockContext | null | undefined): {
        url?: string;
        tags?: string;
        properties?: Record<string, string>;
        perspectives?: Record<string, string>;
    } {
        if (!ctx) return {};
        let url: string | undefined;
        let tags: string | undefined;
        let properties: Record<string, string> | undefined;
        let perspectives: Record<string, string> | undefined;

        for (const stmt of ctx.bodyStatement()) {
            if (stmt.urlStatement()) {
                url = this.getString(stmt.urlStatement()!._value);
            } else if (stmt.tagsStatement()) {
                const tagStrs = stmt.tagsStatement()!.string_().map((s: any) => this.getString(s) || '');
                tags = tagStrs.join(',');
            } else if (stmt.propertiesStatement()) {
                properties = {};
                for (const entry of stmt.propertiesStatement()!.propertyEntry()) {
                    const k = this.getString(entry._key);
                    const v = this.getString(entry._value);
                    if (k && v !== undefined) properties[k] = v;
                }
            } else if (stmt.perspectivesStatement()) {
                perspectives = {};
                for (const entry of stmt.perspectivesStatement()!.perspectiveEntry()) {
                    const n = this.getString(entry._name);
                    const d = this.getString(entry._description);
                    if (n && d !== undefined) perspectives[n] = d;
                }
            }
        }

        return { url, tags, properties, perspectives };
    }

    private visitPersonWithAlias(ctx: PersonContext, alias: string | undefined): Person {
        const name = this.getString(ctx._name) || '';
        const description = this.getString(ctx._description);
        const tags = this.getTags(ctx._tags);
        const id = this.nextId();
        if (alias) this.aliases.set(alias, id);

        const bodyData = this.parseBodyBlock(ctx.bodyBlock());

        return {
            type: 'Person',
            id,
            name,
            description,
            tags: tags ?? bodyData.tags,
            ...(bodyData.url && { url: bodyData.url }),
            ...(bodyData.properties && { properties: bodyData.properties }),
            ...(bodyData.perspectives && { perspectives: bodyData.perspectives }),
        };
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
                } else if (stmt.group()) {
                    // group inside softwareSystem body — currently ignored at container level
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

        const bodyData = this.parseBodyBlock(ctx.bodyBlock());

        // Also handle relationships inside bodyBlock
        if (ctx.bodyBlock()) {
            for (const stmt of ctx.bodyBlock()!.bodyStatement()) {
                if (stmt.relationship()) {
                    const rel = this.visitRelationship(stmt.relationship()!) as Relationship;
                    if (rel) this.relationships.push(rel);
                }
            }
        }

        return {
            type: 'Component',
            id,
            name,
            description,
            technology,
            tags: tags ?? bodyData.tags,
            ...(bodyData.url && { url: bodyData.url }),
            ...(bodyData.properties && { properties: bodyData.properties }),
            ...(bodyData.perspectives && { perspectives: bodyData.perspectives }),
        };
    }

    visitComponent = (ctx: ComponentContext): Component => {
        return this.visitComponentWithAlias(ctx, undefined);
    };

    visitRelationship = (ctx: RelationshipContext): Relationship | null => {
        const sourceAlias = this.getIdentifier(ctx._source);
        const destAlias = this.getString(ctx._destination);
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

    // --- Deployment ---

    visitDeploymentEnvironment = (ctx: DeploymentEnvironmentContext): DeploymentEnvironment => {
        const name = this.getString(ctx._name) || '';
        const deploymentNodes = this.visitDeploymentNodeStatements(ctx.deploymentNodeStatement());
        return { name, deploymentNodes };
    };

    private visitDeploymentNodeStatements(stmts: any[]): DeploymentNode[] {
        const nodes: DeploymentNode[] = [];
        for (const stmt of stmts) {
            if (stmt.deploymentNode()) {
                nodes.push(this.visitDeploymentNode(stmt.deploymentNode()!));
            } else if (stmt.deploymentNodeAssignment()) {
                const alias = this.getIdentifier(stmt.deploymentNodeAssignment()!.identifier());
                nodes.push(this.visitDeploymentNodeWithAlias(stmt.deploymentNodeAssignment()!.deploymentNode()!, alias));
            }
        }
        return nodes;
    }

    private visitDeploymentNodeWithAlias(ctx: DeploymentNodeContext, alias: string | undefined): DeploymentNode {
        const name = this.getString(ctx._name) || '';
        const description = this.getString(ctx._description);
        const technology = this.getString(ctx._technology);
        const tags = this.getTags(ctx._tags);
        const id = this.nextId();
        if (alias) this.aliases.set(alias, id);

        const children: DeploymentNode[] = [];
        const infrastructureNodes: InfrastructureNode[] = [];
        const softwareSystemInstances: SoftwareSystemInstance[] = [];
        const containerInstances: ContainerInstance[] = [];

        for (const stmt of ctx.deploymentNodeStatement()) {
            if (stmt.deploymentNode()) {
                children.push(this.visitDeploymentNode(stmt.deploymentNode()!));
            } else if (stmt.deploymentNodeAssignment()) {
                const childAlias = this.getIdentifier(stmt.deploymentNodeAssignment()!.identifier());
                children.push(this.visitDeploymentNodeWithAlias(stmt.deploymentNodeAssignment()!.deploymentNode()!, childAlias));
            } else if (stmt.infrastructureNode()) {
                infrastructureNodes.push(this.visitInfrastructureNode(stmt.infrastructureNode()!));
            } else if (stmt.softwareSystemInstance()) {
                const inst = this.visitSoftwareSystemInstance(stmt.softwareSystemInstance()!);
                if (inst) softwareSystemInstances.push(inst);
            } else if (stmt.containerInstance()) {
                const inst = this.visitContainerInstance(stmt.containerInstance()!);
                if (inst) containerInstances.push(inst);
            }
        }

        return {
            type: 'DeploymentNode',
            id,
            name,
            description,
            technology,
            tags,
            ...(children.length && { children }),
            ...(infrastructureNodes.length && { infrastructureNodes }),
            ...(softwareSystemInstances.length && { softwareSystemInstances }),
            ...(containerInstances.length && { containerInstances }),
        };
    }

    visitDeploymentNode = (ctx: DeploymentNodeContext): DeploymentNode => {
        return this.visitDeploymentNodeWithAlias(ctx, undefined);
    };

    visitInfrastructureNode = (ctx: InfrastructureNodeContext): InfrastructureNode => {
        const name = this.getString(ctx._name) || '';
        const description = this.getString(ctx._description);
        const technology = this.getString(ctx._technology);
        const tags = this.getTags(ctx._tags);
        const id = this.nextId();

        return { type: 'InfrastructureNode', id, name, description, technology, tags };
    };

    visitSoftwareSystemInstance = (ctx: SoftwareSystemInstanceContext): SoftwareSystemInstance | null => {
        const refAlias = this.getIdentifier(ctx._ref);
        if (!refAlias) return null;
        const softwareSystemId = this.aliases.get(refAlias) ?? refAlias;
        const id = this.nextId();
        const tags = this.getTags(ctx._tags);

        return { id, softwareSystemId, tags };
    };

    visitContainerInstance = (ctx: ContainerInstanceContext): ContainerInstance | null => {
        const refAlias = this.getIdentifier(ctx._ref);
        if (!refAlias) return null;
        const containerId = this.aliases.get(refAlias) ?? refAlias;
        const id = this.nextId();
        const tags = this.getTags(ctx._tags);

        return { id, containerId, tags };
    };

    // --- Views ---

    visitViews = (ctx: ViewsContext): Views => {
        const systemLandscapeViews: any[] = [];
        const systemContextViews: any[] = [];
        const containerViews: any[] = [];
        const componentViews: any[] = [];
        const dynamicViews: any[] = [];
        const deploymentViews: any[] = [];
        const filteredViews: FilteredView[] = [];
        const imageViews: ImageView[] = [];
        const customViews: CustomView[] = [];
        let elementStyles: ElementStyle[] = [];
        let relationshipStyles: RelationshipStyle[] = [];
        const themes: string[] = [];
        let branding: Branding | undefined;
        let terminology: Terminology | undefined;
        let scope: string | undefined;
        let visibility: string | undefined;

        for (const body of ctx.viewsBody()) {
            if (body.systemLandscapeView()) {
                systemLandscapeViews.push(this.visitSystemLandscapeView(body.systemLandscapeView()!));
            } else if (body.systemContextView()) {
                systemContextViews.push(this.visitSystemContextView(body.systemContextView()!));
            } else if (body.containerView()) {
                containerViews.push(this.visitContainerView(body.containerView()!));
            } else if (body.componentView()) {
                componentViews.push(this.visitComponentView(body.componentView()!));
            } else if (body.dynamicView()) {
                dynamicViews.push(this.visitDynamicView(body.dynamicView()!));
            } else if (body.deploymentView()) {
                deploymentViews.push(this.visitDeploymentView(body.deploymentView()!));
            } else if (body.filteredView()) {
                filteredViews.push(this.visitFilteredView(body.filteredView()!));
            } else if (body.imageView()) {
                imageViews.push(this.visitImageView(body.imageView()!));
            } else if (body.customView()) {
                customViews.push(this.visitCustomView(body.customView()!));
            } else if (body.styles()) {
                const styles = this.visitStyles(body.styles()!) as any;
                elementStyles = styles.elements;
                relationshipStyles = styles.relationships;
            } else if (body.themeStatement()) {
                const url = this.getString(body.themeStatement()!._url);
                if (url) themes.push(url);
            } else if (body.themesStatement()) {
                for (const s of body.themesStatement()!.string_()) {
                    const url = this.getString(s);
                    if (url) themes.push(url);
                }
            } else if (body.brandingBlock()) {
                branding = this.visitBrandingBlock(body.brandingBlock()!);
            } else if (body.terminologyBlock()) {
                terminology = this.visitTerminologyBlock(body.terminologyBlock()!);
            } else if (body.configurationBlock()) {
                const cfg = this.visitConfigurationBlock(body.configurationBlock()!);
                scope = cfg.scope;
                visibility = cfg.visibility;
            }
        }

        const hasStyles = elementStyles.length || relationshipStyles.length;
        const hasConfig = hasStyles || themes.length || branding || terminology || scope || visibility;

        const configuration: ViewsConfiguration | undefined = hasConfig ? {
            ...(hasStyles && {
                styles: {
                    elements: elementStyles,
                    relationships: relationshipStyles,
                },
            }),
            ...(themes.length && { themes }),
            ...(branding && { branding }),
            ...(terminology && { terminology }),
            ...(scope && { scope }),
            ...(visibility && { visibility }),
        } : undefined;

        return {
            ...(systemLandscapeViews.length && { systemLandscapeViews }),
            ...(systemContextViews.length && { systemContextViews }),
            ...(containerViews.length && { containerViews }),
            ...(componentViews.length && { componentViews }),
            ...(dynamicViews.length && { dynamicViews }),
            ...(deploymentViews.length && { deploymentViews }),
            ...(filteredViews.length && { filteredViews }),
            ...(imageViews.length && { imageViews }),
            ...(customViews.length && { customViews }),
            ...(configuration && { configuration }),
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
        const title = this.getString(ctx._description);
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

    visitDynamicView = (ctx: DynamicViewContext): any => {
        const elementAlias = this.getIdentifier(ctx._elementRef);
        const elementId = elementAlias ? (this.aliases.get(elementAlias) ?? elementAlias) : undefined;
        const key = this.getString(ctx._key) || (elementAlias ? elementAlias + '-dynamic' : 'dynamic');
        const title = this.getString(ctx._description);
        const { autoLayout } = this.parseViewBody(ctx.viewBody());
        return { type: 'Dynamic', key, title, ...(elementId && { elementId }), elements: [], relationships: [], automaticLayout: autoLayout };
    };

    visitDeploymentView = (ctx: DeploymentViewContext): any => {
        const elementAlias = this.getIdentifier(ctx._elementRef);
        const softwareSystemId = elementAlias ? (this.aliases.get(elementAlias) ?? elementAlias) : undefined;
        const environment = this.getString(ctx._environment);
        const key = this.getString(ctx._key) || (elementAlias ? elementAlias + '-deployment' : 'deployment');
        const title = this.getString(ctx._description);
        const { autoLayout } = this.parseViewBody(ctx.viewBody());
        return { type: 'Deployment', key, title, ...(softwareSystemId && { softwareSystemId }), ...(environment && { environment }), elements: [], relationships: [], automaticLayout: autoLayout };
    };

    visitFilteredView = (ctx: FilteredViewContext): FilteredView => {
        const baseViewKey = this.getString(ctx._baseKey) || '';
        const filterModeStr = this.getIdentifier(ctx._filterMode) || 'include';
        const filterMode: 'Include' | 'Exclude' = filterModeStr.toLowerCase() === 'exclude' ? 'Exclude' : 'Include';
        const filterTagsStr = this.getString(ctx._filterTags) || '';
        const tags = filterTagsStr ? filterTagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
        const key = this.getString(ctx._key) || baseViewKey + '-filtered';
        const description = this.getString(ctx._description);
        return { type: 'Filtered', key, baseViewKey, mode: filterMode, tags, ...(description && { description }) };
    };

    visitImageView = (ctx: ImageViewContext): ImageView => {
        const elementAlias = this.getIdentifier(ctx._elementRef);
        const elementId = elementAlias && elementAlias !== '*' ? (this.aliases.get(elementAlias) ?? elementAlias) : undefined;
        const key = this.getString(ctx._key) || (elementAlias ? elementAlias + '-image' : 'image');
        let image: string | undefined;
        let title: string | undefined;

        for (const stmt of ctx.imageViewStatement()) {
            const value = this.getString(stmt._value);
            if (stmt.IMAGE()) image = value;
            else if (stmt.TITLE()) title = value;
        }

        return { type: 'Image', key, ...(elementId && { elementId }), ...(title && { title }), ...(image && { image }) };
    };

    visitCustomView = (ctx: CustomViewContext): CustomView => {
        const key = this.getString(ctx._key) || 'custom';
        const description = this.getString(ctx._description);
        const { autoLayout } = this.parseViewBody(ctx.viewBody());
        return { type: 'Custom', key, ...(description && { description }), elements: [], relationships: [], automaticLayout: autoLayout };
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

    // --- Views Configuration ---

    visitBrandingBlock = (ctx: BrandingBlockContext): Branding => {
        let logo: string | undefined;
        let font: string | undefined;
        for (const stmt of ctx.brandingStatement()) {
            const value = this.getString(stmt._value);
            if (stmt.LOGO()) logo = value;
            else if (stmt.FONT()) font = value;
        }
        return { ...(logo && { logo }), ...(font && { font }) };
    };

    visitTerminologyBlock = (ctx: TerminologyBlockContext): Terminology => {
        const result: Record<string, string> = {};
        for (const entry of ctx.terminologyEntry()) {
            const key = this.getIdentifier(entry._key);
            const value = this.getString(entry._value);
            if (key && value !== undefined) result[key] = value;
        }
        return result as Terminology;
    };

    visitConfigurationBlock = (ctx: ConfigurationBlockContext): { scope?: string; visibility?: string } => {
        let scope: string | undefined;
        let visibility: string | undefined;
        for (const entry of ctx.configurationEntry()) {
            const value = this.getString(entry._value);
            if (entry.SCOPE()) scope = value;
            else if (entry.VISIBILITY()) visibility = value;
        }
        return { scope, visibility };
    };

    // --- Styles ---

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
        let icon: string | undefined;
        let width: number | undefined;
        let height: number | undefined;
        let strokeWidth: number | undefined;
        let iconPosition: string | undefined;
        let fontSize: number | undefined;
        let border: ElementStyle['border'] | undefined;
        let opacity: number | undefined;
        let metadata: boolean | undefined;

        for (const prop of ctx.elementStyleProperty()) {
            if (prop.BACKGROUND()) background = this.getString(prop._color);
            else if (prop.COLOR() || prop.COLOUR()) color = this.getString(prop._color);
            else if (prop.STROKE()) stroke = this.getString(prop._color);
            else if (prop.SHAPE()) shape = this.getString(prop._shape) as Shape;
            else if (prop.ICON()) icon = this.getString(prop._icon);
            else if (prop.WIDTH()) width = Number(this.getString(prop._width));
            else if (prop.HEIGHT()) height = Number(this.getString(prop._height));
            else if (prop.STROKE_WIDTH()) strokeWidth = Number(this.getString(prop._strokeWidth));
            else if (prop.ICON_POSITION()) iconPosition = this.getString(prop._iconPosition);
            else if (prop.FONT_SIZE()) fontSize = Number(this.getString(prop._size));
            else if (prop.BORDER()) border = this.getString(prop._border) as ElementStyle['border'];
            else if (prop.OPACITY()) opacity = Number(this.getString(prop._opacity));
            else if (prop.METADATA()) {
                const val = this.getString(prop._metadata);
                metadata = val === 'true' || val === '1';
            }
        }

        return { tag, background, color, stroke, shape, icon, width, height, strokeWidth, iconPosition, fontSize, border, opacity, metadata };
    };

    visitRelationshipStyle = (ctx: RelationshipStyleContext): RelationshipStyle => {
        const tag = this.getString(ctx._tag) || '';
        let color: string | undefined;
        let thickness: number | undefined;
        let dashed: boolean | undefined;
        let style: RelationshipStyle['style'] | undefined;
        let routing: RelationshipStyle['routing'] | undefined;
        let fontSize: number | undefined;
        let position: number | undefined;
        let opacity: number | undefined;
        let width: number | undefined;

        for (const prop of ctx.relationshipStyleProperty()) {
            if (prop.COLOR() || prop.COLOUR()) color = this.getString(prop._color);
            else if (prop.THICKNESS()) thickness = Number(this.getString(prop._thickness));
            else if (prop.DASHED()) {
                const val = this.getString(prop._dashed);
                dashed = val === 'true' || val === '1';
            } else if (prop.ROUTING()) routing = this.getString(prop._routing) as RelationshipStyle['routing'];
            else if (prop.FONT_SIZE()) fontSize = Number(this.getString(prop._size));
            else if (prop.STYLE_PROP()) style = this.getString(prop._style) as RelationshipStyle['style'];
            else if (prop.POSITION()) position = Number(this.getString(prop._position));
            else if (prop.OPACITY()) opacity = Number(this.getString(prop._opacity));
            else if (prop.WIDTH()) width = Number(this.getString(prop._width));
        }

        return { tag, color, thickness, dashed, style, routing, fontSize, position, opacity, width };
    };
}

function dirUpperCase(dir: string): string {
    return dir.toUpperCase();
}
