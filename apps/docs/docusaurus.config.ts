import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkStructurizr from '@d3c4/docusaurus-theme-structurizr/remark-plugin';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'd3c4',
  tagline: 'Diagrams as Code',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://imerljak.github.io',
  baseUrl: '/d3c4/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'imerljak', // Usually your GitHub org/user name.
  projectName: 'd3c4', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkStructurizr],
          editUrl:
            'https://github.com/imerljak/d3c4/tree/main/apps/docs',
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
    // Replace with your project's social card
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
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
        href: '/docs/',
      },
      items: [
        {
          type: "doc",
          position: "left",
          docId: "homepage",
          label: "Docs",
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
