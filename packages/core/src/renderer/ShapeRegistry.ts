import { dia } from 'jointjs';
import type { ResolvedElementStyle } from '../parser/types.js';
import type { LayoutNode } from '../layout/types.js';

// ─── Shape constants (kept in sync with LayoutEngine) ────────────────────────

const PERSON_HEAD_CY = 24;
const PERSON_HEAD_R  = 35;
const PERSON_BODY_Y  = PERSON_HEAD_CY + PERSON_HEAD_R - 4; // 55

// ─── Text badge helper ─────────────────────────────────────────────────────────

export interface ShapeContent {
  badge: string | null;
  name: string;
  description: string | undefined;
  style: ResolvedElementStyle;
}

function makeBadge(style: ResolvedElementStyle, name: string): string | null {
  // ShapeContent comes from ResolvedElement; we only have the style here,
  // so the caller passes badge text explicitly.
  return null; // always overridden by the caller
}

// ─── Per-shape markup + attrs builders ───────────────────────────────────────

/** Returns base markup: shape sub-elements + badge/label/desc text elements. */
function textMarkup(): Array<{ tagName: string; selector: string }> {
  return [
    { tagName: 'text', selector: 'badge' },
    { tagName: 'text', selector: 'label' },
    { tagName: 'text', selector: 'desc'  },
  ];
}

function textAttrs(
  content: ShapeContent,
  textY: number,   // y of first text line (badge), in element-local coords
  width: number,
): Record<string, unknown> {
  const { badge, name, description, style } = content;
  const fs = style.fontSize ?? 14;
  const color = style.color ?? '#ffffff';

  return {
    badge: badge ? {
      text: badge,
      x: width / 2,
      y: textY,
      textAnchor: 'middle',
      fontFamily: 'sans-serif',
      fontSize: Math.max(fs - 3, 10),
      fill: color,
    } : { display: 'none' },

    label: {
      text: name,
      x: width / 2,
      y: badge ? textY + (fs - 2) + fs + 4 : textY + (description ? fs : fs / 2),
      textAnchor: 'middle',
      fontFamily: 'sans-serif',
      fontSize: fs,
      fontWeight: 'bold',
      fill: color,
    },

    desc: description ? {
      text: description,
      x: width / 2,
      y: badge
        ? textY + (fs - 2) + fs + 4 + fs + 6 + Math.max(fs - 3, 10)
        : textY + fs + 4 + Math.max(fs - 3, 10),
      textAnchor: 'middle',
      fontFamily: 'sans-serif',
      fontSize: Math.max(fs - 3, 10),
      fill: color,
    } : { display: 'none' },
  };
}

// ─── Shape-specific cell builders ─────────────────────────────────────────────

