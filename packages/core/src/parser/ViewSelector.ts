import type {
  DiagramView,
  SystemContextView,
  ContainerView,
  ComponentView,
} from '@d3c4/types';
import type { ResolvedElement, ResolvedRelationship, ResolvedView, ResolvedWorkspace } from './types.js';

export class ViewSelector {
  select(resolved: ResolvedWorkspace, viewKey: string): ResolvedView {
    const view = resolved.views.find((v) => v.key === viewKey);
    if (!view) {
      const available = resolved.views.map((v) => v.key).join(', ');
      throw new Error(
        `View '${viewKey}' not found. Available views: ${available || '(none)'}`,
      );
    }

    const elements: ResolvedElement[] = [];
    const relationships: ResolvedRelationship[] = [];

    // Get the set of element IDs included in this view
    const includedIds = this.getIncludedElementIds(view, resolved);

    for (const id of includedIds) {
      const el = resolved.elementMap.get(id);
      if (el) elements.push(el);
    }

    // Add boundary element for ContainerView (the parent SoftwareSystem)
    if (view.type === 'Container') {
      const ctxView = view as ContainerView;
      const ssEl = resolved.elementMap.get(ctxView.softwareSystemId);
      if (ssEl && !includedIds.has(ctxView.softwareSystemId)) {
        elements.push({ ...ssEl, boundary: true });
      }
    }

    // Collect relationships between included elements
    for (const rel of resolved.relationshipMap.values()) {
      if (includedIds.has(rel.sourceId) && includedIds.has(rel.destinationId)) {
        relationships.push(rel);
      }
    }

    return {
      key: view.key,
      title: view.title,
      type: view.type,
      elements,
      relationships,
    };
  }

  private getIncludedElementIds(
    view: DiagramView,
    resolved: ResolvedWorkspace,
  ): Set<string> {
    const ids = new Set<string>();

    // If view has explicit element list, use that
    if (view.elements && view.elements.length > 0) {
      for (const ev of view.elements) {
        ids.add(ev.id);
      }
      return ids;
    }

    // Otherwise, use "include *" semantics based on view type
    const model = resolved.raw.model;

    if (view.type === 'SystemLandscape') {
      // Include all people and software systems
      for (const p of model.people ?? []) ids.add(p.id);
      for (const ss of model.softwareSystems ?? []) ids.add(ss.id);
    } else if (view.type === 'SystemContext') {
      const ctxView = view as SystemContextView;
      ids.add(ctxView.softwareSystemId);
      // Include all elements that have relationships with the focal system
      for (const rel of resolved.relationshipMap.values()) {
        if (rel.sourceId === ctxView.softwareSystemId || rel.destinationId === ctxView.softwareSystemId) {
          ids.add(rel.sourceId);
          ids.add(rel.destinationId);
        }
      }
      // Always include people and external systems that are in the model
      for (const p of model.people ?? []) ids.add(p.id);
      for (const ss of model.softwareSystems ?? []) {
        // Include external systems that have relationships with focal system
        if (ss.id !== ctxView.softwareSystemId) {
          const hasRel = Array.from(resolved.relationshipMap.values()).some(
            (r) =>
              (r.sourceId === ss.id || r.destinationId === ss.id) &&
              (r.sourceId === ctxView.softwareSystemId || r.destinationId === ctxView.softwareSystemId),
          );
          if (hasRel) ids.add(ss.id);
        }
      }
    } else if (view.type === 'Container') {
      const contView = view as ContainerView;
      // Include all containers of the focal software system
      const ss = model.softwareSystems?.find((s) => s.id === contView.softwareSystemId);
      for (const c of ss?.containers ?? []) ids.add(c.id);
      // Include people and external systems that interact with containers
      for (const rel of resolved.relationshipMap.values()) {
        if (ids.has(rel.sourceId) || ids.has(rel.destinationId)) {
          ids.add(rel.sourceId);
          ids.add(rel.destinationId);
        }
      }
    } else if (view.type === 'Component') {
      const compView = view as ComponentView;
      // Include all components of the focal container
      for (const ss of model.softwareSystems ?? []) {
        const container = ss.containers?.find((c) => c.id === compView.containerId);
        if (container) {
          for (const comp of container.components ?? []) ids.add(comp.id);
          break;
        }
      }
      // Include related containers
      for (const rel of resolved.relationshipMap.values()) {
        if (ids.has(rel.sourceId) || ids.has(rel.destinationId)) {
          ids.add(rel.sourceId);
          ids.add(rel.destinationId);
        }
      }
    }

    return ids;
  }
}
