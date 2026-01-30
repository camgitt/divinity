/**
 * User Service - Enhanced with subscription creation
 * 
 * This service ensures that all user-related data is properly saved to
 * and retrieved from Supabase, including subscriptions.
 * 
 * Updated: Fixed column names to match database schema
 */

import { getSupabaseClient, isSupabaseConfigured } from './supabase-client';

export interface UserData {
  id?: string;
  email: string;
  full_name: string;
  username: string;
  faith_tradition: string;
  preferred_language?: string;
  avatar?: string;
  status?: string;
  is_verified_leader?: boolean;
  verified_leader_type?: string | null;
  onboarding_completed?: boolean;
}

export interface UserPreferences {
  user_id: string;
  theme?: string;
  ambient_sound_enabled?: boolean;
  ambient_sound_type?: string | null;
  ambient_sound_volume?: number;
  notifications_enabled?: boolean;
  email_notifications?: boolean;
  daily_reflection_time?: string;
}

export interface TokenBalance {
  user_id: string;
  daily_tokens?: number;
  purchased_tokens?: number;
  bonus_tokens?: number;
  total_tokens_earned?: number;
  total_tokens_spent?: number;
}

export interface UserSubscription {
  user_id: string;
  tier_id: 'seeker' | 'subscriber' | 'devotee' | 'enlightened';
  status?: string;
}

/**
 * Create a new user in Supabase
 * Checks if user exists first - if yes, updates; if no, creates new
 */
export async function createUser(userData: UserData) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - saving to localStorage only');
    // Save to localStorage as fallback
    localStorage.setItem('divinityagi_user', JSON.stringify(userData));
    return { success: true, data: userData, source: 'localStorage' };
  }

  try {
    console.log('📝 Creating/updating user in Supabase:', userData.email);
    
    // First check if user already exists by email or ID
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .or(userData.id ? `id.eq.${userData.id},email.eq.${userData.email}` : `email.eq.${userData.email}`)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no rows found

    if (existingUser) {
      // User exists - update with new data and last login
      console.log('👤 User already exists, updating profile');
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({
          full_name: userData.full_name || existingUser.full_name,
          username: userData.username || existingUser.username,
          faith_tradition: userData.faith_tradition || existingUser.faith_tradition,
          avatar: userData.avatar || existingUser.avatar,
          status: userData.status || existingUser.status,
          is_verified_leader: userData.is_verified_leader || existingUser.is_verified_leader,
          verified_leader_type: userData.verified_leader_type || existingUser.verified_leader_type,
          onboarding_completed: userData.onboarding_completed || existingUser.onboarding_completed,
          last_login_at: new Date().toISOString()
        })
        .eq('id', existingUser.id)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Error updating user:', updateError);
        // Even if update fails, return existing user data
        localStorage.setItem('divinityagi_user', JSON.stringify(existingUser));
        return { success: true, data: existingUser, source: 'supabase', existing: true };
      }

      console.log('✅ User profile updated in Supabase');
      localStorage.setItem('divinityagi_user', JSON.stringify(updatedUser));
      return { success: true, data: updatedUser, source: 'supabase', existing: true };
    }

    // User doesn't exist - create new
    const { data, error } = await supabase
      .from('users')
      .insert([{
        id: userData.id, // This should come from Supabase Auth
        email: userData.email,
        full_name: userData.full_name,
        username: userData.username,
        faith_tradition: userData.faith_tradition,
        preferred_language: userData.preferred_language || 'en',
        status: 'active',
        is_verified_leader: false,
        verified_leader_type: null,
        onboarding_completed: true,
        last_login_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating user in Supabase:', error);
      
      // Check if it's a duplicate key error (user was created by trigger in the meantime)
      if (error.code === '23505') {
        console.log('⚠️ User already exists (created by trigger), fetching existing user...');
        const { data: existingUserData, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userData.id)
          .single();
        
        if (existingUserData && !fetchError) {
          console.log('✅ Retrieved existing user data');
          localStorage.setItem('divinityagi_user', JSON.stringify(existingUserData));
          return { success: true, data: existingUserData, source: 'supabase', existing: true };
        }
      }
      
      // Fallback to localStorage for other errors
      localStorage.setItem('divinityagi_user', JSON.stringify(userData));
      return { success: false, error, source: 'localStorage' };
    }

    console.log('✅ User created in Supabase:', data);
    
    // Also save to localStorage for quick access
    localStorage.setItem('divinityagi_user', JSON.stringify(data));
    
    return { success: true, data, source: 'supabase', existing: false };
  } catch (error) {
    console.error('❌ Exception creating user:', error);
    localStorage.setItem('divinityagi_user', JSON.stringify(userData));
    return { success: false, error, source: 'localStorage' };
  }
}

/**
 * Initialize user preferences in Supabase
 */
