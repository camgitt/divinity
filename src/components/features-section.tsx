import { motion } from "motion/react";
import { Card } from "./ui/card";
import { MessageCircle, Users, Globe, Heart, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Text + FaceTime Chat",
    description: "Connect with your AI companion through text or video calls, available whenever you need guidance.",
    color: "text-blue-500"
  },
  {
    icon: Users,
    title: "50+ AI Avatars",
    description: "Choose from diverse spiritual guides across 12 faith traditions, each uniquely trained in their wisdom.",
    color: "text-purple-500"
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Communicate in your preferred language with culturally appropriate responses and understanding.",
    color: "text-green-500"
  },
  {
    icon: Heart,
    title: "Daily Reflections",
    description: "Receive personalized insights and meditations tailored to your spiritual journey and growth.",
    color: "text-pink-500"
  },
  {
    icon: Shield,
    title: "Privacy & Safety",
    description: "Non-judgmental, privacy-respecting platform with built-in risk detection and local support resources.",
    color: "text-indigo-500"
  },
  {
    icon: Clock,
    title: "Quiet Space",
    description: "Access culturally appropriate meditation and prayer spaces designed for reflection and peace.",
    color: "text-teal-500"
  }
];

export function FeaturesSection() {
  return (
    <section className="section-spacing px-6 bg-light-gradient">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl mb-6 text-[#3D3D6B]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
            Spiritual Guidance <span className="text-[#6B5DD3]">Reimagined</span>
          </h2>
          <p className="text-xl text-[#5D5D7D] max-w-text mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
            Experience personalized spiritual guidance that learns your nuances and responds within your cultural and faith context.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="p-8 h-full border border-[#E8E5FF] rounded-2xl elevation-1 hover:elevation-hover-1 hover:border-[#6B5DD3]/30 transition-all duration-300 bg-white">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8E5FF] to-[#FFF8E8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 elevation-1">
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl mb-4 text-[#3D3D6B]" style={{ fontWeight: 600 }}>{feature.title}</h3>
                  <p className="text-[#5D5D7D] leading-relaxed" style={{ fontWeight: 400 }}>{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-[#6B5DD3] to-[#FFB84D] rounded-2xl p-12 text-white text-center elevation-2"
        >
          <h3 className="text-3xl mb-12" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>Trusted by Seekers Worldwide</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>12</div>
              <div className="text-white/90" style={{ fontWeight: 500 }}>Faith Traditions</div>
            </div>
            <div>
              <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>50+</div>
              <div className="text-white/90" style={{ fontWeight: 500 }}>AI Avatars</div>
            </div>
            <div>
              <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>100+</div>
              <div className="text-white/90" style={{ fontWeight: 500 }}>Languages</div>
            </div>
            <div>
              <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>24/7</div>
              <div className="text-white/90" style={{ fontWeight: 500 }}>Availability</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}