import * as d3 from 'd3';
import type { LayoutNode, LayoutEdge } from '../layout/types.js';

/**
 * Attaches free-form drag behaviour to rendered elements.
 * On drag, the element group is repositioned and all connected
 * edge paths + label midpoints are updated in place.
 *
 * Call `attach(nodes)` after every render so drag is registered
 * on newly created element groups.
 */
export class DragHandler {
  private canvas: d3.Selection<SVGGElement, unknown, null, undefined>;

  constructor(canvas: d3.Selection<SVGGElement, unknown, null, undefined>) {
    this.canvas = canvas;
  }

  attach(nodes: LayoutNode[]): void {
    const canvas = this.canvas;

    // Build a position lookup from the same LayoutNode objects that are
    // bound as D3 data to .d3c4-element groups — mutations during drag
    // are reflected here automatically.
    const nodePositions = new Map<string, LayoutNode>();
    for (const node of nodes) {
      nodePositions.set(node.id, node);
    }

    const lineFn = d3.line<{ x: number; y: number }>()
      .x((p) => p.x)
      .y((p) => p.y);

    canvas
      .selectAll<SVGGElement, LayoutNode>('.d3c4-element')
      .call(
        d3.drag<SVGGElement, LayoutNode>()
          .on('start', function (event) {
            // Prevent the canvas zoom/pan behaviour from co-activating.
            event.sourceEvent.stopPropagation();
            d3.select(this).raise();
          })
          .on('drag', function (event, d) {
            d.x += event.dx;
            d.y += event.dy;
            d3.select(this).attr(
              'transform',
              `translate(${d.x - d.width / 2}, ${d.y - d.height / 2})`,
            );

            // Update every edge connected to the dragged node.
            canvas
              .selectAll<SVGGElement, LayoutEdge>('.d3c4-relationship')
              .filter((edge) => edge.sourceId === d.id || edge.destinationId === d.id)
              .each(function (edge) {
                const src = nodePositions.get(edge.sourceId);
                const dst = nodePositions.get(edge.destinationId);
                if (!src || !dst) return;

                const pathD =
                  lineFn([{ x: src.x, y: src.y }, { x: dst.x, y: dst.y }]) ?? '';
                d3.select(this).select('.d3c4-edge-line').attr('d', pathD);
                d3.select(this).select('.d3c4-edge-hitbox').attr('d', pathD);

                const mid = { x: (src.x + dst.x) / 2, y: (src.y + dst.y) / 2 };
                d3.select(this)
                  .select('.d3c4-edge-label')
                  .attr('transform', `translate(${mid.x}, ${mid.y})`);
              });
          }),
      );
  }
}
