import { createContext, useContext } from 'react';
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
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
}

export function NavigationProvider({ children, currentPage, navigateTo }: NavigationProviderProps) {
  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}
