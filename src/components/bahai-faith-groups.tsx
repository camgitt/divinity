import React from 'react';
import { Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useSocialMedia } from './social-media-context';

interface BahaiFaithGroupsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function BahaiFaithGroups({ onNavigate }: BahaiFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const bahaiGroup = faithGroups.find(g => g.id === 'bahai-group');
  
  if (!bahaiGroup) return null;

  const handleGroupAction = () => {
    if (bahaiGroup.isJoined) {
      leaveGroup(bahaiGroup.id);
    } else {
      joinGroup(bahaiGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: bahaiGroup.id });
  };

  return (
    <section className="py-16 px-4 sm:px-6 relative z-20">
      {/* Background flower image with dark overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Card className="bg-white/70 backdrop-blur-xl border-[#9370B0]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(147,112,176,0.15)] rounded-3xl">
          {/* Hero Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
            <img 
              src={bahaiGroup.coverPhoto}
              alt="Bahá'í Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#9370B0] to-[#7d5c9a] backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-white text-sm font-medium">{bahaiGroup.type}</span>
            </div>
          </div>

          <div className="p-6">
            {/* Group Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9370B0] to-[#7d5c9a] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="16" textAnchor="middle" fill="white">✯</text>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-gray-900 mb-2" style={{ fontFamily: "'Butler', serif" }}>{bahaiGroup.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {bahaiGroup.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-[#9370B0]/20 text-center">
                <Users className="w-5 h-5 text-[#9370B0] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{bahaiGroup.memberCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Members</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-[#9370B0]/20 text-center">
                <MessageCircle className="w-5 h-5 text-[#9370B0] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{bahaiGroup.postCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Posts</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-[#9370B0]/20 text-center">
                <TrendingUp className="w-5 h-5 text-[#9370B0] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">Active</div>
                <div className="text-gray-500 text-xs">Now</div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="mb-6 bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-[#9370B0]/20">
              <h4 className="text-[#7d5c9a] text-sm font-semibold mb-3">Community Guidelines</h4>
              <ul className="space-y-2">
                {bahaiGroup.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-[#9370B0] mt-0.5">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleGroupAction}
                className={`flex-1 ${
                  bahaiGroup.isJoined
                    ? 'bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900'
                    : 'bg-gradient-to-r from-[#9370B0] to-[#7d5c9a] hover:from-[#7d5c9a] hover:to-[#9370B0] text-white shadow-[0_4px_20px_rgba(147,112,176,0.25)]'
                } transition-all duration-300`}
              >
                {bahaiGroup.isJoined ? 'Leave Group' : 'Join Group'}
              </Button>
              <Button
                onClick={handleViewGroup}
                variant="outline"
                className="border-2 border-[#9370B0] text-[#9370B0] hover:bg-[#9370B0]/10 sm:w-auto transition-all duration-300"
              >
                View Group <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}