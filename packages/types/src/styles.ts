export type Shape =
  | 'Box'
  | 'RoundedBox'
  | 'Circle'
  | 'Ellipse'
  | 'Hexagon'
  | 'Cylinder'
  | 'Pipe'
  | 'Person'
  | 'Robot'
  | 'WebBrowser'
  | 'MobileDeviceLandscape'
  | 'MobileDevicePortrait'
  | 'Component'
  | 'Folder'
  | 'Diamond'
  | 'Triangle';

export interface ElementStyle {
  readonly tag: string;
  readonly background?: string;
  readonly color?: string;
  readonly stroke?: string;
  readonly shape?: Shape;
  readonly icon?: string;
  readonly fontSize?: number;
  readonly border?: 'Solid' | 'Dashed' | 'Dotted';
  readonly opacity?: number;
  readonly metadata?: boolean;
  readonly description?: boolean;
}

export interface RelationshipStyle {
  readonly tag: string;
  readonly color?: string;
  readonly thickness?: number;
  readonly dashed?: boolean;
  readonly style?: 'Solid' | 'Dashed' | 'Dotted';
  readonly routing?: 'Direct' | 'Orthogonal' | 'Curved';
  readonly fontSize?: number;
  readonly width?: number;
  readonly position?: number;
  readonly opacity?: number;
}

export interface Styles {
  readonly elements?: ElementStyle[];
  readonly relationships?: RelationshipStyle[];
  readonly themes?: string[];
}
