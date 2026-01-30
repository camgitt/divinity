import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { format, subDays } from "date-fns";
import { useJournal } from "./journal-context";
import { useHapticFeedback } from "./hooks/use-haptic";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  BookOpen,
  Sparkles,
  Calendar,
  TrendingUp,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Smile,
  Heart,
  Star,
  Brain,
  CloudRain,
  Sun,
  Trash2,
  Edit3,
  Save,
  X,
  ArrowLeft,
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";

interface JournalPageProps {
  onNavigate?: (page: string) => void;
  onOpenMission?: () => void;
}

const MOOD_OPTIONS = [
  { value: "joyful", label: "Joyful", icon: Sun, color: "#FFD369", emoji: "😄" },
  { value: "peaceful", label: "Peaceful", icon: Heart, color: "#497EBC", emoji: "😌" },
  { value: "grateful", label: "Grateful", icon: Star, color: "#4CAF50", emoji: "🙏" },
  { value: "contemplative", label: "Thoughtful", icon: Brain, color: "#2196F3", emoji: "🤔" },
  { value: "struggling", label: "Struggling", icon: CloudRain, color: "#9E9E9E", emoji: "😔" },
  { value: "hopeful", label: "Hopeful", icon: Sparkles, color: "#FF9800", emoji: "✨" },
] as const;

