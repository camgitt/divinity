/**
 * Daily Reflections Service - Handles daily reflection operations with Supabase
 */

import { getSupabaseClient } from './supabase-client';

export interface DailyReflection {
  id?: string;
  user_id: string;
  reflection_date: string;
  faith_tradition: string;
  content: string;
  title?: string;
  viewed?: boolean;
  created_at?: string;
}

/**
 * Create a new daily reflection
 */
export async function createDailyReflection(reflection: DailyReflection) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - reflection not saved');
    return { success: false, source: 'none' };
  }

  try {
    const { data, error } = await supabase
      .from('daily_reflections')
      .insert([{
        user_id: reflection.user_id,
        reflection_date: reflection.reflection_date,
        faith_tradition: reflection.faith_tradition,
        content: reflection.content,
        title: reflection.title || 'Daily Reflection',
        viewed: reflection.viewed ?? false,
        created_at: reflection.created_at || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating daily reflection:', error);
      return { success: false, error };
    }

    console.log('✅ Daily reflection created:', data);
    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception creating daily reflection:', error);
    return { success: false, error };
  }
}

/**
 * Mark reflection as viewed
 */
export async function markReflectionViewed(reflectionId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    const { data, error } = await supabase
      .from('daily_reflections')
      .update({ viewed: true })
      .eq('id', reflectionId)
      .select()
      .single();

    if (error) {
      console.error('Error marking reflection as viewed:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception marking reflection as viewed:', error);
    return { success: false, error };
  }
}

/**
 * Get user's daily reflections
 */
export async function getUserDailyReflections(userId: string, limit = 30) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false, source: 'none' };

  try {
    const { data, error } = await supabase
      .from('daily_reflections')
      .select('*')
      .eq('user_id', userId)
      .order('reflection_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching daily reflections:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching daily reflections:', error);
    return { success: false, error };
  }
}

/**
 * Get today's reflection for a user
 */
export async function getTodayReflection(userId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false, source: 'none' };

  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('daily_reflections')
      .select('*')
      .eq('user_id', userId)
      .eq('reflection_date', today)
      .single();

    if (error) {
      // If no reflection found, that's okay
      if (error.code === 'PGRST116') {
        return { success: true, data: null, source: 'supabase' };
      }
      console.error('Error fetching today reflection:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching today reflection:', error);
    return { success: false, error };
  }
}
