import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';
import { isProfileComplete } from '../lib/profileService';

/**
 * Hook to handle OAuth redirects and check profile completion
 * This runs after user returns from OAuth provider (e.g., Google)
 */
export function useOAuthRedirectHandler() {
  const { user, loading } = useAuth();
  const { navigateTo, currentPage } = useNavigation();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    // Reset check when user changes
    if (!user) {
      hasCheckedRef.current = false;
    }
  }, [user]);

  useEffect(() => {
    // Only run this check once when user is authenticated and not loading
    // Also skip if we're already on profile-setup page
    if (!loading && user && !hasCheckedRef.current && currentPage !== 'profile-setup') {
      hasCheckedRef.current = true;
      
      console.log('OAuth redirect handler: Checking profile for user', user.email);
      
      // Delay to ensure profile is created in database (especially for new OAuth users)
      setTimeout(() => {
        isProfileComplete()
          .then((complete) => {
            console.log('Profile complete status:', complete);
            if (complete) {
              // Profile is complete, go to lobby
              if (currentPage !== 'lobby') {
                console.log('Redirecting to lobby');
                navigateTo('lobby');
              }
            } else {
              // Profile is incomplete, go to setup
              console.log('Redirecting to profile setup');
              navigateTo('profile-setup');
            }
          })
          .catch((error) => {
            console.error('Error checking profile:', error);
            // On error, assume profile needs setup
            console.log('Error occurred, redirecting to profile setup');
            navigateTo('profile-setup');
          });
      }, 1000); // Increased delay for database sync
    }
  }, [user, loading, navigateTo, currentPage]);
}
