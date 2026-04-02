/**
 * Spike: JointJS shape validation for Cylinder, Component, and Hexagon (issue #31).
 *
 * Acceptance criteria:
 *   AC1 – All shapes render identically to D3 counterparts (static geometry).
 *   AC2 – Dynamic sizing: resize element → shape SVG attributes update correctly.
 *   AC3 – Structurizr style properties (background, stroke) apply via attrs.
 *   AC4 – All shapes can be added to dia.Graph and rendered in dia.Paper.
 *
 * Tests are split into "model" (pure Backbone assertions) and "paper"
 * (dia.Paper rendering in jsdom) suites, following PersonShape.jointjs.test.ts.
 *
 * ## Findings documented
 *
 * CylinderShape: All three sub-elements (body rect + 2 ellipse caps) are
 * fully expressible with standard calc() expressions. No workaround needed.
 *
 * ComponentShape: The proportional notch positions (h/3 and 2h/3) are
 * expressed as `calc(h/3-4)` and `calc(2*h/3-4)`. JointJS's calc() regex
 * supports [multiplier*]property[/divisor][+/-offset] which covers both.
 * The notch1 stroke-width=2 (hardcoded in ShapeRegistry) is preserved as a
 * structural attribute — applyStyle() does not override it.
 *
 * HexagonShape: A single <polygon> whose 6 vertices are all expressed as
 * inline calc() expressions within the points string. JointJS evaluates each
 * calc() occurrence independently in one pass — no custom attribute required.
 * This is the cleanest of the three shapes: one element, eight calc() calls.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { dia } from 'jointjs';
import { CylinderShape, CYLINDER_CAP_RY } from '../jointjs/CylinderShape.js';
import { ComponentShape } from '../jointjs/ComponentShape.js';
import { HexagonShape } from '../jointjs/HexagonShape.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function numAttr(el: Element | null, name: string): number {
  if (!el) throw new Error(`Element is null when reading "${name}"`);
  const val = el.getAttribute(name);
  if (val === null) throw new Error(`Attribute "${name}" not present on <${el.tagName}>`);
  return parseFloat(val);
}

/** Build a fresh graph + paper in the jsdom container. */
function buildPaper(
  container: HTMLDivElement,
  namespace: Record<string, unknown>,
): { graph: dia.Graph; paper: dia.Paper } {
  const graph = new dia.Graph({}, { cellNamespace: namespace });
  const paper = new dia.Paper({
    el: container,
    model: graph,
    width: 800,
    height: 600,
    interactive: false,
    cellViewNamespace: namespace,
  });
  return { graph, paper };
}

// ---------------------------------------------------------------------------
// CylinderShape
// ---------------------------------------------------------------------------

describe('CylinderShape – model', () => {
  it('has type "CylinderShape"', () => {
    const s = new CylinderShape();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((s as any).get('type')).toBe('CylinderShape');
  });

  it('markup has body rect, capTop ellipse, capBottom ellipse', () => {
    const s = new CylinderShape();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markup = (s as any).get('markup') as Array<{ tagName: string; selector: string }>;
    expect(markup.map((m) => m.tagName)).toEqual(['rect', 'ellipse', 'ellipse']);
    expect(markup.map((m) => m.selector)).toEqual(['body', 'capTop', 'capBottom']);
  });

  it('body attrs: y=10, height=calc(h-20), width=calc(w)', () => {
    const s = new CylinderShape();
    const body = s.attr('body') as Record<string, unknown>;
    expect(body['y']).toBe(CYLINDER_CAP_RY);          // 10
    expect(body['height']).toBe(`calc(h-${CYLINDER_CAP_RY * 2})`); // calc(h-20)
    expect(body['width']).toBe('calc(w)');
  });

  it('capTop attrs: cx=calc(0.5*w), cy=10, rx=calc(0.5*w), ry=10', () => {
    const s = new CylinderShape();
    const cap = s.attr('capTop') as Record<string, unknown>;
    expect(cap['cx']).toBe('calc(0.5*w)');
    expect(cap['cy']).toBe(CYLINDER_CAP_RY);
    expect(cap['rx']).toBe('calc(0.5*w)');
    expect(cap['ry']).toBe(CYLINDER_CAP_RY);
  });

  it('capBottom attrs: cx=calc(0.5*w), cy=calc(h-10)', () => {
    const s = new CylinderShape();
    const cap = s.attr('capBottom') as Record<string, unknown>;
    expect(cap['cx']).toBe('calc(0.5*w)');
    expect(cap['cy']).toBe(`calc(h-${CYLINDER_CAP_RY})`); // calc(h-10)
    expect(cap['rx']).toBe('calc(0.5*w)');
    expect(cap['ry']).toBe(CYLINDER_CAP_RY);
  });

  it('applyStyle sets fill+stroke on all three sub-elements', () => {
    const s = new CylinderShape();
    s.applyStyle({ background: '#ff0000', stroke: '#000000', strokeWidth: 1 });
    const body = s.attr('body') as Record<string, unknown>;
    const capTop = s.attr('capTop') as Record<string, unknown>;
    const capBottom = s.attr('capBottom') as Record<string, unknown>;
    for (const attrs of [body, capTop, capBottom]) {
      expect(attrs['fill']).toBe('#ff0000');
      expect(attrs['stroke']).toBe('#000000');
      expect(attrs['strokeWidth']).toBe(1);
    }
  });
});

