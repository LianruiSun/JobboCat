import { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import LobbyPage from './pages/LobbyPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import ProfilePage from './pages/ProfilePage';
import { IntroAnimation } from './components/animations';
import { NavigationProvider } from './context/NavigationContext';
import { AuthProvider } from './context/AuthContext';
import { CharacterProvider } from './context/CharacterContext';
import { useOAuthRedirectHandler } from './hooks/useOAuthRedirectHandler';

// Simple routing - you can replace this with React Router later
type PageType = 'welcome' | 'login' | 'lobby' | 'about' | 'features' | 'profile-setup' | 'profile';

// Component that uses both Auth and Navigation contexts
function AppRouter() {
  const [currentPage, setCurrentPage] = useState<PageType>('welcome');
  const [showIntro, setShowIntro] = useState(true);

  // Check if user has seen the intro before
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  // You can pass this function to child components to navigate
  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage />;
      case 'login':
        return <LoginPage />;
      case 'lobby':
        return <LobbyPage />;
      case 'about':
        return <AboutPage />;
      case 'features':
        return <FeaturesPage />;
      case 'profile-setup':
        return <ProfileSetupPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <NavigationProvider currentPage={currentPage} navigateTo={navigateTo}>
      <OAuthHandler />
      <CharacterProvider>
        <div className="app">
          {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
          {renderPage()}
      
      {/* Navigation buttons for development/testing */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-2 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
        <p className="text-xs font-semibold text-slate-600 mb-2">Dev Navigation:</p>
        <button
          onClick={() => {
            localStorage.removeItem('hasSeenIntro');
            window.location.reload();
          }}
          className="px-3 py-1.5 text-xs rounded-lg transition-colors bg-purple-500 text-white hover:bg-purple-600 mb-2"
        >
          Reset Intro
        </button>
        <button
          onClick={() => navigateTo('welcome')}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
            currentPage === 'welcome'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Welcome
        </button>
        <button
          onClick={() => navigateTo('login')}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
            currentPage === 'login'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => navigateTo('lobby')}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
            currentPage === 'lobby'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Lobby
        </button>
        <button
          onClick={() => navigateTo('about')}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
            currentPage === 'about'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          About
        </button>
        <button
          onClick={() => navigateTo('features')}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
            currentPage === 'features'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Features
        </button>
      </div>
        </div>
      </CharacterProvider>
    </NavigationProvider>
  );
}

// Small component that just handles OAuth redirects
function OAuthHandler() {
  useOAuthRedirectHandler();
  return null;
}

// Wrapper component that provides AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;