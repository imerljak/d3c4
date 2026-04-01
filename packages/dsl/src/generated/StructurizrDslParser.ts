
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { StructurizrDslVisitor } from "./StructurizrDslVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class StructurizrDslParser extends antlr.Parser {
    public static readonly LBRACE = 1;
    public static readonly RBRACE = 2;
    public static readonly LBRACKET = 3;
    public static readonly RBRACKET = 4;
    public static readonly EQUALS = 5;
    public static readonly ARROW = 6;
    public static readonly ASTERISK = 7;
    public static readonly SEMICOLON = 8;
    public static readonly COMMA = 9;
    public static readonly BANG_INCLUDE = 10;
    public static readonly BANG_IDENTIFIERS = 11;
    public static readonly BANG_CONST = 12;
    public static readonly BANG_VAR = 13;
    public static readonly BANG_IMPLIED_RELATIONSHIPS = 14;
    public static readonly BANG_DOCS = 15;
    public static readonly BANG_ADRS = 16;
    public static readonly BANG_REF = 17;
    public static readonly WORKSPACE = 18;
    public static readonly EXTENDS = 19;
    public static readonly MODEL = 20;
    public static readonly VIEWS = 21;
    public static readonly PERSON = 22;
    public static readonly SOFTWARE_SYSTEM = 23;
    public static readonly CONTAINER = 24;
    public static readonly COMPONENT = 25;
    public static readonly GROUP = 26;
    public static readonly SYSTEM_LANDSCAPE = 27;
    public static readonly SYSTEM_CONTEXT = 28;
    public static readonly DYNAMIC = 29;
    public static readonly DEPLOYMENT = 30;
    public static readonly FILTERED = 31;
    public static readonly IMAGE = 32;
    public static readonly CUSTOM = 33;
    public static readonly DEPLOYMENT_ENVIRONMENT = 34;
    public static readonly DEPLOYMENT_NODE = 35;
    public static readonly INFRASTRUCTURE_NODE = 36;
    public static readonly SOFTWARE_SYSTEM_INSTANCE = 37;
    public static readonly CONTAINER_INSTANCE = 38;
    public static readonly DEPLOYMENT_GROUP = 39;
    public static readonly STYLES = 40;
    public static readonly ELEMENT = 41;
    public static readonly RELATIONSHIP = 42;
    public static readonly INCLUDE = 43;
    public static readonly EXCLUDE = 44;
    public static readonly AUTO_LAYOUT = 45;
    public static readonly TITLE = 46;
    public static readonly DESCRIPTION = 47;
    public static readonly ANIMATION = 48;
    public static readonly URL = 49;
    public static readonly TAGS = 50;
    public static readonly PROPERTIES = 51;
    public static readonly PERSPECTIVES = 52;
    public static readonly BACKGROUND = 53;
    public static readonly COLOR = 54;
    public static readonly COLOUR = 55;
    public static readonly STROKE = 56;
    public static readonly SHAPE = 57;
    public static readonly FONT_SIZE = 58;
    public static readonly BORDER = 59;
    public static readonly OPACITY = 60;
    public static readonly THICKNESS = 61;
    public static readonly DASHED = 62;
    public static readonly ROUTING = 63;
    public static readonly ICON = 64;
    public static readonly WIDTH = 65;
    public static readonly HEIGHT = 66;
    public static readonly STROKE_WIDTH = 67;
    public static readonly ICON_POSITION = 68;
    public static readonly METADATA = 69;
    public static readonly STYLE_PROP = 70;
    public static readonly POSITION = 71;
    public static readonly THEME = 72;
    public static readonly THEMES = 73;
    public static readonly BRANDING = 74;
    public static readonly LOGO = 75;
    public static readonly FONT = 76;
    public static readonly TERMINOLOGY = 77;
    public static readonly CONFIGURATION = 78;
    public static readonly SCOPE = 79;
    public static readonly VISIBILITY = 80;
    public static readonly HASH_COLOR = 81;
    public static readonly STRING_LITERAL = 82;
    public static readonly IDENTIFIER = 83;
    public static readonly WS = 84;
    public static readonly LINE_COMMENT = 85;
    public static readonly BLOCK_COMMENT = 86;
    public static readonly RULE_workspace = 0;
    public static readonly RULE_workspaceBody = 1;
    public static readonly RULE_directive = 2;
    public static readonly RULE_model = 3;
    public static readonly RULE_modelBody = 4;
    public static readonly RULE_elementAssignment = 5;
    public static readonly RULE_group = 6;
    public static readonly RULE_groupModelBody = 7;
    public static readonly RULE_person = 8;
    public static readonly RULE_softwareSystem = 9;
    public static readonly RULE_softwareSystemBody = 10;
    public static readonly RULE_softwareSystemStatement = 11;
    public static readonly RULE_containerAssignment = 12;
    public static readonly RULE_container = 13;
    public static readonly RULE_containerBody = 14;
    public static readonly RULE_containerStatement = 15;
    public static readonly RULE_componentAssignment = 16;
    public static readonly RULE_component = 17;
    public static readonly RULE_bodyBlock = 18;
    public static readonly RULE_bodyStatement = 19;
    public static readonly RULE_urlStatement = 20;
    public static readonly RULE_tagsStatement = 21;
    public static readonly RULE_propertiesStatement = 22;
    public static readonly RULE_propertyEntry = 23;
    public static readonly RULE_perspectivesStatement = 24;
    public static readonly RULE_perspectiveEntry = 25;
    public static readonly RULE_relationship = 26;
    public static readonly RULE_deploymentEnvironment = 27;
    public static readonly RULE_deploymentNodeStatement = 28;
    public static readonly RULE_deploymentNodeAssignment = 29;
    public static readonly RULE_deploymentNode = 30;
    public static readonly RULE_infrastructureNode = 31;
    public static readonly RULE_softwareSystemInstance = 32;
    public static readonly RULE_containerInstance = 33;
    public static readonly RULE_views = 34;
    public static readonly RULE_viewsBody = 35;
    public static readonly RULE_systemLandscapeView = 36;
    public static readonly RULE_systemContextView = 37;
    public static readonly RULE_containerView = 38;
    public static readonly RULE_componentView = 39;
    public static readonly RULE_dynamicView = 40;
    public static readonly RULE_deploymentView = 41;
    public static readonly RULE_filteredView = 42;
    public static readonly RULE_imageView = 43;
    public static readonly RULE_imageViewStatement = 44;
    public static readonly RULE_customView = 45;
    public static readonly RULE_viewBody = 46;
    public static readonly RULE_viewStatement = 47;
    public static readonly RULE_includeStatement = 48;
    public static readonly RULE_excludeStatement = 49;
    public static readonly RULE_includeTarget = 50;
    public static readonly RULE_autoLayoutStatement = 51;
    public static readonly RULE_titleStatement = 52;
    public static readonly RULE_descriptionStatement = 53;
    public static readonly RULE_animationStatement = 54;
    public static readonly RULE_themeStatement = 55;
    public static readonly RULE_themesStatement = 56;
    public static readonly RULE_brandingBlock = 57;
    public static readonly RULE_brandingStatement = 58;
    public static readonly RULE_terminologyBlock = 59;
    public static readonly RULE_terminologyEntry = 60;
    public static readonly RULE_configurationBlock = 61;
    public static readonly RULE_configurationEntry = 62;
    public static readonly RULE_styles = 63;
    public static readonly RULE_stylesBody = 64;
    public static readonly RULE_elementStyle = 65;
    public static readonly RULE_elementStyleProperty = 66;
    public static readonly RULE_relationshipStyle = 67;
    public static readonly RULE_relationshipStyleProperty = 68;
    public static readonly RULE_unknownProperty = 69;
    public static readonly RULE_string = 70;
    public static readonly RULE_identifier = 71;
    public static readonly RULE_tagsDef = 72;

    public static readonly literalNames = [
        null, "'{'", "'}'", "'['", "']'", "'='", "'->'", "'*'", "';'", "','", 
        "'!include'", "'!identifiers'", "'!const'", "'!var'", "'!impliedRelationships'", 
        "'!docs'", "'!adrs'", "'!ref'", "'workspace'", "'extends'", "'model'", 
        "'views'", "'person'", "'softwareSystem'", "'container'", "'component'", 
        "'group'", "'systemLandscape'", "'systemContext'", "'dynamic'", 
        "'deployment'", "'filtered'", "'image'", "'custom'", "'deploymentEnvironment'", 
        "'deploymentNode'", "'infrastructureNode'", "'softwareSystemInstance'", 
        "'containerInstance'", "'deploymentGroup'", "'styles'", "'element'", 
        "'relationship'", "'include'", "'exclude'", "'autoLayout'", "'title'", 
        "'description'", "'animation'", "'url'", "'tags'", "'properties'", 
        "'perspectives'", "'background'", "'color'", "'colour'", "'stroke'", 
        "'shape'", "'fontSize'", "'border'", "'opacity'", "'thickness'", 
        "'dashed'", "'routing'", "'icon'", "'width'", "'height'", "'strokeWidth'", 
        "'iconPosition'", "'metadata'", "'style'", "'position'", "'theme'", 
        "'themes'", "'branding'", "'logo'", "'font'", "'terminology'", "'configuration'", 
        "'scope'", "'visibility'"
    ];

    public static readonly symbolicNames = [
        null, "LBRACE", "RBRACE", "LBRACKET", "RBRACKET", "EQUALS", "ARROW", 
        "ASTERISK", "SEMICOLON", "COMMA", "BANG_INCLUDE", "BANG_IDENTIFIERS", 
        "BANG_CONST", "BANG_VAR", "BANG_IMPLIED_RELATIONSHIPS", "BANG_DOCS", 
        "BANG_ADRS", "BANG_REF", "WORKSPACE", "EXTENDS", "MODEL", "VIEWS", 
        "PERSON", "SOFTWARE_SYSTEM", "CONTAINER", "COMPONENT", "GROUP", 
        "SYSTEM_LANDSCAPE", "SYSTEM_CONTEXT", "DYNAMIC", "DEPLOYMENT", "FILTERED", 
        "IMAGE", "CUSTOM", "DEPLOYMENT_ENVIRONMENT", "DEPLOYMENT_NODE", 
        "INFRASTRUCTURE_NODE", "SOFTWARE_SYSTEM_INSTANCE", "CONTAINER_INSTANCE", 
        "DEPLOYMENT_GROUP", "STYLES", "ELEMENT", "RELATIONSHIP", "INCLUDE", 
        "EXCLUDE", "AUTO_LAYOUT", "TITLE", "DESCRIPTION", "ANIMATION", "URL", 
        "TAGS", "PROPERTIES", "PERSPECTIVES", "BACKGROUND", "COLOR", "COLOUR", 
        "STROKE", "SHAPE", "FONT_SIZE", "BORDER", "OPACITY", "THICKNESS", 
        "DASHED", "ROUTING", "ICON", "WIDTH", "HEIGHT", "STROKE_WIDTH", 
        "ICON_POSITION", "METADATA", "STYLE_PROP", "POSITION", "THEME", 
        "THEMES", "BRANDING", "LOGO", "FONT", "TERMINOLOGY", "CONFIGURATION", 
        "SCOPE", "VISIBILITY", "HASH_COLOR", "STRING_LITERAL", "IDENTIFIER", 
        "WS", "LINE_COMMENT", "BLOCK_COMMENT"
    ];
    public static readonly ruleNames = [
        "workspace", "workspaceBody", "directive", "model", "modelBody", 
        "elementAssignment", "group", "groupModelBody", "person", "softwareSystem", 
        "softwareSystemBody", "softwareSystemStatement", "containerAssignment", 
        "container", "containerBody", "containerStatement", "componentAssignment", 
        "component", "bodyBlock", "bodyStatement", "urlStatement", "tagsStatement", 
        "propertiesStatement", "propertyEntry", "perspectivesStatement", 
        "perspectiveEntry", "relationship", "deploymentEnvironment", "deploymentNodeStatement", 
        "deploymentNodeAssignment", "deploymentNode", "infrastructureNode", 
        "softwareSystemInstance", "containerInstance", "views", "viewsBody", 
        "systemLandscapeView", "systemContextView", "containerView", "componentView", 
        "dynamicView", "deploymentView", "filteredView", "imageView", "imageViewStatement", 
        "customView", "viewBody", "viewStatement", "includeStatement", "excludeStatement", 
        "includeTarget", "autoLayoutStatement", "titleStatement", "descriptionStatement", 
        "animationStatement", "themeStatement", "themesStatement", "brandingBlock", 
        "brandingStatement", "terminologyBlock", "terminologyEntry", "configurationBlock", 
        "configurationEntry", "styles", "stylesBody", "elementStyle", "elementStyleProperty", 
        "relationshipStyle", "relationshipStyleProperty", "unknownProperty", 
        "string", "identifier", "tagsDef",
    ];

    public get grammarFileName(): string { return "StructurizrDsl.g4"; }
    public get literalNames(): (string | null)[] { return StructurizrDslParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return StructurizrDslParser.symbolicNames; }
    public get ruleNames(): string[] { return StructurizrDslParser.ruleNames; }
    public get serializedATN(): number[] { return StructurizrDslParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, StructurizrDslParser._ATN, StructurizrDslParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public workspace(): WorkspaceContext {
        let localContext = new WorkspaceContext(this.context, this.state);
        this.enterRule(localContext, 0, StructurizrDslParser.RULE_workspace);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 146;
            this.match(StructurizrDslParser.WORKSPACE);
            this.state = 149;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 19) {
                {
                this.state = 147;
                this.match(StructurizrDslParser.EXTENDS);
                this.state = 148;
                localContext._extendsUrl = this.string_();
                }
            }

            this.state = 152;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                {
                this.state = 151;
                localContext._name = this.string_();
                }
                break;
            }
            this.state = 155;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 154;
                localContext._description = this.string_();
                }
            }

            this.state = 157;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 161;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3406848) !== 0)) {
                {
                {
                this.state = 158;
                this.workspaceBody();
                }
                }
                this.state = 163;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 164;
            this.match(StructurizrDslParser.RBRACE);
            this.state = 165;
            this.match(StructurizrDslParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public workspaceBody(): WorkspaceBodyContext {
        let localContext = new WorkspaceBodyContext(this.context, this.state);
        this.enterRule(localContext, 2, StructurizrDslParser.RULE_workspaceBody);
        try {
            this.state = 170;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.MODEL:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 167;
                this.model();
                }
                break;
            case StructurizrDslParser.VIEWS:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 168;
                this.views();
                }
                break;
            case StructurizrDslParser.BANG_INCLUDE:
            case StructurizrDslParser.BANG_IDENTIFIERS:
            case StructurizrDslParser.BANG_CONST:
            case StructurizrDslParser.BANG_VAR:
            case StructurizrDslParser.BANG_IMPLIED_RELATIONSHIPS:
            case StructurizrDslParser.BANG_DOCS:
            case StructurizrDslParser.BANG_ADRS:
            case StructurizrDslParser.BANG_REF:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 169;
                this.directive();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public directive(): DirectiveContext {
        let localContext = new DirectiveContext(this.context, this.state);
        this.enterRule(localContext, 4, StructurizrDslParser.RULE_directive);
        try {
            this.state = 192;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.BANG_INCLUDE:
                localContext = new IncludeDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 172;
                this.match(StructurizrDslParser.BANG_INCLUDE);
                this.state = 173;
                (localContext as IncludeDirectiveContext)._path = this.string_();
                }
                break;
            case StructurizrDslParser.BANG_IDENTIFIERS:
                localContext = new IdentifiersDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 174;
                this.match(StructurizrDslParser.BANG_IDENTIFIERS);
                this.state = 175;
                (localContext as IdentifiersDirectiveContext)._scope = this.identifier();
                }
                break;
            case StructurizrDslParser.BANG_CONST:
                localContext = new ConstDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 176;
                this.match(StructurizrDslParser.BANG_CONST);
                this.state = 177;
                (localContext as ConstDirectiveContext)._name = this.identifier();
                this.state = 178;
                (localContext as ConstDirectiveContext)._value = this.string_();
                }
                break;
            case StructurizrDslParser.BANG_VAR:
                localContext = new VarDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 180;
                this.match(StructurizrDslParser.BANG_VAR);
                this.state = 181;
                (localContext as VarDirectiveContext)._name = this.identifier();
                this.state = 182;
                (localContext as VarDirectiveContext)._value = this.string_();
                }
                break;
            case StructurizrDslParser.BANG_IMPLIED_RELATIONSHIPS:
                localContext = new ImpliedRelationshipsDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 184;
                this.match(StructurizrDslParser.BANG_IMPLIED_RELATIONSHIPS);
                this.state = 185;
                (localContext as ImpliedRelationshipsDirectiveContext)._enabled = this.string_();
                }
                break;
            case StructurizrDslParser.BANG_DOCS:
                localContext = new DocsDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 186;
                this.match(StructurizrDslParser.BANG_DOCS);
                this.state = 187;
                (localContext as DocsDirectiveContext)._path = this.string_();
                }
                break;
            case StructurizrDslParser.BANG_ADRS:
                localContext = new AdrsDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 188;
                this.match(StructurizrDslParser.BANG_ADRS);
                this.state = 189;
                (localContext as AdrsDirectiveContext)._path = this.string_();
                }
                break;
            case StructurizrDslParser.BANG_REF:
                localContext = new RefDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 190;
                this.match(StructurizrDslParser.BANG_REF);
                this.state = 191;
                (localContext as RefDirectiveContext)._ref = this.string_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public model(): ModelContext {
        let localContext = new ModelContext(this.context, this.state);
        this.enterRule(localContext, 6, StructurizrDslParser.RULE_model);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 194;
            this.match(StructurizrDslParser.MODEL);
            this.state = 195;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 199;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 196;
                this.modelBody();
                }
                }
                this.state = 201;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 202;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public modelBody(): ModelBodyContext {
        let localContext = new ModelBodyContext(this.context, this.state);
        this.enterRule(localContext, 8, StructurizrDslParser.RULE_modelBody);
        try {
            this.state = 210;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 204;
                this.person();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 205;
                this.softwareSystem();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 206;
                this.relationship();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 207;
                this.elementAssignment();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 208;
                this.group();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 209;
                this.deploymentEnvironment();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elementAssignment(): ElementAssignmentContext {
        let localContext = new ElementAssignmentContext(this.context, this.state);
        this.enterRule(localContext, 10, StructurizrDslParser.RULE_elementAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 212;
            this.identifier();
            this.state = 213;
            this.match(StructurizrDslParser.EQUALS);
            this.state = 218;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.PERSON:
                {
                this.state = 214;
                this.person();
                }
                break;
            case StructurizrDslParser.SOFTWARE_SYSTEM:
                {
                this.state = 215;
                this.softwareSystem();
                }
                break;
            case StructurizrDslParser.CONTAINER:
                {
                this.state = 216;
                this.container();
                }
                break;
            case StructurizrDslParser.COMPONENT:
                {
                this.state = 217;
                this.component();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public group(): GroupContext {
        let localContext = new GroupContext(this.context, this.state);
        this.enterRule(localContext, 12, StructurizrDslParser.RULE_group);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 220;
            this.match(StructurizrDslParser.GROUP);
            this.state = 221;
            localContext._name = this.string_();
            this.state = 222;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 223;
                this.groupModelBody();
                }
                }
                this.state = 228;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 229;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupModelBody(): GroupModelBodyContext {
        let localContext = new GroupModelBodyContext(this.context, this.state);
        this.enterRule(localContext, 14, StructurizrDslParser.RULE_groupModelBody);
        try {
            this.state = 236;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 231;
                this.person();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 232;
                this.softwareSystem();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 233;
                this.relationship();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 234;
                this.elementAssignment();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 235;
                this.group();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public person(): PersonContext {
        let localContext = new PersonContext(this.context, this.state);
        this.enterRule(localContext, 16, StructurizrDslParser.RULE_person);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.match(StructurizrDslParser.PERSON);
            this.state = 239;
            localContext._name = this.string_();
            this.state = 241;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                {
                this.state = 240;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 244;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 243;
                localContext._tags = this.string_();
                }
                break;
            }
            this.state = 247;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 246;
                this.bodyBlock();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public softwareSystem(): SoftwareSystemContext {
        let localContext = new SoftwareSystemContext(this.context, this.state);
        this.enterRule(localContext, 18, StructurizrDslParser.RULE_softwareSystem);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 249;
            this.match(StructurizrDslParser.SOFTWARE_SYSTEM);
            this.state = 250;
            localContext._name = this.string_();
            this.state = 252;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 251;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 255;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                {
                this.state = 254;
                localContext._tags = this.string_();
                }
                break;
            }
            this.state = 258;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 257;
                this.softwareSystemBody();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public softwareSystemBody(): SoftwareSystemBodyContext {
        let localContext = new SoftwareSystemBodyContext(this.context, this.state);
        this.enterRule(localContext, 20, StructurizrDslParser.RULE_softwareSystemBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 260;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 264;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 261;
                this.softwareSystemStatement();
                }
                }
                this.state = 266;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 267;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public softwareSystemStatement(): SoftwareSystemStatementContext {
        let localContext = new SoftwareSystemStatementContext(this.context, this.state);
        this.enterRule(localContext, 22, StructurizrDslParser.RULE_softwareSystemStatement);
        try {
            this.state = 274;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 269;
                this.container();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 270;
                this.relationship();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 271;
                this.containerAssignment();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 272;
                this.group();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 273;
                this.bodyStatement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public containerAssignment(): ContainerAssignmentContext {
        let localContext = new ContainerAssignmentContext(this.context, this.state);
        this.enterRule(localContext, 24, StructurizrDslParser.RULE_containerAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.identifier();
            this.state = 277;
            this.match(StructurizrDslParser.EQUALS);
            this.state = 278;
            this.container();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public container(): ContainerContext {
        let localContext = new ContainerContext(this.context, this.state);
        this.enterRule(localContext, 26, StructurizrDslParser.RULE_container);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 280;
            this.match(StructurizrDslParser.CONTAINER);
            this.state = 281;
            localContext._name = this.string_();
            this.state = 283;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
            case 1:
                {
                this.state = 282;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 286;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                {
                this.state = 285;
                localContext._technology = this.string_();
                }
                break;
            }
            this.state = 289;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context) ) {
            case 1:
                {
                this.state = 288;
                localContext._tags = this.string_();
                }
                break;
            }
            this.state = 292;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 291;
                this.containerBody();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public containerBody(): ContainerBodyContext {
        let localContext = new ContainerBodyContext(this.context, this.state);
        this.enterRule(localContext, 28, StructurizrDslParser.RULE_containerBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 294;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 298;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 295;
                this.containerStatement();
                }
                }
                this.state = 300;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 301;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public containerStatement(): ContainerStatementContext {
        let localContext = new ContainerStatementContext(this.context, this.state);
        this.enterRule(localContext, 30, StructurizrDslParser.RULE_containerStatement);
        try {
            this.state = 308;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 303;
                this.component();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 304;
                this.relationship();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 305;
                this.componentAssignment();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 306;
                this.group();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 307;
                this.bodyStatement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public componentAssignment(): ComponentAssignmentContext {
        let localContext = new ComponentAssignmentContext(this.context, this.state);
        this.enterRule(localContext, 32, StructurizrDslParser.RULE_componentAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 310;
            this.identifier();
            this.state = 311;
            this.match(StructurizrDslParser.EQUALS);
            this.state = 312;
            this.component();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public component(): ComponentContext {
        let localContext = new ComponentContext(this.context, this.state);
        this.enterRule(localContext, 34, StructurizrDslParser.RULE_component);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 314;
            this.match(StructurizrDslParser.COMPONENT);
            this.state = 315;
            localContext._name = this.string_();
            this.state = 317;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                {
                this.state = 316;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 320;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                {
                this.state = 319;
                localContext._technology = this.string_();
                }
                break;
            }
            this.state = 323;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                {
                this.state = 322;
                localContext._tags = this.string_();
                }
                break;
            }
            this.state = 326;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 325;
                this.bodyBlock();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bodyBlock(): BodyBlockContext {
        let localContext = new BodyBlockContext(this.context, this.state);
        this.enterRule(localContext, 36, StructurizrDslParser.RULE_bodyBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 328;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 332;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 329;
                this.bodyStatement();
                }
                }
                this.state = 334;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 335;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bodyStatement(): BodyStatementContext {
        let localContext = new BodyStatementContext(this.context, this.state);
        this.enterRule(localContext, 38, StructurizrDslParser.RULE_bodyStatement);
        try {
            this.state = 342;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 337;
                this.relationship();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 338;
                this.urlStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 339;
                this.tagsStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 340;
                this.propertiesStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 341;
                this.perspectivesStatement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public urlStatement(): UrlStatementContext {
        let localContext = new UrlStatementContext(this.context, this.state);
        this.enterRule(localContext, 40, StructurizrDslParser.RULE_urlStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 344;
            this.match(StructurizrDslParser.URL);
            this.state = 345;
            localContext._value = this.string_();
            this.state = 347;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 346;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tagsStatement(): TagsStatementContext {
        let localContext = new TagsStatementContext(this.context, this.state);
        this.enterRule(localContext, 42, StructurizrDslParser.RULE_tagsStatement);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 349;
            this.match(StructurizrDslParser.TAGS);
            this.state = 351;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 350;
                    this.string_();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 353;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            this.state = 356;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 355;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propertiesStatement(): PropertiesStatementContext {
        let localContext = new PropertiesStatementContext(this.context, this.state);
        this.enterRule(localContext, 44, StructurizrDslParser.RULE_propertiesStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 358;
            this.match(StructurizrDslParser.PROPERTIES);
            this.state = 359;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 363;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                {
                this.state = 360;
                this.propertyEntry();
                }
                }
                this.state = 365;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 366;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propertyEntry(): PropertyEntryContext {
        let localContext = new PropertyEntryContext(this.context, this.state);
        this.enterRule(localContext, 46, StructurizrDslParser.RULE_propertyEntry);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 368;
            localContext._key = this.string_();
            this.state = 369;
            localContext._value = this.string_();
            this.state = 371;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 370;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public perspectivesStatement(): PerspectivesStatementContext {
        let localContext = new PerspectivesStatementContext(this.context, this.state);
        this.enterRule(localContext, 48, StructurizrDslParser.RULE_perspectivesStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 373;
            this.match(StructurizrDslParser.PERSPECTIVES);
            this.state = 374;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 378;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                {
                this.state = 375;
                this.perspectiveEntry();
                }
                }
                this.state = 380;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 381;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public perspectiveEntry(): PerspectiveEntryContext {
        let localContext = new PerspectiveEntryContext(this.context, this.state);
        this.enterRule(localContext, 50, StructurizrDslParser.RULE_perspectiveEntry);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 383;
            localContext._name = this.string_();
            this.state = 384;
            localContext._description = this.string_();
            this.state = 386;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 385;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public relationship(): RelationshipContext {
        let localContext = new RelationshipContext(this.context, this.state);
        this.enterRule(localContext, 52, StructurizrDslParser.RULE_relationship);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 388;
            localContext._source = this.identifier();
            this.state = 389;
            this.match(StructurizrDslParser.ARROW);
            this.state = 390;
            localContext._destination = this.string_();
            this.state = 392;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
            case 1:
                {
                this.state = 391;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 395;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
            case 1:
                {
                this.state = 394;
                localContext._technology = this.string_();
                }
                break;
            }
            this.state = 398;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                {
                this.state = 397;
                localContext._tags = this.string_();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public deploymentEnvironment(): DeploymentEnvironmentContext {
        let localContext = new DeploymentEnvironmentContext(this.context, this.state);
        this.enterRule(localContext, 54, StructurizrDslParser.RULE_deploymentEnvironment);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 400;
            this.match(StructurizrDslParser.DEPLOYMENT_ENVIRONMENT);
            this.state = 401;
            localContext._name = this.string_();
            this.state = 402;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 406;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294844031) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 403;
                this.deploymentNodeStatement();
                }
                }
                this.state = 408;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 409;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public deploymentNodeStatement(): DeploymentNodeStatementContext {
        let localContext = new DeploymentNodeStatementContext(this.context, this.state);
        this.enterRule(localContext, 56, StructurizrDslParser.RULE_deploymentNodeStatement);
        try {
            this.state = 417;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 411;
                this.deploymentNode();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 412;
                this.infrastructureNode();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 413;
                this.softwareSystemInstance();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 414;
                this.containerInstance();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 415;
                this.deploymentNodeAssignment();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 416;
                this.relationship();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public deploymentNodeAssignment(): DeploymentNodeAssignmentContext {
        let localContext = new DeploymentNodeAssignmentContext(this.context, this.state);
        this.enterRule(localContext, 58, StructurizrDslParser.RULE_deploymentNodeAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 419;
            this.identifier();
            this.state = 420;
            this.match(StructurizrDslParser.EQUALS);
            this.state = 421;
            this.deploymentNode();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public deploymentNode(): DeploymentNodeContext {
        let localContext = new DeploymentNodeContext(this.context, this.state);
        this.enterRule(localContext, 60, StructurizrDslParser.RULE_deploymentNode);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 423;
            this.match(StructurizrDslParser.DEPLOYMENT_NODE);
            this.state = 424;
            localContext._name = this.string_();
            this.state = 426;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 43, this.context) ) {
            case 1:
                {
                this.state = 425;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 429;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context) ) {
            case 1:
                {
                this.state = 428;
                localContext._technology = this.string_();
                }
                break;
            }
            this.state = 432;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 431;
                localContext._tags = this.string_();
                }
            }

            this.state = 434;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 438;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294844031) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 435;
                this.deploymentNodeStatement();
                }
                }
                this.state = 440;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 441;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public infrastructureNode(): InfrastructureNodeContext {
        let localContext = new InfrastructureNodeContext(this.context, this.state);
        this.enterRule(localContext, 62, StructurizrDslParser.RULE_infrastructureNode);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 443;
            this.match(StructurizrDslParser.INFRASTRUCTURE_NODE);
            this.state = 444;
            localContext._name = this.string_();
            this.state = 446;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                {
                this.state = 445;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 449;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                {
                this.state = 448;
                localContext._technology = this.string_();
                }
                break;
            }
            this.state = 452;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                {
                this.state = 451;
                localContext._tags = this.string_();
                }
                break;
            }
            this.state = 455;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 454;
                this.bodyBlock();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public softwareSystemInstance(): SoftwareSystemInstanceContext {
        let localContext = new SoftwareSystemInstanceContext(this.context, this.state);
        this.enterRule(localContext, 64, StructurizrDslParser.RULE_softwareSystemInstance);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 457;
            this.match(StructurizrDslParser.SOFTWARE_SYSTEM_INSTANCE);
            this.state = 458;
            localContext._ref = this.identifier();
            this.state = 460;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                {
                this.state = 459;
                localContext._instanceId = this.string_();
                }
                break;
            }
            this.state = 463;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                {
                this.state = 462;
                localContext._tags = this.string_();
                }
                break;
            }
            this.state = 466;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 465;
                this.bodyBlock();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public containerInstance(): ContainerInstanceContext {
        let localContext = new ContainerInstanceContext(this.context, this.state);
        this.enterRule(localContext, 66, StructurizrDslParser.RULE_containerInstance);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 468;
            this.match(StructurizrDslParser.CONTAINER_INSTANCE);
            this.state = 469;
            localContext._ref = this.identifier();
            this.state = 471;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                {
                this.state = 470;
                localContext._instanceId = this.string_();
                }
                break;
            }
            this.state = 474;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                {
                this.state = 473;
                localContext._tags = this.string_();
                }
                break;
            }
            this.state = 477;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 476;
                this.bodyBlock();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public views(): ViewsContext {
        let localContext = new ViewsContext(this.context, this.state);
        this.enterRule(localContext, 68, StructurizrDslParser.RULE_views);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 479;
            this.match(StructurizrDslParser.VIEWS);
            this.state = 480;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 484;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 66555) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 103) !== 0)) {
                {
                {
                this.state = 481;
                this.viewsBody();
                }
                }
                this.state = 486;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 487;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public viewsBody(): ViewsBodyContext {
        let localContext = new ViewsBodyContext(this.context, this.state);
        this.enterRule(localContext, 70, StructurizrDslParser.RULE_viewsBody);
        try {
            this.state = 504;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.SYSTEM_LANDSCAPE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 489;
                this.systemLandscapeView();
                }
                break;
            case StructurizrDslParser.SYSTEM_CONTEXT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 490;
                this.systemContextView();
                }
                break;
            case StructurizrDslParser.CONTAINER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 491;
                this.containerView();
                }
                break;
            case StructurizrDslParser.COMPONENT:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 492;
                this.componentView();
                }
                break;
            case StructurizrDslParser.DYNAMIC:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 493;
                this.dynamicView();
                }
                break;
            case StructurizrDslParser.DEPLOYMENT:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 494;
                this.deploymentView();
                }
                break;
            case StructurizrDslParser.FILTERED:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 495;
                this.filteredView();
                }
                break;
            case StructurizrDslParser.IMAGE:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 496;
                this.imageView();
                }
                break;
            case StructurizrDslParser.CUSTOM:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 497;
                this.customView();
                }
                break;
            case StructurizrDslParser.STYLES:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 498;
                this.styles();
                }
                break;
            case StructurizrDslParser.THEME:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 499;
                this.themeStatement();
                }
                break;
            case StructurizrDslParser.THEMES:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 500;
                this.themesStatement();
                }
                break;
            case StructurizrDslParser.BRANDING:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 501;
                this.brandingBlock();
                }
                break;
            case StructurizrDslParser.TERMINOLOGY:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 502;
                this.terminologyBlock();
                }
                break;
            case StructurizrDslParser.CONFIGURATION:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 503;
                this.configurationBlock();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public systemLandscapeView(): SystemLandscapeViewContext {
        let localContext = new SystemLandscapeViewContext(this.context, this.state);
        this.enterRule(localContext, 72, StructurizrDslParser.RULE_systemLandscapeView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 506;
            this.match(StructurizrDslParser.SYSTEM_LANDSCAPE);
            this.state = 508;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
            case 1:
                {
                this.state = 507;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 510;
                localContext._description = this.string_();
                }
            }

            this.state = 513;
            this.viewBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public systemContextView(): SystemContextViewContext {
        let localContext = new SystemContextViewContext(this.context, this.state);
        this.enterRule(localContext, 74, StructurizrDslParser.RULE_systemContextView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 515;
            this.match(StructurizrDslParser.SYSTEM_CONTEXT);
            this.state = 516;
            localContext._systemIdentifier = this.identifier();
            this.state = 518;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                {
                this.state = 517;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 521;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 520;
                localContext._description = this.string_();
                }
            }

            this.state = 523;
            this.viewBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public containerView(): ContainerViewContext {
        let localContext = new ContainerViewContext(this.context, this.state);
        this.enterRule(localContext, 76, StructurizrDslParser.RULE_containerView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 525;
            this.match(StructurizrDslParser.CONTAINER);
            this.state = 526;
            localContext._systemIdentifier = this.identifier();
            this.state = 528;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                {
                this.state = 527;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 531;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 530;
                localContext._description = this.string_();
                }
            }

            this.state = 533;
            this.viewBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public componentView(): ComponentViewContext {
        let localContext = new ComponentViewContext(this.context, this.state);
        this.enterRule(localContext, 78, StructurizrDslParser.RULE_componentView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 535;
            this.match(StructurizrDslParser.COMPONENT);
            this.state = 536;
            localContext._containerIdentifier = this.identifier();
            this.state = 538;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 65, this.context) ) {
            case 1:
                {
                this.state = 537;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 541;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 540;
                localContext._description = this.string_();
                }
            }

            this.state = 543;
            this.viewBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dynamicView(): DynamicViewContext {
        let localContext = new DynamicViewContext(this.context, this.state);
        this.enterRule(localContext, 80, StructurizrDslParser.RULE_dynamicView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 545;
            this.match(StructurizrDslParser.DYNAMIC);
            this.state = 547;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                {
                this.state = 546;
                localContext._elementRef = this.identifier();
                }
                break;
            }
            this.state = 550;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
            case 1:
                {
                this.state = 549;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 553;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 552;
                localContext._description = this.string_();
                }
            }

            this.state = 555;
            this.viewBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public deploymentView(): DeploymentViewContext {
        let localContext = new DeploymentViewContext(this.context, this.state);
        this.enterRule(localContext, 82, StructurizrDslParser.RULE_deploymentView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 557;
            this.match(StructurizrDslParser.DEPLOYMENT);
            this.state = 559;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                {
                this.state = 558;
                localContext._elementRef = this.identifier();
                }
                break;
            }
            this.state = 562;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context) ) {
            case 1:
                {
                this.state = 561;
                localContext._environment = this.string_();
                }
                break;
            }
            this.state = 565;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                {
                this.state = 564;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 568;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 567;
                localContext._description = this.string_();
                }
            }

            this.state = 570;
            this.viewBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public filteredView(): FilteredViewContext {
        let localContext = new FilteredViewContext(this.context, this.state);
        this.enterRule(localContext, 84, StructurizrDslParser.RULE_filteredView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 572;
            this.match(StructurizrDslParser.FILTERED);
            this.state = 573;
            localContext._baseKey = this.string_();
            this.state = 574;
            localContext._filterMode = this.identifier();
            this.state = 575;
            localContext._filterTags = this.string_();
            this.state = 577;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
            case 1:
                {
                this.state = 576;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 580;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 579;
                localContext._description = this.string_();
                }
            }

            this.state = 583;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 582;
                this.viewBody();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public imageView(): ImageViewContext {
        let localContext = new ImageViewContext(this.context, this.state);
        this.enterRule(localContext, 86, StructurizrDslParser.RULE_imageView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 585;
            this.match(StructurizrDslParser.IMAGE);
            this.state = 586;
            localContext._elementRef = this.identifier();
            this.state = 588;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 587;
                localContext._key = this.string_();
                }
            }

            this.state = 590;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 594;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 49153) !== 0)) {
                {
                {
                this.state = 591;
                this.imageViewStatement();
                }
                }
                this.state = 596;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 597;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public imageViewStatement(): ImageViewStatementContext {
        let localContext = new ImageViewStatementContext(this.context, this.state);
        this.enterRule(localContext, 88, StructurizrDslParser.RULE_imageViewStatement);
        let _la: number;
        try {
            this.state = 609;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.TITLE:
            case StructurizrDslParser.DESCRIPTION:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 599;
                _la = this.tokenStream.LA(1);
                if(!(_la === 46 || _la === 47)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 600;
                localContext._value = this.string_();
                this.state = 602;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 8) {
                    {
                    this.state = 601;
                    this.match(StructurizrDslParser.SEMICOLON);
                    }
                }

                }
                break;
            case StructurizrDslParser.IMAGE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 604;
                this.match(StructurizrDslParser.IMAGE);
                this.state = 605;
                localContext._value = this.string_();
                this.state = 607;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 8) {
                    {
                    this.state = 606;
                    this.match(StructurizrDslParser.SEMICOLON);
                    }
                }

                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public customView(): CustomViewContext {
        let localContext = new CustomViewContext(this.context, this.state);
        this.enterRule(localContext, 90, StructurizrDslParser.RULE_customView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 611;
            this.match(StructurizrDslParser.CUSTOM);
            this.state = 613;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                {
                this.state = 612;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 616;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                this.state = 615;
                localContext._description = this.string_();
                }
            }

            this.state = 618;
            this.viewBody();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public viewBody(): ViewBodyContext {
        let localContext = new ViewBodyContext(this.context, this.state);
        this.enterRule(localContext, 92, StructurizrDslParser.RULE_viewBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 620;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 624;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 63) !== 0)) {
                {
                {
                this.state = 621;
                this.viewStatement();
                }
                }
                this.state = 626;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 627;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public viewStatement(): ViewStatementContext {
        let localContext = new ViewStatementContext(this.context, this.state);
        this.enterRule(localContext, 94, StructurizrDslParser.RULE_viewStatement);
        try {
            this.state = 635;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.INCLUDE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 629;
                this.includeStatement();
                }
                break;
            case StructurizrDslParser.EXCLUDE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 630;
                this.excludeStatement();
                }
                break;
            case StructurizrDslParser.AUTO_LAYOUT:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 631;
                this.autoLayoutStatement();
                }
                break;
            case StructurizrDslParser.TITLE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 632;
                this.titleStatement();
                }
                break;
            case StructurizrDslParser.DESCRIPTION:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 633;
                this.descriptionStatement();
                }
                break;
            case StructurizrDslParser.ANIMATION:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 634;
                this.animationStatement();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public includeStatement(): IncludeStatementContext {
        let localContext = new IncludeStatementContext(this.context, this.state);
        this.enterRule(localContext, 96, StructurizrDslParser.RULE_includeStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 637;
            this.match(StructurizrDslParser.INCLUDE);
            this.state = 638;
            this.includeTarget();
            this.state = 642;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 639;
                    this.includeTarget();
                    }
                    }
                }
                this.state = 644;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public excludeStatement(): ExcludeStatementContext {
        let localContext = new ExcludeStatementContext(this.context, this.state);
        this.enterRule(localContext, 98, StructurizrDslParser.RULE_excludeStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 645;
            this.match(StructurizrDslParser.EXCLUDE);
            this.state = 646;
            this.includeTarget();
            this.state = 650;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 647;
                    this.includeTarget();
                    }
                    }
                }
                this.state = 652;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public includeTarget(): IncludeTargetContext {
        let localContext = new IncludeTargetContext(this.context, this.state);
        this.enterRule(localContext, 100, StructurizrDslParser.RULE_includeTarget);
        try {
            this.state = 655;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 653;
                this.identifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 654;
                this.string_();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public autoLayoutStatement(): AutoLayoutStatementContext {
        let localContext = new AutoLayoutStatementContext(this.context, this.state);
        this.enterRule(localContext, 102, StructurizrDslParser.RULE_autoLayoutStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 657;
            this.match(StructurizrDslParser.AUTO_LAYOUT);
            this.state = 659;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
            case 1:
                {
                this.state = 658;
                localContext._direction = this.identifier();
                }
                break;
            }
            this.state = 662;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 90, this.context) ) {
            case 1:
                {
                this.state = 661;
                localContext._rankSep = this.identifier();
                }
                break;
            }
            this.state = 665;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 91, this.context) ) {
            case 1:
                {
                this.state = 664;
                localContext._nodeSep = this.identifier();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public titleStatement(): TitleStatementContext {
        let localContext = new TitleStatementContext(this.context, this.state);
        this.enterRule(localContext, 104, StructurizrDslParser.RULE_titleStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 667;
            this.match(StructurizrDslParser.TITLE);
            this.state = 668;
            this.string_();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public descriptionStatement(): DescriptionStatementContext {
        let localContext = new DescriptionStatementContext(this.context, this.state);
        this.enterRule(localContext, 106, StructurizrDslParser.RULE_descriptionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 670;
            this.match(StructurizrDslParser.DESCRIPTION);
            this.state = 671;
            this.string_();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public animationStatement(): AnimationStatementContext {
        let localContext = new AnimationStatementContext(this.context, this.state);
        this.enterRule(localContext, 108, StructurizrDslParser.RULE_animationStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 673;
            this.match(StructurizrDslParser.ANIMATION);
            this.state = 674;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 678;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 675;
                this.identifier();
                }
                }
                this.state = 680;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 681;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public themeStatement(): ThemeStatementContext {
        let localContext = new ThemeStatementContext(this.context, this.state);
        this.enterRule(localContext, 110, StructurizrDslParser.RULE_themeStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 683;
            this.match(StructurizrDslParser.THEME);
            this.state = 684;
            localContext._url = this.string_();
            this.state = 686;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 685;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public themesStatement(): ThemesStatementContext {
        let localContext = new ThemesStatementContext(this.context, this.state);
        this.enterRule(localContext, 112, StructurizrDslParser.RULE_themesStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 688;
            this.match(StructurizrDslParser.THEMES);
            this.state = 690;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 689;
                this.string_();
                }
                }
                this.state = 692;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0));
            this.state = 695;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 694;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public brandingBlock(): BrandingBlockContext {
        let localContext = new BrandingBlockContext(this.context, this.state);
        this.enterRule(localContext, 114, StructurizrDslParser.RULE_brandingBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 697;
            this.match(StructurizrDslParser.BRANDING);
            this.state = 698;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 702;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 76) {
                {
                {
                this.state = 699;
                this.brandingStatement();
                }
                }
                this.state = 704;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 705;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public brandingStatement(): BrandingStatementContext {
        let localContext = new BrandingStatementContext(this.context, this.state);
        this.enterRule(localContext, 116, StructurizrDslParser.RULE_brandingStatement);
        let _la: number;
        try {
            this.state = 717;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.LOGO:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 707;
                this.match(StructurizrDslParser.LOGO);
                this.state = 708;
                localContext._value = this.string_();
                this.state = 710;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 8) {
                    {
                    this.state = 709;
                    this.match(StructurizrDslParser.SEMICOLON);
                    }
                }

                }
                break;
            case StructurizrDslParser.FONT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 712;
                this.match(StructurizrDslParser.FONT);
                this.state = 713;
                localContext._value = this.string_();
                this.state = 715;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 8) {
                    {
                    this.state = 714;
                    this.match(StructurizrDslParser.SEMICOLON);
                    }
                }

                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public terminologyBlock(): TerminologyBlockContext {
        let localContext = new TerminologyBlockContext(this.context, this.state);
        this.enterRule(localContext, 118, StructurizrDslParser.RULE_terminologyBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 719;
            this.match(StructurizrDslParser.TERMINOLOGY);
            this.state = 720;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 724;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 721;
                this.terminologyEntry();
                }
                }
                this.state = 726;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 727;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public terminologyEntry(): TerminologyEntryContext {
        let localContext = new TerminologyEntryContext(this.context, this.state);
        this.enterRule(localContext, 120, StructurizrDslParser.RULE_terminologyEntry);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 729;
            localContext._key = this.identifier();
            this.state = 730;
            localContext._value = this.string_();
            this.state = 732;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 731;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public configurationBlock(): ConfigurationBlockContext {
        let localContext = new ConfigurationBlockContext(this.context, this.state);
        this.enterRule(localContext, 122, StructurizrDslParser.RULE_configurationBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 734;
            this.match(StructurizrDslParser.CONFIGURATION);
            this.state = 735;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 739;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79 || _la === 80) {
                {
                {
                this.state = 736;
                this.configurationEntry();
                }
                }
                this.state = 741;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 742;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public configurationEntry(): ConfigurationEntryContext {
        let localContext = new ConfigurationEntryContext(this.context, this.state);
        this.enterRule(localContext, 124, StructurizrDslParser.RULE_configurationEntry);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 744;
            _la = this.tokenStream.LA(1);
            if(!(_la === 79 || _la === 80)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 745;
            localContext._value = this.string_();
            this.state = 747;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 746;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public styles(): StylesContext {
        let localContext = new StylesContext(this.context, this.state);
        this.enterRule(localContext, 126, StructurizrDslParser.RULE_styles);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 749;
            this.match(StructurizrDslParser.STYLES);
            this.state = 750;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 754;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 41 || _la === 42) {
                {
                {
                this.state = 751;
                this.stylesBody();
                }
                }
                this.state = 756;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 757;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stylesBody(): StylesBodyContext {
        let localContext = new StylesBodyContext(this.context, this.state);
        this.enterRule(localContext, 128, StructurizrDslParser.RULE_stylesBody);
        try {
            this.state = 761;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.ELEMENT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 759;
                this.elementStyle();
                }
                break;
            case StructurizrDslParser.RELATIONSHIP:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 760;
                this.relationshipStyle();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elementStyle(): ElementStyleContext {
        let localContext = new ElementStyleContext(this.context, this.state);
        this.enterRule(localContext, 130, StructurizrDslParser.RULE_elementStyle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 763;
            this.match(StructurizrDslParser.ELEMENT);
            this.state = 764;
            localContext._tag = this.string_();
            this.state = 765;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 769;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 766;
                this.elementStyleProperty();
                }
                }
                this.state = 771;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 772;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elementStyleProperty(): ElementStylePropertyContext {
        let localContext = new ElementStylePropertyContext(this.context, this.state);
        this.enterRule(localContext, 132, StructurizrDslParser.RULE_elementStyleProperty);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 803;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
            case 1:
                {
                this.state = 774;
                this.match(StructurizrDslParser.BACKGROUND);
                this.state = 775;
                localContext._color = this.string_();
                }
                break;
            case 2:
                {
                this.state = 776;
                this.match(StructurizrDslParser.COLOR);
                this.state = 777;
                localContext._color = this.string_();
                }
                break;
            case 3:
                {
                this.state = 778;
                this.match(StructurizrDslParser.COLOUR);
                this.state = 779;
                localContext._color = this.string_();
                }
                break;
            case 4:
                {
                this.state = 780;
                this.match(StructurizrDslParser.STROKE);
                this.state = 781;
                localContext._color = this.string_();
                }
                break;
            case 5:
                {
                this.state = 782;
                this.match(StructurizrDslParser.SHAPE);
                this.state = 783;
                localContext._shape = this.string_();
                }
                break;
            case 6:
                {
                this.state = 784;
                this.match(StructurizrDslParser.FONT_SIZE);
                this.state = 785;
                localContext._size = this.string_();
                }
                break;
            case 7:
                {
                this.state = 786;
                this.match(StructurizrDslParser.BORDER);
                this.state = 787;
                localContext._border = this.string_();
                }
                break;
            case 8:
                {
                this.state = 788;
                this.match(StructurizrDslParser.OPACITY);
                this.state = 789;
                localContext._opacity = this.string_();
                }
                break;
            case 9:
                {
                this.state = 790;
                this.match(StructurizrDslParser.ICON);
                this.state = 791;
                localContext._icon = this.string_();
                }
                break;
            case 10:
                {
                this.state = 792;
                this.match(StructurizrDslParser.WIDTH);
                this.state = 793;
                localContext._width = this.string_();
                }
                break;
            case 11:
                {
                this.state = 794;
                this.match(StructurizrDslParser.HEIGHT);
                this.state = 795;
                localContext._height = this.string_();
                }
                break;
            case 12:
                {
                this.state = 796;
                this.match(StructurizrDslParser.STROKE_WIDTH);
                this.state = 797;
                localContext._strokeWidth = this.string_();
                }
                break;
            case 13:
                {
                this.state = 798;
                this.match(StructurizrDslParser.ICON_POSITION);
                this.state = 799;
                localContext._iconPosition = this.string_();
                }
                break;
            case 14:
                {
                this.state = 800;
                this.match(StructurizrDslParser.METADATA);
                this.state = 801;
                localContext._metadata = this.string_();
                }
                break;
            case 15:
                {
                this.state = 802;
                this.unknownProperty();
                }
                break;
            }
            this.state = 806;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 805;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public relationshipStyle(): RelationshipStyleContext {
        let localContext = new RelationshipStyleContext(this.context, this.state);
        this.enterRule(localContext, 134, StructurizrDslParser.RULE_relationshipStyle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 808;
            this.match(StructurizrDslParser.RELATIONSHIP);
            this.state = 809;
            localContext._tag = this.string_();
            this.state = 810;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 814;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0)) {
                {
                {
                this.state = 811;
                this.relationshipStyleProperty();
                }
                }
                this.state = 816;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 817;
            this.match(StructurizrDslParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public relationshipStyleProperty(): RelationshipStylePropertyContext {
        let localContext = new RelationshipStylePropertyContext(this.context, this.state);
        this.enterRule(localContext, 136, StructurizrDslParser.RULE_relationshipStyleProperty);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 840;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
            case 1:
                {
                this.state = 819;
                this.match(StructurizrDslParser.COLOR);
                this.state = 820;
                localContext._color = this.string_();
                }
                break;
            case 2:
                {
                this.state = 821;
                this.match(StructurizrDslParser.COLOUR);
                this.state = 822;
                localContext._color = this.string_();
                }
                break;
            case 3:
                {
                this.state = 823;
                this.match(StructurizrDslParser.THICKNESS);
                this.state = 824;
                localContext._thickness = this.string_();
                }
                break;
            case 4:
                {
                this.state = 825;
                this.match(StructurizrDslParser.DASHED);
                this.state = 826;
                localContext._dashed = this.string_();
                }
                break;
            case 5:
                {
                this.state = 827;
                this.match(StructurizrDslParser.ROUTING);
                this.state = 828;
                localContext._routing = this.string_();
                }
                break;
            case 6:
                {
                this.state = 829;
                this.match(StructurizrDslParser.FONT_SIZE);
                this.state = 830;
                localContext._size = this.string_();
                }
                break;
            case 7:
                {
                this.state = 831;
                this.match(StructurizrDslParser.STYLE_PROP);
                this.state = 832;
                localContext._style = this.string_();
                }
                break;
            case 8:
                {
                this.state = 833;
                this.match(StructurizrDslParser.POSITION);
                this.state = 834;
                localContext._position = this.string_();
                }
                break;
            case 9:
                {
                this.state = 835;
                this.match(StructurizrDslParser.OPACITY);
                this.state = 836;
                localContext._opacity = this.string_();
                }
                break;
            case 10:
                {
                this.state = 837;
                this.match(StructurizrDslParser.WIDTH);
                this.state = 838;
                localContext._width = this.string_();
                }
                break;
            case 11:
                {
                this.state = 839;
                this.unknownProperty();
                }
                break;
            }
            this.state = 843;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 842;
                this.match(StructurizrDslParser.SEMICOLON);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unknownProperty(): UnknownPropertyContext {
        let localContext = new UnknownPropertyContext(this.context, this.state);
        this.enterRule(localContext, 138, StructurizrDslParser.RULE_unknownProperty);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 845;
            this.identifier();
            this.state = 850;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 113, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 848;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
                    case 1:
                        {
                        this.state = 846;
                        this.identifier();
                        }
                        break;
                    case 2:
                        {
                        this.state = 847;
                        this.string_();
                        }
                        break;
                    }
                    }
                }
                this.state = 852;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 113, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public string_(): StringContext {
        let localContext = new StringContext(this.context, this.state);
        this.enterRule(localContext, 140, StructurizrDslParser.RULE_string);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 853;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 142, StructurizrDslParser.RULE_identifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 855;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3888644224) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294843935) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 655359) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tagsDef(): TagsDefContext {
        let localContext = new TagsDefContext(this.context, this.state);
        this.enterRule(localContext, 144, StructurizrDslParser.RULE_tagsDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 857;
            this.match(StructurizrDslParser.LBRACKET);
            this.state = 858;
            this.string_();
            this.state = 865;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9 || ((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                {
                {
                this.state = 860;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 9) {
                    {
                    this.state = 859;
                    this.match(StructurizrDslParser.COMMA);
                    }
                }

                this.state = 862;
                this.string_();
                }
                }
                this.state = 867;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 868;
            this.match(StructurizrDslParser.RBRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,86,871,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,
        7,72,1,0,1,0,1,0,3,0,150,8,0,1,0,3,0,153,8,0,1,0,3,0,156,8,0,1,0,
        1,0,5,0,160,8,0,10,0,12,0,163,9,0,1,0,1,0,1,0,1,1,1,1,1,1,3,1,171,
        8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
        1,2,1,2,1,2,1,2,1,2,3,2,193,8,2,1,3,1,3,1,3,5,3,198,8,3,10,3,12,
        3,201,9,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,3,4,211,8,4,1,5,1,5,1,
        5,1,5,1,5,1,5,3,5,219,8,5,1,6,1,6,1,6,1,6,5,6,225,8,6,10,6,12,6,
        228,9,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,3,7,237,8,7,1,8,1,8,1,8,3,8,
        242,8,8,1,8,3,8,245,8,8,1,8,3,8,248,8,8,1,9,1,9,1,9,3,9,253,8,9,
        1,9,3,9,256,8,9,1,9,3,9,259,8,9,1,10,1,10,5,10,263,8,10,10,10,12,
        10,266,9,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,3,11,275,8,11,1,12,
        1,12,1,12,1,12,1,13,1,13,1,13,3,13,284,8,13,1,13,3,13,287,8,13,1,
        13,3,13,290,8,13,1,13,3,13,293,8,13,1,14,1,14,5,14,297,8,14,10,14,
        12,14,300,9,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,3,15,309,8,15,
        1,16,1,16,1,16,1,16,1,17,1,17,1,17,3,17,318,8,17,1,17,3,17,321,8,
        17,1,17,3,17,324,8,17,1,17,3,17,327,8,17,1,18,1,18,5,18,331,8,18,
        10,18,12,18,334,9,18,1,18,1,18,1,19,1,19,1,19,1,19,1,19,3,19,343,
        8,19,1,20,1,20,1,20,3,20,348,8,20,1,21,1,21,4,21,352,8,21,11,21,
        12,21,353,1,21,3,21,357,8,21,1,22,1,22,1,22,5,22,362,8,22,10,22,
        12,22,365,9,22,1,22,1,22,1,23,1,23,1,23,3,23,372,8,23,1,24,1,24,
        1,24,5,24,377,8,24,10,24,12,24,380,9,24,1,24,1,24,1,25,1,25,1,25,
        3,25,387,8,25,1,26,1,26,1,26,1,26,3,26,393,8,26,1,26,3,26,396,8,
        26,1,26,3,26,399,8,26,1,27,1,27,1,27,1,27,5,27,405,8,27,10,27,12,
        27,408,9,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,3,28,418,8,28,
        1,29,1,29,1,29,1,29,1,30,1,30,1,30,3,30,427,8,30,1,30,3,30,430,8,
        30,1,30,3,30,433,8,30,1,30,1,30,5,30,437,8,30,10,30,12,30,440,9,
        30,1,30,1,30,1,31,1,31,1,31,3,31,447,8,31,1,31,3,31,450,8,31,1,31,
        3,31,453,8,31,1,31,3,31,456,8,31,1,32,1,32,1,32,3,32,461,8,32,1,
        32,3,32,464,8,32,1,32,3,32,467,8,32,1,33,1,33,1,33,3,33,472,8,33,
        1,33,3,33,475,8,33,1,33,3,33,478,8,33,1,34,1,34,1,34,5,34,483,8,
        34,10,34,12,34,486,9,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,35,
        1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,505,8,35,1,36,
        1,36,3,36,509,8,36,1,36,3,36,512,8,36,1,36,1,36,1,37,1,37,1,37,3,
        37,519,8,37,1,37,3,37,522,8,37,1,37,1,37,1,38,1,38,1,38,3,38,529,
        8,38,1,38,3,38,532,8,38,1,38,1,38,1,39,1,39,1,39,3,39,539,8,39,1,
        39,3,39,542,8,39,1,39,1,39,1,40,1,40,3,40,548,8,40,1,40,3,40,551,
        8,40,1,40,3,40,554,8,40,1,40,1,40,1,41,1,41,3,41,560,8,41,1,41,3,
        41,563,8,41,1,41,3,41,566,8,41,1,41,3,41,569,8,41,1,41,1,41,1,42,
        1,42,1,42,1,42,1,42,3,42,578,8,42,1,42,3,42,581,8,42,1,42,3,42,584,
        8,42,1,43,1,43,1,43,3,43,589,8,43,1,43,1,43,5,43,593,8,43,10,43,
        12,43,596,9,43,1,43,1,43,1,44,1,44,1,44,3,44,603,8,44,1,44,1,44,
        1,44,3,44,608,8,44,3,44,610,8,44,1,45,1,45,3,45,614,8,45,1,45,3,
        45,617,8,45,1,45,1,45,1,46,1,46,5,46,623,8,46,10,46,12,46,626,9,
        46,1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,47,3,47,636,8,47,1,48,1,
        48,1,48,5,48,641,8,48,10,48,12,48,644,9,48,1,49,1,49,1,49,5,49,649,
        8,49,10,49,12,49,652,9,49,1,50,1,50,3,50,656,8,50,1,51,1,51,3,51,
        660,8,51,1,51,3,51,663,8,51,1,51,3,51,666,8,51,1,52,1,52,1,52,1,
        53,1,53,1,53,1,54,1,54,1,54,5,54,677,8,54,10,54,12,54,680,9,54,1,
        54,1,54,1,55,1,55,1,55,3,55,687,8,55,1,56,1,56,4,56,691,8,56,11,
        56,12,56,692,1,56,3,56,696,8,56,1,57,1,57,1,57,5,57,701,8,57,10,
        57,12,57,704,9,57,1,57,1,57,1,58,1,58,1,58,3,58,711,8,58,1,58,1,
        58,1,58,3,58,716,8,58,3,58,718,8,58,1,59,1,59,1,59,5,59,723,8,59,
        10,59,12,59,726,9,59,1,59,1,59,1,60,1,60,1,60,3,60,733,8,60,1,61,
        1,61,1,61,5,61,738,8,61,10,61,12,61,741,9,61,1,61,1,61,1,62,1,62,
        1,62,3,62,748,8,62,1,63,1,63,1,63,5,63,753,8,63,10,63,12,63,756,
        9,63,1,63,1,63,1,64,1,64,3,64,762,8,64,1,65,1,65,1,65,1,65,5,65,
        768,8,65,10,65,12,65,771,9,65,1,65,1,65,1,66,1,66,1,66,1,66,1,66,
        1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,
        1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,3,66,804,
        8,66,1,66,3,66,807,8,66,1,67,1,67,1,67,1,67,5,67,813,8,67,10,67,
        12,67,816,9,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,
        1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,
        3,68,841,8,68,1,68,3,68,844,8,68,1,69,1,69,1,69,5,69,849,8,69,10,
        69,12,69,852,9,69,1,70,1,70,1,71,1,71,1,72,1,72,1,72,3,72,861,8,
        72,1,72,5,72,864,8,72,10,72,12,72,867,9,72,1,72,1,72,1,72,0,0,73,
        0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,
        46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,
        90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,
        126,128,130,132,134,136,138,140,142,144,0,4,1,0,46,47,1,0,79,80,
        1,0,81,83,7,0,7,7,19,19,22,26,29,36,41,44,49,80,83,83,981,0,146,
        1,0,0,0,2,170,1,0,0,0,4,192,1,0,0,0,6,194,1,0,0,0,8,210,1,0,0,0,
        10,212,1,0,0,0,12,220,1,0,0,0,14,236,1,0,0,0,16,238,1,0,0,0,18,249,
        1,0,0,0,20,260,1,0,0,0,22,274,1,0,0,0,24,276,1,0,0,0,26,280,1,0,
        0,0,28,294,1,0,0,0,30,308,1,0,0,0,32,310,1,0,0,0,34,314,1,0,0,0,
        36,328,1,0,0,0,38,342,1,0,0,0,40,344,1,0,0,0,42,349,1,0,0,0,44,358,
        1,0,0,0,46,368,1,0,0,0,48,373,1,0,0,0,50,383,1,0,0,0,52,388,1,0,
        0,0,54,400,1,0,0,0,56,417,1,0,0,0,58,419,1,0,0,0,60,423,1,0,0,0,
        62,443,1,0,0,0,64,457,1,0,0,0,66,468,1,0,0,0,68,479,1,0,0,0,70,504,
        1,0,0,0,72,506,1,0,0,0,74,515,1,0,0,0,76,525,1,0,0,0,78,535,1,0,
        0,0,80,545,1,0,0,0,82,557,1,0,0,0,84,572,1,0,0,0,86,585,1,0,0,0,
        88,609,1,0,0,0,90,611,1,0,0,0,92,620,1,0,0,0,94,635,1,0,0,0,96,637,
        1,0,0,0,98,645,1,0,0,0,100,655,1,0,0,0,102,657,1,0,0,0,104,667,1,
        0,0,0,106,670,1,0,0,0,108,673,1,0,0,0,110,683,1,0,0,0,112,688,1,
        0,0,0,114,697,1,0,0,0,116,717,1,0,0,0,118,719,1,0,0,0,120,729,1,
        0,0,0,122,734,1,0,0,0,124,744,1,0,0,0,126,749,1,0,0,0,128,761,1,
        0,0,0,130,763,1,0,0,0,132,803,1,0,0,0,134,808,1,0,0,0,136,840,1,
        0,0,0,138,845,1,0,0,0,140,853,1,0,0,0,142,855,1,0,0,0,144,857,1,
        0,0,0,146,149,5,18,0,0,147,148,5,19,0,0,148,150,3,140,70,0,149,147,
        1,0,0,0,149,150,1,0,0,0,150,152,1,0,0,0,151,153,3,140,70,0,152,151,
        1,0,0,0,152,153,1,0,0,0,153,155,1,0,0,0,154,156,3,140,70,0,155,154,
        1,0,0,0,155,156,1,0,0,0,156,157,1,0,0,0,157,161,5,1,0,0,158,160,
        3,2,1,0,159,158,1,0,0,0,160,163,1,0,0,0,161,159,1,0,0,0,161,162,
        1,0,0,0,162,164,1,0,0,0,163,161,1,0,0,0,164,165,5,2,0,0,165,166,
        5,0,0,1,166,1,1,0,0,0,167,171,3,6,3,0,168,171,3,68,34,0,169,171,
        3,4,2,0,170,167,1,0,0,0,170,168,1,0,0,0,170,169,1,0,0,0,171,3,1,
        0,0,0,172,173,5,10,0,0,173,193,3,140,70,0,174,175,5,11,0,0,175,193,
        3,142,71,0,176,177,5,12,0,0,177,178,3,142,71,0,178,179,3,140,70,
        0,179,193,1,0,0,0,180,181,5,13,0,0,181,182,3,142,71,0,182,183,3,
        140,70,0,183,193,1,0,0,0,184,185,5,14,0,0,185,193,3,140,70,0,186,
        187,5,15,0,0,187,193,3,140,70,0,188,189,5,16,0,0,189,193,3,140,70,
        0,190,191,5,17,0,0,191,193,3,140,70,0,192,172,1,0,0,0,192,174,1,
        0,0,0,192,176,1,0,0,0,192,180,1,0,0,0,192,184,1,0,0,0,192,186,1,
        0,0,0,192,188,1,0,0,0,192,190,1,0,0,0,193,5,1,0,0,0,194,195,5,20,
        0,0,195,199,5,1,0,0,196,198,3,8,4,0,197,196,1,0,0,0,198,201,1,0,
        0,0,199,197,1,0,0,0,199,200,1,0,0,0,200,202,1,0,0,0,201,199,1,0,
        0,0,202,203,5,2,0,0,203,7,1,0,0,0,204,211,3,16,8,0,205,211,3,18,
        9,0,206,211,3,52,26,0,207,211,3,10,5,0,208,211,3,12,6,0,209,211,
        3,54,27,0,210,204,1,0,0,0,210,205,1,0,0,0,210,206,1,0,0,0,210,207,
        1,0,0,0,210,208,1,0,0,0,210,209,1,0,0,0,211,9,1,0,0,0,212,213,3,
        142,71,0,213,218,5,5,0,0,214,219,3,16,8,0,215,219,3,18,9,0,216,219,
        3,26,13,0,217,219,3,34,17,0,218,214,1,0,0,0,218,215,1,0,0,0,218,
        216,1,0,0,0,218,217,1,0,0,0,219,11,1,0,0,0,220,221,5,26,0,0,221,
        222,3,140,70,0,222,226,5,1,0,0,223,225,3,14,7,0,224,223,1,0,0,0,
        225,228,1,0,0,0,226,224,1,0,0,0,226,227,1,0,0,0,227,229,1,0,0,0,
        228,226,1,0,0,0,229,230,5,2,0,0,230,13,1,0,0,0,231,237,3,16,8,0,
        232,237,3,18,9,0,233,237,3,52,26,0,234,237,3,10,5,0,235,237,3,12,
        6,0,236,231,1,0,0,0,236,232,1,0,0,0,236,233,1,0,0,0,236,234,1,0,
        0,0,236,235,1,0,0,0,237,15,1,0,0,0,238,239,5,22,0,0,239,241,3,140,
        70,0,240,242,3,140,70,0,241,240,1,0,0,0,241,242,1,0,0,0,242,244,
        1,0,0,0,243,245,3,140,70,0,244,243,1,0,0,0,244,245,1,0,0,0,245,247,
        1,0,0,0,246,248,3,36,18,0,247,246,1,0,0,0,247,248,1,0,0,0,248,17,
        1,0,0,0,249,250,5,23,0,0,250,252,3,140,70,0,251,253,3,140,70,0,252,
        251,1,0,0,0,252,253,1,0,0,0,253,255,1,0,0,0,254,256,3,140,70,0,255,
        254,1,0,0,0,255,256,1,0,0,0,256,258,1,0,0,0,257,259,3,20,10,0,258,
        257,1,0,0,0,258,259,1,0,0,0,259,19,1,0,0,0,260,264,5,1,0,0,261,263,
        3,22,11,0,262,261,1,0,0,0,263,266,1,0,0,0,264,262,1,0,0,0,264,265,
        1,0,0,0,265,267,1,0,0,0,266,264,1,0,0,0,267,268,5,2,0,0,268,21,1,
        0,0,0,269,275,3,26,13,0,270,275,3,52,26,0,271,275,3,24,12,0,272,
        275,3,12,6,0,273,275,3,38,19,0,274,269,1,0,0,0,274,270,1,0,0,0,274,
        271,1,0,0,0,274,272,1,0,0,0,274,273,1,0,0,0,275,23,1,0,0,0,276,277,
        3,142,71,0,277,278,5,5,0,0,278,279,3,26,13,0,279,25,1,0,0,0,280,
        281,5,24,0,0,281,283,3,140,70,0,282,284,3,140,70,0,283,282,1,0,0,
        0,283,284,1,0,0,0,284,286,1,0,0,0,285,287,3,140,70,0,286,285,1,0,
        0,0,286,287,1,0,0,0,287,289,1,0,0,0,288,290,3,140,70,0,289,288,1,
        0,0,0,289,290,1,0,0,0,290,292,1,0,0,0,291,293,3,28,14,0,292,291,
        1,0,0,0,292,293,1,0,0,0,293,27,1,0,0,0,294,298,5,1,0,0,295,297,3,
        30,15,0,296,295,1,0,0,0,297,300,1,0,0,0,298,296,1,0,0,0,298,299,
        1,0,0,0,299,301,1,0,0,0,300,298,1,0,0,0,301,302,5,2,0,0,302,29,1,
        0,0,0,303,309,3,34,17,0,304,309,3,52,26,0,305,309,3,32,16,0,306,
        309,3,12,6,0,307,309,3,38,19,0,308,303,1,0,0,0,308,304,1,0,0,0,308,
        305,1,0,0,0,308,306,1,0,0,0,308,307,1,0,0,0,309,31,1,0,0,0,310,311,
        3,142,71,0,311,312,5,5,0,0,312,313,3,34,17,0,313,33,1,0,0,0,314,
        315,5,25,0,0,315,317,3,140,70,0,316,318,3,140,70,0,317,316,1,0,0,
        0,317,318,1,0,0,0,318,320,1,0,0,0,319,321,3,140,70,0,320,319,1,0,
        0,0,320,321,1,0,0,0,321,323,1,0,0,0,322,324,3,140,70,0,323,322,1,
        0,0,0,323,324,1,0,0,0,324,326,1,0,0,0,325,327,3,36,18,0,326,325,
        1,0,0,0,326,327,1,0,0,0,327,35,1,0,0,0,328,332,5,1,0,0,329,331,3,
        38,19,0,330,329,1,0,0,0,331,334,1,0,0,0,332,330,1,0,0,0,332,333,
        1,0,0,0,333,335,1,0,0,0,334,332,1,0,0,0,335,336,5,2,0,0,336,37,1,
        0,0,0,337,343,3,52,26,0,338,343,3,40,20,0,339,343,3,42,21,0,340,
        343,3,44,22,0,341,343,3,48,24,0,342,337,1,0,0,0,342,338,1,0,0,0,
        342,339,1,0,0,0,342,340,1,0,0,0,342,341,1,0,0,0,343,39,1,0,0,0,344,
        345,5,49,0,0,345,347,3,140,70,0,346,348,5,8,0,0,347,346,1,0,0,0,
        347,348,1,0,0,0,348,41,1,0,0,0,349,351,5,50,0,0,350,352,3,140,70,
        0,351,350,1,0,0,0,352,353,1,0,0,0,353,351,1,0,0,0,353,354,1,0,0,
        0,354,356,1,0,0,0,355,357,5,8,0,0,356,355,1,0,0,0,356,357,1,0,0,
        0,357,43,1,0,0,0,358,359,5,51,0,0,359,363,5,1,0,0,360,362,3,46,23,
        0,361,360,1,0,0,0,362,365,1,0,0,0,363,361,1,0,0,0,363,364,1,0,0,
        0,364,366,1,0,0,0,365,363,1,0,0,0,366,367,5,2,0,0,367,45,1,0,0,0,
        368,369,3,140,70,0,369,371,3,140,70,0,370,372,5,8,0,0,371,370,1,
        0,0,0,371,372,1,0,0,0,372,47,1,0,0,0,373,374,5,52,0,0,374,378,5,
        1,0,0,375,377,3,50,25,0,376,375,1,0,0,0,377,380,1,0,0,0,378,376,
        1,0,0,0,378,379,1,0,0,0,379,381,1,0,0,0,380,378,1,0,0,0,381,382,
        5,2,0,0,382,49,1,0,0,0,383,384,3,140,70,0,384,386,3,140,70,0,385,
        387,5,8,0,0,386,385,1,0,0,0,386,387,1,0,0,0,387,51,1,0,0,0,388,389,
        3,142,71,0,389,390,5,6,0,0,390,392,3,140,70,0,391,393,3,140,70,0,
        392,391,1,0,0,0,392,393,1,0,0,0,393,395,1,0,0,0,394,396,3,140,70,
        0,395,394,1,0,0,0,395,396,1,0,0,0,396,398,1,0,0,0,397,399,3,140,
        70,0,398,397,1,0,0,0,398,399,1,0,0,0,399,53,1,0,0,0,400,401,5,34,
        0,0,401,402,3,140,70,0,402,406,5,1,0,0,403,405,3,56,28,0,404,403,
        1,0,0,0,405,408,1,0,0,0,406,404,1,0,0,0,406,407,1,0,0,0,407,409,
        1,0,0,0,408,406,1,0,0,0,409,410,5,2,0,0,410,55,1,0,0,0,411,418,3,
        60,30,0,412,418,3,62,31,0,413,418,3,64,32,0,414,418,3,66,33,0,415,
        418,3,58,29,0,416,418,3,52,26,0,417,411,1,0,0,0,417,412,1,0,0,0,
        417,413,1,0,0,0,417,414,1,0,0,0,417,415,1,0,0,0,417,416,1,0,0,0,
        418,57,1,0,0,0,419,420,3,142,71,0,420,421,5,5,0,0,421,422,3,60,30,
        0,422,59,1,0,0,0,423,424,5,35,0,0,424,426,3,140,70,0,425,427,3,140,
        70,0,426,425,1,0,0,0,426,427,1,0,0,0,427,429,1,0,0,0,428,430,3,140,
        70,0,429,428,1,0,0,0,429,430,1,0,0,0,430,432,1,0,0,0,431,433,3,140,
        70,0,432,431,1,0,0,0,432,433,1,0,0,0,433,434,1,0,0,0,434,438,5,1,
        0,0,435,437,3,56,28,0,436,435,1,0,0,0,437,440,1,0,0,0,438,436,1,
        0,0,0,438,439,1,0,0,0,439,441,1,0,0,0,440,438,1,0,0,0,441,442,5,
        2,0,0,442,61,1,0,0,0,443,444,5,36,0,0,444,446,3,140,70,0,445,447,
        3,140,70,0,446,445,1,0,0,0,446,447,1,0,0,0,447,449,1,0,0,0,448,450,
        3,140,70,0,449,448,1,0,0,0,449,450,1,0,0,0,450,452,1,0,0,0,451,453,
        3,140,70,0,452,451,1,0,0,0,452,453,1,0,0,0,453,455,1,0,0,0,454,456,
        3,36,18,0,455,454,1,0,0,0,455,456,1,0,0,0,456,63,1,0,0,0,457,458,
        5,37,0,0,458,460,3,142,71,0,459,461,3,140,70,0,460,459,1,0,0,0,460,
        461,1,0,0,0,461,463,1,0,0,0,462,464,3,140,70,0,463,462,1,0,0,0,463,
        464,1,0,0,0,464,466,1,0,0,0,465,467,3,36,18,0,466,465,1,0,0,0,466,
        467,1,0,0,0,467,65,1,0,0,0,468,469,5,38,0,0,469,471,3,142,71,0,470,
        472,3,140,70,0,471,470,1,0,0,0,471,472,1,0,0,0,472,474,1,0,0,0,473,
        475,3,140,70,0,474,473,1,0,0,0,474,475,1,0,0,0,475,477,1,0,0,0,476,
        478,3,36,18,0,477,476,1,0,0,0,477,478,1,0,0,0,478,67,1,0,0,0,479,
        480,5,21,0,0,480,484,5,1,0,0,481,483,3,70,35,0,482,481,1,0,0,0,483,
        486,1,0,0,0,484,482,1,0,0,0,484,485,1,0,0,0,485,487,1,0,0,0,486,
        484,1,0,0,0,487,488,5,2,0,0,488,69,1,0,0,0,489,505,3,72,36,0,490,
        505,3,74,37,0,491,505,3,76,38,0,492,505,3,78,39,0,493,505,3,80,40,
        0,494,505,3,82,41,0,495,505,3,84,42,0,496,505,3,86,43,0,497,505,
        3,90,45,0,498,505,3,126,63,0,499,505,3,110,55,0,500,505,3,112,56,
        0,501,505,3,114,57,0,502,505,3,118,59,0,503,505,3,122,61,0,504,489,
        1,0,0,0,504,490,1,0,0,0,504,491,1,0,0,0,504,492,1,0,0,0,504,493,
        1,0,0,0,504,494,1,0,0,0,504,495,1,0,0,0,504,496,1,0,0,0,504,497,
        1,0,0,0,504,498,1,0,0,0,504,499,1,0,0,0,504,500,1,0,0,0,504,501,
        1,0,0,0,504,502,1,0,0,0,504,503,1,0,0,0,505,71,1,0,0,0,506,508,5,
        27,0,0,507,509,3,140,70,0,508,507,1,0,0,0,508,509,1,0,0,0,509,511,
        1,0,0,0,510,512,3,140,70,0,511,510,1,0,0,0,511,512,1,0,0,0,512,513,
        1,0,0,0,513,514,3,92,46,0,514,73,1,0,0,0,515,516,5,28,0,0,516,518,
        3,142,71,0,517,519,3,140,70,0,518,517,1,0,0,0,518,519,1,0,0,0,519,
        521,1,0,0,0,520,522,3,140,70,0,521,520,1,0,0,0,521,522,1,0,0,0,522,
        523,1,0,0,0,523,524,3,92,46,0,524,75,1,0,0,0,525,526,5,24,0,0,526,
        528,3,142,71,0,527,529,3,140,70,0,528,527,1,0,0,0,528,529,1,0,0,
        0,529,531,1,0,0,0,530,532,3,140,70,0,531,530,1,0,0,0,531,532,1,0,
        0,0,532,533,1,0,0,0,533,534,3,92,46,0,534,77,1,0,0,0,535,536,5,25,
        0,0,536,538,3,142,71,0,537,539,3,140,70,0,538,537,1,0,0,0,538,539,
        1,0,0,0,539,541,1,0,0,0,540,542,3,140,70,0,541,540,1,0,0,0,541,542,
        1,0,0,0,542,543,1,0,0,0,543,544,3,92,46,0,544,79,1,0,0,0,545,547,
        5,29,0,0,546,548,3,142,71,0,547,546,1,0,0,0,547,548,1,0,0,0,548,
        550,1,0,0,0,549,551,3,140,70,0,550,549,1,0,0,0,550,551,1,0,0,0,551,
        553,1,0,0,0,552,554,3,140,70,0,553,552,1,0,0,0,553,554,1,0,0,0,554,
        555,1,0,0,0,555,556,3,92,46,0,556,81,1,0,0,0,557,559,5,30,0,0,558,
        560,3,142,71,0,559,558,1,0,0,0,559,560,1,0,0,0,560,562,1,0,0,0,561,
        563,3,140,70,0,562,561,1,0,0,0,562,563,1,0,0,0,563,565,1,0,0,0,564,
        566,3,140,70,0,565,564,1,0,0,0,565,566,1,0,0,0,566,568,1,0,0,0,567,
        569,3,140,70,0,568,567,1,0,0,0,568,569,1,0,0,0,569,570,1,0,0,0,570,
        571,3,92,46,0,571,83,1,0,0,0,572,573,5,31,0,0,573,574,3,140,70,0,
        574,575,3,142,71,0,575,577,3,140,70,0,576,578,3,140,70,0,577,576,
        1,0,0,0,577,578,1,0,0,0,578,580,1,0,0,0,579,581,3,140,70,0,580,579,
        1,0,0,0,580,581,1,0,0,0,581,583,1,0,0,0,582,584,3,92,46,0,583,582,
        1,0,0,0,583,584,1,0,0,0,584,85,1,0,0,0,585,586,5,32,0,0,586,588,
        3,142,71,0,587,589,3,140,70,0,588,587,1,0,0,0,588,589,1,0,0,0,589,
        590,1,0,0,0,590,594,5,1,0,0,591,593,3,88,44,0,592,591,1,0,0,0,593,
        596,1,0,0,0,594,592,1,0,0,0,594,595,1,0,0,0,595,597,1,0,0,0,596,
        594,1,0,0,0,597,598,5,2,0,0,598,87,1,0,0,0,599,600,7,0,0,0,600,602,
        3,140,70,0,601,603,5,8,0,0,602,601,1,0,0,0,602,603,1,0,0,0,603,610,
        1,0,0,0,604,605,5,32,0,0,605,607,3,140,70,0,606,608,5,8,0,0,607,
        606,1,0,0,0,607,608,1,0,0,0,608,610,1,0,0,0,609,599,1,0,0,0,609,
        604,1,0,0,0,610,89,1,0,0,0,611,613,5,33,0,0,612,614,3,140,70,0,613,
        612,1,0,0,0,613,614,1,0,0,0,614,616,1,0,0,0,615,617,3,140,70,0,616,
        615,1,0,0,0,616,617,1,0,0,0,617,618,1,0,0,0,618,619,3,92,46,0,619,
        91,1,0,0,0,620,624,5,1,0,0,621,623,3,94,47,0,622,621,1,0,0,0,623,
        626,1,0,0,0,624,622,1,0,0,0,624,625,1,0,0,0,625,627,1,0,0,0,626,
        624,1,0,0,0,627,628,5,2,0,0,628,93,1,0,0,0,629,636,3,96,48,0,630,
        636,3,98,49,0,631,636,3,102,51,0,632,636,3,104,52,0,633,636,3,106,
        53,0,634,636,3,108,54,0,635,629,1,0,0,0,635,630,1,0,0,0,635,631,
        1,0,0,0,635,632,1,0,0,0,635,633,1,0,0,0,635,634,1,0,0,0,636,95,1,
        0,0,0,637,638,5,43,0,0,638,642,3,100,50,0,639,641,3,100,50,0,640,
        639,1,0,0,0,641,644,1,0,0,0,642,640,1,0,0,0,642,643,1,0,0,0,643,
        97,1,0,0,0,644,642,1,0,0,0,645,646,5,44,0,0,646,650,3,100,50,0,647,
        649,3,100,50,0,648,647,1,0,0,0,649,652,1,0,0,0,650,648,1,0,0,0,650,
        651,1,0,0,0,651,99,1,0,0,0,652,650,1,0,0,0,653,656,3,142,71,0,654,
        656,3,140,70,0,655,653,1,0,0,0,655,654,1,0,0,0,656,101,1,0,0,0,657,
        659,5,45,0,0,658,660,3,142,71,0,659,658,1,0,0,0,659,660,1,0,0,0,
        660,662,1,0,0,0,661,663,3,142,71,0,662,661,1,0,0,0,662,663,1,0,0,
        0,663,665,1,0,0,0,664,666,3,142,71,0,665,664,1,0,0,0,665,666,1,0,
        0,0,666,103,1,0,0,0,667,668,5,46,0,0,668,669,3,140,70,0,669,105,
        1,0,0,0,670,671,5,47,0,0,671,672,3,140,70,0,672,107,1,0,0,0,673,
        674,5,48,0,0,674,678,5,1,0,0,675,677,3,142,71,0,676,675,1,0,0,0,
        677,680,1,0,0,0,678,676,1,0,0,0,678,679,1,0,0,0,679,681,1,0,0,0,
        680,678,1,0,0,0,681,682,5,2,0,0,682,109,1,0,0,0,683,684,5,72,0,0,
        684,686,3,140,70,0,685,687,5,8,0,0,686,685,1,0,0,0,686,687,1,0,0,
        0,687,111,1,0,0,0,688,690,5,73,0,0,689,691,3,140,70,0,690,689,1,
        0,0,0,691,692,1,0,0,0,692,690,1,0,0,0,692,693,1,0,0,0,693,695,1,
        0,0,0,694,696,5,8,0,0,695,694,1,0,0,0,695,696,1,0,0,0,696,113,1,
        0,0,0,697,698,5,74,0,0,698,702,5,1,0,0,699,701,3,116,58,0,700,699,
        1,0,0,0,701,704,1,0,0,0,702,700,1,0,0,0,702,703,1,0,0,0,703,705,
        1,0,0,0,704,702,1,0,0,0,705,706,5,2,0,0,706,115,1,0,0,0,707,708,
        5,75,0,0,708,710,3,140,70,0,709,711,5,8,0,0,710,709,1,0,0,0,710,
        711,1,0,0,0,711,718,1,0,0,0,712,713,5,76,0,0,713,715,3,140,70,0,
        714,716,5,8,0,0,715,714,1,0,0,0,715,716,1,0,0,0,716,718,1,0,0,0,
        717,707,1,0,0,0,717,712,1,0,0,0,718,117,1,0,0,0,719,720,5,77,0,0,
        720,724,5,1,0,0,721,723,3,120,60,0,722,721,1,0,0,0,723,726,1,0,0,
        0,724,722,1,0,0,0,724,725,1,0,0,0,725,727,1,0,0,0,726,724,1,0,0,
        0,727,728,5,2,0,0,728,119,1,0,0,0,729,730,3,142,71,0,730,732,3,140,
        70,0,731,733,5,8,0,0,732,731,1,0,0,0,732,733,1,0,0,0,733,121,1,0,
        0,0,734,735,5,78,0,0,735,739,5,1,0,0,736,738,3,124,62,0,737,736,
        1,0,0,0,738,741,1,0,0,0,739,737,1,0,0,0,739,740,1,0,0,0,740,742,
        1,0,0,0,741,739,1,0,0,0,742,743,5,2,0,0,743,123,1,0,0,0,744,745,
        7,1,0,0,745,747,3,140,70,0,746,748,5,8,0,0,747,746,1,0,0,0,747,748,
        1,0,0,0,748,125,1,0,0,0,749,750,5,40,0,0,750,754,5,1,0,0,751,753,
        3,128,64,0,752,751,1,0,0,0,753,756,1,0,0,0,754,752,1,0,0,0,754,755,
        1,0,0,0,755,757,1,0,0,0,756,754,1,0,0,0,757,758,5,2,0,0,758,127,
        1,0,0,0,759,762,3,130,65,0,760,762,3,134,67,0,761,759,1,0,0,0,761,
        760,1,0,0,0,762,129,1,0,0,0,763,764,5,41,0,0,764,765,3,140,70,0,
        765,769,5,1,0,0,766,768,3,132,66,0,767,766,1,0,0,0,768,771,1,0,0,
        0,769,767,1,0,0,0,769,770,1,0,0,0,770,772,1,0,0,0,771,769,1,0,0,
        0,772,773,5,2,0,0,773,131,1,0,0,0,774,775,5,53,0,0,775,804,3,140,
        70,0,776,777,5,54,0,0,777,804,3,140,70,0,778,779,5,55,0,0,779,804,
        3,140,70,0,780,781,5,56,0,0,781,804,3,140,70,0,782,783,5,57,0,0,
        783,804,3,140,70,0,784,785,5,58,0,0,785,804,3,140,70,0,786,787,5,
        59,0,0,787,804,3,140,70,0,788,789,5,60,0,0,789,804,3,140,70,0,790,
        791,5,64,0,0,791,804,3,140,70,0,792,793,5,65,0,0,793,804,3,140,70,
        0,794,795,5,66,0,0,795,804,3,140,70,0,796,797,5,67,0,0,797,804,3,
        140,70,0,798,799,5,68,0,0,799,804,3,140,70,0,800,801,5,69,0,0,801,
        804,3,140,70,0,802,804,3,138,69,0,803,774,1,0,0,0,803,776,1,0,0,
        0,803,778,1,0,0,0,803,780,1,0,0,0,803,782,1,0,0,0,803,784,1,0,0,
        0,803,786,1,0,0,0,803,788,1,0,0,0,803,790,1,0,0,0,803,792,1,0,0,
        0,803,794,1,0,0,0,803,796,1,0,0,0,803,798,1,0,0,0,803,800,1,0,0,
        0,803,802,1,0,0,0,804,806,1,0,0,0,805,807,5,8,0,0,806,805,1,0,0,
        0,806,807,1,0,0,0,807,133,1,0,0,0,808,809,5,42,0,0,809,810,3,140,
        70,0,810,814,5,1,0,0,811,813,3,136,68,0,812,811,1,0,0,0,813,816,
        1,0,0,0,814,812,1,0,0,0,814,815,1,0,0,0,815,817,1,0,0,0,816,814,
        1,0,0,0,817,818,5,2,0,0,818,135,1,0,0,0,819,820,5,54,0,0,820,841,
        3,140,70,0,821,822,5,55,0,0,822,841,3,140,70,0,823,824,5,61,0,0,
        824,841,3,140,70,0,825,826,5,62,0,0,826,841,3,140,70,0,827,828,5,
        63,0,0,828,841,3,140,70,0,829,830,5,58,0,0,830,841,3,140,70,0,831,
        832,5,70,0,0,832,841,3,140,70,0,833,834,5,71,0,0,834,841,3,140,70,
        0,835,836,5,60,0,0,836,841,3,140,70,0,837,838,5,65,0,0,838,841,3,
        140,70,0,839,841,3,138,69,0,840,819,1,0,0,0,840,821,1,0,0,0,840,
        823,1,0,0,0,840,825,1,0,0,0,840,827,1,0,0,0,840,829,1,0,0,0,840,
        831,1,0,0,0,840,833,1,0,0,0,840,835,1,0,0,0,840,837,1,0,0,0,840,
        839,1,0,0,0,841,843,1,0,0,0,842,844,5,8,0,0,843,842,1,0,0,0,843,
        844,1,0,0,0,844,137,1,0,0,0,845,850,3,142,71,0,846,849,3,142,71,
        0,847,849,3,140,70,0,848,846,1,0,0,0,848,847,1,0,0,0,849,852,1,0,
        0,0,850,848,1,0,0,0,850,851,1,0,0,0,851,139,1,0,0,0,852,850,1,0,
        0,0,853,854,7,2,0,0,854,141,1,0,0,0,855,856,7,3,0,0,856,143,1,0,
        0,0,857,858,5,3,0,0,858,865,3,140,70,0,859,861,5,9,0,0,860,859,1,
        0,0,0,860,861,1,0,0,0,861,862,1,0,0,0,862,864,3,140,70,0,863,860,
        1,0,0,0,864,867,1,0,0,0,865,863,1,0,0,0,865,866,1,0,0,0,866,868,
        1,0,0,0,867,865,1,0,0,0,868,869,5,4,0,0,869,145,1,0,0,0,116,149,
        152,155,161,170,192,199,210,218,226,236,241,244,247,252,255,258,
        264,274,283,286,289,292,298,308,317,320,323,326,332,342,347,353,
        356,363,371,378,386,392,395,398,406,417,426,429,432,438,446,449,
        452,455,460,463,466,471,474,477,484,504,508,511,518,521,528,531,
        538,541,547,550,553,559,562,565,568,577,580,583,588,594,602,607,
        609,613,616,624,635,642,650,655,659,662,665,678,686,692,695,702,
        710,715,717,724,732,739,747,754,761,769,803,806,814,840,843,848,
        850,860,865
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!StructurizrDslParser.__ATN) {
            StructurizrDslParser.__ATN = new antlr.ATNDeserializer().deserialize(StructurizrDslParser._serializedATN);
        }

        return StructurizrDslParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(StructurizrDslParser.literalNames, StructurizrDslParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return StructurizrDslParser.vocabulary;
    }

    private static readonly decisionsToDFA = StructurizrDslParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class WorkspaceContext extends antlr.ParserRuleContext {
    public _extendsUrl?: StringContext;
    public _name?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WORKSPACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.WORKSPACE, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.EOF, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.EXTENDS, 0);
    }
    public workspaceBody(): WorkspaceBodyContext[];
    public workspaceBody(i: number): WorkspaceBodyContext | null;
    public workspaceBody(i?: number): WorkspaceBodyContext[] | WorkspaceBodyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WorkspaceBodyContext);
        }

        return this.getRuleContext(i, WorkspaceBodyContext);
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_workspace;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitWorkspace) {
            return visitor.visitWorkspace(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WorkspaceBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public model(): ModelContext | null {
        return this.getRuleContext(0, ModelContext);
    }
    public views(): ViewsContext | null {
        return this.getRuleContext(0, ViewsContext);
    }
    public directive(): DirectiveContext | null {
        return this.getRuleContext(0, DirectiveContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_workspaceBody;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitWorkspaceBody) {
            return visitor.visitWorkspaceBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_directive;
    }
    public override copyFrom(ctx: DirectiveContext): void {
        super.copyFrom(ctx);
    }
}
export class IncludeDirectiveContext extends DirectiveContext {
    public _path?: StringContext;
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG_INCLUDE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BANG_INCLUDE, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitIncludeDirective) {
            return visitor.visitIncludeDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdentifiersDirectiveContext extends DirectiveContext {
    public _scope?: IdentifierContext;
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG_IDENTIFIERS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BANG_IDENTIFIERS, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitIdentifiersDirective) {
            return visitor.visitIdentifiersDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ConstDirectiveContext extends DirectiveContext {
    public _name?: IdentifierContext;
    public _value?: StringContext;
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG_CONST(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BANG_CONST, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitConstDirective) {
            return visitor.visitConstDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class VarDirectiveContext extends DirectiveContext {
    public _name?: IdentifierContext;
    public _value?: StringContext;
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG_VAR(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BANG_VAR, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitVarDirective) {
            return visitor.visitVarDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ImpliedRelationshipsDirectiveContext extends DirectiveContext {
    public _enabled?: StringContext;
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG_IMPLIED_RELATIONSHIPS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BANG_IMPLIED_RELATIONSHIPS, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitImpliedRelationshipsDirective) {
            return visitor.visitImpliedRelationshipsDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DocsDirectiveContext extends DirectiveContext {
    public _path?: StringContext;
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG_DOCS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BANG_DOCS, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitDocsDirective) {
            return visitor.visitDocsDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AdrsDirectiveContext extends DirectiveContext {
    public _path?: StringContext;
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG_ADRS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BANG_ADRS, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitAdrsDirective) {
            return visitor.visitAdrsDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class RefDirectiveContext extends DirectiveContext {
    public _ref?: StringContext;
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG_REF(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BANG_REF, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitRefDirective) {
            return visitor.visitRefDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ModelContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MODEL(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.MODEL, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public modelBody(): ModelBodyContext[];
    public modelBody(i: number): ModelBodyContext | null;
    public modelBody(i?: number): ModelBodyContext[] | ModelBodyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModelBodyContext);
        }

        return this.getRuleContext(i, ModelBodyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_model;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitModel) {
            return visitor.visitModel(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ModelBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public person(): PersonContext | null {
        return this.getRuleContext(0, PersonContext);
    }
    public softwareSystem(): SoftwareSystemContext | null {
        return this.getRuleContext(0, SoftwareSystemContext);
    }
    public relationship(): RelationshipContext | null {
        return this.getRuleContext(0, RelationshipContext);
    }
    public elementAssignment(): ElementAssignmentContext | null {
        return this.getRuleContext(0, ElementAssignmentContext);
    }
    public group(): GroupContext | null {
        return this.getRuleContext(0, GroupContext);
    }
    public deploymentEnvironment(): DeploymentEnvironmentContext | null {
        return this.getRuleContext(0, DeploymentEnvironmentContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_modelBody;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitModelBody) {
            return visitor.visitModelBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElementAssignmentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public EQUALS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.EQUALS, 0)!;
    }
    public person(): PersonContext | null {
        return this.getRuleContext(0, PersonContext);
    }
    public softwareSystem(): SoftwareSystemContext | null {
        return this.getRuleContext(0, SoftwareSystemContext);
    }
    public container(): ContainerContext | null {
        return this.getRuleContext(0, ContainerContext);
    }
    public component(): ComponentContext | null {
        return this.getRuleContext(0, ComponentContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_elementAssignment;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitElementAssignment) {
            return visitor.visitElementAssignment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class GroupContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public GROUP(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.GROUP, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public groupModelBody(): GroupModelBodyContext[];
    public groupModelBody(i: number): GroupModelBodyContext | null;
    public groupModelBody(i?: number): GroupModelBodyContext[] | GroupModelBodyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(GroupModelBodyContext);
        }

        return this.getRuleContext(i, GroupModelBodyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_group;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitGroup) {
            return visitor.visitGroup(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class GroupModelBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public person(): PersonContext | null {
        return this.getRuleContext(0, PersonContext);
    }
    public softwareSystem(): SoftwareSystemContext | null {
        return this.getRuleContext(0, SoftwareSystemContext);
    }
    public relationship(): RelationshipContext | null {
        return this.getRuleContext(0, RelationshipContext);
    }
    public elementAssignment(): ElementAssignmentContext | null {
        return this.getRuleContext(0, ElementAssignmentContext);
    }
    public group(): GroupContext | null {
        return this.getRuleContext(0, GroupContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_groupModelBody;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitGroupModelBody) {
            return visitor.visitGroupModelBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PersonContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public _description?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PERSON(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.PERSON, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public bodyBlock(): BodyBlockContext | null {
        return this.getRuleContext(0, BodyBlockContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_person;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitPerson) {
            return visitor.visitPerson(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SoftwareSystemContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public _description?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SOFTWARE_SYSTEM(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.SOFTWARE_SYSTEM, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public softwareSystemBody(): SoftwareSystemBodyContext | null {
        return this.getRuleContext(0, SoftwareSystemBodyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_softwareSystem;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitSoftwareSystem) {
            return visitor.visitSoftwareSystem(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SoftwareSystemBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public softwareSystemStatement(): SoftwareSystemStatementContext[];
    public softwareSystemStatement(i: number): SoftwareSystemStatementContext | null;
    public softwareSystemStatement(i?: number): SoftwareSystemStatementContext[] | SoftwareSystemStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SoftwareSystemStatementContext);
        }

        return this.getRuleContext(i, SoftwareSystemStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_softwareSystemBody;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitSoftwareSystemBody) {
            return visitor.visitSoftwareSystemBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SoftwareSystemStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public container(): ContainerContext | null {
        return this.getRuleContext(0, ContainerContext);
    }
    public relationship(): RelationshipContext | null {
        return this.getRuleContext(0, RelationshipContext);
    }
    public containerAssignment(): ContainerAssignmentContext | null {
        return this.getRuleContext(0, ContainerAssignmentContext);
    }
    public group(): GroupContext | null {
        return this.getRuleContext(0, GroupContext);
    }
    public bodyStatement(): BodyStatementContext | null {
        return this.getRuleContext(0, BodyStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_softwareSystemStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitSoftwareSystemStatement) {
            return visitor.visitSoftwareSystemStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContainerAssignmentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public EQUALS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.EQUALS, 0)!;
    }
    public container(): ContainerContext {
        return this.getRuleContext(0, ContainerContext)!;
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_containerAssignment;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitContainerAssignment) {
            return visitor.visitContainerAssignment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContainerContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public _description?: StringContext;
    public _technology?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONTAINER(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.CONTAINER, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public containerBody(): ContainerBodyContext | null {
        return this.getRuleContext(0, ContainerBodyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_container;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitContainer) {
            return visitor.visitContainer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContainerBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public containerStatement(): ContainerStatementContext[];
    public containerStatement(i: number): ContainerStatementContext | null;
    public containerStatement(i?: number): ContainerStatementContext[] | ContainerStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ContainerStatementContext);
        }

        return this.getRuleContext(i, ContainerStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_containerBody;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitContainerBody) {
            return visitor.visitContainerBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContainerStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public component(): ComponentContext | null {
        return this.getRuleContext(0, ComponentContext);
    }
    public relationship(): RelationshipContext | null {
        return this.getRuleContext(0, RelationshipContext);
    }
    public componentAssignment(): ComponentAssignmentContext | null {
        return this.getRuleContext(0, ComponentAssignmentContext);
    }
    public group(): GroupContext | null {
        return this.getRuleContext(0, GroupContext);
    }
    public bodyStatement(): BodyStatementContext | null {
        return this.getRuleContext(0, BodyStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_containerStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitContainerStatement) {
            return visitor.visitContainerStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ComponentAssignmentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public EQUALS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.EQUALS, 0)!;
    }
    public component(): ComponentContext {
        return this.getRuleContext(0, ComponentContext)!;
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_componentAssignment;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitComponentAssignment) {
            return visitor.visitComponentAssignment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ComponentContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public _description?: StringContext;
    public _technology?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COMPONENT(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.COMPONENT, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public bodyBlock(): BodyBlockContext | null {
        return this.getRuleContext(0, BodyBlockContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_component;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitComponent) {
            return visitor.visitComponent(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BodyBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public bodyStatement(): BodyStatementContext[];
    public bodyStatement(i: number): BodyStatementContext | null;
    public bodyStatement(i?: number): BodyStatementContext[] | BodyStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BodyStatementContext);
        }

        return this.getRuleContext(i, BodyStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_bodyBlock;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitBodyBlock) {
            return visitor.visitBodyBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BodyStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public relationship(): RelationshipContext | null {
        return this.getRuleContext(0, RelationshipContext);
    }
    public urlStatement(): UrlStatementContext | null {
        return this.getRuleContext(0, UrlStatementContext);
    }
    public tagsStatement(): TagsStatementContext | null {
        return this.getRuleContext(0, TagsStatementContext);
    }
    public propertiesStatement(): PropertiesStatementContext | null {
        return this.getRuleContext(0, PropertiesStatementContext);
    }
    public perspectivesStatement(): PerspectivesStatementContext | null {
        return this.getRuleContext(0, PerspectivesStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_bodyStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitBodyStatement) {
            return visitor.visitBodyStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UrlStatementContext extends antlr.ParserRuleContext {
    public _value?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public URL(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.URL, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_urlStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitUrlStatement) {
            return visitor.visitUrlStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TagsStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TAGS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.TAGS, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_tagsStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitTagsStatement) {
            return visitor.visitTagsStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PropertiesStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PROPERTIES(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.PROPERTIES, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public propertyEntry(): PropertyEntryContext[];
    public propertyEntry(i: number): PropertyEntryContext | null;
    public propertyEntry(i?: number): PropertyEntryContext[] | PropertyEntryContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PropertyEntryContext);
        }

        return this.getRuleContext(i, PropertyEntryContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_propertiesStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitPropertiesStatement) {
            return visitor.visitPropertiesStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PropertyEntryContext extends antlr.ParserRuleContext {
    public _key?: StringContext;
    public _value?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_propertyEntry;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitPropertyEntry) {
            return visitor.visitPropertyEntry(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PerspectivesStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PERSPECTIVES(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.PERSPECTIVES, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public perspectiveEntry(): PerspectiveEntryContext[];
    public perspectiveEntry(i: number): PerspectiveEntryContext | null;
    public perspectiveEntry(i?: number): PerspectiveEntryContext[] | PerspectiveEntryContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PerspectiveEntryContext);
        }

        return this.getRuleContext(i, PerspectiveEntryContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_perspectivesStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitPerspectivesStatement) {
            return visitor.visitPerspectivesStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PerspectiveEntryContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_perspectiveEntry;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitPerspectiveEntry) {
            return visitor.visitPerspectiveEntry(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RelationshipContext extends antlr.ParserRuleContext {
    public _source?: IdentifierContext;
    public _destination?: StringContext;
    public _description?: StringContext;
    public _technology?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.ARROW, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_relationship;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitRelationship) {
            return visitor.visitRelationship(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeploymentEnvironmentContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEPLOYMENT_ENVIRONMENT(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.DEPLOYMENT_ENVIRONMENT, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public deploymentNodeStatement(): DeploymentNodeStatementContext[];
    public deploymentNodeStatement(i: number): DeploymentNodeStatementContext | null;
    public deploymentNodeStatement(i?: number): DeploymentNodeStatementContext[] | DeploymentNodeStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DeploymentNodeStatementContext);
        }

        return this.getRuleContext(i, DeploymentNodeStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_deploymentEnvironment;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitDeploymentEnvironment) {
            return visitor.visitDeploymentEnvironment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeploymentNodeStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public deploymentNode(): DeploymentNodeContext | null {
        return this.getRuleContext(0, DeploymentNodeContext);
    }
    public infrastructureNode(): InfrastructureNodeContext | null {
        return this.getRuleContext(0, InfrastructureNodeContext);
    }
    public softwareSystemInstance(): SoftwareSystemInstanceContext | null {
        return this.getRuleContext(0, SoftwareSystemInstanceContext);
    }
    public containerInstance(): ContainerInstanceContext | null {
        return this.getRuleContext(0, ContainerInstanceContext);
    }
    public deploymentNodeAssignment(): DeploymentNodeAssignmentContext | null {
        return this.getRuleContext(0, DeploymentNodeAssignmentContext);
    }
    public relationship(): RelationshipContext | null {
        return this.getRuleContext(0, RelationshipContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_deploymentNodeStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitDeploymentNodeStatement) {
            return visitor.visitDeploymentNodeStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeploymentNodeAssignmentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public EQUALS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.EQUALS, 0)!;
    }
    public deploymentNode(): DeploymentNodeContext {
        return this.getRuleContext(0, DeploymentNodeContext)!;
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_deploymentNodeAssignment;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitDeploymentNodeAssignment) {
            return visitor.visitDeploymentNodeAssignment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeploymentNodeContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public _description?: StringContext;
    public _technology?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEPLOYMENT_NODE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.DEPLOYMENT_NODE, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public deploymentNodeStatement(): DeploymentNodeStatementContext[];
    public deploymentNodeStatement(i: number): DeploymentNodeStatementContext | null;
    public deploymentNodeStatement(i?: number): DeploymentNodeStatementContext[] | DeploymentNodeStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DeploymentNodeStatementContext);
        }

        return this.getRuleContext(i, DeploymentNodeStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_deploymentNode;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitDeploymentNode) {
            return visitor.visitDeploymentNode(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InfrastructureNodeContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public _description?: StringContext;
    public _technology?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INFRASTRUCTURE_NODE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.INFRASTRUCTURE_NODE, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public bodyBlock(): BodyBlockContext | null {
        return this.getRuleContext(0, BodyBlockContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_infrastructureNode;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitInfrastructureNode) {
            return visitor.visitInfrastructureNode(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SoftwareSystemInstanceContext extends antlr.ParserRuleContext {
    public _ref?: IdentifierContext;
    public _instanceId?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SOFTWARE_SYSTEM_INSTANCE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.SOFTWARE_SYSTEM_INSTANCE, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public bodyBlock(): BodyBlockContext | null {
        return this.getRuleContext(0, BodyBlockContext);
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_softwareSystemInstance;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitSoftwareSystemInstance) {
            return visitor.visitSoftwareSystemInstance(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContainerInstanceContext extends antlr.ParserRuleContext {
    public _ref?: IdentifierContext;
    public _instanceId?: StringContext;
    public _tags?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONTAINER_INSTANCE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.CONTAINER_INSTANCE, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public bodyBlock(): BodyBlockContext | null {
        return this.getRuleContext(0, BodyBlockContext);
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_containerInstance;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitContainerInstance) {
            return visitor.visitContainerInstance(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ViewsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VIEWS(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.VIEWS, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public viewsBody(): ViewsBodyContext[];
    public viewsBody(i: number): ViewsBodyContext | null;
    public viewsBody(i?: number): ViewsBodyContext[] | ViewsBodyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ViewsBodyContext);
        }

        return this.getRuleContext(i, ViewsBodyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_views;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitViews) {
            return visitor.visitViews(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ViewsBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public systemLandscapeView(): SystemLandscapeViewContext | null {
        return this.getRuleContext(0, SystemLandscapeViewContext);
    }
    public systemContextView(): SystemContextViewContext | null {
        return this.getRuleContext(0, SystemContextViewContext);
    }
    public containerView(): ContainerViewContext | null {
        return this.getRuleContext(0, ContainerViewContext);
    }
    public componentView(): ComponentViewContext | null {
        return this.getRuleContext(0, ComponentViewContext);
    }
    public dynamicView(): DynamicViewContext | null {
        return this.getRuleContext(0, DynamicViewContext);
    }
    public deploymentView(): DeploymentViewContext | null {
        return this.getRuleContext(0, DeploymentViewContext);
    }
    public filteredView(): FilteredViewContext | null {
        return this.getRuleContext(0, FilteredViewContext);
    }
    public imageView(): ImageViewContext | null {
        return this.getRuleContext(0, ImageViewContext);
    }
    public customView(): CustomViewContext | null {
        return this.getRuleContext(0, CustomViewContext);
    }
    public styles(): StylesContext | null {
        return this.getRuleContext(0, StylesContext);
    }
    public themeStatement(): ThemeStatementContext | null {
        return this.getRuleContext(0, ThemeStatementContext);
    }
    public themesStatement(): ThemesStatementContext | null {
        return this.getRuleContext(0, ThemesStatementContext);
    }
    public brandingBlock(): BrandingBlockContext | null {
        return this.getRuleContext(0, BrandingBlockContext);
    }
    public terminologyBlock(): TerminologyBlockContext | null {
        return this.getRuleContext(0, TerminologyBlockContext);
    }
    public configurationBlock(): ConfigurationBlockContext | null {
        return this.getRuleContext(0, ConfigurationBlockContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_viewsBody;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitViewsBody) {
            return visitor.visitViewsBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SystemLandscapeViewContext extends antlr.ParserRuleContext {
    public _key?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SYSTEM_LANDSCAPE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.SYSTEM_LANDSCAPE, 0)!;
    }
    public viewBody(): ViewBodyContext {
        return this.getRuleContext(0, ViewBodyContext)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_systemLandscapeView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitSystemLandscapeView) {
            return visitor.visitSystemLandscapeView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SystemContextViewContext extends antlr.ParserRuleContext {
    public _systemIdentifier?: IdentifierContext;
    public _key?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SYSTEM_CONTEXT(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.SYSTEM_CONTEXT, 0)!;
    }
    public viewBody(): ViewBodyContext {
        return this.getRuleContext(0, ViewBodyContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_systemContextView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitSystemContextView) {
            return visitor.visitSystemContextView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContainerViewContext extends antlr.ParserRuleContext {
    public _systemIdentifier?: IdentifierContext;
    public _key?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONTAINER(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.CONTAINER, 0)!;
    }
    public viewBody(): ViewBodyContext {
        return this.getRuleContext(0, ViewBodyContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_containerView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitContainerView) {
            return visitor.visitContainerView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ComponentViewContext extends antlr.ParserRuleContext {
    public _containerIdentifier?: IdentifierContext;
    public _key?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COMPONENT(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.COMPONENT, 0)!;
    }
    public viewBody(): ViewBodyContext {
        return this.getRuleContext(0, ViewBodyContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_componentView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitComponentView) {
            return visitor.visitComponentView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DynamicViewContext extends antlr.ParserRuleContext {
    public _elementRef?: IdentifierContext;
    public _key?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DYNAMIC(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.DYNAMIC, 0)!;
    }
    public viewBody(): ViewBodyContext {
        return this.getRuleContext(0, ViewBodyContext)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_dynamicView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitDynamicView) {
            return visitor.visitDynamicView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeploymentViewContext extends antlr.ParserRuleContext {
    public _elementRef?: IdentifierContext;
    public _environment?: StringContext;
    public _key?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEPLOYMENT(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.DEPLOYMENT, 0)!;
    }
    public viewBody(): ViewBodyContext {
        return this.getRuleContext(0, ViewBodyContext)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_deploymentView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitDeploymentView) {
            return visitor.visitDeploymentView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FilteredViewContext extends antlr.ParserRuleContext {
    public _baseKey?: StringContext;
    public _filterMode?: IdentifierContext;
    public _filterTags?: StringContext;
    public _key?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FILTERED(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.FILTERED, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public viewBody(): ViewBodyContext | null {
        return this.getRuleContext(0, ViewBodyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_filteredView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitFilteredView) {
            return visitor.visitFilteredView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ImageViewContext extends antlr.ParserRuleContext {
    public _elementRef?: IdentifierContext;
    public _key?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IMAGE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.IMAGE, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public imageViewStatement(): ImageViewStatementContext[];
    public imageViewStatement(i: number): ImageViewStatementContext | null;
    public imageViewStatement(i?: number): ImageViewStatementContext[] | ImageViewStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ImageViewStatementContext);
        }

        return this.getRuleContext(i, ImageViewStatementContext);
    }
    public string(): StringContext | null {
        return this.getRuleContext(0, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_imageView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitImageView) {
            return visitor.visitImageView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ImageViewStatementContext extends antlr.ParserRuleContext {
    public _value?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TITLE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.TITLE, 0);
    }
    public DESCRIPTION(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.DESCRIPTION, 0);
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public IMAGE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.IMAGE, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_imageViewStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitImageViewStatement) {
            return visitor.visitImageViewStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CustomViewContext extends antlr.ParserRuleContext {
    public _key?: StringContext;
    public _description?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CUSTOM(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.CUSTOM, 0)!;
    }
    public viewBody(): ViewBodyContext {
        return this.getRuleContext(0, ViewBodyContext)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_customView;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitCustomView) {
            return visitor.visitCustomView(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ViewBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public viewStatement(): ViewStatementContext[];
    public viewStatement(i: number): ViewStatementContext | null;
    public viewStatement(i?: number): ViewStatementContext[] | ViewStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ViewStatementContext);
        }

        return this.getRuleContext(i, ViewStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_viewBody;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitViewBody) {
            return visitor.visitViewBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ViewStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public includeStatement(): IncludeStatementContext | null {
        return this.getRuleContext(0, IncludeStatementContext);
    }
    public excludeStatement(): ExcludeStatementContext | null {
        return this.getRuleContext(0, ExcludeStatementContext);
    }
    public autoLayoutStatement(): AutoLayoutStatementContext | null {
        return this.getRuleContext(0, AutoLayoutStatementContext);
    }
    public titleStatement(): TitleStatementContext | null {
        return this.getRuleContext(0, TitleStatementContext);
    }
    public descriptionStatement(): DescriptionStatementContext | null {
        return this.getRuleContext(0, DescriptionStatementContext);
    }
    public animationStatement(): AnimationStatementContext | null {
        return this.getRuleContext(0, AnimationStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_viewStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitViewStatement) {
            return visitor.visitViewStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IncludeStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INCLUDE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.INCLUDE, 0)!;
    }
    public includeTarget(): IncludeTargetContext[];
    public includeTarget(i: number): IncludeTargetContext | null;
    public includeTarget(i?: number): IncludeTargetContext[] | IncludeTargetContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IncludeTargetContext);
        }

        return this.getRuleContext(i, IncludeTargetContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_includeStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitIncludeStatement) {
            return visitor.visitIncludeStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExcludeStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXCLUDE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.EXCLUDE, 0)!;
    }
    public includeTarget(): IncludeTargetContext[];
    public includeTarget(i: number): IncludeTargetContext | null;
    public includeTarget(i?: number): IncludeTargetContext[] | IncludeTargetContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IncludeTargetContext);
        }

        return this.getRuleContext(i, IncludeTargetContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_excludeStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitExcludeStatement) {
            return visitor.visitExcludeStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IncludeTargetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public string(): StringContext | null {
        return this.getRuleContext(0, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_includeTarget;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitIncludeTarget) {
            return visitor.visitIncludeTarget(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AutoLayoutStatementContext extends antlr.ParserRuleContext {
    public _direction?: IdentifierContext;
    public _rankSep?: IdentifierContext;
    public _nodeSep?: IdentifierContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AUTO_LAYOUT(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.AUTO_LAYOUT, 0)!;
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_autoLayoutStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitAutoLayoutStatement) {
            return visitor.visitAutoLayoutStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TitleStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TITLE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.TITLE, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_titleStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitTitleStatement) {
            return visitor.visitTitleStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DescriptionStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DESCRIPTION(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.DESCRIPTION, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_descriptionStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitDescriptionStatement) {
            return visitor.visitDescriptionStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AnimationStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ANIMATION(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.ANIMATION, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_animationStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitAnimationStatement) {
            return visitor.visitAnimationStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ThemeStatementContext extends antlr.ParserRuleContext {
    public _url?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THEME(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.THEME, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_themeStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitThemeStatement) {
            return visitor.visitThemeStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ThemesStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THEMES(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.THEMES, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_themesStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitThemesStatement) {
            return visitor.visitThemesStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BrandingBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BRANDING(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.BRANDING, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public brandingStatement(): BrandingStatementContext[];
    public brandingStatement(i: number): BrandingStatementContext | null;
    public brandingStatement(i?: number): BrandingStatementContext[] | BrandingStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BrandingStatementContext);
        }

        return this.getRuleContext(i, BrandingStatementContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_brandingBlock;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitBrandingBlock) {
            return visitor.visitBrandingBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BrandingStatementContext extends antlr.ParserRuleContext {
    public _value?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LOGO(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.LOGO, 0);
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public FONT(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.FONT, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_brandingStatement;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitBrandingStatement) {
            return visitor.visitBrandingStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TerminologyBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TERMINOLOGY(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.TERMINOLOGY, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public terminologyEntry(): TerminologyEntryContext[];
    public terminologyEntry(i: number): TerminologyEntryContext | null;
    public terminologyEntry(i?: number): TerminologyEntryContext[] | TerminologyEntryContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TerminologyEntryContext);
        }

        return this.getRuleContext(i, TerminologyEntryContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_terminologyBlock;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitTerminologyBlock) {
            return visitor.visitTerminologyBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TerminologyEntryContext extends antlr.ParserRuleContext {
    public _key?: IdentifierContext;
    public _value?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_terminologyEntry;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitTerminologyEntry) {
            return visitor.visitTerminologyEntry(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConfigurationBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONFIGURATION(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.CONFIGURATION, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public configurationEntry(): ConfigurationEntryContext[];
    public configurationEntry(i: number): ConfigurationEntryContext | null;
    public configurationEntry(i?: number): ConfigurationEntryContext[] | ConfigurationEntryContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConfigurationEntryContext);
        }

        return this.getRuleContext(i, ConfigurationEntryContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_configurationBlock;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitConfigurationBlock) {
            return visitor.visitConfigurationBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConfigurationEntryContext extends antlr.ParserRuleContext {
    public _value?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SCOPE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SCOPE, 0);
    }
    public VISIBILITY(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.VISIBILITY, 0);
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_configurationEntry;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitConfigurationEntry) {
            return visitor.visitConfigurationEntry(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StylesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STYLES(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.STYLES, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public stylesBody(): StylesBodyContext[];
    public stylesBody(i: number): StylesBodyContext | null;
    public stylesBody(i?: number): StylesBodyContext[] | StylesBodyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StylesBodyContext);
        }

        return this.getRuleContext(i, StylesBodyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_styles;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitStyles) {
            return visitor.visitStyles(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StylesBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public elementStyle(): ElementStyleContext | null {
        return this.getRuleContext(0, ElementStyleContext);
    }
    public relationshipStyle(): RelationshipStyleContext | null {
        return this.getRuleContext(0, RelationshipStyleContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_stylesBody;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitStylesBody) {
            return visitor.visitStylesBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElementStyleContext extends antlr.ParserRuleContext {
    public _tag?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELEMENT(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.ELEMENT, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public elementStyleProperty(): ElementStylePropertyContext[];
    public elementStyleProperty(i: number): ElementStylePropertyContext | null;
    public elementStyleProperty(i?: number): ElementStylePropertyContext[] | ElementStylePropertyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ElementStylePropertyContext);
        }

        return this.getRuleContext(i, ElementStylePropertyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_elementStyle;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitElementStyle) {
            return visitor.visitElementStyle(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElementStylePropertyContext extends antlr.ParserRuleContext {
    public _color?: StringContext;
    public _shape?: StringContext;
    public _size?: StringContext;
    public _border?: StringContext;
    public _opacity?: StringContext;
    public _icon?: StringContext;
    public _width?: StringContext;
    public _height?: StringContext;
    public _strokeWidth?: StringContext;
    public _iconPosition?: StringContext;
    public _metadata?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BACKGROUND(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.BACKGROUND, 0);
    }
    public COLOR(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.COLOR, 0);
    }
    public COLOUR(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.COLOUR, 0);
    }
    public STROKE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.STROKE, 0);
    }
    public SHAPE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SHAPE, 0);
    }
    public FONT_SIZE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.FONT_SIZE, 0);
    }
    public BORDER(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.BORDER, 0);
    }
    public OPACITY(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.OPACITY, 0);
    }
    public ICON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.ICON, 0);
    }
    public WIDTH(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.WIDTH, 0);
    }
    public HEIGHT(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.HEIGHT, 0);
    }
    public STROKE_WIDTH(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.STROKE_WIDTH, 0);
    }
    public ICON_POSITION(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.ICON_POSITION, 0);
    }
    public METADATA(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.METADATA, 0);
    }
    public unknownProperty(): UnknownPropertyContext | null {
        return this.getRuleContext(0, UnknownPropertyContext);
    }
    public string(): StringContext | null {
        return this.getRuleContext(0, StringContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_elementStyleProperty;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitElementStyleProperty) {
            return visitor.visitElementStyleProperty(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RelationshipStyleContext extends antlr.ParserRuleContext {
    public _tag?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RELATIONSHIP(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RELATIONSHIP, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACE, 0)!;
    }
    public string(): StringContext {
        return this.getRuleContext(0, StringContext)!;
    }
    public relationshipStyleProperty(): RelationshipStylePropertyContext[];
    public relationshipStyleProperty(i: number): RelationshipStylePropertyContext | null;
    public relationshipStyleProperty(i?: number): RelationshipStylePropertyContext[] | RelationshipStylePropertyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RelationshipStylePropertyContext);
        }

        return this.getRuleContext(i, RelationshipStylePropertyContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_relationshipStyle;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitRelationshipStyle) {
            return visitor.visitRelationshipStyle(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RelationshipStylePropertyContext extends antlr.ParserRuleContext {
    public _color?: StringContext;
    public _thickness?: StringContext;
    public _dashed?: StringContext;
    public _routing?: StringContext;
    public _size?: StringContext;
    public _style?: StringContext;
    public _position?: StringContext;
    public _opacity?: StringContext;
    public _width?: StringContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COLOR(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.COLOR, 0);
    }
    public COLOUR(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.COLOUR, 0);
    }
    public THICKNESS(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.THICKNESS, 0);
    }
    public DASHED(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.DASHED, 0);
    }
    public ROUTING(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.ROUTING, 0);
    }
    public FONT_SIZE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.FONT_SIZE, 0);
    }
    public STYLE_PROP(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.STYLE_PROP, 0);
    }
    public POSITION(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.POSITION, 0);
    }
    public OPACITY(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.OPACITY, 0);
    }
    public WIDTH(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.WIDTH, 0);
    }
    public unknownProperty(): UnknownPropertyContext | null {
        return this.getRuleContext(0, UnknownPropertyContext);
    }
    public string(): StringContext | null {
        return this.getRuleContext(0, StringContext);
    }
    public SEMICOLON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SEMICOLON, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_relationshipStyleProperty;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitRelationshipStyleProperty) {
            return visitor.visitRelationshipStyleProperty(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UnknownPropertyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_unknownProperty;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitUnknownProperty) {
            return visitor.visitUnknownProperty(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StringContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.STRING_LITERAL, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.IDENTIFIER, 0);
    }
    public HASH_COLOR(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.HASH_COLOR, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_string;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitString) {
            return visitor.visitString(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.IDENTIFIER, 0);
    }
    public ASTERISK(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.ASTERISK, 0);
    }
    public GROUP(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.GROUP, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.EXTENDS, 0);
    }
    public DYNAMIC(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.DYNAMIC, 0);
    }
    public DEPLOYMENT(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.DEPLOYMENT, 0);
    }
    public DEPLOYMENT_ENVIRONMENT(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.DEPLOYMENT_ENVIRONMENT, 0);
    }
    public DEPLOYMENT_NODE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.DEPLOYMENT_NODE, 0);
    }
    public INFRASTRUCTURE_NODE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.INFRASTRUCTURE_NODE, 0);
    }
    public FILTERED(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.FILTERED, 0);
    }
    public IMAGE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.IMAGE, 0);
    }
    public CUSTOM(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.CUSTOM, 0);
    }
    public INCLUDE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.INCLUDE, 0);
    }
    public EXCLUDE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.EXCLUDE, 0);
    }
    public THEME(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.THEME, 0);
    }
    public THEMES(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.THEMES, 0);
    }
    public BRANDING(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.BRANDING, 0);
    }
    public LOGO(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.LOGO, 0);
    }
    public FONT(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.FONT, 0);
    }
    public TERMINOLOGY(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.TERMINOLOGY, 0);
    }
    public CONFIGURATION(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.CONFIGURATION, 0);
    }
    public SCOPE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SCOPE, 0);
    }
    public VISIBILITY(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.VISIBILITY, 0);
    }
    public URL(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.URL, 0);
    }
    public TAGS(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.TAGS, 0);
    }
    public PROPERTIES(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.PROPERTIES, 0);
    }
    public PERSPECTIVES(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.PERSPECTIVES, 0);
    }
    public PERSON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.PERSON, 0);
    }
    public SOFTWARE_SYSTEM(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SOFTWARE_SYSTEM, 0);
    }
    public CONTAINER(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.CONTAINER, 0);
    }
    public COMPONENT(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.COMPONENT, 0);
    }
    public RELATIONSHIP(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.RELATIONSHIP, 0);
    }
    public ELEMENT(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.ELEMENT, 0);
    }
    public STYLE_PROP(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.STYLE_PROP, 0);
    }
    public POSITION(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.POSITION, 0);
    }
    public METADATA(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.METADATA, 0);
    }
    public ICON(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.ICON, 0);
    }
    public WIDTH(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.WIDTH, 0);
    }
    public HEIGHT(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.HEIGHT, 0);
    }
    public STROKE_WIDTH(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.STROKE_WIDTH, 0);
    }
    public ICON_POSITION(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.ICON_POSITION, 0);
    }
    public OPACITY(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.OPACITY, 0);
    }
    public BORDER(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.BORDER, 0);
    }
    public BACKGROUND(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.BACKGROUND, 0);
    }
    public COLOR(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.COLOR, 0);
    }
    public COLOUR(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.COLOUR, 0);
    }
    public STROKE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.STROKE, 0);
    }
    public SHAPE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.SHAPE, 0);
    }
    public DASHED(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.DASHED, 0);
    }
    public ROUTING(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.ROUTING, 0);
    }
    public THICKNESS(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.THICKNESS, 0);
    }
    public FONT_SIZE(): antlr.TerminalNode | null {
        return this.getToken(StructurizrDslParser.FONT_SIZE, 0);
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_identifier;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitIdentifier) {
            return visitor.visitIdentifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TagsDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.LBRACKET, 0)!;
    }
    public string_(): StringContext[];
    public string_(i: number): StringContext | null;
    public string_(i?: number): StringContext[] | StringContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }

        return this.getRuleContext(i, StringContext);
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(StructurizrDslParser.RBRACKET, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(StructurizrDslParser.COMMA);
    	} else {
    		return this.getToken(StructurizrDslParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return StructurizrDslParser.RULE_tagsDef;
    }
    public override accept<Result>(visitor: StructurizrDslVisitor<Result>): Result | null {
        if (visitor.visitTagsDef) {
            return visitor.visitTagsDef(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
