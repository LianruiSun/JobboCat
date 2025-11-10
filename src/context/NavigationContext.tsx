import { createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

type PageType = 'welcome' | 'login' | 'lobby' | 'about' | 'features' | 'profile-setup' | 'profile';

interface NavigationContextType {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

interface NavigationProviderProps {
  children: ReactNode;
}

// Map page types to URL paths
const pageToPath: Record<PageType, string> = {
  welcome: '/',
  login: '/login',
  lobby: '/lobby',
  about: '/about',
  features: '/features',
  'profile-setup': '/profile-setup',
  profile: '/profile',
};

// Map URL paths to page types
const pathToPage: Record<string, PageType> = {
  '/': 'welcome',
  '/login': 'login',
  '/lobby': 'lobby',
  '/about': 'about',
  '/features': 'features',
  '/profile-setup': 'profile-setup',
  '/profile': 'profile',
};

export function NavigationProvider({ children }: NavigationProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page from URL
  const currentPage = pathToPage[location.pathname] || 'welcome';

  // Navigate to a page using React Router
  const navigateTo = (page: PageType) => {
    const path = pageToPath[page];
    navigate(path);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}
