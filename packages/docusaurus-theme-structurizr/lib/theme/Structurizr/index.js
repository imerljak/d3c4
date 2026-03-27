"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Structurizr;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const theme_common_1 = require("@docusaurus/theme-common");
const dsl_1 = require("@d3c4/dsl");
const react_2 = require("@d3c4/react");
const clsx_1 = __importDefault(require("clsx"));
require("./styles.css");
const ENGINE_LABELS = {
    dagre: 'Dagre',
    force: 'Force',
};
const MODE_LABELS = {
    diagram: 'Diagram Only',
    split: 'Split View',
};
function Structurizr({ dsl, className, defaultView, defaultEngine, defaultMode, }) {
    const themeConfig = (0, theme_common_1.useThemeConfig)();
    const pluginConfig = (themeConfig.structurizr ?? {});
    const resolvedDefaultEngine = defaultEngine ?? pluginConfig.defaultEngine ?? 'dagre';
    const resolvedDefaultMode = defaultMode ?? pluginConfig.defaultMode ?? 'diagram';
    const allowedEngines = pluginConfig.allowedEngines ?? ['dagre', 'force'];
    const allowedModes = pluginConfig.allowedModes ?? ['diagram', 'split'];
    const [engine, setEngine] = (0, react_1.useState)(resolvedDefaultEngine);
    const [mode, setMode] = (0, react_1.useState)(resolvedDefaultMode);
    const [selectedView, setSelectedView] = (0, react_1.useState)(defaultView);
    const [codePanelWidthPct, setCodePanelWidthPct] = (0, react_1.useState)(40);
    const isDragging = (0, react_1.useRef)(false);
    const containerRef = (0, react_1.useRef)(null);
    // Parse DSL (memoized)
    const parseResult = (0, react_1.useMemo)(() => {
        try {
            const workspace = (0, dsl_1.parseDsl)(dsl);
            return { workspace, error: null };
        }
        catch (err) {
            if (err instanceof dsl_1.DslParseError) {
                return { workspace: null, error: err.message };
            }
            return { workspace: null, error: String(err) };
        }
    }, [dsl]);
    const { workspace, error } = parseResult;
    // View extraction
    const views = (0, react_1.useMemo)(() => {
        if (!workspace)
            return [];
        const all = [
            ...(workspace.views.systemLandscapeViews ?? []),
            ...(workspace.views.systemContextViews ?? []),
            ...(workspace.views.containerViews ?? []),
            ...(workspace.views.componentViews ?? []),
        ];
        return all.map(v => ({ key: v.key, title: v.title, description: v.description }));
    }, [workspace]);
    // Set default view once views are known
    (0, react_1.useEffect)(() => {
        if (views.length > 0 && (!selectedView || !views.some(v => v.key === selectedView))) {
            setSelectedView(views[0].key);
        }
    }, [views, selectedView]);
    const handlePointerDown = (0, react_1.useCallback)((e) => {
        if (mode !== 'split' || !containerRef.current)
            return;
        if (containerRef.current.getBoundingClientRect().width < 768)
            return;
        isDragging.current = true;
        e.target.setPointerCapture(e.pointerId);
        const onPointerMove = (moveEvent) => {
            if (!isDragging.current || !containerRef.current)
                return;
            const rect = containerRef.current.getBoundingClientRect();
            const rawPct = ((moveEvent.clientX - rect.left) / rect.width) * 100;
            setCodePanelWidthPct(Math.min(80, Math.max(20, rawPct)));
        };
        const onPointerUp = () => {
            isDragging.current = false;
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    }, [mode]);
    if (error) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('structurizr-error', className), children: [(0, jsx_runtime_1.jsx)("strong", { children: "Structurizr DSL Parse Error:" }), (0, jsx_runtime_1.jsx)("pre", { children: error })] }));
    }
    if (!workspace)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('structurizr-container', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "structurizr-toolbar", children: [(0, jsx_runtime_1.jsxs)("select", { value: selectedView ?? '', onChange: (e) => setSelectedView(e.target.value), className: "structurizr-select", title: "Select Workspace View", children: [views.length === 0 && (0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: "No views found" }), views.map(({ key, title, description }) => {
                                const label = title && description ? `${title} — ${description}`
                                    : title ?? description ?? key;
                                return (0, jsx_runtime_1.jsx)("option", { value: key, children: label }, key);
                            })] }), (0, jsx_runtime_1.jsxs)("div", { className: "structurizr-toggles", children: [allowedEngines.length > 1 && ((0, jsx_runtime_1.jsx)("select", { value: engine, onChange: (e) => setEngine(e.target.value), className: "structurizr-select", title: "Select Render Engine", children: allowedEngines.map(e => ((0, jsx_runtime_1.jsx)("option", { value: e, children: ENGINE_LABELS[e] }, e))) })), allowedModes.length > 1 && ((0, jsx_runtime_1.jsx)("select", { value: mode, onChange: (e) => setMode(e.target.value), className: "structurizr-select", title: "Select Display Mode", children: allowedModes.map(m => ((0, jsx_runtime_1.jsx)("option", { value: m, children: MODE_LABELS[m] }, m))) }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('structurizr-content', `mode-${mode}`), ref: containerRef, children: [mode === 'split' && ((0, jsx_runtime_1.jsx)("div", { className: "structurizr-code-panel", style: { flexBasis: `${codePanelWidthPct}%`, flexGrow: 0, flexShrink: 0 }, children: (0, jsx_runtime_1.jsx)("pre", { children: (0, jsx_runtime_1.jsx)("code", { children: dsl }) }) })), mode === 'split' && ((0, jsx_runtime_1.jsx)("div", { className: "structurizr-resizer", onPointerDown: handlePointerDown, role: "separator", "aria-orientation": "vertical", "aria-label": "Resize panels" })), (0, jsx_runtime_1.jsxs)("div", { className: "structurizr-diagram-panel", children: [selectedView && ((0, jsx_runtime_1.jsx)(react_2.D3C4Diagram, { workspace: workspace, viewKey: selectedView, engine: engine, style: { height: '100%', width: '100%' } })), !selectedView && (0, jsx_runtime_1.jsx)("div", { className: "structurizr-empty", children: "No views defined in DSL" })] })] })] }));
}
//# sourceMappingURL=index.js.map