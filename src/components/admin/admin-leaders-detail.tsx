import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, CheckCircle2, Calendar, Mail, User, FileText, XCircle, Check } from 'lucide-react';
import { getSupabaseClient } from '../services/supabase-client';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface AdminLeadersDetailProps {
  onBack: () => void;
}

interface LeaderApplication {
  id: string;
  user_id: string;
  application_type: string;
  status: string;
  full_name: string;
  email: string;
  faith_tradition: string;
  credentials: string;
  bio: string;
  ministry_name?: string;
  ministry_website?: string;
  verification_documents?: string[];
  created_at: string;
  reviewed_at?: string;
}

export const AdminLeadersDetail: React.FC<AdminLeadersDetailProps> = ({ onBack }) => {
  const [applications, setApplications] = useState<LeaderApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        console.warn('Supabase not configured');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('verified_leader_applications')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('👔 Leader Applications - Query result:', { data, error, count: data?.length });
      console.log('👔 Pending applications:', data?.filter(app => app.status === 'pending').length);

      if (error) {
        console.error('Error fetching applications:', error);
      } else {
        setApplications(data || []);
      }
    } catch (error) {
      console.error('Exception fetching applications:', error);
    }
    setLoading(false);
  };

  const handleApprove = async (applicationId: string, userId: string) => {
    const supabase = await getSupabaseClient();
    if (!supabase) return;

    try {
      // Update application status
      const { error: appError } = await supabase
        .from('verified_leader_applications')
        .update({ 
          status: 'approved',
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (appError) throw appError;

      // Update user's verified leader status
      const { error: userError } = await supabase
        .from('users')
        .update({ 
          is_verified_leader: true,
          verified_leader_type: 'ministry'
        })
        .eq('id', userId);

      if (userError) throw userError;

      toast.success('Application approved!');
      loadApplications();
    } catch (error) {
      console.error('Error approving application:', error);
      toast.error('Failed to approve application');
    }
  };

  const handleReject = async (applicationId: string) => {
    const supabase = await getSupabaseClient();
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('verified_leader_applications')
        .update({ 
          status: 'rejected',
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;

      toast.success('Application rejected');
      loadApplications();
    } catch (error) {
      console.error('Error rejecting application:', error);
      toast.error('Failed to reject application');
    }
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(a => a.status === filter);

  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ministry': return 'bg-purple-500/20 text-purple-400 border-purple-400';
      case 'individual': return 'bg-cyan-500/20 text-cyan-400 border-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 pt-6 pb-8 px-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-8 h-8 text-white" />
          <h1 className="text-white text-3xl font-['Poppins',sans-serif] font-semibold">
            Verified Leader Applications
          </h1>
        </div>
        <p className="text-white/80 font-['Raleway',sans-serif]">
          {pendingCount} pending applications
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-yellow-600 to-orange-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Pending</div>
            <div className="text-2xl text-white font-semibold">{pendingCount}</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Approved</div>
            <div className="text-2xl text-white font-semibold">{approvedCount}</div>
          </Card>
          <Card className="bg-gradient-to-br from-red-600 to-pink-600 p-4 border-0">
            <div className="text-sm text-white/70 mb-1">Rejected</div>
            <div className="text-2xl text-white font-semibold">{rejectedCount}</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter('pending')}
            variant={filter === 'pending' ? 'default' : 'outline'}
            className={filter === 'pending' ? 'bg-[#7A4FFF]' : 'border-[#1E3A5F] text-white hover:bg-[#7A4FFF]/20'}
          >
            Pending ({pendingCount})
          </Button>
          <Button
            onClick={() => setFilter('approved')}
            variant={filter === 'approved' ? 'default' : 'outline'}
            className={filter === 'approved' ? 'bg-[#7A4FFF]' : 'border-[#1E3A5F] text-white hover:bg-[#7A4FFF]/20'}
          >
            Approved ({approvedCount})
          </Button>
          <Button
            onClick={() => setFilter('rejected')}
            variant={filter === 'rejected' ? 'default' : 'outline'}
            className={filter === 'rejected' ? 'bg-[#7A4FFF]' : 'border-[#1E3A5F] text-white hover:bg-[#7A4FFF]/20'}
          >
            Rejected ({rejectedCount})
          </Button>
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-[#7A4FFF]' : 'border-[#1E3A5F] text-white hover:bg-[#7A4FFF]/20'}
          >
            All ({applications.length})
          </Button>
        </div>

        {/* Applications List */}
        {loading ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <div className="text-slate-400">Loading applications...</div>
          </Card>
        ) : filteredApplications.length === 0 ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <div className="text-slate-400">No applications found</div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#162844] border-[#1E3A5F] p-5 hover:border-[#7A4FFF] transition-colors">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white text-lg font-medium">{app.full_name}</h3>
                          <Badge variant="outline" className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                          <Badge variant="outline" className={getTypeColor(app.application_type)}>
                            {app.application_type}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {app.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {app.faith_tradition}
                          </div>
                          {app.ministry_name && (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              {app.ministry_name}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Applied {new Date(app.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      {app.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleApprove(app.id, app.user_id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(app.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-400 hover:bg-red-500/20"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Details */}
                    <div className="space-y-3 pt-3 border-t border-slate-700">
                      <div>
                        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Credentials
                        </div>
                        <p className="text-slate-300 text-sm">{app.credentials}</p>
                      </div>
                      
                      <div>
                        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Bio
                        </div>
                        <p className="text-slate-300 text-sm">{app.bio}</p>
                      </div>
                      
                      {app.ministry_website && (
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Website</div>
                          <a 
                            href={app.ministry_website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 text-sm hover:underline"
                          >
                            {app.ministry_website}
                          </a>
                        </div>
                      )}
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