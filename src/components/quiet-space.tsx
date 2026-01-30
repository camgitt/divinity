import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ActiveSessionTimer } from "./active-session-timer";
import { SubscriptionPromotionCard } from "./subscription-promotion-card";
import { AppFooter } from "./app-footer";
import { getFaithSymbol } from "./faith-symbols-config";
import meditationDiverseImage from 'figma:asset/b698055909d9a5136dbd49dade6fba7e63aee4c8.png';
import {
  Play,
  Eye,
  Maximize,
  ArrowRight,
  MessageCircle,
  Clock,
  Infinity,
  Users,
  BookOpen,
  Church,
  Scroll,
  Headphones,
  Heart,
  Globe,
  Shield,
  ChevronRight,
  Star,
  Archive,
  Search,
  MoreVertical
} from "lucide-react";

// Helper function to get faith symbol emoji based on tradition
const getFaithSymbolEmoji = (tradition: string): string => {
  const traditionLower = tradition.toLowerCase();
  
  // Map tradition names to faith symbol keys
  const traditionToKeyMap: Record<string, string> = {
    'christianity': 'christian',
    'islam': 'islamic',
    'judaism': 'jewish',
    'buddhism': 'buddhist',
    'hinduism': 'shakti',
    'shinto': 'shinto',
    'jainism': 'jain',
    'taoism': 'taoist',
    'daoism': 'taoist',
    'sikhism': 'sikhism',
    "bahá'í": 'bahai',
    'bahai': 'bahai',
    'confucianism': 'sage',
    'polytheism': 'polytheism',
    'universal': 'sage',
    'personal guide': 'sage'
  };
  
  // Find matching key
  const faithKey = traditionToKeyMap[traditionLower] || 'sage';
  
  // Get the faith symbol config and return emoji
  const faithConfig = getFaithSymbol(faithKey);
  return faithConfig.emoji;
};

interface QuietSpaceCategory {
  id: string;
  title: string;
  image: string;
  icon: any;
}

const quietSpaceCategories: QuietSpaceCategory[] = [
  {
    id: "spirit-guides",
    title: "Spirit Guides",
    image: "https://images.unsplash.com/photo-1626324568189-c09445b2a481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHNwaXJpdHVhbCUyMGF2YXRhciUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4ODU3MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Users
  },
  {
    id: "learning-growth",
    title: "Learning & Growth",
    image: "https://images.unsplash.com/photo-1752920299210-0b727800ea50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTg4NTczMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: BookOpen
  },
  {
    id: "virtual-worship",
    title: "Virtual Worship Spaces",
    image: "https://images.unsplash.com/photo-1578668189974-f7525881ae9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3JzaGlwJTIwc3BhY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg4NTczMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Church
  },
  {
    id: "scripture-archives",
    title: "Scripture Archives",
    image: "https://images.unsplash.com/photo-1474645303019-23542b4c63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRoZWRyYWwlMjBtZWRpdGF0aW9uJTIwc3BhY2V8ZW58MXx8fHwxNzU4ODU3MzAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Scroll
  },
  {
    id: "meditation-zone",
    title: "Meditation Zone",
    image: "https://images.unsplash.com/photo-1694614513690-25cfb8e764f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx6ZW4lMjBnYXJkZW4lMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1ODg1NzMwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Headphones
  },
  {
    id: "community-connection",
    title: "Community Connection",
    image: "https://images.unsplash.com/photo-1758549803229-6f83ec216c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU4ODU3MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Heart
  },
  {
    id: "divinityverse",
    title: "DivinityVerse",
    image: "https://images.unsplash.com/photo-1728756666032-d0b5552b6384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMHVuaXZlcnNlJTIwc3BhY2V8ZW58MXx8fHwxNzU4ODU3MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Globe
  },
  {
    id: "council-care",
    title: "Council and Care",
    image: "https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4Nzk5MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Shield
  }
];

// Archived chats data
const archivedChats = [
  {
    id: 1,
    guideName: "Sister Mary Catherine",
    tradition: "Christianity",
    topic: "Finding Peace in Difficult Times",
    lastMessage: "Remember, even in our darkest moments, there is always hope. The light within you cannot be extinguished.",
    timestamp: "2 days ago",
    duration: "32 min",
    avatar: "🕊️",
    rating: 5
  },
  {
    id: 2,
    guideName: "Rabbi David Cohen",
    tradition: "Judaism", 
    topic: "Understanding Purpose Through Torah",
    lastMessage: "Your questions show wisdom beyond your years. Continue to seek understanding in the sacred texts.",
    timestamp: "1 week ago",
    duration: "45 min",
    avatar: "✡️",
    rating: 5
  },
  {
    id: 3,
    guideName: "Imam Abdullah Hassan",
    tradition: "Islam",
    topic: "Balancing Faith and Daily Life",
    lastMessage: "May Allah's peace be upon you. Your dedication to maintaining faith while navigating modern challenges is admirable.",
    timestamp: "2 weeks ago",
    duration: "28 min",
    avatar: "☪️",
    rating: 4
  }
];

