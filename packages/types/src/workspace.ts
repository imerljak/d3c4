import type { Person, SoftwareSystem, DeploymentNode, Relationship } from './model.js';
import type {
  SystemLandscapeView,
  SystemContextView,
  ContainerView,
  ComponentView,
  DeploymentView,
  DynamicView,
} from './views.js';
import type { Styles } from './styles.js';

export interface Model {
  readonly people?: Person[];
  readonly softwareSystems?: SoftwareSystem[];
  readonly deploymentNodes?: DeploymentNode[];
  readonly relationships?: Relationship[];
}

export interface Views {
  readonly systemLandscapeViews?: SystemLandscapeView[];
  readonly systemContextViews?: SystemContextView[];
  readonly containerViews?: ContainerView[];
  readonly componentViews?: ComponentView[];
  readonly deploymentViews?: DeploymentView[];
  readonly dynamicViews?: DynamicView[];
  readonly configuration?: {
    readonly styles?: Styles;
  };
}

export interface StructurizrWorkspace {
  readonly id?: number;
  readonly name?: string;
  readonly description?: string;
  readonly model: Model;
  readonly views: Views;
  readonly configuration?: {
    readonly styles?: Styles;
  };
}
