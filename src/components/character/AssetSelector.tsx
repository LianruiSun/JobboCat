import type { Asset } from '../../types/character';

interface AssetSelectorProps {
  assets: Asset[];
  selectedPath: string;
  onSelect: (path: string) => void;
  emptyIcon?: string;
}

/**
 * Reusable component for selecting assets (cats, hats, tables, others)
 */
export default function AssetSelector({
  assets,
  selectedPath,
  onSelect,
  emptyIcon = '∅',
}: AssetSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 animate-fade-in">
      {assets.map((asset) => (
        <button
          key={asset.id}
          onClick={() => onSelect(asset.path)}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-300
            ${
              selectedPath === asset.path
                ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
            }
          `}
        >
          <div className="text-center">
            {asset.path ? (
              <img
                src={asset.path}
                alt={asset.name}
                className="w-full h-32 object-contain mb-2"
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center text-4xl text-slate-300 mb-2">
                {emptyIcon}
              </div>
            )}
            <div className="font-semibold text-slate-900 text-sm">{asset.name}</div>
          </div>
          {selectedPath === asset.path && (
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
  );
}
