/**
 * Chat Service - Handles all chat session operations with Supabase
 */

import { getSupabaseClient } from './supabase-client';

export interface ChatSession {
  id?: string;
  user_id: string;
  avatar_id: string;
  avatar_name: string;
  faith_tradition: string;
  title?: string;
  tokens_used?: number;
  message_count?: number;
  started_at?: string;
  ended_at?: string | null;
  duration_seconds?: number | null;
}

export interface ChatMessage {
  id?: string;
  session_id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  tokens_used?: number;
  created_at?: string;
}

/**
 * Create a new chat session
 */
export async function createChatSession(session: ChatSession) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - chat session not saved');
    return { success: false, source: 'none' };
  }

  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([{
        user_id: session.user_id,
        avatar_id: session.avatar_id,
        avatar_name: session.avatar_name,
        faith_tradition: session.faith_tradition,
        title: session.title || 'New Conversation',
        tokens_used: session.tokens_used || 0,
        message_count: session.message_count || 0,
        started_at: session.started_at || new Date().toISOString(),
        ended_at: session.ended_at || null,
        duration_seconds: session.duration_seconds || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating chat session:', error);
      return { success: false, error };
    }

    console.log('✅ Chat session created:', data);
    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception creating chat session:', error);
    return { success: false, error };
  }
}

/**
 * Update chat session
 */
export async function updateChatSession(sessionId: string, updates: Partial<ChatSession>) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating chat session:', error);
      return { success: false, error };
    }

    console.log('✅ Chat session updated:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception updating chat session:', error);
    return { success: false, error };
  }
}

/**
 * End a chat session
 */
export async function endChatSession(sessionId: string, tokensUsed: number, messageCount: number, durationSeconds: number) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .update({
        tokens_used: tokensUsed,
        message_count: messageCount,
        ended_at: new Date().toISOString(),
        duration_seconds: durationSeconds
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      console.error('Error ending chat session:', error);
      return { success: false, error };
    }

    console.log('✅ Chat session ended:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception ending chat session:', error);
    return { success: false, error };
  }
}

/**
 * Get user's chat sessions
 */
export async function getUserChatSessions(userId: string, limit = 50) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false, source: 'none' };

  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching chat sessions:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching chat sessions:', error);
    return { success: false, error };
  }
}

/**
 * Create a chat message
 */
export async function createChatMessage(message: ChatMessage) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        session_id: message.session_id,
        user_id: message.user_id,
        role: message.role,
        content: message.content,
        tokens_used: message.tokens_used || 0,
        created_at: message.created_at || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating chat message:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception creating chat message:', error);
    return { success: false, error };
  }
}

/**
 * Get messages for a session
 */
export async function getSessionMessages(sessionId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false, source: 'none' };

  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching messages:', error);
    return { success: false, error };
  }
}
