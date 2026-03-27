import * as d3 from 'd3';
import type { DiagramView, ContainerView, ComponentView } from '@d3c4/types';
import type { LayoutNode } from '../layout/types.js';
import type { ResolvedElement } from '../parser/types.js';

/**
 * Attaches drill-down navigation to rendered elements.
 *
 * Double-clicking a SoftwareSystem navigates to its ContainerView;
 * double-clicking a Container navigates to its ComponentView.
 * Elements that have no related view are unaffected.
 *
 * Call `attach(nodes, views)` after every render.
 */
export class NavigationHandler {
  private canvas: d3.Selection<SVGGElement, unknown, null, undefined>;
  private navigate: (viewKey: string) => void;

  constructor(
    canvas: d3.Selection<SVGGElement, unknown, null, undefined>,
    navigate: (viewKey: string) => void,
  ) {
    this.canvas = canvas;
    this.navigate = navigate;
  }

  attach(nodes: LayoutNode[], views: DiagramView[]): void {
    const navigate = this.navigate;

    this.canvas
      .selectAll<SVGGElement, LayoutNode>('.d3c4-element')
      .each(function (d) {
        const targetKey = findDrillDownView(d.element, views);
        const sel = d3.select<SVGGElement, LayoutNode>(this);

        // Remove any previously registered handler to avoid duplicates on re-render.
        sel.on('dblclick.navigate', null);

        if (!targetKey) return;

        sel
          .style('cursor', 'zoom-in')
          .on('dblclick.navigate', (event) => {
            event.stopPropagation();
            navigate(targetKey);
          });
      });
  }
}

function findDrillDownView(element: ResolvedElement, views: DiagramView[]): string | null {
  if (element.type === 'SoftwareSystem') {
    const view = views.find(
      (v): v is ContainerView =>
        v.type === 'Container' && v.softwareSystemId === element.id,
    );
    return view?.key ?? null;
  }

  if (element.type === 'Container') {
    const view = views.find(
      (v): v is ComponentView =>
        v.type === 'Component' && v.containerId === element.id,
    );
    return view?.key ?? null;
  }

  return null;
}
