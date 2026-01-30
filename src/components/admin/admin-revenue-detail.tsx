import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, DollarSign, Calendar, CreditCard, TrendingUp, User } from 'lucide-react';
import { getSupabaseClient } from '../services/supabase-client';
import { motion } from 'motion/react';

interface AdminRevenueDetailProps {
  onBack: () => void;
}

interface Payment {
  id: string;
  stripe_payment_intent_id: string;
  stripe_customer_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_type: string;
  description: string;
  created_at: string;
}

interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  subscriptionRevenue: number;
  tokenRevenue: number;
  paymentCount: number;
}

export const AdminRevenueDetail: React.FC<AdminRevenueDetailProps> = ({ onBack }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    subscriptionRevenue: 0,
    tokenRevenue: 0,
    paymentCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {
    setLoading(true);
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        console.warn('Supabase not configured');
        setLoading(false);
        return;
      }

      // Get all successful payments
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('status', 'succeeded')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payments:', error);
      } else {
        const paymentData = data || [];
        setPayments(paymentData);

        // Calculate stats
        const total = paymentData.reduce((sum, p) => sum + (p.amount / 100), 0);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const monthly = paymentData
          .filter(p => new Date(p.created_at) >= thirtyDaysAgo)
          .reduce((sum, p) => sum + (p.amount / 100), 0);
        
        const subscriptionRev = paymentData
          .filter(p => p.payment_type === 'subscription')
          .reduce((sum, p) => sum + (p.amount / 100), 0);
        
        const tokenRev = paymentData
          .filter(p => p.payment_type === 'token_purchase')
          .reduce((sum, p) => sum + (p.amount / 100), 0);

        setStats({
          totalRevenue: total,
          monthlyRevenue: monthly,
          subscriptionRevenue: subscriptionRev,
          tokenRevenue: tokenRev,
          paymentCount: paymentData.length
        });
      }
    } catch (error) {
      console.error('Exception fetching revenue:', error);
    }
    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-400';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'subscription': return 'bg-purple-500/20 text-purple-400 border-purple-400';
      case 'token_purchase': return 'bg-cyan-500/20 text-cyan-400 border-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 pt-6 pb-8 px-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-3 mb-2">
          <DollarSign className="w-8 h-8 text-white" />
          <h1 className="text-white text-3xl font-['Poppins',sans-serif] font-semibold">
            Revenue Details
          </h1>
        </div>
        <p className="text-white/80 font-['Raleway',sans-serif]">
          Payment history and revenue analytics
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Total Revenue</div>
            <div className="text-2xl text-white font-semibold">{formatCurrency(stats.totalRevenue)}</div>
          </Card>
          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Last 30 Days</div>
            <div className="text-2xl text-white font-semibold">{formatCurrency(stats.monthlyRevenue)}</div>
          </Card>
          <Card className="bg-gradient-to-br from-purple-600 to-violet-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Subscriptions</div>
            <div className="text-2xl text-white font-semibold">{formatCurrency(stats.subscriptionRevenue)}</div>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-600 to-teal-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Token Sales</div>
            <div className="text-2xl text-white font-semibold">{formatCurrency(stats.tokenRevenue)}</div>
          </Card>
        </div>

        {/* Payments List */}
        <Card className="bg-[#162844] border-[#1E3A5F] p-6">
          <h3 className="text-white text-lg mb-4">All Payments ({stats.paymentCount})</h3>
          
          {loading ? (
            <div className="text-slate-400 text-center py-8">Loading payments...</div>
          ) : payments.length === 0 ? (
            <div className="text-slate-400 text-center py-8">No payments found</div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="bg-[#0B1426] border-[#1E3A5F] p-4 hover:border-[#C9A882] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white font-medium text-lg">
                            {formatCurrency(payment.amount / 100)}
                          </span>
                          <Badge variant="outline" className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                          <Badge variant="outline" className={getTypeColor(payment.payment_type)}>
                            {payment.payment_type === 'subscription' ? 'Subscription' : 'Token Purchase'}
                          </Badge>
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-2">{payment.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-3 h-3" />
                            {payment.stripe_payment_intent_id.substring(0, 20)}...
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {payment.stripe_customer_id}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(payment.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
