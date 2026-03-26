import { useRef, useEffect } from 'react';
import { Renderer } from '@d3c4/core';
import type { RendererOptions } from '@d3c4/core';
import type { StructurizrWorkspace } from '@d3c4/types';

export interface D3C4DiagramProps extends Omit<RendererOptions, 'viewKey'> {
  /** The parsed Structurizr workspace. Use @d3c4/dsl parseDsl() to get this from DSL. */
  workspace: StructurizrWorkspace;
  /** The view key to render (must match a key in workspace.views.*). */
  viewKey: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * React component that renders a Structurizr C4 diagram using D3.js.
 *
 * @example
 * ```tsx
 * import { parseDsl } from '@d3c4/dsl';
 * import { D3C4Diagram } from '@d3c4/react';
 *
 * const workspace = parseDsl(myDslString);
 * <D3C4Diagram workspace={workspace} viewKey="SystemContext" style={{ height: 600 }} />
 * ```
 */
export function D3C4Diagram({
  workspace,
  viewKey,
  className,
  style,
  onRenderComplete,
  ...options
}: D3C4DiagramProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);

  // Mount: create Renderer once
  useEffect(() => {
    if (!containerRef.current) return;
    const renderer = new Renderer(containerRef.current, workspace, {
      ...options,
      viewKey,
      onRenderComplete,
    });
    rendererRef.current = renderer;

    return () => {
      renderer.destroy();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When workspace changes, update without re-mounting
  useEffect(() => {
    rendererRef.current?.update(workspace);
  }, [workspace]);

  // When viewKey changes, switch view without re-mounting
  useEffect(() => {
    rendererRef.current?.render(viewKey);
  }, [viewKey]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
}