export async function createUserPreferences(preferences: UserPreferences) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - preferences not saved');
    return { success: false, source: 'none' };
  }

  try {
    console.log('📝 Creating user preferences for:', preferences.user_id);
    
    const { data, error } = await supabase
      .from('user_preferences')
      .insert([{
        user_id: preferences.user_id,
        theme: preferences.theme || 'light',
        ambient_sound_enabled: preferences.ambient_sound_enabled ?? true,
        ambient_sound_type: preferences.ambient_sound_type || null,
        ambient_sound_volume: preferences.ambient_sound_volume || 50,
        notifications_enabled: preferences.notifications_enabled ?? true,
        email_notifications: preferences.email_notifications ?? true,
        daily_reflection_time: preferences.daily_reflection_time || '08:00:00'
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating user preferences:', error);
      return { success: false, error };
    }

    console.log('✅ User preferences created:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Exception creating preferences:', error);
    return { success: false, error };
  }
}

/**
 * Initialize token balance for new user
 */
export async function createTokenBalance(balance: TokenBalance) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - token balance not initialized');
    return { success: false, source: 'none' };
  }

  try {
    console.log('📝 Creating token balance for:', balance.user_id);
    
    const { data, error } = await supabase
      .from('token_balances')
      .insert([{
        user_id: balance.user_id,
        daily_tokens: balance.daily_tokens || 50,
        purchased_tokens: balance.purchased_tokens || 0,
        bonus_tokens: balance.bonus_tokens || 0,
        total_tokens_earned: balance.total_tokens_earned || 50,
        total_tokens_spent: balance.total_tokens_spent || 0
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating token balance:', error);
      return { success: false, error };
    }

    console.log('✅ Token balance initialized:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Exception creating token balance:', error);
    return { success: false, error };
  }
}

/**
 * Create initial subscription for new user
 */
export async function createUserSubscription(subscription: UserSubscription) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - subscription not created');
    return { success: false, source: 'none' };
  }

  try {
    console.log('📝 Creating subscription for:', subscription.user_id, 'tier:', subscription.tier_id);
    
    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert([{
        user_id: subscription.user_id,
        tier_id: subscription.tier_id,
        status: subscription.status || 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating subscription:', error);
      return { success: false, error };
    }

    console.log('✅ Subscription created:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Exception creating subscription:', error);
    return { success: false, error };
  }
}

/**
 * Get user by ID from Supabase
 */
export async function getUser(userId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    // Try to get from localStorage
    const stored = localStorage.getItem('divinityagi_user');
    if (stored) {
      return { success: true, data: JSON.parse(stored), source: 'localStorage' };
    }
    return { success: false, error: 'No user found', source: 'none' };
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return { success: false, error };
    }

    // Save to localStorage for quick access
    localStorage.setItem('divinityagi_user', JSON.stringify(data));
    
    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching user:', error);
    return { success: false, error };
  }
}

/**
 * Update user profile
 */
export async function updateUser(userId: string, updates: Partial<UserData>) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    // Update localStorage
    const stored = localStorage.getItem('divinityagi_user');
    if (stored) {
      const user = JSON.parse(stored);
      const updated = { ...user, ...updates };
      localStorage.setItem('divinityagi_user', JSON.stringify(updated));
      return { success: true, data: updated, source: 'localStorage' };
    }
    return { success: false, error: 'No user found', source: 'none' };
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return { success: false, error };
    }

    // Update localStorage
    localStorage.setItem('divinityagi_user', JSON.stringify(data));
    
    console.log('✅ User updated in Supabase:', data);
    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception updating user:', error);
    return { success: false, error };
  }
}

/**
 * Update last login timestamp
 */
export async function updateLastLogin(userId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    const { error } = await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.error('Error updating last login:', error);
      return { success: false, error };
    }

    console.log('✅ Last login updated');
    return { success: true };
  } catch (error) {
    console.error('Exception updating last login:', error);
    return { success: false, error };
  }
}

/**
 * Get user preferences
 */
export async function getUserPreferences(userId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false, source: 'none' };

  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching preferences:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching preferences:', error);
    return { success: false, error };
  }
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(userId: string, updates: Partial<UserPreferences>) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating preferences:', error);
      return { success: false, error };
    }

    console.log('✅ Preferences updated:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception updating preferences:', error);
    return { success: false, error };
  }
}

/**
 * Get token balance
 */
export async function getTokenBalance(userId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false, source: 'none' };

  try {
    const { data, error } = await supabase
      .from('token_balances')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching token balance:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching token balance:', error);
    return { success: false, error };
  }
}

/**
 * Update token balance
 */
export async function updateTokenBalance(userId: string, updates: Partial<TokenBalance>) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    const { data, error } = await supabase
      .from('token_balances')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating token balance:', error);
      return { success: false, error };
    }

    console.log('✅ Token balance updated:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception updating token balance:', error);
    return { success: false, error };
  }
}