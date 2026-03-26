import { describe, it, expect } from 'vitest';
import { WorkspaceParser } from '../parser/WorkspaceParser.js';
import type { StructurizrWorkspace } from '@d3c4/types';

const SAMPLE_WORKSPACE: StructurizrWorkspace = {
  name: 'Test',
  model: {
    people: [{ type: 'Person', id: '1', name: 'User', tags: 'Person' }],
    softwareSystems: [
      {
        type: 'SoftwareSystem',
        id: '2',
        name: 'App',
        tags: 'Software System',
        containers: [
          {
            type: 'Container',
            id: '3',
            name: 'Web',
            technology: 'React',
            tags: 'Container',
          },
          {
            type: 'Container',
            id: '4',
            name: 'API',
            technology: 'Node.js',
            tags: 'Container',
          },
        ],
      },
    ],
    relationships: [
      { id: '5', sourceId: '1', destinationId: '2', description: 'Uses' },
      { id: '6', sourceId: '3', destinationId: '4', description: 'Calls' },
    ],
  },
  views: {
    systemContextViews: [
      {
        type: 'SystemContext',
        key: 'ctx',
        softwareSystemId: '2',
      },
    ],
    containerViews: [
      {
        type: 'Container',
        key: 'containers',
        softwareSystemId: '2',
      },
    ],
  },
};

describe('WorkspaceParser', () => {
  it('flattens all elements into the map', () => {
    const parser = new WorkspaceParser();
    const result = parser.parse(SAMPLE_WORKSPACE);
    expect(result.elementMap.size).toBe(4); // person + system + 2 containers
  });

  it('assigns correct element types', () => {
    const parser = new WorkspaceParser();
    const result = parser.parse(SAMPLE_WORKSPACE);
    expect(result.elementMap.get('1')?.type).toBe('Person');
    expect(result.elementMap.get('2')?.type).toBe('SoftwareSystem');
    expect(result.elementMap.get('3')?.type).toBe('Container');
  });

  it('collects all relationships', () => {
    const parser = new WorkspaceParser();
    const result = parser.parse(SAMPLE_WORKSPACE);
    expect(result.relationshipMap.size).toBe(2);
  });

  it('collects all views', () => {
    const parser = new WorkspaceParser();
    const result = parser.parse(SAMPLE_WORKSPACE);
    expect(result.views).toHaveLength(2);
    expect(result.views[0]?.key).toBe('ctx');
  });

  it('resolves Person style with correct defaults', () => {
    const parser = new WorkspaceParser();
    const result = parser.parse(SAMPLE_WORKSPACE);
    const person = result.elementMap.get('1');
    expect(person?.style.background).toBe('#08427B');
    expect(person?.style.shape).toBe('Person');
  });

  it('resolves Container style with correct defaults', () => {
    const parser = new WorkspaceParser();
    const result = parser.parse(SAMPLE_WORKSPACE);
    const container = result.elementMap.get('3');
    expect(container?.style.background).toBe('#438DD5');
  });
});
