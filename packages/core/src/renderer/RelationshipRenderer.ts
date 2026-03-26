import * as d3 from 'd3';
import type { LayoutEdge } from '../layout/types.js';
import type { SvgCanvas } from './SvgCanvas.js';
import type { ResolvedRelationship } from '../parser/types.js';

export interface RelationshipRendererOptions {
  onRelationshipClick?: (rel: ResolvedRelationship) => void;
}

export class RelationshipRenderer {
  private canvas: d3.Selection<SVGGElement, unknown, null, undefined>;
  private svgCanvas: SvgCanvas;
  private options: RelationshipRendererOptions;

  constructor(
    canvas: d3.Selection<SVGGElement, unknown, null, undefined>,
    svgCanvas: SvgCanvas,
    options: RelationshipRendererOptions = {},
  ) {
    this.canvas = canvas;
    this.svgCanvas = svgCanvas;
    this.options = options;
  }

  render(edges: LayoutEdge[]): void {
    const layer = this.canvas.select<SVGGElement>('.d3c4-relationships');

    const groups = layer
      .selectAll<SVGGElement, LayoutEdge>('.d3c4-relationship')
      .data(edges, (d) => d.id);

    groups.exit().remove();

    const entering = groups
      .enter()
      .append('g')
      .attr('class', 'd3c4-relationship')
      .attr('data-id', (d) => d.id)
      .attr('data-source', (d) => d.sourceId)
      .attr('data-dest', (d) => d.destinationId)
      .style('cursor', 'pointer');

    if (this.options.onRelationshipClick) {
      entering.on('click', (event, d) => {
        event.stopPropagation();
        this.options.onRelationshipClick!(d.relationship);
      });
    }

    const merged = entering.merge(groups);

    merged.each((d, i, nodes) => {
      const g = d3.select<SVGGElement, LayoutEdge>(nodes[i]!);
      g.selectAll('*').remove();

      const style = d.relationship.style;
      const markerUrl = this.svgCanvas.getArrowMarkerUrl(style.color);
      const lineFn = d3
        .line<{ x: number; y: number }>()
        .x((p) => p.x)
        .y((p) => p.y);

      // Edge path
      g.append('path')
        .attr('class', 'd3c4-edge-line')
        .attr('d', lineFn(d.points) ?? '')
        .attr('fill', 'none')
        .attr('stroke', style.color)
        .attr('stroke-width', style.thickness)
        .attr('stroke-dasharray', style.dashed ? '6,3' : 'none')
        .attr('marker-end', markerUrl);

      // Invisible wider path for easier clicking
      g.append('path')
        .attr('class', 'd3c4-edge-hitbox')
        .attr('d', lineFn(d.points) ?? '')
        .attr('fill', 'none')
        .attr('stroke', 'transparent')
        .attr('stroke-width', 12);

      // Label — position at midpoint of the path
      if (d.relationship.description || d.relationship.technology) {
        const mid = getMidPoint(d.points);
        const labelG = g.append('g').attr('transform', `translate(${mid.x}, ${mid.y})`);

        // Background for readability
        const labelParts: string[] = [];
        if (d.relationship.description) labelParts.push(d.relationship.description);
        if (d.relationship.technology) labelParts.push(`[${d.relationship.technology}]`);

        let dy = 0;
        for (const part of labelParts) {
          const isDesc = part === d.relationship.description;
          labelG
            .append('text')
            .attr('class', isDesc ? 'd3c4-edge-description' : 'd3c4-edge-technology')
            .attr('text-anchor', 'middle')
            .attr('dy', dy)
            .attr('fill', style.color)
            .attr('font-size', style.fontSize)
            .attr('font-family', 'sans-serif')
            .attr('font-style', isDesc ? 'normal' : 'italic')
            .text(part);
          dy += style.fontSize + 2;
        }
      }
    });
  }
}

function getMidPoint(points: Array<{ x: number; y: number }>): { x: number; y: number } {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0]!;

  const midIdx = Math.floor(points.length / 2);
  const a = points[midIdx - 1]!;
  const b = points[midIdx]!;
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
