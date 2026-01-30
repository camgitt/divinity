/**
 * Quiet Space Service - Handles meditation/quiet space sessions with Supabase
 */

import { getSupabaseClient } from './supabase-client';

export interface QuietSpaceSession {
  id?: string;
  user_id: string;
  space_type: string;
  ambient_sound?: string | null;
  duration_seconds?: number;
  completed?: boolean;
  started_at?: string;
  ended_at?: string | null;
}

/**
 * Create a new quiet space session
 */
export async function createQuietSpaceSession(session: QuietSpaceSession) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - quiet space session not saved');
    return { success: false, source: 'none' };
  }

  try {
    const { data, error } = await supabase
      .from('quiet_space_sessions')
      .insert([{
        user_id: session.user_id,
        space_type: session.space_type,
        ambient_sound: session.ambient_sound || null,
        duration_seconds: session.duration_seconds || 0,
        completed: session.completed ?? false,
        started_at: session.started_at || new Date().toISOString(),
        ended_at: session.ended_at || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating quiet space session:', error);
      return { success: false, error };
    }

    console.log('✅ Quiet space session created:', data);
    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception creating quiet space session:', error);
    return { success: false, error };
  }
}

/**
 * End a quiet space session
 */
export async function endQuietSpaceSession(sessionId: string, durationSeconds: number) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    const { data, error } = await supabase
      .from('quiet_space_sessions')
      .update({
        duration_seconds: durationSeconds,
        completed: true,
        ended_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      console.error('Error ending quiet space session:', error);
      return { success: false, error };
    }

    console.log('✅ Quiet space session ended:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception ending quiet space session:', error);
    return { success: false, error };
  }
}

/**
 * Get user's quiet space sessions
 */
export async function getUserQuietSpaceSessions(userId: string, limit = 50) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false, source: 'none' };

  try {
    const { data, error } = await supabase
      .from('quiet_space_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching quiet space sessions:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching quiet space sessions:', error);
    return { success: false, error };
  }
}
