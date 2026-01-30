/* 
 * ⚠️ DEPRECATED - This file is no longer used
 * 
 * Supabase credentials are now loaded from environment variables.
 * See .env.example and ENV_SETUP_GUIDE.md for setup instructions.
 * 
 * Please use:
 *   import.meta.env.VITE_SUPABASE_URL
 *   import.meta.env.VITE_SUPABASE_ANON_KEY
 * 
 * This file is kept for backwards compatibility only.
 */

// Legacy exports - kept for compatibility
// These pull from environment variables now
export const projectId = import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0] || "wukzavslddamlxoksxuo"
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1a3phdnNsZGRhbWx4b2tzeHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Njk2NjYsImV4cCI6MjA3ODU0NTY2Nn0.oa3v9vuTLK4T4IXWzWJAExV3dnjfoXwkPwnXw6Ff6tw"
