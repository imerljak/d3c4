import { dia } from 'jointjs';

export interface SvgCanvasOptions {
  zoom?: boolean;
  pan?: boolean;
  minZoom?: number;
  maxZoom?: number;
  width?: number | 'auto';
  height?: number | 'auto';
}

/**
 * Owns the <svg> element, zoom/pan behaviour, and VSCode WebView compatibility.
 *
 * Backed by a JointJS `dia.Paper`. No D3 dependency.
 *
 * Public API for Renderer.ts:
 *   - `svg`   — the raw SVG element (for onRenderComplete export)
 *   - `graph` — JointJS graph (pass to ElementRenderer / RelationshipRenderer)
 *   - `paper` — JointJS paper (pass to event handlers)
 *   - `fitToView()`, `zoomTo()`, `destroy()`
 */
export class SvgCanvas {
  /** The raw SVG element created by JointJS Paper. */
  readonly svg: SVGSVGElement;

  /** JointJS graph — add dia.Element/dia.Link cells here to render them. */
  readonly graph: dia.Graph;

  /** JointJS paper — use for Paper event subscriptions and scaling. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly paper: any; // dia.Paper — typed as any to access Backbone internals

  private readonly container: HTMLElement;
  private readonly options: SvgCanvasOptions;

  // Current viewport transform state
  private scale = 1.0;
  private tx = 0;
  private ty = 0;

  constructor(container: HTMLElement, options: SvgCanvasOptions = {}) {
    this.container = container;
    this.options = options;

    const w = resolveSize(options.width, container.clientWidth || 800);
    const h = resolveSize(options.height, container.clientHeight || 600);

    // Remove any SVG left by a previous SvgCanvas instance
    container.querySelectorAll('svg.d3c4-svg').forEach((el) => el.remove());

    // dia.Paper creates the SVG and appends it to the container
    this.graph = new dia.Graph();
    this.paper = new dia.Paper({
      el: container,
      model: this.graph,
      width: w,
      height: h,
      background: { color: '#ffffff' },
      interactive: { elementMove: true, addLinkFromMagnet: false },
      gridSize: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const svgEl = this.paper.svg as SVGSVGElement;
    svgEl.classList.add('d3c4-svg');
    svgEl.style.display = 'block';
    svgEl.setAttribute('width', '100%');
    svgEl.setAttribute('height', '100%');
    this.svg = svgEl;

    // Transparent background rect for pan hit-testing
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.classList.add('d3c4-bg');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', 'transparent');
    bg.setAttribute('pointer-events', 'all');
    svgEl.insertBefore(bg, svgEl.firstChild);

    if (options.zoom !== false || options.pan !== false) {
      this.setupZoomPan();
    }
  }

  /**
   * Fit the graph cell contents into the visible SVG viewport.
   * Uses the Paper's content bounding box so JointJS cells are included.
   */
  fitToView(_duration = 300): void {
    let bbox: { x: number; y: number; width: number; height: number };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      bbox = (this.paper as any).getContentBBox();
    } catch {
      return;
    }
    if (!bbox || bbox.width === 0 || bbox.height === 0) return;

    const svgRect = this.svg.getBoundingClientRect();
    const svgW = svgRect.width || 800;
    const svgH = svgRect.height || 600;
    const padding = 40;

    const newScale = Math.min(
      (svgW - padding * 2) / bbox.width,
      (svgH - padding * 2) / bbox.height,
      1,
    );
    const newTx = (svgW - bbox.width * newScale) / 2 - bbox.x * newScale;
    const newTy = (svgH - bbox.height * newScale) / 2 - bbox.y * newScale;

    this.applyTransform(newScale, newTx, newTy);
  }

  zoomTo(newScale: number, _duration = 300): void {
    this.applyTransform(newScale, this.tx, this.ty);
  }

  destroy(): void {
    this.paper.remove();
  }

  // ── Private helpers ─────────────────────────────────────────────────────────

  private applyTransform(newScale: number, newTx: number, newTy: number): void {
    this.scale = newScale;
    this.tx = newTx;
    this.ty = newTy;
    // SVG matrix form: translate(tx, ty) * scale(s) = [s, 0, 0, s, tx, ty]
    this.paper.matrix({ a: newScale, b: 0, c: 0, d: newScale, e: newTx, f: newTy });
  }

  private setupZoomPan(): void {
    const { zoom = true, pan = true, minZoom = 0.1, maxZoom = 4 } = this.options;
    const svgEl = this.svg;

    if (zoom) {
      svgEl.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();
        const rect = svgEl.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        const newScale = Math.max(minZoom, Math.min(maxZoom, this.scale * factor));
        this.applyTransform(
          newScale,
          mouseX - (mouseX - this.tx) * (newScale / this.scale),
          mouseY - (mouseY - this.ty) * (newScale / this.scale),
        );
      }, { passive: false });
    }

    if (pan) {
      let isPanning = false;
      let startX = 0, startY = 0, startTx = 0, startTy = 0;

      svgEl.addEventListener('pointerdown', (e: PointerEvent) => {
        const target = e.target as Element;
        if (!target.classList.contains('d3c4-bg') && target !== svgEl) return;
        isPanning = true;
        startX = e.clientX; startY = e.clientY;
        startTx = this.tx;  startTy = this.ty;
        svgEl.setPointerCapture(e.pointerId);
        svgEl.style.cursor = 'grabbing';
      });

      svgEl.addEventListener('pointermove', (e: PointerEvent) => {
        if (!isPanning) return;
        this.applyTransform(this.scale, startTx + e.clientX - startX, startTy + e.clientY - startY);
      });

      const stopPan = () => { if (!isPanning) return; isPanning = false; svgEl.style.cursor = ''; };
      svgEl.addEventListener('pointerup', stopPan);
      svgEl.addEventListener('pointercancel', stopPan);
    }
  }
}

function resolveSize(size: number | 'auto' | undefined, fallback: number): number {
  if (size === undefined || size === 'auto') return fallback;
  return size;
}
