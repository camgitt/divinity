import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, TrendingUp, Calendar, Mail, Users, Clock } from 'lucide-react';
import { getSupabaseClient } from '../services/supabase-client';
import { motion } from 'motion/react';

interface AdminSignupsDetailProps {
  onBack: () => void;
}

interface Signup {
  id: string;
  email: string;
  full_name: string;
  username: string;
  faith_tradition: string;
  created_at: string;
}

export const AdminSignupsDetail: React.FC<AdminSignupsDetailProps> = ({ onBack }) => {
  const [signups24h, setSignups24h] = useState<Signup[]>([]);
  const [signups7d, setSignups7d] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'24h' | '7d'>('24h');

  useEffect(() => {
    loadSignups();
  }, []);

  const loadSignups = async () => {
    setLoading(true);
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        console.warn('Supabase not configured');
        setLoading(false);
        return;
      }

      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

      // Get signups from last 24 hours
      const { data: data24h, error: error24h } = await supabase
        .from('users')
        .select('*')
        .gte('created_at', twentyFourHoursAgo)
        .order('created_at', { ascending: false });

      console.log('📈 Signups 24h - Query result:', { data: data24h, error: error24h, count: data24h?.length });

      if (!error24h) {
        setSignups24h(data24h || []);
      } else {
        console.error('Error fetching 24h signups:', error24h);
      }

      // Get signups from last 7 days
      const { data: data7d, error: error7d } = await supabase
        .from('users')
        .select('*')
        .gte('created_at', sevenDaysAgo)
        .order('created_at', { ascending: false });

      console.log('📈 Signups 7d - Query result:', { data: data7d, error: error7d, count: data7d?.length });

      if (!error7d) {
        setSignups7d(data7d || []);
      } else {
        console.error('Error fetching 7d signups:', error7d);
      }
    } catch (error) {
      console.error('Exception fetching signups:', error);
    }
    setLoading(false);
  };

  const activeSignups = activeTab === '24h' ? signups24h : signups7d;

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 pt-6 pb-8 px-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-white" />
          <h1 className="text-white text-3xl font-['Poppins',sans-serif] font-semibold">
            New Signups
          </h1>
        </div>
        <p className="text-white/80 font-['Raleway',sans-serif]">
          Recent user registrations
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab('24h')}
            variant={activeTab === '24h' ? 'default' : 'outline'}
            className={activeTab === '24h' ? 'bg-[#7A4FFF]' : 'border-[#1E3A5F] text-white hover:bg-[#7A4FFF]/20'}
          >
            Last 24 Hours ({signups24h.length})
          </Button>
          <Button
            onClick={() => setActiveTab('7d')}
            variant={activeTab === '7d' ? 'default' : 'outline'}
            className={activeTab === '7d' ? 'bg-[#7A4FFF]' : 'border-[#1E3A5F] text-white hover:bg-[#7A4FFF]/20'}
          >
            Last 7 Days ({signups7d.length})
          </Button>
        </div>

        {/* Signups List */}
        {loading ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <div className="text-slate-400">Loading signups...</div>
          </Card>
        ) : activeSignups.length === 0 ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <div className="text-slate-400">No new signups in this period</div>
          </Card>
        ) : (
          <div className="space-y-3">
            {activeSignups.map((signup, index) => (
              <motion.div
                key={signup.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#162844] border-[#1E3A5F] p-4 hover:border-green-500 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-medium">{signup.full_name}</h3>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-400">
                          New
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {signup.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          @{signup.username}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {signup.faith_tradition}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">{getTimeAgo(signup.created_at)}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-500 mt-2">
                        Registered: {new Date(signup.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};