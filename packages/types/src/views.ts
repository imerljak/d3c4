export type ViewType =
  | 'SystemLandscape'
  | 'SystemContext'
  | 'Container'
  | 'Component'
  | 'Deployment'
  | 'Dynamic'
  | 'Filtered'
  | 'Image'
  | 'Custom';

export interface ElementView {
  readonly id: string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
}

export interface RelationshipView {
  readonly id: string;
  readonly vertices?: Array<{ x: number; y: number }>;
  readonly order?: number;
  readonly description?: string;
  readonly response?: boolean;
}

export interface AutomaticLayout {
  readonly rankDirection?: 'TopBottom' | 'BottomTop' | 'LeftRight' | 'RightLeft';
  readonly rankSeparation?: number;
  readonly nodeSeparation?: number;
  readonly edgeSeparation?: number;
  readonly vertices?: boolean;
}

export interface AnimationStep {
  readonly order: number;
  readonly elements?: string[];
  readonly relationships?: string[];
}

interface BaseView {
  readonly key: string;
  readonly title?: string;
  readonly description?: string;
  readonly elements?: ElementView[];
  readonly relationships?: RelationshipView[];
  readonly automaticLayout?: AutomaticLayout;
  readonly animations?: AnimationStep[];
}

export interface SystemLandscapeView extends BaseView {
  readonly type: 'SystemLandscape';
}

export interface SystemContextView extends BaseView {
  readonly type: 'SystemContext';
  readonly softwareSystemId: string;
}

export interface ContainerView extends BaseView {
  readonly type: 'Container';
  readonly softwareSystemId: string;
}

export interface ComponentView extends BaseView {
  readonly type: 'Component';
  readonly containerId: string;
}

export interface DeploymentView extends BaseView {
  readonly type: 'Deployment';
  readonly softwareSystemId?: string;
  readonly environment?: string;
}

export interface DynamicView extends BaseView {
  readonly type: 'Dynamic';
  readonly elementId?: string;
}

export interface FilteredView {
  readonly type: 'Filtered';
  readonly key: string;
  readonly baseViewKey: string;
  readonly mode: 'Include' | 'Exclude';
  readonly tags: string[];
  readonly title?: string;
  readonly description?: string;
}

export interface ImageView {
  readonly type: 'Image';
  readonly key: string;
  readonly elementId?: string;
  readonly title?: string;
  readonly image?: string;
}

export interface CustomView extends BaseView {
  readonly type: 'Custom';
}

export type DiagramView =
  | SystemLandscapeView
  | SystemContextView
  | ContainerView
  | ComponentView
  | DeploymentView
  | DynamicView
  | FilteredView
  | ImageView
  | CustomView;
