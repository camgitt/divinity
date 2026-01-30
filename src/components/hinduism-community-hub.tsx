import React from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Users, MessageSquare, Calendar, Heart } from "lucide-react";

interface HinduismCommunityHubProps {
  onNavigate?: (tab: string) => void;
}

export function HinduismCommunityHub({ onNavigate }: HinduismCommunityHubProps) {
  return (
    <section className="px-4 sm:px-6 mb-16 sm:mb-20 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center mb-10 sm:mb-12 px-4"
        >
          <h2 className="text-[28px] sm:text-3xl lg:text-4xl mb-4 bg-gradient-to-r from-[#7A4FFF] via-[#9D7FFF] to-[#7A4FFF] bg-clip-text text-transparent leading-tight" style={{ filter: 'drop-shadow(0 2px 6px rgba(122, 79, 255, 0.3))' }}>
            Join Our Community
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-[#7A4FFF] to-[#9D7FFF] mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(122,79,255,0.4)]" />
          <p className="text-[15px] sm:text-[16px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with fellow seekers on the path of dharma and spiritual growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {[
            {
              icon: Users,
              title: "Faith Circles",
              description: "Join intimate groups for shared spiritual exploration",
              action: "Browse Circles",
              gradient: "from-[#7A4FFF] to-[#9D7FFF]",
              delay: 2.0
            },
            {
              icon: MessageSquare,
              title: "Discussion Forums",
              description: "Engage in meaningful conversations about Hindu philosophy",
              action: "Join Discussions",
              gradient: "from-[#9D7FFF] to-[#B89FFF]",
              delay: 2.1
            },
            {
              icon: Calendar,
              title: "Events & Gatherings",
              description: "Participate in virtual satsangs and celebrations",
              action: "View Events",
              gradient: "from-[#FFD369] to-[#FFDF8A]",
              delay: 2.2
            },
            {
              icon: Heart,
              title: "Support Groups",
              description: "Find guidance and companionship in your spiritual journey",
              action: "Find Support",
              gradient: "from-[#7A4FFF] to-[#FFD369]",
              delay: 2.3
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay }}
            >
              <Card className="bg-white/95 border-[#7A4FFF]/30 border-2 hover:border-[#7A4FFF]/60 transition-all duration-500 cursor-pointer group backdrop-blur-xl h-full p-5 sm:p-6 rounded-2xl touch-manipulation shadow-[0_4px_20px_rgba(122,79,255,0.1)] hover:shadow-[0_8px_30px_rgba(122,79,255,0.2)]"
                onClick={() => onNavigate?.("circle")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A4FFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative">
                  <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-105 transition-all duration-300 shadow-md group-hover:shadow-lg`}>
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  
                  <h3 className="text-[17px] sm:text-lg text-gray-900 mb-3 group-hover:text-[#7A4FFF] transition-colors duration-300 leading-snug font-semibold">
                    {item.title}
                  </h3>
                  
                  <p className="text-[14px] sm:text-[15px] text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center text-[#7A4FFF] group-hover:text-[#6B3FEF] transition-colors duration-300">
                    <span className="text-[14px] font-medium">{item.action}</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}