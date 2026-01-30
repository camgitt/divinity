import { motion } from "motion/react";
import { useTimer } from "./timer-context";
import { useSubscription } from "./subscription-context";
import { useGuestMode } from "./guest-mode-context";
import { Timer, Menu, X, Users, Circle, Sparkles, Flower2, Shield, User, Heart, HelpCircle, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import spiritGuidesLogo from "figma:asset/029577c8d493e50233dc3c91517732567d175971.png";
import whiteDivinityLogo from "figma:asset/3a80ad2751f347b22d1a22214bdaa63d4171359e.png";
import divinityAppLogo from "figma:asset/b877d7e34c1cddfbe5f83a3020f9034cc4acc8f4.png";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useCrisisSupport } from "./crisis-support-context";

interface AppHeaderProps {
  onLogoClick?: () => void;
  onTokenClick?: () => void;
  onNavigate?: (tab: string) => void;
  onOpenMission?: () => void;
}

export function AppHeader({ onLogoClick, onTokenClick, onNavigate, onOpenMission }: AppHeaderProps) {
  const { formatTime } = useTimer();
  const { openPortal, currentSubscription } = useSubscription();
  const { isGuestMode, guestSessionActive, guestTimeRemaining, endGuestSession } = useGuestMode();
  const { openCrisisResources } = useCrisisSupport();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use tokens from subscription context
  const currentTokens = currentSubscription.tokens;

  const handleLogoClick = () => {
    if (isGuestMode && guestSessionActive) {
      // Guest user clicks logo - sign them out
      endGuestSession();
      if (onLogoClick) {
        onLogoClick(); // Navigate to registration
      }
    } else {
      // Regular user clicks logo
      if (onLogoClick) {
        onLogoClick();
      }
    }
  };

  // Display guest timer (10 min) or regular timer
  const displayTime = isGuestMode && guestSessionActive 
    ? '10 MIN' 
    : `${currentTokens} MIN`;

  const handleTokenClick = () => {
    if (isGuestMode && guestSessionActive) {
      // Guest users can't access token features - prompt upgrade
      openPortal('upgrade-prompt');
    } else {
      // Always show subscription plans when clicking token counter
      openPortal('manual');
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#C9A882]/20 px-4 sm:px-6 py-4 shadow-sm">
        <div className="relative flex items-center justify-between max-w-7xl mx-auto gap-4">
          {/* Hamburger Menu Button - Left Side */}
          <motion.button
            onClick={handleMenuClick}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-[#C9A882]/10 to-[#C9A882]/5 border-2 border-[#C9A882] hover:bg-gradient-to-br hover:from-[#C9A882]/20 hover:to-[#C9A882]/10 transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-[#497EBC]" />
            ) : (
              <Menu className="w-5 h-5 text-[#497EBC]" />
            )}
          </motion.button>

          {/* Logo - Center */}
          <motion.div
            onClick={handleLogoClick}
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img 
              src={divinityAppLogo} 
              alt="DivinityAGI" 
              className="h-[40px] sm:h-[48px] w-auto object-contain"
            />
          </motion.div>

          {/* Token Meter - Right Side */}
          <motion.div
            onClick={handleTokenClick}
            className="flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge className="bg-[#1e386e] hover:bg-[#2a4a8e] text-[rgb(255,255,255)] border-2 border-[#1e386e] hover:border-[#2a4a8e] px-4 py-2.5 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg rounded-full flex items-center justify-center gap-2 whitespace-nowrap">
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">{displayTime}</span>
              <span className="sm:hidden">
                {isGuestMode && guestSessionActive ? '10' : `${currentTokens}`}
              </span>
            </Badge>
          </motion.div>
        </div>
      </header>

      {/* Side Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Side Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#1a2d4a] to-[#0f1a2e] shadow-2xl z-[101] overflow-y-auto rounded-r-3xl"
            >
              {/* Panel Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col items-center gap-4">
                  {/* Logo */}
                  <img 
                    src={whiteDivinityLogo} 
                    alt="DIVINITY" 
                    className="w-48 h-auto object-contain"
                  />
                  {/* Close Button */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors self-end absolute top-6 right-6"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-6 space-y-6 pb-8">
                {/* Navigation Section */}
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider px-2 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Navigate
                  </h3>

                  {/* AI Companion */}
                  <button
                    onClick={() => handleNavigate("chat2")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Sparkles className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>My Spirit Guides</span>
                  </button>

                  {/* Faith Leaders */}
                  <button
                    onClick={() => handleNavigate("leaders")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Shield className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Verified Leaders</span>
                  </button>

                  {/* Spirit Guides */}
                  <button
                    onClick={() => handleNavigate("guides")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Users className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Spirit Guide Gallery</span>
                  </button>

                  {/* Circle of Faith */}
                  <button
                    onClick={() => handleNavigate("community")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Circle className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Circle of Faith</span>
                  </button>

                  {/* Quiet Space */}
                  <button
                    onClick={() => handleNavigate("quiet-space")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Flower2 className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>My Quiet Space</span>
                  </button>

                  {/* Community Circle */}
                  <button
                    onClick={() => {
                      handleNavigate("profile");
                      // Set the Social tab active after navigation
                      setTimeout(() => {
                        const socialTabButton = document.querySelector('[data-tab="social"]');
                        if (socialTabButton instanceof HTMLButtonElement) {
                          socialTabButton.click();
                        }
                        // Scroll to Community Circle section
                        setTimeout(() => {
                          const communitySection = document.getElementById('community-circle-section');
                          if (communitySection) {
                            communitySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 200);
                      }, 100);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Users className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Community Circle</span>
                  </button>

                  {/* Profile */}
                  <button
                    onClick={() => handleNavigate("profile")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <User className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>My Profile</span>
                  </button>
                </div>

                {/* Need Help Section - Enhanced Dark */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#2d4a6b]/40 to-[#1e3a5a]/40 rounded-3xl p-6 border-2 border-[#E53935]/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-full flex items-center justify-center shadow-lg">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Need Help?
                        </h3>
                        <p className="text-xs text-white/70" style={{ fontFamily: "'Raleway', sans-serif" }}>
                          We're here for you 24/7
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/80 mb-4 leading-relaxed" style={{ fontFamily: "'Raleway', sans-serif" }}>
                      If you're experiencing a crisis or need immediate support, access our comprehensive crisis resources and helplines.
                    </p>
                    
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        openCrisisResources();
                      }}
                      className="w-full flex items-center justify-center gap-3 p-4 rounded-full bg-gradient-to-r from-[#E53935] to-[#C62828] hover:from-[#C62828] hover:to-[#B71C1C] text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-[15px]"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-semibold" style={{ fontFamily: "'Raleway', sans-serif" }}>Access Crisis Support</span>
                    </button>
                    
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-xs text-white/60 text-center" style={{ fontFamily: "'Raleway', sans-serif" }}>
                        Available worldwide • Confidential • Free
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Links Section */}
                <div className="space-y-1 pt-4 border-t border-white/10">
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider px-2 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Quick Links
                  </h3>

                  {/* Our Mission */}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenMission?.();
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <HelpCircle className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Our Mission</span>
                  </button>

                  {/* Spirit Guides */}
                  <button
                    onClick={() => handleNavigate("guides")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Users className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Spirit Guides</span>
                  </button>

                  {/* Privacy */}
                  <button
                    onClick={() => handleNavigate("privacy")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Shield className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Privacy</span>
                  </button>

                  {/* Terms */}
                  <button
                    onClick={() => handleNavigate("terms")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Shield className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Terms</span>
                  </button>

                  {/* Contact */}
                  <a
                    href="mailto:support@divinityagi.com"
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 text-[#497EBC]" />
                    <span className="font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>Contact</span>
                  </a>
                </div>

                {/* Copyright */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-white/40 text-center" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    © 2025 DivinityAGI
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}