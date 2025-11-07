import { useLanguage } from '../../context/LanguageContext';
import { CatCanvasAvatar } from '../lobby';
import type { Asset } from '../../types/character';

interface CharacterPreviewProps {
  selectedCat: string;
  selectedHat: string;
  selectedTable: string;
  selectedOther: string;
  selectedCatData?: Asset;
  selectedHatData?: Asset;
  selectedTableData?: Asset;
  selectedOtherData?: Asset;
  isComplete: boolean;
}

/**
 * Displays the character preview with canvas and selection summary
 */
export default function CharacterPreview({
  selectedCat,
  selectedHat,
  selectedTable,
  selectedOther,
  selectedCatData,
  selectedHatData,
  selectedTableData,
  selectedOtherData,
  isComplete,
}: CharacterPreviewProps) {
  const { t } = useLanguage();

  return (
    <div className="lg:sticky lg:top-8 h-fit">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 shadow-xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          {t('character.preview')}
        </h3>

        {/* Character Display - Canvas Preview */}
        <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-center">
          {selectedCat ? (
            <CatCanvasAvatar
              character={{
                cat: selectedCat,
                table: selectedTable,
                hat: selectedHat,
                other: selectedOther,
              }}
              className="max-w-full h-auto rounded-lg"
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
          <SelectionItem
            label="Cat"
            selected={!!selectedCatData}
            name={selectedCatData?.name}
            t={t}
          />
          <SelectionItem
            label="Hat"
            selected={!!(selectedHatData && selectedHatData.path)}
            name={selectedHatData?.name}
            t={t}
          />
          <SelectionItem
            label="Table"
            selected={!!(selectedTableData && selectedTableData.path)}
            name={selectedTableData?.name}
            t={t}
          />
          <SelectionItem
            label="Accessory"
            selected={!!(selectedOtherData && selectedOtherData.path)}
            name={selectedOtherData?.name}
            t={t}
          />
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
  );
}

// Helper component for selection items
function SelectionItem({ label, selected, name, t }: { label: string; selected: boolean; name?: string; t: any }) {
  return (
    <div
      className={`
        flex items-center justify-between p-4 rounded-lg transition-colors
        ${selected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}
      `}
    >
      <span className="font-medium">{label}</span>
      <span className="font-bold">
        {name || t('character.notselected')}
      </span>
    </div>
  );
}
