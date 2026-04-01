import { parseDsl } from "@d3c4/dsl";
import { WorkspaceParser, Renderer } from "@d3c4/core";
import type { StructurizrWorkspace, DiagramView } from "@d3c4/core";

// VS Code webview API — injected by the host at runtime
declare function acquireVsCodeApi(): {
  postMessage: (msg: unknown) => void;
  getState: () => unknown;
  setState: (state: unknown) => void;
};

// Must be called exactly once
const vscode = acquireVsCodeApi();

const diagramEl = document.getElementById("diagram") as HTMLDivElement;
const errorEl = document.getElementById("error") as HTMLDivElement;
const viewSelect = document.getElementById("view-select") as HTMLSelectElement;

let renderer: Renderer | null = null;
let currentViewKey: string | null = null;

// ── View selector ─────────────────────────────────────────────────────────────

viewSelect.addEventListener("change", () => {
  if (!renderer || !viewSelect.value) return;
  currentViewKey = viewSelect.value;
  renderer.render(currentViewKey);
  vscode.setState({ viewKey: currentViewKey });
});

// ── Message handler ───────────────────────────────────────────────────────────

window.addEventListener("message", (event: MessageEvent) => {
  const msg = event.data as { type: string; content?: string };
  if (msg.type === "update" && msg.content !== undefined) {
    handleUpdate(msg.content);
  }
});

// ── Core update logic ─────────────────────────────────────────────────────────

function handleUpdate(content: string): void {
  let workspace: StructurizrWorkspace;
  let views: DiagramView[];

  try {
    workspace = parseDsl(content);
    const resolved = new WorkspaceParser().parse(workspace);
    views = resolved.views;
  } catch (err) {
    showError(err instanceof Error ? err.message : String(err));
    return;
  }

  showError(null);
  populateViewSelector(views);

  // Restore previously selected view if still valid; otherwise use first
  const savedKey = (vscode.getState() as { viewKey?: string } | null)
    ?.viewKey;
  const targetKey =
    savedKey && views.some((v) => v.key === savedKey)
      ? savedKey
      : (views[0]?.key ?? null);

  if (targetKey && viewSelect.value !== targetKey) {
    viewSelect.value = targetKey;
  }
  currentViewKey = targetKey;

  if (!renderer) {
    if (!targetKey) return;
    renderer = new Renderer(diagramEl, workspace, { viewKey: targetKey });
  } else {
    renderer.update(workspace);
    if (currentViewKey) renderer.render(currentViewKey);
  }
}

function populateViewSelector(views: DiagramView[]): void {
  const prev = viewSelect.value;

  viewSelect.innerHTML = views
    .map((v) => {
      const label = v.title ?? v.key;
      const escaped = label.replace(/"/g, "&quot;");
      return `<option value="${v.key}">${escaped}</option>`;
    })
    .join("");

  // Restore selection if the view still exists
  if (views.some((v) => v.key === prev)) {
    viewSelect.value = prev;
  }
}

// ── Error display ─────────────────────────────────────────────────────────────

function showError(message: string | null): void {
  if (message) {
    // Strip the verbose "[DSL Parse Error] Line X, Col Y:" prefix
    const clean = message
      .replace(/^\[DSL Parse Error\] Line \d+, Col \d+:\s*/, "")
      .trim();
    errorEl.textContent = clean;
    errorEl.style.display = "block";
  } else {
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }
}
