import type { Plugin, ThemeConfig } from '@docusaurus/types';
import path from 'path';
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

const DEFAULT_STRUCTURIZR_CONFIG: StructurizrThemeConfig = {
    defaultEngine: 'dagre',
    allowedEngines: ['dagre', 'force'],
    defaultMode: 'diagram',
    allowedModes: ['diagram', 'split'],
};

export function validateThemeConfig({ themeConfig }: { themeConfig: ThemeConfig }): ThemeConfig {
    const user = ((themeConfig as Record<string, unknown>).structurizr ?? {}) as Partial<StructurizrThemeConfig>;

    const merged: StructurizrThemeConfig = {
        ...DEFAULT_STRUCTURIZR_CONFIG,
        ...user,
    };

    // Ensure defaults are valid members of the allowed lists
    if (!merged.allowedEngines.includes(merged.defaultEngine)) {
        merged.defaultEngine = merged.allowedEngines[0] ?? DEFAULT_STRUCTURIZR_CONFIG.defaultEngine;
    }
    if (!merged.allowedModes.includes(merged.defaultMode)) {
        merged.defaultMode = merged.allowedModes[0] ?? DEFAULT_STRUCTURIZR_CONFIG.defaultMode;
    }

    return { ...themeConfig, structurizr: merged };
}

export default function themeStructurizr(): Plugin {
    return {
        name: '@d3c4/docusaurus-theme-structurizr',
        getThemePath() {
            return path.resolve(__dirname, './theme');
        },
        getTypeScriptThemePath() {
            return path.resolve(__dirname, '../../src/theme');
        },
        configureWebpack() {
            return {};
        },
    };
}

// Re-export the remark plugin for manual registration
export { remarkStructurizr };
