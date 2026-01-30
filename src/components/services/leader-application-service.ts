/**
 * Leader Application Service
 * Handles verified leader application submissions to Supabase
 */

import { getSupabaseClient } from './supabase-client';

export interface LeaderApplicationData {
  user_id?: string;
  application_type: 'ministry' | 'individual';
  full_name: string;
  email: string;
  phone?: string;
  faith_tradition: string;
  
  // Individual specific fields
  credentials?: string;
  years_of_service?: number;
  bio?: string;
  
  // Ministry specific fields
  ministry_name?: string;
  ministry_website?: string;
  ministry_size?: string;
  ministry_address?: string;
  
  // Additional metadata
  metadata?: Record<string, any>;
}

/**
 * Create a new verified leader application
 */
export async function createLeaderApplication(applicationData: LeaderApplicationData) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - leader application not saved to database');
    return { success: false, error: 'Supabase not configured', source: 'none' };
  }

  try {
    console.log('📝 Creating leader application:', applicationData.email, applicationData.application_type);
    
    // Insert application into verified_leader_applications table
    const { data, error } = await supabase
      .from('verified_leader_applications')
      .insert([{
        user_id: applicationData.user_id || null, // Can be null for non-registered users
        application_type: applicationData.application_type,
        status: 'pending',
        full_name: applicationData.full_name,
        email: applicationData.email,
        phone: applicationData.phone || null,
        faith_tradition: applicationData.faith_tradition,
        
        // Individual fields
        credentials: applicationData.credentials || null,
        years_of_service: applicationData.years_of_service || null,
        bio: applicationData.bio || null,
        
        // Ministry fields
        ministry_name: applicationData.ministry_name || null,
        ministry_website: applicationData.ministry_website || null,
        ministry_size: applicationData.ministry_size || null,
        ministry_address: applicationData.ministry_address || null,
        
        // Metadata (store all additional data)
        metadata: applicationData.metadata || {},
        
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating leader application:', error);
      return { success: false, error, source: 'supabase' };
    }

    console.log('✅ Leader application created in Supabase:', data);
    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('❌ Exception creating leader application:', error);
    return { success: false, error, source: 'supabase' };
  }
}

/**
 * Get all leader applications
 */
export async function getLeaderApplications(filters?: {
  status?: string;
  application_type?: 'ministry' | 'individual';
}) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    return { success: false, error: 'Supabase not configured', source: 'none' };
  }

  try {
    let query = supabase
      .from('verified_leader_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.application_type) {
      query = query.eq('application_type', filters.application_type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching leader applications:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching leader applications:', error);
    return { success: false, error };
  }
}

/**
 * Update leader application status
 */
export async function updateLeaderApplicationStatus(
  applicationId: string,
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'additional_info_needed',
  reviewNotes?: string,
  rejectionReason?: string
) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const updateData: any = {
      status,
      reviewed_at: new Date().toISOString()
    };

    if (reviewNotes) {
      updateData.review_notes = reviewNotes;
    }

    if (rejectionReason) {
      updateData.rejection_reason = rejectionReason;
    }

    const { data, error } = await supabase
      .from('verified_leader_applications')
      .update(updateData)
      .eq('id', applicationId)
      .select()
      .single();

    if (error) {
      console.error('Error updating leader application:', error);
      return { success: false, error };
    }

    console.log('✅ Leader application status updated:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception updating leader application:', error);
    return { success: false, error };
  }
}

/**
 * Get leader application by ID
 */
export async function getLeaderApplicationById(applicationId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('verified_leader_applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (error) {
      console.error('Error fetching leader application:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception fetching leader application:', error);
    return { success: false, error };
  }
}

/**
 * Get pending leader applications count
 */
export async function getPendingLeaderApplicationsCount() {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    return { success: false, count: 0, error: 'Supabase not configured' };
  }

  try {
    const { count, error } = await supabase
      .from('verified_leader_applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    if (error) {
      console.error('Error counting pending applications:', error);
      return { success: false, count: 0, error };
    }

    return { success: true, count: count || 0 };
  } catch (error) {
    console.error('Exception counting pending applications:', error);
    return { success: false, count: 0, error };
  }
}
