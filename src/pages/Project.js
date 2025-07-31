import React, { useState } from 'react'
import Layout from '@theme/Layout';
import styles from './Project.module.css';
import aiIcon from '../assets/ai1.png';
import businessIcon from '../assets/cloud-application1.png';
import databaseIcon from '../assets/server1.png';
import infrastructureIcon from '../assets/digitalization1.png';
import securityIcon from '../assets/cyber-security1.png';
import ProjectDetail from './Project-detail';
import { Link } from 'react-router-dom';
import projectData from '../data/simple.json';

const divisions = [
  { id: 'all', name: 'All Divisions' },
  { id: 'hr-ad', name: 'HR & AD Division' },
  { id: 'accounting-finance', name: 'Accounting & Finance Division' },
  { id: 'production-procurement', name: 'Production Control & Procurement Division' },
  { id: 'production-maintenance', name: 'Production & Maintenance Division' },
  { id: 'quality-assurance', name: 'Quality Assurance Division' },
  { id: 'sales-marketing', name: 'Sales & Marketing Division' },
  { id: 'technical', name: 'Technical Division' },
  { id: 'it-data', name: 'Information Technology & Data Management' },
]

/** SVG ICONS for categories */
const categoryIcons = {
  ai: (
    <img src={aiIcon} alt="AI/ML" />
  ),
  business: (
    <img src={businessIcon} alt="Business Application" />
  ),
  database: (
    <img src={databaseIcon} alt="Database" />
  ),
  infrastructure: (
    <img src={infrastructureIcon} alt="Infrastructure" />
  ),
  security: (
    <img src={securityIcon} alt="Security" />
  ),
}

// Remove icon from categories array
const categories = [
  { id: 'ai', name: 'AI/ML' },
  { id: 'business', name: (<><span>Business</span><br /><span>Application</span></>) },
  { id: 'database', name: 'Database' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'security', name: 'Security' },
]

// Use data from JSON file and add additional projects for demonstration
const projects = [
  // Projects from JSON file
  ...projectData.projects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.sections.challenge.substring(0, 150) + '...',
    image: project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
    categories: project.category || [],
    division: project.division || 'it-data',
    team: project.department,
  })),
  // Additional projects for demonstration
  {
    id: 'database-migration',
    title: 'Database Migration System',
    description: 'Comprehensive database migration and optimization system for enterprise data management.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=500&q=80',
    categories: ['database', 'infrastructure'],
    division: 'it-data',
    team: 'Data Management',
  },
  {
    id: 'business-automation',
    title: 'Business Process Automation',
    description: 'End-to-end automation solution for streamlining business operations and workflows.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80',
    categories: ['business', 'ai'],
    division: 'accounting-finance',
    team: 'Data Management',
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure Setup',
    description: 'Scalable cloud infrastructure deployment and management system.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
    categories: ['infrastructure'],
    division: 'technical',
    team: 'Data Management',
  },
  {
    id: 'data-warehouse',
    title: 'Data Warehouse Solution',
    description: 'Enterprise data warehouse with real-time analytics and reporting capabilities.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
    categories: ['database', 'business'],
    division: 'it-data',
    team: 'Data Management',
  },
  {
    id: 'hr-management',
    title: 'HR Management System',
    description: 'Comprehensive human resources management system for employee lifecycle management.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80',
    categories: ['business'],
    division: 'hr-ad',
    team: 'Data Management',
  },
  {
    id: 'quality-control',
    title: 'Quality Control Dashboard',
    description: 'Real-time quality monitoring and control system for production processes.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80',
    categories: ['business'],
    division: 'quality-assurance',
    team: 'Data Management',
  }
]

function Project() {
  const [selectedCategories, setSelectedCategories] = useState(['all'])
  const [selectedDivision, setSelectedDivision] = useState('all')

  const toggleCategory = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all'])
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(cat => cat !== 'all')
        if (newCategories.includes(categoryId)) {
          return newCategories.filter(cat => cat !== categoryId)
        } else {
          return [...newCategories, categoryId]
        }
      })
    }
  }

  const filteredProjects = projects.filter(project => {
    // Filter by categories
    const categoryMatch = selectedCategories.includes('all') || 
      selectedCategories.length === 0 || 
      (project.categories && project.categories.some(cat => selectedCategories.includes(cat)))
    // Filter by division (all = show all)
    const divisionMatch = selectedDivision === 'all' || project.division === selectedDivision
    return categoryMatch && divisionMatch
  })

  return (
    <Layout title="IT Projects" description="Browse our IT project portfolio">
      <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroDecoration}>
          <div className={styles.spinningElement}>
            <div className={styles.decorativeBox}></div>
            <div className={styles.decorativeBox}></div>
            <div className={styles.decorativeBox}></div>
          </div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            IT Project Stories
          </h1>
          <p className={styles.heroDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget turpis tincidunt, condimentum ex vel, facilisis augue. Nunc interdum, risus non vestibulum volutpat,
          </p>
        </div>
      </section>

      {/* Main Content: Sidebar + Project Grid */}
      <section className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Sidebar Division Filter */}
          <aside className={styles.sidebar}>
            <div className={styles.filterTitle}>Filter</div>
            <div className={styles.divisionList}>
              {divisions.map((division) => (
                <button
                  key={division.id}
                  onClick={() => setSelectedDivision(division.id)}
                  className={`${styles.divisionButton} ${selectedDivision === division.id ? styles.active : ''}`}
                >
                  {division.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Project Grid + Category Filter */}
          <div className={styles.projectGrid}>
            {/* Categories Filter */}
            <div className={styles.categoriesFilter}>
              <div className={styles.categoryButtons}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`${styles.categoryButton} ${selectedCategories.includes(category.id) ? styles.active : ''}`}
                  >
                    <div className={styles.categoryIcon}>{categoryIcons[category.id]}</div>
                    <span className={styles.categoryText}>
                      {category.id === 'business'
                        ? <>Business<br />Application</>
                        : category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Count */}
            <div className={styles.projectCount}>
              <p>
                Showing <span className={styles.highlight}>{filteredProjects.length}</span> of <span className={styles.bold}>{projects.filter(p=>p.division===selectedDivision).length}</span> projects
              </p>
            </div>

            {/* Project Cards Grid */}
            <div className={styles.projectCards}>
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  data-category={project.categories ? project.categories.join(',') : ''}
                  className={styles.projectCard}
                >
                  {/* Project Image */}
                  <div className={styles.projectImage}>
                    <img
                      src={project.image}
                      alt={project.title}
                    />
                  </div>

                  {/* Project Content */}
                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    {/* Read More Link */}
                    <Link
                      to={`/project-detail/${project.id}`}
                      className={styles.readMoreLink}
                    >
                      Read More
                      <svg className={styles.readMoreIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  {/* Blue Bar */}
                  <div className={styles.projectBar}></div>
                </div>
              ))}
            </div>
            {/* No Results Message */}
            {filteredProjects.length === 0 && (
              <div className={styles.noResults}>
                <h3>No projects found</h3>
                <p>Try selecting different categories or clear all filters</p>
              </div>
            )}
          </div>
        </div>
      </section>
      </div>
    </Layout>
  )
}

export default Project
