import { supabase } from './supabase';
import type { CharacterSelection } from '../types/character';

export interface Profile {
  id: string;
  username: string;
  cat_id: string | null;
  cat_config: any | null;
  bio: string | null;
  total_online_seconds: number;
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
