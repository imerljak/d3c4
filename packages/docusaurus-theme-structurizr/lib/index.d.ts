import type { Plugin, ThemeConfig } from '@docusaurus/types';
import remarkStructurizr from './remark-plugin.js';
export type StructurizrEngine = 'dagre' | 'force';
export type StructurizrViewMode = 'diagram' | 'split';
export interface StructurizrThemeConfig {
    /** Default rendering engine. @default 'dagre' */
    defaultEngine: StructurizrEngine;
    /** Engines shown in the toolbar. @default ['dagre', 'force'] */
    allowedEngines: StructurizrEngine[];
    /** Default display mode. @default 'diagram' */
    defaultMode: StructurizrViewMode;
    /** Modes shown in the toolbar. @default ['diagram', 'split'] */
    allowedModes: StructurizrViewMode[];
}
export declare function validateThemeConfig({ themeConfig }: {
    themeConfig: ThemeConfig;
}): ThemeConfig;
export default function themeStructurizr(): Plugin;
export { remarkStructurizr };
//# sourceMappingURL=index.d.ts.map