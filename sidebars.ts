import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'On Premise',
      collapsed: false,
      items: [
        'license/license',
        'monitor/monitor',
        'clickonce/clickonce',
        'dss/installation-guide',
        'dss/administration-guide',
        'bss/installation-guide',
        'ckc/central-key-control',
        'changelog/changelog',
      ],
    },
    {
      type: 'category',
      label: 'Cloud',
      collapsed: false,
      items: [
        'cloud/ips',
        'cloud/biometric',
      ],
    },
  ],
};

export default sidebars;
