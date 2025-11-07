import { useEffect, useRef } from 'react';

interface UseCharacterPreviewProps {
  selectedCat: string;
  selectedHat: string;
  selectedTable: string;
  selectedOther: string;
}

/**
 * Custom hook to manage canvas-based character preview
 * Handles image loading and drawing on canvas
 */
export function useCharacterPreview({
  selectedCat,
  selectedHat,
  selectedTable,
  selectedOther,
}: UseCharacterPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 1000, 1000);

    // Load and draw images in order: table -> cat -> hat -> other
    const imagesToLoad = [
      { path: selectedTable, order: 1 },
      { path: selectedCat, order: 2 },
      { path: selectedHat, order: 3 },
      { path: selectedOther, order: 4 },
    ].filter(item => item.path);

    imagesToLoad.forEach(({ path }) => {
      if (path) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 1000, 1000);
        };
        img.src = path;
      }
    });
  }, [selectedCat, selectedHat, selectedTable, selectedOther]);

  return canvasRef;
}
