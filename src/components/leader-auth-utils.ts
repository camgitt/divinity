// Helper functions for Verified Leader authentication

export interface LeaderSession {
  id: string;
  email: string;
  name: string;
  status: 'verified' | 'pending' | 'rejected';
  signedInAt: string;
}

/**
 * Check if a leader is currently signed in
 */
export function isLeaderSignedIn(): boolean {
  try {
    const session = localStorage.getItem('divinityagi_leader_session');
    if (!session) return false;
    
    const leaderData: LeaderSession = JSON.parse(session);
    return leaderData.status === 'verified';
  } catch (error) {
    console.error('Error checking leader sign-in status:', error);
    return false;
  }
}

/**
 * Get the current leader session
 */
export function getLeaderSession(): LeaderSession | null {
  try {
    const session = localStorage.getItem('divinityagi_leader_session');
    if (!session) return null;
    
    return JSON.parse(session);
  } catch (error) {
    console.error('Error getting leader session:', error);
    return null;
  }
}

/**
 * Sign out the current leader
 */
export function signOutLeader(): void {
  try {
    localStorage.removeItem('divinityagi_leader_session');
  } catch (error) {
    console.error('Error signing out leader:', error);
  }
}

/**
 * Check if leader session is still valid (within 30 days)
 */
export function isLeaderSessionValid(): boolean {
  try {
    const session = getLeaderSession();
    if (!session) return false;
    
    const signedInDate = new Date(session.signedInAt);
    const now = new Date();
    const daysDiff = (now.getTime() - signedInDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return daysDiff < 30; // Session valid for 30 days
  } catch (error) {
    console.error('Error validating leader session:', error);
    return false;
  }
}
