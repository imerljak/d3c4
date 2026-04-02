/**
 * Spike: HexagonShape as a JointJS dia.Element subclass.
 *
 * Validates that JointJS's markup/attrs system can express the Hexagon shape,
 * a single <polygon> whose 6 vertices are computed from the element's width and
 * height — the most complex single-element case.
 *
 * ## Shape anatomy (matches ShapeRegistry.ts drawHexagon)
 *
 *   cx = w/2, cy = h/2, rx = w/2, ry = h/2
 *
 *   Points (clockwise from left vertex):
 *     [cx-rx, cy]         = [0,   h/2]
 *     [cx-rx/2, cy-ry]    = [w/4, 0  ]
 *     [cx+rx/2, cy-ry]    = [3w/4,0  ]
 *     [cx+rx,  cy]        = [w,   h/2]
 *     [cx+rx/2, cy+ry]    = [3w/4,h  ]
 *     [cx-rx/2, cy+ry]    = [w/4, h  ]
 *
 *   Simplified with cx=w/2, rx=w/2, cy=h/2, ry=h/2:
 *     0,h/2  w/4,0  3w/4,0  w,h/2  3w/4,h  w/4,h
 *
 * ## Key finding: calc() in the `points` attribute
 *
 * JointJS's `evalCalcAttribute()` processes the full attribute string and
 * replaces every `calc(...)` occurrence independently. This means a `points`
 * string containing multiple calc() expressions is evaluated correctly in a
 * single pass:
 *
 *   points = "0,calc(0.5*h) calc(0.25*w),0 calc(0.75*w),0 calc(w),calc(0.5*h) calc(0.75*w),calc(h) calc(0.25*w),calc(h)"
 *
 * No custom presentation attribute is required. This is the most elegant of
 * the three shapes: a single element with a points string using 9 calc()
 * expressions (vertices 1-3 each have one fixed coord; vertices 4-6 have two),
 * all resolved in one rendering pass.
 */

import { dia } from 'jointjs';
import type { ResolvedElementStyle } from '../parser/types.js';

/** Hexagon points string using JointJS calc() expressions. */
const HEXAGON_POINTS =
  '0,calc(0.5*h) calc(0.25*w),0 calc(0.75*w),0 calc(w),calc(0.5*h) calc(0.75*w),calc(h) calc(0.25*w),calc(h)';

export class HexagonShape extends dia.Element {
  defaults(): Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseDefaults = (dia.Element.prototype as any).defaults as Record<string, unknown>;
    return {
      ...baseDefaults,
      type: 'HexagonShape',
      size: { width: 160, height: 120 },
      markup: [
        { tagName: 'polygon', selector: 'body' },
      ],
      attrs: {
        body: {
          points: HEXAGON_POINTS,
          fill: '#438DD5',
          stroke: 'none',
          strokeWidth: 0,
        },
      },
    };
  }

  /** Apply Structurizr style properties to the polygon body. */
  applyStyle(
    style: Pick<ResolvedElementStyle, 'background' | 'stroke'> & {
      strokeWidth?: number;
    },
  ): this {
    this.attr({
      body: {
        fill: style.background,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth ?? 0,
      },
    });
    return this;
  }
}
