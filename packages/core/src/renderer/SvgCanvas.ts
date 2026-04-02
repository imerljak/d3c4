import * as d3 from 'd3';
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
 * Backed by a JointJS `dia.Paper` which creates and owns the SVG element.
 * Zoom/pan are implemented via wheel + pointer events that update the Paper
 * viewport matrix, replacing the previous d3.zoom() behaviour.
 *
 * The `svg`, `defs`, and `canvas` properties remain d3.Selection wrappers over
 * the same underlying SVG DOM nodes, so ElementRenderer and RelationshipRenderer
 * are unaffected.
 */
export class SvgCanvas {
  readonly svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  readonly defs: d3.Selection<SVGDefsElement, unknown, null, undefined>;
  readonly canvas: d3.Selection<SVGGElement, unknown, null, undefined>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly paper: any; // dia.Paper — typed as any to access Backbone internals
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
    const graph = new dia.Graph();
    this.paper = new dia.Paper({
      el: container,
      model: graph,
      width: w,
      height: h,
      background: { color: '#ffffff' },
      // No interactive elements — SvgCanvas renders raw D3 SVG, not JointJS cells
      interactive: false,
      gridSize: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    // ── Retrieve SVG element created by JointJS ─────────────────────────────

    const svgEl = this.paper.svg as SVGSVGElement;
    svgEl.classList.add('d3c4-svg');
    svgEl.style.display = 'block';
    svgEl.setAttribute('width', '100%');
    svgEl.setAttribute('height', '100%');

    this.svg = d3.select<SVGSVGElement, unknown>(svgEl);

    // Reuse the <defs> JointJS already inserted, or create one
    const existingDefs = svgEl.querySelector('defs');
    if (existingDefs) {
      this.defs = d3.select<SVGDefsElement, unknown>(existingDefs as SVGDefsElement);
    } else {
      this.defs = this.svg.insert<SVGDefsElement>('defs', ':first-child');
    }

    // Background rect for click-to-deselect
    this.svg
      .append('rect')
      .attr('class', 'd3c4-bg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'transparent')
      .attr('pointer-events', 'all');

    // ── Canvas group inside the Paper viewport so zoom/pan applies ──────────

    // JointJS Paper exposes the viewport <g> that it transforms on scale/translate
    const viewport = this.paper.viewport as SVGGElement | undefined;
    const canvasEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    canvasEl.setAttribute('class', 'd3c4-canvas');
    if (viewport) {
      // Prepend so our D3 content is drawn behind any JointJS cells
      viewport.insertBefore(canvasEl, viewport.firstChild);
    } else {
      svgEl.appendChild(canvasEl);
    }
    this.canvas = d3.select<SVGGElement, unknown>(canvasEl);

    if (options.zoom !== false || options.pan !== false) {
      this.setupZoomPan();
    }
  }

  /**
   * Fit the canvas contents into the visible SVG viewport.
   * Computes the bbox of the canvas group and updates the Paper viewport matrix.
   */
  fitToView(_duration = 300): void {
    const canvasNode = this.canvas.node();
    if (!canvasNode) return;

    let bbox: SVGRect;
    try {
      bbox = canvasNode.getBBox();
    } catch {
      return;
    }
    if (bbox.width === 0 || bbox.height === 0) return;

    const svgNode = this.svg.node();
    if (!svgNode) return;
    const svgRect = svgNode.getBoundingClientRect();
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

  /**
   * Get or create an arrowhead marker for a given color.
   * Works around VSCode WebView url() base URL issue.
   */
  getArrowMarkerUrl(color: string): string {
    const id = `d3c4-arrow-${color.replace('#', '')}`;

    if (this.defs.select(`#${id}`).empty()) {
      this.defs
        .append('marker')
        .attr('id', id)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 9)
        .attr('refY', 5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', color);
    }

    const href =
      typeof window !== 'undefined' && window.location?.href?.startsWith('vscode-webview://')
        ? `${window.location.href}#${id}`
        : `#${id}`;

    return `url(${href})`;
  }

  destroy(): void {
    this.paper.remove();
  }

  // ── Private helpers ─────────────────────────────────────────────────────────

  /**
   * Apply zoom + pan to the Paper viewport in one atomic matrix update.
   * Stores the new scale/tx/ty for subsequent wheel-zoom centering.
   */
  private applyTransform(newScale: number, newTx: number, newTy: number): void {
    this.scale = newScale;
    this.tx = newTx;
    this.ty = newTy;
    // Set viewport matrix directly: translate(tx, ty) * scale(s, s)
    // SVG matrix form: [a, b, c, d, e, f] = [s, 0, 0, s, tx, ty]
    this.paper.matrix({ a: newScale, b: 0, c: 0, d: newScale, e: newTx, f: newTy });
  }

  private setupZoomPan(): void {
    const { zoom = true, pan = true, minZoom = 0.1, maxZoom = 4 } = this.options;
    const svgEl = this.svg.node()!;

    // ── Wheel zoom ────────────────────────────────────────────────────────────

    if (zoom) {
      svgEl.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();

        // Zoom toward the cursor position
        const rect = svgEl.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        const newScale = Math.max(minZoom, Math.min(maxZoom, this.scale * factor));

        // Keep the point under the cursor stationary:
        //   newTx = mouseX - (mouseX - tx) * (newScale / oldScale)
        const newTx = mouseX - (mouseX - this.tx) * (newScale / this.scale);
        const newTy = mouseY - (mouseY - this.ty) * (newScale / this.scale);

        this.applyTransform(newScale, newTx, newTy);
      }, { passive: false });
    }

    // ── Pointer-drag pan ──────────────────────────────────────────────────────

    if (pan) {
      let isPanning = false;
      let startX = 0;
      let startY = 0;
      let startTx = 0;
      let startTy = 0;

      svgEl.addEventListener('pointerdown', (e: PointerEvent) => {
        // Only pan on background (not on rendered elements)
        const target = e.target as Element;
        if (!target.classList.contains('d3c4-bg') && target !== svgEl) return;
        isPanning = true;
        startX = e.clientX;
        startY = e.clientY;
        startTx = this.tx;
        startTy = this.ty;
        svgEl.setPointerCapture(e.pointerId);
        svgEl.style.cursor = 'grabbing';
      });

      svgEl.addEventListener('pointermove', (e: PointerEvent) => {
        if (!isPanning) return;
        this.applyTransform(
          this.scale,
          startTx + e.clientX - startX,
          startTy + e.clientY - startY,
        );
      });

      const stopPan = () => {
        if (!isPanning) return;
        isPanning = false;
        svgEl.style.cursor = '';
      };
      svgEl.addEventListener('pointerup', stopPan);
      svgEl.addEventListener('pointercancel', stopPan);
    }
  }
}

function resolveSize(size: number | 'auto' | undefined, fallback: number): number {
  if (size === undefined || size === 'auto') return fallback;
  return size;
}
