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
