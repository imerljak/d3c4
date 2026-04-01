import type { Person, SoftwareSystem, DeploymentNode, DeploymentEnvironment, Relationship } from './model.js';
import type {
  SystemLandscapeView,
  SystemContextView,
  ContainerView,
  ComponentView,
  DeploymentView,
  DynamicView,
  FilteredView,
  ImageView,
  CustomView,
} from './views.js';
import type { Styles } from './styles.js';

export interface Branding {
  readonly logo?: string;
  readonly font?: string;
}

export interface Terminology {
  readonly person?: string;
  readonly softwareSystem?: string;
  readonly container?: string;
  readonly component?: string;
  readonly deploymentNode?: string;
  readonly relationship?: string;
}

export interface Model {
  readonly people?: Person[];
  readonly softwareSystems?: SoftwareSystem[];
  readonly deploymentNodes?: DeploymentNode[];
  readonly deploymentEnvironments?: DeploymentEnvironment[];
  readonly relationships?: Relationship[];
}

export interface ViewsConfiguration {
  readonly styles?: Styles;
  readonly themes?: string[];
  readonly branding?: Branding;
  readonly terminology?: Terminology;
  readonly scope?: string;
  readonly visibility?: string;
}

export interface Views {
  readonly systemLandscapeViews?: SystemLandscapeView[];
  readonly systemContextViews?: SystemContextView[];
  readonly containerViews?: ContainerView[];
  readonly componentViews?: ComponentView[];
  readonly deploymentViews?: DeploymentView[];
  readonly dynamicViews?: DynamicView[];
  readonly filteredViews?: FilteredView[];
  readonly imageViews?: ImageView[];
  readonly customViews?: CustomView[];
  readonly configuration?: ViewsConfiguration;
}

export interface StructurizrWorkspace {
  readonly id?: number;
  readonly name?: string;
  readonly description?: string;
  readonly extends?: string;
  readonly model: Model;
  readonly views: Views;
  readonly configuration?: {
    readonly styles?: Styles;
  };
}