export function JournalPage({ onNavigate, onOpenMission }: JournalPageProps) {
  const {
    entries,
    addEntry,
    deleteEntry,
    updateEntry,
    dailyPrompt,
    refreshPrompt,
    getTodayEntry,
    getTotalEntries,
    getMoodDistribution,
  } = useJournal();
  const haptic = useHapticFeedback();

  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<typeof MOOD_OPTIONS[number]["value"] | null>(null);
  const [usePrompt, setUsePrompt] = useState(true);
  const [view, setView] = useState<"write" | "history">("write");
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showStats, setShowStats] = useState(false);

  const todayEntry = getTodayEntry();
  const totalEntries = getTotalEntries();
  const moodDistribution = getMoodDistribution();

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleSaveEntry = () => {
    if (!currentEntry.trim()) {
      return;
    }

    haptic.success(); // Success pattern for saving entry
    const promptText = usePrompt ? dailyPrompt.text : undefined;
    addEntry(currentEntry, selectedMood || undefined, promptText);
    setCurrentEntry("");
    setSelectedMood(null);
    setUsePrompt(true);
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      haptic.warning(); // Warning pattern for destructive action
      deleteEntry(id);
    }
  };

  const handleEditEntry = (id: string) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setEditingEntry(id);
      setEditContent(entry.content);
    }
  };

  const handleSaveEdit = () => {
    if (editingEntry && editContent.trim()) {
      haptic.tap(); // Standard feedback for edit save
      updateEntry(editingEntry, editContent);
      setEditingEntry(null);
      setEditContent("");
    }
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    setEditContent("");
  };

  // Get entries from last 7 days for quick stats
  const last7Days = entries.filter(entry => {
    const weekAgo = subDays(new Date(), 7);
    return entry.date >= weekAgo;
  });

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#0B1426] via-[#162844] to-[#0B1426] border-b border-[#1E3A5F]/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEyMiwgNzksIDI1NSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        
        <div className="relative z-10 px-6 pt-8 pb-6">
          {/* Back Button */}
          <motion.button
            onClick={() => onNavigate?.('profile')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ x: -4 }}
          >
            <div className="w-8 h-8 bg-[#162844]/60 border border-[#497EBC]/30 rounded-lg flex items-center justify-center group-hover:bg-[#497EBC]/20 group-hover:border-[#497EBC]/50 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm">Back to Profile</span>
          </motion.button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#497EBC] to-[#3867a0] rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl">{getGreeting()}</h1>
              <p className="text-slate-400 text-sm">Your spiritual journal awaits</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <Card className="bg-[#162844]/60 border-[#C9A882] p-3">
              <div className="text-center">
                <div className="text-2xl text-[#C9A882] mb-1">{totalEntries}</div>
                <div className="text-xs text-slate-400">Total Entries</div>
              </div>
            </Card>
            <Card className="bg-[#162844]/60 border-[#C9A882] p-3">
              <div className="text-center">
                <div className="text-2xl text-[#497EBC] mb-1">{last7Days.length}</div>
                <div className="text-xs text-slate-400">This Week</div>
              </div>
            </Card>
            <Card className="bg-[#162844]/60 border-[#C9A882] p-3">
              <div className="text-center">
                <div className="text-2xl text-[#4CAF50] mb-1">
                  {todayEntry ? "✓" : "–"}
                </div>
                <div className="text-xs text-slate-400">Today</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-6 pt-4">
        <div className="flex gap-2 p-1 bg-[#162844]/40 rounded-lg border border-[#1E3A5F]/30">
          <button
            onClick={() => setView("write")}
            className={`flex-1 py-2 rounded-md transition-all duration-300 ${
              view === "write"
                ? "bg-gradient-to-r from-[#497EBC] to-[#3867a0] text-white"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Edit3 className="w-4 h-4" />
              Write
            </span>
          </button>
          <button
            onClick={() => setView("history")}
            className={`flex-1 py-2 rounded-md transition-all duration-300 ${
              view === "history"
                ? "bg-gradient-to-r from-[#497EBC] to-[#3867a0] text-white"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              History
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "write" ? (
          <motion.div
            key="write"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 pt-6 space-y-6"
          >
            {/* Daily Prompt */}
            <Card className="bg-gradient-to-br from-[#497EBC]/20 to-[#C9A882]/20 border-[#C9A882] p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C9A882]" />
                  <h3 className="text-white">Today's Prompt</h3>
                </div>
                <button
                  onClick={refreshPrompt}
                  className="text-slate-400 hover:text-[#C9A882] transition-colors"
                  title="Get new prompt"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-300 mb-3 leading-relaxed">{dailyPrompt.text}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-[#C9A882]/50 text-[#C9A882]">
                  {dailyPrompt.category}
                </Badge>
                <button
                  onClick={() => setUsePrompt(!usePrompt)}
                  className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {usePrompt ? "Using prompt" : "Free write"}
                </button>
              </div>
            </Card>

            {/* Mood Selector */}
            <div>
              <label className="text-white mb-3 block">How are you feeling?</label>
              <div className="grid grid-cols-3 gap-2">
                {MOOD_OPTIONS.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.value;
                  return (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                        isSelected
                          ? "border-[#497EBC] bg-[#497EBC]/20"
                          : "border-[#1E3A5F]/30 bg-[#162844]/40 hover:border-[#497EBC]/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs text-slate-300">{mood.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Journal Entry Field */}
            <div>
              <label className="text-white mb-3 block">Your Reflection</label>
              <Textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder={usePrompt ? "Reflect on today's prompt..." : "What's on your heart and mind?"}
                className="min-h-[200px] bg-[#162844]/60 border-[#1E3A5F]/30 text-white placeholder:text-slate-500 resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-slate-400">
                  {currentEntry.length} characters
                </span>
                <Button
                  onClick={handleSaveEntry}
                  disabled={!currentEntry.trim()}
                  className="bg-gradient-to-r from-[#497EBC] to-[#3867a0] hover:from-[#3867a0] hover:to-[#2d5280] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
              </div>
            </div>

            {/* Today's Entry Preview (if exists) */}
            {todayEntry && (
              <Card className="bg-[#162844]/60 border-[#4CAF50]/30 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
                  <span className="text-[#4CAF50]">Already journaled today!</span>
                </div>
                <p className="text-slate-400 text-sm">
                  You can view your entry in the History tab.
                </p>
              </Card>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 pt-6 space-y-6"
          >
            {/* Mood Distribution Stats */}
            <Card className="bg-[#162844]/60 border-[#C9A882] p-5">
              <button
                onClick={() => setShowStats(!showStats)}
                className="w-full flex items-center justify-between text-white"
              >
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#497EBC]" />
                  Mood Insights
                </span>
                {showStats ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showStats && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-4 space-y-2"
                >
                  {Object.entries(moodDistribution).map(([mood, count]) => {
                    const moodOption = MOOD_OPTIONS.find(m => m.value === mood);
                    if (!moodOption) return null;
                    
                    const percentage = (count / totalEntries) * 100;
                    
                    return (
                      <div key={mood} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-slate-300">
                            <span>{moodOption.emoji}</span>
                            {moodOption.label}
                          </span>
                          <span className="text-slate-400">{count} times</span>
                        </div>
                        <div className="w-full h-2 bg-[#1E3A5F]/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-[#497EBC] to-[#3867a0]"
                          />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </Card>

            {/* Entries List */}
            <div className="space-y-4">
              <h3 className="text-white">Your Entries</h3>
              {entries.length === 0 ? (
                <Card className="bg-[#162844]/40 border-[#1E3A5F]/30 p-8">
                  <div className="text-center">
                    <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400 mb-2">No journal entries yet</p>
                    <p className="text-slate-500 text-sm">
                      Start your spiritual journaling journey today!
                    </p>
                  </div>
                </Card>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4 pr-4">
                    {entries.map((entry) => {
                      const isEditing = editingEntry === entry.id;
                      const moodOption = entry.mood ? MOOD_OPTIONS.find(m => m.value === entry.mood) : null;
                      
                      return (
                        <Card key={entry.id} className="bg-[#162844]/60 border-[#C9A882] p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#497EBC]" />
                              <span className="text-slate-400 text-sm">
                                {format(entry.date, "MMM d, yyyy")}
                              </span>
                              {moodOption && (
                                <span className="text-lg" title={moodOption.label}>
                                  {moodOption.emoji}
                                </span>
                              )}
                            </div>
                            {!isEditing && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditEntry(entry.id)}
                                  className="text-slate-400 hover:text-[#497EBC] transition-colors"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEntry(entry.id)}
                                  className="text-slate-400 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>

                          {entry.prompt && !isEditing && (
                            <div className="mb-2 p-2 bg-[#497EBC]/10 rounded border border-[#497EBC]/20">
                              <p className="text-xs text-[#497EBC] italic">"{entry.prompt}"</p>
                            </div>
                          )}

                          {isEditing ? (
                            <div className="space-y-3">
                              <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="min-h-[100px] bg-[#0B1426]/60 border-[#497EBC]/30 text-white"
                              />
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleSaveEdit}
                                  size="sm"
                                  className="bg-[#497EBC] hover:bg-[#3867a0] text-white"
                                >
                                  <Save className="w-3 h-3 mr-1" />
                                  Save
                                </Button>
                                <Button
                                  onClick={handleCancelEdit}
                                  size="sm"
                                  variant="outline"
                                  className="border-[#1E3A5F]/50 text-slate-300"
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                              {entry.content}
                            </p>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}