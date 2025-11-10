import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import ProtectedRoute from './components/common/ProtectedRoute';

// Component that uses both Auth and Navigation contexts
function AppRouter() {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

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

  return (
    <NavigationProvider>
      <OAuthHandler />
      <CharacterProvider>
        <div className="app">
          {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
          
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route
              path="/lobby"
              element={
                <ProtectedRoute>
                  <LobbyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile-setup"
              element={
                <ProtectedRoute>
                  <ProfileSetupPage />
                </ProtectedRoute>
              }
            />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      
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
            <a
              href="/"
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors text-center ${
                location.pathname === '/'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Welcome
            </a>
            <a
              href="/login"
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors text-center ${
                location.pathname === '/login'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Login
            </a>
            <a
              href="/lobby"
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors text-center ${
                location.pathname === '/lobby'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lobby
            </a>
            <a
              href="/about"
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors text-center ${
                location.pathname === '/about'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              About
            </a>
            <a
              href="/features"
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors text-center ${
                location.pathname === '/features'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Features
            </a>
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