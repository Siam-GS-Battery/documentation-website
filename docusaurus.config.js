// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IT Portal',
  tagline: 'IT Portal',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  plugins: [
    'docusaurus-plugin-image-zoom',
  ],

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

        onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        hideOnScroll: false,
        title: 'IT & Data Management',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg', //เปลี่ยนโลโก้ที่นี่จ้า
          width: 120, // ปรับความกว้างของโลโก้ (ค่าเริ่มต้นประมาณ 150-200)
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docSidebar',
            sidebarId: 'ITmanagementSidebar',
            position: 'left',
            label: 'IT Management',
          },
          {
            type: 'docSidebar',
            sidebarId: 'ITdevelopmentSidebar',
            position: 'left',
            label: 'IT Development',
          },
          {
            type: 'docSidebar',
            sidebarId: 'DataManagementSidebar',
            position: 'left',
            label: 'Data Management',
          },
          {
            to: '/project',
            label: 'Projects',
            position: 'left',
          },
          // {
          //   to: '/content-submission',
          //   label: 'Create Document',
          //   position: 'right',
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        // links: [
        //   {
        //     title: 'Documentation',
        //     items: [
        //       {
        //         label: 'Documentation',
        //         to: '/docs/intro',
        //       },
        //       {
        //         label: 'IT Management',
        //         to: '/docs/Itmanagement/intro',
        //       },
        //       {
        //         label: 'IT Development',
        //         to: '/docs/Itdevelopment/intro',
        //       },
        //       {
        //         label: 'Data Management',
        //         to: '/docs/Datamanagement/intro',
        //       },
        //     ],
        //   },
          // {
          //   title: 'Team',
          //   items: [
          //     {
          //       label: 'Bow - IT Manager',
          //       href: '#',
          //     },
          //     {
          //       label: 'Mew - System Administrator',
          //       href: '#',
          //     },
          //     {
          //       label: 'June - Developer',
          //       href: '#',
          //     },
          //     {
          //       label: 'Duay - Database Administrator',
          //       href: '#',
          //     },
          //   ],
          // },
        //   {
        //     title: 'Contact Us',
        //     items: [
        //       {
        //         label: 'Email',
        //         href: 'mailto:it-support@company.com',
        //       },
        //       {
        //         label: 'Phone',
        //         href: 'tel:+66-2-123-4567',
        //       },
        //       {
        //         label: 'Address',
        //         href: '#',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More Links',
        //     items: [
        //       {
        //         label: 'Blog',
        //         to: '/blog',
        //       },
        //       {
        //         label: 'Privacy Policy',
        //         href: '#',
        //       },
        //       {
        //         label: 'Terms of Use',
        //         href: '#',
        //       },
        //     ],
        //   },
        // ],
        copyright: `© ${new Date().getFullYear()} Siam GS Battery. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        config: {
          margin: 32,
          scrollOffset: 0,
        }
      },
    }),
};

export default config;
