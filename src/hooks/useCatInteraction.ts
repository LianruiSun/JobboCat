import { useEffect, useRef } from 'react';
import { useCharacter } from '../context/CharacterContext';

export function useCatInteraction() {
  const { setIsActive } = useCharacter();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleInteraction = () => {
      // Clear any existing timer to prevent memory leaks
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      setIsActive(true);
      
      // Set new timer to return to idle state
      timerRef.current = setTimeout(() => {
        setIsActive(false);
        timerRef.current = null;
      }, 200);
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
  }, [setIsActive]);
}
