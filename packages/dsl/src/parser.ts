import { CharStream, CommonTokenStream, BaseErrorListener, Recognizer, Token, RecognitionException } from 'antlr4ng';
import { StructurizrDslLexer } from './generated/StructurizrDslLexer.js';
import { StructurizrDslParser } from './generated/StructurizrDslParser.js';
import { WorkspaceVisitor, DslParseError } from './visitor.js';
import type { StructurizrWorkspace } from '@d3c4/types';

class DslErrorListener extends BaseErrorListener {
  syntaxError(
    recognizer: Recognizer<any>,
    offendingSymbol: Token | null,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | null
  ): void {
    throw new DslParseError(msg, line, charPositionInLine + 1);
  }
}

export function parseDsl(dsl: string): StructurizrWorkspace {
  const inputStream = CharStream.fromString(dsl);
  const lexer = new StructurizrDslLexer(inputStream);

  const errorListener = new DslErrorListener();
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);

  const tokenStream = new CommonTokenStream(lexer);
  const parser = new StructurizrDslParser(tokenStream);

  parser.removeErrorListeners();
  parser.addErrorListener(errorListener);

  const tree = parser.workspace();

  const visitor = new WorkspaceVisitor();
  return visitor.visitWorkspace(tree);
}

