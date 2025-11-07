import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { loadTranslations, type Translations } from '../locales';

export type Language = 'en' | 'es' | 'ja' | 'ko' | 'zh-CN' | 'zh-TW';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Get language from localStorage or browser preference
const getInitialLanguage = (): Language => {
  // Check localStorage first
  const stored = localStorage.getItem('language') as Language | null;
  if (stored && ['en', 'es', 'ja', 'ko', 'zh-CN', 'zh-TW'].includes(stored)) {
    return stored;
  }

  // Fall back to browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang === 'zh-cn' || browserLang.startsWith('zh-hans')) return 'zh-CN';
  if (browserLang === 'zh-tw' || browserLang === 'zh-hk' || browserLang.startsWith('zh-hant')) return 'zh-TW';
  
  return 'en'; // Default to English
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations when language changes
  useEffect(() => {
    let cancelled = false;
    
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const newTranslations = await loadTranslations(language);
        if (!cancelled) {
          setTranslations(newTranslations);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchTranslations();

    return () => {
      cancelled = true;
    };
  }, [language]);

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ language, setLanguage, t, isLoading }),
    [language, translations, isLoading]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
