import { useState, useCallback, useRef, useEffect } from 'react';
import { addFocusMinutes } from '../lib/profileService';

export function useFocusSession(initialSessions = 3) {
  const [isFocusing, setIsFocusing] = useState(false);
  const [todaySessions, setTodaySessions] = useState(initialSessions);
  const [focusDuration, setFocusDuration] = useState(25); // Default 25 minutes
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const startFocus = useCallback((duration: number = focusDuration) => {
    setIsFocusing(true);
    setRemainingSeconds(duration * 60);
    endTimeRef.current = Date.now() + duration * 60 * 1000;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Update countdown every second
    intervalRef.current = setInterval(() => {
      if (endTimeRef.current) {
        const remaining = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
        setRemainingSeconds(remaining);
      }
    }, 1000);
    
    // Start timer
    timerRef.current = setTimeout(async () => {
      setIsFocusing(false);
      setTodaySessions(prev => prev + 1);
      setRemainingSeconds(0);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Save focus time to database
      try {
        await addFocusMinutes(duration);
        alert(`🎉 Completed ${duration} minute focus session!`);
      } catch (error) {
        console.error('Failed to save focus session:', error);
        alert(`✅ Completed ${duration} minute focus session! (Failed to save to server)`);
      }
      
      timerRef.current = null;
      endTimeRef.current = null;
    }, duration * 60 * 1000); // Convert minutes to milliseconds
  }, [focusDuration]);

  const stopFocus = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsFocusing(false);
    setRemainingSeconds(0);
    endTimeRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    isFocusing,
    todaySessions,
    focusDuration,
    setFocusDuration,
    startFocus,
    stopFocus,
    remainingSeconds,
  };
}
