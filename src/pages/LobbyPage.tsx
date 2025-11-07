import { useState, useEffect } from 'react';
import { Header } from '../components/layout';
import { useOnlineCount } from '../hooks/useOnlineCount';
import { useLanguage } from '../context/LanguageContext';
import { useCharacter } from '../context/CharacterContext';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';
import { useCatInteraction } from '../hooks/useCatInteraction';
import { useFocusSession } from '../hooks/useFocusSession';
import { loadProfile } from '../lib/profileService';
import assetsData from '../assets/character-assets.json';
import { MOCK_STATS, MOCK_OTHERS_FOCUSING, MOCK_PUBLIC_MESSAGES } from '../data/mockLobbyData';
import {
  CatCanvasAvatar,
  OthersFocusingList,
  PublicMessageStream,
  LobbyStatsCard,
  FocusControls,
} from '../components/lobby';

export default function LobbyPage() {
  const [message, setMessage] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { onlineCount } = useOnlineCount();
  const { t } = useLanguage();
  const { character, setCharacter, getActiveCatPath } = useCharacter();
  const { user } = useAuth();
  const { navigateTo } = useNavigation();
  const { isFocusing, todaySessions, startFocus } = useFocusSession();
  
  // Monitor interactions for cat animation
  useCatInteraction();

  // Load user's profile character on mount
  useEffect(() => {
    const loadUserCharacter = async () => {
      if (!user) {
        navigateTo('login');
        return;
      }

      try {
        const profile = await loadProfile();
        if (profile.cat_config) {
          // Update character context with user's saved character
          setCharacter(profile.cat_config);
        } else {
          // User doesn't have a character yet, redirect to profile setup
          console.log('User has no character, redirecting to profile setup');
          navigateTo('profile-setup');
          return;
        }
      } catch (error) {
        console.error('Failed to load user character:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadUserCharacter();
  }, [user, setCharacter, navigateTo]);

  // Load user's character or use defaults
  const userCharacter = character || {
    cat: assetsData.cats[0]?.path || '',
    catFolder: assetsData.cats[0]?.path || '',
    table: assetsData.tables[0]?.path || '',
    hat: assetsData.hats[1]?.path || '',
    other: '',
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  // Show loading state while fetching profile
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Header />
        <main className="pt-20 pb-8 px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-slate-600">{t('lobby.loading') || 'Loading lobby...'}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />

      <main className="pt-20 pb-8 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
            
            {/* Left Sidebar - Lobby Info */}
            <aside className="hidden lg:block">
              <LobbyStatsCard
                totalJobSeekers={MOCK_STATS.totalJobSeekers}
                sameFieldCount={MOCK_STATS.sameFieldCount}
                focusingCount={MOCK_STATS.focusingCount}
                onlineCount={onlineCount}
              />
            </aside>

            {/* Center - Cat Avatar & Focus Button */}
            <main className="flex flex-col items-center">
              <div className="w-full max-w-2xl">
                {/* Cat Avatar Card */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-200 mb-6">
                  {/* Cat Display */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <CatCanvasAvatar
                        character={{
                          cat: getActiveCatPath(), // Use active/inactive cat image
                          table: userCharacter.table,
                          hat: userCharacter.hat,
                          other: userCharacter.other,
                        }}
                        className="max-w-full h-auto rounded-xl"
                      />
                      {isFocusing && (
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <div className="text-6xl mb-4 animate-bounce">🧘</div>
                            <p className="text-2xl font-bold text-emerald-700">{t('lobby.focus.overlay')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <FocusControls
                    isFocusing={isFocusing}
                    onStartFocus={startFocus}
                    catDialogue={t('lobby.cat.dialogue')}
                    todaySessions={todaySessions}
                    dailyGoal={MOCK_STATS.dailyGoal}
                  />
                </div>
              </div>
            </main>

            {/* Right Sidebar - Others' Cats + Public Message Stream */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-4" style={{ maxHeight: 'calc(100vh - 7rem)' }}>
                <OthersFocusingList users={MOCK_OTHERS_FOCUSING} />
                <PublicMessageStream
                  messages={MOCK_PUBLIC_MESSAGES}
                  messageInput={message}
                  onMessageChange={(e) => setMessage(e.target.value)}
                  onSubmit={handleSendMessage}
                />
              </div>
            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}