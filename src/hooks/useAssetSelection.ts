import { useState } from 'react';
import type { CharacterAssets } from '../types/character';

/**
 * Custom hook to manage character asset selection
 * Handles the state for cat, hat, table, and other selections
 */
export function useAssetSelection(assets: CharacterAssets) {
  const [selectedCat, setSelectedCat] = useState(assets.cats[0]?.path || '');
  const [selectedHat, setSelectedHat] = useState('');
  const [selectedTable, setSelectedTable] = useState(assets.tables[0]?.path || '');
  const [selectedOther, setSelectedOther] = useState('');
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
