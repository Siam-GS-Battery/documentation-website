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
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.heroContent}>
        <Heading as="h1" className="hero__title">
          IT & Data Management
        </Heading>
        <p className="hero__subtitle">The central hub for IT & Data Management documentation and knowledge</p>
        <div className={styles.searchSection}>
          <SearchBox />
        </div>
      </div>
    </header>
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
      title={`${siteConfig.title} - แผนกเทคโนโลยีสารสนเทศ`}
      description="เว็บไซต์เอกสารและความรู้ด้านเทคโนโลยีสารสนเทศ">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
        {/* <TeamMembers /> */}
      </main>
    </Layout>
  );
}
