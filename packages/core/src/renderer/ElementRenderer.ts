import * as d3 from 'd3';
import type { LayoutNode } from '../layout/types.js';
import type { ResolvedElement } from '../parser/types.js';
import { getDrawFn } from './ShapeRegistry.js';

export interface ElementRendererOptions {
  onElementClick?: (element: ResolvedElement) => void;
}

export class ElementRenderer {
  private canvas: d3.Selection<SVGGElement, unknown, null, undefined>;
  private options: ElementRendererOptions;

  constructor(
    canvas: d3.Selection<SVGGElement, unknown, null, undefined>,
    options: ElementRendererOptions = {},
  ) {
    this.canvas = canvas;
    this.options = options;

    // Ensure layer groups exist in the right paint order
    if (canvas.select('.d3c4-boundaries').empty()) {
      canvas.append('g').attr('class', 'd3c4-boundaries');
    }
    if (canvas.select('.d3c4-relationships').empty()) {
      canvas.append('g').attr('class', 'd3c4-relationships');
    }
    if (canvas.select('.d3c4-elements').empty()) {
      canvas.append('g').attr('class', 'd3c4-elements');
    }
  }

  render(nodes: LayoutNode[], boundaries: Array<{ element: ResolvedElement }>): void {
    this.renderBoundaries(boundaries);
    this.renderNodes(nodes);
  }

  private renderBoundaries(boundaries: Array<{ element: ResolvedElement }>): void {
    // Boundaries are rendered as dashed outlines with labels
    // For iteration 1 we render a simple placeholder; full boundary layout comes in iteration 2
    const layer = this.canvas.select<SVGGElement>('.d3c4-boundaries');
    layer.selectAll<SVGGElement, { element: ResolvedElement }>('.d3c4-boundary').remove();
    // Boundaries are positioned in Iteration 2 with proper clustering
  }

  private renderNodes(nodes: LayoutNode[]): void {
    const layer = this.canvas.select<SVGGElement>('.d3c4-elements');

    // D3 general update pattern keyed by element ID
    const groups = layer
      .selectAll<SVGGElement, LayoutNode>('.d3c4-element')
      .data(nodes, (d) => d.id);

    groups.exit().remove();

    const entering = groups
      .enter()
      .append('g')
      .attr('class', 'd3c4-element')
      .attr('data-id', (d) => d.id)
      .attr('data-type', (d) => d.element.type)
      .style('cursor', 'pointer');

    if (this.options.onElementClick) {
      entering.on('click', (event, d) => {
        event.stopPropagation();
        this.options.onElementClick!(d.element);
      });
    }

    const merged = entering.merge(groups);

    // Position (transition on re-render)
    merged
      .transition()
      .duration(300)
      .attr('transform', (d) => `translate(${d.x - d.width / 2}, ${d.y - d.height / 2})`);

    // Draw shape — clear and redraw on each render (style may have changed)
    merged.each(function (d) {
      const g = d3.select<SVGGElement, LayoutNode>(this);
      // Remove old shape children
      g.selectAll('.d3c4-shape, .d3c4-shape-head, .d3c4-shape-body, .d3c4-label-group').remove();

      const { style } = d.element;
      const drawFn = getDrawFn(style.shape);
      drawFn(g as any, style);

      // Label group
      const labelG = g.append('g').attr('class', 'd3c4-label-group');

      const isPerson = style.shape === 'Person';
      // For Person: body rect starts at y=46; add 8px top padding → first text at y=54.
      const textStartY = isPerson ? 54 : 0;

      // Type badge (e.g. [Person], [Container: Java])
      const badge = buildTypeBadge(d.element);
      if (badge) {
        labelG
          .append('text')
          .attr('class', 'd3c4-element-badge')
          .attr('x', d.width / 2)
          .attr('y', textStartY + style.fontSize * 0.8)
          .attr('text-anchor', 'middle')
          .attr('fill', style.color)
          .attr('font-size', Math.max(style.fontSize - 3, 10))
          .attr('font-family', 'sans-serif')
          .text(badge);
      }

      // Name (main label)
      const nameY = badge
        ? textStartY + style.fontSize * 0.8 + style.fontSize + 4
        : textStartY + (isPerson ? 4 : d.height / 2 - (d.element.description ? style.fontSize : style.fontSize / 2));

      const nameExtraHeight = wrapText(
        labelG,
        d.element.name,
        d.width - 16,
        d.width / 2,
        nameY,
        style.color,
        style.fontSize,
        true,
      );

      // Description (smaller, optional)
      if (d.element.description) {
        const descFontSize = Math.max(style.fontSize - 3, 10);
        const descY = nameY + nameExtraHeight + descFontSize + 6;
        wrapText(
          labelG,
          d.element.description,
          d.width - 16,
          d.width / 2,
          descY,
          style.color,
          descFontSize,
          false,
        );
      }
    });
  }
}

function buildTypeBadge(element: ResolvedElement): string | null {
  if (element.type === 'Person') return '[Person]';
  if (element.type === 'SoftwareSystem') return '[Software System]';
  if (element.type === 'Container') {
    return element.technology ? `[Container: ${element.technology}]` : '[Container]';
  }
  if (element.type === 'Component') {
    return element.technology ? `[Component: ${element.technology}]` : '[Component]';
  }
  return null;
}

function wrapText(
  parent: d3.Selection<SVGGElement, LayoutNode, SVGGElement | null, undefined>,
  text: string,
  maxWidth: number,
  x: number,
  y: number,
  color: string,
  fontSize: number,
  bold: boolean,
): number {
  const textEl = parent
    .append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .attr('fill', color)
    .attr('font-size', fontSize)
    .attr('font-family', 'sans-serif')
    .attr('font-weight', bold ? 'bold' : 'normal');

  // Simple word wrap: approximate chars per line
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

  for (let i = 0; i < lines.length; i++) {
    textEl
      .append('tspan')
      .attr('x', x)
      .attr('dy', i === 0 ? 0 : fontSize * 1.2)
      .text(lines[i]!);
  }

  return (lines.length - 1) * fontSize * 1.2;
}
