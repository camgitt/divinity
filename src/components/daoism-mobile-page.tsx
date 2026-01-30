import React, { useState } from 'react';
import { ArrowLeft, Users, MessageCircle, TrendingUp, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AppFooter } from './app-footer';
import { useSocialMedia } from './social-media-context';

// Import images from Figma
import cosmicBg from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import communityImage from 'figma:asset/f0a184ab97c580a1d6940dbb145ee658769c5cdc.png';
import heroImage from 'figma:asset/df605e5b5c6388f31b80b8c1cc03f66e7fcd1fee.png';
import yinYangImage from 'figma:asset/51a7d0e6d1a6647dca02517899785892471e556b.png';
import liShenImage from 'figma:asset/6ec6a4d6a7fe0341a6108dafe9cd95e574616248.png';
import zhangWeiImage from 'figma:asset/f7dd0e72b91ec15e81bf16fd77081474e88fcdac.png';
import liangZhenImage from 'figma:asset/88f04c806141f782dc355ddebf0c8c77b3577e34.png';
import meiLingImage from 'figma:asset/540d0c043371871908ed10a80b4f9f54420a1c45.png';
import xuYunyaoImage from 'figma:asset/155cd3fd4f1d6fe03c353ddb7573ca0b6e914baf.png';
import gaoLianImage from 'figma:asset/dd9f8d40166b27bed037ffb1e7b65539c4e13ce5.png';

interface DaoismMobilePageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onNavigate?: (tab: string) => void;
}

const guides = [
  {
    id: 'li-shen',
    name: 'Li Shen',
    role: 'Philosopher',
    image: liShenImage,
    denomination: 'Philosophical Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-1'
  },
  {
    id: 'zhang-wei',
    name: 'Zhang Wei',
    role: 'Priest / Sage Master',
    image: zhangWeiImage,
    denomination: 'Religious Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-2'
  },
  {
    id: 'liang-zhen',
    name: 'Liang Zhen',
    role: 'Sage Master / Monk',
    image: liangZhenImage,
    denomination: 'Quanzhen Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-4'
  },
  {
    id: 'mei-ling',
    name: 'Mei Ling',
    role: 'Spiritual Intermediary',
    image: meiLingImage,
    denomination: 'Zhengyi Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-3'
  },
  {
    id: 'xu-yunyao',
    name: 'Adept Xu Yunyao',
    role: 'Spiritual Guide',
    image: xuYunyaoImage,
    denomination: 'Shangqing Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-5'
  },
  {
    id: 'gao-lian',
    name: 'Gao Lian',
    role: 'Spiritual Guide',
    image: gaoLianImage,
    denomination: 'Shangqing Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-6'
  }
];

const topics = [
  'Tao Te Ching',
  'Wu Wei Practice',
  'Yin-Yang Philosophy',
  'Internal Alchemy',
  'Meditation Techniques',
  'Natural Harmony',
  'Taoist Ethics',
  'Immortality Cultivation'
];

