import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, PlusCircle, Heart, ChevronLeft, ChevronRight, RotateCcw, Trash2 } from "lucide-react";
import { getFaithSymbol } from "./faith-symbols-config";

interface GuideCardProps {
  guide: any;
  isGuideSaved: (name: string, faith: string) => boolean;
  saveGuide: (guide: any) => void;
  onLaunchConversation: (guide: any) => void;
  onArchiveAndMakeNew: () => void;
  onRestore?: (guide: any) => void;
  onDelete?: (guide: any) => void;
  playSound: (sound: string, volume: number) => void;
  isActive: boolean;
}

export function GuideCard({
  guide,
  isGuideSaved,
  saveGuide,
  onLaunchConversation,
  onArchiveAndMakeNew,
  onRestore,
  onDelete,
  playSound,
  isActive
}: GuideCardProps) {
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isSaved = isGuideSaved(
      guide.guideName || guide.guideRole,
      guide.faith
    );
    
    if (!isSaved) {
      // Map faith to get the faith color
      const faithToKeyMap: Record<string, string> = {
        'Christianity': 'christian',
        'Sunni Islam': 'islamic',
        'Islam': 'islamic',
        'Shia Islam': 'islamic',
        'Sufi Islam': 'islamic',
        'Judaism': 'jewish',
        'Buddhism': 'buddhist',
        'Mahayana Buddhism': 'buddhist',
        'Vajrayana Buddhism': 'buddhist',
        'Zen Buddhism': 'buddhist',
        'Theravada Buddhism': 'buddhist',
        'Hinduism': 'shakti',
        'Shinto': 'shinto',
        'Jinja Shinto': 'shinto',
        'Koshinto': 'shinto',
        'Kyoha Shinto': 'shinto',
        'Jainism': 'jain',
        'Digambara Jainism': 'jain',
        'Svetambara Jainism': 'jain',
        'Sthanakvasi Jainism': 'jain',
        'Taoism': 'taoist',
        'Daoism': 'taoist',
        'Sikhism': 'sikhism',
        'Bahá\'í': 'bahai',
        'Bahai': 'bahai',
        'Confucianism': 'sage',
        'Neo-Confucianism': 'sage',
        'Classical Confucianism': 'sage',
        'Contemporary Confucianism': 'sage',
        'Norse Mythology': 'polytheism',
        'Greek Mythology': 'polytheism',
        'Egyptian Mythology': 'polytheism',
        'Indigenous Spirituality': 'polytheism',
        'Universal': 'sage'
      };
      
      const faithKey = faithToKeyMap[guide.faith] || 'sage';
      const faithConfig = getFaithSymbol(faithKey);
      
      saveGuide({
        guideName: guide.guideName || guide.guideRole,
        tradition: guide.faith,
        faithColor: faithConfig.color || '#497EBC',
        avatar: guide.generatedImageUrl,
        description: guide.description,
        specialty: (guide as any).specialties?.[0] || '',
        chatUrl: (guide as any).chatUrl || faithConfig.chatUrl,
        isDefault: false,
        guideType: 'companion'
      });
      playSound('spiritual-bell', 0.3);
    }
  };

  return (
    <div className={`flex-shrink-0 w-full transition-opacity duration-300 ${!isActive ? 'opacity-60' : 'opacity-100'}`}>
      {/* Guide Preview - Slider Style with Image Overlay */}
      <div className="relative rounded-2xl overflow-hidden mb-3 shadow-xl border-2 border-white/20">
        {/* Background Image */}
        <div className="absolute inset-0">
          {guide.generatedImageUrl && (
            <ImageWithFallback
              src={guide.generatedImageUrl}
              alt={guide.guideName || guide.guideRole}
              className={`w-full h-full object-cover transition-all duration-300 ${!isActive ? 'grayscale-[30%] brightness-75' : ''}`}
            />
          )}
          {/* Gradient Overlay for text readability */}
          <div className={`absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 ${!isActive ? 'opacity-80' : ''}`} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-6">
          {/* Top Section - Save Button & Status Badge */}
          <div className="flex justify-between items-start mb-3">
            {!isActive && (
              <Badge className="bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-md text-white border border-white/40 text-xs font-['Raleway'] font-semibold shadow-lg">
                Archived
              </Badge>
            )}
            <button
              onClick={handleSave}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg ${!isActive ? 'ml-auto' : ''} ${
                isGuideSaved(guide.guideName || guide.guideRole, guide.faith)
                  ? 'bg-pink-500/40 text-pink-300 shadow-pink-500/50'
                  : 'bg-white/20 text-white/80 hover:bg-white/30 hover:text-pink-300 hover:shadow-pink-500/30'
              }`}
              aria-label="Save guide"
              title="Save to Favourites"
            >
              <Heart 
                className={`w-5 h-5 ${
                  isGuideSaved(guide.guideName || guide.guideRole, guide.faith) 
                    ? 'fill-pink-300' 
                    : ''
                }`} 
              />
            </button>
          </div>

          {/* Content - Centered text overlay */}
          <div className="flex flex-col items-center text-center mt-12 mb-4">
            {/* Guide Name & Role */}
            <div className="mb-3">
              {guide.guideName && (
                <h3 className="text-white text-2xl font-['Raleway'] font-bold mb-1 drop-shadow-lg">
                  {guide.guideName}
                </h3>
              )}
              <h4 className={`text-white/95 ${guide.guideName ? 'text-base' : 'text-2xl'} font-['Raleway'] ${guide.guideName ? 'font-medium' : 'font-bold'} drop-shadow-md`}>
                {guide.guideRole}
              </h4>
            </div>

            {/* Faith Badge */}
            <Badge className="bg-gradient-to-r from-[#497EBC]/90 to-[#3a6ba3]/90 backdrop-blur-md text-white border-0 text-sm font-['Raleway'] font-semibold mb-3 px-4 py-1.5 shadow-lg">
              {guide.faith}
            </Badge>

            {/* Specialty/Description */}
            <p className="text-white/90 text-sm font-['Raleway'] font-medium max-w-xs mx-auto drop-shadow-md leading-relaxed">
              {guide.spiritualGoals && guide.spiritualGoals.length > 0 
                ? guide.spiritualGoals[0]
                : (guide as any).specialties?.[0] || guide.guideRole
              }
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {/* Launch Conversation Button */}
        <Button
          onClick={() => onLaunchConversation(guide)}
          className="w-full bg-gradient-to-r from-[#b69e60] to-[#a88e56] hover:from-[#a88e56] hover:to-[#b69e60] text-white rounded-full py-4 text-sm font-['Raleway'] font-semibold shadow-[0_4px_20px_rgba(182,158,96,0.4)] hover:shadow-[0_6px_30px_rgba(182,158,96,0.6)] transition-all duration-300 hover:scale-[1.02] border-0"
        >
          <Play className="w-4 h-4 mr-2 drop-shadow-lg" />
          <span className="drop-shadow-lg">Launch Conversation</span>
        </Button>

        {/* Archive and Make New Button - Only show for active guide */}
        {isActive && (
          <Button
            onClick={onArchiveAndMakeNew}
            className="w-full bg-gradient-to-r from-[#497EBC] to-[#3a6ba3] hover:from-[#3a6ba3] hover:to-[#497EBC] text-white rounded-full py-4 text-sm font-['Raleway'] font-semibold shadow-[0_4px_15px_rgba(73,126,188,0.4)] hover:shadow-[0_6px_25px_rgba(73,126,188,0.6)] transition-all duration-300 hover:scale-[1.02] border-0"
          >
            <PlusCircle className="w-4 h-4 mr-2 drop-shadow-lg" />
            <span className="drop-shadow-lg">Archive and Make New</span>
          </Button>
        )}

        {/* Restore and Delete Buttons - Only show for archived guides */}
        {!isActive && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => onRestore?.(guide)}
              className="w-full bg-gradient-to-r from-[#497EBC] to-[#3a6ba3] hover:from-[#3a6ba3] hover:to-[#497EBC] text-white rounded-full py-4 text-sm font-['Raleway'] font-semibold shadow-[0_4px_15px_rgba(73,126,188,0.4)] hover:shadow-[0_6px_25px_rgba(73,126,188,0.6)] transition-all duration-300 hover:scale-[1.02] border-0"
            >
              <RotateCcw className="w-4 h-4 mr-1 drop-shadow-lg" />
              <span className="drop-shadow-lg">Restore</span>
            </Button>
            <Button
              onClick={() => onDelete?.(guide)}
              className="w-full bg-gradient-to-r from-[#b69e60] to-[#a88e56] hover:from-[#a88e56] hover:to-[#b69e60] text-white rounded-full py-4 text-sm font-['Raleway'] font-semibold shadow-[0_4px_15px_rgba(182,158,96,0.4)] hover:shadow-[0_6px_25px_rgba(182,158,96,0.6)] transition-all duration-300 hover:scale-[1.02] border-0"
            >
              <Trash2 className="w-4 h-4 mr-1 drop-shadow-lg" />
              <span className="drop-shadow-lg">Delete</span>
            </Button>
          </div>
        )}
      </div>

      {/* Created Date */}
      {guide.createdAt && (
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-gray-700 text-xs text-center font-['Helvetica'] drop-shadow-sm">
            Guide created on {new Date(guide.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      )}
    </div>
  );
}

interface GuideSliderProps {
  guides: any[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  isGuideSaved: (name: string, faith: string) => boolean;
  saveGuide: (guide: any) => void;
  onLaunchConversation: (guide: any) => void;
  onArchiveAndMakeNew: () => void;
  onRestore?: (guide: any) => void;
  onDelete?: (guide: any) => void;
  playSound: (sound: string, volume: number) => void;
}

export function GuideSlider({
  guides,
  currentIndex,
  onIndexChange,
  isGuideSaved,
  saveGuide,
  onLaunchConversation,
  onArchiveAndMakeNew,
  onRestore,
  onDelete,
  playSound
}: GuideSliderProps) {
  const handlePrev = () => {
    playSound('click', 0.2);
    onIndexChange(currentIndex > 0 ? currentIndex - 1 : guides.length - 1);
  };

  const handleNext = () => {
    playSound('click', 0.2);
    onIndexChange(currentIndex < guides.length - 1 ? currentIndex + 1 : 0);
  };

  if (guides.length === 0) return null;

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {guides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
            aria-label="Previous guide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
            aria-label="Next guide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Guide Cards */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {guides.map((guide, index) => (
            <GuideCard
              key={index}
              guide={guide}
              isGuideSaved={isGuideSaved}
              saveGuide={saveGuide}
              onLaunchConversation={onLaunchConversation}
              onArchiveAndMakeNew={onArchiveAndMakeNew}
              onRestore={onRestore}
              onDelete={onDelete}
              playSound={playSound}
              isActive={guide.isActive}
            />
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {guides.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {guides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                playSound('click', 0.2);
                onIndexChange(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-[#b69e60]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to guide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}