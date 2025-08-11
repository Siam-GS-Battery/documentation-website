import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  currentLanguage: 'en',
  setCurrentLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language is English
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const value = {
    currentLanguage,
    setCurrentLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  // During SSR/SSG, return default values if context is not available
  if (typeof window === 'undefined' || !context) {
    return {
      currentLanguage: 'en',
      setCurrentLanguage: () => {},
    };
  }
  return context;
} 