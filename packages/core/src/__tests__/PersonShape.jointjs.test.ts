/**
 * Spike: JointJS PersonShape test harness (Vitest + jsdom).
 *
 * Acceptance criteria from issue #30:
 *   AC1 – Head circle is horizontally centered, cy=24, r=35.
 *   AC2 – Body rect starts at y=55; height adjusts dynamically with element size.
 *   AC3 – Structurizr style properties (background, stroke) apply via attrs.
 *   AC4 – Element can be added to dia.Graph and rendered in dia.Paper in jsdom.
 *
 * Tests are split into two suites:
 *   "model" – pure Backbone/JointJS model assertions, no DOM required.
 *   "paper"  – dia.Paper rendering in jsdom; documents any environment limits.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { dia } from 'jointjs';
import {
  PersonShape,
  PERSON_BODY_Y,
  PERSON_HEAD_CY,
  PERSON_HEAD_R,
} from '../jointjs/PersonShape.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse a number attribute from an SVG element. */
function numAttr(el: Element | null, name: string): number {
  if (!el) throw new Error(`Element is null when reading attribute "${name}"`);
  const val = el.getAttribute(name);
  if (val === null) throw new Error(`Attribute "${name}" not present on <${el.tagName}>`);
  return parseFloat(val);
}

// ---------------------------------------------------------------------------
// Suite 1 — pure model assertions (no DOM / Paper required)
// ---------------------------------------------------------------------------

describe('PersonShape – model', () => {
  it('has type "PersonShape"', () => {
    const shape = new PersonShape();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((shape as any).get('type')).toBe('PersonShape');
  });

  it('defaults to size 160×120', () => {
    const shape = new PersonShape();
    expect(shape.size()).toEqual({ width: 160, height: 120 });
  });

  it('markup defines a circle (head) and a rect (body)', () => {
    const shape = new PersonShape();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markup = (shape as any).get('markup') as Array<{ tagName: string; selector: string }>;
    const tags = markup.map((m) => m.tagName);
    expect(tags).toContain('circle');
    expect(tags).toContain('rect');
    const selectors = markup.map((m) => m.selector);
    expect(selectors).toContain('head');
    expect(selectors).toContain('body');
  });

  it('head attrs contain calc() for cx and fixed cy / r', () => {
    const shape = new PersonShape();
    const head = shape.attr('head') as Record<string, unknown>;
    // calc() expression for horizontal centering
    expect(head['cx']).toBe('calc(0.5*w)');
    expect(head['cy']).toBe(PERSON_HEAD_CY);
    expect(head['r']).toBe(PERSON_HEAD_R);
  });

  it('body attrs contain calc() for width and dynamic height', () => {
    const shape = new PersonShape();
    const body = shape.attr('body') as Record<string, unknown>;
    expect(body['x']).toBe(0);
    expect(body['y']).toBe(PERSON_BODY_Y); // 55
    expect(body['width']).toBe('calc(w)');
    // height = element.height - 55 - 4 = element.height - 59
    expect(body['height']).toBe(`calc(h-${PERSON_BODY_Y + 4})`);
    expect(body['rx']).toBe(6);
  });

  it('applyStyle updates fill and stroke on both sub-elements', () => {
    const shape = new PersonShape();
    shape.applyStyle({ background: '#ff0000', stroke: '#333333', strokeWidth: 2 });
    const head = shape.attr('head') as Record<string, unknown>;
    const body = shape.attr('body') as Record<string, unknown>;
    expect(head['fill']).toBe('#ff0000');
    expect(head['stroke']).toBe('#333333');
    expect(head['strokeWidth']).toBe(2);
    expect(body['fill']).toBe('#ff0000');
    expect(body['stroke']).toBe('#333333');
    expect(body['strokeWidth']).toBe(2);
  });

  it('applyStyle defaults strokeWidth to 0 when omitted', () => {
    const shape = new PersonShape();
    shape.applyStyle({ background: '#08427B', stroke: 'none' });
    const head = shape.attr('head') as Record<string, unknown>;
    expect(head['strokeWidth']).toBe(0);
  });

  it('resize() updates the size model property', () => {
    const shape = new PersonShape();
    shape.resize(200, 180);
    expect(shape.size()).toEqual({ width: 200, height: 180 });
  });

  it('can be added to a dia.Graph', () => {
    const graph = new dia.Graph({}, { cellNamespace: { PersonShape } });
    const shape = new PersonShape();
    graph.addCell(shape);
    expect(graph.getCells()).toHaveLength(1);
    expect(graph.getCell(shape.id)).toBe(shape);
  });
});

// ---------------------------------------------------------------------------
// Suite 2 — dia.Paper rendering in jsdom (AC4)
//
// Limitation: jsdom does not implement SVG geometry APIs such as getBBox(),
// getScreenCTM(), or createSVGPoint(). JointJS dia.Paper works around these
// by guarding most geometry calls behind lazy evaluation or try/catch. Basic
// SVG attribute setting (the core of what we test here) functions correctly.
//
// Any unsupported API that JointJS encounters in jsdom will be silently
// skipped or produce a default value — this does not affect attribute-level
// assertions but means layout-driven values (e.g. auto-sizing from text) are
// not testable in this environment.
// ---------------------------------------------------------------------------

