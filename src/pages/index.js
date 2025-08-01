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
import memberMew from '@site/src/assets/membermew.png';
import memberJune from '@site/src/assets/memberjune.jpg';
import memberDuay from '@site/src/assets/memberduay.jpg';
import memberNew from '@site/src/assets/membernew.jpg';
import memberToi from '@site/src/assets/membertoi.jpg';
import memberPtum from '@site/src/assets/memberptum.jpg';
import memberfah from '@site/src/assets/memberfah.png';
import memberboss from '@site/src/assets/memberboss.png';


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
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop&crop=center',
      category: 'Management'
    },
    {
      title: 'IT Development',
      description: 'Documentation and best practices for IT development',
      link: '/docs/Itdevelopment/intro',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=center',
      category: 'Development'
    },
    {
      title: 'Data Management',
      description: 'Documentation and best practices for data management',
      link: '/docs/Datamanagement/intro',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center',
      category: 'Data'
    },
    {
      title: 'Documentation',
      description: 'Learn how to create effective documentation',
      link: '/docs/markdown-create/intro',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&crop=center',
      category: 'Guide'
    }
  ];

  return (
    <section className={styles.categorySection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Recommended for you</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category, idx) => (
            <div key={idx} className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                <img 
                  src={category.image} 
                  alt={category.title}
                />
              </div>
              <div className={styles.categoryContent}>
                <div className={styles.categoryLabel}>{category.category}</div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
                <Link
                  className={styles.categoryLink}
                  to={category.link}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16666 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
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
    },
    

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
    // {
    //   title: 'Asana Project Management Guide',
    //   description: 'Master project management and team collaboration using Asana with advanced workflows and best practices.',
    //   link: '/docs/Itmanagement/HowtouseAsana',
    //   category: 'IT Management',
    //   subcategory: 'User Guide',
    //   status: 'Active',
    //   date: '08 March 2025'
    // },
    // {
    //   title: 'Customer Data Platform Setup',
    //   description: 'Complete guide for building a Customer Data Platform to centralize and manage customer data effectively.',
    //   link: '/docs/Datamanagement/Customer Data Platform',
    //   category: 'Data Management',
    //   subcategory: 'Tech Stack',
    //   status: 'Active',
    //   date: '05 March 2025'
    // },
    {
      title: 'AWS General User Guide',
      description: 'AWS General User GuideThe information in this document is confidential to the company to whom it is addressed and should be used for that purpose only.',
      link: '/docs/Datamanagement/AWS General User Guide/General Information',
      category: 'Data Management',
      subcategory: 'Project',
      status: 'Active',
      date: '31 July 2025'
    },
    {
      title: 'AWS Command Line Interface (CLI)',
      description: 'AWS General User GuideThe information in this document is confidential to the company to whom it is addressed and should be used for that purpose only.',
      link: '/docs/Datamanagement/AWS General User Guide/AWS Command Line Interface',
      category: 'Data Management',
      subcategory: 'Project',
      status: 'Active',
      date: '31 July 2025'
    },
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
      name: 'Thanakorn Chollavorn',
      role: 'Asst.General Manager of Information Technology & Data Management',
      image: memberPtum
    },
    {
      name: 'Sahachol Suwanichsuksan',
      role: 'Asst.Manager of Information Technology (Acting)',
      image: memberToi
    },
    {
      name: 'Haripong Dokput',
      role: 'Chief of IT Management',
      image: memberDuay
    },
    {
      name: 'Phongsaton Viangkam',
      role: 'Sr.Officer Information Technology',
      image: memberNew
    },
    {
      name: 'Nisarat Hawharn',
      role: 'Data Strategy Operation',
      image: memberBow
    },
    {
      name: 'Thitison Chedkai',
      role: 'Information Technology Officer',
      image: memberJune
    },
    {
      name: 'Ratchanok Rachramthong',
      role: 'Project Management Officer',
      image: memberMew
    },
    {
      name: 'Pantira Sripimmeang',
      role: 'Software Engineer',
      image: memberfah
    },
    {
      name: 'Burased Baworncharoenpun',
      role: 'AI Engineer',
      image: memberboss
    }
  ];

  return (
    <section className={styles.teamSection}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>IT TEAM</h2>
          <p  style={{ fontSize: '1rem', fontWeight: '400', color: '#6b7280' }}>Key members of the IT team who collaborate to develop and solve various project issues.</p>
        </div>
        <div className="row" style={{ justifyContent: 'center' }}>
          {members.map((member, idx) => (
            <div key={idx} className="col col--4" style={{ display: 'flex', justifyContent: 'center', padding: '0', marginBottom: '1rem' }}>
              <div className="text--center" style={{ padding: '0 0.25rem', maxWidth: '280px' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: '240px',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem', 
                    color: '#1f2937',
                    textAlign: 'center'
                  }}>
                    {member.name}
                  </p>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#6b7280', 
                    margin: '0 auto',
                    textAlign: 'center',
                    maxWidth: '240px',
                    marginBottom: '1.5rem',
                  }}>
                    {member.role}
                  </p>
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
      title={`IT-Portal`}
      description="IT & Data Management">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
        <CategoryCards />
        <LatestDocumentation />
        <TeamMembers />
      </main>
    </Layout>
  );
}
