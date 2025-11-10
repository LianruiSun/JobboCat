import { useEffect, useRef, useState } from 'react';
import type { CharacterParts } from '../../types/character';

interface CatCanvasAvatarProps {
  character: CharacterParts;
  width?: number; // canvas px width (default 1000)
  height?: number; // canvas px height (default 1000)
  className?: string;
  showLoadingIndicator?: boolean; // show loading spinner while images load
}

export default function CatCanvasAvatar({ 
  character, 
  width = 1000, 
  height = 1000, 
  className,
  showLoadingIndicator = true 
}: CatCanvasAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    setImagesLoaded(false); // Reset loading state when character changes
    const parts = [character.table, character.cat, character.hat, character.other].filter(Boolean) as string[];
    
    let loadedCount = 0;
    const totalImages = parts.length;

    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    parts.forEach((src) => {
      // Check if already cached
      if (imageCache.current.has(src)) {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
        return;
      }

      const img = new Image();
      img.onload = () => {
        imageCache.current.set(src, img);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, [character.table, character.cat, character.hat, character.other]);

  // Draw on canvas using cached images
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    const parts = [character.table, character.cat, character.hat, character.other].filter(Boolean) as string[];
    
    parts.forEach((src) => {
      const img = imageCache.current.get(src);
      if (img && img.complete) {
        ctx.drawImage(img, 0, 0, width, height);
      }
    });
  }, [character.cat, character.table, character.hat, character.other, width, height, imagesLoaded]);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        className={className}
        style={{ opacity: imagesLoaded ? 1 : 0, transition: 'opacity 0.2s ease-in-out' }}
      />
      {!imagesLoaded && showLoadingIndicator && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ aspectRatio: `${width}/${height}` }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-2"></div>
            <p className="text-sm text-slate-500">Loading cat...</p>
          </div>
        </div>
      )}
    </div>
  );
}