describe('PersonShape – dia.Paper rendering in jsdom (AC4)', () => {
  let graph: dia.Graph;
  let paper: dia.Paper;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    graph = new dia.Graph({}, { cellNamespace: { PersonShape } });
    paper = new dia.Paper({
      el: container,
      model: graph,
      width: 800,
      height: 600,
      // Disable interactive features that rely on SVG geometry in jsdom.
      interactive: false,
      cellViewNamespace: { PersonShape },
    });
  });

  afterEach(() => {
    // dia.Paper.remove() is a Backbone View method — JointJS types omit it.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (paper as any).remove();
    container.remove();
  });

  it('AC4: paper creates an SVG element inside the container', () => {
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('AC4: adding a PersonShape renders a circle and a rect in the SVG', () => {
    graph.addCell(new PersonShape());
    expect(container.querySelector('circle')).not.toBeNull();
    expect(container.querySelector('rect')).not.toBeNull();
  });

  it('AC1: rendered head circle has cy=24 and r=35', () => {
    graph.addCell(new PersonShape({ size: { width: 160, height: 120 } }));
    const head = container.querySelector('[joint-selector="head"]');
    expect(numAttr(head, 'cy')).toBe(PERSON_HEAD_CY); // 24
    expect(numAttr(head, 'r')).toBe(PERSON_HEAD_R);   // 35
  });

  it('AC1: rendered head circle cx is half the element width', () => {
    const width = 160;
    graph.addCell(new PersonShape({ size: { width, height: 120 } }));
    const head = container.querySelector('[joint-selector="head"]');
    // calc(0.5*w) should resolve to width / 2 = 80
    expect(numAttr(head, 'cx')).toBeCloseTo(width / 2, 0);
  });

  it('AC1: head cx recenters when element width changes', () => {
    const shape = new PersonShape({ size: { width: 160, height: 120 } });
    graph.addCell(shape);
    shape.resize(200, 120);
    const head = container.querySelector('[joint-selector="head"]');
    expect(numAttr(head, 'cx')).toBeCloseTo(100, 0); // 200 / 2
  });

  it('AC2: rendered body rect starts at y=55', () => {
    graph.addCell(new PersonShape({ size: { width: 160, height: 120 } }));
    const body = container.querySelector('[joint-selector="body"]');
    expect(numAttr(body, 'y')).toBe(PERSON_BODY_Y); // 55
  });

  it('AC2: rendered body height = element height - 59', () => {
    const height = 150;
    graph.addCell(new PersonShape({ size: { width: 160, height } }));
    const body = container.querySelector('[joint-selector="body"]');
    // calc(h-59) should resolve to 150 - 59 = 91
    expect(numAttr(body, 'height')).toBeCloseTo(height - 59, 0);
  });

  it('AC2: body height updates when element is resized', () => {
    const shape = new PersonShape({ size: { width: 160, height: 120 } });
    graph.addCell(shape);
    shape.resize(160, 200);
    const body = container.querySelector('[joint-selector="body"]');
    // calc(h-59) → 200 - 59 = 141
    expect(numAttr(body, 'height')).toBeCloseTo(200 - 59, 0);
  });

  it('AC2: body width matches element width', () => {
    const width = 160;
    graph.addCell(new PersonShape({ size: { width, height: 120 } }));
    const body = container.querySelector('[joint-selector="body"]');
    expect(numAttr(body, 'width')).toBeCloseTo(width, 0);
  });

  it('AC3: applyStyle sets fill on head and body in the rendered SVG', () => {
    const shape = new PersonShape({ size: { width: 160, height: 120 } });
    shape.applyStyle({ background: '#ff0000', stroke: '#000000' });
    graph.addCell(shape);
    const head = container.querySelector('[joint-selector="head"]');
    const body = container.querySelector('[joint-selector="body"]');
    expect(head?.getAttribute('fill')).toBe('#ff0000');
    expect(body?.getAttribute('fill')).toBe('#ff0000');
  });

  it('AC3: applyStyle sets stroke on head and body in the rendered SVG', () => {
    const shape = new PersonShape({ size: { width: 160, height: 120 } });
    shape.applyStyle({ background: '#08427B', stroke: '#052e56' });
    graph.addCell(shape);
    const head = container.querySelector('[joint-selector="head"]');
    const body = container.querySelector('[joint-selector="body"]');
    expect(head?.getAttribute('stroke')).toBe('#052e56');
    expect(body?.getAttribute('stroke')).toBe('#052e56');
  });

  it('AC3: style can be changed after initial render', () => {
    const shape = new PersonShape({ size: { width: 160, height: 120 } });
    graph.addCell(shape);
    shape.applyStyle({ background: '#aabbcc', stroke: 'none' });
    const head = container.querySelector('[joint-selector="head"]');
    expect(head?.getAttribute('fill')).toBe('#aabbcc');
  });
});
