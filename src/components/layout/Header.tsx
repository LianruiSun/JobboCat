import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../common/ui/LanguageSelector';

export default function Header() {
  const { navigateTo } = useNavigation();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const handleHomeClick = () => {
    navigateTo('welcome');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo - Clickable to navigate home */}
        <button 
          onClick={handleHomeClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Jobbo Cat
          </span>
        </button>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* Main Navigation Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('about')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('header.about')}
            </button>
            <button
              onClick={() => navigateTo('features')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('header.features')}
            </button>
            
            {user && (
              <>
                <button
                  onClick={() => navigateTo('lobby')}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t('header.lobby')}
                </button>
                <button
                  onClick={() => navigateTo('profile')}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t('header.profile')}
                </button>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-300"></div>
          
          {/* Right Section: Language + Auth */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            {user ? (
              <>
                <span className="text-sm text-slate-600 max-w-[150px] truncate">
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:shadow-lg transition-all hover:scale-105"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                {t('header.login')}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile menu - includes auth buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector />
          {user ? (
            <button
              onClick={signOut}
              className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:shadow-lg transition-all"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => navigateTo('login')}
              className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:shadow-lg transition-all"
            >
              {t('header.login')}
            </button>
          )}
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}