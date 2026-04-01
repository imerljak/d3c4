import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    "d3c4.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello from d3c4!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
