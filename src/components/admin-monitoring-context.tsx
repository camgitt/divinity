import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';
import { 
  fetchEventsFromSupabase, 
  fetchAnalyticsFromSupabase, 
  trackEventToSupabase,
  subscribeToEvents
} from './services/supabase-admin-service';
import { fetchRealAnalytics, saveAnalyticsSnapshot } from './services/admin-analytics-service';

// EmailJS Configuration - DISABLED
// Email notifications have been disabled for this deployment
const ENABLE_EMAIL_NOTIFICATIONS = false;

// Event types for monitoring
export type AdminEventType = 
  | 'user_signup'
  | 'subscription_upgrade'
  | 'subscription_downgrade'
  | 'subscription_cancel'
  | 'error_reported'
  | 'crash_detected'
  | 'payment_success'
  | 'payment_failed'
  | 'high_usage'
  | 'abuse_detected'
  | 'verification_request'
  | 'support_ticket'
  | 'email_confirmation_sent'
  | 'email_confirmation_resent'
  | 'email_confirmed'
  | 'email_confirmation_failed';

// Event severity levels
export type EventSeverity = 'info' | 'warning' | 'error' | 'critical';

// Admin event interface
export interface AdminEvent {
  id: string;
  type: AdminEventType;
  severity: EventSeverity;
  timestamp: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  title: string;
  description: string;
  metadata?: Record<string, any>;
  notificationSent: boolean;
}

// Usage analytics interface
export interface UsageAnalytics {
  totalUsers: number;
  activeUsers: number;
  newSignups24h: number;
  newSignups7d: number;
  totalSubscriptions: number;
  subscriptionsByTier: {
    seeker: number;
    subscriber: number;
    devotee: number;
    mystic: number;
  };
  revenueEstimate: number;
  errorRate: number;
  lastUpdated: string;
}

interface AdminMonitoringContextType {
  events: AdminEvent[];
  analytics: UsageAnalytics;
  trackEvent: (
    type: AdminEventType,
    severity: EventSeverity,
    title: string,
    description: string,
    metadata?: Record<string, any>
  ) => Promise<void>;
  trackUserSignup: (userEmail: string, userName: string, tier: string) => Promise<void>;
  trackSubscriptionChange: (
    userEmail: string,
    userName: string,
    fromTier: string,
    toTier: string,
    action: 'upgrade' | 'downgrade' | 'cancel'
  ) => Promise<void>;
  trackError: (errorMessage: string, errorStack?: string, userId?: string) => Promise<void>;
  trackPayment: (
    userEmail: string,
    amount: number,
    status: 'success' | 'failed',
    tier: string
  ) => Promise<void>;
  trackEmailConfirmation: (
    userEmail: string,
    action: 'sent' | 'resent' | 'confirmed' | 'failed',
    metadata?: Record<string, any>
  ) => Promise<void>;
  getRecentEvents: (limit?: number) => AdminEvent[];
  getEventsByType: (type: AdminEventType) => AdminEvent[];
  clearEvents: () => void;
  refreshAnalytics: () => void;
}

const AdminMonitoringContext = createContext<AdminMonitoringContextType | undefined>(undefined);

export const useAdminMonitoring = () => {
  const context = useContext(AdminMonitoringContext);
  if (!context) {
    throw new Error('useAdminMonitoring must be used within AdminMonitoringProvider');
  }
  return context;
};

interface AdminMonitoringProviderProps {
  children: ReactNode;
}

