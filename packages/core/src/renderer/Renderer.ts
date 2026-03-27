import type { StructurizrWorkspace } from '@d3c4/types';
import { WorkspaceParser } from '../parser/WorkspaceParser.js';
import { ViewSelector } from '../parser/ViewSelector.js';
import { LayoutEngine } from '../layout/LayoutEngine.js';
import { SvgCanvas } from './SvgCanvas.js';
import { ElementRenderer } from './ElementRenderer.js';
import { RelationshipRenderer } from './RelationshipRenderer.js';
// import { DragHandler } from './DragHandler.js';
import { NavigationHandler } from './NavigationHandler.js';
import type { ResolvedElement, ResolvedRelationship, ResolvedWorkspace } from '../parser/types.js';

export interface RendererOptions {
  /** Which view to render (must match a view key in the workspace). */
  viewKey: string;
  zoom?: boolean;
  pan?: boolean;
  fitOnRender?: boolean;
  minZoom?: number;
  maxZoom?: number;
  width?: number | 'auto';
  height?: number | 'auto';
  onElementClick?: (element: ResolvedElement) => void;
  onRelationshipClick?: (rel: ResolvedRelationship) => void;
  onRenderComplete?: (result: { svgElement: SVGElement }) => void;
  /** Called when the user double-clicks a navigable element (e.g. to update a view selector in the host UI). */
  onNavigate?: (viewKey: string) => void;
}

/**
 * The main entry point for rendering a Structurizr workspace.
 *
 * Usage:
 * ```ts
 * const renderer = new Renderer(container, workspace, { viewKey: 'SystemContext' });
 * // To switch views:
 * renderer.render('Containers');
 * // To update workspace data:
 * renderer.update(newWorkspace);
 * // Cleanup:
 * renderer.destroy();
 * ```
 */
export class Renderer {
  private container: HTMLElement;
  private options: RendererOptions;
  private workspace: StructurizrWorkspace;
  private currentViewKey: string;
  private resolved: ResolvedWorkspace | null = null;

  private parser: WorkspaceParser;
  private viewSelector: ViewSelector;
  private layoutEngine: LayoutEngine;
  private svgCanvas: SvgCanvas | null = null;
  private elementRenderer: ElementRenderer | null = null;
  private relRenderer: RelationshipRenderer | null = null;
  // private dragHandler: DragHandler | null = null;
  private navigationHandler: NavigationHandler | null = null;

  constructor(
    container: HTMLElement,
    workspace: StructurizrWorkspace,
    options: RendererOptions,
  ) {
    this.container = container;
    this.workspace = workspace;
    this.options = options;
    this.currentViewKey = options.viewKey;

    this.parser = new WorkspaceParser();
    this.viewSelector = new ViewSelector();
    this.layoutEngine = new LayoutEngine();

    this.init();
    this.render(options.viewKey);
  }

  /** Re-render the current (or a different) view. */
  render(viewKey?: string): void {
    if (viewKey) this.currentViewKey = viewKey;
    if (!this.resolved || !this.svgCanvas) return;

    try {
      const resolvedView = this.viewSelector.select(this.resolved, this.currentViewKey);

      // Determine layout direction from view's automaticLayout
      const rawView = this.resolved.views.find((v) => v.key === this.currentViewKey);
      const autoLayout = rawView?.automaticLayout;
      const rankDirection = (
        autoLayout?.rankDirection ? this.mapRankDir(autoLayout.rankDirection) : 'TB'
      ) as 'TB' | 'BT' | 'LR' | 'RL';

      const layoutGraph = this.layoutEngine.layout(resolvedView, {
        rankDirection,
        rankSep: autoLayout?.rankSeparation,
        nodeSep: autoLayout?.nodeSeparation,
      });

      const boundaryElements = resolvedView.elements
        .filter((e) => e.boundary)
        .map((e) => ({ element: e }));

      this.elementRenderer!.render(layoutGraph.nodes, boundaryElements);
      this.relRenderer!.render(layoutGraph.edges);
      // this.dragHandler!.attach(layoutGraph.nodes);
      this.navigationHandler!.attach(layoutGraph.nodes, this.resolved!.views);

      if (this.options.fitOnRender !== false) {
        // Delay fitToView so the DOM has been painted
        setTimeout(() => this.svgCanvas?.fitToView(), 50);
      }

      const svgEl = this.svgCanvas.svg.node();
      if (svgEl) {
        this.options.onRenderComplete?.({ svgElement: svgEl });
      }
    } catch (err) {
      console.error('[d3c4] Render error:', err);
    }
  }

  /** Replace the workspace data and re-render. */
  update(workspace: StructurizrWorkspace): void {
    this.workspace = workspace;
    this.resolved = this.parser.parse(workspace);
    this.render(this.currentViewKey);
  }

  fitToView(duration = 300): void {
    this.svgCanvas?.fitToView(duration);
  }

  zoomTo(scale: number, duration = 300): void {
    this.svgCanvas?.zoomTo(scale, duration);
  }

  /** Get the underlying SVG element (for export to PNG/SVG string). */
  getSvgElement(): SVGElement {
    const el = this.svgCanvas?.svg.node();
    if (!el) throw new Error('[d3c4] Renderer not initialized');
    return el;
  }

  /** Clean up and remove the SVG from the DOM. */
  destroy(): void {
    this.svgCanvas?.destroy();
    this.svgCanvas = null;
    this.elementRenderer = null;
    this.relRenderer = null;
    // this.dragHandler = null;
    this.navigationHandler = null;
    this.resolved = null;
  }

  private init(): void {
    this.resolved = this.parser.parse(this.workspace);

    this.svgCanvas = new SvgCanvas(this.container, {
      zoom: this.options.zoom,
      pan: this.options.pan,
      minZoom: this.options.minZoom,
      maxZoom: this.options.maxZoom,
      width: this.options.width,
      height: this.options.height,
    });

    this.elementRenderer = new ElementRenderer(this.svgCanvas.canvas, {
      onElementClick: this.options.onElementClick,
    });

    this.relRenderer = new RelationshipRenderer(this.svgCanvas.canvas, this.svgCanvas, {
      onRelationshipClick: this.options.onRelationshipClick,
    });

    // this.dragHandler = new DragHandler(this.svgCanvas.canvas);

    this.navigationHandler = new NavigationHandler(
      this.svgCanvas.canvas,
      (viewKey) => {
        this.render(viewKey);
        this.options.onNavigate?.(viewKey);
      },
    );
  }

  private mapRankDir(dir: string): string {
    const map: Record<string, string> = {
      TopBottom: 'TB',
      BottomTop: 'BT',
      LeftRight: 'LR',
      RightLeft: 'RL',
    };
    return map[dir] ?? 'TB';
  }
}