interface QuietSpaceProps {
  onOpenMission?: () => void;
  onNavigate?: (tab: string) => void;
}

export function QuietSpace({ onOpenMission, onNavigate }: QuietSpaceProps) {
  const [customizationStep, setCustomizationStep] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });

  // Filter archived chats based on search
  const filteredChats = archivedChats.filter(chat =>
    chat.guideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.tradition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-white/30"
            }`}
          />
        ))}
      </div>
    );
  };

  const totalSteps = 6;
  const progressPercentage = (customizationStep / totalSteps) * 100;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0D0D2B 0%, #1A1A3E 50%, #2D1B69 100%)" }}>


      {/* Hero Section - Divinity Mode */}
      <section className="px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white text-3xl font-serif uppercase tracking-wider mb-2">
            DIVINITY MODE
          </h1>
          <p className="text-purple-300 text-lg font-light italic mb-8">
            Your Personal Spirit Guide
          </p>
        </motion.div>

        {/* Diverse Meditation Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 max-w-sm mx-auto"
        >
          <ImageWithFallback
            src={meditationDiverseImage}
            alt="Diverse Spiritual Meditation"
            className="w-full h-auto rounded-3xl"
          />
        </motion.div>

        {/* Avatar Video Placeholder */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto mb-8 w-48 h-48"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center border-4 border-white/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1626324568189-c09445b2a481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHNwaXJpdHVhbCUyMGF2YXRhciUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4ODU3MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Your Spiritual Avatar"
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full"></div>
          </div>
        </motion.div>

        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 rounded-full px-8 py-3 text-lg font-medium"
        >
          Launch Guide
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-serif mb-2">Your Spiritual Journey</h2>
          <p className="text-purple-300 text-sm">Reflections and growth over time</p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl text-white font-bold">12</div>
            <div className="text-purple-300 text-sm">Past Chats</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl text-white font-bold">7</div>
            <div className="text-purple-300 text-sm">Days Active</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full flex items-center justify-center">
              <Infinity className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl text-white font-bold">∞</div>
            <div className="text-purple-300 text-sm">Wisdom Gained</div>
          </motion.div>
        </div>
      </section>

      {/* Archived Chats Section */}
      <section className="px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-serif mb-2">Recent Conversations</h2>
          <p className="text-purple-300 text-sm">Your personal AI companion chat history</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-sm mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Archived Chats List */}
        <div className="space-y-3 max-w-sm mx-auto mb-6">
          {filteredChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <div className="flex items-start space-x-3">
                  {/* Personal AI Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/30 to-gold-500/30 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    {getFaithSymbolEmoji(chat.tradition)}
                  </div>
                  
                  {/* Chat Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">
                        {chat.topic}
                      </h4>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto">
                        <MoreVertical className="w-3 h-3 text-white/70" />
                      </Button>
                    </div>
                    
                    <p className="text-white/70 text-xs line-clamp-2 mb-3">
                      {chat.lastMessage}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center space-x-3 text-xs text-white/50">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{chat.duration}</span>
                      </div>
                      <span>{chat.timestamp}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Chats */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full px-6"
          >
            <Archive className="w-4 h-4 mr-2" />
            View All Conversations
          </Button>
        </div>
      </section>



      {/* Immersive Preview */}


      {/* Customize Your Experience */}


      {/* Subscription Benefits */}
      <section className="px-4 py-8">
        <SubscriptionPromotionCard
          title="Unlock VR Meditation"
          description="Experience immersive 3D meditation spaces, exclusive VR environments, and unlimited access to premium spiritual content"
          features={[
            {
              icon: Globe,
              text: "Exclusive VR meditation spaces",
              color: "text-purple-400"
            },
            {
              icon: Infinity,
              text: "Unlimited meditation sessions",
              color: "text-green-400"
            },
            {
              icon: Heart,
              text: "Premium spiritual content",
              color: "text-pink-400"
            }
          ]}
          context="premium-feature"
        />
      </section>

      {/* Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
    </div>
  );
}