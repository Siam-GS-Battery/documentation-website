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



function Documentation() {
  const [selectedCategories, setSelectedCategories] = useState(['all'])
  const [selectedDivision, setSelectedDivision] = useState('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('categories')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentView, setCurrentView] = useState('main')
  const [selectedMainCategory, setSelectedMainCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 6

  // Scroll to Categories Filter function (works for both desktop and mobile)
  const scrollToCategories = () => {
    // Add small delay to ensure elements are rendered
    setTimeout(() => {
      // Try desktop categories filter first
      let categoriesFilter = document.querySelector(`.${styles.desktopCategoriesFilter}`);
      
      // If not found or not visible, try mobile menu container
      if (!categoriesFilter || window.getComputedStyle(categoriesFilter).display === 'none') {
        categoriesFilter = document.querySelector(`.${styles.mobileMenuContainer}`);
      }
      
      if (categoriesFilter) {
        const rect = categoriesFilter.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 50; // 50px offset from top
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  }

  // Handle page change with loading state
  const handlePageChange = (newPage) => {
    setIsLoading(true);
    setCurrentPage(newPage);
    scrollToCategories();
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }

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
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Function to handle main category selection
  const handleMainCategoryClick = (category) => {
    setSelectedMainCategory(category)
    setCurrentView('documents')
    setCurrentPage(1)
  }

  // Function to handle subcategory selection
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory)
    setCurrentView('documents')
    setCurrentPage(1)
  }

  // Function to go back to main categories
  const handleBackToMain = () => {
    setCurrentView('main')
    setSelectedMainCategory(null)
    setSelectedSubcategory(null)
    setCurrentPage(1)
  }

  // Function to go back to subcategories (no longer needed)
  const handleBackToSubcategories = () => {
    setCurrentView('documents')
    setSelectedSubcategory(null)
    setCurrentPage(1)
  }


  // Get current items based on view
  const getCurrentItems = () => {
    if (currentView === 'main') {
      return projectData.mainCategories || []
    } else if (currentView === 'documents' && selectedMainCategory) {
      // For documents, we get the subcategories from the selected main category
      return selectedMainCategory.subcategories || []
    }
    return []
  }

  const currentItems = getCurrentItems()
  const totalPages = Math.ceil(currentItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = currentItems.slice(startIndex, endIndex)

  // Handle division change
  const handleDivisionChange = (divisionId) => {
    setSelectedDivision(divisionId)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

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
            Explore our comprehensive documentation library covering IT development, data management, and business applications. Find detailed guides, tutorials, and best practices for your technical needs.
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
                  onClick={() => handleDivisionChange(division.id)}
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
                                  handleDivisionChange(division.id)
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

          {/* Main Content Grid */}
          <div className={styles.projectGrid}>
            {/* Breadcrumb Navigation */}
            {currentView === 'documents' && selectedMainCategory && (
              <div className={styles.breadcrumb}>
                <button onClick={handleBackToMain} className={styles.breadcrumbLink}>Main Categories</button>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>{selectedMainCategory.title}</span>
              </div>
            )}

            {/* Item Count */}
            <div className={styles.projectCount}>
              <p>
                Showing <span className={styles.highlight}>{startIndex + 1}-{Math.min(endIndex, currentItems.length)}</span> of <span className={styles.bold}>{currentItems.length}</span> {currentView === 'main' ? 'categories' : 'documents'}
              </p>
            </div>

            {/* Cards Grid */}
            <div className={styles.projectCards}>
              {isLoading ? (
                // Skeleton Loading Cards
                Array.from({ length: Math.min(itemsPerPage, currentItems.length) }).map((_, index) => (
                  <div key={`skeleton-${index}`} className={styles.projectCard}>
                    <div className={styles.skeletonCard}>
                      <div className={styles.projectContent}>
                        <div className={styles.skeletonTitle}></div>
                        <div className={styles.skeletonText}></div>
                        <div className={styles.skeletonText}></div>
                        <div className={styles.skeletonButton}></div>
                      </div>
                      <div className={styles.projectBar}></div>
                    </div>
                  </div>
                ))
              ) : (
                paginatedItems.map((item) => {
                if (currentView === 'main') {
                  // Main category cards
                  return (
                    <div
                      key={item.id}
                      className={`${styles.projectCard} ${styles.categoryCard}`}
                      onClick={() => handleMainCategoryClick(item)}
                    >
                      <div className={styles.projectContent}>
                        {/* <div className={styles.categoryIcon}>
                          {categoryIcons[item.icon] || categoryIcons.database}
                        </div> */}
                        <h3 className={styles.projectTitle}>{item.title}</h3>
                        <p className={styles.projectDescription}>{item.description}</p>
                        <div className={styles.subcategoryCount}>
                          {item.subcategories?.length || 0} documents
                        </div>
                      </div>
                      <div className={styles.projectBar}></div>
                    </div>
                  )
                } else {
                  // Document cards
                  return (
                    <div
                      key={item.id}
                      className={styles.projectCard}
                    >
                      <div className={styles.projectContent}>
                        <h3 className={styles.projectTitle}>{item.title}</h3>
                        <p className={styles.projectDescription}>{item.description}</p>
                        <Link
                          to={`/docs/${item.path}`}
                          className={styles.readMoreLink}
                        >
                          Read More
                          <svg className={styles.readMoreIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                      <div className={styles.projectBar}></div>
                    </div>
                  )
                }
              })
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={`${styles.pageButton} ${styles.prevButton}`}
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <svg className={styles.pageIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className={styles.pageNumbers}>
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
                    ) : (
                      <button
                        key={page}
                        className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>
                
                <button
                  className={`${styles.pageButton} ${styles.nextButton}`}
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <svg className={styles.pageIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* No Results Message */}
            {currentItems.length === 0 && (
              <div className={styles.noResults}>
                <h3>No {currentView === 'main' ? 'categories' : 'documents'} found</h3>
                <p>Try going back or refreshing the page</p>
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