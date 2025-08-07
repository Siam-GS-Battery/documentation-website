import React, { useState } from 'react'
import Layout from '@theme/Layout';
import styles from './Documentation.module.css';
import { Link } from 'react-router-dom';
import projectData from '../data/simple.json';

const divisions = [
  { id: 'all', name: 'All Divisions' },
  { id: 'datamanagement', name: 'Data Management' },
  { id: 'itdevelopment', name: 'IT Development' },
  { id: 'itmanagement', name: 'IT Management' },

]

/** SVG ICONS for categories */
const categoryIcons = {
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.091zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  business: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h10.5M6.75 9.75h10.5M6.75 12.75h10.5" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"></path>
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"></path>
    </svg>
  ),
  infrastructure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  ),
  cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
}

// Remove icon from categories array
const categories = [
  { id: 'ai', name: 'AI/ML' },
  { id: 'business', name: (<><span>Business</span><br /><span>Application</span></>) },
  { id: 'cloud', name: 'Cloud' },
  { id: 'database', name: 'Database' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'security', name: 'Security' },
]

// Function to automatically categorize documents based on rules
const autoCategorizeDocument = (document, rules) => {
  let categories = document.categories || [];
  let division = document.division || 'it-data';
  
  // Apply keyword-based categorization
  if (rules.keywords) {
    const titleAndDescription = `${document.title} ${document.description}`.toLowerCase();
    const path = document.path || '';
    
    for (const [keyword, keywordCategories] of Object.entries(rules.keywords)) {
      if (titleAndDescription.includes(keyword.toLowerCase()) || path.includes(keyword)) {
        keywordCategories.forEach(cat => {
          if (!categories.includes(cat)) {
            categories.push(cat);
          }
        });
      }
    }
  }
  
  // Apply path-based categorization
  if (rules.pathMappings) {
    for (const [pathKeyword, pathCategories] of Object.entries(rules.pathMappings)) {
      if (document.path && document.path.includes(pathKeyword)) {
        pathCategories.forEach(cat => {
          if (!categories.includes(cat)) {
            categories.push(cat);
          }
        });
        // Set division based on path mapping
        if (pathCategories.includes('datamanagement')) {
          division = 'datamanagement';
        } else if (pathCategories.includes('itmanagement')) {
          division = 'itmanagement';
        } else if (pathCategories.includes('itdevelopment')) {
          division = 'itdevelopment';
        }
      }
    }
  }
  
  return { categories, division };
};

// Use data from JSON file and add additional projects for demonstration
const projects = [
  // Documents from JSON file
  ...projectData.documents.map(document => {
    const { categories, division } = autoCategorizeDocument(document, projectData.categorizationRules || {});
    
    return {
      id: document.id,
      title: document.title,
      description: document.description,
      path: document.path, // Add the document path for direct linking
      categories: categories,
      division: division,
      team: 'IT Department',
    };
  }),
  // Additional documents for demonstration
]

function Documentation() {
  const [selectedCategories, setSelectedCategories] = useState(['all'])
  const [selectedDivision, setSelectedDivision] = useState('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('categories')

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
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
    <Layout title="Documentation" description="Browse our documentation portfolio">
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
            Documentation
          </h1>
          <p className={styles.heroDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget turpis tincidunt, condimentum ex vel, facilisis augue. Nunc interdum, risus non vestibulum volutpat,
          </p>
        </div>
      </section>

      {/* Main Content: Sidebar + Project Grid */}
      <section className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Sidebar Division Filter - Desktop Only */}
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

          {/* Mobile Hamburger Menu */}
          <div className={styles.mobileMenuContainer}>
            <button 
              className={styles.hamburgerButton}
              onClick={toggleMobileMenu}
              aria-label="Toggle filters menu"
            >
              <div className={`${styles.hamburgerIcon} ${isMobileMenuOpen ? styles.open : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className={styles.hamburgerText}>Filters</span>
            </button>
            
            {isMobileMenuOpen && (
              <>
                <div className={styles.menuOverlay} onClick={closeMobileMenu}></div>
                <div className={styles.mobileMenu}>
                  <div className={styles.menuHeader}>
                    <button className={styles.closeButton} onClick={closeMobileMenu}>
                    </button>
                  </div>
                  
                  <div className={styles.tabContainer}>
                    <div className={styles.tabButtons}>
                      <button 
                        className={`${styles.tabButton} ${activeTab === 'categories' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('categories')}
                      >
                        Categories
                      </button>
                      <button 
                        className={`${styles.tabButton} ${activeTab === 'departments' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('departments')}
                      >
                        Departments
                      </button>
                    </div>
                    
                    <div className={styles.tabContent}>
                      {activeTab === 'categories' && (
                        <div className={styles.categoriesTab}>
                          <div className={styles.mobileCategories}>
                            {categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => {
                                  toggleCategory(category.id)
                                  closeMobileMenu()
                                }}
                                className={`${styles.mobileCategoryButton} ${selectedCategories.includes(category.id) ? styles.active : ''}`}
                              >
                                <div className={styles.categoryIcon}>{categoryIcons[category.id]}</div>
                                <span className={styles.categoryText}>
                                  {category.id === 'business'
                                    ? 'Business Application'
                                    : category.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'departments' && (
                        <div className={styles.departmentsTab}>
                          <div className={styles.mobileDivisionList}>
                            {divisions.map((division) => (
                              <button
                                key={division.id}
                                onClick={() => {
                                  setSelectedDivision(division.id)
                                  closeMobileMenu()
                                }}
                                className={`${styles.mobileDivisionButton} ${selectedDivision === division.id ? styles.active : ''}`}
                              >
                                {division.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Close button at top right corner */}
                  <button 
                    className={styles.topCloseButton}
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18" />
                      <path d="M6 6L18 18" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Desktop Categories Filter */}
          <div className={styles.desktopCategoriesFilter}>
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

          {/* Main Project Grid */}
          <div className={styles.projectGrid}>

            {/* Project Count */}
            <div className={styles.projectCount}>
              <p>
                Showing <span className={styles.highlight}>{filteredProjects.length}</span> of <span className={styles.bold}>{projects.filter(p=>p.division===selectedDivision).length}</span> documents
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


                  {/* Project Content */}
                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    {/* Read More Link */}
                    <Link
                      to={`/docs/${project.path}`}
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
                <h3>No documents found</h3>
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

export default Documentation
