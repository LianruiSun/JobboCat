/**
 * Shared types for character customization and display
 */

export interface Asset {
  id: string;
  name: string;
  path: string;
  animationPath?: string;
}

export interface CharacterParts {
  cat: string;
  table: string;
  hat?: string;
  other?: string;
}

export interface CharacterAssets {
  cats: (Asset & { animationPath?: string })[];
  hats: Asset[];
  tables: Asset[];
  others: Asset[];
}

export interface CharacterSelection extends CharacterParts {
  catFolder: string; // Track the folder for switching between animation frames
  hat: string; // Make hat required for selection
  table: string; // Already required via CharacterParts
  other: string; // Make other required for selection
}
