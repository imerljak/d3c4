import type { Root } from 'mdast';
/**
 * Remark plugin that transforms fenced code blocks with language `structurizr`
 * into `<Structurizr dsl={...} />` JSX components.
 *
 * Usage in markdown:
 * ```structurizr
 * workspace { model { ... } views { ... } }
 * ```
 */
export default function remarkStructurizr(): (tree: Root) => void;
//# sourceMappingURL=remark-plugin.d.ts.map