import { supabase } from './supabase';
import type { CharacterSelection } from '../types/character';

export interface Profile {
  id: string;
  username: string;
  cat_id: string | null;
  cat_config: any | null;
  bio: string | null;
  total_focus_minutes: number;
  created_at: string;
  updated_at: string;
}

/**
 * Load the current user's profile
 */
export async function loadProfile(): Promise<Profile> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error loading profile:', error);
    throw error;
  }
  return profile;
}

/**
 * Ensure profile exists for the current user
 * Creates a default profile if it doesn't exist
 */
export async function ensureProfileExists(): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');

  // Check if profile exists
  const { data: existingProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  // If profile doesn't exist, create it
  if (!existingProfile && !fetchError) {
    console.log('Profile does not exist, creating default profile...');
    
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        username: `user_${user.id.substring(0, 8)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Error creating profile:', insertError);
      throw insertError;
    }
    
    console.log('Default profile created successfully');
  }
}

/**
 * Check if user has completed their profile setup
 * Profile is considered incomplete if username is still default or cat_config is null
 */
export async function isProfileComplete(): Promise<boolean> {
  try {
    const profile = await loadProfile();
    // Check if username is still the default format (user_xxxxx) or if cat is not configured
    const hasDefaultUsername = profile.username?.startsWith('user_');
    // Check cat_config instead of cat_id since we store everything in cat_config
    const hasCatConfig = profile.cat_config !== null;
    
    return !hasDefaultUsername && hasCatConfig;
  } catch {
    return false;
  }
}

/**
 * Update user profile with username and cat configuration
 */
export async function updateProfile({
  username,
  bio,
  catId,
  catConfig,
}: {
  username?: string;
  bio?: string;
  catId?: string | null;
  catConfig?: CharacterSelection;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');

  // Ensure profile exists first
  await ensureProfileExists();

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (username !== undefined) updateData.username = username;
  if (bio !== undefined) updateData.bio = bio;
  // Only update cat_id if it's a valid UUID, otherwise skip it
  if (catId !== undefined && catId !== null) updateData.cat_id = catId;
  if (catConfig !== undefined) updateData.cat_config = catConfig;

  console.log('Updating profile with data:', updateData);
  console.log('User ID:', user.id);

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)
    .select();

  if (error) {
    console.error('Profile update error:', error);
    throw error;
  }
  
  console.log('Profile updated successfully:', data);
  return data;
}

/**
 * Check if username is available
 */
export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .maybeSingle();

  if (error) throw error;
  return data === null;
}

/**
 * Add focus minutes to user's total
 */
export async function addFocusMinutes(minutes: number): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');

  // Get current total
  const profile = await loadProfile();
  const newTotal = (profile.total_focus_minutes || 0) + minutes;

  const { error } = await supabase
    .from('profiles')
    .update({
      total_focus_minutes: newTotal,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('Failed to update focus minutes:', error);
    throw error;
  }

  console.log(`Added ${minutes} minutes. New total: ${newTotal} minutes`);
}

/**
 * Start a focus session
 */
export async function startFocusSession(durationMinutes: number): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');

  const { data, error } = await supabase
    .from('focus_sessions')
    .insert({
      user_id: user.id,
      duration_minutes: durationMinutes,
      started_at: new Date().toISOString(),
      is_active: true,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Failed to start focus session:', error);
    throw error;
  }

  return data.id;
}

/**
 * End a focus session
 */
export async function endFocusSession(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('focus_sessions')
    .update({
      ended_at: new Date().toISOString(),
      is_active: false,
    })
    .eq('id', sessionId);

  if (error) {
    console.error('Failed to end focus session:', error);
    throw error;
  }
}

/**
 * Get the count of currently focusing users
 */
export async function getCurrentlyFocusing(): Promise<number> {
  const { data, error } = await supabase.rpc('get_currently_focusing');

  if (error) {
    console.error('Failed to get currently focusing count:', error);
    throw error;
  }

  return Number(data) || 0;
}

/**
 * Check if a focus session is still active
 */
export async function isFocusSessionActive(sessionId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('focus_sessions')
    .select('is_active, started_at, duration_minutes, ended_at')
    .eq('id', sessionId)
    .single();

  if (error || !data) {
    console.error('Failed to check focus session:', error);
    return false;
  }

  // Check if session is marked as active in the database
  if (!data.is_active) {
    return false;
  }

  // Check if session has expired based on duration
  const startedAt = new Date(data.started_at).getTime();
  const now = Date.now();
  const durationMs = data.duration_minutes * 60 * 1000;
  
  // If ended_at is set, check against that
  if (data.ended_at) {
    return now <= new Date(data.ended_at).getTime();
  }
  
  // Otherwise check if it's within the duration window
  return now < startedAt + durationMs;
}