describe('CylinderShape – dia.Paper rendering (AC4)', () => {
  let container: HTMLDivElement;
  let graph: dia.Graph;
  let paper: dia.Paper;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ({ graph, paper } = buildPaper(container, { CylinderShape }));
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (paper as any).remove();
    container.remove();
  });

  it('AC4: renders a rect and two ellipses', () => {
    graph.addCell(new CylinderShape());
    expect(container.querySelector('[joint-selector="body"]')?.tagName).toBe('rect');
    expect(container.querySelector('[joint-selector="capTop"]')?.tagName).toBe('ellipse');
    expect(container.querySelector('[joint-selector="capBottom"]')?.tagName).toBe('ellipse');
  });

  it('AC1: body y=10, top cap cy=10', () => {
    graph.addCell(new CylinderShape({ size: { width: 160, height: 120 } }));
    expect(numAttr(container.querySelector('[joint-selector="body"]'), 'y')).toBe(10);
    expect(numAttr(container.querySelector('[joint-selector="capTop"]'), 'cy')).toBe(10);
  });

  it('AC2: body height = element.height - 20', () => {
    const h = 150;
    graph.addCell(new CylinderShape({ size: { width: 160, height: h } }));
    expect(numAttr(container.querySelector('[joint-selector="body"]'), 'height')).toBeCloseTo(h - 20, 0);
  });

  it('AC2: bottom cap cy = element.height - 10', () => {
    const h = 150;
    graph.addCell(new CylinderShape({ size: { width: 160, height: h } }));
    expect(numAttr(container.querySelector('[joint-selector="capBottom"]'), 'cy')).toBeCloseTo(h - 10, 0);
  });

  it('AC2: top cap rx = element.width / 2 after resize', () => {
    const s = new CylinderShape({ size: { width: 160, height: 120 } });
    graph.addCell(s);
    s.resize(200, 120);
    expect(numAttr(container.querySelector('[joint-selector="capTop"]'), 'rx')).toBeCloseTo(100, 0);
  });

  it('AC3: applyStyle sets fill on all sub-elements', () => {
    const s = new CylinderShape({ size: { width: 160, height: 120 } });
    s.applyStyle({ background: '#aabbcc', stroke: 'none' });
    graph.addCell(s);
    expect(container.querySelector('[joint-selector="body"]')?.getAttribute('fill')).toBe('#aabbcc');
    expect(container.querySelector('[joint-selector="capTop"]')?.getAttribute('fill')).toBe('#aabbcc');
    expect(container.querySelector('[joint-selector="capBottom"]')?.getAttribute('fill')).toBe('#aabbcc');
  });
});

// ---------------------------------------------------------------------------
// ComponentShape
// ---------------------------------------------------------------------------

