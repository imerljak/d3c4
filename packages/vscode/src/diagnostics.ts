import * as vscode from "vscode";
import { parseDsl, DslParseError } from "@d3c4/dsl";

const STRUCTURIZR_LANGUAGE = "structurizr";

let diagnosticCollection: vscode.DiagnosticCollection | undefined;

const pendingValidations = new Map<string, ReturnType<typeof setTimeout>>();

function validate(document: vscode.TextDocument): void {
  if (document.languageId !== STRUCTURIZR_LANGUAGE) return;

  const uri = document.uri.toString();
  const existing = pendingValidations.get(uri);
  if (existing) clearTimeout(existing);

  const delay =
    vscode.workspace
      .getConfiguration("d3c4.preview")
      .get<number>("debounceDelay") ?? 300;

  pendingValidations.set(
    uri,
    setTimeout(() => {
      pendingValidations.delete(uri);
      runValidation(document);
    }, delay)
  );
}

function runValidation(document: vscode.TextDocument): void {
  const diagnostics: vscode.Diagnostic[] = [];

  try {
    parseDsl(document.getText());
  } catch (err) {
    if (err instanceof DslParseError) {
      // line and column are 1-based; VS Code Range is 0-based
      const line = Math.max(0, err.line - 1);
      const col = Math.max(0, err.column - 1);
      const range = new vscode.Range(line, col, line, col + 1);
      const diagnostic = new vscode.Diagnostic(
        range,
        humanReadableMessage(err.message),
        vscode.DiagnosticSeverity.Error
      );
      diagnostic.source = "d3c4";
      diagnostics.push(diagnostic);
    }
  }

  diagnosticCollection?.set(document.uri, diagnostics);
}

function humanReadableMessage(raw: string): string {
  // Strip the "[DSL Parse Error] Line X, Col Y: " prefix added by DslParseError
  return raw.replace(/^\[DSL Parse Error\] Line \d+, Col \d+:\s*/, "").trim();
}

export function registerDiagnostics(
  context: vscode.ExtensionContext
): void {
  diagnosticCollection =
    vscode.languages.createDiagnosticCollection("d3c4");
  context.subscriptions.push(diagnosticCollection);

  // Validate the currently open editors on activation
  vscode.workspace.textDocuments.forEach(validate);

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(validate),
    vscode.workspace.onDidChangeTextDocument((e) => validate(e.document)),
    vscode.workspace.onDidCloseTextDocument((doc) => {
      diagnosticCollection?.delete(doc.uri);
      const uri = doc.uri.toString();
      const pending = pendingValidations.get(uri);
      if (pending) {
        clearTimeout(pending);
        pendingValidations.delete(uri);
      }
    })
  );
}
