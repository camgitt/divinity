/**
 * App Initialization Hook
 * 
 * This hook ensures that when a user signs in or the app loads:
 * 1. User session is restored from Supabase Auth
 * 2. User data is loaded from Supabase
 * 3. All contexts are properly initialized
 */

import { useEffect, useState } from 'react';
import { getSupabaseClient } from './services/supabase-client';
import { getUser, updateLastLogin } from './services/user-service';
import { getUserPreferences } from './services/user-service';
import { getTokenBalance } from './services/user-service';

export interface InitializedUser {
  id: string;
  email: string;
  full_name: string;
  username: string;
  faith_tradition: string;
  preferences?: any;
  tokenBalance?: any;
}

export function useAppInitialization() {
  const [user, setUser] = useState<InitializedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeApp = async () => {
      try {
        const supabase = await getSupabaseClient();
        
        if (!supabase) {
          console.warn('⚠️ Supabase not configured - using localStorage only');
          
          // Try to load from localStorage
          const storedUser = localStorage.getItem('divinityagi_user');
          if (storedUser && mounted) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          }
          
          setLoading(false);
          return;
        }

        // Get current session from Supabase Auth
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError(sessionError.message);
          setLoading(false);
          return;
        }

        if (!session) {
          console.log('No active session');
          setLoading(false);
          return;
        }

        console.log('✅ Active session found:', session.user.email);

        // Load user data from database
        const userResult = await getUser(session.user.id);
        
        if (userResult.success && userResult.data && mounted) {
          setUser(userResult.data);
          
          // Update last login
          await updateLastLogin(session.user.id);
          
          // Load preferences
          const prefsResult = await getUserPreferences(session.user.id);
          if (prefsResult.success) {
            setUser(prev => prev ? { ...prev, preferences: prefsResult.data } : null);
          }
          
          // Load token balance
          const balanceResult = await getTokenBalance(session.user.id);
          if (balanceResult.success) {
            setUser(prev => prev ? { ...prev, tokenBalance: balanceResult.data } : null);
          }
          
          console.log('✅ User data fully loaded from Supabase');
        } else {
          console.warn('User not found in database:', userResult.error);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error initializing app:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    };

    initializeApp();

    return () => {
      mounted = false;
    };
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    let mounted = true;
    let subscription: any;

    const setupAuthListener = async () => {
      const supabase = await getSupabaseClient();
      if (!supabase) return;

      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event);

        if (event === 'SIGNED_IN' && session && mounted) {
          // User signed in, load their data
          const userResult = await getUser(session.user.id);
          if (userResult.success && userResult.data) {
            setUser(userResult.data);
          }
        } else if (event === 'SIGNED_OUT' && mounted) {
          // User signed out, clear data
          setUser(null);
          localStorage.removeItem('divinityagi_user');
        }
      });

      subscription = data.subscription;
    };

    setupAuthListener();

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user
  };
}
