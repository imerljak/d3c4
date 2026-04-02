import type { DiagramView, ContainerView, ComponentView } from '@d3c4/types';
import type { LayoutNode } from '../layout/types.js';
import type { ResolvedElement } from '../parser/types.js';

/**
 * Attaches drill-down navigation to rendered elements via JointJS Paper events.
 *
 * Double-clicking a SoftwareSystem navigates to its ContainerView;
 * double-clicking a Container navigates to its ComponentView.
 *
 * Call `attach(nodes, views)` after every render.
 */
export class NavigationHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly paper: any; // dia.Paper
  private readonly navigate: (viewKey: string) => void;

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paper: any,
    navigate: (viewKey: string) => void,
  ) {
    this.paper = paper;
    this.navigate = navigate;
  }

  attach(nodes: LayoutNode[], views: DiagramView[]): void {
    // Build drilldown map: element ID → target view key
    const drilldown = new Map<string, string>();
    for (const node of nodes) {
      const key = findDrillDownView(node.element, views);
      if (key) drilldown.set(node.id, key);
    }

    // Re-register on every render to pick up the latest drilldown map
    this.paper.off('element:pointerdblclick.navigate');
    if (drilldown.size === 0) return;

    this.paper.on('element:pointerdblclick.navigate', (view: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cellId = String((view as any).model?.id ?? '');
      const key = drilldown.get(cellId);
      if (key) this.navigate(key);
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
