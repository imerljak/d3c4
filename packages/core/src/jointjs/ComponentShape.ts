/**
 * Spike: ComponentShape as a JointJS dia.Element subclass.
 *
 * Validates that JointJS's markup/attrs system can express the Component shape,
 * which is composed of three SVG elements:
 *   - A <rect> main body with slight rounded corners.
 *   - Two small <rect> notches on the left side at proportional y-positions.
 *
 * ## Shape anatomy (matches ShapeRegistry.ts drawComponent)
 *
 *   Main body:  x=0, y=0, width=w, height=h, rx=4
 *   Notch 1:    x=-6, y=h/3-4,   width=12, height=8, rx=2, stroke-width=2
 *   Notch 2:    x=-6, y=2*h/3-4, width=12, height=8, rx=2
 *
 *   notchW = 12, notchH = 8, notchX = -notchW/2 = -6
 *   notchY1 = h/3 - notchH/2 = h/3 - 4
 *   notchY2 = 2*h/3 - notchH/2 = 2*h/3 - 4
 *
 * ## Key finding: multi-term calc() expressions
 *
 * JointJS's calc() regex supports:  [multiplier*]property[/divisor][+/-offset]
 *
 *   `calc(h/3-4)`   = height / 3 - 4   (matched as property=h, divide=3, add=-4)
 *   `calc(2*h/3-4)` = 2*height / 3 - 4 (matched as multiply=2, property=h, divide=3, add=-4)
 *
 * Both notch y-positions are expressible without any custom attribute. No
 * workaround is required.
 */

import { dia } from 'jointjs';
import type { ResolvedElementStyle } from '../parser/types.js';

const NOTCH_W = 12;
const NOTCH_H = 8;
const NOTCH_X = -(NOTCH_W / 2); // -6

export class ComponentShape extends dia.Element {
  defaults(): Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseDefaults = (dia.Element.prototype as any).defaults as Record<string, unknown>;
    return {
      ...baseDefaults,
      type: 'ComponentShape',
      size: { width: 160, height: 120 },
      markup: [
        // Main body rectangle.
        { tagName: 'rect', selector: 'body' },
        // Top notch — positioned at h/3, stroke-width=2 (matches ShapeRegistry).
        { tagName: 'rect', selector: 'notch1' },
        // Bottom notch — positioned at 2h/3.
        { tagName: 'rect', selector: 'notch2' },
      ],
      attrs: {
        body: {
          x: 0,
          y: 0,
          width: 'calc(w)',
          height: 'calc(h)',
          rx: 4,
          fill: '#85BBF0',
          stroke: 'none',
          strokeWidth: 0,
        },
        notch1: {
          x: NOTCH_X,
          // y = h/3 - notchH/2 = h/3 - 4
          y: `calc(h/3-${NOTCH_H / 2})`,
          width: NOTCH_W,
          height: NOTCH_H,
          rx: 2,
          fill: '#85BBF0',
          stroke: 'none',
          // Note: ShapeRegistry.ts uses stroke-width=2 on notch1 (hardcoded).
          // This is preserved here. applyStyle() will override fill/stroke but
          // notch1's strokeWidth=2 is fixed — it is part of the shape grammar,
          // not a Structurizr style property.
          strokeWidth: 2,
        },
        notch2: {
          x: NOTCH_X,
          // y = 2*h/3 - notchH/2 = 2*h/3 - 4
          y: `calc(2*h/3-${NOTCH_H / 2})`,
          width: NOTCH_W,
          height: NOTCH_H,
          rx: 2,
          fill: '#85BBF0',
          stroke: 'none',
          strokeWidth: 0,
        },
      },
    };
  }

  /** Apply Structurizr style properties. The notch1 stroke-width=2 is preserved. */
  applyStyle(
    style: Pick<ResolvedElementStyle, 'background' | 'stroke'> & {
      strokeWidth?: number;
    },
  ): this {
    const strokeWidth = style.strokeWidth ?? 0;
    this.attr({
      body:   { fill: style.background, stroke: style.stroke, strokeWidth },
      notch1: { fill: style.background, stroke: style.stroke },
      // notch1 strokeWidth=2 is intentionally NOT overridden — it is a structural
      // attribute of the Component shape, not a style property.
      notch2: { fill: style.background, stroke: style.stroke },
    });
    return this;
  }
}
