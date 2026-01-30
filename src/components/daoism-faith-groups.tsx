import React from 'react';
import { Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useSocialMedia } from './social-media-context';

interface DaoismFaithGroupsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function DaoismFaithGroups({ onNavigate }: DaoismFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const taoismGroup = faithGroups.find(g => g.id === 'taoism-group');
  
  if (!taoismGroup) return null;

  const handleGroupAction = () => {
    if (taoismGroup.isJoined) {
      leaveGroup(taoismGroup.id);
    } else {
      joinGroup(taoismGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: taoismGroup.id });
  };

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="relative border-[#5A5A5A]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(90,90,90,0.15)] rounded-2xl sm:rounded-3xl">
          {/* Flower Background - Continuous */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1652740125935-2c89e467c7ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGZsb3dlcnMlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2OTQ0MDE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Flower background"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/40 to-slate-900/30 z-[1]" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header Area with Title */}
            <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden flex flex-col sm:flex-row items-center justify-center py-6 sm:py-0 bg-[rgb(169,169,169)]">
              {/* Public Badge */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-[#5A5A5A]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-white/20">
                <span className="text-white text-xs sm:text-sm font-medium">{taoismGroup.type}</span>
              </div>
              
              {/* Yin Yang Icon */}
              <div className="sm:absolute sm:left-6 sm:top-1/2 sm:-translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#5A5A5A] to-[#3A3A3A] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 mb-3 sm:mb-0">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="16" textAnchor="middle" fill="white">☯</text>
                </svg>
              </div>
              
              {/* Title and Description */}
              <div className="text-center px-6 sm:px-24">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 drop-shadow-lg">{taoismGroup.name}</h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-md max-w-md mx-auto">
                  {taoismGroup.description}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 bg-[rgb(169,169,169)]">
              {/* Stats - Glassmorphism Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 -mt-8 sm:-mt-12">
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-[#5A5A5A] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{taoismGroup.memberCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Members</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-[#5A5A5A] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{taoismGroup.postCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Posts</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-[#5A5A5A] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Active</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Now</div>
                </div>
              </div>

              {/* Community Guidelines - Enhanced */}
              <div className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#5A5A5A]/20 shadow-lg">
                <h4 className="text-[#5A5A5A] text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#5A5A5A] rounded-full"></div>
                  Community Guidelines
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {taoismGroup.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                      <span className="text-[#5A5A5A] mt-0.5 font-bold">•</span>
                      <span className="flex-1">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons - Enhanced */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleGroupAction}
                  className={`flex-1 rounded-xl sm:rounded-2xl ${
                    taoismGroup.isJoined
                      ? 'bg-white/70 backdrop-blur-xl border-2 border-white/40 hover:bg-white/90 hover:border-white/60 text-gray-900'
                      : 'bg-gradient-to-r from-[#5A5A5A] to-[#3A3A3A] hover:from-[#3A3A3A] hover:to-[#2A2A2A] text-white shadow-[0_4px_20px_rgba(90,90,90,0.25)] border-2 border-white/20'
                  } transition-all duration-300 font-semibold`}
                >
                  {taoismGroup.isJoined ? 'Leave Group' : 'Join Group'}
                </Button>
                <Button
                  onClick={handleViewGroup}
                  className="bg-white/70 backdrop-blur-xl border-2 border-white/40 text-gray-900 hover:bg-white/90 hover:border-white/60 sm:w-auto transition-all duration-300 rounded-xl sm:rounded-2xl font-semibold"
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