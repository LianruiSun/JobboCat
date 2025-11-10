import { useState, useEffect } from 'react';
import { getCurrentlyFocusing } from '../lib/profileService';

/**
 * Hook to fetch and refresh the count of currently focusing users
 * @param refreshInterval - How often to refresh the count in milliseconds (default: 30 seconds)
 */
export function useCurrentlyFocusing(refreshInterval = 30000) {
  const [focusingCount, setFocusingCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCount = async () => {
    try {
      const count = await getCurrentlyFocusing();
      setFocusingCount(count);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch currently focusing count:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    fetchCount();

    // Set up interval to refresh the count
    const interval = setInterval(fetchCount, refreshInterval);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { focusingCount, isLoading, error, refetch: fetchCount };
}