export function DaoismMobilePage({ onBack, onOpenMission, onNavigate }: DaoismMobilePageProps) {
  const [selectedGuide, setSelectedGuide] = useState(0);
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const taoismGroup = faithGroups.find(g => g.id === 'taoism-group');

  const handleGroupAction = () => {
    if (taoismGroup) {
      if (taoismGroup.isJoined) {
        leaveGroup(taoismGroup.id);
      } else {
        joinGroup(taoismGroup.id);
      }
    }
  };

  const handleViewGroup = () => {
    if (taoismGroup) {
      onNavigate?.('group-detail', { groupId: taoismGroup.id });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] text-white pb-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={cosmicBg}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/40 via-[#162844]/70 to-[#0B1426]/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.08),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(33,33,33,0.15),_transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 pt-6 pb-3">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-white hover:text-white backdrop-blur-md bg-[#162844]/60 hover:bg-[#162844]/80 rounded-xl px-4 py-3 border border-white/20 hover:border-white/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Hero Section */}
        <div className="px-6 mb-8">
          <div className="relative rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={heroImage}
              alt="Taoism"
              className="w-full aspect-[3/2] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/90 via-[#212121]/30 to-transparent" />
            
            {/* Title Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="alt-font text-[32pt] mb-4 bg-gradient-to-r from-white via-slate-300 to-white bg-clip-text text-transparent">
                Taoism
              </h1>
              <div className="w-24 h-0.5 bg-gradient-to-r from-white via-slate-400 to-white rounded-full mb-4" />
              <p className="text-slate-300 text-[16px]">
                Follow the natural flow of the Tao.
              </p>
            </div>
          </div>
        </div>

        {/* Meet Your Spirit Guides Section */}
        <div className="px-6 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-4 bg-gradient-to-r from-white via-slate-300 to-white bg-clip-text text-transparent">
              Meet Your Spirit Guides
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-white via-slate-400 to-white mx-auto rounded-full" />
          </div>

          {/* Guide Card */}
          <Card className="bg-[#0B1426]/95 border-white/40 backdrop-blur-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white/30 mb-4 relative">
                  <ImageWithFallback
                    src={guides[selectedGuide].image}
                    alt={guides[selectedGuide].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <img src={yinYangImage} alt="Yin Yang" className="w-6 h-6 opacity-60" />
                  </div>
                </div>
                
                <h3 className="text-2xl text-white mb-2">{guides[selectedGuide].name}</h3>
                <p className="text-slate-400 mb-2">{guides[selectedGuide].role}</p>
                <p className="text-white mb-4">{guides[selectedGuide].denomination}</p>
              </div>

              <Button 
                className="w-full h-12 bg-white text-[#0B1426] hover:bg-white/90 rounded-xl mb-3"
                onClick={() => window.open(guides[selectedGuide].chatUrl, '_blank')}
              >
                Start Conversation
              </Button>
            </div>
          </Card>

          {/* Guide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {guides.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedGuide(index)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: selectedGuide === index ? '32px' : '8px',
                  height: '8px',
                  backgroundColor: selectedGuide === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.25)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Explore Topics */}
        <div className="px-6 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-white via-slate-300 to-white bg-clip-text text-transparent">
              Explore Topics
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-white via-slate-400 to-white mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {topics.map((topic, index) => (
              <Card 
                key={index}
                className="bg-[#162844]/40 border-[#1E3A5F]/40 hover:border-white/60 p-4 text-center cursor-pointer transition-all duration-300"
              >
                <p className="text-white text-sm">{topic}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Section */}
        {taoismGroup && (
          <div className="px-4 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl mb-4 text-[#FFD369]">Taoist Community</h2>
              <p className="text-slate-300 text-sm px-4">
                Flow with the Tao, share practices of wu wei, and discover balance in harmony with nature
              </p>
            </div>

            <Card className="bg-gradient-to-br from-[#1a1533] to-[#0D0B2B] border-[#212121]/50 overflow-hidden">
              {/* Community Image */}
              <div className="relative h-48">
                <img 
                  src={taoismGroup.coverPhoto}
                  alt="Taoism Community"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B2B] to-transparent" />
                <div className="absolute top-4 right-4 bg-[#0D0B2B]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-500">
                  <span className="text-gray-300 text-sm">{taoismGroup.type}</span>
                </div>
              </div>

              <div className="p-6">
                {/* Group Info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">☯</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#FFD369] mb-2">{taoismGroup.name}</h3>
                    <p className="text-gray-400 text-sm">{taoismGroup.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-[#0D0B2B]/50 p-4 rounded-lg border border-gray-700 text-center">
                    <Users className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                    <div className="text-white text-sm mb-1">{taoismGroup.memberCount.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">Members</div>
                  </div>
                  <div className="bg-[#0D0B2B]/50 p-4 rounded-lg border border-gray-700 text-center">
                    <MessageCircle className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                    <div className="text-white text-sm mb-1">{taoismGroup.postCount.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">Posts</div>
                  </div>
                  <div className="bg-[#0D0B2B]/50 p-4 rounded-lg border border-gray-700 text-center">
                    <TrendingUp className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                    <div className="text-white text-sm mb-1">Active</div>
                    <div className="text-gray-400 text-xs">Activity</div>
                  </div>
                </div>

                {/* Community Guidelines */}
                <div className="mb-6 bg-[#0D0B2B]/30 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-[#FFD369] text-sm mb-3">Community Guidelines</h4>
                  <ul className="space-y-2">
                    {taoismGroup.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-gray-500 mt-0.5">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleGroupAction}
                    className={`flex-1 ${
                      taoismGroup.isJoined
                        ? 'bg-[#0D0B2B] border border-gray-700 hover:bg-[#1a1533]'
                        : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
                    } text-white`}
                  >
                    {taoismGroup.isJoined ? 'Leave Group' : 'Join Group'}
                  </Button>
                  <Button
                    onClick={handleViewGroup}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800/30"
                  >
                    View <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <AppFooter onOpenMission={onOpenMission} />
    </div>
  );
}