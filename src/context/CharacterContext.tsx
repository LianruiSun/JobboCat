import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import assetsData from '../assets/character-assets.json';

export interface UserCharacter {
  cat: string;
  catFolder: string; // Store the folder name to switch between 1.png and 2.png
  table: string;
  hat?: string;
  other?: string;
}

interface CharacterContextType {
  character: UserCharacter | null;
  setCharacter: (character: UserCharacter) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  getActiveCatPath: () => string;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [character, setCharacterState] = useState<UserCharacter | null>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('userCharacter');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isActive, setIsActive] = useState(false);

  // Preload both cat images (idle and active) to prevent flashing
  useEffect(() => {
    if (!character?.catFolder) return;

    const idlePath = character.catFolder;
    const activePath = character.catFolder.replace('1.png', '2.png');

    // Preload both images
    const idleImg = new Image();
    const activeImg = new Image();
    
    idleImg.src = idlePath;
    activeImg.src = activePath;
  }, [character?.catFolder]);

  // Save to localStorage whenever character changes
  useEffect(() => {
    if (character) {
      localStorage.setItem('userCharacter', JSON.stringify(character));
    }
  }, [character]);

  const setCharacter = (newCharacter: UserCharacter) => {
    setCharacterState(newCharacter);
  };

  // Get the active/inactive cat image path
  const getActiveCatPath = () => {
    if (!character) {
      // Default to first cat if no character selected
      const defaultCat = assetsData.cats[0];
      return defaultCat ? defaultCat.path : '';
    }
    
    const imageNum = isActive ? '2.png' : '1.png';
    return character.catFolder.replace('1.png', imageNum);
  };

  return (
    <CharacterContext.Provider value={{ character, setCharacter, isActive, setIsActive, getActiveCatPath }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
