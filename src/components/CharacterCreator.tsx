import { useState } from 'react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

interface CharacterCreatorProps {
  onComplete: (character: { category: string; outfit: string }) => void;
  onBack: () => void;
}

export default function CharacterCreator({ onComplete, onBack }: CharacterCreatorProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOutfit, setSelectedOutfit] = useState('');
  const [activeTab, setActiveTab] = useState<'cat' | 'outfit'>('cat');
  const { t } = useLanguage();

  const catCategories = [
    { id: 'tabby', name: t('cat.tabby'), emoji: '🐱', color: 'from-orange-400 to-amber-500' },
    { id: 'tuxedo', name: t('cat.tuxedo'), emoji: '🐈‍⬛', color: 'from-gray-700 to-gray-900' },
    { id: 'calico', name: t('cat.calico'), emoji: '😺', color: 'from-orange-300 to-pink-400' },
    { id: 'siamese', name: t('cat.siamese'), emoji: '😸', color: 'from-blue-200 to-gray-300' },
    { id: 'ginger', name: t('cat.ginger'), emoji: '🧡', color: 'from-orange-500 to-red-400' },
    { id: 'white', name: t('cat.white'), emoji: '😻', color: 'from-gray-50 to-gray-200' },
  ];

  const outfits = [
    { id: 'casual', name: t('outfit.casual'), emoji: '👕', description: t('outfit.casual.desc') },
    { id: 'business', name: t('outfit.business'), emoji: '👔', description: t('outfit.business.desc') },
    { id: 'creative', name: t('outfit.creative'), emoji: '🎨', description: t('outfit.creative.desc') },
    { id: 'sporty', name: t('outfit.sporty'), emoji: '⚽', description: t('outfit.sporty.desc') },
    { id: 'formal', name: t('outfit.formal'), emoji: '🎩', description: t('outfit.formal.desc') },
    { id: 'tech', name: t('outfit.tech'), emoji: '💻', description: t('outfit.tech.desc') },
  ];

  const handleComplete = () => {
    if (selectedCategory && selectedOutfit) {
      onComplete({ category: selectedCategory, outfit: selectedOutfit });
    }
  };

  const isComplete = selectedCategory && selectedOutfit;
  const selectedCat = catCategories.find(cat => cat.id === selectedCategory);
  const selectedOutfitData = outfits.find(outfit => outfit.id === selectedOutfit);

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          {t('character.title')}
        </h2>
        <p className="text-slate-600 text-lg">
          {t('character.subtitle')}
        </p>
      </div>

      {/* Split Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Character Preview */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              {t('character.preview')}
            </h3>
            
            {/* Character Display */}
            <div className="bg-white rounded-xl p-8 mb-6 min-h-[300px] flex flex-col items-center justify-center">
              {selectedCat ? (
                <div className="text-center animate-fade-in">
                  <div className={`
                    inline-block p-8 rounded-full mb-4
                    bg-gradient-to-br ${selectedCat.color}
                    transform transition-all duration-300 hover:scale-110
                  `}>
                    <span className="text-8xl">{selectedCat.emoji}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">
                    {selectedCat.name}
                  </h4>
                  {selectedOutfitData && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="text-5xl mb-2">{selectedOutfitData.emoji}</div>
                      <p className="text-lg font-semibold text-slate-700">
                        {selectedOutfitData.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {selectedOutfitData.description}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <div className="text-6xl mb-4">❓</div>
                  <p className="text-lg">{t('character.preview.placeholder')}</p>
                </div>
              )}
            </div>

            {/* Selection Summary */}
            <div className="space-y-3">
              <div className={`
                flex items-center justify-between p-4 rounded-lg transition-colors
                ${selectedCat ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}
              `}>
                <span className="font-medium">{t('character.cat.type')}</span>
                <span className="font-bold">
                  {selectedCat ? selectedCat.name : t('character.notselected')}
                </span>
              </div>
              <div className={`
                flex items-center justify-between p-4 rounded-lg transition-colors
                ${selectedOutfitData ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}
              `}>
                <span className="font-medium">{t('character.outfit')}</span>
                <span className="font-bold">
                  {selectedOutfitData ? selectedOutfitData.name : t('character.notselected')}
                </span>
              </div>
            </div>

            {/* Progress Indicator */}
            {isComplete && (
              <div className="mt-6 text-center animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-bold">{t('character.complete')}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Selection Options */}
        <div>
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab('cat')}
                className={`
                  flex-1 py-4 px-6 font-semibold text-lg transition-all relative
                  ${activeTab === 'cat' 
                    ? 'text-emerald-600 bg-emerald-50' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>🐱</span>
                  <span>{t('character.cat.type')}</span>
                  {selectedCat && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-xs">
                      ✓
                    </span>
                  )}
                </span>
                {activeTab === 'cat' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('outfit')}
                className={`
                  flex-1 py-4 px-6 font-semibold text-lg transition-all relative
                  ${activeTab === 'outfit' 
                    ? 'text-emerald-600 bg-emerald-50' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>👔</span>
                  <span>{t('character.outfit')}</span>
                  {selectedOutfitData && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-xs">
                      ✓
                    </span>
                  )}
                </span>
                {activeTab === 'outfit' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {activeTab === 'cat' ? (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {catCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`
                        relative p-6 rounded-xl border-2 transition-all duration-300
                        ${
                          selectedCategory === cat.id
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="text-center">
                        <div className={`
                          text-5xl mb-3 inline-block p-4 rounded-full
                          bg-gradient-to-br ${cat.color}
                        `}>
                          {cat.emoji}
                        </div>
                        <div className="font-semibold text-slate-900">{cat.name}</div>
                      </div>
                      {selectedCategory === cat.id && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-emerald-500 rounded-full p-1">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {outfits.map((outfit) => (
                    <button
                      key={outfit.id}
                      onClick={() => setSelectedOutfit(outfit.id)}
                      className={`
                        relative p-6 rounded-xl border-2 transition-all duration-300
                        ${
                          selectedOutfit === outfit.id
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">{outfit.emoji}</div>
                        <div className="font-semibold text-slate-900 mb-1">{outfit.name}</div>
                        <div className="text-sm text-slate-500">{outfit.description}</div>
                      </div>
                      {selectedOutfit === outfit.id && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-emerald-500 rounded-full p-1">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={onBack}
              className="flex-1"
            >
              {t('character.button.back')}
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleComplete}
              disabled={!isComplete}
              className={`
                flex-1 shadow-lg
                ${
                  isComplete
                    ? 'shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300'
                    : 'opacity-50 cursor-not-allowed'
                }
              `}
            >
              {t('character.button.join')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
