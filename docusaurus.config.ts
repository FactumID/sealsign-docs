import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'SealSign Docs',
  tagline: 'Documentación de SealSign',
  url: 'https://docs.sealsign.es',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'factumid', // Usually your GitHub org/user name.
  projectName: 'sealsign-docs', // Usually your repo name.

  onBrokenLinks: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      es: {
        label: 'Español',
        direction: 'ltr',
        htmlLang: 'es-ES',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/factumid/sealsign-docs/tree/main/',
        },
        blog: false, // Disable blog as it wasn't in Docsify
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },

    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'SealSign Logo',
        src: 'img/sealsign-logo.png',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/factumid/sealsign-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'java'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
