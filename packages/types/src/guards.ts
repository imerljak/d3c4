import type {
  ModelElement,
  Person,
  SoftwareSystem,
  Container,
  Component,
  DeploymentNode,
  InfrastructureNode,
} from './model.js';

export function isPerson(e: ModelElement): e is Person {
  return e.type === 'Person';
}

export function isSoftwareSystem(e: ModelElement): e is SoftwareSystem {
  return e.type === 'SoftwareSystem';
}

export function isContainer(e: ModelElement): e is Container {
  return e.type === 'Container';
}

export function isComponent(e: ModelElement): e is Component {
  return e.type === 'Component';
}

export function isDeploymentNode(e: ModelElement): e is DeploymentNode {
  return e.type === 'DeploymentNode';
}

export function isInfrastructureNode(e: ModelElement): e is InfrastructureNode {
  return e.type === 'InfrastructureNode';
}
