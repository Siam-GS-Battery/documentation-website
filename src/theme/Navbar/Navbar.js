import React from 'react';
import Navbar from '@theme-original/Navbar';
import SearchBox from '@site/src/components/SearchBox';

export default function NavbarWrapper(props) {
  return (
    <>
      <Navbar {...props} />
      <div style={{ position: 'absolute', right: 24, top: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
        <SearchBox />
      </div>
    </>
  );
} 