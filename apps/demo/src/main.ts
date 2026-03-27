import { parseDsl } from '@d3c4/dsl';
import { Renderer, ForceRenderer } from '@d3c4/core';
import BIGBANK_DSL from './fixtures/bigbank.dsl?raw';

// ─── State ────────────────────────────────────────────────────────────────────
type RenderMode = 'dagre' | 'force';
let renderer: Renderer | ForceRenderer | null = null;
let mode: RenderMode = 'dagre';

// ─── DOM references ───────────────────────────────────────────────────────────
const dslTextarea = document.getElementById('dsl-input') as HTMLTextAreaElement;
const renderBtn = document.getElementById('render-btn') as HTMLButtonElement;
const viewSelect = document.getElementById('view-select') as HTMLSelectElement;
const diagramContainer = document.getElementById('diagram') as HTMLDivElement;
const errorEl = document.getElementById('error') as HTMLDivElement;
const fitBtn = document.getElementById('fit-btn') as HTMLButtonElement;
const modeDagreBtn = document.getElementById('mode-dagre') as HTMLButtonElement;
const modeForceBtn = document.getElementById('mode-force') as HTMLButtonElement;

// ─── Initialize ───────────────────────────────────────────────────────────────
dslTextarea.value = BIGBANK_DSL;

function setMode(next: RenderMode) {
  mode = next;
  modeDagreBtn.style.background = next === 'dagre' ? '#1168bd' : 'transparent';
  modeDagreBtn.style.color = next === 'dagre' ? '#fff' : '#555';
  modeForceBtn.style.background = next === 'force' ? '#1168bd' : 'transparent';
  modeForceBtn.style.color = next === 'force' ? '#fff' : '#555';
}

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

    renderer?.destroy();

    if (mode === 'force') {
      renderer = new ForceRenderer(diagramContainer, workspace, {
        viewKey,
        zoom: true,
        pan: true,
        onElementClick: (el) => {
          console.log('[d3c4] Element clicked:', el.name, el.type);
        },
        onNavigate: (key) => {
          viewSelect.value = key;
        },
      });
    } else {
      renderer = new Renderer(diagramContainer, workspace, {
        viewKey,
        fitOnRender: true,
        onElementClick: (el) => {
          console.log('[d3c4] Element clicked:', el.name, el.type);
        },
        onNavigate: (key) => {
          viewSelect.value = key;
        },
      });
    }
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
  renderer?.update(parseDsl(dslTextarea.value));
});

fitBtn.addEventListener('click', () => {
  if (renderer instanceof Renderer) renderer.fitToView();
});

modeDagreBtn.addEventListener('click', () => {
  if (mode === 'dagre') return;
  setMode('dagre');
  renderDiagram();
});

modeForceBtn.addEventListener('click', () => {
  if (mode === 'force') return;
  setMode('force');
  renderDiagram();
});

// Auto-render on load
renderDiagram();
