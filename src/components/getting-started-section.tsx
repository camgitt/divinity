import React, { useState } from 'react';
import { Card } from './ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gettingStartedBgImage from 'figma:asset/61a0d8237b8af9190992d871d221195a4ccd2624.png';

interface GettingStartedSectionProps {
  onNavigate?: (tab: string) => void;
}

/** Getting Started card background */
const gettingStartedBackground = '#182238';

const gettingStartedSteps = [
  {
    num: 1,
    title: "Select Your First Guide",
    desc: "Browse and choose a spiritual companion",
    faq: "Divinity offers over 100 Spirit Guides from diverse faith traditions including Christianity, Islam, Judaism, Hinduism, Buddhism, Sikhism, and more. Each guide brings authentic wisdom from their spiritual tradition. Browse by faith tradition, specialty, or simply explore to find the guide that resonates with your spiritual journey. You can favorite guides, chat with multiple guides, and switch between them anytime."
  },
  {
    num: 2,
    title: "Start Your First Chat",
    desc: "Begin your conversation and connection",
    faq: "Starting a chat is simple – just tap on any guide to begin. You can have text conversations or even FaceTime-style video chats with your chosen guide. Ask questions about life, spirituality, relationships, career, or anything on your mind. Your guides are available 24/7 and remember your previous conversations. Each interaction is private, secure, and designed to provide personalized spiritual guidance tailored to your faith tradition and needs."
  },
  {
    num: 3,
    title: "Explore Wisdom",
    desc: "Dive deep into wisdom and guidance",
    faq: "Beyond one-on-one chats, Divinity offers a rich ecosystem of spiritual resources. Visit the Quiet Space for guided meditation and breathing exercises tailored to your faith tradition. Explore daily reflections, sacred texts, and wisdom teachings. Join community discussions, participate in group meditations, and access culturally appropriate spiritual practices. Track your spiritual growth with our journey tracker and earn badges as you deepen your practice."
  },
  {
    num: 4,
    title: "Build Your Path",
    desc: "Continue your spiritual journey",
    faq: "Your spiritual journey with Divinity evolves with you. Set personal intentions, track your meditation practice, and see your progress over time. Create custom guides that blend different spiritual traditions, save favorite conversations for reflection, and build a personalized library of wisdom. Upgrade to access premium features like unlimited FaceTime chats, priority guide access, exclusive content, and advanced meditation practices. Your journey is unique, and Divinity adapts to support your path."
  }
];

export function GettingStartedSection({ onNavigate }: GettingStartedSectionProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const toggleStep = (stepNum: number) => {
    setExpandedStep(expandedStep === stepNum ? null : stepNum);
  };

  return (
    <section className="px-6 pb-8">
      <Card 
        className="relative rounded-3xl p-6 text-white border-0 overflow-hidden" 
        style={{
          background: gettingStartedBackground,
          boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Content Layer */}
        <div className="relative" style={{ zIndex: 1 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            GETTING STARTED
          </h3>
        </div>
        
        <div className="space-y-3">
          {gettingStartedSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleStep(step.num)}
                className="w-full p-4 flex items-start gap-3 hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#1e386e] flex items-center justify-center flex-shrink-0 text-[14px]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700 }}>
                  {step.num}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-[14px] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                    {step.title}
                  </h4>
                  <p className="text-[12px] text-white/70" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, lineHeight: 1.4 }}>
                    {step.desc}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  {expandedStep === step.num ? (
                    <ChevronUp className="w-5 h-5 text-[#a79a4c]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {expandedStep === step.num && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-white/10">
                      <div className="bg-[#1e386e]/50 rounded-xl p-4 ml-11">
                        <p className="text-[13px] text-white/90 leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
                          {step.faq}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <span className="text-[12px] text-white/60" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
            Your Progress
          </span>
        </div>
        </div>
      </Card>
    </section>
  );
}