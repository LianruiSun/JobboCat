import { useState, useEffect } from 'react';
import { Header } from '../components/layout';
import { Button } from '../components/common/ui';
import { CharacterCreator } from '../components/character';
import { CatCanvasAvatar } from '../components/lobby';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';
import { loadProfile, updateProfile, checkUsernameAvailable } from '../lib/profileService';
import type { CharacterSelection } from '../types/character';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCharacter, setIsEditingCharacter] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [character, setCharacter] = useState<CharacterSelection | null>(null);
  const [originalUsername, setOriginalUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useAuth();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (!user) {
      navigateTo('login');
      return;
    }

    loadProfileData();
  }, [user, navigateTo]);

  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      const profile = await loadProfile();
      setUsername(profile.username || '');
      setOriginalUsername(profile.username || '');
      setBio(profile.bio || '');
      setCharacter(profile.cat_config);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSaveProfile = async () => {
    if (!validateUsername(username)) return;

    // Check if username changed and is available
    if (username !== originalUsername) {
      setIsCheckingUsername(true);
      try {
        const isAvailable = await checkUsernameAvailable(username);
        if (!isAvailable) {
          setUsernameError('Username is already taken');
          setIsCheckingUsername(false);
          return;
        }
      } catch (error) {
        setUsernameError('Failed to check username availability');
        setIsCheckingUsername(false);
        return;
      }
      setIsCheckingUsername(false);
    }

    setIsSaving(true);
    try {
      await updateProfile({
        username,
        bio,
      });
      setOriginalUsername(username);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      alert(`Failed to update profile: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCharacterUpdate = async (newCharacter: CharacterSelection) => {
    setIsSaving(true);
    try {
      await updateProfile({
        catConfig: newCharacter,
      });
      setCharacter(newCharacter);
      setIsEditingCharacter(false);
      alert('Character updated successfully!');
    } catch (error: any) {
      console.error('Failed to update character:', error);
      alert(`Failed to update character: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  if (isEditingCharacter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <CharacterCreator
            onComplete={handleCharacterUpdate}
            onBack={() => setIsEditingCharacter(false)}
            initialCharacter={character}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">My Profile</h1>
            <p className="text-slate-600">Manage your account settings and character</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Character Preview */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>🐱</span>
                My Character
              </h2>
              
              {character && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-4">
                  <div className="aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <CatCanvasAvatar
                      character={{
                        cat: character.cat,
                        table: character.table,
                        hat: character.hat,
                        other: character.other,
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => setIsEditingCharacter(true)}
              >
                Customize Character
              </Button>
            </div>

            {/* Profile Info */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>👤</span>
                  Profile Info
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Email (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="input bg-slate-50 cursor-not-allowed"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError('');
                    }}
                    onBlur={(e) => isEditing && validateUsername(e.target.value)}
                    disabled={!isEditing}
                    className={`input ${!isEditing ? 'bg-slate-50' : ''} ${usernameError ? 'border-red-500' : ''}`}
                  />
                  {usernameError && (
                    <p className="mt-2 text-sm text-red-600">{usernameError}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className={`input resize-none ${!isEditing ? 'bg-slate-50' : ''}`}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        setUsername(originalUsername);
                        setBio(bio);
                        setIsEditing(false);
                        setUsernameError('');
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSaveProfile}
                      disabled={isSaving || isCheckingUsername || !!usernameError}
                      className="flex-1"
                    >
                      {isSaving || isCheckingUsername ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
