
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
    public static readonly WORKSPACE = 10;
    public static readonly MODEL = 11;
    public static readonly VIEWS = 12;
    public static readonly PERSON = 13;
    public static readonly SOFTWARE_SYSTEM = 14;
    public static readonly CONTAINER = 15;
    public static readonly COMPONENT = 16;
    public static readonly SYSTEM_LANDSCAPE = 17;
    public static readonly SYSTEM_CONTEXT = 18;
    public static readonly STYLES = 19;
    public static readonly ELEMENT = 20;
    public static readonly RELATIONSHIP = 21;
    public static readonly INCLUDE = 22;
    public static readonly EXCLUDE = 23;
    public static readonly AUTO_LAYOUT = 24;
    public static readonly TITLE = 25;
    public static readonly DESCRIPTION = 26;
    public static readonly ANIMATION = 27;
    public static readonly BACKGROUND = 28;
    public static readonly COLOR = 29;
    public static readonly COLOUR = 30;
    public static readonly STROKE = 31;
    public static readonly SHAPE = 32;
    public static readonly FONT_SIZE = 33;
    public static readonly BORDER = 34;
    public static readonly OPACITY = 35;
    public static readonly THICKNESS = 36;
    public static readonly DASHED = 37;
    public static readonly ROUTING = 38;
    public static readonly HASH_COLOR = 39;
    public static readonly STRING_LITERAL = 40;
    public static readonly IDENTIFIER = 41;
    public static readonly WS = 42;
    public static readonly LINE_COMMENT = 43;
    public static readonly BLOCK_COMMENT = 44;
    public static readonly RULE_workspace = 0;
    public static readonly RULE_workspaceBody = 1;
    public static readonly RULE_model = 2;
    public static readonly RULE_modelBody = 3;
    public static readonly RULE_elementAssignment = 4;
    public static readonly RULE_person = 5;
    public static readonly RULE_softwareSystem = 6;
    public static readonly RULE_softwareSystemBody = 7;
    public static readonly RULE_softwareSystemStatement = 8;
    public static readonly RULE_containerAssignment = 9;
    public static readonly RULE_container = 10;
    public static readonly RULE_containerBody = 11;
    public static readonly RULE_containerStatement = 12;
    public static readonly RULE_componentAssignment = 13;
    public static readonly RULE_component = 14;
    public static readonly RULE_bodyBlock = 15;
    public static readonly RULE_relationship = 16;
    public static readonly RULE_views = 17;
    public static readonly RULE_viewsBody = 18;
    public static readonly RULE_systemLandscapeView = 19;
    public static readonly RULE_systemContextView = 20;
    public static readonly RULE_containerView = 21;
    public static readonly RULE_componentView = 22;
    public static readonly RULE_viewBody = 23;
    public static readonly RULE_viewStatement = 24;
    public static readonly RULE_includeStatement = 25;
    public static readonly RULE_excludeStatement = 26;
    public static readonly RULE_autoLayoutStatement = 27;
    public static readonly RULE_titleStatement = 28;
    public static readonly RULE_descriptionStatement = 29;
    public static readonly RULE_animationStatement = 30;
    public static readonly RULE_styles = 31;
    public static readonly RULE_stylesBody = 32;
    public static readonly RULE_elementStyle = 33;
    public static readonly RULE_elementStyleProperty = 34;
    public static readonly RULE_relationshipStyle = 35;
    public static readonly RULE_relationshipStyleProperty = 36;
    public static readonly RULE_unknownProperty = 37;
    public static readonly RULE_string = 38;
    public static readonly RULE_identifier = 39;
    public static readonly RULE_tagsDef = 40;

    public static readonly literalNames = [
        null, "'{'", "'}'", "'['", "']'", "'='", "'->'", "'*'", "';'", "','", 
        "'workspace'", "'model'", "'views'", "'person'", "'softwareSystem'", 
        "'container'", "'component'", "'systemLandscape'", "'systemContext'", 
        "'styles'", "'element'", "'relationship'", "'include'", "'exclude'", 
        "'autoLayout'", "'title'", "'description'", "'animation'", "'background'", 
        "'color'", "'colour'", "'stroke'", "'shape'", "'fontSize'", "'border'", 
        "'opacity'", "'thickness'", "'dashed'", "'routing'"
    ];

    public static readonly symbolicNames = [
        null, "LBRACE", "RBRACE", "LBRACKET", "RBRACKET", "EQUALS", "ARROW", 
        "ASTERISK", "SEMICOLON", "COMMA", "WORKSPACE", "MODEL", "VIEWS", 
        "PERSON", "SOFTWARE_SYSTEM", "CONTAINER", "COMPONENT", "SYSTEM_LANDSCAPE", 
        "SYSTEM_CONTEXT", "STYLES", "ELEMENT", "RELATIONSHIP", "INCLUDE", 
        "EXCLUDE", "AUTO_LAYOUT", "TITLE", "DESCRIPTION", "ANIMATION", "BACKGROUND", 
        "COLOR", "COLOUR", "STROKE", "SHAPE", "FONT_SIZE", "BORDER", "OPACITY", 
        "THICKNESS", "DASHED", "ROUTING", "HASH_COLOR", "STRING_LITERAL", 
        "IDENTIFIER", "WS", "LINE_COMMENT", "BLOCK_COMMENT"
    ];
    public static readonly ruleNames = [
        "workspace", "workspaceBody", "model", "modelBody", "elementAssignment", 
        "person", "softwareSystem", "softwareSystemBody", "softwareSystemStatement", 
        "containerAssignment", "container", "containerBody", "containerStatement", 
        "componentAssignment", "component", "bodyBlock", "relationship", 
        "views", "viewsBody", "systemLandscapeView", "systemContextView", 
        "containerView", "componentView", "viewBody", "viewStatement", "includeStatement", 
        "excludeStatement", "autoLayoutStatement", "titleStatement", "descriptionStatement", 
        "animationStatement", "styles", "stylesBody", "elementStyle", "elementStyleProperty", 
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
            this.state = 82;
            this.match(StructurizrDslParser.WORKSPACE);
            this.state = 84;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                {
                this.state = 83;
                localContext._name = this.string_();
                }
                break;
            }
            this.state = 87;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 7) !== 0)) {
                {
                this.state = 86;
                localContext._description = this.string_();
                }
            }

            this.state = 89;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 93;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 11 || _la === 12) {
                {
                {
                this.state = 90;
                this.workspaceBody();
                }
                }
                this.state = 95;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 96;
            this.match(StructurizrDslParser.RBRACE);
            this.state = 97;
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
            this.state = 101;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.MODEL:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 99;
                this.model();
                }
                break;
            case StructurizrDslParser.VIEWS:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 100;
                this.views();
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
        this.enterRule(localContext, 4, StructurizrDslParser.RULE_model);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 103;
            this.match(StructurizrDslParser.MODEL);
            this.state = 104;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 108;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 24704) !== 0) || _la === 41) {
                {
                {
                this.state = 105;
                this.modelBody();
                }
                }
                this.state = 110;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 111;
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
        this.enterRule(localContext, 6, StructurizrDslParser.RULE_modelBody);
        try {
            this.state = 117;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 113;
                this.person();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 114;
                this.softwareSystem();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 115;
                this.relationship();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 116;
                this.elementAssignment();
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
        this.enterRule(localContext, 8, StructurizrDslParser.RULE_elementAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 119;
            this.identifier();
            this.state = 120;
            this.match(StructurizrDslParser.EQUALS);
            this.state = 125;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.PERSON:
                {
                this.state = 121;
                this.person();
                }
                break;
            case StructurizrDslParser.SOFTWARE_SYSTEM:
                {
                this.state = 122;
                this.softwareSystem();
                }
                break;
            case StructurizrDslParser.CONTAINER:
                {
                this.state = 123;
                this.container();
                }
                break;
            case StructurizrDslParser.COMPONENT:
                {
                this.state = 124;
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
    public person(): PersonContext {
        let localContext = new PersonContext(this.context, this.state);
        this.enterRule(localContext, 10, StructurizrDslParser.RULE_person);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 127;
            this.match(StructurizrDslParser.PERSON);
            this.state = 128;
            localContext._name = this.string_();
            this.state = 130;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 129;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 133;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 132;
                localContext._tags = this.tagsDef();
                }
            }

            this.state = 136;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 135;
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
        this.enterRule(localContext, 12, StructurizrDslParser.RULE_softwareSystem);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 138;
            this.match(StructurizrDslParser.SOFTWARE_SYSTEM);
            this.state = 139;
            localContext._name = this.string_();
            this.state = 141;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 140;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 144;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 143;
                localContext._tags = this.tagsDef();
                }
            }

            this.state = 147;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 146;
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
        this.enterRule(localContext, 14, StructurizrDslParser.RULE_softwareSystemBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 149;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 153;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 7 || _la === 15 || _la === 41) {
                {
                {
                this.state = 150;
                this.softwareSystemStatement();
                }
                }
                this.state = 155;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 156;
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
        this.enterRule(localContext, 16, StructurizrDslParser.RULE_softwareSystemStatement);
        try {
            this.state = 161;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 158;
                this.container();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 159;
                this.relationship();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 160;
                this.containerAssignment();
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
        this.enterRule(localContext, 18, StructurizrDslParser.RULE_containerAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 163;
            this.identifier();
            this.state = 164;
            this.match(StructurizrDslParser.EQUALS);
            this.state = 165;
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
        this.enterRule(localContext, 20, StructurizrDslParser.RULE_container);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 167;
            this.match(StructurizrDslParser.CONTAINER);
            this.state = 168;
            localContext._name = this.string_();
            this.state = 170;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                {
                this.state = 169;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 173;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 172;
                localContext._technology = this.string_();
                }
                break;
            }
            this.state = 176;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 175;
                localContext._tags = this.tagsDef();
                }
            }

            this.state = 179;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 178;
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
        this.enterRule(localContext, 22, StructurizrDslParser.RULE_containerBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 181;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 185;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 7 || _la === 16 || _la === 41) {
                {
                {
                this.state = 182;
                this.containerStatement();
                }
                }
                this.state = 187;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 188;
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
        this.enterRule(localContext, 24, StructurizrDslParser.RULE_containerStatement);
        try {
            this.state = 193;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 190;
                this.component();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 191;
                this.relationship();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 192;
                this.componentAssignment();
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
        this.enterRule(localContext, 26, StructurizrDslParser.RULE_componentAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 195;
            this.identifier();
            this.state = 196;
            this.match(StructurizrDslParser.EQUALS);
            this.state = 197;
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
        this.enterRule(localContext, 28, StructurizrDslParser.RULE_component);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 199;
            this.match(StructurizrDslParser.COMPONENT);
            this.state = 200;
            localContext._name = this.string_();
            this.state = 202;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context) ) {
            case 1:
                {
                this.state = 201;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 205;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                {
                this.state = 204;
                localContext._technology = this.string_();
                }
                break;
            }
            this.state = 208;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 207;
                localContext._tags = this.tagsDef();
                }
            }

            this.state = 211;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 210;
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
        this.enterRule(localContext, 30, StructurizrDslParser.RULE_bodyBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 217;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 7 || _la === 41) {
                {
                {
                this.state = 214;
                this.relationship();
                }
                }
                this.state = 219;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 220;
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
    public relationship(): RelationshipContext {
        let localContext = new RelationshipContext(this.context, this.state);
        this.enterRule(localContext, 32, StructurizrDslParser.RULE_relationship);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 222;
            localContext._source = this.identifier();
            this.state = 223;
            this.match(StructurizrDslParser.ARROW);
            this.state = 224;
            localContext._destination = this.string_();
            this.state = 226;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                {
                this.state = 225;
                localContext._description = this.string_();
                }
                break;
            }
            this.state = 229;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                {
                this.state = 228;
                localContext._technology = this.string_();
                }
                break;
            }
            this.state = 232;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 231;
                localContext._tags = this.tagsDef();
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
        this.enterRule(localContext, 34, StructurizrDslParser.RULE_views);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 234;
            this.match(StructurizrDslParser.VIEWS);
            this.state = 235;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 239;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1015808) !== 0)) {
                {
                {
                this.state = 236;
                this.viewsBody();
                }
                }
                this.state = 241;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 242;
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
        this.enterRule(localContext, 36, StructurizrDslParser.RULE_viewsBody);
        try {
            this.state = 249;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.SYSTEM_LANDSCAPE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 244;
                this.systemLandscapeView();
                }
                break;
            case StructurizrDslParser.SYSTEM_CONTEXT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 245;
                this.systemContextView();
                }
                break;
            case StructurizrDslParser.CONTAINER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 246;
                this.containerView();
                }
                break;
            case StructurizrDslParser.COMPONENT:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 247;
                this.componentView();
                }
                break;
            case StructurizrDslParser.STYLES:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 248;
                this.styles();
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
        this.enterRule(localContext, 38, StructurizrDslParser.RULE_systemLandscapeView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 251;
            this.match(StructurizrDslParser.SYSTEM_LANDSCAPE);
            this.state = 253;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                {
                this.state = 252;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 256;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 7) !== 0)) {
                {
                this.state = 255;
                localContext._description = this.string_();
                }
            }

            this.state = 258;
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
        this.enterRule(localContext, 40, StructurizrDslParser.RULE_systemContextView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 260;
            this.match(StructurizrDslParser.SYSTEM_CONTEXT);
            this.state = 261;
            localContext._systemIdentifier = this.identifier();
            this.state = 263;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                {
                this.state = 262;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 266;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 7) !== 0)) {
                {
                this.state = 265;
                localContext._description = this.string_();
                }
            }

            this.state = 268;
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
        this.enterRule(localContext, 42, StructurizrDslParser.RULE_containerView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 270;
            this.match(StructurizrDslParser.CONTAINER);
            this.state = 271;
            localContext._systemIdentifier = this.identifier();
            this.state = 273;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                {
                this.state = 272;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 276;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 7) !== 0)) {
                {
                this.state = 275;
                localContext._description = this.string_();
                }
            }

            this.state = 278;
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
        this.enterRule(localContext, 44, StructurizrDslParser.RULE_componentView);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 280;
            this.match(StructurizrDslParser.COMPONENT);
            this.state = 281;
            localContext._containerIdentifier = this.identifier();
            this.state = 283;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
            case 1:
                {
                this.state = 282;
                localContext._key = this.string_();
                }
                break;
            }
            this.state = 286;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 7) !== 0)) {
                {
                this.state = 285;
                localContext._description = this.string_();
                }
            }

            this.state = 288;
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
        this.enterRule(localContext, 46, StructurizrDslParser.RULE_viewBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 290;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 294;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 264241152) !== 0)) {
                {
                {
                this.state = 291;
                this.viewStatement();
                }
                }
                this.state = 296;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 297;
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
        this.enterRule(localContext, 48, StructurizrDslParser.RULE_viewStatement);
        try {
            this.state = 305;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.INCLUDE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 299;
                this.includeStatement();
                }
                break;
            case StructurizrDslParser.EXCLUDE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 300;
                this.excludeStatement();
                }
                break;
            case StructurizrDslParser.AUTO_LAYOUT:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 301;
                this.autoLayoutStatement();
                }
                break;
            case StructurizrDslParser.TITLE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 302;
                this.titleStatement();
                }
                break;
            case StructurizrDslParser.DESCRIPTION:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 303;
                this.descriptionStatement();
                }
                break;
            case StructurizrDslParser.ANIMATION:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 304;
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
        this.enterRule(localContext, 50, StructurizrDslParser.RULE_includeStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 307;
            this.match(StructurizrDslParser.INCLUDE);
            this.state = 308;
            this.identifier();
            this.state = 312;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 7 || _la === 41) {
                {
                {
                this.state = 309;
                this.identifier();
                }
                }
                this.state = 314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
        this.enterRule(localContext, 52, StructurizrDslParser.RULE_excludeStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 315;
            this.match(StructurizrDslParser.EXCLUDE);
            this.state = 316;
            this.identifier();
            this.state = 320;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 7 || _la === 41) {
                {
                {
                this.state = 317;
                this.identifier();
                }
                }
                this.state = 322;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public autoLayoutStatement(): AutoLayoutStatementContext {
        let localContext = new AutoLayoutStatementContext(this.context, this.state);
        this.enterRule(localContext, 54, StructurizrDslParser.RULE_autoLayoutStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 323;
            this.match(StructurizrDslParser.AUTO_LAYOUT);
            this.state = 325;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 43, this.context) ) {
            case 1:
                {
                this.state = 324;
                localContext._direction = this.identifier();
                }
                break;
            }
            this.state = 328;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context) ) {
            case 1:
                {
                this.state = 327;
                localContext._rankSep = this.identifier();
                }
                break;
            }
            this.state = 331;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 7 || _la === 41) {
                {
                this.state = 330;
                localContext._nodeSep = this.identifier();
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
    public titleStatement(): TitleStatementContext {
        let localContext = new TitleStatementContext(this.context, this.state);
        this.enterRule(localContext, 56, StructurizrDslParser.RULE_titleStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 333;
            this.match(StructurizrDslParser.TITLE);
            this.state = 334;
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
        this.enterRule(localContext, 58, StructurizrDslParser.RULE_descriptionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 336;
            this.match(StructurizrDslParser.DESCRIPTION);
            this.state = 337;
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
        this.enterRule(localContext, 60, StructurizrDslParser.RULE_animationStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 339;
            this.match(StructurizrDslParser.ANIMATION);
            this.state = 340;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 344;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 7 || _la === 41) {
                {
                {
                this.state = 341;
                this.identifier();
                }
                }
                this.state = 346;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 347;
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
    public styles(): StylesContext {
        let localContext = new StylesContext(this.context, this.state);
        this.enterRule(localContext, 62, StructurizrDslParser.RULE_styles);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 349;
            this.match(StructurizrDslParser.STYLES);
            this.state = 350;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 354;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 20 || _la === 21) {
                {
                {
                this.state = 351;
                this.stylesBody();
                }
                }
                this.state = 356;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 357;
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
        this.enterRule(localContext, 64, StructurizrDslParser.RULE_stylesBody);
        try {
            this.state = 361;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.ELEMENT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 359;
                this.elementStyle();
                }
                break;
            case StructurizrDslParser.RELATIONSHIP:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 360;
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
        this.enterRule(localContext, 66, StructurizrDslParser.RULE_elementStyle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 363;
            this.match(StructurizrDslParser.ELEMENT);
            this.state = 364;
            localContext._tag = this.string_();
            this.state = 365;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 369;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4026531968) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 527) !== 0)) {
                {
                {
                this.state = 366;
                this.elementStyleProperty();
                }
                }
                this.state = 371;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 372;
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
        this.enterRule(localContext, 68, StructurizrDslParser.RULE_elementStyleProperty);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 391;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.BACKGROUND:
                {
                this.state = 374;
                this.match(StructurizrDslParser.BACKGROUND);
                this.state = 375;
                localContext._color = this.string_();
                }
                break;
            case StructurizrDslParser.COLOR:
                {
                this.state = 376;
                this.match(StructurizrDslParser.COLOR);
                this.state = 377;
                localContext._color = this.string_();
                }
                break;
            case StructurizrDslParser.COLOUR:
                {
                this.state = 378;
                this.match(StructurizrDslParser.COLOUR);
                this.state = 379;
                localContext._color = this.string_();
                }
                break;
            case StructurizrDslParser.STROKE:
                {
                this.state = 380;
                this.match(StructurizrDslParser.STROKE);
                this.state = 381;
                localContext._color = this.string_();
                }
                break;
            case StructurizrDslParser.SHAPE:
                {
                this.state = 382;
                this.match(StructurizrDslParser.SHAPE);
                this.state = 383;
                localContext._shape = this.string_();
                }
                break;
            case StructurizrDslParser.FONT_SIZE:
                {
                this.state = 384;
                this.match(StructurizrDslParser.FONT_SIZE);
                this.state = 385;
                localContext._size = this.string_();
                }
                break;
            case StructurizrDslParser.BORDER:
                {
                this.state = 386;
                this.match(StructurizrDslParser.BORDER);
                this.state = 387;
                localContext._border = this.string_();
                }
                break;
            case StructurizrDslParser.OPACITY:
                {
                this.state = 388;
                this.match(StructurizrDslParser.OPACITY);
                this.state = 389;
                localContext._opacity = this.string_();
                }
                break;
            case StructurizrDslParser.ASTERISK:
            case StructurizrDslParser.IDENTIFIER:
                {
                this.state = 390;
                this.unknownProperty();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 394;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 393;
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
        this.enterRule(localContext, 70, StructurizrDslParser.RULE_relationshipStyle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 396;
            this.match(StructurizrDslParser.RELATIONSHIP);
            this.state = 397;
            localContext._tag = this.string_();
            this.state = 398;
            this.match(StructurizrDslParser.LBRACE);
            this.state = 402;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1610612864) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 313) !== 0)) {
                {
                {
                this.state = 399;
                this.relationshipStyleProperty();
                }
                }
                this.state = 404;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 405;
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
        this.enterRule(localContext, 72, StructurizrDslParser.RULE_relationshipStyleProperty);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 420;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case StructurizrDslParser.COLOR:
                {
                this.state = 407;
                this.match(StructurizrDslParser.COLOR);
                this.state = 408;
                localContext._color = this.string_();
                }
                break;
            case StructurizrDslParser.COLOUR:
                {
                this.state = 409;
                this.match(StructurizrDslParser.COLOUR);
                this.state = 410;
                localContext._color = this.string_();
                }
                break;
            case StructurizrDslParser.THICKNESS:
                {
                this.state = 411;
                this.match(StructurizrDslParser.THICKNESS);
                this.state = 412;
                localContext._thickness = this.string_();
                }
                break;
            case StructurizrDslParser.DASHED:
                {
                this.state = 413;
                this.match(StructurizrDslParser.DASHED);
                this.state = 414;
                localContext._dashed = this.string_();
                }
                break;
            case StructurizrDslParser.ROUTING:
                {
                this.state = 415;
                this.match(StructurizrDslParser.ROUTING);
                this.state = 416;
                localContext._routing = this.string_();
                }
                break;
            case StructurizrDslParser.FONT_SIZE:
                {
                this.state = 417;
                this.match(StructurizrDslParser.FONT_SIZE);
                this.state = 418;
                localContext._size = this.string_();
                }
                break;
            case StructurizrDslParser.ASTERISK:
            case StructurizrDslParser.IDENTIFIER:
                {
                this.state = 419;
                this.unknownProperty();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 423;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 422;
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
        this.enterRule(localContext, 74, StructurizrDslParser.RULE_unknownProperty);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 425;
            this.identifier();
            this.state = 430;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 428;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
                    case 1:
                        {
                        this.state = 426;
                        this.identifier();
                        }
                        break;
                    case 2:
                        {
                        this.state = 427;
                        this.string_();
                        }
                        break;
                    }
                    }
                }
                this.state = 432;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 56, this.context);
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
        this.enterRule(localContext, 76, StructurizrDslParser.RULE_string);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 433;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 7) !== 0))) {
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
        this.enterRule(localContext, 78, StructurizrDslParser.RULE_identifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 435;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 41)) {
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
        this.enterRule(localContext, 80, StructurizrDslParser.RULE_tagsDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 437;
            this.match(StructurizrDslParser.LBRACKET);
            this.state = 438;
            this.string_();
            this.state = 445;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 7) !== 0)) {
                {
                {
                this.state = 440;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 9) {
                    {
                    this.state = 439;
                    this.match(StructurizrDslParser.COMMA);
                    }
                }

                this.state = 442;
                this.string_();
                }
                }
                this.state = 447;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 448;
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
        4,1,44,451,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,1,0,1,0,3,0,85,8,0,1,0,3,0,88,8,0,1,0,1,0,5,0,92,8,0,10,
        0,12,0,95,9,0,1,0,1,0,1,0,1,1,1,1,3,1,102,8,1,1,2,1,2,1,2,5,2,107,
        8,2,10,2,12,2,110,9,2,1,2,1,2,1,3,1,3,1,3,1,3,3,3,118,8,3,1,4,1,
        4,1,4,1,4,1,4,1,4,3,4,126,8,4,1,5,1,5,1,5,3,5,131,8,5,1,5,3,5,134,
        8,5,1,5,3,5,137,8,5,1,6,1,6,1,6,3,6,142,8,6,1,6,3,6,145,8,6,1,6,
        3,6,148,8,6,1,7,1,7,5,7,152,8,7,10,7,12,7,155,9,7,1,7,1,7,1,8,1,
        8,1,8,3,8,162,8,8,1,9,1,9,1,9,1,9,1,10,1,10,1,10,3,10,171,8,10,1,
        10,3,10,174,8,10,1,10,3,10,177,8,10,1,10,3,10,180,8,10,1,11,1,11,
        5,11,184,8,11,10,11,12,11,187,9,11,1,11,1,11,1,12,1,12,1,12,3,12,
        194,8,12,1,13,1,13,1,13,1,13,1,14,1,14,1,14,3,14,203,8,14,1,14,3,
        14,206,8,14,1,14,3,14,209,8,14,1,14,3,14,212,8,14,1,15,1,15,5,15,
        216,8,15,10,15,12,15,219,9,15,1,15,1,15,1,16,1,16,1,16,1,16,3,16,
        227,8,16,1,16,3,16,230,8,16,1,16,3,16,233,8,16,1,17,1,17,1,17,5,
        17,238,8,17,10,17,12,17,241,9,17,1,17,1,17,1,18,1,18,1,18,1,18,1,
        18,3,18,250,8,18,1,19,1,19,3,19,254,8,19,1,19,3,19,257,8,19,1,19,
        1,19,1,20,1,20,1,20,3,20,264,8,20,1,20,3,20,267,8,20,1,20,1,20,1,
        21,1,21,1,21,3,21,274,8,21,1,21,3,21,277,8,21,1,21,1,21,1,22,1,22,
        1,22,3,22,284,8,22,1,22,3,22,287,8,22,1,22,1,22,1,23,1,23,5,23,293,
        8,23,10,23,12,23,296,9,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,
        3,24,306,8,24,1,25,1,25,1,25,5,25,311,8,25,10,25,12,25,314,9,25,
        1,26,1,26,1,26,5,26,319,8,26,10,26,12,26,322,9,26,1,27,1,27,3,27,
        326,8,27,1,27,3,27,329,8,27,1,27,3,27,332,8,27,1,28,1,28,1,28,1,
        29,1,29,1,29,1,30,1,30,1,30,5,30,343,8,30,10,30,12,30,346,9,30,1,
        30,1,30,1,31,1,31,1,31,5,31,353,8,31,10,31,12,31,356,9,31,1,31,1,
        31,1,32,1,32,3,32,362,8,32,1,33,1,33,1,33,1,33,5,33,368,8,33,10,
        33,12,33,371,9,33,1,33,1,33,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,3,34,392,8,34,1,
        34,3,34,395,8,34,1,35,1,35,1,35,1,35,5,35,401,8,35,10,35,12,35,404,
        9,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,
        1,36,1,36,1,36,3,36,421,8,36,1,36,3,36,424,8,36,1,37,1,37,1,37,5,
        37,429,8,37,10,37,12,37,432,9,37,1,38,1,38,1,39,1,39,1,40,1,40,1,
        40,3,40,441,8,40,1,40,5,40,444,8,40,10,40,12,40,447,9,40,1,40,1,
        40,1,40,0,0,41,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
        36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,
        80,0,2,1,0,39,41,2,0,7,7,41,41,493,0,82,1,0,0,0,2,101,1,0,0,0,4,
        103,1,0,0,0,6,117,1,0,0,0,8,119,1,0,0,0,10,127,1,0,0,0,12,138,1,
        0,0,0,14,149,1,0,0,0,16,161,1,0,0,0,18,163,1,0,0,0,20,167,1,0,0,
        0,22,181,1,0,0,0,24,193,1,0,0,0,26,195,1,0,0,0,28,199,1,0,0,0,30,
        213,1,0,0,0,32,222,1,0,0,0,34,234,1,0,0,0,36,249,1,0,0,0,38,251,
        1,0,0,0,40,260,1,0,0,0,42,270,1,0,0,0,44,280,1,0,0,0,46,290,1,0,
        0,0,48,305,1,0,0,0,50,307,1,0,0,0,52,315,1,0,0,0,54,323,1,0,0,0,
        56,333,1,0,0,0,58,336,1,0,0,0,60,339,1,0,0,0,62,349,1,0,0,0,64,361,
        1,0,0,0,66,363,1,0,0,0,68,391,1,0,0,0,70,396,1,0,0,0,72,420,1,0,
        0,0,74,425,1,0,0,0,76,433,1,0,0,0,78,435,1,0,0,0,80,437,1,0,0,0,
        82,84,5,10,0,0,83,85,3,76,38,0,84,83,1,0,0,0,84,85,1,0,0,0,85,87,
        1,0,0,0,86,88,3,76,38,0,87,86,1,0,0,0,87,88,1,0,0,0,88,89,1,0,0,
        0,89,93,5,1,0,0,90,92,3,2,1,0,91,90,1,0,0,0,92,95,1,0,0,0,93,91,
        1,0,0,0,93,94,1,0,0,0,94,96,1,0,0,0,95,93,1,0,0,0,96,97,5,2,0,0,
        97,98,5,0,0,1,98,1,1,0,0,0,99,102,3,4,2,0,100,102,3,34,17,0,101,
        99,1,0,0,0,101,100,1,0,0,0,102,3,1,0,0,0,103,104,5,11,0,0,104,108,
        5,1,0,0,105,107,3,6,3,0,106,105,1,0,0,0,107,110,1,0,0,0,108,106,
        1,0,0,0,108,109,1,0,0,0,109,111,1,0,0,0,110,108,1,0,0,0,111,112,
        5,2,0,0,112,5,1,0,0,0,113,118,3,10,5,0,114,118,3,12,6,0,115,118,
        3,32,16,0,116,118,3,8,4,0,117,113,1,0,0,0,117,114,1,0,0,0,117,115,
        1,0,0,0,117,116,1,0,0,0,118,7,1,0,0,0,119,120,3,78,39,0,120,125,
        5,5,0,0,121,126,3,10,5,0,122,126,3,12,6,0,123,126,3,20,10,0,124,
        126,3,28,14,0,125,121,1,0,0,0,125,122,1,0,0,0,125,123,1,0,0,0,125,
        124,1,0,0,0,126,9,1,0,0,0,127,128,5,13,0,0,128,130,3,76,38,0,129,
        131,3,76,38,0,130,129,1,0,0,0,130,131,1,0,0,0,131,133,1,0,0,0,132,
        134,3,80,40,0,133,132,1,0,0,0,133,134,1,0,0,0,134,136,1,0,0,0,135,
        137,3,30,15,0,136,135,1,0,0,0,136,137,1,0,0,0,137,11,1,0,0,0,138,
        139,5,14,0,0,139,141,3,76,38,0,140,142,3,76,38,0,141,140,1,0,0,0,
        141,142,1,0,0,0,142,144,1,0,0,0,143,145,3,80,40,0,144,143,1,0,0,
        0,144,145,1,0,0,0,145,147,1,0,0,0,146,148,3,14,7,0,147,146,1,0,0,
        0,147,148,1,0,0,0,148,13,1,0,0,0,149,153,5,1,0,0,150,152,3,16,8,
        0,151,150,1,0,0,0,152,155,1,0,0,0,153,151,1,0,0,0,153,154,1,0,0,
        0,154,156,1,0,0,0,155,153,1,0,0,0,156,157,5,2,0,0,157,15,1,0,0,0,
        158,162,3,20,10,0,159,162,3,32,16,0,160,162,3,18,9,0,161,158,1,0,
        0,0,161,159,1,0,0,0,161,160,1,0,0,0,162,17,1,0,0,0,163,164,3,78,
        39,0,164,165,5,5,0,0,165,166,3,20,10,0,166,19,1,0,0,0,167,168,5,
        15,0,0,168,170,3,76,38,0,169,171,3,76,38,0,170,169,1,0,0,0,170,171,
        1,0,0,0,171,173,1,0,0,0,172,174,3,76,38,0,173,172,1,0,0,0,173,174,
        1,0,0,0,174,176,1,0,0,0,175,177,3,80,40,0,176,175,1,0,0,0,176,177,
        1,0,0,0,177,179,1,0,0,0,178,180,3,22,11,0,179,178,1,0,0,0,179,180,
        1,0,0,0,180,21,1,0,0,0,181,185,5,1,0,0,182,184,3,24,12,0,183,182,
        1,0,0,0,184,187,1,0,0,0,185,183,1,0,0,0,185,186,1,0,0,0,186,188,
        1,0,0,0,187,185,1,0,0,0,188,189,5,2,0,0,189,23,1,0,0,0,190,194,3,
        28,14,0,191,194,3,32,16,0,192,194,3,26,13,0,193,190,1,0,0,0,193,
        191,1,0,0,0,193,192,1,0,0,0,194,25,1,0,0,0,195,196,3,78,39,0,196,
        197,5,5,0,0,197,198,3,28,14,0,198,27,1,0,0,0,199,200,5,16,0,0,200,
        202,3,76,38,0,201,203,3,76,38,0,202,201,1,0,0,0,202,203,1,0,0,0,
        203,205,1,0,0,0,204,206,3,76,38,0,205,204,1,0,0,0,205,206,1,0,0,
        0,206,208,1,0,0,0,207,209,3,80,40,0,208,207,1,0,0,0,208,209,1,0,
        0,0,209,211,1,0,0,0,210,212,3,30,15,0,211,210,1,0,0,0,211,212,1,
        0,0,0,212,29,1,0,0,0,213,217,5,1,0,0,214,216,3,32,16,0,215,214,1,
        0,0,0,216,219,1,0,0,0,217,215,1,0,0,0,217,218,1,0,0,0,218,220,1,
        0,0,0,219,217,1,0,0,0,220,221,5,2,0,0,221,31,1,0,0,0,222,223,3,78,
        39,0,223,224,5,6,0,0,224,226,3,76,38,0,225,227,3,76,38,0,226,225,
        1,0,0,0,226,227,1,0,0,0,227,229,1,0,0,0,228,230,3,76,38,0,229,228,
        1,0,0,0,229,230,1,0,0,0,230,232,1,0,0,0,231,233,3,80,40,0,232,231,
        1,0,0,0,232,233,1,0,0,0,233,33,1,0,0,0,234,235,5,12,0,0,235,239,
        5,1,0,0,236,238,3,36,18,0,237,236,1,0,0,0,238,241,1,0,0,0,239,237,
        1,0,0,0,239,240,1,0,0,0,240,242,1,0,0,0,241,239,1,0,0,0,242,243,
        5,2,0,0,243,35,1,0,0,0,244,250,3,38,19,0,245,250,3,40,20,0,246,250,
        3,42,21,0,247,250,3,44,22,0,248,250,3,62,31,0,249,244,1,0,0,0,249,
        245,1,0,0,0,249,246,1,0,0,0,249,247,1,0,0,0,249,248,1,0,0,0,250,
        37,1,0,0,0,251,253,5,17,0,0,252,254,3,76,38,0,253,252,1,0,0,0,253,
        254,1,0,0,0,254,256,1,0,0,0,255,257,3,76,38,0,256,255,1,0,0,0,256,
        257,1,0,0,0,257,258,1,0,0,0,258,259,3,46,23,0,259,39,1,0,0,0,260,
        261,5,18,0,0,261,263,3,78,39,0,262,264,3,76,38,0,263,262,1,0,0,0,
        263,264,1,0,0,0,264,266,1,0,0,0,265,267,3,76,38,0,266,265,1,0,0,
        0,266,267,1,0,0,0,267,268,1,0,0,0,268,269,3,46,23,0,269,41,1,0,0,
        0,270,271,5,15,0,0,271,273,3,78,39,0,272,274,3,76,38,0,273,272,1,
        0,0,0,273,274,1,0,0,0,274,276,1,0,0,0,275,277,3,76,38,0,276,275,
        1,0,0,0,276,277,1,0,0,0,277,278,1,0,0,0,278,279,3,46,23,0,279,43,
        1,0,0,0,280,281,5,16,0,0,281,283,3,78,39,0,282,284,3,76,38,0,283,
        282,1,0,0,0,283,284,1,0,0,0,284,286,1,0,0,0,285,287,3,76,38,0,286,
        285,1,0,0,0,286,287,1,0,0,0,287,288,1,0,0,0,288,289,3,46,23,0,289,
        45,1,0,0,0,290,294,5,1,0,0,291,293,3,48,24,0,292,291,1,0,0,0,293,
        296,1,0,0,0,294,292,1,0,0,0,294,295,1,0,0,0,295,297,1,0,0,0,296,
        294,1,0,0,0,297,298,5,2,0,0,298,47,1,0,0,0,299,306,3,50,25,0,300,
        306,3,52,26,0,301,306,3,54,27,0,302,306,3,56,28,0,303,306,3,58,29,
        0,304,306,3,60,30,0,305,299,1,0,0,0,305,300,1,0,0,0,305,301,1,0,
        0,0,305,302,1,0,0,0,305,303,1,0,0,0,305,304,1,0,0,0,306,49,1,0,0,
        0,307,308,5,22,0,0,308,312,3,78,39,0,309,311,3,78,39,0,310,309,1,
        0,0,0,311,314,1,0,0,0,312,310,1,0,0,0,312,313,1,0,0,0,313,51,1,0,
        0,0,314,312,1,0,0,0,315,316,5,23,0,0,316,320,3,78,39,0,317,319,3,
        78,39,0,318,317,1,0,0,0,319,322,1,0,0,0,320,318,1,0,0,0,320,321,
        1,0,0,0,321,53,1,0,0,0,322,320,1,0,0,0,323,325,5,24,0,0,324,326,
        3,78,39,0,325,324,1,0,0,0,325,326,1,0,0,0,326,328,1,0,0,0,327,329,
        3,78,39,0,328,327,1,0,0,0,328,329,1,0,0,0,329,331,1,0,0,0,330,332,
        3,78,39,0,331,330,1,0,0,0,331,332,1,0,0,0,332,55,1,0,0,0,333,334,
        5,25,0,0,334,335,3,76,38,0,335,57,1,0,0,0,336,337,5,26,0,0,337,338,
        3,76,38,0,338,59,1,0,0,0,339,340,5,27,0,0,340,344,5,1,0,0,341,343,
        3,78,39,0,342,341,1,0,0,0,343,346,1,0,0,0,344,342,1,0,0,0,344,345,
        1,0,0,0,345,347,1,0,0,0,346,344,1,0,0,0,347,348,5,2,0,0,348,61,1,
        0,0,0,349,350,5,19,0,0,350,354,5,1,0,0,351,353,3,64,32,0,352,351,
        1,0,0,0,353,356,1,0,0,0,354,352,1,0,0,0,354,355,1,0,0,0,355,357,
        1,0,0,0,356,354,1,0,0,0,357,358,5,2,0,0,358,63,1,0,0,0,359,362,3,
        66,33,0,360,362,3,70,35,0,361,359,1,0,0,0,361,360,1,0,0,0,362,65,
        1,0,0,0,363,364,5,20,0,0,364,365,3,76,38,0,365,369,5,1,0,0,366,368,
        3,68,34,0,367,366,1,0,0,0,368,371,1,0,0,0,369,367,1,0,0,0,369,370,
        1,0,0,0,370,372,1,0,0,0,371,369,1,0,0,0,372,373,5,2,0,0,373,67,1,
        0,0,0,374,375,5,28,0,0,375,392,3,76,38,0,376,377,5,29,0,0,377,392,
        3,76,38,0,378,379,5,30,0,0,379,392,3,76,38,0,380,381,5,31,0,0,381,
        392,3,76,38,0,382,383,5,32,0,0,383,392,3,76,38,0,384,385,5,33,0,
        0,385,392,3,76,38,0,386,387,5,34,0,0,387,392,3,76,38,0,388,389,5,
        35,0,0,389,392,3,76,38,0,390,392,3,74,37,0,391,374,1,0,0,0,391,376,
        1,0,0,0,391,378,1,0,0,0,391,380,1,0,0,0,391,382,1,0,0,0,391,384,
        1,0,0,0,391,386,1,0,0,0,391,388,1,0,0,0,391,390,1,0,0,0,392,394,
        1,0,0,0,393,395,5,8,0,0,394,393,1,0,0,0,394,395,1,0,0,0,395,69,1,
        0,0,0,396,397,5,21,0,0,397,398,3,76,38,0,398,402,5,1,0,0,399,401,
        3,72,36,0,400,399,1,0,0,0,401,404,1,0,0,0,402,400,1,0,0,0,402,403,
        1,0,0,0,403,405,1,0,0,0,404,402,1,0,0,0,405,406,5,2,0,0,406,71,1,
        0,0,0,407,408,5,29,0,0,408,421,3,76,38,0,409,410,5,30,0,0,410,421,
        3,76,38,0,411,412,5,36,0,0,412,421,3,76,38,0,413,414,5,37,0,0,414,
        421,3,76,38,0,415,416,5,38,0,0,416,421,3,76,38,0,417,418,5,33,0,
        0,418,421,3,76,38,0,419,421,3,74,37,0,420,407,1,0,0,0,420,409,1,
        0,0,0,420,411,1,0,0,0,420,413,1,0,0,0,420,415,1,0,0,0,420,417,1,
        0,0,0,420,419,1,0,0,0,421,423,1,0,0,0,422,424,5,8,0,0,423,422,1,
        0,0,0,423,424,1,0,0,0,424,73,1,0,0,0,425,430,3,78,39,0,426,429,3,
        78,39,0,427,429,3,76,38,0,428,426,1,0,0,0,428,427,1,0,0,0,429,432,
        1,0,0,0,430,428,1,0,0,0,430,431,1,0,0,0,431,75,1,0,0,0,432,430,1,
        0,0,0,433,434,7,0,0,0,434,77,1,0,0,0,435,436,7,1,0,0,436,79,1,0,
        0,0,437,438,5,3,0,0,438,445,3,76,38,0,439,441,5,9,0,0,440,439,1,
        0,0,0,440,441,1,0,0,0,441,442,1,0,0,0,442,444,3,76,38,0,443,440,
        1,0,0,0,444,447,1,0,0,0,445,443,1,0,0,0,445,446,1,0,0,0,446,448,
        1,0,0,0,447,445,1,0,0,0,448,449,5,4,0,0,449,81,1,0,0,0,59,84,87,
        93,101,108,117,125,130,133,136,141,144,147,153,161,170,173,176,179,
        185,193,202,205,208,211,217,226,229,232,239,249,253,256,263,266,
        273,276,283,286,294,305,312,320,325,328,331,344,354,361,369,391,
        394,402,420,423,428,430,440,445
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


