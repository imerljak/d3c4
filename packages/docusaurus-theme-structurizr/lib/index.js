"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remarkStructurizr = void 0;
exports.validateThemeConfig = validateThemeConfig;
exports.default = themeStructurizr;
const path_1 = __importDefault(require("path"));
const remark_plugin_js_1 = __importDefault(require("./remark-plugin.js"));
exports.remarkStructurizr = remark_plugin_js_1.default;
const DEFAULT_STRUCTURIZR_CONFIG = {
    defaultEngine: 'dagre',
    allowedEngines: ['dagre', 'force'],
    defaultMode: 'diagram',
    allowedModes: ['diagram', 'split'],
};
function validateThemeConfig({ themeConfig }) {
    const user = (themeConfig.structurizr ?? {});
    const merged = {
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
function themeStructurizr() {
    return {
        name: '@d3c4/docusaurus-theme-structurizr',
        getThemePath() {
            return path_1.default.resolve(__dirname, './theme');
        },
        getTypeScriptThemePath() {
            return path_1.default.resolve(__dirname, '../../src/theme');
        },
        configureWebpack() {
            return {};
        },
    };
}
//# sourceMappingURL=index.js.map