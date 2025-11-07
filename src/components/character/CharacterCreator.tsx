import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/ui/Button';
import CharacterPreview from './CharacterPreview';
import AssetSelector from './AssetSelector';
import AssetTabs from './AssetTabs';
import { useAssetSelection } from '../../hooks/useAssetSelection';
import assetsData from '../../assets/character-assets.json';
import type { CharacterAssets, CharacterSelection } from '../../types/character';

interface CharacterCreatorProps {
  onComplete: (character: CharacterSelection) => void;
  onBack: () => void;
  initialCharacter?: CharacterSelection | null;
}

/**
 * Character creator component - allows users to customize their cat avatar
 */
export default function CharacterCreator({ onComplete, onBack, initialCharacter }: CharacterCreatorProps) {
  const { t } = useLanguage();
  const assets = assetsData as CharacterAssets;

  const {
    selectedCat,
    selectedHat,
    selectedTable,
    selectedOther,
    activeTab,
    setSelectedCat,
    setSelectedHat,
    setSelectedTable,
    setSelectedOther,
    setActiveTab,
    isComplete,
    getSelectedData,
  } = useAssetSelection(assets, { initialCharacter });

  const { selectedCatData, selectedHatData, selectedTableData, selectedOtherData } =
    getSelectedData();

  const handleComplete = () => {
    if (selectedCat && selectedTable) {
      onComplete({
        cat: selectedCat,
        catFolder: selectedCat,
        hat: selectedHat,
        table: selectedTable,
        other: selectedOther,
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          {t('character.title')}
        </h2>
        <p className="text-slate-600 text-lg">{t('character.subtitle')}</p>
      </div>

      {/* Split Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Character Preview */}
        <CharacterPreview
          selectedCat={selectedCat}
          selectedHat={selectedHat}
          selectedTable={selectedTable}
          selectedOther={selectedOther}
          selectedCatData={selectedCatData}
          selectedHatData={selectedHatData}
          selectedTableData={selectedTableData}
          selectedOtherData={selectedOtherData}
          isComplete={isComplete}
        />

        {/* Right Side - Selection Options */}
        <div>
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
            {/* Tabs */}
            <AssetTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedCatData={selectedCatData}
              selectedHatData={selectedHatData}
              selectedTableData={selectedTableData}
              selectedOtherData={selectedOtherData}
            />

            {/* Tab Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {activeTab === 'cats' && (
                <AssetSelector
                  assets={assets.cats}
                  selectedPath={selectedCat}
                  onSelect={setSelectedCat}
                />
              )}

              {activeTab === 'hats' && (
                <AssetSelector
                  assets={assets.hats}
                  selectedPath={selectedHat}
                  onSelect={setSelectedHat}
                />
              )}

              {activeTab === 'tables' && (
                <AssetSelector
                  assets={assets.tables}
                  selectedPath={selectedTable}
                  onSelect={setSelectedTable}
                />
              )}

              {activeTab === 'others' && (
                <AssetSelector
                  assets={assets.others}
                  selectedPath={selectedOther}
                  onSelect={setSelectedOther}
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <Button variant="secondary" size="lg" onClick={onBack} className="flex-1">
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