export class PersonContext extends antlr.ParserRuleContext {
    public _name?: StringContext;
    public _description?: StringContext;
    public _tags?: TagsDefContext;
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
    public tagsDef(): TagsDefContext | null {
        return this.getRuleContext(0, TagsDefContext);
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
    public _tags?: TagsDefContext;
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
    public tagsDef(): TagsDefContext | null {
        return this.getRuleContext(0, TagsDefContext);
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
    public _tags?: TagsDefContext;
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
    public tagsDef(): TagsDefContext | null {
        return this.getRuleContext(0, TagsDefContext);
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
    public _tags?: TagsDefContext;
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
    public tagsDef(): TagsDefContext | null {
        return this.getRuleContext(0, TagsDefContext);
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
    public relationship(): RelationshipContext[];
    public relationship(i: number): RelationshipContext | null;
    public relationship(i?: number): RelationshipContext[] | RelationshipContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RelationshipContext);
        }

        return this.getRuleContext(i, RelationshipContext);
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


export class RelationshipContext extends antlr.ParserRuleContext {
    public _source?: IdentifierContext;
    public _destination?: StringContext;
    public _description?: StringContext;
    public _technology?: StringContext;
    public _tags?: TagsDefContext;
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
    public tagsDef(): TagsDefContext | null {
        return this.getRuleContext(0, TagsDefContext);
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
    public styles(): StylesContext | null {
        return this.getRuleContext(0, StylesContext);
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
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
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
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
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
