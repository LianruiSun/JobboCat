import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';
import assetsData from '../assets/character-assets.json';

interface Asset {
  id: string;
  name: string;
  path: string;
  animationPath?: string;
}

interface CharacterCreatorProps {
  onComplete: (character: { cat: string; hat: string; table: string; other: string }) => void;
  onBack: () => void;
}

export default function CharacterCreator({ onComplete, onBack }: CharacterCreatorProps) {
  // Load assets from JSON file
  const assets = assetsData as {
    cats: (Asset & { animationPath?: string })[];
    hats: Asset[];
    tables: Asset[];
    others: Asset[];
  };

  // Use first elements from JSON as defaults
  const [selectedCat, setSelectedCat] = useState(assets.cats[0]?.path || '');
  const [selectedHat, setSelectedHat] = useState('');
  const [selectedTable, setSelectedTable] = useState(assets.tables[0]?.path || '');
  const [selectedOther, setSelectedOther] = useState('');
  const [activeTab, setActiveTab] = useState<'cats' | 'hats' | 'tables' | 'others'>('cats');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  // Redraw canvas whenever selections change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 1000, 1000);

    // Load and draw images in order: table -> cat -> hat -> other
    const imagesToLoad = [
      { path: selectedTable, order: 1 },
      { path: selectedCat, order: 2 },
      { path: selectedHat, order: 3 },
      { path: selectedOther, order: 4 },
    ].filter(item => item.path); // Only load selected images

    imagesToLoad.forEach(({ path }) => {
      if (path) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 1000, 1000);
        };
        img.src = path;
      }
    });
  }, [selectedCat, selectedHat, selectedTable, selectedOther]);

  const handleComplete = () => {
    if (selectedCat && selectedTable) {
      onComplete({ 
        cat: selectedCat, 
        hat: selectedHat,
        table: selectedTable,
        other: selectedOther 
      });
    }
  };

  const isComplete = !!selectedCat && !!selectedTable; // Cat and table are required
  const selectedTableData = assets.tables.find(table => table.path === selectedTable);
  const selectedCatData = assets.cats.find(cat => cat.path === selectedCat);
  const selectedHatData = assets.hats.find(hat => hat.path === selectedHat);
  const selectedOtherData = assets.others.find(other => other.path === selectedOther);

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
            
            {/* Character Display - Canvas Preview */}
            <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-center">
              {selectedCat ? (
                <canvas 
                  ref={canvasRef} 
                  width={1000} 
                  height={1000}
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxHeight: '400px' }}
                />
              ) : (
                <div className="text-center text-slate-400 py-20">
                  <div className="text-6xl mb-4">🐱</div>
                  <p className="text-lg">{t('character.preview.placeholder')}</p>
                </div>
              )}
            </div>

            {/* Selection Summary */}
            <div className="space-y-3">
              <div className={`
                flex items-center justify-between p-4 rounded-lg transition-colors
                ${selectedCatData ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}
              `}>
                <span className="font-medium">Cat</span>
                <span className="font-bold">
                  {selectedCatData ? selectedCatData.name : t('character.notselected')}
                </span>
              </div>
              <div className={`
                flex items-center justify-between p-4 rounded-lg transition-colors
                ${selectedHatData && selectedHatData.path ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}
              `}>
                <span className="font-medium">Hat</span>
                <span className="font-bold">
                  {selectedHatData && selectedHatData.path ? selectedHatData.name : t('character.notselected')}
                </span>
              </div>
              <div className={`
                flex items-center justify-between p-4 rounded-lg transition-colors
                ${selectedTableData && selectedTableData.path ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}
              `}>
                <span className="font-medium">Table</span>
                <span className="font-bold">
                  {selectedTableData && selectedTableData.path ? selectedTableData.name : t('character.notselected')}
                </span>
              </div>
              <div className={`
                flex items-center justify-between p-4 rounded-lg transition-colors
                ${selectedOtherData && selectedOtherData.path ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}
              `}>
                <span className="font-medium">Accessory</span>
                <span className="font-bold">
                  {selectedOtherData && selectedOtherData.path ? selectedOtherData.name : t('character.notselected')}
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
            {/* Tabs - 4 categories */}
            <div className="flex border-b border-slate-200">
              {(['cats', 'hats', 'tables', 'others'] as const).map((tab) => {
                const icons = { cats: '🐱', hats: '🎓', tables: '🪑', others: '📄' };
                const labels = { cats: 'Cats', hats: 'Hats', tables: 'Tables', others: 'Others' };
                const selected = {
                  cats: selectedCatData,
                  hats: selectedHatData && selectedHatData.path,
                  tables: selectedTableData && selectedTableData.path,
                  others: selectedOtherData && selectedOtherData.path,
                };
                
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      flex-1 py-3 px-2 font-semibold text-sm md:text-base transition-all relative
                      ${activeTab === tab 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                      }
                    `}
                  >
                    <span className="flex items-center justify-center gap-1">
                      <span>{icons[tab]}</span>
                      <span className="hidden sm:inline">{labels[tab]}</span>
                      {selected[tab] && (
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-xs">
                          ✓
                        </span>
                      )}
                    </span>
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {activeTab === 'cats' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {assets.cats.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.path)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all duration-300
                        ${
                          selectedCat === cat.path
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="text-center">
                        <img 
                          src={cat.path} 
                          alt={cat.name}
                          className="w-full h-32 object-contain mb-2"
                        />
                        <div className="font-semibold text-slate-900 text-sm">{cat.name}</div>
                      </div>
                      {selectedCat === cat.path && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-emerald-500 rounded-full p-1">
                            <svg
                              className="w-4 h-4 text-white"
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
              
              {activeTab === 'hats' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {assets.hats.map((hat) => (
                    <button
                      key={hat.id}
                      onClick={() => setSelectedHat(hat.path)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all duration-300
                        ${
                          selectedHat === hat.path
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="text-center">
                        {hat.path ? (
                          <img 
                            src={hat.path} 
                            alt={hat.name}
                            className="w-full h-32 object-contain mb-2"
                          />
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center text-4xl text-slate-300 mb-2">
                            ∅
                          </div>
                        )}
                        <div className="font-semibold text-slate-900 text-sm">{hat.name}</div>
                      </div>
                      {selectedHat === hat.path && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-emerald-500 rounded-full p-1">
                            <svg
                              className="w-4 h-4 text-white"
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
              
              {activeTab === 'tables' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {assets.tables.map((table) => (
                    <button
                      key={table.id}
                      onClick={() => setSelectedTable(table.path)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all duration-300
                        ${
                          selectedTable === table.path
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="text-center">
                        {table.path ? (
                          <img 
                            src={table.path} 
                            alt={table.name}
                            className="w-full h-32 object-contain mb-2"
                          />
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center text-4xl text-slate-300 mb-2">
                            ∅
                          </div>
                        )}
                        <div className="font-semibold text-slate-900 text-sm">{table.name}</div>
                      </div>
                      {selectedTable === table.path && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-emerald-500 rounded-full p-1">
                            <svg
                              className="w-4 h-4 text-white"
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
              
              {activeTab === 'others' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {assets.others.map((other) => (
                    <button
                      key={other.id}
                      onClick={() => setSelectedOther(other.path)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all duration-300
                        ${
                          selectedOther === other.path
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="text-center">
                        {other.path ? (
                          <img 
                            src={other.path} 
                            alt={other.name}
                            className="w-full h-32 object-contain mb-2"
                          />
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center text-4xl text-slate-300 mb-2">
                            ∅
                          </div>
                        )}
                        <div className="font-semibold text-slate-900 text-sm">{other.name}</div>
                      </div>
                      {selectedOther === other.path && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-emerald-500 rounded-full p-1">
                            <svg
                              className="w-4 h-4 text-white"
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
