grammar StructurizrDsl;

// ========================================================== //
// PARSER RULES                                               //
// ========================================================== //

workspace:
    WORKSPACE (EXTENDS extendsUrl=string)? name=string? description=string? LBRACE workspaceBody* RBRACE EOF
    ;

workspaceBody:
    model
    | views
    | directive
    ;

directive:
    BANG_INCLUDE path=string                                    # includeDirective
    | BANG_IDENTIFIERS scope=identifier                         # identifiersDirective
    | BANG_CONST name=identifier value=string                   # constDirective
    | BANG_VAR name=identifier value=string                     # varDirective
    | BANG_IMPLIED_RELATIONSHIPS enabled=string                 # impliedRelationshipsDirective
    | BANG_DOCS path=string                                     # docsDirective
    | BANG_ADRS path=string                                     # adrsDirective
    | BANG_REF ref=string                                       # refDirective
    ;

// --- Model ---

model:
    MODEL LBRACE modelBody* RBRACE
    ;

modelBody:
    person
    | softwareSystem
    | relationship
    | elementAssignment
    | group
    | deploymentEnvironment
    ;

elementAssignment:
    identifier EQUALS (person | softwareSystem | container | component)
    ;

group:
    GROUP name=string LBRACE groupModelBody* RBRACE
    ;

groupModelBody:
    person
    | softwareSystem
    | relationship
    | elementAssignment
    | group
    ;

person:
    PERSON name=string description=string? tags=string? bodyBlock?
    ;

softwareSystem:
    SOFTWARE_SYSTEM name=string description=string? tags=string? softwareSystemBody?
    ;

softwareSystemBody:
    LBRACE softwareSystemStatement* RBRACE
    ;

softwareSystemStatement:
    container
    | relationship
    | containerAssignment
    | group
    | bodyStatement
    ;

containerAssignment:
    identifier EQUALS container
    ;

container:
    CONTAINER name=string description=string? technology=string? tags=string? containerBody?
    ;

containerBody:
    LBRACE containerStatement* RBRACE
    ;

containerStatement:
    component
    | relationship
    | componentAssignment
    | group
    | bodyStatement
    ;

componentAssignment:
    identifier EQUALS component
    ;

component:
    COMPONENT name=string description=string? technology=string? tags=string? bodyBlock?
    ;

bodyBlock:
    LBRACE bodyStatement* RBRACE
    ;

bodyStatement:
    relationship
    | urlStatement
    | tagsStatement
    | propertiesStatement
    | perspectivesStatement
    ;

urlStatement:
    URL value=string SEMICOLON?
    ;

tagsStatement:
    TAGS string+ SEMICOLON?
    ;

propertiesStatement:
    PROPERTIES LBRACE propertyEntry* RBRACE
    ;

propertyEntry:
    key=string value=string SEMICOLON?
    ;

perspectivesStatement:
    PERSPECTIVES LBRACE perspectiveEntry* RBRACE
    ;

perspectiveEntry:
    name=string description=string SEMICOLON?
    ;

relationship:
    source=identifier ARROW destination=string description=string? technology=string? tags=string?
    ;

// --- Deployment ---

deploymentEnvironment:
    DEPLOYMENT_ENVIRONMENT name=string LBRACE deploymentNodeStatement* RBRACE
    ;

deploymentNodeStatement:
    deploymentNode
    | infrastructureNode
    | softwareSystemInstance
    | containerInstance
    | deploymentNodeAssignment
    | relationship
    ;

deploymentNodeAssignment:
    identifier EQUALS deploymentNode
    ;

deploymentNode:
    DEPLOYMENT_NODE name=string description=string? technology=string? tags=string?
    LBRACE deploymentNodeStatement* RBRACE
    ;

infrastructureNode:
    INFRASTRUCTURE_NODE name=string description=string? technology=string? tags=string?
    bodyBlock?
    ;

softwareSystemInstance:
    SOFTWARE_SYSTEM_INSTANCE ref=identifier instanceId=string? tags=string? bodyBlock?
    ;

containerInstance:
    CONTAINER_INSTANCE ref=identifier instanceId=string? tags=string? bodyBlock?
    ;

// --- Views ---

views:
    VIEWS LBRACE viewsBody* RBRACE
    ;

viewsBody:
    systemLandscapeView
    | systemContextView
    | containerView
    | componentView
    | dynamicView
    | deploymentView
    | filteredView
    | imageView
    | customView
    | styles
    | themeStatement
    | themesStatement
    | brandingBlock
    | terminologyBlock
    | configurationBlock
    ;

systemLandscapeView:
    SYSTEM_LANDSCAPE key=string? description=string? viewBody
    ;

systemContextView:
    SYSTEM_CONTEXT systemIdentifier=identifier key=string? description=string? viewBody
    ;

