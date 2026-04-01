import * as vscode from "vscode";
import * as path from "path";

function generateNonce(): string {
  let text = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

export class PreviewPanel {
  private static readonly panels = new Map<string, PreviewPanel>();

  private readonly panel: vscode.WebviewPanel;
  private readonly document: vscode.TextDocument;
  private readonly disposables: vscode.Disposable[] = [];
  private pendingUpdate: ReturnType<typeof setTimeout> | null = null;

  static createOrShow(
    context: vscode.ExtensionContext,
    document: vscode.TextDocument
  ): void {
    const key = document.uri.toString();
    const existing = PreviewPanel.panels.get(key);
    if (existing) {
      existing.panel.reveal(vscode.ViewColumn.Beside);
      return;
    }
    new PreviewPanel(context, document);
  }

  private constructor(
    context: vscode.ExtensionContext,
    document: vscode.TextDocument
  ) {
    this.document = document;

    this.panel = vscode.window.createWebviewPanel(
      "d3c4Preview",
      `d3c4: ${path.basename(document.fileName)}`,
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, "dist", "webview"),
        ],
        retainContextWhenHidden: true,
      }
    );

    const key = document.uri.toString();
    PreviewPanel.panels.set(key, this);

    this.panel.webview.html = this.buildHtml(context);
    this.sendUpdate();

    this.disposables.push(
      vscode.workspace.onDidSaveTextDocument((doc) => {
        if (doc.uri.toString() !== key) return;
        this.sendUpdate();
      }),

      vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.document.uri.toString() !== key) return;
        const mode = vscode.workspace
          .getConfiguration("d3c4.preview")
          .get<string>("updateMode", "onSave");
        if (mode === "onType") {
          this.scheduleUpdate();
        }
      }),

      this.panel.onDidDispose(() => this.dispose())
    );
  }

  private scheduleUpdate(): void {
    const delay = vscode.workspace
      .getConfiguration("d3c4.preview")
      .get<number>("debounceDelay", 300);
    if (this.pendingUpdate !== null) clearTimeout(this.pendingUpdate);
    this.pendingUpdate = setTimeout(() => {
      this.pendingUpdate = null;
      this.sendUpdate();
    }, delay);
  }

  private sendUpdate(): void {
    this.panel.webview.postMessage({
      type: "update",
      content: this.document.getText(),
    });
  }

  private buildHtml(context: vscode.ExtensionContext): string {
    const scriptUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(
        context.extensionUri,
        "dist",
        "webview",
        "index.js"
      )
    );
    const nonce = generateNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline';" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--vscode-editor-background, #1e1e1e);
      color: var(--vscode-editor-foreground, #d4d4d4);
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    #toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 5px 10px;
      background: var(--vscode-editorGroupHeader-tabsBackground, #252526);
      border-bottom: 1px solid var(--vscode-editorGroup-border, #444);
      flex-shrink: 0;
    }
    #view-label {
      font-size: 11px;
      color: var(--vscode-descriptionForeground, #888);
      white-space: nowrap;
    }
    #view-select {
      background: var(--vscode-dropdown-background, #3c3c3c);
      color: var(--vscode-dropdown-foreground, #f0f0f0);
      border: 1px solid var(--vscode-dropdown-border, #555);
      padding: 2px 6px;
      font-size: 12px;
      border-radius: 2px;
      cursor: pointer;
    }
    #error {
      display: none;
      padding: 10px 14px;
      color: var(--vscode-editorError-foreground, #f14c4c);
      background: var(--vscode-inputValidation-errorBackground, rgba(255,0,0,0.08));
      border-bottom: 1px solid var(--vscode-inputValidation-errorBorder, #be1100);
      font-size: 12px;
      font-family: var(--vscode-editor-font-family, monospace);
      white-space: pre-wrap;
      flex-shrink: 0;
      max-height: 120px;
      overflow-y: auto;
    }
    #diagram {
      flex: 1;
      overflow: hidden;
      position: relative;
    }
    #diagram svg {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="toolbar">
    <span id="view-label">View:</span>
    <select id="view-select"></select>
  </div>
  <div id="error"></div>
  <div id="diagram"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }

  dispose(): void {
    if (this.pendingUpdate !== null) clearTimeout(this.pendingUpdate);
    PreviewPanel.panels.delete(this.document.uri.toString());
    this.panel.dispose();
    this.disposables.forEach((d) => d.dispose());
  }
}
