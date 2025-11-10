import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Custom hook to fetch the total number of users from the database
 * Uses the get_total_users() database function
 */
export function useTotalUsers() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: rpcError } = await supabase.rpc('get_total_users');

        if (rpcError) {
          throw rpcError;
        }

        setTotalUsers(data || 0);
      } catch (err) {
        console.error('Failed to fetch total users:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        // Keep the previous value or use 0 if this is the first fetch
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalUsers();

    // Optionally, refresh the count periodically (every 5 minutes)
    const intervalId = setInterval(fetchTotalUsers, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { totalUsers, isLoading, error };
}
