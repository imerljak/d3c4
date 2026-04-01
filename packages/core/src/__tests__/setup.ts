/**
 * Vitest global setup — runs before each test file, before any module imports
 * are evaluated.
 *
 * ## Why these polyfills are needed
 *
 * JointJS's Vectorizer (V module) gates all SVG functionality on a startup
 * feature check:
 *
 *   var hasSvg = typeof window === 'object' && !!window.SVGAngle;
 *
 * jsdom provides `SVGElement`, can create SVG nodes via `createElementNS`,
 * and implements basic SVG DOM — but it does NOT expose `window.SVGAngle`,
 * `SVGSVGElement.prototype.createSVGMatrix`, or
 * `SVGSVGElement.prototype.createSVGPoint`.
 *
 * Without `SVGAngle`, V initialises as a stub and `V.namespace` is undefined,
 * crashing `dia.Paper` on first render. Without `createSVGMatrix` and
 * `createSVGPoint`, JointJS cannot resolve element transform strings or
 * compute relative-attribute positions.
 *
 * The polyfills below are minimal but correct implementations of the W3C
 * SVGMatrix / SVGPoint interfaces. They are sufficient for JointJS v3.7 to
 * render element markup and resolve `calc()` attr expressions in jsdom.
 */

// ---------------------------------------------------------------------------
// 1. SVGAngle — enables JointJS's V (Vectorizer) module to initialise.
// ---------------------------------------------------------------------------
Object.defineProperty(window, 'SVGAngle', {
  value: { SVG_ANGLETYPE_UNKNOWN: 0, SVG_ANGLETYPE_UNSPECIFIED: 1 },
  writable: true,
  configurable: true,
});

// ---------------------------------------------------------------------------
// 2. SVGMatrix — required by V.createSVGMatrix() / transformStringToMatrix().
//    Implements the W3C SVGMatrix interface (2D affine transform).
// ---------------------------------------------------------------------------
class SVGMatrix2D {
  a = 1; b = 0;
  c = 0; d = 1;
  e = 0; f = 0;

  multiply(m: SVGMatrix2D): SVGMatrix2D {
    const r = new SVGMatrix2D();
    r.a = this.a * m.a + this.c * m.b;
    r.b = this.b * m.a + this.d * m.b;
    r.c = this.a * m.c + this.c * m.d;
    r.d = this.b * m.c + this.d * m.d;
    r.e = this.a * m.e + this.c * m.f + this.e;
    r.f = this.b * m.e + this.d * m.f + this.f;
    return r;
  }

  translate(tx: number, ty: number): SVGMatrix2D {
    const r = new SVGMatrix2D();
    r.a = this.a; r.b = this.b;
    r.c = this.c; r.d = this.d;
    r.e = this.a * tx + this.c * ty + this.e;
    r.f = this.b * tx + this.d * ty + this.f;
    return r;
  }

  scale(s: number): SVGMatrix2D {
    return this.scaleNonUniform(s, s);
  }

  scaleNonUniform(sx: number, sy: number): SVGMatrix2D {
    const r = new SVGMatrix2D();
    r.a = this.a * sx; r.b = this.b * sy;
    r.c = this.c * sx; r.d = this.d * sy;
    r.e = this.e;      r.f = this.f;
    return r;
  }

  rotate(deg: number): SVGMatrix2D {
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const m = new SVGMatrix2D();
    m.a = cos; m.b = sin; m.c = -sin; m.d = cos;
    return this.multiply(m);
  }

  skewX(deg: number): SVGMatrix2D {
    const m = new SVGMatrix2D();
    m.c = Math.tan((deg * Math.PI) / 180);
    return this.multiply(m);
  }

  skewY(deg: number): SVGMatrix2D {
    const m = new SVGMatrix2D();
    m.b = Math.tan((deg * Math.PI) / 180);
    return this.multiply(m);
  }

  inverse(): SVGMatrix2D {
    const det = this.a * this.d - this.b * this.c;
    const r = new SVGMatrix2D();
    r.a =  this.d / det;
    r.b = -this.b / det;
    r.c = -this.c / det;
    r.d =  this.a / det;
    r.e = (this.c * this.f - this.d * this.e) / det;
    r.f = (this.b * this.e - this.a * this.f) / det;
    return r;
  }

  // SVGTransform compatibility
  flipX(): SVGMatrix2D { return this.scaleNonUniform(-1, 1); }
  flipY(): SVGMatrix2D { return this.scaleNonUniform(1, -1); }
}

// ---------------------------------------------------------------------------
// 3. SVGPoint — required by V.createSVGPoint() for hit-testing helpers.
// ---------------------------------------------------------------------------
class SVGPoint2D {
  x = 0;
  y = 0;

  matrixTransform(m: SVGMatrix2D): SVGPoint2D {
    const r = new SVGPoint2D();
    r.x = m.a * this.x + m.c * this.y + m.e;
    r.y = m.b * this.x + m.d * this.y + m.f;
    return r;
  }
}

// ---------------------------------------------------------------------------
// 4. SVGTransform stub — required by V.createSVGTransform().
// ---------------------------------------------------------------------------
class SVGTransform2D {
  matrix = new SVGMatrix2D();
  type = 1; // SVG_TRANSFORM_MATRIX
  angle = 0;

  setMatrix(m: SVGMatrix2D) { this.matrix = m; }
  setTranslate(tx: number, ty: number) {
    this.type = 2; // SVG_TRANSFORM_TRANSLATE
    this.matrix = new SVGMatrix2D().translate(tx, ty);
  }
}

// ---------------------------------------------------------------------------
// 5. Attach polyfills to SVGSVGElement prototype.
// ---------------------------------------------------------------------------
const svg = window.SVGSVGElement.prototype as unknown as Record<string, unknown>;

svg['createSVGMatrix'] = function (): SVGMatrix2D {
  return new SVGMatrix2D();
};

svg['createSVGPoint'] = function (): SVGPoint2D {
  return new SVGPoint2D();
};

svg['createSVGTransform'] = function (): SVGTransform2D {
  return new SVGTransform2D();
};

svg['createSVGTransformFromMatrix'] = function (m: SVGMatrix2D): SVGTransform2D {
  const t = new SVGTransform2D();
  t.setMatrix(m);
  return t;
};
