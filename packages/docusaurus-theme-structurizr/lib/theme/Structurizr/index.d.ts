import type { StructurizrEngine, StructurizrViewMode } from '../../index.js';
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
export default function Structurizr({ dsl, className, defaultView, defaultEngine, defaultMode, }: StructurizrProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=index.d.ts.map