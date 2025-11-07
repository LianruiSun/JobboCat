import { useState, useEffect } from 'react';
import { Header } from '../components/layout';
import { Button } from '../components/common/ui';
import { CharacterCreator } from '../components/character';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';
import { updateProfile, checkUsernameAvailable, loadProfile } from '../lib/profileService';
import type { CharacterSelection } from '../types/character';

export default function ProfileSetupPage() {
  const [step, setStep] = useState<'username' | 'character'>('username');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigateTo('login');
      return;
    }

    // Check if user already has a username
    const checkExistingProfile = async () => {
      try {
        const profile = await loadProfile();
        if (profile.username && !profile.username.startsWith('user_')) {
          // User already has a username, skip to character creation
          setUsername(profile.username);
          setStep('character');
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingProfile();
  }, [user, navigateTo]);

  const validateUsername = (value: string): boolean => {
    setUsernameError('');
    
    if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return false;
    }
    
    if (value.length > 20) {
      setUsernameError('Username must be less than 20 characters');
      return false;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return false;
    }
    
    return true;
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUsername(username)) return;
    
    setIsCheckingUsername(true);
    setUsernameError('');
    
    try {
      const isAvailable = await checkUsernameAvailable(username);
      
      if (!isAvailable) {
        setUsernameError('Username is already taken. Please choose another.');
        setIsCheckingUsername(false);
        return;
      }
      
      // Username is valid and available, move to character creation
      setStep('character');
    } catch (error: any) {
      setUsernameError(error.message || 'Failed to check username availability');
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleCharacterComplete = async (character: CharacterSelection) => {
    setIsSubmitting(true);

    try {
      console.log('Saving profile with username:', username);
      console.log('Character data:', character);
      
      // Save username and character to profile
      // Note: cat_id is UUID type, so we leave it null and store everything in cat_config
      await updateProfile({
        username,
        // Don't set cat_id - leave it null since it expects UUID
        catConfig: character, // Store full character configuration in JSONB
      });

      console.log('Profile saved successfully!');
      
      // Navigate to lobby page
      navigateTo('lobby');
    } catch (error: any) {
      console.error('Failed to save profile:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      alert(`Failed to save profile: ${error.message}\n\nPlease try again or check the console for details.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToUsername = () => {
    setStep('username');
  };

  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />

      <main className="pt-24 pb-16 px-6">
        {step === 'username' ? (
          <div className="mx-auto max-w-md">
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Welcome to Jobbo Cat!
              </h1>
              <p className="text-slate-600 text-lg">
                Let's start by choosing your unique username
              </p>
            </div>

            <div className="card p-8 animate-slide-up">
              <form onSubmit={handleUsernameSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError('');
                    }}
                    onBlur={(e) => validateUsername(e.target.value)}
                    className={`input ${usernameError ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Choose a unique username"
                    required
                    minLength={3}
                    maxLength={20}
                    autoFocus
                  />
                  {usernameError && (
                    <p className="mt-2 text-sm text-red-600 animate-fade-in">
                      {usernameError}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-slate-500">
                    3-20 characters, letters, numbers, and underscores only
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isCheckingUsername || !username || !!usernameError}
                >
                  {isCheckingUsername ? 'Checking...' : 'Continue'}
                </Button>
              </form>

              {/* Progress Indicator */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              </div>
              <p className="text-center text-sm text-slate-500 mt-2">
                Step 1 of 2: Choose Username
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="text-center mb-4 animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Great choice, <span className="text-emerald-600">{username}</span>!
              </h2>
              <p className="text-slate-600">Now let's create your cat avatar</p>
            </div>

            <CharacterCreator
              onComplete={handleCharacterComplete}
              onBack={handleBackToUsername}
            />

            {/* Progress Indicator */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-2">
              Step 2 of 2: Create Your Cat
            </p>

            {isSubmitting && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  <p className="text-lg font-semibold text-slate-900">
                    Setting up your profile...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
