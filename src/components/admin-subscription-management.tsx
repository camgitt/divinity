import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  Calendar,
  Search,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  getAllActiveSubscriptions,
  getAllPayments,
  getSubscriptionMetrics,
  getRevenueMetrics,
  getSubscriptionCounts,
  type Subscription,
  type Payment,
  type SubscriptionMetrics,
  type RevenueMetrics
} from './services/supabase-subscription-service';
import { formatCurrency, getTierDisplayName } from './services/stripe-service';

export const AdminSubscriptionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [metrics, setMetrics] = useState<SubscriptionMetrics | null>(null);
  const [revenue, setRevenue] = useState<RevenueMetrics | null>(null);
  const [tierCounts, setTierCounts] = useState<Array<{ tier: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [subsData, paymentsData, metricsData, revenueData, countsData] = await Promise.all([
        getAllActiveSubscriptions(),
        getAllPayments(100),
        getSubscriptionMetrics(),
        getRevenueMetrics(30),
        getSubscriptionCounts()
      ]);

      setSubscriptions(subsData);
      setPayments(paymentsData);
      setMetrics(metricsData);
      setRevenue(revenueData);
      setTierCounts(countsData);
    } catch (error) {
      console.error('Error loading subscription data:', error);
      toast.error('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
    toast.success('Data refreshed!');
  };

  const handleExport = () => {
    const data = {
      subscriptions,
      payments,
      metrics,
      revenue,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscription-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report exported!');
  };

  // Filter subscriptions
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = searchTerm === '' || 
      sub.stripe_customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.tier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'trialing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'past_due': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'canceled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  // Get tier badge color
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enlightened': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'devotee': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'subscriber': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'seeker': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  // Calculate growth rate
  const calculateGrowthRate = () => {
    if (!revenue) return 0;
    // Mock calculation - in production, compare with previous period
    return 12.5;
  };

  const growthRate = calculateGrowthRate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-[#7A4FFF] animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading subscription data...</p>
        </div>
      </div>
    );
  }

  // Check if there's no data (Supabase not configured)
  const isSupabaseConfigured = subscriptions.length > 0 || payments.length > 0 || metrics !== null || revenue !== null;

  return (
    <div className="space-y-6">
      {/* Supabase Configuration Warning */}
      {!isSupabaseConfigured && (
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-yellow-500 font-medium mb-1">Supabase Not Configured</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The subscription management system requires Supabase to be configured. Please set up your Supabase project and add the credentials to access live subscription and payment data.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-white mb-1">Subscription Management</h2>
          <p className="text-slate-400">Monitor and manage all subscriptions and payments</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="border-[#1E3A5F] bg-[#162844]/50 text-white hover:bg-[#1E3A5F]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="border-[#1E3A5F] bg-[#162844]/50 text-white hover:bg-[#1E3A5F]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<DollarSign className="w-6 h-6" />}
          label="Monthly Revenue"
          value={formatCurrency(metrics?.mrr || 0)}
          subtitle={`${growthRate > 0 ? '+' : ''}${growthRate.toFixed(1)}% this month`}
          trend={growthRate > 0 ? 'up' : 'down'}
          color="from-green-500 to-emerald-500"
        />
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          label="Active Subscribers"
          value={metrics?.active_count || 0}
          subtitle={`${metrics?.trialing_count || 0} in trial`}
          color="from-blue-500 to-cyan-500"
        />
        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Total Revenue (30d)"
          value={formatCurrency(revenue?.total_revenue || 0)}
          subtitle={`${revenue?.transaction_count || 0} transactions`}
          color="from-purple-500 to-pink-500"
        />
        <MetricCard
          icon={<CreditCard className="w-6 h-6" />}
          label="Past Due"
          value={metrics?.past_due_count || 0}
          subtitle={`${metrics?.canceled_count || 0} canceled`}
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Tier Distribution */}
      <Card className="bg-[#162844]/60 border-[#1E3A5F]/60 p-6">
        <h3 className="text-lg text-white mb-4">Subscription Tier Distribution</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tierCounts.map((item) => (
            <div
              key={item.tier}
              className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-4 text-center"
            >
              <Badge className={`${getTierColor(item.tier)} mb-2`}>
                {getTierDisplayName(item.tier as any)}
              </Badge>
              <div className="text-2xl text-white">{item.count}</div>
              <div className="text-xs text-slate-400 mt-1">subscribers</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#162844]/60 border border-[#1E3A5F]/60">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-[#162844]/60 border-[#1E3A5F]/60 p-6">
            <h3 className="text-lg text-white mb-4">Revenue Breakdown (30 days)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-slate-400">Subscription Revenue</div>
                <div className="text-2xl text-white">{formatCurrency(revenue?.subscription_revenue || 0)}</div>
                <div className="text-xs text-slate-500">
                  {((revenue?.subscription_revenue || 0) / (revenue?.total_revenue || 1) * 100).toFixed(1)}% of total
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-slate-400">Token Purchases</div>
                <div className="text-2xl text-white">{formatCurrency(revenue?.token_revenue || 0)}</div>
                <div className="text-xs text-slate-500">
                  {((revenue?.token_revenue || 0) / (revenue?.total_revenue || 1) * 100).toFixed(1)}% of total
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-slate-400">Total Transactions</div>
                <div className="text-2xl text-white">{revenue?.transaction_count || 0}</div>
                <div className="text-xs text-slate-500">
                  Avg: {formatCurrency((revenue?.total_revenue || 0) / (revenue?.transaction_count || 1))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <Card className="bg-[#162844]/60 border-[#1E3A5F]/60 p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search by customer ID or tier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#1E3A5F]/40 border-[#1E3A5F]/60 text-white"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-lg text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trialing">Trialing</option>
                <option value="past_due">Past Due</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredSubscriptions.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No subscriptions found</p>
                </div>
              ) : (
                filteredSubscriptions.map((sub) => (
                  <SubscriptionCard key={sub.id} subscription={sub} />
                ))
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card className="bg-[#162844]/60 border-[#1E3A5F]/60 p-6">
            <div className="space-y-3">
              {payments.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No payments found</p>
                </div>
              ) : (
                payments.map((payment) => (
                  <PaymentCard key={payment.id} payment={payment} />
                ))
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
  trend?: 'up' | 'down';
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, subtitle, trend, color }) => {
  return (
    <Card className="bg-[#162844]/60 border-[#1E3A5F]/60 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          </div>
        )}
      </div>
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className="text-2xl text-white mb-1">{value}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </Card>
  );
};

// Subscription Card Component
interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'trialing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'past_due': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'canceled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enlightened': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'devotee': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'subscriber': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'seeker': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-4 hover:border-[#7A4FFF]/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getTierColor(subscription.tier)}>
              {getTierDisplayName(subscription.tier)}
            </Badge>
            <Badge className={getStatusColor(subscription.status)}>
              {subscription.status}
            </Badge>
            {subscription.cancel_at_period_end && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                Canceling
              </Badge>
            )}
          </div>
          <div className="text-sm text-slate-400">
            Customer: <span className="text-slate-300">{subscription.stripe_customer_id}</span>
          </div>
        </div>
        <div className="text-right text-sm">
          <div className="text-slate-400">Period End</div>
          <div className="text-white">
            {new Date(subscription.current_period_end).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#1E3A5F]/40">
        <div>
          <div className="text-xs text-slate-500">Created</div>
          <div className="text-sm text-slate-300">
            {new Date(subscription.created_at).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Period Start</div>
          <div className="text-sm text-slate-300">
            {new Date(subscription.current_period_start).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Subscription ID</div>
          <div className="text-sm text-slate-300 truncate">
            {subscription.stripe_subscription_id.substring(0, 12)}...
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Card Component
interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'refunded': return <AlertCircle className="w-5 h-5 text-orange-400" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-4 hover:border-[#7A4FFF]/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {getStatusIcon(payment.status)}
          <div>
            <div className="text-white mb-1">
              {formatCurrency(payment.amount / 100, payment.currency.toUpperCase())}
            </div>
            <div className="text-sm text-slate-400">
              {payment.payment_type.replace('_', ' ').toUpperCase()}
              {payment.token_amount && ` (${payment.token_amount} tokens)`}
            </div>
          </div>
        </div>
        <div className="text-right text-sm">
          <div className="text-slate-400">
            {new Date(payment.created_at).toLocaleDateString()}
          </div>
          <div className="text-slate-500 text-xs">
            {new Date(payment.created_at).toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#1E3A5F]/40">
        <div>
          <div className="text-xs text-slate-500">Payment Method</div>
          <div className="text-sm text-slate-300">
            {payment.brand || 'N/A'} {payment.last4 ? `••••${payment.last4}` : ''}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Customer</div>
          <div className="text-sm text-slate-300 truncate">
            {payment.stripe_customer_id.substring(0, 16)}...
          </div>
        </div>
      </div>
    </div>
  );
};