import { Header } from '../components/layout';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Mission Section */}
          <div className="card p-8 mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('about.mission.title')}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {t('about.mission.p1')}{' '}
              <span className="font-semibold text-emerald-600">{t('about.mission.highlight')}</span>{' '}
              {t('about.mission.p2')}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('about.mission.p3')}
            </p>
          </div>

          {/* Creator Section */}
          <div className="card p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('about.creator.title')}</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Image Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  LS
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('about.creator.name')}</h3>
                <p className="text-emerald-600 font-medium mb-4">{t('about.creator.role')}</p>
                
                <div className="space-y-4 text-slate-600">
                  <p>
                    {t('about.creator.bio')}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold min-w-[120px]">{t('about.creator.education')}</span>
                      <span>{t('about.creator.education.value')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold min-w-[120px]">{t('about.creator.skills')}</span>
                      <span>{t('about.creator.skills.value')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold min-w-[120px]">{t('about.creator.experience')}</span>
                      <span>{t('about.creator.experience.value')}</span>
                    </div>
                  </div>

                  <p className="italic text-slate-500 border-l-4 border-emerald-500 pl-4 mt-6">
                    {t('about.creator.quote')}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://github.com/LianruiSun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lianrui-sun-5638392b4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://lianruisun.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Portfolio
                  </a>
                  <a
                    href="mailto:lianruisun1020@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('about.values.community.title')}</h3>
              <p className="text-slate-600">{t('about.values.community.desc')}</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('about.values.transparency.title')}</h3>
              <p className="text-slate-600">{t('about.values.transparency.desc')}</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('about.values.empowerment.title')}</h3>
              <p className="text-slate-600">{t('about.values.empowerment.desc')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}