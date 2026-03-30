grammar StructurizrDsl;

// ========================================================== //
// PARSER RULES                                               //
// ========================================================== //

workspace:
    WORKSPACE name=string? description=string? LBRACE workspaceBody* RBRACE EOF
    ;

workspaceBody:
    model
    | views
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
    ;

elementAssignment:
    identifier EQUALS (person | softwareSystem | container | component)
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
    ;

componentAssignment:
    identifier EQUALS component
    ;

component:
    COMPONENT name=string description=string? technology=string? tags=string? bodyBlock?
    ;

bodyBlock:
    LBRACE relationship* RBRACE
    ;

relationship:
    source=identifier ARROW destination=string description=string? technology=string? tags=string?
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
    | styles
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
    INCLUDE identifier (identifier)*
    ;

excludeStatement:
    EXCLUDE identifier (identifier)*
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

// Keywords
WORKSPACE       : 'workspace' ;
MODEL           : 'model' ;
VIEWS           : 'views' ;
PERSON          : 'person' ;
SOFTWARE_SYSTEM : 'softwareSystem' ;
CONTAINER       : 'container' ;
COMPONENT       : 'component' ;
SYSTEM_LANDSCAPE: 'systemLandscape' ;
SYSTEM_CONTEXT  : 'systemContext' ;
STYLES          : 'styles' ;
ELEMENT         : 'element' ;
RELATIONSHIP    : 'relationship' ;
INCLUDE         : 'include' ;
EXCLUDE         : 'exclude' ;
AUTO_LAYOUT     : 'autoLayout' ;
TITLE           : 'title' ;
DESCRIPTION     : 'description' ;
ANIMATION       : 'animation' ;

// Style properties
BACKGROUND      : 'background' ;
COLOR           : 'color' ;
COLOUR          : 'colour' ;
STROKE          : 'stroke' ;
SHAPE           : 'shape' ;
FONT_SIZE       : 'fontSize' ;
BORDER          : 'border' ;
OPACITY         : 'opacity' ;
THICKNESS       : 'thickness' ;
DASHED          : 'dashed' ;
ROUTING         : 'routing' ;

// Literals
HASH_COLOR      : '#' [0-9a-fA-F]+ ;

STRING_LITERAL  : '"' (~["\\] | '\\' .)* '"' ;

IDENTIFIER      : [a-zA-Z0-9_] [a-zA-Z0-9_.\-/]* ;

// Whitespace and comments
WS              : [ \t\r\n]+ -> skip ;
LINE_COMMENT    : '//' ~[\r\n]* -> skip ;
BLOCK_COMMENT   : '/*' .*? '*/' -> skip ;
