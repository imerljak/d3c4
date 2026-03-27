import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { parseDsl, DslParseError } from '@d3c4/dsl';
import { D3C4Diagram } from '@d3c4/react';
import clsx from 'clsx';
import type { StructurizrThemeConfig, StructurizrEngine, StructurizrViewMode } from '../../index.js';
import './styles.css';

export interface StructurizrProps {
    /** The raw DSL string */
    dsl: string;
    className?: string;
    defaultView?: string;
    /** Overrides themeConfig.structurizr.defaultEngine for this instance */
    defaultEngine?: StructurizrEngine;
    /** Overrides themeConfig.structurizr.defaultMode for this instance */
    defaultMode?: StructurizrViewMode;
}

const ENGINE_LABELS: Record<StructurizrEngine, string> = {
    dagre: 'Dagre',
    force: 'Force',
};

const MODE_LABELS: Record<StructurizrViewMode, string> = {
    diagram: 'Diagram Only',
    split: 'Split View',
};

export default function Structurizr({
    dsl,
    className,
    defaultView,
    defaultEngine,
    defaultMode,
}: StructurizrProps) {
    const themeConfig = useThemeConfig() as Record<string, unknown>;
    const pluginConfig = (themeConfig.structurizr ?? {}) as StructurizrThemeConfig;

    const resolvedDefaultEngine = defaultEngine ?? pluginConfig.defaultEngine ?? 'dagre';
    const resolvedDefaultMode = defaultMode ?? pluginConfig.defaultMode ?? 'diagram';
    const allowedEngines: StructurizrEngine[] = pluginConfig.allowedEngines ?? ['dagre', 'force'];
    const allowedModes: StructurizrViewMode[] = pluginConfig.allowedModes ?? ['diagram', 'split'];

    const [engine, setEngine] = useState<StructurizrEngine>(resolvedDefaultEngine);
    const [mode, setMode] = useState<StructurizrViewMode>(resolvedDefaultMode);
    const [selectedView, setSelectedView] = useState<string | undefined>(defaultView);
    const [codePanelWidthPct, setCodePanelWidthPct] = useState(40);

    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parse DSL (memoized)
    const parseResult = useMemo(() => {
        try {
            const workspace = parseDsl(dsl);
            return { workspace, error: null };
        } catch (err) {
            if (err instanceof DslParseError) {
                return { workspace: null, error: err.message };
            }
            return { workspace: null, error: String(err) };
        }
    }, [dsl]);

    const { workspace, error } = parseResult;

    // View extraction
    const views = useMemo(() => {
        if (!workspace) return [];
        const all = [
            ...(workspace.views.systemLandscapeViews ?? []),
            ...(workspace.views.systemContextViews ?? []),
            ...(workspace.views.containerViews ?? []),
            ...(workspace.views.componentViews ?? []),
        ];
        return all.map(v => ({ key: v.key, title: v.title, description: v.description }));
    }, [workspace]);

    // Set default view once views are known
    useEffect(() => {
        if (views.length > 0 && (!selectedView || !views.some(v => v.key === selectedView))) {
            setSelectedView(views[0].key);
        }
    }, [views, selectedView]);

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (mode !== 'split' || !containerRef.current) return;
        if (containerRef.current.getBoundingClientRect().width < 768) return;

        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);

        const onPointerMove = (moveEvent: PointerEvent) => {
            if (!isDragging.current || !containerRef.current) return;
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
        return (
            <div className={clsx('structurizr-error', className)}>
                <strong>Structurizr DSL Parse Error:</strong>
                <pre>{error}</pre>
            </div>
        );
    }

    if (!workspace) return null;

    return (
        <div className={clsx('structurizr-container', className)}>
            <div className="structurizr-toolbar">
                <select
                    value={selectedView ?? ''}
                    onChange={(e) => setSelectedView(e.target.value)}
                    className="structurizr-select"
                    title="Select Workspace View"
                >
                    {views.length === 0 && <option value="" disabled>No views found</option>}
                    {views.map(({ key, title, description }) => {
                        const label = title && description ? `${title} — ${description}`
                            : title ?? description ?? key;
                        return <option key={key} value={key}>{label}</option>;
                    })}
                </select>

                <div className="structurizr-toggles">
                    {allowedEngines.length > 1 && (
                        <select
                            value={engine}
                            onChange={(e) => setEngine(e.target.value as StructurizrEngine)}
                            className="structurizr-select"
                            title="Select Render Engine"
                        >
                            {allowedEngines.map(e => (
                                <option key={e} value={e}>{ENGINE_LABELS[e]}</option>
                            ))}
                        </select>
                    )}
                    {allowedModes.length > 1 && (
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value as StructurizrViewMode)}
                            className="structurizr-select"
                            title="Select Display Mode"
                        >
                            {allowedModes.map(m => (
                                <option key={m} value={m}>{MODE_LABELS[m]}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            <div
                className={clsx('structurizr-content', `mode-${mode}`)}
                ref={containerRef}
            >
                {mode === 'split' && (
                    <div
                        className="structurizr-code-panel"
                        style={{ flexBasis: `${codePanelWidthPct}%`, flexGrow: 0, flexShrink: 0 }}
                    >
                        <pre><code>{dsl}</code></pre>
                    </div>
                )}
                {mode === 'split' && (
                    <div
                        className="structurizr-resizer"
                        onPointerDown={handlePointerDown}
                        role="separator"
                        aria-orientation="vertical"
                        aria-label="Resize panels"
                    />
                )}
                <div className="structurizr-diagram-panel">
                    {selectedView && (
                        <D3C4Diagram
                            workspace={workspace}
                            viewKey={selectedView}
                            engine={engine}
                            onNavigate={setSelectedView}
                            style={{ height: '100%', width: '100%' }}
                        />
                    )}
                    {!selectedView && <div className="structurizr-empty">No views defined in DSL</div>}
                </div>
            </div>
        </div>
    );
}
