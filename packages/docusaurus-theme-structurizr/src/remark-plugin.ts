import type { Root, Code } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Remark plugin that transforms fenced code blocks with language `structurizr`
 * into `<Structurizr dsl={...} />` JSX components.
 *
 * Usage in markdown:
 * ```structurizr
 * workspace { model { ... } views { ... } }
 * ```
 */
export default function remarkStructurizr() {
    return (tree: Root) => {
        let hasStructurizrBlock = false;

        // Check whether the file already imports Structurizr
        const alreadyImported = tree.children.some(
            (node) =>
                node.type === 'mdxjsEsm' &&
                (node as any).value?.includes('@theme/Structurizr'),
        );

        visit(tree, 'code', (node: Code, index, parent) => {
            if (node.lang !== 'structurizr' || !parent || index === undefined) return;

            hasStructurizrBlock = true;

            // Escape backticks and backslashes for safe embedding in a JS template literal
            const escaped = node.value
                .replace(/\\/g, '\\\\')
                .replace(/`/g, '\\`')
                .replace(/\$/g, '\\$');

            // Replace the code node with an MDX JSX element
            (parent.children as any[])[index] = {
                type: 'mdxJsxFlowElement',
                name: 'Structurizr',
                attributes: [
                    {
                        type: 'mdxJsxAttribute',
                        name: 'dsl',
                        value: {
                            type: 'mdxJsxAttributeValueExpression',
                            value: '`' + escaped + '`',
                            data: {
                                estree: {
                                    type: 'Program',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'TemplateLiteral',
                                                expressions: [],
                                                quasis: [
                                                    {
                                                        type: 'TemplateElement',
                                                        value: { raw: escaped, cooked: node.value },
                                                        tail: true,
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    sourceType: 'module',
                                },
                            },
                        },
                    },
                ],
                children: [],
                data: { _mdxExplicitJsx: true },
            };
        });

        // Inject `import Structurizr from '@theme/Structurizr'` if needed
        if (hasStructurizrBlock && !alreadyImported) {
            const importNode: any = {
                type: 'mdxjsEsm',
                value: "import Structurizr from '@theme/Structurizr'",
                data: {
                    estree: {
                        type: 'Program',
                        body: [
                            {
                                type: 'ImportDeclaration',
                                specifiers: [
                                    {
                                        type: 'ImportDefaultSpecifier',
                                        local: { type: 'Identifier', name: 'Structurizr' },
                                    },
                                ],
                                source: {
                                    type: 'Literal',
                                    value: '@theme/Structurizr',
                                    raw: "'@theme/Structurizr'",
                                },
                            },
                        ],
                        sourceType: 'module',
                    },
                },
            };
            tree.children.unshift(importNode);
        }
    };
}
