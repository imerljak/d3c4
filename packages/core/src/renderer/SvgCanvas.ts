import * as d3 from 'd3';

export interface SvgCanvasOptions {
  zoom?: boolean;
  pan?: boolean;
  minZoom?: number;
  maxZoom?: number;
  width?: number | 'auto';
  height?: number | 'auto';
}

/**
 * Owns the <svg> element, zoom/pan behavior, and VSCode WebView compatibility.
 */
export class SvgCanvas {
  readonly svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  readonly defs: d3.Selection<SVGDefsElement, unknown, null, undefined>;
  readonly canvas: d3.Selection<SVGGElement, unknown, null, undefined>;

  private zoomBehavior: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null;
  private container: HTMLElement;
  private options: SvgCanvasOptions;

  constructor(container: HTMLElement, options: SvgCanvasOptions = {}) {
    this.container = container;
    this.options = options;

    // Remove any existing SVG
    d3.select(container).selectAll('svg.d3c4-svg').remove();

    const w = this.resolveSize(options.width, container.clientWidth || 800);
    const h = this.resolveSize(options.height, container.clientHeight || 600);

    this.svg = d3
      .select(container)
      .append<SVGSVGElement>('svg')
      .attr('class', 'd3c4-svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('display', 'block');

    this.defs = this.svg.append('defs');

    // Background rect for click-to-deselect and fill
    this.svg
      .append('rect')
      .attr('class', 'd3c4-bg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', '#ffffff');

    // The canvas group is the zoom/pan target
    this.canvas = this.svg.append<SVGGElement>('g').attr('class', 'd3c4-canvas');

    if (options.zoom !== false || options.pan !== false) {
      this.zoomBehavior = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([options.minZoom ?? 0.1, options.maxZoom ?? 4])
        .on('zoom', (event) => {
          this.canvas.attr('transform', event.transform.toString());
        });
      this.svg.call(this.zoomBehavior);
    }
  }

  /**
   * Fit the canvas contents into the visible SVG viewport with an animated transition.
   */
  fitToView(duration = 300): void {
    if (!this.zoomBehavior) return;
    const canvasNode = this.canvas.node();
    if (!canvasNode) return;

    const svgNode = this.svg.node();
    if (!svgNode) return;

    // Use getBBox to get the actual rendered bounding box of content
    let bbox: DOMRect | SVGRect;
    try {
      bbox = canvasNode.getBBox();
    } catch {
      return;
    }

    if (bbox.width === 0 || bbox.height === 0) return;

    const svgRect = svgNode.getBoundingClientRect();
    const svgW = svgRect.width || 800;
    const svgH = svgRect.height || 600;
    const padding = 40;

    const scale = Math.min(
      (svgW - padding * 2) / bbox.width,
      (svgH - padding * 2) / bbox.height,
      1,
    );

    const tx = (svgW - bbox.width * scale) / 2 - bbox.x * scale;
    const ty = (svgH - bbox.height * scale) / 2 - bbox.y * scale;

    this.svg
      .transition()
      .duration(duration)
      .call(
        this.zoomBehavior!.transform,
        d3.zoomIdentity.translate(tx, ty).scale(scale),
      );
  }

  zoomTo(scale: number, duration = 300): void {
    if (!this.zoomBehavior) return;
    this.svg
      .transition()
      .duration(duration)
      .call(this.zoomBehavior.scaleTo, scale);
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

    // VSCode WebView uses vscode-webview:// base URL which breaks url(#id) references
    const href =
      typeof window !== 'undefined' && window.location?.href?.startsWith('vscode-webview://')
        ? `${window.location.href}#${id}`
        : `#${id}`;

    return `url(${href})`;
  }

  destroy(): void {
    if (this.zoomBehavior) {
      this.svg.on('.zoom', null);
    }
    this.svg.remove();
  }

  private resolveSize(size: number | 'auto' | undefined, fallback: number): number {
    if (size === undefined || size === 'auto') return fallback;
    return size;
  }
}
