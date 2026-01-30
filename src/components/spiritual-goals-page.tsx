import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useJournal } from "./journal-context";
import { useHapticFeedback } from "./hooks/use-haptic";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import {
  Target,
  Plus,
  Flame,
  Trophy,
  Calendar,
  Heart,
  BookOpen,
  Users,
  Sparkles,
  CheckCircle2,
  Trash2,
  Star,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";

interface SpiritualGoalsPageProps {
  onNavigate?: (page: string) => void;
  onOpenMission?: () => void;
}

const GOAL_CATEGORIES = [
  { value: "meditation", label: "Meditation", icon: Sparkles, color: "#497EBC" },
  { value: "prayer", label: "Prayer", icon: Heart, color: "#E53935" },
  { value: "study", label: "Scripture Study", icon: BookOpen, color: "#2196F3" },
  { value: "service", label: "Service", icon: Users, color: "#4CAF50" },
  { value: "gratitude", label: "Gratitude", icon: Star, color: "#FFD369" },
  { value: "custom", label: "Custom", icon: Target, color: "#9C27B0" },
] as const;

export function SpiritualGoalsPage({ onNavigate, onOpenMission }: SpiritualGoalsPageProps) {
  const {
    goals,
    addGoal,
    deleteGoal,
    markGoalComplete,
    getActiveGoals,
    getCurrentStreaks,
  } = useJournal();
  const haptic = useHapticFeedback();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState<typeof GOAL_CATEGORIES[number]["value"]>("meditation");
  const [newGoalTarget, setNewGoalTarget] = useState("30");

  const activeGoals = getActiveGoals();
  const totalStreaks = getCurrentStreaks();

  const handleCreateGoal = () => {
    if (!newGoalTitle.trim()) return;

    haptic.tap(); // Standard feedback for goal creation
    addGoal(
      newGoalTitle,
      newGoalDescription,
      newGoalCategory,
      parseInt(newGoalTarget) || 30
    );

    // Reset form
    setNewGoalTitle("");
    setNewGoalDescription("");
    setNewGoalCategory("meditation");
    setNewGoalTarget("30");
    setShowCreateModal(false);
  };

  const handleDeleteGoal = (id: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      haptic.warning(); // Warning for destructive action
      deleteGoal(id);
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 100) return "text-[#FFD700]"; // Gold
    if (streak >= 30) return "text-[#FFD369]"; // Yellow
    if (streak >= 7) return "text-[#FF6B35]"; // Orange
    return "text-[#497EBC]"; // Teal
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 100) return "🌟";
    if (streak >= 30) return "✨";
    if (streak >= 7) return "🔥";
    return "💫";
  };

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
            <div className="w-8 h-8 bg-[#162844]/60 border border-[#FFD369]/30 rounded-lg flex items-center justify-center group-hover:bg-[#FFD369]/20 group-hover:border-[#FFD369]/50 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm">Back to Profile</span>
          </motion.button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD369] to-[#FF9800] rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Spiritual Goals</h1>
              <p className="text-slate-400 text-sm">Track your spiritual growth journey</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-[#162844]/60 border-[#C9A882] p-3">
              <div className="text-center">
                <div className="text-2xl text-[#C9A882] mb-1">{activeGoals.length}</div>
                <div className="text-xs text-slate-400">Active Goals</div>
              </div>
            </Card>
            <Card className="bg-[#162844]/60 border-[#C9A882] p-3">
              <div className="text-center">
                <div className="text-2xl text-[#497EBC] mb-1">{totalStreaks}</div>
                <div className="text-xs text-slate-400">Total Days</div>
              </div>
            </Card>
            <Card className="bg-[#162844]/60 border-[#C9A882] p-3">
              <div className="text-center">
                <div className="text-2xl text-[#4CAF50] mb-1">
                  {activeGoals.filter(g => g.currentStreak >= 7).length}
                </div>
                <div className="text-xs text-slate-400">Streaks 7+</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Goal Button */}
      <div className="px-6 pt-6">
        <Button
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-gradient-to-r from-[#497EBC] to-[#3867a0] hover:from-[#3867a0] hover:to-[#2d5280] text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Goal
        </Button>
      </div>

      {/* Active Goals */}
      <div className="px-6 pt-6 space-y-4">
        {activeGoals.length === 0 ? (
          <Card className="bg-[#162844]/40 border-[#1E3A5F]/30 p-8">
            <div className="text-center">
              <Target className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-white mb-2">No goals yet</h3>
              <p className="text-slate-400 text-sm mb-4">
                Set your first spiritual goal and start building lasting habits!
              </p>
              <Button
                onClick={() => setShowCreateModal(true)}
                variant="outline"
                className="border-[#497EBC]/50 text-[#497EBC] hover:bg-[#497EBC]/10"
              >
                Get Started
              </Button>
            </div>
          </Card>
        ) : (
          activeGoals.map((goal) => {
            const category = GOAL_CATEGORIES.find(c => c.value === goal.category);
            const CategoryIcon = category?.icon || Target;
            const progress = (goal.completedDates.length / goal.targetDays) * 100;
            const today = new Date().toISOString().split('T')[0];
            const completedToday = goal.completedDates.includes(today);

            return (
              <Card
                key={goal.id}
                className="bg-[#162844]/60 border-[#C9A882] p-5 hover:border-[#497EBC]/50 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category?.color}20` }}
                    >
                      <CategoryIcon className="w-5 h-5" style={{ color: category?.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{goal.title}</h3>
                      {goal.description && (
                        <p className="text-slate-400 text-sm">{goal.description}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Streak Display */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getStreakIcon(goal.currentStreak)}</span>
                    <div>
                      <div className={`text-2xl ${getStreakColor(goal.currentStreak)}`}>
                        {goal.currentStreak}
                      </div>
                      <div className="text-xs text-slate-400">Day Streak</div>
                    </div>
                  </div>

                  <Separator orientation="vertical" className="h-12 bg-[#1E3A5F]/30" />

                  <div>
                    <div className="text-xl text-[#FFD369]">{goal.longestStreak}</div>
                    <div className="text-xs text-slate-400">Best Streak</div>
                  </div>

                  <Separator orientation="vertical" className="h-12 bg-[#1E3A5F]/30" />

                  <div>
                    <div className="text-xl text-[#497EBC]">
                      {goal.completedDates.length}/{goal.targetDays}
                    </div>
                    <div className="text-xs text-slate-400">Completed</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <Progress 
                    value={progress} 
                    className="h-2 bg-[#1E3A5F]/30"
                  />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">
                      {progress.toFixed(0)}% complete
                    </span>
                    {progress >= 100 && (
                      <Badge variant="outline" className="border-[#4CAF50]/50 text-[#4CAF50]">
                        <Trophy className="w-3 h-3 mr-1" />
                        Goal Achieved!
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Complete Today Button */}
                <Button
                  onClick={() => {
                    haptic.success(); // Achievement pattern for goal completion
                    markGoalComplete(goal.id);
                  }}
                  disabled={completedToday}
                  className={`w-full ${
                    completedToday
                      ? "bg-[#4CAF50]/20 text-[#4CAF50] cursor-not-allowed"
                      : "bg-gradient-to-r from-[#497EBC] to-[#3867a0] hover:from-[#3867a0] hover:to-[#2d5280] text-white"
                  }`}
                >
                  {completedToday ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Completed Today!
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </>
                  )}
                </Button>

                {/* Milestone Badges */}
                {goal.currentStreak >= 7 && (
                  <div className="flex gap-2 mt-3">
                    {goal.currentStreak >= 7 && (
                      <Badge variant="outline" className="border-[#FF6B35]/50 text-[#FF6B35]">
                        🔥 7-Day Warrior
                      </Badge>
                    )}
                    {goal.currentStreak >= 30 && (
                      <Badge variant="outline" className="border-[#FFD369]/50 text-[#FFD369]">
                        ✨ 30-Day Master
                      </Badge>
                    )}
                    {goal.currentStreak >= 100 && (
                      <Badge variant="outline" className="border-[#FFD700]/50 text-[#FFD700]">
                        🌟 100-Day Legend
                      </Badge>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Create Goal Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Create Spiritual Goal</DialogTitle>
            <DialogDescription className="text-slate-400">
              Set a new goal to deepen your spiritual practice
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Goal Title */}
            <div>
              <label className="text-white text-sm mb-2 block">Goal Title</label>
              <Input
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="e.g., Daily Meditation"
                className="bg-[#162844]/60 border-[#1E3A5F]/30 text-white"
              />
            </div>

            {/* Goal Description */}
            <div>
              <label className="text-white text-sm mb-2 block">Description (Optional)</label>
              <Textarea
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
                placeholder="Describe your goal..."
                className="bg-[#162844]/60 border-[#1E3A5F]/30 text-white resize-none"
                rows={3}
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="text-white text-sm mb-2 block">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {GOAL_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isSelected = newGoalCategory === category.value;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setNewGoalCategory(category.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                        isSelected
                          ? "border-[#497EBC] bg-[#497EBC]/20"
                          : "border-[#1E3A5F]/30 bg-[#162844]/40 hover:border-[#497EBC]/50"
                      }`}
                    >
                      <Icon 
                        className="w-5 h-5 mx-auto mb-1" 
                        style={{ color: category.color }}
                      />
                      <div className="text-xs text-slate-300">{category.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Days */}
            <div>
              <label className="text-white text-sm mb-2 block">Target Days</label>
              <Input
                type="number"
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
                placeholder="30"
                min="1"
                className="bg-[#162844]/60 border-[#1E3A5F]/30 text-white"
              />
              <p className="text-xs text-slate-400 mt-1">
                How many days do you want to practice this goal?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setShowCreateModal(false)}
                variant="outline"
                className="flex-1 border-[#1E3A5F]/50 text-slate-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateGoal}
                disabled={!newGoalTitle.trim()}
                className="flex-1 bg-gradient-to-r from-[#497EBC] to-[#3867a0] hover:from-[#3867a0] hover:to-[#2d5280] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}