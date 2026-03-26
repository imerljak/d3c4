export type ElementType =
  | 'Person'
  | 'SoftwareSystem'
  | 'Container'
  | 'Component'
  | 'DeploymentNode'
  | 'InfrastructureNode';

export interface BaseElement {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly tags?: string;
  readonly properties?: Record<string, string>;
  readonly relationships?: Relationship[];
}

export interface Person extends BaseElement {
  readonly type: 'Person';
  readonly location?: 'Internal' | 'External' | 'Unspecified';
}

export interface SoftwareSystem extends BaseElement {
  readonly type: 'SoftwareSystem';
  readonly location?: 'Internal' | 'External' | 'Unspecified';
  readonly containers?: Container[];
}

export interface Container extends BaseElement {
  readonly type: 'Container';
  readonly technology?: string;
  readonly components?: Component[];
}

export interface Component extends BaseElement {
  readonly type: 'Component';
  readonly technology?: string;
}

export interface DeploymentNode extends BaseElement {
  readonly type: 'DeploymentNode';
  readonly technology?: string;
  readonly environment?: string;
  readonly instances?: number;
  readonly children?: DeploymentNode[];
  readonly infrastructureNodes?: InfrastructureNode[];
  readonly softwareSystemInstances?: SoftwareSystemInstance[];
  readonly containerInstances?: ContainerInstance[];
}

export interface InfrastructureNode extends BaseElement {
  readonly type: 'InfrastructureNode';
  readonly technology?: string;
  readonly environment?: string;
}

export interface SoftwareSystemInstance {
  readonly id: string;
  readonly softwareSystemId: string;
  readonly instanceId?: number;
  readonly tags?: string;
  readonly relationships?: Relationship[];
}

export interface ContainerInstance {
  readonly id: string;
  readonly containerId: string;
  readonly instanceId?: number;
  readonly tags?: string;
  readonly relationships?: Relationship[];
}

export interface Relationship {
  readonly id: string;
  readonly sourceId: string;
  readonly destinationId: string;
  readonly description?: string;
  readonly technology?: string;
  readonly tags?: string;
  readonly properties?: Record<string, string>;
  readonly order?: string;
}

export type ModelElement =
  | Person
  | SoftwareSystem
  | Container
  | Component
  | DeploymentNode
  | InfrastructureNode;
