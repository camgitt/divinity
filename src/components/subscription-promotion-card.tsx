import { Card } from "./ui/card";
import { useSubscription } from "./subscription-context";
import { 
  Star, 
  ChevronDown, 
  Infinity, 
  Users, 
  Globe,
  Heart,
  Zap,
  Crown,
  Shield,
  MessageSquare,
  Video,
  Sparkles
} from "lucide-react";

interface SubscriptionPromotionCardProps {
  title?: string;
  description?: string;
  features?: Array<{
    icon: React.ComponentType<{ className?: string }>;
    text: string;
    color: string;
  }>;
  context?: 'upgrade-prompt' | 'premium-feature' | 'low-tokens';
  className?: string;
}

const defaultFeatures = [
  {
    icon: Infinity,
    text: "Unlimited chat minutes",
    color: "text-green-400"
  },
  {
    icon: Users,
    text: "All 50+ AI spirit guides",
    color: "text-blue-400"
  },
  {
    icon: Globe,
    text: "Exclusive VR meditation spaces",
    color: "text-purple-400"
  }
];

export function SubscriptionPromotionCard({
  title = "Unlock Premium",
  description = "Access all 50+ spiritual guides, unlimited chat time, and exclusive VR meditation experiences",
  features = defaultFeatures,
  context = 'upgrade-prompt',
  className = ""
}: SubscriptionPromotionCardProps) {
  const { openPortal } = useSubscription();

  return (
    <Card 
      className={`bg-gradient-to-br from-purple-900/30 to-gold-900/20 border-purple-500/20 backdrop-blur-sm p-4 sm:p-6 cursor-pointer hover:border-gold-400/30 transition-all duration-300 group ${className}`}
      onClick={() => openPortal(context)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg text-white flex items-center">
          <Star className="w-5 h-5 mr-2 text-gold-400" />
          {title}
        </h3>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-gold-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <ChevronDown className="w-4 h-4 text-white rotate-[-90deg]" />
        </div>
      </div>
      
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      
      <div className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <div key={index} className={`flex items-center text-xs ${feature.color}`}>
            <feature.icon className="w-3 h-3 mr-2" />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Starting at <span className="text-gold-400">$14.99/month</span>
        </div>
        <div className="text-xs text-gold-400 bg-gold-400/10 px-2 py-1 rounded">
          Click to explore
        </div>
      </div>
    </Card>
  );
}