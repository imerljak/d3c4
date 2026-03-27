import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkStructurizr from '@d3c4/docusaurus-theme-structurizr/remark-plugin';

const config: Config = {
  title: 'd3c4',
  tagline: 'Structurizr C4 diagrams powered by D3.js',
  favicon: 'img/favicon.ico',

  url: 'https://imerljak.github.io',
  baseUrl: '/d3c4/',

  organizationName: 'imerljak',
  projectName: 'd3c4',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // Serve docs at the site root instead of /docs/
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkStructurizr],
          editUrl: 'https://github.com/imerljak/d3c4/tree/main/apps/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@d3c4/docusaurus-theme-structurizr'],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    structurizr: {
      defaultEngine: 'dagre',
      allowedEngines: ['dagre', 'force'],
      defaultMode: 'diagram',
      allowedModes: ['diagram', 'split'],
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'd3c4',
      logo: {
        alt: 'd3c4 logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/getting-started',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: '/dsl',
          label: 'DSL Reference',
          position: 'left',
        },
        {
          to: '/api/core',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/imerljak/d3c4',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/getting-started' },
            { label: 'DSL Reference', to: '/dsl' },
            { label: 'API Reference', to: '/api/core' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/imerljak/d3c4' },
            { label: 'npm', href: 'https://www.npmjs.com/package/@d3c4/core' },
            { label: 'Changelog', href: 'https://github.com/imerljak/d3c4/releases' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} imerljak. Licensed under Apache 2.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
