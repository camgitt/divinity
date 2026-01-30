import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BackgroundVideo } from './background-video';
import { ArrowLeft, Sparkles, Users, Heart, MessageCircle } from 'lucide-react';

interface ProfileIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted?: () => void;
}

export function ProfileIntroModal({ isOpen, onClose, onGetStarted }: ProfileIntroModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Background Video */}
          <BackgroundVideo
            videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Profile-Intro-1.mp4"
            className="fixed inset-0"
            muted={false}
            loop={false}
            videoStyle={{
              transform: 'scale(1.5)',
              objectPosition: 'center 20%'
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" style={{ zIndex: 1 }} />

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col overflow-hidden"
          >
            {/* Header with Back Button */}
            <div className="p-6 flex items-center flex-shrink-0">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-[52px] mt-[-89px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[16px] pl-[16px]">
              <div className="flex flex-col min-h-full mt-[-54px] mr-[0px] mb-[-107px] ml-[0px]">
                {/* Title Section */}
                <div className="text-center pt-2 sm:pt-4 mt-[75px] mr-[0px] mb-[54px] ml-[0px]">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#7A4FFF]/30 to-[#FFD369]/30 backdrop-blur-md border border-white/30 flex items-center justify-center animate-pulse">
                      <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  <h1 
                    className="text-white text-[24px] sm:text-[28px] mb-1.5" 
                    style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 700 }}
                  >
                    Your Spiritual Profile
                  </h1>
                  <p 
                    className="text-white/80 text-[12px] sm:text-[13px] max-w-xs mx-auto px-4"
                    style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 400 }}
                  >
                    Track your journey, connect with others.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="space-y-2.5 sm:space-y-3 sm:mt-6 mt-[235px] mr-[0px] mb-[0px] ml-[0px]">
                  {/* Feature 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 rounded-2xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 
                            className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Personalized Journey
                          </h3>
                          <p 
                            className="text-white/70 text-[11px] sm:text-[12px]"
                            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 400 }}
                          >
                            Track your progress and spiritual growth
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Feature 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 rounded-2xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 
                            className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Connect with Guides
                          </h3>
                          <p 
                            className="text-white/70 text-[11px] sm:text-[12px]"
                            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 400 }}
                          >
                            Access 100+ AI spiritual companions
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Feature 3 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 rounded-2xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 
                            className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 600 }}
                          >
                            Daily Support
                          </h3>
                          <p 
                            className="text-white/70 text-[11px] sm:text-[12px]"
                            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 400 }}
                          >
                            Your spiritual companion is always here
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 mb-4"
                >
                  <Button
                    onClick={() => {
                      onGetStarted?.();
                      onClose();
                    }}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-[#7A4FFF] to-[#9D7FFF] hover:from-[#6A3FEF] hover:to-[#8D6FEF] text-white rounded-full border-0 shadow-[0_10px_40px_rgba(122,79,255,0.5)] hover:shadow-[0_15px_50px_rgba(122,79,255,0.6)] transition-all duration-300 text-[16px] sm:text-[18px]"
                    style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 600 }}
                  >
                    Explore Your Profile
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}