containerView:
    CONTAINER systemIdentifier=identifier key=string? description=string? viewBody
    ;

componentView:
    COMPONENT containerIdentifier=identifier key=string? description=string? viewBody
    ;

dynamicView:
    DYNAMIC elementRef=identifier? key=string? description=string? viewBody
    ;

deploymentView:
    DEPLOYMENT elementRef=identifier? environment=string? key=string? description=string? viewBody
    ;

filteredView:
    FILTERED baseKey=string filterMode=identifier filterTags=string key=string? description=string? viewBody?
    ;

imageView:
    IMAGE elementRef=identifier key=string? LBRACE imageViewStatement* RBRACE
    ;

imageViewStatement:
    (TITLE | DESCRIPTION) value=string SEMICOLON?
    | IMAGE value=string SEMICOLON?
    ;

customView:
    CUSTOM key=string? description=string? viewBody
    ;

viewBody:
    LBRACE viewStatement* RBRACE
    ;

viewStatement:
    includeStatement
    | excludeStatement
    | autoLayoutStatement
    | titleStatement
    | descriptionStatement
    | animationStatement
    ;

includeStatement:
    INCLUDE includeTarget (includeTarget)*
    ;

excludeStatement:
    EXCLUDE includeTarget (includeTarget)*
    ;

includeTarget:
    identifier
    | string
    ;

autoLayoutStatement:
    AUTO_LAYOUT direction=identifier? rankSep=identifier? nodeSep=identifier?
    ;

titleStatement:
    TITLE string
    ;

descriptionStatement:
    DESCRIPTION string
    ;

animationStatement:
    ANIMATION LBRACE identifier* RBRACE
    ;

// --- Views Configuration ---

themeStatement:
    THEME url=string SEMICOLON?
    ;

themesStatement:
    THEMES string+ SEMICOLON?
    ;

brandingBlock:
    BRANDING LBRACE brandingStatement* RBRACE
    ;

brandingStatement:
    LOGO value=string SEMICOLON?
    | FONT value=string SEMICOLON?
    ;

terminologyBlock:
    TERMINOLOGY LBRACE terminologyEntry* RBRACE
    ;

terminologyEntry:
    key=identifier value=string SEMICOLON?
    ;

configurationBlock:
    CONFIGURATION LBRACE configurationEntry* RBRACE
    ;

configurationEntry:
    (SCOPE | VISIBILITY) value=string SEMICOLON?
    ;

// --- Styles ---

styles:
    STYLES LBRACE stylesBody* RBRACE
    ;

stylesBody:
    elementStyle
    | relationshipStyle
    ;

elementStyle:
    ELEMENT tag=string LBRACE elementStyleProperty* RBRACE
    ;

elementStyleProperty:
    ( BACKGROUND color=string
    | COLOR color=string
    | COLOUR color=string
    | STROKE color=string
    | SHAPE shape=string
    | FONT_SIZE size=string
    | BORDER border=string
    | OPACITY opacity=string
    | ICON icon=string
    | WIDTH width=string
    | HEIGHT height=string
    | STROKE_WIDTH strokeWidth=string
    | ICON_POSITION iconPosition=string
    | METADATA metadata=string
    | unknownProperty
    ) SEMICOLON?
    ;

relationshipStyle:
    RELATIONSHIP tag=string LBRACE relationshipStyleProperty* RBRACE
    ;

relationshipStyleProperty:
    ( COLOR color=string
    | COLOUR color=string
    | THICKNESS thickness=string
    | DASHED dashed=string
    | ROUTING routing=string
    | FONT_SIZE size=string
    | STYLE_PROP style=string
    | POSITION position=string
    | OPACITY opacity=string
    | WIDTH width=string
    | unknownProperty
    ) SEMICOLON?
    ;

unknownProperty:
    identifier (identifier | string)*
    ;

// --- Core types ---

string:
    STRING_LITERAL
    | IDENTIFIER
    | HASH_COLOR
    ;

identifier:
    IDENTIFIER
    | ASTERISK
    | GROUP
    | EXTENDS
    | DYNAMIC
    | DEPLOYMENT
    | DEPLOYMENT_ENVIRONMENT
    | DEPLOYMENT_NODE
    | INFRASTRUCTURE_NODE
    | FILTERED
    | IMAGE
    | CUSTOM
    | INCLUDE
    | EXCLUDE
    | THEME
    | THEMES
    | BRANDING
    | LOGO
    | FONT
    | TERMINOLOGY
    | CONFIGURATION
    | SCOPE
    | VISIBILITY
    | URL
    | TAGS
    | PROPERTIES
    | PERSPECTIVES
    | PERSON
    | SOFTWARE_SYSTEM
    | CONTAINER
    | COMPONENT
    | RELATIONSHIP
    | ELEMENT
    | STYLE_PROP
    | POSITION
    | METADATA
    | ICON
    | WIDTH
    | HEIGHT
    | STROKE_WIDTH
    | ICON_POSITION
    | OPACITY
    | BORDER
    | BACKGROUND
    | COLOR
    | COLOUR
    | STROKE
    | SHAPE
    | DASHED
    | ROUTING
    | THICKNESS
    | FONT_SIZE
    ;

