import { useState } from 'react';
import type { CharacterAssets, CharacterSelection } from '../types/character';

interface UseAssetSelectionOptions {
  initialCharacter?: CharacterSelection | null;
}

/**
 * Custom hook to manage character asset selection
 * Handles the state for cat, hat, table, and other selections
 */
export function useAssetSelection(assets: CharacterAssets, options?: UseAssetSelectionOptions) {
  const { initialCharacter } = options || {};
  
  const [selectedCat, setSelectedCat] = useState(
    initialCharacter?.cat || assets.cats[0]?.path || ''
  );
  const [selectedHat, setSelectedHat] = useState(
    initialCharacter?.hat || ''
  );
  const [selectedTable, setSelectedTable] = useState(
    initialCharacter?.table || assets.tables[0]?.path || ''
  );
  const [selectedOther, setSelectedOther] = useState(
    initialCharacter?.other || ''
  );
  const [activeTab, setActiveTab] = useState<'cats' | 'hats' | 'tables' | 'others'>('cats');

  const isComplete = !!selectedCat && !!selectedTable;

  const getSelectedData = () => ({
    selectedCatData: assets.cats.find(cat => cat.path === selectedCat),
    selectedHatData: assets.hats.find(hat => hat.path === selectedHat),
    selectedTableData: assets.tables.find(table => table.path === selectedTable),
    selectedOtherData: assets.others.find(other => other.path === selectedOther),
  });

  return {
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
  };
}
