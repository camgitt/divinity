import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAdminMonitoring, AdminEvent, EventSeverity } from './admin-monitoring-context';
import { AdminSubscriptionManagement } from './admin-subscription-management';
import { AdminUsersDetail } from './admin/admin-users-detail';
import { AdminSignupsDetail } from './admin/admin-signups-detail';
import { AdminRevenueDetail } from './admin/admin-revenue-detail';
import { AdminErrorsDetail } from './admin/admin-errors-detail';
import { AdminLeadersDetail } from './admin/admin-leaders-detail';
import { AdminSubscriptionsDetail } from './admin/admin-subscriptions-detail';
import { getSupabaseClient } from './services/supabase-client';
import {
  ArrowLeft,
  Users,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Activity,
  Calendar,
  Mail,
  RefreshCw,
  Download,
  Trash2,
  Bell,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardPageProps {
  onBack: () => void;
}

type DetailView = 'users' | 'signups' | 'revenue' | 'errors' | 'leaders' | 'subscriptions' | null;

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onBack }) => {
  const {
    events,
    analytics,
    getRecentEvents,
    getEventsByType,
    clearEvents,
    refreshAnalytics
  } = useAdminMonitoring();

  const [filter, setFilter] = useState<'all' | EventSeverity>('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [detailView, setDetailView] = useState<DetailView>(null);
  const [pendingLeaderApps, setPendingLeaderApps] = useState(0);

  // Fetch pending leader applications count
  useEffect(() => {
    const fetchPendingLeaderApps = async () => {
      const supabase = await getSupabaseClient();
      if (!supabase) return;

      try {
        const { count, error } = await supabase
          .from('verified_leader_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        if (!error && count !== null) {
          console.log('📋 Pending leader applications:', count);
          setPendingLeaderApps(count);
        }
      } catch (error) {
        console.error('Error fetching pending leader apps:', error);
      }
    };

    fetchPendingLeaderApps();
  }, []);

  // If showing a detail view, render that component
  if (detailView === 'users') {
    return <AdminUsersDetail onBack={() => setDetailView(null)} />;
  }
  if (detailView === 'signups') {
    return <AdminSignupsDetail onBack={() => setDetailView(null)} />;
  }
  if (detailView === 'revenue') {
    return <AdminRevenueDetail onBack={() => setDetailView(null)} />;
  }
  if (detailView === 'errors') {
    return <AdminErrorsDetail onBack={() => setDetailView(null)} />;
  }
  if (detailView === 'leaders') {
    return <AdminLeadersDetail onBack={() => setDetailView(null)} />;
  }
  if (detailView === 'subscriptions') {
    return <AdminSubscriptionsDetail onBack={() => setDetailView(null)} />;
  }

  const handleRefresh = () => {
    refreshAnalytics();
    toast.success('Analytics refreshed!');
  };

  const handleClearEvents = () => {
    if (window.confirm('Are you sure you want to clear all events? This cannot be undone.')) {
      clearEvents();
      toast.success('All events cleared');
    }
  };

  const handleExport = () => {
    const data = {
      analytics,
      events: events.slice(0, 500), // Export last 500 events
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Admin report exported!');
  };

  // Filter events
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.severity === filter);

  // Get severity icon and color
  const getSeverityDisplay = (severity: EventSeverity) => {
    switch (severity) {
      case 'critical':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' };
      case 'error':
        return { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
      case 'info':
        return { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' };
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7A4FFF] to-purple-700 pt-6 pb-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {typeof window !== 'undefined' && localStorage.getItem('divinityagi_admin_session') ? 'Logout' : 'Back'}
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleExport}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-white text-3xl mb-2">Admin Dashboard</h1>
          <p className="text-purple-200">System Monitoring & Analytics</p>
          
          {/* Supabase Status Indicator */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <div className={`w-2 h-2 rounded-full ${
              typeof window !== 'undefined' && localStorage.getItem('divinityagi_admin_session') 
                ? 'bg-green-400 animate-pulse' 
                : 'bg-blue-400'
            }`} />
            <span className="text-xs text-white/90">
              Supabase Connected
            </span>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="px-6 py-6">
        {/* Access Info Banner */}
        <Card className="bg-blue-500/10 border-blue-500/30 mb-6">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-blue-400 font-medium mb-1">Admin Panel Access</h3>
                <p className="text-sm text-slate-300 mb-2">
                  You can access this admin dashboard using any of these URLs:
                </p>
                <ul className="text-xs text-slate-400 space-y-1 ml-4">
                  <li>• <code className="bg-slate-800 px-2 py-0.5 rounded">?tab=admin</code> (URL parameter)</li>
                  <li>• <code className="bg-slate-800 px-2 py-0.5 rounded">/admin</code> (URL path)</li>
                  <li>• <code className="bg-slate-800 px-2 py-0.5 rounded">#admin</code> (URL hash)</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#162844]/80 border border-[#1E3A5F]/60 p-1 inline-flex">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-[#7A4FFF] data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="subscriptions"
              className="data-[state=active]:bg-[#7A4FFF] data-[state=active]:text-white"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className="data-[state=active]:bg-[#7A4FFF] data-[state=active]:text-white"
            >
              <Bell className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            label="Total Users"
            value={analytics.totalUsers}
            subtitle={`${analytics.activeUsers} active`}
            color="from-blue-500 to-cyan-500"
            onClick={() => setDetailView('users')}
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="New Signups (7d)"
            value={analytics.newSignups7d}
            subtitle={`${analytics.newSignups24h} today`}
            color="from-green-500 to-emerald-500"
            onClick={() => setDetailView('signups')}
          />
          <MetricCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Revenue (Est.)"
            value={`${analytics.revenueEstimate.toFixed(2)}`}
            subtitle={`${analytics.totalSubscriptions} paid`}
            color="from-yellow-500 to-orange-500"
            onClick={() => setDetailView('revenue')}
          />
          <MetricCard
            icon={<AlertTriangle className="w-6 h-6" />}
            label="Error Rate"
            value={`${analytics.errorRate}%`}
            subtitle="Last 1000 events"
            color="from-red-500 to-pink-500"
            onClick={() => setDetailView('errors')}
          />
        </div>

        {/* Verification Requests Metric */}
        <div className="mb-6">
          <MetricCard
            icon={<CheckCircle2 className="w-6 h-6" />}
            label="Pending Verified Leader Applications"
            value={pendingLeaderApps}
            subtitle="Awaiting review"
            color="from-purple-500 to-violet-500"
            onClick={() => setDetailView('leaders')}
          />
        </div>

            {/* Subscription Breakdown */}
            <Card className="bg-[#162844] border-[#1E3A5F] p-6">
              <h3 className="text-white mb-4">Subscriptions by Tier</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-white mb-1">{analytics.subscriptionsByTier.seeker}</div>
                  <div className="text-sm text-slate-400">Seeker (Free)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-white mb-1">{analytics.subscriptionsByTier.subscriber}</div>
                  <div className="text-sm text-slate-400">Subscriber (Free)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-green-400 mb-1">{analytics.subscriptionsByTier.devotee}</div>
                  <div className="text-sm text-slate-400">Devotee ($12.99)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-[#C9A882] mb-1">{analytics.subscriptionsByTier.mystic}</div>
                  <div className="text-sm text-slate-400">Mystic ($24.99)</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <AdminSubscriptionManagement />
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card className="bg-[#162844] border-[#1E3A5F] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Recent Events</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={handleClearEvents}
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Severity Filter */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button
                  onClick={() => setFilter('all')}
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className={filter === 'all' ? 'bg-[#7A4FFF]' : ''}
                >
                  All ({events.length})
                </Button>
                <Button
                  onClick={() => setFilter('critical')}
                  variant={filter === 'critical' ? 'default' : 'outline'}
                  size="sm"
                  className={filter === 'critical' ? 'bg-red-500' : ''}
                >
                  Critical ({events.filter(e => e.severity === 'critical').length})
                </Button>
                <Button
                  onClick={() => setFilter('error')}
                  variant={filter === 'error' ? 'default' : 'outline'}
                  size="sm"
                  className={filter === 'error' ? 'bg-orange-500' : ''}
                >
                  Error ({events.filter(e => e.severity === 'error').length})
                </Button>
                <Button
                  onClick={() => setFilter('warning')}
                  variant={filter === 'warning' ? 'default' : 'outline'}
                  size="sm"
                  className={filter === 'warning' ? 'bg-yellow-500' : ''}
                >
                  Warning ({events.filter(e => e.severity === 'warning').length})
                </Button>
                <Button
                  onClick={() => setFilter('info')}
                  variant={filter === 'info' ? 'default' : 'outline'}
                  size="sm"
                  className={filter === 'info' ? 'bg-blue-500' : ''}
                >
                  Info ({events.filter(e => e.severity === 'info').length})
                </Button>
              </div>

              {/* Events List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No events to display</p>
                  </div>
                ) : (
                  filteredEvents.slice(0, 100).map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                )}
              </div>

              {filteredEvents.length > 100 && (
                <div className="text-center mt-4 text-sm text-slate-400">
                  Showing 100 of {filteredEvents.length} events
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
  color: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, subtitle, color, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card className={`bg-gradient-to-br ${color} p-4 border-0 cursor-pointer`} onClick={onClick}>
      <div className="flex items-center gap-2 mb-2 text-white/80">
        {icon}
      </div>
      <div className="text-2xl text-white mb-1">
        {value}
      </div>
      <div className="text-sm text-white/70">{label}</div>
      <div className="text-xs text-white/60 mt-1">{subtitle}</div>
    </Card>
  </motion.div>
);

// Event Card Component
interface EventCardProps {
  event: AdminEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const display = getSeverityDisplay(event.severity);
  const Icon = display.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${display.bg} border border-${display.color}/20 rounded-lg p-4`}
    >
      <div className="flex items-start gap-3">
        <div className={`${display.color} mt-1`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="text-white">{event.title}</h4>
            <Badge
              variant="outline"
              className={`${display.color} border-current text-xs`}
            >
              {event.type.replace('_', ' ')}
            </Badge>
            {event.notificationSent && (
              <Badge
                variant="outline"
                className="text-green-400 border-green-400 text-xs"
              >
                <Mail className="w-3 h-3 mr-1" />
                Sent
              </Badge>
            )}
          </div>
          <p className="text-slate-300 text-sm mb-2">{event.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(event.timestamp).toLocaleString()}
            </span>
            {event.userEmail && (
              <span className="flex items-center gap-1 truncate">
                <Users className="w-3 h-3" />
                {event.userEmail}
              </span>
            )}
          </div>
          {event.metadata && Object.keys(event.metadata).length > 0 && (
            <details className="mt-2">
              <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
                View metadata
              </summary>
              <pre className="text-xs text-slate-300 mt-2 p-2 bg-black/20 rounded overflow-x-auto">
                {JSON.stringify(event.metadata, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to get severity display
const getSeverityDisplay = (severity: EventSeverity) => {
  switch (severity) {
    case 'critical':
      return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' };
    case 'error':
      return { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' };
    case 'warning':
      return { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    case 'info':
      return { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' };
  }
};