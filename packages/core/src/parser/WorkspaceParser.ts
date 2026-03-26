import type {
  StructurizrWorkspace,
  ModelElement,
  Relationship,
  DiagramView,
  Styles,
} from '@d3c4/types';
import { resolveElementStyle, resolveRelationshipStyle, tagsFromString } from './StyleResolver.js';
import type { ResolvedElement, ResolvedRelationship, ResolvedWorkspace } from './types.js';

export class WorkspaceParser {
  parse(workspace: StructurizrWorkspace): ResolvedWorkspace {
    const styles: Styles | undefined =
      workspace.views.configuration?.styles ?? workspace.configuration?.styles;

    const elementMap = new Map<string, ResolvedElement>();
    const relationshipMap = new Map<string, ResolvedRelationship>();

    // Flatten all elements from the model tree
    this.flattenElements(workspace, elementMap, styles);
    // Collect all relationships
    this.collectRelationships(workspace, relationshipMap, styles);

    // Collect all views into a flat array
    const views: DiagramView[] = [
      ...(workspace.views.systemLandscapeViews ?? []),
      ...(workspace.views.systemContextViews ?? []),
      ...(workspace.views.containerViews ?? []),
      ...(workspace.views.componentViews ?? []),
      ...(workspace.views.deploymentViews ?? []),
      ...(workspace.views.dynamicViews ?? []),
    ];

    return { elementMap, relationshipMap, views, raw: workspace };
  }

  private flattenElements(
    workspace: StructurizrWorkspace,
    elementMap: Map<string, ResolvedElement>,
    styles: Styles | undefined,
  ): void {
    const { people = [], softwareSystems = [] } = workspace.model;

    for (const person of people) {
      const tags = tagsFromString(person.tags);
      if (!tags.includes('Person')) tags.unshift('Person');
      elementMap.set(person.id, {
        id: person.id,
        name: person.name,
        description: person.description,
        type: 'Person',
        tags,
        style: resolveElementStyle('Person', tags, styles),
      });
    }

    for (const ss of softwareSystems) {
      const tags = tagsFromString(ss.tags);
      if (!tags.includes('Software System')) tags.unshift('Software System');
      elementMap.set(ss.id, {
        id: ss.id,
        name: ss.name,
        description: ss.description,
        type: 'SoftwareSystem',
        tags,
        style: resolveElementStyle('Software System', tags, styles),
      });

      for (const container of ss.containers ?? []) {
        const cTags = tagsFromString(container.tags);
        if (!cTags.includes('Container')) cTags.unshift('Container');
        elementMap.set(container.id, {
          id: container.id,
          name: container.name,
          description: container.description,
          type: 'Container',
          technology: container.technology,
          tags: cTags,
          style: resolveElementStyle('Container', cTags, styles),
        });

        for (const component of container.components ?? []) {
          const compTags = tagsFromString(component.tags);
          if (!compTags.includes('Component')) compTags.unshift('Component');
          elementMap.set(component.id, {
            id: component.id,
            name: component.name,
            description: component.description,
            type: 'Component',
            technology: component.technology,
            tags: compTags,
            style: resolveElementStyle('Component', compTags, styles),
          });
        }
      }
    }
  }

  private collectRelationships(
    workspace: StructurizrWorkspace,
    relationshipMap: Map<string, ResolvedRelationship>,
    styles: Styles | undefined,
  ): void {
    const allRels: Relationship[] = [...(workspace.model.relationships ?? [])];

    // Also collect relationships from element-level relationship arrays
    for (const person of workspace.model.people ?? []) {
      for (const rel of person.relationships ?? []) allRels.push(rel);
    }
    for (const ss of workspace.model.softwareSystems ?? []) {
      for (const rel of ss.relationships ?? []) allRels.push(rel);
      for (const container of ss.containers ?? []) {
        for (const rel of container.relationships ?? []) allRels.push(rel);
        for (const component of container.components ?? []) {
          for (const rel of component.relationships ?? []) allRels.push(rel);
        }
      }
    }

    for (const rel of allRels) {
      if (relationshipMap.has(rel.id)) continue;
      const tags = tagsFromString(rel.tags);
      if (!tags.includes('Relationship')) tags.push('Relationship');
      relationshipMap.set(rel.id, {
        id: rel.id,
        sourceId: rel.sourceId,
        destinationId: rel.destinationId,
        description: rel.description,
        technology: rel.technology,
        order: rel.order,
        style: resolveRelationshipStyle(tags, styles),
      });
    }
  }
}