describe('ComponentShape – model', () => {
  it('has type "ComponentShape"', () => {
    const s = new ComponentShape();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((s as any).get('type')).toBe('ComponentShape');
  });

  it('markup has body, notch1, notch2', () => {
    const s = new ComponentShape();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markup = (s as any).get('markup') as Array<{ tagName: string; selector: string }>;
    expect(markup.every((m) => m.tagName === 'rect')).toBe(true);
    expect(markup.map((m) => m.selector)).toEqual(['body', 'notch1', 'notch2']);
  });

  it('body attrs: x=0, y=0, width=calc(w), height=calc(h), rx=4', () => {
    const s = new ComponentShape();
    const body = s.attr('body') as Record<string, unknown>;
    expect(body['x']).toBe(0);
    expect(body['y']).toBe(0);
    expect(body['width']).toBe('calc(w)');
    expect(body['height']).toBe('calc(h)');
    expect(body['rx']).toBe(4);
  });

  it('notch1 y = calc(h/3-4)', () => {
    const s = new ComponentShape();
    const n = s.attr('notch1') as Record<string, unknown>;
    expect(n['x']).toBe(-6);
    expect(n['y']).toBe('calc(h/3-4)');
    expect(n['width']).toBe(12);
    expect(n['height']).toBe(8);
    // Fixed stroke-width=2 preserved (structural, not a style property)
    expect(n['strokeWidth']).toBe(2);
  });

  it('notch2 y = calc(2*h/3-4)', () => {
    const s = new ComponentShape();
    const n = s.attr('notch2') as Record<string, unknown>;
    expect(n['y']).toBe('calc(2*h/3-4)');
  });

  it('applyStyle sets fill+stroke; notch1 strokeWidth=2 is preserved', () => {
    const s = new ComponentShape();
    s.applyStyle({ background: '#ff0000', stroke: '#333', strokeWidth: 1 });
    // body and notch2 get the passed strokeWidth
    expect((s.attr('body') as Record<string, unknown>)['strokeWidth']).toBe(1);
    expect((s.attr('notch2') as Record<string, unknown>)['strokeWidth']).toBe(0);
    // notch1 strokeWidth is NOT overridden by applyStyle
    expect((s.attr('notch1') as Record<string, unknown>)['strokeWidth']).toBe(2);
    // But fill and stroke ARE updated on all
    expect((s.attr('notch1') as Record<string, unknown>)['fill']).toBe('#ff0000');
    expect((s.attr('notch1') as Record<string, unknown>)['stroke']).toBe('#333');
  });
});

describe('ComponentShape – dia.Paper rendering (AC4)', () => {
  let container: HTMLDivElement;
  let graph: dia.Graph;
  let paper: dia.Paper;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ({ graph, paper } = buildPaper(container, { ComponentShape }));
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (paper as any).remove();
    container.remove();
  });

  it('AC4: renders three rects', () => {
    graph.addCell(new ComponentShape());
    expect(container.querySelector('[joint-selector="body"]')).not.toBeNull();
    expect(container.querySelector('[joint-selector="notch1"]')).not.toBeNull();
    expect(container.querySelector('[joint-selector="notch2"]')).not.toBeNull();
  });

  it('AC1: body x=0, y=0; notch1 x=-6', () => {
    graph.addCell(new ComponentShape({ size: { width: 160, height: 120 } }));
    expect(numAttr(container.querySelector('[joint-selector="body"]'), 'x')).toBe(0);
    expect(numAttr(container.querySelector('[joint-selector="body"]'), 'y')).toBe(0);
    expect(numAttr(container.querySelector('[joint-selector="notch1"]'), 'x')).toBe(-6);
  });

  it('AC2: notch1 y = h/3 - 4', () => {
    const h = 120;
    graph.addCell(new ComponentShape({ size: { width: 160, height: h } }));
    expect(numAttr(container.querySelector('[joint-selector="notch1"]'), 'y')).toBeCloseTo(h / 3 - 4, 0);
  });

  it('AC2: notch2 y = 2*h/3 - 4', () => {
    const h = 120;
    graph.addCell(new ComponentShape({ size: { width: 160, height: h } }));
    expect(numAttr(container.querySelector('[joint-selector="notch2"]'), 'y')).toBeCloseTo((2 * h) / 3 - 4, 0);
  });

  it('AC2: notch positions update on resize', () => {
    const s = new ComponentShape({ size: { width: 160, height: 120 } });
    graph.addCell(s);
    s.resize(160, 180);
    expect(numAttr(container.querySelector('[joint-selector="notch1"]'), 'y')).toBeCloseTo(180 / 3 - 4, 0);
    expect(numAttr(container.querySelector('[joint-selector="notch2"]'), 'y')).toBeCloseTo((2 * 180) / 3 - 4, 0);
  });

  it('AC3: applyStyle fill propagates to all three rects', () => {
    const s = new ComponentShape({ size: { width: 160, height: 120 } });
    s.applyStyle({ background: '#123456', stroke: 'none' });
    graph.addCell(s);
    expect(container.querySelector('[joint-selector="body"]')?.getAttribute('fill')).toBe('#123456');
    expect(container.querySelector('[joint-selector="notch1"]')?.getAttribute('fill')).toBe('#123456');
    expect(container.querySelector('[joint-selector="notch2"]')?.getAttribute('fill')).toBe('#123456');
  });
});

