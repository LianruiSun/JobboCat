import { useState, useCallback } from 'react';

export function useFocusSession(initialSessions = 3) {
  const [isFocusing, setIsFocusing] = useState(false);
  const [todaySessions, setTodaySessions] = useState(initialSessions);

  const startFocus = useCallback(() => {
    setIsFocusing(true);
    
    // TODO: Implement proper timer countdown
    setTimeout(() => {
      setIsFocusing(false);
      setTodaySessions(prev => prev + 1);
      alert('🎉 完成 25 分钟专注！你获得了新挂件！');
    }, 1500000); // 25 minutes
  }, []);

  return {
    isFocusing,
    todaySessions,
    startFocus,
  };
}
