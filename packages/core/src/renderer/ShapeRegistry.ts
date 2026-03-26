import * as d3 from 'd3';
import type { Selection } from 'd3';
import type { ResolvedElementStyle } from '../parser/types.js';
import type { LayoutNode } from '../layout/types.js';

export type DrawFn = (
  sel: Selection<SVGGElement, LayoutNode, SVGGElement, unknown>,
  style: ResolvedElementStyle,
) => void;

type NodeSel = Selection<SVGGElement, LayoutNode, SVGGElement, unknown>;

function drawBox(sel: NodeSel, style: ResolvedElementStyle): void {
  sel
    .append('rect')
    .attr('class', 'd3c4-shape')
    .attr('width', (d: LayoutNode) => d.width)
    .attr('height', (d: LayoutNode) => d.height)
    .attr('fill', style.background)
    .attr('stroke', style.stroke)
    .attr('stroke-width', 2)
    .attr('rx', 0)
    .attr('ry', 0);
}

function drawRoundedBox(sel: NodeSel, style: ResolvedElementStyle): void {
  sel
    .append('rect')
    .attr('class', 'd3c4-shape')
    .attr('width', (d: LayoutNode) => d.width)
    .attr('height', (d: LayoutNode) => d.height)
    .attr('fill', style.background)
    .attr('stroke', style.stroke)
    .attr('stroke-width', 2)
    .attr('rx', 8)
    .attr('ry', 8);
}

function drawPerson(sel: NodeSel, style: ResolvedElementStyle): void {
  // Head circle
  sel
    .append('circle')
    .attr('class', 'd3c4-shape-head')
    .attr('cx', (d: LayoutNode) => d.width / 2)
    .attr('cy', 24)
    .attr('r', 20)
    .attr('fill', style.background)
    .attr('stroke', style.stroke)
    .attr('stroke-width', 2);

  // Body rectangle
  sel
    .append('rect')
    .attr('class', 'd3c4-shape-body')
    .attr('x', (d: LayoutNode) => d.width / 2 - 28)
    .attr('y', 46)
    .attr('width', 56)
    .attr('height', 40)
    .attr('rx', 6)
    .attr('fill', style.background)
    .attr('stroke', style.stroke)
    .attr('stroke-width', 2);
}

function drawCylinder(sel: NodeSel, style: ResolvedElementStyle): void {
  const ry = 10;
  sel.each(function (this: SVGGElement, datum: LayoutNode) {
    const s = d3.select<SVGGElement, LayoutNode>(this);
    const w = datum.width;
    const h = datum.height;
    s.append('rect')
      .attr('class', 'd3c4-shape')
      .attr('x', 0)
      .attr('y', ry)
      .attr('width', w)
      .attr('height', h - ry * 2)
      .attr('fill', style.background)
      .attr('stroke', style.stroke)
      .attr('stroke-width', 2);
    s.append('ellipse')
      .attr('cx', w / 2)
      .attr('cy', ry)
      .attr('rx', w / 2)
      .attr('ry', ry)
      .attr('fill', style.background)
      .attr('stroke', style.stroke)
      .attr('stroke-width', 2);
    s.append('ellipse')
      .attr('cx', w / 2)
      .attr('cy', h - ry)
      .attr('rx', w / 2)
      .attr('ry', ry)
      .attr('fill', style.background)
      .attr('stroke', style.stroke)
      .attr('stroke-width', 2);
  });
}

function drawCircle(sel: NodeSel, style: ResolvedElementStyle): void {
  sel
    .append('circle')
    .attr('class', 'd3c4-shape')
    .attr('cx', (d: LayoutNode) => d.width / 2)
    .attr('cy', (d: LayoutNode) => d.height / 2)
    .attr('r', (d: LayoutNode) => Math.min(d.width, d.height) / 2)
    .attr('fill', style.background)
    .attr('stroke', style.stroke)
    .attr('stroke-width', 2);
}

function drawEllipse(sel: NodeSel, style: ResolvedElementStyle): void {
  sel
    .append('ellipse')
    .attr('class', 'd3c4-shape')
    .attr('cx', (d: LayoutNode) => d.width / 2)
    .attr('cy', (d: LayoutNode) => d.height / 2)
    .attr('rx', (d: LayoutNode) => d.width / 2)
    .attr('ry', (d: LayoutNode) => d.height / 2)
    .attr('fill', style.background)
    .attr('stroke', style.stroke)
    .attr('stroke-width', 2);
}

function drawHexagon(sel: NodeSel, style: ResolvedElementStyle): void {
  sel
    .append('polygon')
    .attr('class', 'd3c4-shape')
    .attr('points', (d: LayoutNode) => {
      const w = d.width;
      const h = d.height;
      const cx = w / 2;
      const cy = h / 2;
      const rx = w / 2;
      const ry = h / 2;
      return [
        [cx - rx, cy],
        [cx - rx / 2, cy - ry],
        [cx + rx / 2, cy - ry],
        [cx + rx, cy],
        [cx + rx / 2, cy + ry],
        [cx - rx / 2, cy + ry],
      ]
        .map((p) => p.join(','))
        .join(' ');
    })
    .attr('fill', style.background)
    .attr('stroke', style.stroke)
    .attr('stroke-width', 2);
}

function drawComponent(sel: NodeSel, style: ResolvedElementStyle): void {
  sel.each(function (this: SVGGElement, datum: LayoutNode) {
    const s = d3.select<SVGGElement, LayoutNode>(this);
    const w = datum.width;
    const h = datum.height;
    s.append('rect')
      .attr('class', 'd3c4-shape')
      .attr('width', w)
      .attr('height', h)
      .attr('rx', 4)
      .attr('fill', style.background)
      .attr('stroke', style.stroke)
      .attr('stroke-width', 2);
    const notchW = 12;
    const notchH = 8;
    const notchX = -notchW / 2;
    s.append('rect')
      .attr('x', notchX)
      .attr('y', h / 3 - notchH / 2)
      .attr('width', notchW)
      .attr('height', notchH)
      .attr('rx', 2)
      .attr('fill', style.background)
      .attr('stroke', style.stroke)
      .attr('stroke-width', 2);
    s.append('rect')
      .attr('x', notchX)
      .attr('y', (h * 2) / 3 - notchH / 2)
      .attr('width', notchW)
      .attr('height', notchH)
      .attr('rx', 2)
      .attr('fill', style.background)
      .attr('stroke', style.stroke)
      .attr('stroke-width', 2);
  });
}

export const shapeRegistry: Partial<Record<string, DrawFn>> = {
  Box: drawBox,
  RoundedBox: drawRoundedBox,
  Person: drawPerson,
  Circle: drawCircle,
  Ellipse: drawEllipse,
  Hexagon: drawHexagon,
  Component: drawComponent,
  Cylinder: drawCylinder,
};

export function getDrawFn(shape: string): DrawFn {
  return shapeRegistry[shape] ?? drawRoundedBox;
}
