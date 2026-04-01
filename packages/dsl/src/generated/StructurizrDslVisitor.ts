
import { AbstractParseTreeVisitor } from "antlr4ng";


import { WorkspaceContext } from "./StructurizrDslParser.js";
import { WorkspaceBodyContext } from "./StructurizrDslParser.js";
import { IncludeDirectiveContext } from "./StructurizrDslParser.js";
import { IdentifiersDirectiveContext } from "./StructurizrDslParser.js";
import { ConstDirectiveContext } from "./StructurizrDslParser.js";
import { VarDirectiveContext } from "./StructurizrDslParser.js";
import { ImpliedRelationshipsDirectiveContext } from "./StructurizrDslParser.js";
import { DocsDirectiveContext } from "./StructurizrDslParser.js";
import { AdrsDirectiveContext } from "./StructurizrDslParser.js";
import { RefDirectiveContext } from "./StructurizrDslParser.js";
import { ModelContext } from "./StructurizrDslParser.js";
import { ModelBodyContext } from "./StructurizrDslParser.js";
import { ElementAssignmentContext } from "./StructurizrDslParser.js";
import { GroupContext } from "./StructurizrDslParser.js";
import { GroupModelBodyContext } from "./StructurizrDslParser.js";
import { PersonContext } from "./StructurizrDslParser.js";
import { SoftwareSystemContext } from "./StructurizrDslParser.js";
import { SoftwareSystemBodyContext } from "./StructurizrDslParser.js";
import { SoftwareSystemStatementContext } from "./StructurizrDslParser.js";
import { ContainerAssignmentContext } from "./StructurizrDslParser.js";
import { ContainerContext } from "./StructurizrDslParser.js";
import { ContainerBodyContext } from "./StructurizrDslParser.js";
import { ContainerStatementContext } from "./StructurizrDslParser.js";
import { ComponentAssignmentContext } from "./StructurizrDslParser.js";
import { ComponentContext } from "./StructurizrDslParser.js";
import { BodyBlockContext } from "./StructurizrDslParser.js";
import { BodyStatementContext } from "./StructurizrDslParser.js";
import { UrlStatementContext } from "./StructurizrDslParser.js";
import { TagsStatementContext } from "./StructurizrDslParser.js";
import { PropertiesStatementContext } from "./StructurizrDslParser.js";
import { PropertyEntryContext } from "./StructurizrDslParser.js";
import { PerspectivesStatementContext } from "./StructurizrDslParser.js";
import { PerspectiveEntryContext } from "./StructurizrDslParser.js";
import { RelationshipContext } from "./StructurizrDslParser.js";
import { DeploymentEnvironmentContext } from "./StructurizrDslParser.js";
import { DeploymentNodeStatementContext } from "./StructurizrDslParser.js";
import { DeploymentNodeAssignmentContext } from "./StructurizrDslParser.js";
import { DeploymentNodeContext } from "./StructurizrDslParser.js";
import { InfrastructureNodeContext } from "./StructurizrDslParser.js";
import { SoftwareSystemInstanceContext } from "./StructurizrDslParser.js";
import { ContainerInstanceContext } from "./StructurizrDslParser.js";
import { ViewsContext } from "./StructurizrDslParser.js";
import { ViewsBodyContext } from "./StructurizrDslParser.js";
import { SystemLandscapeViewContext } from "./StructurizrDslParser.js";
import { SystemContextViewContext } from "./StructurizrDslParser.js";
import { ContainerViewContext } from "./StructurizrDslParser.js";
import { ComponentViewContext } from "./StructurizrDslParser.js";
import { DynamicViewContext } from "./StructurizrDslParser.js";
import { DeploymentViewContext } from "./StructurizrDslParser.js";
import { FilteredViewContext } from "./StructurizrDslParser.js";
import { ImageViewContext } from "./StructurizrDslParser.js";
import { ImageViewStatementContext } from "./StructurizrDslParser.js";
import { CustomViewContext } from "./StructurizrDslParser.js";
import { ViewBodyContext } from "./StructurizrDslParser.js";
import { ViewStatementContext } from "./StructurizrDslParser.js";
import { IncludeStatementContext } from "./StructurizrDslParser.js";
import { ExcludeStatementContext } from "./StructurizrDslParser.js";
import { IncludeTargetContext } from "./StructurizrDslParser.js";
import { AutoLayoutStatementContext } from "./StructurizrDslParser.js";
import { TitleStatementContext } from "./StructurizrDslParser.js";
import { DescriptionStatementContext } from "./StructurizrDslParser.js";
import { AnimationStatementContext } from "./StructurizrDslParser.js";
import { ThemeStatementContext } from "./StructurizrDslParser.js";
import { ThemesStatementContext } from "./StructurizrDslParser.js";
import { BrandingBlockContext } from "./StructurizrDslParser.js";
import { BrandingStatementContext } from "./StructurizrDslParser.js";
import { TerminologyBlockContext } from "./StructurizrDslParser.js";
import { TerminologyEntryContext } from "./StructurizrDslParser.js";
import { ConfigurationBlockContext } from "./StructurizrDslParser.js";
import { ConfigurationEntryContext } from "./StructurizrDslParser.js";
import { StylesContext } from "./StructurizrDslParser.js";
import { StylesBodyContext } from "./StructurizrDslParser.js";
import { ElementStyleContext } from "./StructurizrDslParser.js";
import { ElementStylePropertyContext } from "./StructurizrDslParser.js";
import { RelationshipStyleContext } from "./StructurizrDslParser.js";
import { RelationshipStylePropertyContext } from "./StructurizrDslParser.js";
import { UnknownPropertyContext } from "./StructurizrDslParser.js";
import { StringContext } from "./StructurizrDslParser.js";
import { IdentifierContext } from "./StructurizrDslParser.js";
import { TagsDefContext } from "./StructurizrDslParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `StructurizrDslParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class StructurizrDslVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `StructurizrDslParser.workspace`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWorkspace?: (ctx: WorkspaceContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.workspaceBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWorkspaceBody?: (ctx: WorkspaceBodyContext) => Result;
    /**
     * Visit a parse tree produced by the `includeDirective`
     * labeled alternative in `StructurizrDslParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIncludeDirective?: (ctx: IncludeDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by the `identifiersDirective`
     * labeled alternative in `StructurizrDslParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifiersDirective?: (ctx: IdentifiersDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by the `constDirective`
     * labeled alternative in `StructurizrDslParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConstDirective?: (ctx: ConstDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by the `varDirective`
     * labeled alternative in `StructurizrDslParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVarDirective?: (ctx: VarDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by the `impliedRelationshipsDirective`
     * labeled alternative in `StructurizrDslParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitImpliedRelationshipsDirective?: (ctx: ImpliedRelationshipsDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by the `docsDirective`
     * labeled alternative in `StructurizrDslParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDocsDirective?: (ctx: DocsDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by the `adrsDirective`
     * labeled alternative in `StructurizrDslParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAdrsDirective?: (ctx: AdrsDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by the `refDirective`
     * labeled alternative in `StructurizrDslParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRefDirective?: (ctx: RefDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.model`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitModel?: (ctx: ModelContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.modelBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitModelBody?: (ctx: ModelBodyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.elementAssignment`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElementAssignment?: (ctx: ElementAssignmentContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.group`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGroup?: (ctx: GroupContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.groupModelBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGroupModelBody?: (ctx: GroupModelBodyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.person`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPerson?: (ctx: PersonContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.softwareSystem`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSoftwareSystem?: (ctx: SoftwareSystemContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.softwareSystemBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSoftwareSystemBody?: (ctx: SoftwareSystemBodyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.softwareSystemStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSoftwareSystemStatement?: (ctx: SoftwareSystemStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.containerAssignment`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContainerAssignment?: (ctx: ContainerAssignmentContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.container`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContainer?: (ctx: ContainerContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.containerBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContainerBody?: (ctx: ContainerBodyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.containerStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContainerStatement?: (ctx: ContainerStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.componentAssignment`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComponentAssignment?: (ctx: ComponentAssignmentContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.component`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComponent?: (ctx: ComponentContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.bodyBlock`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBodyBlock?: (ctx: BodyBlockContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.bodyStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBodyStatement?: (ctx: BodyStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.urlStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUrlStatement?: (ctx: UrlStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.tagsStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTagsStatement?: (ctx: TagsStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.propertiesStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertiesStatement?: (ctx: PropertiesStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.propertyEntry`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyEntry?: (ctx: PropertyEntryContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.perspectivesStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPerspectivesStatement?: (ctx: PerspectivesStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.perspectiveEntry`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPerspectiveEntry?: (ctx: PerspectiveEntryContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.relationship`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationship?: (ctx: RelationshipContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.deploymentEnvironment`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeploymentEnvironment?: (ctx: DeploymentEnvironmentContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.deploymentNodeStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeploymentNodeStatement?: (ctx: DeploymentNodeStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.deploymentNodeAssignment`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeploymentNodeAssignment?: (ctx: DeploymentNodeAssignmentContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.deploymentNode`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeploymentNode?: (ctx: DeploymentNodeContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.infrastructureNode`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInfrastructureNode?: (ctx: InfrastructureNodeContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.softwareSystemInstance`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSoftwareSystemInstance?: (ctx: SoftwareSystemInstanceContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.containerInstance`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContainerInstance?: (ctx: ContainerInstanceContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.views`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitViews?: (ctx: ViewsContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.viewsBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitViewsBody?: (ctx: ViewsBodyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.systemLandscapeView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSystemLandscapeView?: (ctx: SystemLandscapeViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.systemContextView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSystemContextView?: (ctx: SystemContextViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.containerView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContainerView?: (ctx: ContainerViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.componentView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComponentView?: (ctx: ComponentViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.dynamicView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDynamicView?: (ctx: DynamicViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.deploymentView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeploymentView?: (ctx: DeploymentViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.filteredView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFilteredView?: (ctx: FilteredViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.imageView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitImageView?: (ctx: ImageViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.imageViewStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitImageViewStatement?: (ctx: ImageViewStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.customView`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCustomView?: (ctx: CustomViewContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.viewBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitViewBody?: (ctx: ViewBodyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.viewStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitViewStatement?: (ctx: ViewStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.includeStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIncludeStatement?: (ctx: IncludeStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.excludeStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExcludeStatement?: (ctx: ExcludeStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.includeTarget`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIncludeTarget?: (ctx: IncludeTargetContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.autoLayoutStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAutoLayoutStatement?: (ctx: AutoLayoutStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.titleStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTitleStatement?: (ctx: TitleStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.descriptionStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDescriptionStatement?: (ctx: DescriptionStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.animationStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAnimationStatement?: (ctx: AnimationStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.themeStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitThemeStatement?: (ctx: ThemeStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.themesStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitThemesStatement?: (ctx: ThemesStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.brandingBlock`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBrandingBlock?: (ctx: BrandingBlockContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.brandingStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBrandingStatement?: (ctx: BrandingStatementContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.terminologyBlock`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTerminologyBlock?: (ctx: TerminologyBlockContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.terminologyEntry`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTerminologyEntry?: (ctx: TerminologyEntryContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.configurationBlock`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConfigurationBlock?: (ctx: ConfigurationBlockContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.configurationEntry`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConfigurationEntry?: (ctx: ConfigurationEntryContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.styles`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStyles?: (ctx: StylesContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.stylesBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStylesBody?: (ctx: StylesBodyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.elementStyle`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElementStyle?: (ctx: ElementStyleContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.elementStyleProperty`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElementStyleProperty?: (ctx: ElementStylePropertyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.relationshipStyle`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipStyle?: (ctx: RelationshipStyleContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.relationshipStyleProperty`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipStyleProperty?: (ctx: RelationshipStylePropertyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.unknownProperty`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnknownProperty?: (ctx: UnknownPropertyContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.string`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString?: (ctx: StringContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.identifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifier?: (ctx: IdentifierContext) => Result;
    /**
     * Visit a parse tree produced by `StructurizrDslParser.tagsDef`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTagsDef?: (ctx: TagsDefContext) => Result;
}

