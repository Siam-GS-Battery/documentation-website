import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SearchBox from '@site/src/components/SearchBox';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// Import member images
import memberBow from '@site/src/assets/memberbow.jpg';
import memberMew from '@site/src/assets/membermew.jpg';
import memberJune from '@site/src/assets/memberjune.jpg';
import memberDuay from '@site/src/assets/memberduay.jpg';
import memberNew from '@site/src/assets/membernew.jpg';
import memberToi from '@site/src/assets/membertoi.jpg';
import memberPtum from '@site/src/assets/memberptum.jpg';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <Heading as="h1" className="hero__title" style={{ fontWeight: 400, fontSize: '2.7rem' }}>
          IT & Data Management
        </Heading>
        <p className="hero__subtitle" style={{ fontWeight: 300, fontSize: '1.3rem' }} >The central hub for IT & Data Management documentation and knowledge</p>
        <div className={styles.searchSection}>
          <SearchBox />
        </div>
      </div>
    </div>
  );
}

function CategoryCards() {
  const categories = [
    {
      title: 'IT Management',
      description: 'Documentation and best practices for IT management',
      link: '/docs/Itmanagement/intro',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop&crop=center'
    },
    {
      title: 'IT Development',
      description: 'Documentation and best practices for IT development',
      link: '/docs/Itdevelopment/intro',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=center'
    },
    {
      title: 'Data Management',
      description: 'Documentation and best practices for data management',
      link: '/docs/Datamanagement/intro',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center'
    }
  ];

  return (
    <section className={styles.categorySection}>
      <div className="container">
      <h2>Categories</h2>
        <div className="row">
          {categories.map((category, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <img 
                    src={category.image} 
                    alt={category.title}
                  />
                </div>
                <div className={styles.categoryContent}>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <Link
                    className="button button--outline button--primary"
                    to={category.link}
                  >
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestDocumentation() {
  const gettingStarted = [
    {
      title: 'Introduction to Markdown Creation',
      description: 'Get started with the basics of creating documentation using Markdown.',
      link: '/docs/markdown-create/intro',
      category: 'Documentation',
      subcategory: 'How to create Markdown'
    },
    {
      title: 'Markdown Basics',
      description: 'Learn the fundamental syntax and formatting options in Markdown.',
      link: '/docs/markdown-create/markdown-basics',
      category: 'Documentation', 
      subcategory: 'How to create Markdown'
    },
    {
      title: 'Advanced Markdown Features',
      description: 'Master advanced Markdown techniques and formatting options.',
      link: '/docs/markdown-create/advanced-features',
      category: 'Documentation',
      subcategory: 'How to create Markdown'
    },
    {
      title: 'Visual Elements in Documentation',
      description: 'Learn how to add and manage visual elements in your Markdown documents.',
      link: '/docs/markdown-create/visual-elements',
      category: 'Documentation',
      subcategory: 'How to create Markdown'
    }
  ];

  const popular = [
    // {
    //   title: 'Project Documentation Guide',
    //   description: 'Learn how to create comprehensive project documentation using Markdown.',
    //   link: '/docs/markdown-create/project-docs',
    //   category: 'How to create Markdown',
    //   subcategory: 'Project Documentation',
    //   status: 'Active',
    //   date: '15 March 2025'
    // },
    // {
    //   title: 'SOP Writing Guidelines',
    //   description: 'Guidelines and templates for creating Standard Operating Procedures (SOPs).',
    //   link: '/docs/markdown-create/sop-writing',
    //   category: 'How to create Markdown',
    //   subcategory: 'SOP',
    //   status: 'Active',
    //   date: '10 March 2025'
    // },
    {
      title: 'Asana Project Management Guide',
      description: 'Master project management and team collaboration using Asana with advanced workflows and best practices.',
      link: '/docs/Itmanagement/HowtouseAsana',
      category: 'IT Management',
      subcategory: 'User Guide',
      status: 'Active',
      date: '08 March 2025'
    },
    {
      title: 'Customer Data Platform Setup',
      description: 'Complete guide for building a Customer Data Platform to centralize and manage customer data effectively.',
      link: '/docs/Datamanagement/Customer Data Platform',
      category: 'Data Management',
      subcategory: 'Tech Stack',
      status: 'Active',
      date: '05 March 2025'
    }
  ];

  return (
    <section className={styles.latestDocsSection}>
      <div className="container">
        <div className={styles.docsGrid}>
          <div className={styles.docsColumn}>
            <h2>Getting started</h2>
            <div className={styles.docsList}>
              {gettingStarted.map((doc, idx) => (
                <div key={idx} className={styles.docItem}>
                  <div className={styles.docBadges}>
                    <span className={clsx(styles.badge, styles[`badge${doc.category.replace(/\s+/g, '')}`])}>
                      {doc.category}
                    </span>
                    <span className={clsx(styles.badge, styles.badgeSubcategory)}>
                      {doc.subcategory}
                    </span>
                  </div>
                  <h3 className={styles.docTitle}>
                    <Link to={doc.link}>
                      {doc.title}
                    </Link>
                  </h3>
                  <p className={styles.docDescription}>{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.docsColumn}>
            <h2>Popular</h2>
            <div className={styles.docsList}>
              {popular.map((doc, idx) => (
                <div key={idx} className={styles.docItem}>
                  <div className={styles.docHeader}>
                    <div className={styles.docBadges}>
                      <span className={clsx(styles.badge, styles[`badge${doc.category.replace(/\s+/g, '')}`])}>
                        {doc.category}
                      </span>
                      <span className={clsx(styles.badge, styles.badgeSubcategory)}>
                        {doc.subcategory}
                      </span>
                    </div>
                    <div>
                      <span className={styles.docDate}>{doc.date}</span>
                      <span className={styles.statusBadge}>{doc.status}</span>
                    </div>
                  </div>
                  <h3 className={styles.docTitle}>
                    <Link to={doc.link}>
                      {doc.title}
                    </Link>
                  </h3>
                  <p className={styles.docDescription}>{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamMembers() {
  const members = [
    {
      name: 'Bow',
      role: 'IT Manager',
      image: memberBow,
      description: 'ผู้จัดการแผนกเทคโนโลยีสารสนเทศ'
    },
    {
      name: 'Mew',
      role: 'System Administrator',
      image: memberMew,
      description: 'ดูแลระบบและเครือข่าย'
    },
    {
      name: 'June',
      role: 'Developer',
      image: memberJune,
      description: 'พัฒนาแอปพลิเคชันและเว็บไซต์'
    },
    {
      name: 'Duay',
      role: 'Database Administrator',
      image: memberDuay,
      description: 'จัดการฐานข้อมูลและระบบ'
    },
    {
      name: 'New',
      role: 'IT Support',
      image: memberNew,
      description: 'ให้บริการสนับสนุนด้าน IT'
    },
    {
      name: 'Toi',
      role: 'Network Engineer',
      image: memberToi,
      description: 'ดูแลเครือข่ายและความปลอดภัย'
    },
    {
      name: 'Ptum',
      role: 'IT Specialist',
      image: memberPtum,
      description: 'ผู้เชี่ยวชาญด้านเทคโนโลยี'
    }
  ];

  return (
    <section className={styles.teamSection}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <h2>Our Team</h2>
          <p>Our team of IT & Data Management experts ready to serve</p>
        </div>
        <div className="row">
          {members.map((member, idx) => (
            <div key={idx} className="col col--3 margin-bottom--lg">
              <div className="card">
                <div className="card__image">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px 8px 0 0'
                    }}
                  />
                </div>
                <div className="card__body">
                  <h3>{member.name}</h3>
                  <p className="text--primary">{member.role}</p>
                  <p className="text--secondary">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Documentation - IT & Data Management`}
      description="IT & Data Management">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
        {/* <TeamMembers /> */}
        <CategoryCards />
        <LatestDocumentation />
      </main>
    </Layout>
  );
}
