import React from 'react';
import { Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useSocialMedia } from './social-media-context';
import polytheismTempleImage from 'figma:asset/accb037c8cb348d07830f83e4cb7b69ef5490d7f.png';
import primroseFlowersImage from 'figma:asset/0214ed5b926a67c25741ad03ca84f6f82eed38d8.png';

interface PolytheismFaithGroupsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function PolytheismFaithGroups({ onNavigate }: PolytheismFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const polytheismGroup = faithGroups.find(g => g.id === 'polytheism-group');
  
  if (!polytheismGroup) return null;

  const handleGroupAction = () => {
    if (polytheismGroup.isJoined) {
      leaveGroup(polytheismGroup.id);
    } else {
      joinGroup(polytheismGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: polytheismGroup.id });
  };

  return (
    <section className="py-16 px-4 sm:px-6 relative z-20">
      {/* Primrose Flowers Background with Dark Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(${primroseFlowersImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Dark purple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a1f35]/50 via-[#3d2f4a]/40 to-[#2a1f35]/50" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Card className="bg-white/70 backdrop-blur-xl border-[#9B7DAB]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(155,125,171,0.15)] rounded-3xl">
          {/* Hero Image - Greek Temple */}
          <div className="relative h-48 overflow-hidden bg-gray-100">
            {polytheismTempleImage && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent z-10" />
                <img 
                  src={polytheismTempleImage}
                  alt="Polytheism Community"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </>
            )}
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#9B7DAB] to-[#8A6C9C] backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-white text-sm font-medium">{polytheismGroup.type}</span>
            </div>
          </div>

          <div className="p-6 bg-white/40 backdrop-blur-sm">
            {/* Group Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9B7DAB] to-[#8A6C9C] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="16" textAnchor="middle" fill="white">⚡</text>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Butler', serif" }}>{polytheismGroup.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {polytheismGroup.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#9B7DAB]/20 text-center shadow-sm">
                <Users className="w-5 h-5 text-[#9B7DAB] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{polytheismGroup.memberCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Members</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#9B7DAB]/20 text-center shadow-sm">
                <MessageCircle className="w-5 h-5 text-[#9B7DAB] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{polytheismGroup.postCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Posts</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#9B7DAB]/20 text-center shadow-sm">
                <TrendingUp className="w-5 h-5 text-[#9B7DAB] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">Active</div>
                <div className="text-gray-500 text-xs">Now</div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="mb-6 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-[#9B7DAB]/20 shadow-sm">
              <h4 className="text-[#9B7DAB] text-sm font-semibold mb-3">Community Guidelines</h4>
              <ul className="space-y-2">
                {polytheismGroup.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-[#9B7DAB] mt-0.5">•</span>
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
                  polytheismGroup.isJoined
                    ? 'bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900'
                    : 'bg-gradient-to-r from-[#9B7DAB] to-[#8A6C9C] hover:from-[#8A6C9C] hover:to-[#9B7DAB] text-white shadow-[0_4px_20px_rgba(155,125,171,0.25)]'
                } transition-all duration-300`}
              >
                {polytheismGroup.isJoined ? 'Leave Group' : 'Join Group'}
              </Button>
              <Button
                onClick={handleViewGroup}
                variant="outline"
                className="border-2 border-[#9B7DAB] text-[#9B7DAB] hover:bg-[#9B7DAB]/10 sm:w-auto transition-all duration-300"
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