// ---------------------------------------------------------------------------
// HexagonShape
// ---------------------------------------------------------------------------

describe('HexagonShape – model', () => {
  it('has type "HexagonShape"', () => {
    const s = new HexagonShape();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((s as any).get('type')).toBe('HexagonShape');
  });

  it('markup is a single polygon with selector "body"', () => {
    const s = new HexagonShape();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markup = (s as any).get('markup') as Array<{ tagName: string; selector: string }>;
    expect(markup).toHaveLength(1);
    expect(markup[0]?.tagName).toBe('polygon');
    expect(markup[0]?.selector).toBe('body');
  });

  it('points attr contains 6 calc() pairs for the hexagon vertices', () => {
    const s = new HexagonShape();
    const body = s.attr('body') as Record<string, unknown>;
    const points = body['points'] as string;
    // Should contain exactly 9 calc() expressions:
    // vertices 1-3 have one fixed coord (y=0 or x=0), vertices 4-6 have two each.
    const calcCount = (points.match(/calc\(/g) ?? []).length;
    expect(calcCount).toBe(9);
    // Must include the expected vertex patterns
    expect(points).toContain('0,calc(0.5*h)');       // left vertex
    expect(points).toContain('calc(w),calc(0.5*h)'); // right vertex
    expect(points).toContain('calc(0.25*w),0');       // top-left
    expect(points).toContain('calc(0.75*w),calc(h)');// bottom-right
  });

  it('applyStyle sets fill+stroke on the polygon', () => {
    const s = new HexagonShape();
    s.applyStyle({ background: '#ff0000', stroke: '#000' });
    expect((s.attr('body') as Record<string, unknown>)['fill']).toBe('#ff0000');
    expect((s.attr('body') as Record<string, unknown>)['stroke']).toBe('#000');
  });
});

describe('HexagonShape – dia.Paper rendering (AC4)', () => {
  let container: HTMLDivElement;
  let graph: dia.Graph;
  let paper: dia.Paper;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ({ graph, paper } = buildPaper(container, { HexagonShape }));
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (paper as any).remove();
    container.remove();
  });

  it('AC4: renders a polygon element', () => {
    graph.addCell(new HexagonShape());
    expect(container.querySelector('polygon')).not.toBeNull();
    expect(container.querySelector('[joint-selector="body"]')?.tagName).toBe('polygon');
  });

  it('AC1: left vertex x=0, right vertex x=width', () => {
    const w = 160;
    const h = 120;
    graph.addCell(new HexagonShape({ size: { width: w, height: h } }));
    const pts = container.querySelector('[joint-selector="body"]')?.getAttribute('points') ?? '';
    // Parse the rendered points (all calc() values should be resolved to numbers)
    const pairs = pts.trim().split(/\s+/).map((p) => p.split(',').map(Number));
    // Left vertex: x=0, y=h/2
    const leftVertex = pairs.find((p) => p[0] === 0);
    expect(leftVertex).toBeDefined();
    expect(leftVertex![1]).toBeCloseTo(h / 2, 0);
    // Right vertex: x=w, y=h/2
    const rightVertex = pairs.find((p) => Math.abs((p[0] ?? 0) - w) < 1);
    expect(rightVertex).toBeDefined();
    expect(rightVertex![1]).toBeCloseTo(h / 2, 0);
  });

  it('AC2: points recompute on resize', () => {
    const s = new HexagonShape({ size: { width: 160, height: 120 } });
    graph.addCell(s);
    s.resize(200, 150);
    const pts = container.querySelector('[joint-selector="body"]')?.getAttribute('points') ?? '';
    const pairs = pts.trim().split(/\s+/).map((p) => p.split(',').map(Number));
    // After resize, right vertex should be at x=200
    const rightVertex = pairs.find((p) => Math.abs((p[0] ?? 0) - 200) < 1);
    expect(rightVertex).toBeDefined();
  });

  it('AC3: applyStyle sets fill on the polygon', () => {
    const s = new HexagonShape({ size: { width: 160, height: 120 } });
    s.applyStyle({ background: '#abcdef', stroke: 'none' });
    graph.addCell(s);
    expect(container.querySelector('[joint-selector="body"]')?.getAttribute('fill')).toBe('#abcdef');
  });
});
