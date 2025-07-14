import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from '@docusaurus/router';
import clsx from 'clsx';
import './SearchBox.css';

// ข้อมูลเอกสารทั้งหมดในเว็บไซต์
const allDocs = [
  // Tutorial Sidebar
  { title: 'Welcome', path: '/docs/intro', category: 'Documentation' },
  { title: 'Create a Document', path: '/docs/tutorial-basics/create-a-document', category: 'Documentation > Tutorial Basics' },
  { title: 'Create a Blog Post', path: '/docs/tutorial-basics/create-a-blog-post', category: 'Documentation > Tutorial Basics' },
  { title: 'Markdown Features', path: '/docs/tutorial-basics/markdown-features', category: 'Documentation > Tutorial Basics' },
  { title: 'Deploy your site', path: '/docs/tutorial-basics/deploy-your-site', category: 'Documentation > Tutorial Basics' },
  { title: 'Create a Page', path: '/docs/tutorial-basics/create-a-page', category: 'Documentation > Tutorial Basics' },
  { title: 'Congratulations', path: '/docs/tutorial-basics/congratulations', category: 'Documentation > Tutorial Basics' },
  { title: 'Manage Docs Versions', path: '/docs/tutorial-extras/manage-docs-versions', category: 'Documentation > Tutorial Extras' },
  { title: 'Translate your site', path: '/docs/tutorial-extras/translate-your-site', category: 'Documentation > Tutorial Extras' },
  
  // IT Management Sidebar
  { title: 'IT Management Introduction', path: '/docs/Itmanagement/intro', category: 'IT Management' },
  { title: 'How to use Asana', path: '/docs/Itmanagement/HowtouseAsana', category: 'IT Management > Projects' },
  
  // IT Development Sidebar
  { title: 'IT Development Introduction', path: '/docs/Itdevelopment/intro', category: 'IT Development' },
  { title: 'Project Test', path: '/docs/Itdevelopment/Projecttest', category: 'IT Development > Projects > Software Development Project' },
  
  // Data Management Sidebar
  { title: 'Data Management Introduction', path: '/docs/Datamanagement/intro', category: 'Data Management' },
  { title: 'Project Test', path: '/docs/Datamanagement/projecttest', category: 'Data Management > Projects > Customer Data Platform' },
];

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const history = useHistory();

  // ค้นหาเอกสาร
  const searchDocs = (searchQuery) => {
    if (!searchQuery.trim()) {
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
          placeholder="Search for documentation..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="search-input"
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
      
      {isOpen && query && results.length === 0 && (
        <div className="search-results">
          <div className="no-results">
            No results found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
} 