import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from '@docusaurus/router';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './SearchBox.css';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [allDocs, setAllDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef(null);
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();

  // ฟังก์ชันสำหรับดึงข้อมูลเอกสารทั้งหมดจาก Docusaurus sidebars
  const fetchAllDocs = async () => {
    try {
      // ใช้ Docusaurus context เพื่อเข้าถึงข้อมูล sidebars
      const { pluginContentDocs } = siteConfig;
      if (pluginContentDocs && pluginContentDocs.sidebars) {
        const docs = [];
        
        // วนลูปผ่าน sidebars ทั้งหมด
        Object.entries(pluginContentDocs.sidebars).forEach(([sidebarName, sidebarItems]) => {
          processSidebarItems(sidebarItems, docs, sidebarName);
        });
        
        setAllDocs(docs);
      } else {
        // Fallback: ใช้ข้อมูลจาก sidebars configuration ที่ hardcode
        await fetchDocsFromSidebarsConfig();
      }
    } catch (error) {
      console.warn('Failed to fetch docs from siteConfig, using fallback method:', error);
      // Fallback: ใช้ข้อมูลจาก sidebars configuration ที่ hardcode
      await fetchDocsFromSidebarsConfig();
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback method: ดึงข้อมูลจาก sidebars configuration ที่ hardcode
  const fetchDocsFromSidebarsConfig = async () => {
    try {
      // พยายามดึงข้อมูลจาก sidebars.js ไฟล์จริง
      const response = await fetch('/sidebars.js');
      if (response.ok) {
        const sidebarsText = await response.text();
        // แปลง sidebars configuration เป็น object
        const sidebarsConfig = parseSidebarsConfig(sidebarsText);
        
        if (sidebarsConfig) {
          const docs = [];
          
          // วนลูปผ่าน sidebars ทั้งหมด
          Object.entries(sidebarsConfig).forEach(([sidebarName, sidebarItems]) => {
            processSidebarItems(sidebarItems, docs, sidebarName);
          });
          
          setAllDocs(docs);
          return;
        }
      }
      
      // Fallback: ใช้ข้อมูลจาก sidebars configuration ที่ hardcode
      await fetchDocsFromHardcodedConfig();
    } catch (error) {
      console.warn('Failed to fetch sidebars.js, using hardcoded config:', error);
      // Fallback: ใช้ข้อมูลจาก sidebars configuration ที่ hardcode
      await fetchDocsFromHardcodedConfig();
    }
  };

  // ฟังก์ชันสำหรับแปลง sidebars.js text เป็น object
  const parseSidebarsConfig = (sidebarsText) => {
    try {
      // ลบ comments และ export statement
      const cleanText = sidebarsText
        .replace(/\/\*[\s\S]*?\*\//g, '') // ลบ /* comments */
        .replace(/\/\/.*$/gm, '') // ลบ // comments
        .replace(/export default sidebars;/, '')
        .replace(/const sidebars = /, '')
        .replace(/;?\s*$/, '');
      
      // แปลงเป็น object
      return eval(`(${cleanText})`);
    } catch (error) {
      console.error('Failed to parse sidebars config:', error);
      return null;
    }
  };

  // Fallback method: ใช้ข้อมูลจาก sidebars configuration ที่ hardcode
  const fetchDocsFromHardcodedConfig = async () => {
    try {
      // ใช้ข้อมูลจาก sidebars.js ที่เราเห็น
      const sidebarsConfig = {
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
              'techstack/asana',
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
              description: 'Documents and best practices for IT development in the IT & Data Management'
            },
            items: [
              'Itdevelopment/E-Commerce Management System',
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
              
              'Datamanagement/Customer Data Platform',
              // สามารถเพิ่มหมวดหมู่ย่อยอื่นๆ ได้ที่นี่
            ],
          },
        ],
      };

      const docs = [];
      
      // วนลูปผ่าน sidebars ทั้งหมด
      Object.entries(sidebarsConfig).forEach(([sidebarName, sidebarItems]) => {
        processSidebarItems(sidebarItems, docs, sidebarName);
      });
      
      setAllDocs(docs);
    } catch (error) {
      console.error('Failed to fetch docs from hardcoded config:', error);
      // ใช้ข้อมูล default ถ้าไม่สามารถดึงข้อมูลได้
      setAllDocs(getDefaultDocs());
    }
  };

  // ฟังก์ชันสำหรับประมวลผล sidebar items
  const processSidebarItems = (items, docs, category) => {
    items.forEach(item => {
      if (typeof item === 'string') {
        // เป็น document ID
        docs.push({
          title: formatTitle(item),
          path: `/docs/${item}`,
          category: formatCategory(category)
        });
      } else if (item.type === 'category') {
        // เป็น category
        const subCategory = `${formatCategory(category)} > ${item.label}`;
        if (item.items) {
          processSidebarItems(item.items, docs, subCategory);
        }
      }
    });
  };

  // ฟังก์ชันสำหรับจัดรูปแบบ title
  const formatTitle = (id) => {
    return id
      .split('/')
      .pop()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // ฟังก์ชันสำหรับจัดรูปแบบ category
  const formatCategory = (category) => {
    const categoryMap = {
      'tutorialSidebar': 'Documentation',
      'ITmanagementSidebar': 'IT Management',
      'ITdevelopmentSidebar': 'IT Development',
      'DataManagementSidebar': 'Data Management'
    };
    return categoryMap[category] || category;
  };

  // ข้อมูล default ถ้าไม่สามารถดึงข้อมูลได้
  const getDefaultDocs = () => [
    { title: 'Welcome', path: '/docs/intro', category: 'Documentation' },
    { title: 'Create a Document', path: '/docs/tutorial-basics/create-a-document', category: 'Documentation > Tutorial Basics' },
    { title: 'Create a Blog Post', path: '/docs/tutorial-basics/create-a-blog-post', category: 'Documentation > Tutorial Basics' },
    { title: 'Markdown Features', path: '/docs/tutorial-basics/markdown-features', category: 'Documentation > Tutorial Basics' },
    { title: 'Deploy your site', path: '/docs/tutorial-basics/deploy-your-site', category: 'Documentation > Tutorial Basics' },
    { title: 'Create a Page', path: '/docs/tutorial-basics/create-a-page', category: 'Documentation > Tutorial Basics' },
    { title: 'Congratulations', path: '/docs/tutorial-basics/congratulations', category: 'Documentation > Tutorial Basics' },
    { title: 'Manage Docs Versions', path: '/docs/tutorial-extras/manage-docs-versions', category: 'Documentation > Tutorial Extras' },
    { title: 'Translate your site', path: '/docs/tutorial-extras/translate-your-site', category: 'Documentation > Tutorial Extras' },
    { title: 'IT Management Introduction', path: '/docs/Itmanagement/intro', category: 'IT Management' },
    { title: 'How to use Asana', path: '/docs/Itmanagement/HowtouseAsana', category: 'IT Management > Projects' },
    { title: 'IT Development Introduction', path: '/docs/Itdevelopment/intro', category: 'IT Development' },
    { title: 'E-Commerce Management System', path: '/docs/Itdevelopment/E-Commerce Management System', category: 'IT Development > Projects' },
    { title: 'Data Management Introduction', path: '/docs/Datamanagement/intro', category: 'Data Management' },
    { title: 'Customer Data Platform', path: '/docs/Datamanagement/Customer Data Platform', category: 'Data Management > Projects > Customer Data Platform' },
  ];

  // ดึงข้อมูลเอกสารเมื่อ component mount
  useEffect(() => {
    fetchAllDocs();
  }, []);

  // ค้นหาเอกสาร
  const searchDocs = (searchQuery) => {
    if (!searchQuery.trim() || isLoading) {
      setResults([]);
      return;
    }

    const searchTerm = searchQuery.toLowerCase();
    const filtered = allDocs.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm) ||
      doc.category.toLowerCase().includes(searchTerm)
    );

    setResults(filtered.slice(0, 8)); // จำกัดผลลัพธ์ไม่เกิน 8 รายการ
  };

  // จัดการการพิมพ์ในช่องค้นหา
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchDocs(value);
    setSelectedIndex(-1);
    setIsOpen(true);
  };

  // จัดการการกดปุ่ม
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigateToDoc(results[selectedIndex]);
        } else if (results.length > 0) {
          navigateToDoc(results[0]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // นำทางไปยังเอกสาร
  const navigateToDoc = (doc) => {
    history.push(doc.path);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder={isLoading ? "Loading documents..." : "Search for documentation..."}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="search-input"
          disabled={isLoading}
        />
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="search-results">
          {results.map((doc, index) => (
            <div
              key={doc.path}
              className={clsx('search-result-item', {
                'selected': index === selectedIndex
              })}
              onClick={() => navigateToDoc(doc)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="result-title">{doc.title}</div>
              <div className="result-category">{doc.category}</div>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && query && results.length === 0 && !isLoading && (
        <div className="search-results">
          <div className="no-results">
            No results found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
} 