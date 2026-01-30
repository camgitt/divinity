import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ArrowLeft, CreditCard, Search, Calendar, DollarSign, User, Mail } from 'lucide-react';
import { getSupabaseClient } from '../services/supabase-client';
import { motion } from 'motion/react';

interface AdminSubscriptionsDetailProps {
  onBack: () => void;
}

interface Subscription {
  id: string;
  user_id: string;
  tier_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
}

interface SubscriptionWithUser extends Subscription {
  user?: {
    email: string;
    full_name: string;
    username: string;
  };
}

export const AdminSubscriptionsDetail: React.FC<AdminSubscriptionsDetailProps> = ({ onBack }) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    setLoading(true);
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        console.warn('Supabase not configured');
        setLoading(false);
        return;
      }

      // Get active subscriptions
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          user:users(email, full_name, username)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscriptions:', error);
      } else {
        // Transform data to flatten user object
        const transformed = (data || []).map((sub: any) => ({
          ...sub,
          user: sub.user
        }));
        setSubscriptions(transformed);
      }
    } catch (error) {
      console.error('Exception fetching subscriptions:', error);
    }
    setLoading(false);
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.user?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = tierFilter === 'all' || sub.tier_id === tierFilter;
    
    return matchesSearch && matchesTier;
  });

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'subscriber':
        return { name: 'Subscriber', price: '$9.99', color: 'bg-blue-500/20 text-blue-400 border-blue-400' };
      case 'devotee':
        return { name: 'Devotee', price: '$19.99', color: 'bg-green-500/20 text-green-400 border-green-400' };
      case 'enlightened':
        return { name: 'Enlightened', price: '$34.99', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-400' };
      default:
        return { name: 'Seeker', price: 'Free', color: 'bg-gray-500/20 text-gray-400 border-gray-400' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'canceled': return 'bg-red-500/20 text-red-400 border-red-400';
      case 'past_due': return 'bg-orange-500/20 text-orange-400 border-orange-400';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-400';
    }
  };

  // Calculate stats
  const subscriberCount = subscriptions.filter(s => s.tier_id === 'subscriber').length;
  const devoteeCount = subscriptions.filter(s => s.tier_id === 'devotee').length;
  const enlightenedCount = subscriptions.filter(s => s.tier_id === 'enlightened').length;
  
  const monthlyRevenue = 
    (subscriberCount * 9.99) + 
    (devoteeCount * 19.99) + 
    (enlightenedCount * 34.99);

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 pt-6 pb-8 px-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="w-8 h-8 text-white" />
          <h1 className="text-white text-3xl font-['Poppins',sans-serif] font-semibold">
            Active Subscriptions
          </h1>
        </div>
        <p className="text-white/80 font-['Raleway',sans-serif]">
          {subscriptions.length} active subscriptions • ${monthlyRevenue.toFixed(2)} MRR
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Subscriber</div>
            <div className="text-2xl text-white font-semibold">{subscriberCount}</div>
            <div className="text-xs text-white/60 mt-1">${(subscriberCount * 9.99).toFixed(2)}/mo</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Devotee</div>
            <div className="text-2xl text-white font-semibold">{devoteeCount}</div>
            <div className="text-xs text-white/60 mt-1">${(devoteeCount * 19.99).toFixed(2)}/mo</div>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-600 to-orange-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Enlightened</div>
            <div className="text-2xl text-white font-semibold">{enlightenedCount}</div>
            <div className="text-xs text-white/60 mt-1">${(enlightenedCount * 34.99).toFixed(2)}/mo</div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#162844] border-[#1E3A5F] text-white placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setTierFilter('all')}
              variant={tierFilter === 'all' ? 'default' : 'outline'}
              className={tierFilter === 'all' ? 'bg-[#7A4FFF]' : 'border-[#1E3A5F] text-white'}
            >
              All
            </Button>
            <Button
              onClick={() => setTierFilter('subscriber')}
              variant={tierFilter === 'subscriber' ? 'default' : 'outline'}
              className={tierFilter === 'subscriber' ? 'bg-blue-600' : 'border-[#1E3A5F] text-white'}
            >
              Subscriber
            </Button>
            <Button
              onClick={() => setTierFilter('devotee')}
              variant={tierFilter === 'devotee' ? 'default' : 'outline'}
              className={tierFilter === 'devotee' ? 'bg-green-600' : 'border-[#1E3A5F] text-white'}
            >
              Devotee
            </Button>
            <Button
              onClick={() => setTierFilter('enlightened')}
              variant={tierFilter === 'enlightened' ? 'default' : 'outline'}
              className={tierFilter === 'enlightened' ? 'bg-yellow-600' : 'border-[#1E3A5F] text-white'}
            >
              Enlightened
            </Button>
          </div>
        </div>

        {/* Subscriptions List */}
        {loading ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <div className="text-slate-400">Loading subscriptions...</div>
          </Card>
        ) : filteredSubscriptions.length === 0 ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <div className="text-slate-400">No subscriptions found</div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredSubscriptions.map((sub, index) => {
              const tierInfo = getTierInfo(sub.tier_id);
              
              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="bg-[#162844] border-[#1E3A5F] p-4 hover:border-[#7A4FFF] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-medium">{sub.user?.full_name || 'Unknown User'}</h3>
                          <Badge variant="outline" className={tierInfo.color}>
                            {tierInfo.name} • {tierInfo.price}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(sub.status)}>
                            {sub.status}
                          </Badge>
                          {sub.cancel_at_period_end && (
                            <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-400">
                              Canceling
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {sub.user?.email || 'N/A'}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            @{sub.user?.username || 'N/A'}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Member since {new Date(sub.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                          <div>Period: {new Date(sub.current_period_start).toLocaleDateString()} - {new Date(sub.current_period_end).toLocaleDateString()}</div>
                          <div>Stripe ID: {sub.stripe_subscription_id}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