export const AdminMonitoringProvider: React.FC<AdminMonitoringProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [analytics, setAnalytics] = useState<UsageAnalytics>({
    totalUsers: 0,
    activeUsers: 0,
    newSignups24h: 0,
    newSignups7d: 0,
    totalSubscriptions: 0,
    subscriptionsByTier: {
      seeker: 0,
      subscriber: 0,
      devotee: 0,
      mystic: 0
    },
    revenueEstimate: 0,
    errorRate: 0,
    lastUpdated: new Date().toISOString()
  });

  // Load events from Supabase on mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const storedEvents = await fetchEventsFromSupabase();
        setEvents(storedEvents);
      } catch (e) {
        console.error('Failed to load admin events:', e);
      }

      refreshAnalytics();
    };

    loadEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe to real-time events from Supabase
  useEffect(() => {
    let channel: any;
    
    const setupSubscription = async () => {
      channel = await subscribeToEvents((newEvent: AdminEvent) => {
        setEvents(prev => [newEvent, ...prev].slice(0, 1000)); // Keep last 1000 events
        refreshAnalytics();
      });
    };

    setupSubscription();

    return () => {
      if (channel && channel.unsubscribe) {
        channel.unsubscribe();
      }
    };
  }, []);

  // Send email notification to admins
  const sendEmailNotification = async (event: AdminEvent): Promise<boolean> => {
    // Email notifications have been disabled for this deployment
    console.debug('Email notifications disabled.');
    return true; // Return true to not block event tracking
  };

  // Track a generic admin event
  const trackEvent = async (
    type: AdminEventType,
    severity: EventSeverity,
    title: string,
    description: string,
    metadata?: Record<string, any>
  ): Promise<void> => {
    const event: AdminEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity,
      timestamp: new Date().toISOString(),
      title,
      description,
      metadata,
      notificationSent: false
    };

    // Get current user info if available
    try {
      const userStr = localStorage.getItem('divinityagi_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        event.userId = user.id;
        event.userEmail = user.email;
        event.userName = user.name;
      }
    } catch (e) {
      // User not logged in or error parsing
    }

    // Send email notification
    const notificationSent = await sendEmailNotification(event);
    event.notificationSent = notificationSent;

    // Add to events list
    setEvents(prev => [event, ...prev].slice(0, 1000)); // Keep last 1000 events

    // Refresh analytics
    refreshAnalytics();

    // Track event to Supabase
    await trackEventToSupabase(event);
  };

  // Track user signup
  const trackUserSignup = async (
    userEmail: string,
    userName: string,
    tier: string
  ): Promise<void> => {
    await trackEvent(
      'user_signup',
      'info',
      'New User Signup',
      `${userName} (${userEmail}) signed up with ${tier} tier`,
      {
        email: userEmail,
        name: userName,
        tier,
        source: 'registration'
      }
    );
  };

  // Track subscription changes
  const trackSubscriptionChange = async (
    userEmail: string,
    userName: string,
    fromTier: string,
    toTier: string,
    action: 'upgrade' | 'downgrade' | 'cancel'
  ): Promise<void> => {
    const severity: EventSeverity = action === 'cancel' ? 'warning' : 'info';
    const type: AdminEventType = 
      action === 'upgrade' ? 'subscription_upgrade' :
      action === 'downgrade' ? 'subscription_downgrade' :
      'subscription_cancel';

    await trackEvent(
      type,
      severity,
      `Subscription ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      `${userName} (${userEmail}) ${action}d from ${fromTier} to ${toTier}`,
      {
        email: userEmail,
        name: userName,
        fromTier,
        toTier,
        action
      }
    );
  };

  // Track errors
  const trackError = async (
    errorMessage: string,
    errorStack?: string,
    userId?: string
  ): Promise<void> => {
    await trackEvent(
      'error_reported',
      'error',
      'Application Error',
      errorMessage,
      {
        stack: errorStack,
        userId,
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    );
  };

  // Track payments
  const trackPayment = async (
    userEmail: string,
    amount: number,
    status: 'success' | 'failed',
    tier: string
  ): Promise<void> => {
    await trackEvent(
      status === 'success' ? 'payment_success' : 'payment_failed',
      status === 'failed' ? 'error' : 'info',
      `Payment ${status === 'success' ? 'Successful' : 'Failed'}`,
      `Payment of $${amount} for ${tier} tier - ${status}`,
      {
        email: userEmail,
        amount,
        status,
        tier
      }
    );
  };

  // Track email confirmation events
  const trackEmailConfirmation = async (
    userEmail: string,
    action: 'sent' | 'resent' | 'confirmed' | 'failed',
    metadata?: Record<string, any>
  ): Promise<void> => {
    const eventTypeMap = {
      'sent': 'email_confirmation_sent' as AdminEventType,
      'resent': 'email_confirmation_resent' as AdminEventType,
      'confirmed': 'email_confirmed' as AdminEventType,
      'failed': 'email_confirmation_failed' as AdminEventType
    };

    const severityMap = {
      'sent': 'info' as EventSeverity,
      'resent': 'info' as EventSeverity,
      'confirmed': 'info' as EventSeverity,
      'failed': 'warning' as EventSeverity
    };

    const titleMap = {
      'sent': 'Confirmation Email Sent',
      'resent': 'Confirmation Email Resent',
      'confirmed': 'Email Confirmed',
      'failed': 'Email Confirmation Failed'
    };

    const descriptionMap = {
      'sent': `Confirmation email sent to ${userEmail}`,
      'resent': `Confirmation email resent to ${userEmail}`,
      'confirmed': `User ${userEmail} confirmed their email address`,
      'failed': `Failed to send confirmation email to ${userEmail}`
    };

    await trackEvent(
      eventTypeMap[action],
      severityMap[action],
      titleMap[action],
      descriptionMap[action],
      {
        email: userEmail,
        action,
        ...metadata
      }
    );
  };

  // Get recent events
  const getRecentEvents = (limit: number = 50): AdminEvent[] => {
    return events.slice(0, limit);
  };

  // Get events by type
  const getEventsByType = (type: AdminEventType): AdminEvent[] => {
    return events.filter(e => e.type === type);
  };

  // Clear all events
  const clearEvents = (): void => {
    setEvents([]);
    localStorage.removeItem('divinityagi_admin_events');
  };

  // Calculate analytics from Supabase data
  const refreshAnalytics = async (): Promise<void> => {
    try {
      console.log('🔄 Fetching real analytics from Supabase...');
      
      // Fetch real analytics directly from database
      const realAnalytics = await fetchRealAnalytics();
      
      // Update state with real data
      setAnalytics({
        ...realAnalytics,
        lastUpdated: new Date().toISOString()
      });
      
      // Save snapshot to database for historical tracking
      await saveAnalyticsSnapshot(realAnalytics);
      
      console.log('✅ Analytics updated with real Supabase data:', realAnalytics);
    } catch (error) {
      console.error('Failed to refresh analytics:', error);
      
      // Fallback to basic calculation if database fetch fails
      const now = Date.now();
      const day24h = 24 * 60 * 60 * 1000;
      const day7d = 7 * day24h;

      const newSignups24h = events.filter(
        e => e.type === 'user_signup' && 
        new Date(e.timestamp).getTime() > now - day24h
      ).length;

      const newSignups7d = events.filter(
        e => e.type === 'user_signup' && 
        new Date(e.timestamp).getTime() > now - day7d
      ).length;

      // Calculate error rate from events
      const totalEvents = events.length;
      const errorEvents = events.filter(e => 
        e.severity === 'error' || e.severity === 'critical'
      ).length;
      const errorRate = totalEvents > 0 ? (errorEvents / totalEvents) * 100 : 0;

      setAnalytics({
        totalUsers: 0,
        activeUsers: 0,
        newSignups24h,
        newSignups7d,
        totalSubscriptions: 0,
        subscriptionsByTier: {
          seeker: 0,
          subscriber: 0,
          devotee: 0,
          mystic: 0
        },
        revenueEstimate: 0,
        errorRate: Math.round(errorRate * 100) / 100,
        lastUpdated: new Date().toISOString()
      });
    }
  };

  // Auto-refresh analytics every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAnalytics();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError(event.message, event.error?.stack);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(`Unhandled Promise Rejection: ${event.reason}`);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AdminMonitoringContextType = {
    events,
    analytics,
    trackEvent,
    trackUserSignup,
    trackSubscriptionChange,
    trackError,
    trackPayment,
    trackEmailConfirmation,
    getRecentEvents,
    getEventsByType,
    clearEvents,
    refreshAnalytics
  };

  return (
    <AdminMonitoringContext.Provider value={value}>
      {children}
    </AdminMonitoringContext.Provider>
  );
};