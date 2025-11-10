import { useState, useCallback, useRef, useEffect } from 'react';
import { addFocusMinutes, startFocusSession, endFocusSession, isFocusSessionActive } from '../lib/profileService';

const STORAGE_KEY = 'jobbocat_focus_session';

interface StoredSession {
  sessionId: string;
  endTime: number;
  duration: number;
}

export function useFocusSession(initialSessions = 3) {
  const [isFocusing, setIsFocusing] = useState(false);
  const [todaySessions, setTodaySessions] = useState(initialSessions);
  const [focusDuration, setFocusDuration] = useState(25); // Default 25 minutes
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const isRestoringRef = useRef(false);

  // Helper to save session to localStorage
  const saveSessionToStorage = (sessionId: string, endTime: number, duration: number) => {
    const sessionData: StoredSession = { sessionId, endTime, duration };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  };

  // Helper to clear session from localStorage
  const clearSessionFromStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  // Helper to get session from localStorage
  const getSessionFromStorage = (): StoredSession | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as StoredSession;
    } catch (error) {
      console.error('Failed to parse stored session:', error);
      return null;
    }
  };

  const startFocus = useCallback(async (duration: number = focusDuration) => {
    try {
      // Start a focus session in the database
      const sessionId = await startFocusSession(duration);
      sessionIdRef.current = sessionId;
      
      const endTime = Date.now() + duration * 60 * 1000;
      endTimeRef.current = endTime;
      
      // Save to localStorage for persistence across page refreshes
      saveSessionToStorage(sessionId, endTime, duration);
      
      setIsFocusing(true);
      setRemainingSeconds(duration * 60);
      
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
        
        // Clear from localStorage
        clearSessionFromStorage();
        
        // End the focus session and save focus time to database
        try {
          if (sessionIdRef.current) {
            await endFocusSession(sessionIdRef.current);
            sessionIdRef.current = null;
          }
          await addFocusMinutes(duration);
          alert(`🎉 Completed ${duration} minute focus session!`);
        } catch (error) {
          console.error('Failed to save focus session:', error);
          alert(`✅ Completed ${duration} minute focus session! (Failed to save to server)`);
        }
        
        timerRef.current = null;
        endTimeRef.current = null;
      }, duration * 60 * 1000); // Convert minutes to milliseconds
    } catch (error) {
      console.error('Failed to start focus session:', error);
      alert('Failed to start focus session. Please try again.');
    }
  }, [focusDuration]);

  const stopFocus = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Clear from localStorage
    clearSessionFromStorage();
    
    // End the focus session in the database if it exists
    if (sessionIdRef.current) {
      try {
        await endFocusSession(sessionIdRef.current);
        sessionIdRef.current = null;
      } catch (error) {
        console.error('Failed to end focus session:', error);
      }
    }
    
    setIsFocusing(false);
    setRemainingSeconds(0);
    endTimeRef.current = null;
  }, []);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      if (isRestoringRef.current) return;
      isRestoringRef.current = true;

      const stored = getSessionFromStorage();
      if (!stored) {
        isRestoringRef.current = false;
        return;
      }

      const { sessionId, endTime, duration } = stored;
      const now = Date.now();

      // Check if session has already expired
      if (now >= endTime) {
        console.log('Stored session has expired, cleaning up...');
        clearSessionFromStorage();
        
        // Try to end the session in the database
        try {
          await endFocusSession(sessionId);
          await addFocusMinutes(duration);
        } catch (error) {
          console.error('Failed to clean up expired session:', error);
        }
        
        isRestoringRef.current = false;
        return;
      }

      // Verify session is still active in the database
      try {
        const isActive = await isFocusSessionActive(sessionId);
        if (!isActive) {
          console.log('Session is no longer active in database, cleaning up...');
          clearSessionFromStorage();
          isRestoringRef.current = false;
          return;
        }

        // Restore the session
        console.log('Restoring active focus session...');
        sessionIdRef.current = sessionId;
        endTimeRef.current = endTime;
        
        const remainingMs = endTime - now;
        const remainingSecs = Math.floor(remainingMs / 1000);
        
        setIsFocusing(true);
        setRemainingSeconds(remainingSecs);
        setFocusDuration(duration); // Restore the duration to the UI state

        // Update countdown every second
        intervalRef.current = setInterval(() => {
          if (endTimeRef.current) {
            const remaining = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
            setRemainingSeconds(remaining);
          }
        }, 1000);

        // Set timer for remaining time
        timerRef.current = setTimeout(async () => {
          setIsFocusing(false);
          setTodaySessions(prev => prev + 1);
          setRemainingSeconds(0);
          
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          // Clear from localStorage
          clearSessionFromStorage();
          
          // End the focus session and save focus time to database
          try {
            if (sessionIdRef.current) {
              await endFocusSession(sessionIdRef.current);
              sessionIdRef.current = null;
            }
            await addFocusMinutes(duration);
            alert(`🎉 Completed ${duration} minute focus session!`);
          } catch (error) {
            console.error('Failed to save focus session:', error);
            alert(`✅ Completed ${duration} minute focus session! (Failed to save to server)`);
          }
          
          timerRef.current = null;
          endTimeRef.current = null;
        }, remainingMs);

      } catch (error) {
        console.error('Failed to restore session:', error);
        clearSessionFromStorage();
      }
      
      isRestoringRef.current = false;
    };

    restoreSession();
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
