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
        .attr('stroke-width', style.thickness * .5)
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
        const labelG = g.append('g').attr('class', 'd3c4-edge-label').attr('transform', `translate(${mid.x}, ${mid.y})`);

        const LABEL_MAX_WIDTH = 120;
        let dy = 0;
        if (d.relationship.description) {
          dy = wrapLabelText(
            labelG, d.relationship.description, LABEL_MAX_WIDTH, dy,
            style.color, style.fontSize, false,
          );
        }
        if (d.relationship.technology) {
          wrapLabelText(
            labelG, `[${d.relationship.technology}]`, LABEL_MAX_WIDTH, dy,
            style.color, style.fontSize, true,
          );
        }

        // Insert a background rect behind the text using the rendered bounding box.
        const labelNode = labelG.node();
        if (labelNode) {
          try {
            const bbox = labelNode.getBBox();
            const pad = 2;
            labelG.insert('rect', ':first-child')
              .attr('x', bbox.x - pad)
              .attr('y', bbox.y - pad)
              .attr('width', bbox.width + pad * 2)
              .attr('height', bbox.height + pad * 2)
              .attr('fill', '#ffffff')
              .attr('rx', 2)
              .attr('opacity', 1);
          } catch {
            // getBBox is unavailable in non-DOM environments (e.g. tests)
          }
        }
      }
    });
  }
}

/**
 * Renders word-wrapped text into a label <g> element.
 * Returns the dy offset to use for the next text block below.
 */
function wrapLabelText(
  parent: d3.Selection<SVGGElement, LayoutEdge, null, undefined>,
  text: string,
  maxWidth: number,
  startDy: number,
  color: string,
  fontSize: number,
  italic: boolean,
): number {
  const charsPerLine = Math.floor(maxWidth / (fontSize * 0.55));
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    const test = currentLine ? `${currentLine} ${word}` : word;
    if (test.length > charsPerLine && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = test;
    }
  }
  if (currentLine) lines.push(currentLine);

  const textEl = parent
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', color)
    .attr('font-size', fontSize)
    .attr('font-family', 'sans-serif')
    .attr('font-style', italic ? 'italic' : 'normal');

  for (let i = 0; i < lines.length; i++) {
    textEl
      .append('tspan')
      .attr('x', 0)
      .attr('dy', i === 0 ? startDy : fontSize * 1.2)
      .text(lines[i]!);
  }

  return startDy + (lines.length - 1) * fontSize * 1.2 + fontSize + 4;
}

function getMidPoint(points: Array<{ x: number; y: number }>): { x: number; y: number } {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0]!;

  const midIdx = Math.floor(points.length / 2);
  const a = points[midIdx - 1]!;
  const b = points[midIdx]!;
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
