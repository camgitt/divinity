import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ArrowLeft, Users, Search, CheckCircle2, XCircle, Calendar, Mail } from 'lucide-react';
import { getSupabaseClient } from '../services/supabase-client';
import { motion } from 'motion/react';

interface AdminUsersDetailProps {
  onBack: () => void;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  faith_tradition: string;
  status: string;
  is_verified_leader: boolean;
  created_at: string;
  last_login_at: string;
}

export const AdminUsersDetail: React.FC<AdminUsersDetailProps> = ({ onBack }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        console.warn('Supabase not configured');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('👥 Admin Users Detail - Query result:', { data, error, count: data?.length });

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data || []);
        console.log('✅ Users loaded:', data?.length);
      }
    } catch (error) {
      console.error('Exception fetching users:', error);
    }
    setLoading(false);
  };

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-400';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-400';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 pt-6 pb-8 px-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-white" />
          <h1 className="text-white text-3xl font-['Poppins',sans-serif] font-semibold">
            All Users
          </h1>
        </div>
        <p className="text-white/80 font-['Raleway',sans-serif]">
          {users.length} total users
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Search */}
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0B1426] border-[#1E3A5F] text-white placeholder:text-slate-400"
            />
          </div>
        </Card>

        {/* Users List */}
        {loading ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <div className="text-slate-400">Loading users...</div>
          </Card>
        ) : filteredUsers.length === 0 ? (
          <Card className="bg-[#162844] border-[#1E3A5F] p-8 text-center">
            <div className="text-slate-400">No users found</div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#162844] border-[#1E3A5F] p-4 hover:border-[#7A4FFF] transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-medium">{user.full_name}</h3>
                        {user.is_verified_leader && (
                          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Verified Leader
                          </Badge>
                        )}
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          @{user.username}
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {user.faith_tradition}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      
                      {user.last_login_at && (
                        <div className="text-xs text-slate-500 mt-2">
                          Last login: {new Date(user.last_login_at).toLocaleString()}
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