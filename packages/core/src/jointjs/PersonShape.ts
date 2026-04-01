/**
 * Spike: PersonShape as a JointJS dia.Element subclass.
 *
 * Validates whether JointJS's markup/attrs system can express d3c4's most
 * structurally complex shape — the Person shape — before committing to a full
 * migration from D3 to JointJS.
 *
 * ## Shape anatomy (matches ShapeRegistry.ts)
 *
 *   Head:  <circle cx="calc(0.5*w)" cy=24 r=35 />
 *   Body:  <rect x=0 y=55 width="calc(w)" height="calc(h-59)" rx=6 />
 *
 * Body height is dynamically derived from the element's total height:
 *   bodyHeight = totalHeight - PERSON_BODY_Y - BODY_BOTTOM_PADDING
 *              = totalHeight - 55 - 4
 *              = totalHeight - 59
 *
 * ## Key finding: JointJS calc() syntax
 *
 * JointJS v3.7 supports a `calc()` string expression in SVG attrs:
 *   - `calc(w)`      → element width
 *   - `calc(h)`      → element height
 *   - `calc(0.5*w)`  → half of element width
 *   - `calc(h-59)`   → element height minus 59
 *
 * Supported attributes include: cx, cy, x, y, width, height, r, rx, ry, d,
 * points, transform. This is sufficient to express the Person shape fully.
 *
 * ## Known discrepancy (pre-existing, not addressed in this spike)
 *
 * LayoutEngine.ts uses PERSON_BODY_Y = 46, but ShapeRegistry.ts calculates
 * PERSON_BODY_Y = PERSON_HEAD_CY + PERSON_HEAD_R - 4 = 55. This spike uses
 * the ShapeRegistry value (55) as it drives the actual rendered SVG output.
 */

import { dia } from 'jointjs';
import type { ResolvedElementStyle } from '../parser/types.js';

// ---------------------------------------------------------------------------
// Constants — kept in sync with ShapeRegistry.ts
// ---------------------------------------------------------------------------

/** Vertical centre of the head circle, from the element's top edge. */
export const PERSON_HEAD_CY = 24;

/** Radius of the head circle. */
export const PERSON_HEAD_R = 35;

/**
 * Y coordinate where the body rectangle begins.
 * Formula: PERSON_HEAD_CY + PERSON_HEAD_R - 4 = 55.
 * Must stay in sync with PERSON_BODY_Y in LayoutEngine.ts and
 * PERSON_TEXT_START_Y in ElementRenderer.ts.
 */
export const PERSON_BODY_Y = PERSON_HEAD_CY + PERSON_HEAD_R - 4; // 55

/** Bottom padding below the body rectangle. */
const BODY_BOTTOM_PADDING = 4;

// ---------------------------------------------------------------------------
// PersonShape
// ---------------------------------------------------------------------------

/**
 * JointJS Element representing the d3c4 Person shape.
 *
 * The shape is a composite of two SVG elements:
 *  - A circle for the head, horizontally centered, at fixed cy/r.
 *  - A rounded rectangle for the body, full-width, with dynamic height.
 *
 * Dynamic sizing is expressed via JointJS calc() expressions so that JointJS
 * automatically recomputes the SVG attributes whenever the element is resized.
 */
export class PersonShape extends dia.Element {
  defaults(): Record<string, unknown> {
    // NOTE: dia.Element.prototype.defaults is a plain object, not a function —
    // calling super.defaults() would throw. We spread it directly instead.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseDefaults = (dia.Element.prototype as any).defaults as Record<string, unknown>;
    return {
      ...baseDefaults,
      type: 'PersonShape',
      // Default size matches the D3 renderer's default Person dimensions.
      size: { width: 160, height: 120 },
      markup: [
        // Head circle (rendered first so the body overlaps the overlap area
        // consistently with the D3 implementation).
        { tagName: 'circle', selector: 'head' },
        // Body rounded rectangle.
        { tagName: 'rect', selector: 'body' },
      ],
      attrs: {
        head: {
          // cx is dynamically centred using calc(). Workaround: JointJS also
          // supports refCx:'50%' for percentage-based positioning, but the
          // calc() form is more explicit and matches the D3 implementation.
          cx: 'calc(0.5*w)',
          cy: PERSON_HEAD_CY,
          r: PERSON_HEAD_R,
          fill: '#08427B',
          stroke: 'none',
          strokeWidth: 0,
        },
        body: {
          x: 0,
          y: PERSON_BODY_Y,
          // Full element width via calc().
          width: 'calc(w)',
          // Dynamic height: subtract the fixed head area and bottom padding.
          // calc(h-59) = element.height - 55 - 4
          height: `calc(h-${PERSON_BODY_Y + BODY_BOTTOM_PADDING})`,
          rx: 6,
          fill: '#08427B',
          stroke: 'none',
          strokeWidth: 0,
        },
      },
    };
  }

  /**
   * Apply Structurizr style properties to both sub-elements.
   *
   * Accepts a subset of ResolvedElementStyle. Only the visual attributes that
   * differ between elements are applied here; geometry is handled by the
   * markup/attrs defaults above.
   */
  applyStyle(
    style: Pick<ResolvedElementStyle, 'background' | 'stroke'> & {
      strokeWidth?: number;
    },
  ): this {
    const strokeWidth = style.strokeWidth ?? 0;
    this.attr({
      head: {
        fill: style.background,
        stroke: style.stroke,
        strokeWidth,
      },
      body: {
        fill: style.background,
        stroke: style.stroke,
        strokeWidth,
      },
    });
    return this;
  }
}