tagsDef:
    LBRACKET string (COMMA? string)* RBRACKET
    ;


// ========================================================== //
// LEXER RULES                                                //
// ========================================================== //

LBRACE      : '{' ;
RBRACE      : '}' ;
LBRACKET    : '[' ;
RBRACKET    : ']' ;
EQUALS      : '=' ;
ARROW       : '->' ;
ASTERISK    : '*' ;
SEMICOLON   : ';' ;
COMMA       : ',' ;

// Directives (must come before IDENTIFIER to take priority)
BANG_INCLUDE                : '!include' ;
BANG_IDENTIFIERS            : '!identifiers' ;
BANG_CONST                  : '!const' ;
BANG_VAR                    : '!var' ;
BANG_IMPLIED_RELATIONSHIPS  : '!impliedRelationships' ;
BANG_DOCS                   : '!docs' ;
BANG_ADRS                   : '!adrs' ;
BANG_REF                    : '!ref' ;

// Keywords
WORKSPACE               : 'workspace' ;
EXTENDS                 : 'extends' ;
MODEL                   : 'model' ;
VIEWS                   : 'views' ;
PERSON                  : 'person' ;
SOFTWARE_SYSTEM         : 'softwareSystem' ;
CONTAINER               : 'container' ;
COMPONENT               : 'component' ;
GROUP                   : 'group' ;
SYSTEM_LANDSCAPE        : 'systemLandscape' ;
SYSTEM_CONTEXT          : 'systemContext' ;
DYNAMIC                 : 'dynamic' ;
DEPLOYMENT              : 'deployment' ;
FILTERED                : 'filtered' ;
IMAGE                   : 'image' ;
CUSTOM                  : 'custom' ;
DEPLOYMENT_ENVIRONMENT  : 'deploymentEnvironment' ;
DEPLOYMENT_NODE         : 'deploymentNode' ;
INFRASTRUCTURE_NODE     : 'infrastructureNode' ;
SOFTWARE_SYSTEM_INSTANCE: 'softwareSystemInstance' ;
CONTAINER_INSTANCE      : 'containerInstance' ;
DEPLOYMENT_GROUP        : 'deploymentGroup' ;
STYLES                  : 'styles' ;
ELEMENT                 : 'element' ;
RELATIONSHIP            : 'relationship' ;
INCLUDE                 : 'include' ;
EXCLUDE                 : 'exclude' ;
AUTO_LAYOUT             : 'autoLayout' ;
TITLE                   : 'title' ;
DESCRIPTION             : 'description' ;
ANIMATION               : 'animation' ;

// Body block keywords
URL                     : 'url' ;
TAGS                    : 'tags' ;
PROPERTIES              : 'properties' ;
PERSPECTIVES            : 'perspectives' ;

// Style properties
BACKGROUND              : 'background' ;
COLOR                   : 'color' ;
COLOUR                  : 'colour' ;
STROKE                  : 'stroke' ;
SHAPE                   : 'shape' ;
FONT_SIZE               : 'fontSize' ;
BORDER                  : 'border' ;
OPACITY                 : 'opacity' ;
THICKNESS               : 'thickness' ;
DASHED                  : 'dashed' ;
ROUTING                 : 'routing' ;
ICON                    : 'icon' ;
WIDTH                   : 'width' ;
HEIGHT                  : 'height' ;
STROKE_WIDTH            : 'strokeWidth' ;
ICON_POSITION           : 'iconPosition' ;
METADATA                : 'metadata' ;
STYLE_PROP              : 'style' ;
POSITION                : 'position' ;

// Configuration / views keywords
THEME                   : 'theme' ;
THEMES                  : 'themes' ;
BRANDING                : 'branding' ;
LOGO                    : 'logo' ;
FONT                    : 'font' ;
TERMINOLOGY             : 'terminology' ;
CONFIGURATION           : 'configuration' ;
SCOPE                   : 'scope' ;
VISIBILITY              : 'visibility' ;

// Literals
HASH_COLOR      : '#' [0-9a-fA-F]+ ;

STRING_LITERAL  : '"' (~["\\] | '\\' .)* '"' ;

IDENTIFIER      : [a-zA-Z0-9_] [a-zA-Z0-9_.\-/]* ;

// Whitespace and comments
WS              : [ \t\r\n]+ -> skip ;
LINE_COMMENT    : '//' ~[\r\n]* -> skip ;
BLOCK_COMMENT   : '/*' .*? '*/' -> skip ;
