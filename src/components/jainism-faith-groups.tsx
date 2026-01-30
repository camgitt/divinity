import React from 'react';
import { Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useSocialMedia } from './social-media-context';
import blueFlowersImage from 'figma:asset/919d6c04ff947a94531581645e567cf7cb4edfa2.png';

interface JainismFaithGroupsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function JainismFaithGroups({ onNavigate }: JainismFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const jainismGroup = faithGroups.find(g => g.id === 'jainism-group');
  
  if (!jainismGroup) return null;

  const handleGroupAction = () => {
    if (jainismGroup.isJoined) {
      leaveGroup(jainismGroup.id);
    } else {
      joinGroup(jainismGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: jainismGroup.id });
  };

  return (
    <section className="py-16 px-4 sm:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/70 backdrop-blur-xl border-[#B8858F]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(184,133,143,0.15)] rounded-3xl">
          {/* Hero Image - Blue Lotus Flowers */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent z-10" />
            <img 
              src={blueFlowersImage}
              alt="Jainism Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#B8858F] to-[#A6737D] backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-white text-sm font-medium">{jainismGroup.type}</span>
            </div>
          </div>

          <div className="p-6 bg-[rgba(165,86,86,0.52)]">
            {/* Group Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#B8858F] to-[#A6737D] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="16" textAnchor="middle" fill="white">🖐️</text>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Butler', serif" }}>{jainismGroup.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {jainismGroup.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#FFF5F7] p-4 rounded-xl border border-[#B8858F]/20 text-center">
                <Users className="w-5 h-5 text-[#B8858F] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{jainismGroup.memberCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Members</div>
              </div>
              <div className="bg-[#FFF5F7] p-4 rounded-xl border border-[#B8858F]/20 text-center">
                <MessageCircle className="w-5 h-5 text-[#B8858F] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{jainismGroup.postCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Posts</div>
              </div>
              <div className="bg-[#FFF5F7] p-4 rounded-xl border border-[#B8858F]/20 text-center">
                <TrendingUp className="w-5 h-5 text-[#B8858F] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">Active</div>
                <div className="text-gray-500 text-xs">Now</div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="mb-6 bg-[#FFF5F7] p-4 rounded-xl border border-[#B8858F]/20">
              <h4 className="text-[#B8858F] text-sm font-semibold mb-3">Community Guidelines</h4>
              <ul className="space-y-2">
                {jainismGroup.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-[#B8858F] mt-0.5">•</span>
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
                  jainismGroup.isJoined
                    ? 'bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900'
                    : 'bg-gradient-to-r from-[#B8858F] to-[#A6737D] hover:from-[#A6737D] hover:to-[#B8858F] text-white shadow-[0_4px_20px_rgba(184,133,143,0.25)]'
                } transition-all duration-300`}
              >
                {jainismGroup.isJoined ? 'Leave Group' : 'Join Group'}
              </Button>
              <Button
                onClick={handleViewGroup}
                variant="outline"
                className="border-2 border-[#B8858F] text-[#B8858F] hover:bg-[#B8858F]/10 sm:w-auto transition-all duration-300"
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