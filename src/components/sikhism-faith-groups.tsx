import React from 'react';
import { Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useSocialMedia } from './social-media-context';

interface SikhismFaithGroupsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function SikhismFaithGroups({ onNavigate }: SikhismFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const sikhismGroup = faithGroups.find(g => g.id === 'sikhism-group');
  
  if (!sikhismGroup) return null;

  const handleGroupAction = () => {
    if (sikhismGroup.isJoined) {
      leaveGroup(sikhismGroup.id);
    } else {
      joinGroup(sikhismGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: sikhismGroup.id });
  };

  return (
    <section className="py-16 px-4 sm:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/70 backdrop-blur-xl border-[#D4895C]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(212,137,92,0.15)] rounded-3xl">
          {/* Hero Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
            <img 
              src={sikhismGroup.coverPhoto}
              alt="Sikhism Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#D4895C] to-[#c07a50] backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-white text-sm font-medium">{sikhismGroup.type}</span>
            </div>
          </div>

          <div className="p-6">
            {/* Group Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4895C] to-[#c07a50] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="16" textAnchor="middle" fill="white">☬</text>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{sikhismGroup.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {sikhismGroup.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-white/40 text-center shadow-sm">
                <Users className="w-5 h-5 text-[#D4895C] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{sikhismGroup.memberCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Members</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-white/40 text-center shadow-sm">
                <MessageCircle className="w-5 h-5 text-[#D4895C] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{sikhismGroup.postCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Posts</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-white/40 text-center shadow-sm">
                <TrendingUp className="w-5 h-5 text-[#D4895C] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">Active</div>
                <div className="text-gray-500 text-xs">Now</div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="mb-6 bg-white/40 backdrop-blur-sm p-4 rounded-xl border-2 border-white/50">
              <h4 className="text-[#D4895C] text-sm font-semibold mb-3">Community Guidelines</h4>
              <ul className="space-y-2">
                {sikhismGroup.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-[#D4895C] mt-0.5">•</span>
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
                  sikhismGroup.isJoined
                    ? 'bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900'
                    : 'bg-gradient-to-r from-[#D4895C] to-[#c07a50] hover:from-[#c07a50] hover:to-[#D4895C] text-white shadow-[0_4px_20px_rgba(212,137,92,0.25)]'
                } transition-all duration-300`}
              >
                {sikhismGroup.isJoined ? 'Leave Group' : 'Join Group'}
              </Button>
              <Button
                onClick={handleViewGroup}
                variant="outline"
                className="border-2 border-[#D4895C] text-[#D4895C] hover:bg-[#D4895C]/10 sm:w-auto transition-all duration-300"
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