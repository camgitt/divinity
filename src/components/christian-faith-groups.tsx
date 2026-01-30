import React from 'react';
import { Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useSocialMedia } from './social-media-context';

interface ChristianFaithGroupsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function ChristianFaithGroups({ onNavigate }: ChristianFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const christianityGroup = faithGroups.find(g => g.id === 'christianity-group');
  
  console.log('ChristianFaithGroups - faithGroups:', faithGroups);
  console.log('ChristianFaithGroups - christianityGroup:', christianityGroup);
  
  if (!christianityGroup) {
    console.warn('Christianity group not found!');
    return null;
  }

  const handleGroupAction = () => {
    if (christianityGroup.isJoined) {
      leaveGroup(christianityGroup.id);
    } else {
      joinGroup(christianityGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: christianityGroup.id });
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-[rgba(255,255,255,0)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 
            className="text-3xl sm:text-4xl mb-3 bg-gradient-to-r from-[#C85C5C] via-[#B04A4A] to-[#C85C5C] bg-clip-text text-transparent"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
          >
            Christian Community
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Share faith, prayer requests, and biblical wisdom with fellow Christians
          </p>
        </div>

        {/* Community Card */}
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden">
          {/* Cover Image with Badge */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img 
              src={christianityGroup.coverPhoto}
              alt="Christianity Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#E53935] px-4 py-1.5 rounded-full shadow-lg">
              <span className="text-white text-sm font-semibold">{christianityGroup.type}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 bg-white min-h-[400px]" style={{ position: 'relative', zIndex: 10 }}>
            {/* Debug marker - remove after testing */}
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500" style={{ zIndex: 9999 }}></div>
            
            {/* Group Header with Icon */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#D4A574] to-[#C17A4F] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-2xl sm:text-3xl text-white">✝</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 
                  className="text-xl sm:text-2xl text-gray-900 mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
                >
                  {christianityGroup.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  {christianityGroup.description}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#E6C9A8]/20 to-[#FFD369]/10 p-3 sm:p-4 rounded-xl border border-[#A67C52]/30 text-center transition-all hover:border-[#C17A4F] hover:shadow-md">
                <Users className="w-5 h-5 text-[#C17A4F] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold text-base sm:text-lg" style={{ fontFamily: 'Raleway, sans-serif' }}>{christianityGroup.memberCount.toLocaleString()}</div>
                <div className="text-gray-600 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>Members</div>
              </div>
              <div className="bg-gradient-to-br from-[#E6C9A8]/20 to-[#FFD369]/10 p-3 sm:p-4 rounded-xl border border-[#A67C52]/30 text-center transition-all hover:border-[#C17A4F] hover:shadow-md">
                <MessageCircle className="w-5 h-5 text-[#C17A4F] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold text-base sm:text-lg" style={{ fontFamily: 'Raleway, sans-serif' }}>{christianityGroup.postCount.toLocaleString()}</div>
                <div className="text-gray-600 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>Posts</div>
              </div>
              <div className="bg-gradient-to-br from-[#E6C9A8]/20 to-[#FFD369]/10 p-3 sm:p-4 rounded-xl border border-[#A67C52]/30 text-center transition-all hover:border-[#C17A4F] hover:shadow-md">
                <TrendingUp className="w-5 h-5 text-[#C17A4F] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold text-base sm:text-lg" style={{ fontFamily: 'Raleway, sans-serif' }}>Active</div>
                <div className="text-gray-600 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>Now</div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="mb-6 bg-gradient-to-br from-[#E6C9A8]/10 to-transparent p-4 sm:p-5 rounded-xl border border-[#A67C52]/30">
              <h4 
                className="text-[#C17A4F] text-sm sm:text-base mb-3"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
              >
                Community Guidelines
              </h4>
              <ul className="space-y-2.5">
                {christianityGroup.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    <span className="text-[#C17A4F] mt-0.5 flex-shrink-0">•</span>
                    <span className="flex-1">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGroupAction}
                className={`flex-1 h-12 sm:h-14 rounded-xl transition-all duration-300 active:scale-[0.98] ${
                  christianityGroup.isJoined
                    ? 'bg-white border-2 border-[#A67C52]/50 hover:border-[#C17A4F] text-[#5B4636] hover:bg-[#E6C9A8]/10'
                    : 'bg-gradient-to-r from-[#D4A574] via-[#E6C9A8] to-[#F4E4D7] hover:from-[#C17A4F] hover:via-[#D4A574] hover:to-[#E6C9A8] border-2 border-[#A67C52]/30 text-[#5B4636] shadow-lg hover:shadow-[0px_8px_30px_0px_rgba(212,165,116,0.4)]'
                }`}
                style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.02em' }}
              >
                {christianityGroup.isJoined ? 'Leave Group' : 'Join Group'}
              </button>
              <button
                onClick={handleViewGroup}
                className="sm:w-auto px-6 h-12 sm:h-14 rounded-xl bg-white border-2 border-[#A67C52]/50 hover:border-[#C17A4F] text-[#5B4636] hover:bg-[#E6C9A8]/10 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.02em' }}
              >
                View Group <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}