/**
 * Shared Supabase Client Singleton
 * 
 * This ensures only ONE Supabase client instance is created
 * across the entire application to avoid multiple GoTrueClient warnings.
 */

// Get Supabase configuration from environment variables with fallback
const getEnvVar = (key: string, fallback: string = ''): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback;
  }
  return fallback;
};

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL', 'https://wukzavslddamlxoksxuo.supabase.co');
const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1a3phdnNsZGRhbWx4b2tzeHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Njk2NjYsImV4cCI6MjA3ODU0NTY2Nn0.oa3v9vuTLK4T4IXWzWJAExV3dnjfoXwkPwnXw6Ff6tw');

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.includes('supabase.co') && SUPABASE_ANON_KEY.length > 20;
};

// Singleton Supabase client instance
let supabaseClient: any = null;
let isInitializing = false;

/**
 * Get the shared Supabase client instance
 * Creates it once and reuses it for all subsequent calls
 */
export const getSupabaseClient = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured - operations will fail gracefully');
    return null;
  }

  // Return existing client if already created
  if (supabaseClient) {
    return supabaseClient;
  }

  // Prevent multiple simultaneous initializations
  if (isInitializing) {
    // Wait for initialization to complete
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return supabaseClient;
  }

  isInitializing = true;

  try {
    // Dynamic import to avoid loading if not needed
    const { createClient } = await import('@supabase/supabase-js');
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'divinityagi-auth-token', // Unique storage key to prevent conflicts
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      }
    });
    console.log('✅ Supabase client initialized (singleton)');
  } finally {
    isInitializing = false;
  }

  return supabaseClient;
};

/**
 * Reset the Supabase client (for development/testing only)
 */
export const resetSupabaseClient = () => {
  if (supabaseClient) {
    console.log('⚠️ Resetting Supabase client');
    supabaseClient = null;
  }
};

/**
 * Export configuration status
 */
export function getSupabaseStatus() {
  return {
    configured: isSupabaseConfigured(),
    url: isSupabaseConfigured() ? SUPABASE_URL : 'Not configured',
    mode: isSupabaseConfigured() ? 'Supabase Sync' : 'LocalStorage Only'
  };
}