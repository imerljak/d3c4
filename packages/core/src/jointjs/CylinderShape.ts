/**
 * Spike: CylinderShape as a JointJS dia.Element subclass.
 *
 * Validates that JointJS's markup/attrs system can express the Cylinder shape,
 * which is composed of three coordinated SVG elements:
 *   - A <rect> body that starts below the top cap and ends above the bottom cap.
 *   - Two <ellipse> caps (top + bottom) that simulate the open/closed cylinder ends.
 *
 * ## Shape anatomy (matches ShapeRegistry.ts drawCylinder)
 *
 *   const ry = 10  (hardcoded cap radius, matches ShapeRegistry.ts)
 *
 *   Body rect:    x=0, y=ry=10, width=w, height=h-ry*2=h-20
 *   Top cap:      cx=w/2, cy=ry=10, rx=w/2, ry=10
 *   Bottom cap:   cx=w/2, cy=h-ry=h-10, rx=w/2, ry=10
 *
 * ## Key finding
 *
 * All three elements can be expressed with JointJS calc() expressions.
 * No custom attribute or workaround is needed — the standard calc() system
 * handles all cases including the ellipse radii and the bottom-cap cy offset.
 */

import { dia } from 'jointjs';
import type { ResolvedElementStyle } from '../parser/types.js';

/** Vertical radius of the cylinder's end caps. Matches ShapeRegistry.ts `const ry = 10`. */
export const CYLINDER_CAP_RY = 10;

export class CylinderShape extends dia.Element {
  defaults(): Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseDefaults = (dia.Element.prototype as any).defaults as Record<string, unknown>;
    return {
      ...baseDefaults,
      type: 'CylinderShape',
      size: { width: 160, height: 120 },
      markup: [
        // The body rect sits between the two caps.
        { tagName: 'rect',    selector: 'body' },
        // Top ellipse cap — renders over the top edge of the body.
        { tagName: 'ellipse', selector: 'capTop' },
        // Bottom ellipse cap — renders over the bottom edge of the body.
        { tagName: 'ellipse', selector: 'capBottom' },
      ],
      attrs: {
        body: {
          x: 0,
          y: CYLINDER_CAP_RY,
          width: 'calc(w)',
          // height = element.height - ry*2 = element.height - 20
          height: `calc(h-${CYLINDER_CAP_RY * 2})`,
          fill: '#438DD5',
          stroke: 'none',
          strokeWidth: 0,
        },
        capTop: {
          cx: 'calc(0.5*w)',
          cy: CYLINDER_CAP_RY,
          rx: 'calc(0.5*w)',
          ry: CYLINDER_CAP_RY,
          fill: '#438DD5',
          stroke: 'none',
          strokeWidth: 0,
        },
        capBottom: {
          cx: 'calc(0.5*w)',
          // cy = element.height - ry = element.height - 10
          cy: `calc(h-${CYLINDER_CAP_RY})`,
          rx: 'calc(0.5*w)',
          ry: CYLINDER_CAP_RY,
          fill: '#438DD5',
          stroke: 'none',
          strokeWidth: 0,
        },
      },
    };
  }

  /** Apply Structurizr style properties to all three sub-elements. */
  applyStyle(
    style: Pick<ResolvedElementStyle, 'background' | 'stroke'> & {
      strokeWidth?: number;
    },
  ): this {
    const strokeWidth = style.strokeWidth ?? 0;
    this.attr({
      body:      { fill: style.background, stroke: style.stroke, strokeWidth },
      capTop:    { fill: style.background, stroke: style.stroke, strokeWidth },
      capBottom: { fill: style.background, stroke: style.stroke, strokeWidth },
    });
    return this;
  }
}
