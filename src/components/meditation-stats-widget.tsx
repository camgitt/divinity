import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useMeditation } from "./meditation-context";
import { Flame, Clock, Award, Wind, ChevronRight } from "lucide-react";

interface MeditationStatsWidgetProps {
  onNavigate?: (tab: string) => void;
}

export function MeditationStatsWidget({ onNavigate }: MeditationStatsWidgetProps) {
  const { stats, getStreakInfo } = useMeditation();
  const streakInfo = getStreakInfo();

  return (
    <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 p-6 hover:border-cyan-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-white">Meditation Practice</h3>
            <p className="text-slate-400 text-sm">Find inner peace</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <div className="text-2xl text-white">{streakInfo.current}</div>
          </div>
          <div className="text-xs text-slate-400">Day Streak</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-cyan-400" />
            <div className="text-2xl text-white">{stats.totalMinutes}</div>
          </div>
          <div className="text-xs text-slate-400">Minutes</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Award className="w-4 h-4 text-yellow-400" />
            <div className="text-2xl text-white">{stats.totalSessions}</div>
          </div>
          <div className="text-xs text-slate-400">Sessions</div>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => onNavigate?.('meditation')}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 h-10"
      >
        Start Meditation
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  );
}
