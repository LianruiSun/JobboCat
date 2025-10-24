import { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import CharacterCreator from '../components/CharacterCreator';
import { useOnlineCount } from '../hooks/useOnlineCount';
import { useLanguage } from '../context/LanguageContext';

export default function WelcomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCharacterCreator, setShowCharacterCreator] = useState(false);
  const { onlineCount, loading } = useOnlineCount();
  const { t } = useLanguage();

  const categories = [
    { key: 'technology', label: t('welcome.field.technology') },
    { key: 'design', label: t('welcome.field.design') },
    { key: 'business', label: t('welcome.field.business') },
    { key: 'marketing', label: t('welcome.field.marketing') },
    { key: 'education', label: t('welcome.field.education') },
    { key: 'healthcare', label: t('welcome.field.healthcare') },
  ];

  const handleJoinClick = () => {
    setShowCharacterCreator(true);
  };

  const handleCharacterComplete = (character: { category: string; outfit: string }) => {
    console.log('Character created:', character);
    console.log('Selected field:', selectedCategory);
    // TODO: Navigate to lobby or save character data
    alert(`Welcome! Your ${character.category} cat with ${character.outfit} outfit is ready!`);
  };

  const handleBack = () => {
    setShowCharacterCreator(false);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />

      {/* Main Content - Conditional Rendering */}
      {!showCharacterCreator ? (
        <div className="relative z-10 max-w-2xl mx-auto text-center animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {loading ? (
              t('welcome.badge.loading')
            ) : onlineCount > 0 ? (
              `${onlineCount.toLocaleString()} ${onlineCount === 1 ? t('welcome.badge.person') : t('welcome.badge.looking')}`
            ) : (
              t('welcome.badge.first')
            )}
          </span>
        </div>

        {/* User Number Badge */}
        {!loading && onlineCount > 0 && (
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
            <span className="text-white font-bold">
              {t('welcome.badge.youare')}{onlineCount}
            </span>
          </div>
        )}

        {/* Special Message for First 10 Users */}
        {!loading && onlineCount > 0 && onlineCount <= 10 && (
          <div className="mb-6 mx-auto max-w-md px-6 py-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl shadow-lg animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🎉</span>
              <span className="text-lg font-bold text-amber-700">
                {t('welcome.early.title')}
              </span>
              <span className="text-2xl">🎉</span>
            </div>
            <p className="text-amber-600 font-medium text-sm">
              {t('welcome.early.message')}
            </p>
          </div>
        )}

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          {t('welcome.title')}
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
          {t('welcome.subtitle')}
        </p>

        {/* CTA Section */}
        <div className="max-w-md mx-auto space-y-4">
          {/* Category Selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-6 py-4 text-left shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <span className={selectedCategory ? "text-slate-900" : "text-slate-500"}>
                {selectedCategory || t('welcome.field.select')}
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 text-slate-400 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-10 animate-fade-in">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => {
                      setSelectedCategory(category.label);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left text-slate-700 hover:bg-emerald-50 transition-colors"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enter Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleJoinClick}
            className="shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('welcome.button.join')}
          </Button>
        </div>
      </div>
      ) : (
        <div className="relative z-10 w-full px-4">
          <CharacterCreator
            onComplete={handleCharacterComplete}
            onBack={handleBack}
          />
        </div>
      )}
      </div>
    </div>
  );
}