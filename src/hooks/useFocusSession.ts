import { useState, useCallback, useRef, useEffect } from 'react';
import { addFocusMinutes, startFocusSession, endFocusSession, cancelFocusSession, isFocusSessionActive, cleanupExpiredSessions } from '../lib/profileService';

const STORAGE_KEY = 'jobbocat_focus_session';

interface StoredSession {
  sessionId: string;
  endTime: number;
  duration: number;
  isPaused: boolean;
  pausedAt?: number;
  accumulatedPausedTime: number; // Total time paused in milliseconds
}

export function useFocusSession(initialSessions = 3) {
  const [isFocusing, setIsFocusing] = useState(false);
  const [todaySessions, setTodaySessions] = useState(initialSessions);
  const [focusDuration, setFocusDuration] = useState(25); // Default 25 minutes
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const isRestoringRef = useRef(false);
  const isPausedRef = useRef(false);
  const pausedAtRef = useRef<number | null>(null);
  const accumulatedPausedTimeRef = useRef(0);

  // Helper to save session to localStorage
  const saveSessionToStorage = (sessionId: string, endTime: number, duration: number) => {
    const sessionData: StoredSession = { 
      sessionId, 
      endTime, 
      duration,
      isPaused: isPausedRef.current,
      pausedAt: pausedAtRef.current || undefined,
      accumulatedPausedTime: accumulatedPausedTimeRef.current
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  };

  // Helper to update storage with current pause state
  const updateStorageWithPauseState = () => {
    const stored = getSessionFromStorage();
    if (stored && sessionIdRef.current) {
      saveSessionToStorage(sessionIdRef.current, endTimeRef.current || stored.endTime, stored.duration);
    }
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
      // Prevent multiple simultaneous starts
      if (isFocusing) {
        console.warn('Focus session already in progress');
        return;
      }

      // Update UI immediately for instant feedback
      const endTime = Date.now() + duration * 60 * 1000;
      endTimeRef.current = endTime;
      setIsFocusing(true);
      setRemainingSeconds(duration * 60);
      
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Start database session in background (don't await)
      startFocusSession(duration).then((sessionId) => {
        sessionIdRef.current = sessionId;
        // Save to localStorage for persistence across page refreshes
        saveSessionToStorage(sessionId, endTime, duration);
      }).catch((error) => {
        console.error('Failed to start focus session in database:', error);
        // Continue with local session even if database fails
      });
      
      // Update countdown every second and check for completion
      intervalRef.current = setInterval(async () => {
        if (!endTimeRef.current) return;
        
        if (isPausedRef.current) {
          // Don't update countdown when paused
          return;
        }
        
        const adjustedEndTime = endTimeRef.current + accumulatedPausedTimeRef.current;
        const remaining = Math.max(0, Math.floor((adjustedEndTime - Date.now()) / 1000));
        setRemainingSeconds(remaining);
        
        // Check if session is complete
        if (remaining === 0) {
          setIsFocusing(false);
          setTodaySessions(prev => prev + 1);
          
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
          
          endTimeRef.current = null;
          accumulatedPausedTimeRef.current = 0;
          isPausedRef.current = false;
          pausedAtRef.current = null;
        }
      }, 1000);
    } catch (error) {
      console.error('Failed to start focus session:', error);
      alert('Failed to start focus session. Please try again.');
    }
  }, [focusDuration]);

  const pauseFocus = useCallback(() => {
    if (!isFocusing || isPausedRef.current) return;
    
    isPausedRef.current = true;
    pausedAtRef.current = Date.now();
    updateStorageWithPauseState();
    console.log('Focus session paused');
  }, [isFocusing]);

  const resumeFocus = useCallback(() => {
    if (!isFocusing || !isPausedRef.current || !pausedAtRef.current) return;
    
    // Add the time we were paused to accumulated paused time
    const pauseDuration = Date.now() - pausedAtRef.current;
    accumulatedPausedTimeRef.current += pauseDuration;
    
    isPausedRef.current = false;
    pausedAtRef.current = null;
    updateStorageWithPauseState();
    console.log(`Focus session resumed (paused for ${Math.floor(pauseDuration / 1000)}s)`);
  }, [isFocusing]);

  const stopFocus = useCallback(async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Clear from localStorage
    clearSessionFromStorage();
    
    // Cancel the focus session in the database if it exists (don't save progress)
    if (sessionIdRef.current) {
      try {
        await cancelFocusSession(sessionIdRef.current);
        console.log('Focus session cancelled early');
        sessionIdRef.current = null;
      } catch (error) {
        console.error('Failed to cancel focus session:', error);
      }
    }
    
    setIsFocusing(false);
    setRemainingSeconds(0);
    endTimeRef.current = null;
    accumulatedPausedTimeRef.current = 0;
    isPausedRef.current = false;
    pausedAtRef.current = null;
  }, []);

  // Handle page visibility changes (pause when tab is hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseFocus();
      } else {
        resumeFocus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseFocus, resumeFocus]);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      if (isRestoringRef.current) return;
      isRestoringRef.current = true;

      // Clean up any expired sessions first
      try {
        await cleanupExpiredSessions();
      } catch (error) {
        console.warn('Failed to cleanup expired sessions:', error);
      }

      const stored = getSessionFromStorage();
      if (!stored) {
        isRestoringRef.current = false;
        return;
      }

      const { sessionId, endTime, duration, isPaused, pausedAt, accumulatedPausedTime } = stored;
      const now = Date.now();

      // Restore pause state
      accumulatedPausedTimeRef.current = accumulatedPausedTime || 0;
      
      // If session was paused when page was closed, add that time to accumulated
      if (isPaused && pausedAt) {
        const additionalPausedTime = now - pausedAt;
        accumulatedPausedTimeRef.current += additionalPausedTime;
        console.log(`Session was paused, adding ${Math.floor(additionalPausedTime / 1000)}s to paused time`);
      }

      // Check if session has already expired (accounting for paused time)
      const adjustedEndTime = endTime + accumulatedPausedTimeRef.current;
      if (now >= adjustedEndTime) {
        console.log('Stored session has expired, cleaning up...');
        clearSessionFromStorage();
        
        // Try to delete the session and save focus time
        try {
          await endFocusSession(sessionId);
          await addFocusMinutes(duration);
          console.log('Expired session completed and deleted');
        } catch (error) {
          console.error('Failed to clean up expired session:', error);
          // Session might already be deleted, continue anyway
        }
        
        isRestoringRef.current = false;
        return;
      }

      // Verify session is still active in the database
      try {
        const isActive = await isFocusSessionActive(sessionId);
        if (!isActive) {
          console.log('Session no longer exists in database (already deleted), cleaning up...');
          clearSessionFromStorage();
          isRestoringRef.current = false;
          return;
        }

        // Restore the session
        console.log('Restoring active focus session...');
        sessionIdRef.current = sessionId;
        endTimeRef.current = endTime;
        
        const adjustedEndTime = endTime + accumulatedPausedTimeRef.current;
        const remainingSecs = Math.max(0, Math.floor((adjustedEndTime - now) / 1000));
        
        setIsFocusing(true);
        setRemainingSeconds(remainingSecs);
        setFocusDuration(duration); // Restore the duration to the UI state

        // Update countdown every second and check for completion
        intervalRef.current = setInterval(async () => {
          if (!endTimeRef.current) return;
          
          if (isPausedRef.current) {
            // Don't update countdown when paused
            return;
          }
          
          const adjustedEndTime = endTimeRef.current + accumulatedPausedTimeRef.current;
          const remaining = Math.max(0, Math.floor((adjustedEndTime - Date.now()) / 1000));
          setRemainingSeconds(remaining);
          
          // Check if session is complete
          if (remaining === 0) {
            setIsFocusing(false);
            setTodaySessions(prev => prev + 1);
            
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
            
            endTimeRef.current = null;
            accumulatedPausedTimeRef.current = 0;
            isPausedRef.current = false;
            pausedAtRef.current = null;
          }
        }, 1000);

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