function buildBox(node: LayoutNode, content: ShapeContent, rx = 0): dia.Element {
  const { width: w, height: h } = node;
  const { background: fill, stroke } = content.style;
  return new dia.Element({
    id:       node.id,
    position: { x: node.x - w / 2, y: node.y - h / 2 },
    size:     { width: w, height: h },
    markup: [
      { tagName: 'rect', selector: 'body' },
      ...textMarkup(),
    ],
    attrs: {
      body: { x: 0, y: 0, width: 'calc(w)', height: 'calc(h)', rx, fill, stroke, strokeWidth: 0 },
      ...textAttrs(content, h * 0.15, w),
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

function buildPerson(node: LayoutNode, content: ShapeContent): dia.Element {
  const { width: w, height: h } = node;
  const { background: fill, stroke } = content.style;
  const bodyY = PERSON_BODY_Y;
  return new dia.Element({
    id:       node.id,
    position: { x: node.x - w / 2, y: node.y - h / 2 },
    size:     { width: w, height: h },
    markup: [
      { tagName: 'circle', selector: 'head' },
      { tagName: 'rect',   selector: 'body' },
      ...textMarkup(),
    ],
    attrs: {
      head: { cx: 'calc(0.5*w)', cy: PERSON_HEAD_CY, r: PERSON_HEAD_R, fill, stroke, strokeWidth: 0 },
      body: { x: 0, y: bodyY, width: 'calc(w)', height: `calc(h-${bodyY + 4})`, rx: 6, fill, stroke, strokeWidth: 0 },
      // Text positioned inside the body rect (below the head)
      ...textAttrs(content, bodyY + 8, w),
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

function buildCylinder(node: LayoutNode, content: ShapeContent): dia.Element {
  const { width: w, height: h } = node;
  const { background: fill, stroke } = content.style;
  const ry = 10;
  return new dia.Element({
    id:       node.id,
    position: { x: node.x - w / 2, y: node.y - h / 2 },
    size:     { width: w, height: h },
    markup: [
      { tagName: 'rect',    selector: 'body'      },
      { tagName: 'ellipse', selector: 'capBottom' },
      { tagName: 'ellipse', selector: 'capTop'    },
      ...textMarkup(),
    ],
    attrs: {
      body:      { x: 0, y: ry, width: 'calc(w)', height: `calc(h-${ry * 2})`, fill, stroke, strokeWidth: 0 },
      capBottom: { cx: 'calc(0.5*w)', cy: `calc(h-${ry})`, rx: 'calc(0.5*w)', ry, fill, stroke, strokeWidth: 0 },
      capTop:    { cx: 'calc(0.5*w)', cy: ry, rx: 'calc(0.5*w)', ry, fill, stroke, strokeWidth: 0 },
      ...textAttrs(content, h * 0.15 + ry, w),
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

function buildComponent(node: LayoutNode, content: ShapeContent): dia.Element {
  const { width: w, height: h } = node;
  const { background: fill, stroke } = content.style;
  const NOTCH_W = 12, NOTCH_H = 8, NOTCH_X = -6;
  return new dia.Element({
    id:       node.id,
    position: { x: node.x - w / 2, y: node.y - h / 2 },
    size:     { width: w, height: h },
    markup: [
      { tagName: 'rect', selector: 'body'   },
      { tagName: 'rect', selector: 'notch1' },
      { tagName: 'rect', selector: 'notch2' },
      ...textMarkup(),
    ],
    attrs: {
      body:   { x: 0, y: 0, width: 'calc(w)', height: 'calc(h)', rx: 4, fill, stroke, strokeWidth: 0 },
      notch1: { x: NOTCH_X, y: 'calc(h/3-4)', width: NOTCH_W, height: NOTCH_H, rx: 2, fill, stroke, strokeWidth: 2 },
      notch2: { x: NOTCH_X, y: 'calc(2*h/3-4)', width: NOTCH_W, height: NOTCH_H, rx: 2, fill, stroke, strokeWidth: 0 },
      ...textAttrs(content, h * 0.15, w),
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

function buildCircle(node: LayoutNode, content: ShapeContent): dia.Element {
  const { width: w, height: h } = node;
  const { background: fill, stroke } = content.style;
  return new dia.Element({
    id:       node.id,
    position: { x: node.x - w / 2, y: node.y - h / 2 },
    size:     { width: w, height: h },
    markup: [
      { tagName: 'ellipse', selector: 'body' },
      ...textMarkup(),
    ],
    attrs: {
      body: { cx: 'calc(0.5*w)', cy: 'calc(0.5*h)', rx: 'calc(0.5*w)', ry: 'calc(0.5*h)', fill, stroke, strokeWidth: 0 },
      ...textAttrs(content, h * 0.3, w),
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

function buildHexagon(node: LayoutNode, content: ShapeContent): dia.Element {
  const { width: w, height: h } = node;
  const { background: fill, stroke } = content.style;
  const pts = '0,calc(0.5*h) calc(0.25*w),0 calc(0.75*w),0 calc(w),calc(0.5*h) calc(0.75*w),calc(h) calc(0.25*w),calc(h)';
  return new dia.Element({
    id:       node.id,
    position: { x: node.x - w / 2, y: node.y - h / 2 },
    size:     { width: w, height: h },
    markup: [
      { tagName: 'polygon', selector: 'body' },
      ...textMarkup(),
    ],
    attrs: {
      body: { points: pts, fill, stroke, strokeWidth: 0 },
      ...textAttrs(content, h * 0.25, w),
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

// ─── Boundary cell ───────────────────────────────────────────────────────────

/** Creates a dashed boundary rect for SoftwareSystem/Container clusters. */
export function createBoundaryCell(
  element: { name: string; type: string; style: ResolvedElementStyle },
  nodes: LayoutNode[],
): dia.Element | null {
  const innerType = element.type === 'SoftwareSystem' ? 'Container' : 'Component';
  const innerNodes = nodes.filter((n) => n.element.type === innerType);
  if (innerNodes.length === 0) return null;

  const H_PAD = 20, TOP_PAD = 20, BOTTOM_PAD = 52;
  const minX = Math.min(...innerNodes.map((n) => n.x - n.width  / 2)) - H_PAD;
  const minY = Math.min(...innerNodes.map((n) => n.y - n.height / 2)) - TOP_PAD;
  const maxX = Math.max(...innerNodes.map((n) => n.x + n.width  / 2)) + H_PAD;
  const maxY = Math.max(...innerNodes.map((n) => n.y + n.height / 2)) + BOTTOM_PAD;

  const w = maxX - minX;
  const h = maxY - minY;
  const color = element.style.background;
  const fs = 13;

  return new dia.Element({
    id:       `boundary-${element.name}`,
    position: { x: minX, y: minY },
    size:     { width: w, height: h },
    markup: [
      { tagName: 'rect', selector: 'border' },
      { tagName: 'text', selector: 'name'   },
      { tagName: 'text', selector: 'badge'  },
    ],
    attrs: {
      border: {
        x: 0, y: 0, width: 'calc(w)', height: 'calc(h)',
        fill: color, fillOpacity: 0.05,
        stroke: color, strokeWidth: 2, strokeDasharray: '10,5',
      },
      name: {
        text: element.name,
        x: 10, y: `calc(h-${8 + (fs - 1) + fs + 2})`,
        fontFamily: 'sans-serif', fontSize: fs, fontWeight: 'bold', fill: color,
        textAnchor: 'start',
      },
      badge: {
        text: `[${element.type === 'SoftwareSystem' ? 'Software System' : element.type}]`,
        x: 10, y: `calc(h-8)`,
        fontFamily: 'sans-serif', fontSize: fs - 2, fill: color,
        fontStyle: 'italic', textAnchor: 'start',
      },
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

// ─── Public factory ───────────────────────────────────────────────────────────

/**
 * Creates a JointJS `dia.Element` for a layout node.
 * The element ID is set to `node.id` for stable cross-render identity.
 */
export function createShapeCell(node: LayoutNode, content: ShapeContent): dia.Element {
  const shape = content.style.shape;
  switch (shape) {
    case 'Person':     return buildPerson(node, content);
    case 'Cylinder':   return buildCylinder(node, content);
    case 'Component':  return buildComponent(node, content);
    case 'Circle':
    case 'Ellipse':    return buildCircle(node, content);
    case 'Hexagon':    return buildHexagon(node, content);
    case 'Box':        return buildBox(node, content, 0);
    case 'RoundedBox':
    default:           return buildBox(node, content, 8);
  }
}
