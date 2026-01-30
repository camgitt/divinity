import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { X, Heart, Shield, Users, Globe, AlertCircle } from "lucide-react";

interface OurMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OurMissionModal({ isOpen, onClose }: OurMissionModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl mx-auto"
        >
          <Card className="bg-white border-2 border-[#a79a4c]/50 backdrop-blur-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#a79a4c]/30">
              <h2 className="text-2xl text-[#3D3D6B]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Our Mission</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:text-[#3D3D6B] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-3 sm:p-6 space-y-3 sm:space-y-5 overflow-y-auto max-h-[70vh] sm:max-h-[80vh]">
              {/* Main Mission Statement */}
              <div className="text-center space-y-2 sm:space-y-3">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#a79a4c] rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <p className="text-gray-700 leading-snug text-xs sm:text-sm lg:text-base px-1 sm:px-0" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                  DivinityAGI creates a sacred space where all faith traditions are honored and respected. Through ethical AI and culturally sensitive design, we provide personalized spiritual guidance that fosters understanding, promotes interfaith dialogue, and supports your unique spiritual journey—whether you're navigating life's challenges, seeking daily inspiration, or exploring deeper spiritual questions.
                </p>
              </div>
              
              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                <div className="text-center p-2 sm:p-3 border-2 border-[#a79a4c]/40 rounded-lg" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                  <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-[#a79a4c] mx-auto mb-1 sm:mb-2" />
                  <h3 className="text-white mb-1 text-xs sm:text-sm" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Ethical AI</h3>
                  <p className="text-white/80 text-xs leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    Privacy-first technology that respects your personal beliefs and cultural background
                  </p>
                </div>
                
                <div className="text-center p-2 sm:p-3 border-2 border-[#a79a4c]/40 rounded-lg" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                  <Users className="w-5 h-5 sm:w-7 sm:h-7 text-[#a79a4c] mx-auto mb-1 sm:mb-2" />
                  <h3 className="text-white mb-1 text-xs sm:text-sm" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Inclusive Community</h3>
                  <p className="text-white/80 text-xs leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    Welcome to seekers from all paths, fostering understanding across faith traditions
                  </p>
                </div>
                
                <div className="text-center p-2 sm:p-3 border-2 border-[#a79a4c]/40 rounded-lg sm:col-span-2 lg:col-span-1" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                  <Globe className="w-5 h-5 sm:w-7 sm:h-7 text-[#a79a4c] mx-auto mb-1 sm:mb-2" />
                  <h3 className="text-white mb-1 text-xs sm:text-sm" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Global Wisdom</h3>
                  <p className="text-white/80 text-xs leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    Drawing from diverse spiritual traditions to enrich your personal journey
                  </p>
                </div>
              </div>
              
              {/* Safety Notice */}
              <div className="border-2 border-[#a79a4c] rounded-lg p-2 sm:p-3" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-[#a79a4c] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[#a79a4c] mb-1 text-xs sm:text-sm" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Your Wellbeing Matters</h4>
                    <p className="text-white/80 text-xs leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                      DivinityAGI is designed to complement, not replace, professional mental health care, religious counseling, or emergency services. We're here to support your spiritual growth while prioritizing your safety and wellbeing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-[#a79a4c]/30">
              <Button
                onClick={onClose}
                className="bg-[#a79a4c] hover:bg-[#8b7a4a] text-white border-0"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
              >
                Close
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}