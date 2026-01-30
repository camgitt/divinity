import React from 'react';
import { Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useSocialMedia } from './social-media-context';
import lotusFlowerBackground from 'figma:asset/583a35bf46cbf3b6115c2128dccd2544399c1a4b.png';

interface BuddhistFaithGroupsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function BuddhistFaithGroups({ onNavigate }: BuddhistFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const buddhistGroup = faithGroups.find(g => g.id === 'buddhism-group');
  
  if (!buddhistGroup) return null;

  const handleGroupAction = () => {
    if (buddhistGroup.isJoined) {
      leaveGroup(buddhistGroup.id);
    } else {
      joinGroup(buddhistGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: buddhistGroup.id });
  };

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="relative border-[#EAB308]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(234,179,8,0.15)] rounded-2xl sm:rounded-3xl">
          {/* Lotus Background - Continuous */}
          <div className="absolute inset-0 z-0">
            <img 
              src={lotusFlowerBackground}
              alt="Lotus flower background"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/50 z-[1]" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header Area with Title */}
            <div className="relative h-80 sm:h-96 overflow-hidden flex flex-col sm:flex-row items-center justify-center py-6 sm:py-0 bg-[rgba(250,250,250,0.37)]">
              {/* Public Badge */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-[#EAB308]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-white/20">
                <span className="text-white text-xs sm:text-sm font-medium">{buddhistGroup.type}</span>
              </div>
              
              {/* Dharma Wheel Icon */}
              <div className="sm:absolute sm:left-6 sm:top-1/2 sm:-translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#EAB308] to-[#CA8A04] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 mb-3 sm:mb-0">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="18" textAnchor="middle" fill="white">☸</text>
                </svg>
              </div>
              
              {/* Title and Description */}
              <div className="text-center px-6 sm:px-24">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 drop-shadow-lg">{buddhistGroup.name}</h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-md max-w-md mx-auto">
                  {buddhistGroup.description}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 bg-[rgb(247,211,120)]">
              {/* Stats - Glassmorphism Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 -mt-8 sm:-mt-12">
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-[#EAB308] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{buddhistGroup.memberCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Members</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-[#EAB308] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{buddhistGroup.postCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Posts</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-[#EAB308] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Active</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Now</div>
                </div>
              </div>

              {/* Community Guidelines - Enhanced */}
              <div className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#EAB308]/20 shadow-lg">
                <h4 className="text-[#EAB308] text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#EAB308] rounded-full"></div>
                  Community Guidelines
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {buddhistGroup.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                      <span className="text-[#EAB308] font-bold mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons - Enhanced */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={handleGroupAction}
                  className={`flex-1 py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-xl ${
                    buddhistGroup.isJoined
                      ? 'bg-white/70 backdrop-blur-xl border-2 border-gray-300 hover:bg-gray-50/80 text-gray-900 shadow-lg'
                      : 'bg-gradient-to-r from-[#EAB308] to-[#CA8A04] hover:from-[#CA8A04] hover:to-[#EAB308] text-white shadow-[0_4px_20px_rgba(234,179,8,0.4)] hover:shadow-[0_6px_30px_rgba(234,179,8,0.5)]'
                  } transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {buddhistGroup.isJoined ? 'Leave Group' : 'Join Group'}
                </Button>
                <Button
                  onClick={handleViewGroup}
                  variant="outline"
                  className="bg-white/70 backdrop-blur-xl border-2 border-[#EAB308] text-[#EAB308] hover:bg-[#EAB308] hover:text-white py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  View Group <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}