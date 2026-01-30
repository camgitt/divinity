import React from 'react';
import { Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useSocialMedia } from './social-media-context';
import cherryBlossomBgImage from 'figma:asset/3f1faf90a507b2b0ac3e16c02afee425f09ce2f3.png';

interface ShintoFaithGroupsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function ShintoFaithGroups({ onNavigate }: ShintoFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const shintoGroup = faithGroups.find(g => g.id === 'shinto-group');
  
  if (!shintoGroup) return null;

  const handleGroupAction = () => {
    if (shintoGroup.isJoined) {
      leaveGroup(shintoGroup.id);
    } else {
      joinGroup(shintoGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: shintoGroup.id });
  };

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="relative border-[#EA7F6A]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(234,127,106,0.15)] rounded-2xl sm:rounded-3xl bg-[rgb(255,255,255)]">
          {/* Cherry Blossom Background - Continuous */}
          <div className="absolute inset-0 z-0">
            <img 
              src={cherryBlossomBgImage}
              alt="Cherry blossom background"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/50 z-[1]" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header Area with Title */}
            <div className="relative h-48 sm:h-56 overflow-hidden flex flex-col sm:flex-row items-center justify-center py-6 sm:py-0 bg-[rgba(255,255,255,0.37)]">
              {/* Public Badge */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-[#EA7F6A]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-white/20">
                <span className="text-white text-xs sm:text-sm font-medium">{shintoGroup.type}</span>
              </div>
              
              {/* Torii Gate Icon */}
              <div className="sm:absolute sm:left-6 sm:top-1/2 sm:-translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#EA7F6A] to-[#D86F5A] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 mb-3 sm:mb-0">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="18" textAnchor="middle" fill="white">⛩</text>
                </svg>
              </div>
              
              {/* Title and Description */}
              <div className="text-center px-6 sm:px-24">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 drop-shadow-lg">{shintoGroup.name}</h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-md max-w-md mx-auto">
                  {shintoGroup.description}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 bg-[rgba(242,172,142,0.69)]">
              {/* Stats - Glassmorphism Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 -mt-8 sm:-mt-12">
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-[#EA7F6A] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{shintoGroup.memberCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Members</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-[#EA7F6A] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{shintoGroup.postCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Posts</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-[#EA7F6A] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Active</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Now</div>
                </div>
              </div>

              {/* Community Guidelines - Enhanced */}
              <div className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#EA7F6A]/20 shadow-lg">
                <h4 className="text-[#EA7F6A] text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#EA7F6A] rounded-full"></div>
                  Community Guidelines
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {shintoGroup.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                      <span className="text-[#EA7F6A] font-bold mt-0.5 flex-shrink-0">•</span>
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
                    shintoGroup.isJoined
                      ? 'bg-white/70 backdrop-blur-xl border-2 border-gray-300 hover:bg-gray-50/80 text-gray-900 shadow-lg'
                      : 'bg-gradient-to-r from-[#EA7F6A] to-[#D86F5A] hover:from-[#D86F5A] hover:to-[#EA7F6A] text-white shadow-[0_4px_20px_rgba(234,127,106,0.4)] hover:shadow-[0_6px_30px_rgba(234,127,106,0.5)]'
                  } transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {shintoGroup.isJoined ? 'Leave Group' : 'Join Group'}
                </Button>
                <Button
                  onClick={handleViewGroup}
                  variant="outline"
                  className="bg-white/70 backdrop-blur-xl border-2 border-[#EA7F6A] text-[#EA7F6A] hover:bg-[#EA7F6A] hover:text-white py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
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