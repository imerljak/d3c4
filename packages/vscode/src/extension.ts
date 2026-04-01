import * as vscode from "vscode";
import { registerDiagnostics } from "./diagnostics.js";
import { PreviewPanel } from "./preview.js";

export function activate(context: vscode.ExtensionContext): void {
  registerDiagnostics(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("d3c4.helloWorld", () => {
      vscode.window.showInformationMessage("Hello from d3c4!");
    }),

    vscode.commands.registerCommand("d3c4.openPreview", () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage(
          "d3c4: Open a .dsl file first to preview it."
        );
        return;
      }
      if (editor.document.languageId !== "structurizr") {
        vscode.window.showWarningMessage(
          "d3c4: Preview is only available for Structurizr DSL (.dsl) files."
        );
        return;
      }
      PreviewPanel.createOrShow(context, editor.document);
    })
  );
}

export function deactivate(): void {}
