import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMeditation, MeditationSession } from "./meditation-context";
import { useSound } from "./sound-context";
import { 
  Play, 
  Clock, 
  Star, 
  Filter,
  Search,
  Heart,
  Wind,
  Eye,
  Users,
  Sparkles,
  ChevronRight,
  Volume2,
  VolumeX,
  CloudRain,
  Waves,
  Bird,
  Music as MusicIcon,
  Bell as BellIcon,
  Settings
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface MeditationLibraryProps {
  onStartSession: (session: MeditationSession) => void;
  onBack?: () => void;
}

export function MeditationLibrary({ onStartSession, onBack }: MeditationLibraryProps) {
  const { getAllSessions, getSessionsByFaith, getSessionsByDuration, getSessionsByCategory, stats } = useMeditation();
  const { soundEnabled, soundVolume, toggleSound, setSoundVolume } = useSound();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFaith, setFilterFaith] = useState<string>('all');
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [showSoundSettings, setShowSoundSettings] = useState(false);

  // Get filtered sessions
  const getFilteredSessions = () => {
    let sessions = getAllSessions();

    // Filter by faith
    if (filterFaith !== 'all') {
      sessions = sessions.filter(s => 
        s.faithTradition?.toLowerCase() === filterFaith.toLowerCase() || 
        (filterFaith === 'universal' && !s.faithTradition)
      );
    }

    // Filter by duration
    if (filterDuration !== 'all') {
      const maxMinutes = parseInt(filterDuration);
      sessions = sessions.filter(s => s.duration <= maxMinutes * 60);
    }

    // Filter by category
    if (filterCategory !== 'all') {
      sessions = sessions.filter(s => s.category === filterCategory);
    }

    // Filter by difficulty
    if (filterDifficulty !== 'all') {
      sessions = sessions.filter(s => s.difficulty === filterDifficulty);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      sessions = sessions.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.instructor?.toLowerCase().includes(query)
      );
    }

    return sessions;
  };

  const filteredSessions = getFilteredSessions();

  // Get category icon and color
  const getCategoryInfo = (category: MeditationSession['category']) => {
    const categoryMap = {
      'mindfulness': { icon: Eye, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
      'loving-kindness': { icon: Heart, color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
      'body-scan': { icon: Users, color: 'text-green-400', bgColor: 'bg-green-500/20' },
      'breathing': { icon: Wind, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
      'visualization': { icon: Sparkles, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
      'mantra': { icon: Star, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' }
    };
    return categoryMap[category] || categoryMap['mindfulness'];
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: MeditationSession['difficulty']) => {
    const colorMap = {
      'beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
      'intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colorMap[difficulty];
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  // Get ambient sound info
  const getAmbientInfo = (ambient?: string) => {
    if (!ambient || ambient === 'none') return null;
    
    const ambientMap: Record<string, { icon: any, name: string, color: string }> = {
      'rain': { icon: CloudRain, name: 'Rain', color: 'text-blue-400' },
      'ocean': { icon: Waves, name: 'Ocean Waves', color: 'text-cyan-400' },
      'forest': { icon: Bird, name: 'Forest', color: 'text-green-400' },
      'wind': { icon: Wind, name: 'Wind', color: 'text-slate-400' },
      'bells': { icon: BellIcon, name: 'Singing Bowls', color: 'text-yellow-400' },
      'music': { icon: MusicIcon, name: 'Synth Pad', color: 'text-purple-400' }
    };
    
    return ambientMap[ambient] || null;
  };

  return (
    <div className="min-h-screen bg-[#0B1426] text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0B1426]/95 backdrop-blur-sm border-b border-[#1E3A5F]/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-slate-400 hover:text-white"
            >
              ← Back
            </Button>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl mb-1 bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
                Meditation Library
              </h1>
              <p className="text-slate-400 text-sm">
                {filteredSessions.length} guided sessions available
              </p>
            </div>
            
            {/* Sound Controls & Stats */}
            <div className="flex items-center gap-4">
              {/* Sound Toggle Button */}
              <Button
                onClick={() => {
                  toggleSound();
                  toast.success(soundEnabled ? 'Sound disabled' : 'Sound enabled');
                }}
                variant="outline"
                size="sm"
                className={`border-[#1E3A5F]/50 hover:bg-[#497EBC]/10 ${soundEnabled ? 'text-[#497EBC] bg-[#497EBC]/10' : 'text-slate-400'}`}
                title={soundEnabled ? 'Disable sound' : 'Enable sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              
              {/* Quick Stats */}
              <div className="text-right">
                <div className="text-sm text-slate-400">Total Meditations</div>
                <div className="text-2xl bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
                  {stats.totalSessions}
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search meditations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#162844]/50 border-[#1E3A5F]/50 text-white placeholder:text-slate-400 focus:ring-[#497EBC] focus:border-[#497EBC]"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {/* Faith Filter */}
            <select
              value={filterFaith}
              onChange={(e) => setFilterFaith(e.target.value)}
              className="bg-[#162844]/50 border border-[#1E3A5F]/50 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Faiths</option>
              <option value="universal">Universal</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Judaism">Judaism</option>
              <option value="Taoism">Taoism</option>
            </select>

            {/* Duration Filter */}
            <select
              value={filterDuration}
              onChange={(e) => setFilterDuration(e.target.value)}
              className="bg-[#162844]/50 border border-[#1E3A5F]/50 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Any Length</option>
              <option value="5">5 min</option>
              <option value="10">10 min</option>
              <option value="15">15 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#162844]/50 border border-[#1E3A5F]/50 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="loving-kindness">Loving-Kindness</option>
              <option value="body-scan">Body Scan</option>
              <option value="breathing">Breathing</option>
              <option value="visualization">Visualization</option>
              <option value="mantra">Mantra</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-[#162844]/50 border border-[#1E3A5F]/50 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Sound Settings */}
          {showSoundSettings && (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm text-slate-400">Sound Settings</h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  onClick={toggleSound}
                  variant="outline"
                  className={`border-[#1E3A5F]/50 text-[#497EBC] hover:bg-[#497EBC]/10 ${soundEnabled ? 'bg-[#497EBC]/10' : ''}`}
                >
                  {soundEnabled ? 'Sound On' : 'Sound Off'}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(parseInt(e.target.value))}
                  className="w-24 h-2 bg-[#1E3A5F]/50 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sessions List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#162844]/50 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl text-slate-300 mb-2">No meditations found</h3>
            <p className="text-slate-400">Try adjusting your filters</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setFilterFaith('all');
                setFilterDuration('all');
                setFilterCategory('all');
                setFilterDifficulty('all');
              }}
              variant="outline"
              className="mt-4 border-[#1E3A5F]/50 text-[#497EBC] hover:bg-[#497EBC]/10"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((session, index) => {
              const categoryInfo = getCategoryInfo(session.category);
              const CategoryIcon = categoryInfo.icon;

              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-[#162844]/60 border-[#C9A882]/30 hover:border-[#497EBC]/50 transition-all duration-300 cursor-pointer group overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-lg ${categoryInfo.bgColor} flex items-center justify-center`}>
                              <CategoryIcon className={`w-4 h-4 ${categoryInfo.color}`} />
                            </div>
                            <h3 className="text-lg text-white group-hover:text-[#FFD369] transition-colors">
                              {session.title}
                            </h3>
                          </div>
                          <p className="text-slate-300 text-sm mb-3">
                            {session.description}
                          </p>
                          {session.instructor && (
                            <p className="text-slate-400 text-xs mb-3">
                              Guided by {session.instructor}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <Badge className={getDifficultyColor(session.difficulty)}>
                          {session.difficulty}
                        </Badge>
                        <Badge className="bg-[#1E3A5F]/30 text-slate-300 border-[#1E3A5F]/50">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDuration(session.duration)}
                        </Badge>
                        {session.faithTradition && (
                          <Badge className="bg-[#497EBC]/20 text-[#497EBC] border-[#497EBC]/30">
                            {session.faithTradition}
                          </Badge>
                        )}
                        <Badge className={`${categoryInfo.bgColor} ${categoryInfo.color} border-0`}>
                          {session.category}
                        </Badge>
                        {(() => {
                          const ambientInfo = getAmbientInfo(session.suggestedAmbient);
                          if (ambientInfo) {
                            const AmbientIcon = ambientInfo.icon;
                            return (
                              <Badge className="bg-[#0B1426]/50 text-slate-300 border-[#1E3A5F]/50">
                                <Volume2 className="w-3 h-3 mr-1" />
                                <AmbientIcon className={`w-3 h-3 mr-1 ${ambientInfo.color}`} />
                                {ambientInfo.name}
                              </Badge>
                            );
                          }
                          return null;
                        })()}
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={() => {
                          onStartSession(session);
                          toast.success(`Starting: ${session.title}`);
                        }}
                        className="w-full bg-gradient-to-r from-[#497EBC] to-[#1E3A5F] hover:from-[#3A6BA5] hover:to-[#0F2346] text-white border-0 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Begin Meditation
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}