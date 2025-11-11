import { useEffect, useRef } from 'react';
import { useCharacter } from '../context/CharacterContext';

export function useCatInteraction() {
  const { isActive, setIsActive } = useCharacter();
  const timerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const handleInteraction = () => {
      // Cancel any pending animation frame
      animationFrameRef.current += 1;
      const currentFrame = animationFrameRef.current;
      
      // Clear any existing idle timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Toggle the active state immediately for visual feedback
      const newState = !isActive;
      setIsActive(newState);
      
      // Set timer to return to idle state after all clicks stop
      timerRef.current = setTimeout(() => {
        if (currentFrame === animationFrameRef.current) {
          setIsActive(false);
          timerRef.current = null;
        }
      }, 500);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, setIsActive]);
}
