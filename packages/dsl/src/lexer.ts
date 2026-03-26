import { DslParseError } from './errors.js';

export type TokenType =
  | 'IDENTIFIER'
  | 'STRING'
  | 'LBRACE'
  | 'RBRACE'
  | 'LBRACKET'
  | 'RBRACKET'
  | 'ARROW'
  | 'EQUALS'
  | 'HASH_COLOR'
  | 'SEMICOLON'
  | 'EOF';

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;
  let line = 1;
  let lineStart = 0;

  function col(): number {
    return pos - lineStart + 1;
  }

  function peek(offset = 0): string {
    return input[pos + offset] ?? '';
  }

  function advance(): string {
    const ch = input[pos++] ?? '';
    if (ch === '\n') {
      line++;
      lineStart = pos;
    }
    return ch;
  }

  while (pos < input.length) {
    // Skip whitespace
    if (/\s/.test(peek())) {
      advance();
      continue;
    }

    // Skip line comments (// ...)
    if (peek() === '/' && peek(1) === '/') {
      while (pos < input.length && peek() !== '\n') advance();
      continue;
    }

    // Skip block comments (/* ... */)
    if (peek() === '/' && peek(1) === '*') {
      advance(); advance(); // consume /*
      while (pos < input.length) {
        if (peek() === '*' && peek(1) === '/') {
          advance(); advance();
          break;
        }
        advance();
      }
      continue;
    }

    const startLine = line;
    const startCol = col();

    // Structural characters
    if (peek() === '{') { advance(); tokens.push({ type: 'LBRACE', value: '{', line: startLine, column: startCol }); continue; }
    if (peek() === '}') { advance(); tokens.push({ type: 'RBRACE', value: '}', line: startLine, column: startCol }); continue; }
    if (peek() === '[') { advance(); tokens.push({ type: 'LBRACKET', value: '[', line: startLine, column: startCol }); continue; }
    if (peek() === ']') { advance(); tokens.push({ type: 'RBRACKET', value: ']', line: startLine, column: startCol }); continue; }
    if (peek() === '=') { advance(); tokens.push({ type: 'EQUALS', value: '=', line: startLine, column: startCol }); continue; }
    if (peek() === ';') { advance(); tokens.push({ type: 'SEMICOLON', value: ';', line: startLine, column: startCol }); continue; }

    // Arrow ->
    if (peek() === '-' && peek(1) === '>') {
      advance(); advance();
      tokens.push({ type: 'ARROW', value: '->', line: startLine, column: startCol });
      continue;
    }

    // Hex color #rrggbb
    if (peek() === '#') {
      advance(); // consume #
      let hex = '';
      while (/[0-9a-fA-F]/.test(peek()) && hex.length < 6) hex += advance();
      tokens.push({ type: 'HASH_COLOR', value: '#' + hex, line: startLine, column: startCol });
      continue;
    }

    // Quoted string
    if (peek() === '"') {
      advance(); // opening quote
      let str = '';
      while (pos < input.length && peek() !== '"') {
        if (peek() === '\\') {
          advance(); // backslash
          const esc = advance();
          if (esc === 'n') str += '\n';
          else if (esc === 't') str += '\t';
          else str += esc;
        } else {
          str += advance();
        }
      }
      if (pos >= input.length) throw new DslParseError('Unterminated string', startLine, startCol);
      advance(); // closing quote
      tokens.push({ type: 'STRING', value: str, line: startLine, column: startCol });
      continue;
    }

    // Wildcard * (used in "include *")
    if (peek() === '*') {
      advance();
      tokens.push({ type: 'IDENTIFIER', value: '*', line: startLine, column: startCol });
      continue;
    }

    // Identifier / keyword (letters, digits, underscore, dot, /, -)
    if (/[a-zA-Z_]/.test(peek())) {
      let ident = '';
      while (/[a-zA-Z0-9_.\-/]/.test(peek())) ident += advance();
      tokens.push({ type: 'IDENTIFIER', value: ident, line: startLine, column: startCol });
      continue;
    }

    throw new DslParseError(`Unexpected character: '${peek()}'`, startLine, startCol);
  }

  tokens.push({ type: 'EOF', value: '', line, column: col() });
  return tokens;
}
