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
      label: 'How to create Markdown',
      items: [
        'markdown-create/intro',
        'markdown-create/markdown-basics',
        'markdown-create/advanced-features',
        'markdown-create/visual-elements',
        'markdown-create/project-docs',
        'markdown-create/sop-writing',
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Tutorial Basics',
    //   items: [
    //     'tutorial-basics/create-a-document',
    //     'tutorial-basics/create-a-blog-post',
    //     'tutorial-basics/markdown-features',
    //     'tutorial-basics/deploy-your-site',
    //     'tutorial-basics/create-a-page',
    //     'tutorial-basics/congratulations',
    //     // 'tutorail-basics/Howtocreatemd',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Tech Stack',
    //   items: [
    //     'techstack/asana',
    //   ],
    // },
  ],
  
  
  ITmanagementSidebar: [
    'Itmanagement/intro',
    {
      type: 'category',
      label: 'User Guide',
      link: {
        type: 'generated-index',
        description: 'A step-by-step manual for end users. Provides detailed instructions with visuals on how to use each feature of the system. Helps users navigate and operate the platform effectively and independently.'
      },
      items: [
      'Itmanagement/HowtouseAsana',
      ],
    },
    {
      type: 'category',
      label: 'Tech Stack',
      link: {
        type: 'generated-index',
        description: 'Technologies used in the project. Lists the programming languages, frameworks, tools, and platforms used to build and run the system. Useful for developers, maintainers, and technical stakeholders.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'Projects Documentation',
      link: {
        type: 'generated-index',
        description: 'Comprehensive project overview. Covers the project\'s goals, scope, architecture, database design, and development process. Helps all stakeholders understand the system at a high level.'
      },
      items: [
        'Itmanagement/HowtouseAsana',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: {
        type: 'generated-index',
        description: 'Common issues and how to resolve them. Offers solutions and step-by-step guides for frequently encountered problems. Designed to assist both end users and support teams in diagnosing and fixing issues quickly.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'SOP',
      link: {
        type: 'generated-index',
        description: 'Standardized workflows and responsibilities. Outlines the official procedures for common tasks and operations within the system. Ensures consistency, compliance, and clarity in how tasks are performed.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'Training Material',
      link: {
        type: 'generated-index',
        description: 'Learning resources for system onboarding. Includes manuals, slides, videos, and exercises designed to train new users and staff. Helps ensure users can confidently use the system as intended.'
      },
      items: [
      'techstack/asana',
      ],
    },
  ],
  
  
  ITdevelopmentSidebar: [
    'Itdevelopment/intro',
    {
      type: 'category',
      label: 'User Guide',
      link: {
        type: 'generated-index',
        description: 'A step-by-step manual for end users. Provides detailed instructions with visuals on how to use each feature of the system. Helps users navigate and operate the platform effectively and independently.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'Tech Stack',
      link: {
        type: 'generated-index',
        description: 'Technologies used in the project. Lists the programming languages, frameworks, tools, and platforms used to build and run the system. Useful for developers, maintainers, and technical stakeholders.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'Projects Documentation',
      link: {
        type: 'generated-index',
        description: 'Comprehensive project overview. Covers the project\'s goals, scope, architecture, database design, and development process. Helps all stakeholders understand the system at a high level.'
      },
      items: [
        'Itdevelopment/E-Commerce Management System',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: {
        type: 'generated-index',
        description: 'Common issues and how to resolve them. Offers solutions and step-by-step guides for frequently encountered problems. Designed to assist both end users and support teams in diagnosing and fixing issues quickly.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'SOP',
      link: {
        type: 'generated-index',
        description: 'Standardized workflows and responsibilities. Outlines the official procedures for common tasks and operations within the system. Ensures consistency, compliance, and clarity in how tasks are performed.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'Training Material',
      link: {
        type: 'generated-index',
        description: 'Learning resources for system onboarding. Includes manuals, slides, videos, and exercises designed to train new users and staff. Helps ensure users can confidently use the system as intended.'
      },
      items: [
      'techstack/asana',
      ],
    },
  ],
  
  
  
  
  DataManagementSidebar: [
    'Datamanagement/intro',
    {
      type: 'category',
      label: 'User Guide',
      link: {
        type: 'generated-index',
        description: 'A step-by-step manual for end users. Provides detailed instructions with visuals on how to use each feature of the system. Helps users navigate and operate the platform effectively and independently.'
      },
      items: [
      'Datamanagement/Customer Data Platform',
      ],
    },
    {
      type: 'category',
      label: 'Tech Stack',
      link: {
        type: 'generated-index',
        description: 'Technologies used in the project. Lists the programming languages, frameworks, tools, and platforms used to build and run the system. Useful for developers, maintainers, and technical stakeholders.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'Projects Documentation',
      link: {
        type: 'generated-index',
        description: 'Comprehensive project overview. Covers the project\'s goals, scope, architecture, database design, and development process. Helps all stakeholders understand the system at a high level.'
      },
      items: [
        {
          type: 'category',
          label: 'AWS General User Guide',
          link: {
            type: 'generated-index',
            description: 'AWS General User Guide for data management and cloud services.'
          },
          items: [
          'Datamanagement/AWS General User Guide/General Information',
          'Datamanagement/AWS General User Guide/AWS Command Line Interface',
          'Datamanagement/AWS General User Guide/Access EC2 Instance',
          'Datamanagement/AWS General User Guide/Amazon Simple Storage Service',
          'Datamanagement/AWS General User Guide/QuickSight',
          'Datamanagement/AWS General User Guide/redshift',
          'Datamanagement/AWS General User Guide/Business as Usual Operation',
          
          
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: {
        type: 'generated-index',
        description: 'Common issues and how to resolve them. Offers solutions and step-by-step guides for frequently encountered problems. Designed to assist both end users and support teams in diagnosing and fixing issues quickly.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'SOP',
      link: {
        type: 'generated-index',
        description: 'Standardized workflows and responsibilities. Outlines the official procedures for common tasks and operations within the system. Ensures consistency, compliance, and clarity in how tasks are performed.'
      },
      items: [
      'techstack/asana',
      ],
    },
    {
      type: 'category',
      label: 'Training Material',
      link: {
        type: 'generated-index',
        description: 'Learning resources for system onboarding. Includes manuals, slides, videos, and exercises designed to train new users and staff. Helps ensure users can confidently use the system as intended.'
      },
      items: [
      'techstack/asana',
      ],
    },
  ],
};

export default sidebars;
