import React from 'react';
import Navbar from '@theme-original/Navbar';
import SearchBox from '@site/src/components/SearchBox';
import { useLocation } from '@docusaurus/router';

export default function NavbarWrapper(props) {
  const location = useLocation();
  
  return (
    <>
      <Navbar {...props} />
      <div style={{ position: 'absolute', right: 24, top: 0, height: '100%', display: 'flex', alignItems: 'center', gap: '16px' }}>
        {location.pathname !== '/create-document' && (
          <a 
            href="/create-document" 
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Create Document
          </a>
        )}
        {location.pathname !== '/documents' && (
          <a 
            href="/documents" 
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            My Documents
          </a>
        )}
        <SearchBox />
      </div>
    </>
  );
} 