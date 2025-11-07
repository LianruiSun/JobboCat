import type { Asset } from '../../types/character';

type TabType = 'cats' | 'hats' | 'tables' | 'others';

interface AssetTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  selectedCatData?: Asset;
  selectedHatData?: Asset;
  selectedTableData?: Asset;
  selectedOtherData?: Asset;
}

/**
 * Tab navigation for asset selection
 */
export default function AssetTabs({
  activeTab,
  onTabChange,
  selectedCatData,
  selectedHatData,
  selectedTableData,
  selectedOtherData,
}: AssetTabsProps) {
  const tabs: { key: TabType; icon: string; label: string }[] = [
    { key: 'cats', icon: '🐱', label: 'Cats' },
    { key: 'hats', icon: '🎓', label: 'Hats' },
    { key: 'tables', icon: '🪑', label: 'Tables' },
    { key: 'others', icon: '📄', label: 'Others' },
  ];

  const selected = {
    cats: selectedCatData,
    hats: selectedHatData && selectedHatData.path,
    tables: selectedTableData && selectedTableData.path,
    others: selectedOtherData && selectedOtherData.path,
  };

  return (
    <div className="flex border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`
            flex-1 py-3 px-2 font-semibold text-sm md:text-base transition-all relative
            ${
              activeTab === tab.key
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }
          `}
        >
          <span className="flex items-center justify-center gap-1">
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            {selected[tab.key] && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-xs">
                ✓
              </span>
            )}
          </span>
          {activeTab === tab.key && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
          )}
        </button>
      ))}
    </div>
  );
}
