import { Header } from '../components/layout';
import { useLanguage } from '../context/LanguageContext';

export default function FeaturesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              {t('features.title')}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Live Visitor Count */}
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 mb-4 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.live.title')}</h3>
              <p className="text-slate-600">{t('features.live.desc')}</p>
            </div>

            {/* Secure Authentication */}
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 mb-4 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.auth.title')}</h3>
              <p className="text-slate-600">{t('features.auth.desc')}</p>
            </div>

            {/* Character Customization */}
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 mb-4 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.character.title')}</h3>
              <p className="text-slate-600">{t('features.character.desc')}</p>
            </div>

            {/* Personal Profiles */}
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 mb-4 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <polyline points="17 11 19 13 23 9"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.profile.title')}</h3>
              <p className="text-slate-600">{t('features.profile.desc')}</p>
            </div>

            {/* Focus Sessions */}
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 mb-4 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.focus.title')}</h3>
              <p className="text-slate-600">{t('features.focus.desc')}</p>
            </div>

            {/* Community Support */}
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 mb-4 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.community.title')}</h3>
              <p className="text-slate-600">{t('features.community.desc')}</p>
            </div>

            {/* Multi-language Support */}
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 mb-4 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.multilang.title')}</h3>
              <p className="text-slate-600">{t('features.multilang.desc')}</p>
            </div>

            {/* Fully Responsive */}
            <div className="card p-6 hover:shadow-xl transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 mb-4 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.responsive.title')}</h3>
              <p className="text-slate-600">{t('features.responsive.desc')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
