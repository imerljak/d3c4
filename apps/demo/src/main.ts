import { parseDsl } from '@d3c4/dsl';
import { Renderer } from '@d3c4/core';
import BIGBANK_DSL from './fixtures/bigbank.dsl?raw';

// ─── State ────────────────────────────────────────────────────────────────────
let renderer: Renderer | null = null;

// ─── DOM references ───────────────────────────────────────────────────────────
const dslTextarea = document.getElementById('dsl-input') as HTMLTextAreaElement;
const renderBtn = document.getElementById('render-btn') as HTMLButtonElement;
const viewSelect = document.getElementById('view-select') as HTMLSelectElement;
const diagramContainer = document.getElementById('diagram') as HTMLDivElement;
const errorEl = document.getElementById('error') as HTMLDivElement;
const fitBtn = document.getElementById('fit-btn') as HTMLButtonElement;

// ─── Initialize ───────────────────────────────────────────────────────────────
dslTextarea.value = BIGBANK_DSL;

function renderDiagram() {
  errorEl.textContent = '';
  errorEl.style.display = 'none';

  try {
    const dsl = dslTextarea.value.trim();
    const workspace = parseDsl(dsl);

    // Populate view selector
    const allViews = [
      ...(workspace.views.systemLandscapeViews ?? []),
      ...(workspace.views.systemContextViews ?? []),
      ...(workspace.views.containerViews ?? []),
      ...(workspace.views.componentViews ?? []),
    ];

    viewSelect.innerHTML = '';
    for (const v of allViews) {
      const opt = document.createElement('option');
      opt.value = v.key;
      opt.textContent = v.title ?? v.key;
      viewSelect.appendChild(opt);
    }

    const viewKey = viewSelect.value || allViews[0]?.key;
    if (!viewKey) throw new Error('No views defined in workspace');

    if (renderer) {
      renderer.destroy();
    }

    renderer = new Renderer(diagramContainer, workspace, {
      viewKey,
      fitOnRender: true,
      onElementClick: (el) => {
        console.log('[d3c4] Element clicked:', el.name, el.type);
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    console.error('[d3c4 demo]', err);
  }
}

viewSelect.addEventListener('change', () => {
  renderer?.render(viewSelect.value);
});

renderBtn.addEventListener('click', () => {
    renderer?.update(parseDsl(dslTextarea.value))
});

fitBtn.addEventListener('click', () => {
  renderer?.fitToView();
});

// Auto-render on load
renderDiagram();
