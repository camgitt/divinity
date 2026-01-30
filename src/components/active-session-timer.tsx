import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useTimer } from "./timer-context";
import { 
  Timer, 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Zap,
  AlertTriangle
} from "lucide-react";

interface ActiveSessionTimerProps {
  className?: string;
}

export function ActiveSessionTimer({ className = "" }: ActiveSessionTimerProps) {
  const { 
    currentTokens, 
    isActiveSession, 
    sessionDuration, 
    startSession, 
    endSession, 
    formatTime, 
    getTimeRemaining,
    canStartSession 
  } = useTimer();

  const sessionMinutes = Math.floor(sessionDuration / 60);
  const tokensUsedThisSession = sessionMinutes;
  const remainingTokens = Math.max(0, currentTokens - tokensUsedThisSession);
  
  // Calculate progress percentage for visual indicator
  const maxSessionTime = currentTokens * 60; // Total available seconds
  const progressPercentage = maxSessionTime > 0 ? (sessionDuration / maxSessionTime) * 100 : 0;

  return (
    <Card className={`p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-600/30 ${className}`}>
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Timer className={`w-8 h-8 mr-3 ${isActiveSession ? 'text-green-400 animate-pulse' : 'text-slate-400'}`} />
          <h3 className="text-2xl text-white">
            {isActiveSession ? 'Active Session' : 'Spiritual Guidance Timer'}
          </h3>
        </div>

        {/* Session Status */}
        <div className="mb-6">
          {isActiveSession ? (
            <Badge className="bg-green-500/20 text-green-400 border-green-400 px-4 py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live Session
              </div>
            </Badge>
          ) : (
            <Badge className="bg-slate-500/20 text-slate-400 border-slate-400 px-4 py-2">
              Ready to Start
            </Badge>
          )}
        </div>

        {/* Timer Display */}
        <div className="mb-8">
          {isActiveSession ? (
            <div>
              <div className="text-5xl mb-2 text-white font-mono">
                {formatTime(sessionDuration)}
              </div>
              <p className="text-slate-300">Session Duration</p>
              
              <div className="mt-4">
                <div className="text-2xl text-yellow-400 mb-1">
                  {getTimeRemaining()}
                </div>
                <p className="text-slate-400 text-sm">Time Remaining</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-5xl mb-2 text-white font-mono">
                {formatTime(currentTokens * 60)}
              </div>
              <p className="text-slate-300">Available Time</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {isActiveSession && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Session Progress</span>
              <span>{Math.min(100, Math.round(progressPercentage))}%</span>
            </div>
            <Progress 
              value={Math.min(100, progressPercentage)} 
              className="h-3 bg-slate-700"
            />
          </div>
        )}

        {/* Token Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-slate-300">Available</span>
            </div>
            <div className="text-2xl text-white">{remainingTokens}</div>
            <p className="text-xs text-slate-400">tokens</p>
          </div>
          
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-slate-300">Used</span>
            </div>
            <div className="text-2xl text-white">{tokensUsedThisSession}</div>
            <p className="text-xs text-slate-400">this session</p>
          </div>
        </div>

        {/* Low Token Warning */}
        {remainingTokens <= 10 && remainingTokens > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="p-4 bg-amber-500/10 border-amber-500/30">
              <div className="flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="text-sm">Low on tokens! Session will end soon.</span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isActiveSession ? (
            <Button
              onClick={startSession}
              disabled={!canStartSession()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Session
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                onClick={endSession}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3"
              >
                <Square className="w-5 h-5 mr-2" />
                End Session
              </Button>
            </div>
          )}
          
          {!canStartSession() && currentTokens <= 0 && (
            <p className="text-sm text-red-400 mt-2">
              No tokens available. Purchase more to start a session.
            </p>
          )}
        </div>

        {/* Session Info */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 leading-relaxed">
            {isActiveSession 
              ? "Your session is active. Each minute uses 1 token from your balance."
              : "Start a spiritual guidance session. 1 token = 1 minute of conversation."
            }
          </p>
        </div>
      </div>
    </Card>
  );
}