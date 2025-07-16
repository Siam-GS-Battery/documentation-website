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
      title: 'Getting Started with Documentation',
      description: 'Learn the basics of creating and managing documentation for your IT projects and workflows.',
      link: '/docs/intro'
    },
    {
      title: 'How to Create Markdown Files',
      description: 'Master the art of writing documentation using Markdown syntax and best practices for formatting.',
      link: '/docs/markdown-create/markdown-basics'
    },
    {
      title: 'Project Management with Asana',
      description: 'Set up and use Asana for effective project management and team collaboration workflows.',
      link: '/docs/techstack/asana'
    },
    {
      title: 'IT Development Best Practices',
      description: 'Learn fundamental practices for software development and system management in your organization.',
      link: '/docs/Itdevelopment/intro'
    }
  ];

  const popular = [
    {
      title: 'E-Commerce Management System',
      description: 'Learn how to build and manage a complete e-commerce platform with admin dashboard and inventory management.',
      link: '/docs/Itdevelopment/E-Commerce Management System',
      status: 'Active',
      date: '15 March 2025'
    },
    {
      title: 'Customer Data Platform Setup',
      description: 'Complete guide for building a Customer Data Platform to centralize and manage customer data effectively.',
      link: '/docs/Datamanagement/Customer Data Platform',
      status: 'Active',
      date: '10 March 2025'
    },
    {
      title: 'Asana Project Management Guide',
      description: 'Master project management and team collaboration using Asana with advanced workflows and best practices.',
      link: '/docs/Itmanagement/HowtouseAsana',
      status: 'Active',
      date: '08 March 2025'
    },
    {
      title: 'Advanced Markdown Documentation',
      description: 'Create professional documentation with advanced Markdown features, visual elements, and formatting techniques.',
      link: '/docs/markdown-create/advanced-features',
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
                    <span className={styles.docDate}>{doc.date}</span>
                    <span className={styles.statusBadge}>{doc.status}</span>
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
