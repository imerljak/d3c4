import type { ElementStyle, RelationshipStyle, Styles, Shape } from '@d3c4/types';
import type { ResolvedElementStyle, ResolvedRelationshipStyle } from './types.js';

// C4 default color palette
const C4_DEFAULTS: Record<string, Partial<ResolvedElementStyle>> = {
  Person: { background: '#08427B', color: '#ffffff', shape: 'Person' },
  'Software System': { background: '#1168BD', color: '#ffffff', shape: 'RoundedBox' },
  Container: { background: '#438DD5', color: '#ffffff', shape: 'RoundedBox' },
  Component: { background: '#85BBF0', color: '#000000', shape: 'Component' },
  DeploymentNode: { background: 'transparent', color: '#000000', shape: 'Box' },
  InfrastructureNode: { background: '#ffffff', color: '#000000', shape: 'RoundedBox' },
};

const DEFAULT_ELEMENT_STYLE: ResolvedElementStyle = {
  background: '#dddddd',
  color: '#000000',
  stroke: '#9a9a9a',
  shape: 'RoundedBox',
  fontSize: 14,
  border: 'Solid',
  opacity: 100,
};

const DEFAULT_RELATIONSHIP_STYLE: ResolvedRelationshipStyle = {
  color: '#707070',
  thickness: 2,
  dashed: true,
  routing: 'Direct',
  fontSize: 12,
};

export function resolveElementStyle(
  elementType: string,
  tags: string[],
  styles: Styles | undefined,
): ResolvedElementStyle {
  // Start from defaults
  let resolved: ResolvedElementStyle = { ...DEFAULT_ELEMENT_STYLE };

  // Apply C4 type defaults
  const typeDefault = C4_DEFAULTS[elementType];
  if (typeDefault) {
    resolved = { ...resolved, ...typeDefault };
  }

  // Apply tag-based styles (later entries win)
  if (styles?.elements) {
    for (const styleRule of styles.elements) {
      if (tags.includes(styleRule.tag) || styleRule.tag === 'Element') {
        resolved = mergeElementStyle(resolved, styleRule);
      }
    }
  }

  return resolved;
}

export function resolveRelationshipStyle(
  tags: string[],
  styles: Styles | undefined,
): ResolvedRelationshipStyle {
  let resolved: ResolvedRelationshipStyle = { ...DEFAULT_RELATIONSHIP_STYLE };

  if (styles?.relationships) {
    for (const styleRule of styles.relationships) {
      if (tags.includes(styleRule.tag) || styleRule.tag === 'Relationship') {
        resolved = mergeRelationshipStyle(resolved, styleRule);
      }
    }
  }

  return resolved;
}

function mergeElementStyle(
  base: ResolvedElementStyle,
  rule: ElementStyle,
): ResolvedElementStyle {
  return {
    background: rule.background ?? base.background,
    color: rule.color ?? base.color,
    stroke: rule.stroke ?? base.stroke,
    shape: (rule.shape as Shape) ?? base.shape,
    fontSize: rule.fontSize ?? base.fontSize,
    border: rule.border ?? base.border,
    opacity: rule.opacity ?? base.opacity,
  };
}

function mergeRelationshipStyle(
  base: ResolvedRelationshipStyle,
  rule: RelationshipStyle,
): ResolvedRelationshipStyle {
  return {
    color: rule.color ?? base.color,
    thickness: rule.thickness ?? base.thickness,
    dashed: rule.dashed ?? base.dashed,
    routing: rule.routing ?? base.routing,
    fontSize: rule.fontSize ?? base.fontSize,
  };
}

export function tagsFromString(tagStr: string | undefined): string[] {
  if (!tagStr) return [];
  return tagStr
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}
