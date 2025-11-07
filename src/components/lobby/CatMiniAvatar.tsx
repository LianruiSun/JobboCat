import React from 'react';
import type { CharacterParts } from '../../types/character';

interface CatMiniAvatarProps {
  char: CharacterParts;
  size?: number; // pixel size of square container (default 64)
  className?: string;
}

export default function CatMiniAvatar({ char, size = 64, className }: CatMiniAvatarProps) {
  const style: React.CSSProperties = { width: size, height: size };
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-white border border-slate-200 ${className || ''}`}
      style={style}
    >
      {char.table && (
        <img src={char.table} alt="table" className="absolute inset-0 w-full h-full object-contain" />
      )}
      {char.cat && (
        <img src={char.cat} alt="cat" className="absolute inset-0 w-full h-full object-contain" />
      )}
      {char.hat && (
        <img src={char.hat} alt="hat" className="absolute inset-0 w-full h-full object-contain" />
      )}
      {char.other && (
        <img src={char.other} alt="other" className="absolute inset-0 w-full h-full object-contain" />
      )}
    </div>
  );
}
