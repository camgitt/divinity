import { motion } from "motion/react";
import { Zap, Clock, Timer, Crown, Infinity } from "lucide-react";
import { useTimer } from "./timer-context";
import { useSubscription } from "./subscription-context";

interface TokenIndicatorProps {
  onClick: () => void;
}

export function TokenIndicator({ onClick }: TokenIndicatorProps) {
  const { currentTokens, isActiveSession, getTimeRemaining } = useTimer();
  const { currentSubscription, currentPlan, getRemainingDailyTokens } = useSubscription();
  
  const dailyRemaining = getRemainingDailyTokens();
  const isUnlimited = currentPlan.tokenAllowance === -1;
  
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed top-16 right-4 text-white px-4 py-2 rounded-full shadow-lg z-40 flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
        isActiveSession 
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
          : isUnlimited
          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
          : currentSubscription.tokens <= 5
          ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
          : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
      }`}
    >
      {isActiveSession ? (
        <>
          <Timer className="w-4 h-4 animate-pulse" />
          <span>{getTimeRemaining()}</span>
        </>
      ) : isUnlimited ? (
        <>
          <Crown className="w-4 h-4" />
          <Infinity className="w-4 h-4" />
        </>
      ) : (
        <>
          <Zap className="w-4 h-4" />
          <span>{currentSubscription.tokens}</span>
          {!isUnlimited && dailyRemaining >= 0 && (
            <span className="text-xs opacity-75">({dailyRemaining} today)</span>
          )}
        </>
      )}
    </motion.button>
  );
}