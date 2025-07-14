// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Manual sidebar configuration for main documentation
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorial Basics',
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/markdown-features',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/create-a-page',
        'tutorial-basics/congratulations',
        // 'tutorail-basics/Howtocreatemd',
      ],
    },
    {
      type: 'category',
      label: 'Tech Stack',
      items: [
        'techstack/as',
      ],
    },
  ],
  ITmanagementSidebar: [
    'Itmanagement/intro',
    {
      type: 'category',
      label: 'Projects',
      link: {
        type: 'generated-index',
        description: 'Documents and best practices for IT management in the IT & Data Management'
      },
      items: [
        'Itmanagement/HowtouseAsana',
      ],
    },
  ],
  ITdevelopmentSidebar: [
    'Itdevelopment/intro',
    {
      type: 'category',
      label: 'Projects',
      link: {
        type: 'generated-index',
        description: 'Documents and best practices for IT development in the IT & Data Management moew'
      },
      items: [
        'Itdevelopment/Projecttest',
      ],
    },
  ],
  DataManagementSidebar: [
    'Datamanagement/intro',
    {
      type: 'category',
      label: 'Projects',
      link: {
        type: 'generated-index',
        description: 'Documents and best practices for Data management in the IT & Data Management'
      },
      items: [
        {
          type: 'category',
          label: 'Customer Data Platform',
          link: {
            type: 'generated-index',
            description: 'Resources and documentation for Customer Data Platform projects'
          },
          items: [
            'Datamanagement/projecttest',
          ],
        },
        // สามารถเพิ่มหมวดหมู่ย่อยอื่นๆ ได้ที่นี่
      ],
    },
  ],
};

export default sidebars;
