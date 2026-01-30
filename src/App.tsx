import React, { useState, useEffect, lazy, Suspense } from "react";
import { LandingHero } from "./components/landing-hero";
import { FeaturesSection } from "./components/features-section";
import { OnboardingSteps } from "./components/onboarding-steps";
import { SubscriptionSystem } from "./components/subscription-system";
import { AppHeader } from "./components/app-header";
import { TimerProvider } from "./components/timer-context";
import { SubscriptionProvider } from "./components/subscription-context";
import { BadgesProvider } from "./components/badges-context";
import { ThemeProvider } from "./components/theme-context";
import { SavedGuidesProvider, useSavedGuides } from "./components/saved-guides-context";
import { CreatedGuideProvider } from "./components/created-guide-context";
import { MatchedQuietSpaceProvider, useMatchedQuietSpace } from "./components/matched-quiet-space-context";
import { ArchivedQuietSpacesProvider } from "./components/archived-quiet-spaces-context";
import { SoundProvider } from "./components/sound-context";
import { EngagementProvider } from "./components/engagement-tracker";
import { GlobalSubscriptionPortal } from "./components/global-subscription-portal";
import { AgeGateModal } from "./components/age-gate-modal";
import { OurMissionModal } from "./components/our-mission-modal";
import { GuideMatchingProcess } from "./components/guide-matching-process";
import { ChatInstantlyForm } from "./components/chat-instantly-form";
import { Button } from "./components/ui/button";
import { toast, Toaster } from "sonner@2.0.3";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useSubscription } from "./components/subscription-context";
import { AppFooter } from "./components/app-footer";
import { GlobalBadgeNotifications } from "./components/global-badge-notifications";
import { TimerBadgeIntegration } from "./components/timer-badge-integration";
import { SubscriptionSignupFlow } from "./components/subscription-signup-flow";

// Force rebuild to load environment variables - DO NOT REMOVE
import { LandingRegistrationPage } from "./components/landing-registration-page";
import { HapticProvider } from "./components/hooks/use-haptic";
import { VerifiedLeaderUsageProvider } from "./components/verified-leader-usage-tracker";
import { CrisisSupportProvider } from "./components/crisis-support-context";
import { CrisisResourcesModal } from "./components/crisis-resources-modal";
import { JournalProvider } from "./components/journal-context";
import { JournalPage } from "./components/journal-page";
import { SpiritualGoalsPage } from "./components/spiritual-goals-page";
import { PrivacyDashboard } from "./components/privacy-dashboard";
import { LocalizationProvider } from "./components/localization-context";
import { CommunityProvider } from "./components/community-context";
import { CommunityHubPage } from "./components/community-hub-page";
import { SocialMediaProvider } from "./components/social-media-context";
import { EnhancedCommunityHub } from "./components/enhanced-community-hub";
import { FaithGroupDetailPage } from "./components/faith-group-detail-page";
import { MeditationProvider } from "./components/meditation-context";
import { FavoriteMantrasProvider } from "./components/favorite-mantras-context";
import { EnhancedQuietSpace } from "./components/enhanced-quiet-space";
import { GuestModeProvider } from "./components/guest-mode-context";
import { AnalyticsProvider } from "./components/analytics-context";
import { AnalyticsDashboardPage } from "./components/analytics-dashboard-page";
import { AdminMonitoringProvider } from "./components/admin-monitoring-context";
import { AdminDashboardPage } from "./components/admin-dashboard-page";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { X, Mic } from "lucide-react";
import { AmbientSoundProvider } from "./contexts/ambient-sound-context";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// Core components
import { CircleOfFaiths } from "./components/circle-of-faiths";
import { Contributors } from "./components/contributors";
import { Chat2 } from "./components/chat2";
import { ChatErrorBoundary } from "./components/chat-error-boundary";
import { VerifiedLeaders } from "./components/verified-leaders";
import { ProfilePage } from "./components/profile-page";
import { FaithSpecificPage } from "./components/faith-specific-page";
import { AffiliateProgramPage } from "./components/affiliate-program-page";
import { BillingHistoryPage } from "./components/billing-history-page";
import { BillingPage } from "./components/billing-page";
import { PrivacyPage } from "./components/privacy-page";
import { TermsPage } from "./components/terms-page";
import { LeaderProfilePage } from "./components/leader-profile-page";
import { VerifiedLeaderDashboard } from "./components/verified-leader-dashboard";
import { QuietSpacePage } from "./components/quiet-space-page-REFACTORED";
import { QuietSpaceAmbient } from "./components/quiet-space-ambient";
import { QuietSpaceAmbientEnhanced } from "./components/quiet-space-ambient-enhanced";
import { AtmosphereProvider } from "./components/atmosphere-context";

// Lazy load components to improve performance
const SpiritGuidePage = lazy(() => import("./components/spirit-guide-page").then(m => ({ default: m.SpiritGuidePage })));

// Lazy load faith page components to improve build performance
const HinduismFaithPage = lazy(() => import("./components/hinduism-faith-page").then(m => ({ default: m.HinduismFaithPage })));
const BuddhismFaithPage = lazy(() => import("./components/buddhism-faith-page").then(m => ({ default: m.BuddhismFaithPage })));
const IslamicFaithPage = lazy(() => import("./components/islamic-faith-page").then(m => ({ default: m.IslamicFaithPage })));
const JudaismFaithPage = lazy(() => import("./components/judaism-faith-page").then(m => ({ default: m.JudaismFaithPage })));
const TaoismFaithPage = lazy(() => import("./components/taoism-faith-page").then(m => ({ default: m.TaoismFaithPage })));
const DaoismFaithPage = lazy(() => import("./components/daoism-faith-page").then(m => ({ default: m.DaoismFaithPage })));
const ShintoFaithPage = lazy(() => import("./components/shinto-faith-page").then(m => ({ default: m.ShintoFaithPage })));
const JainismFaithPage = lazy(() => import("./components/jainism-faith-page").then(m => ({ default: m.JainismFaithPage })));
const PolytheismFaithPage = lazy(() => import("./components/polytheism-faith-page").then(m => ({ default: m.PolytheismFaithPage })));
const ConfucianismFaithPage = lazy(() => import("./components/confucianism-faith-page").then(m => ({ default: m.ConfucianismFaithPage })));
const BahaiFaithPage = lazy(() => import("./components/bahai-faith-page").then(m => ({ default: m.BahaiFaithPage })));
const SikhismFaithPage = lazy(() => import("./components/sikhism-faith-page").then(m => ({ default: m.SikhismFaithPage })));
const ChristianFaithPage = lazy(() => import("./components/christian-faith-page").then(m => ({ default: m.ChristianFaithPage })));
const UniversalFaithPage = lazy(() => import("./components/universal-faith-page").then(m => ({ default: m.UniversalFaithPage })));

type TabType = "home" | "guides" | "circle" | "chat" | "chat2" | "profile" | "leaders" | "contributors" | "subscription" | "guide-process" | "guide-process-privacy" | "settings" | "affiliate" | "registration" | "billing" | "privacy" | "terms" | "leader-steinruck" | "leader-flaming-eagle" | "verified-leader-dashboard" | "journal" | "goals" | "privacy-dashboard" | "community" | "meditation" | "analytics" | "admin" | "group-detail" | "quiet-space" | "quiet-space-ambient" | "chat-instantly" | "badges";
type ContributorType = "ministry" | "individual" | null;

export default function App() {
  // Main app - no admin routing
  return <MainApp />;
}

function MainApp() {
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Check if user is already registered, if so start on guides page
  const getInitialTab = (): TabType => {
    try {
      // Check if there's a tab parameter in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam) {
        return tabParam as TabType;
      }
      
      // Check if the URL path is for admin (e.g., /admin or #admin)
      const path = window.location.pathname + window.location.hash;
      if (path.includes('admin')) {
        return 'admin';
      }
      
      const storedUser = localStorage.getItem('divinityagi_user');
      if (storedUser) {
        return "guides"; // User is registered, go to guides
      }
    } catch (e) {
      console.error('Failed to check user registration:', e);
    }
    return "registration"; // New user, show registration
  };
  
  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab());
  const [currentFaith, setCurrentFaith] = useState<{key: string, name: string, selectedAgent?: string} | null>(null);
  const [viewingGroupId, setViewingGroupId] = useState<string | null>(null);
  const [selectedGuideToOpen, setSelectedGuideToOpen] = useState<{
    id: string;
    name: string;
    chatUrl: string;
    faithColor?: string;
  } | null>(null);
  
  // Get user's faith preference from localStorage
  const getUserFaithPreference = (): string | null => {
    try {
      const storedUser = localStorage.getItem('divinityagi_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log('📖 Reading faith preference from localStorage:', userData.faithTradition);
        return userData.faithTradition || null;
      }
    } catch (e) {
      console.error('Failed to get faith preference:', e);
    }
    return null;
  };
  
  const [userFaithPreference, setUserFaithPreference] = useState<string | null>(getUserFaithPreference());
  
  // Update faith preference when user registers or navigates to guides
  useEffect(() => {
    if (activeTab === 'guides') {
      const updatedPreference = getUserFaithPreference();
      if (updatedPreference !== userFaithPreference) {
        console.log('✨ Updating faith preference to:', updatedPreference);
        setUserFaithPreference(updatedPreference);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Overlay state for guide chat
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [overlayFaithColor, setOverlayFaithColor] = useState('#497EBC');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [overlayGuideImage, setOverlayGuideImage] = useState('');
  const [overlayGuideRole, setOverlayGuideRole] = useState('Spiritual Guide');
  const [conversationStarted, setConversationStarted] = useState(false);

  // Global audio error handler to suppress external audio loading errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Suppress audio loading errors from external sources
      if (event.message && event.message.includes('Failed to load because no supported source was found')) {
        event.preventDefault();
        console.debug('Audio load error suppressed (external audio unavailable)');
        return true;
      }
    };

    window.addEventListener('error', handleError, true);
    
    return () => {
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGetStarted = () => {
    setShowAgeGate(true);
  };

  const handleAgeGateComplete = () => {
    toast.success("Welcome to DivinityAGI! Your spiritual guide has been created.");
    setActiveTab("chat");
  };

  const handleSelectPlan = (plan: string) => {
    toast.success(`Great choice! You selected the ${plan} plan.`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string, data?: any) => {
    // Handle special navigation cases
    if (tab === 'group-detail' && data?.groupId) {
      setViewingGroupId(data.groupId);
      setActiveTab(tab as TabType);
    } else if (['christianity', 'islam', 'judaism', 'hinduism', 'buddhism', 'taoism', 'daoism', 'shinto', 'jainism', 'confucianism', 'polytheism', 'sikhism', 'bahai', 'universal'].includes(tab)) {
      // Faith page navigation with optional selected agent
      setCurrentFaith({ 
        key: tab, 
        name: tab.charAt(0).toUpperCase() + tab.slice(1),
        selectedAgent: data?.selectedAgent
      });
    } else {
      setActiveTab(tab as TabType);
      setCurrentFaith(null);
      setViewingGroupId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMission = () => {
    setShowMissionModal(true);
  };

  const handleOpenOverlay = (open: boolean) => {
    setIsOverlayOpen(open);
    if (open) {
      // Reset conversation state when opening overlay
      setConversationStarted(false);
    }
  };

  const handleNavigateToFaith = (faithKey: string, faithName: string) => {
    setCurrentFaith({ key: faithKey, name: faithName });
  };

  const handleBackFromFaith = () => {
    setCurrentFaith(null);
  };

  const handleStartFaithChat = () => {
    setActiveTab("chat");
    setCurrentFaith(null);
  };

  const handleBackFromGroup = () => {
    setViewingGroupId(null);
    setActiveTab("circle");
  };

  const handleOpenGuide = (guide: { id: string; name: string; chatUrl: string; faithColor?: string; image?: string; role?: string; }) => {
    // Open the guide in overlay without navigating
    setOverlayUrl(guide.chatUrl);
    setOverlayAgentName(guide.name);
    setOverlayFaithColor(guide.faithColor || '#497EBC');
    setOverlayGuideImage(guide.image || '');
    setOverlayGuideRole(guide.role || 'Spiritual Guide');
    setConversationStarted(false); // Reset conversation state
    setIsIframeLoading(true);
    setIsOverlayOpen(true);
    
    toast.success(`Opening conversation with ${guide.name}`, { duration: 2000 });
  };

  // Loading fallback component
  const LoadingFallback = () => (
    <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  );

  // Render current page content
  const renderCurrentPage = () => {
    // If viewing a specific group, show group detail page
    if (viewingGroupId) {
      return (
        <FaithGroupDetailPage 
          groupId={viewingGroupId}
          onNavigate={handleTabChange}
          onBack={handleBackFromGroup}
        />
      );
    }

    // If we're viewing a specific faith, show the appropriate faith-specific page
    if (currentFaith) {
      const commonProps = {
        onBack: handleBackFromFaith,
        onOpenMission: handleOpenMission,
        onStartChat: handleStartFaithChat,
        onNavigate: handleTabChange,
        selectedAgent: currentFaith.selectedAgent,
      };

      // Only create the specific component needed - using direct conditional rendering
      if (currentFaith.key === 'hinduism') {
        return <Suspense fallback={<LoadingFallback />}><HinduismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'buddhism') {
        return <Suspense fallback={<LoadingFallback />}><BuddhismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'islam') {
        return <Suspense fallback={<LoadingFallback />}><IslamicFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'judaism') {
        return <Suspense fallback={<LoadingFallback />}><JudaismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'taoism') {
        return <Suspense fallback={<LoadingFallback />}><TaoismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'daoism') {
        return <Suspense fallback={<LoadingFallback />}><DaoismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'shinto') {
        return <Suspense fallback={<LoadingFallback />}><ShintoFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'jainism') {
        return <Suspense fallback={<LoadingFallback />}><JainismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'polytheism') {
        return <Suspense fallback={<LoadingFallback />}><PolytheismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'confucianism') {
        return <Suspense fallback={<LoadingFallback />}><ConfucianismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'bahai') {
        return <Suspense fallback={<LoadingFallback />}><BahaiFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'sikhism') {
        return <Suspense fallback={<LoadingFallback />}><SikhismFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'christianity') {
        return <Suspense fallback={<LoadingFallback />}><ChristianFaithPage {...commonProps} /></Suspense>;
      }
      if (currentFaith.key === 'universal') {
        return <Suspense fallback={<LoadingFallback />}><UniversalFaithPage {...commonProps} /></Suspense>;
      }
      
      // Default fallback for unknown faith
      return (
        <FaithSpecificPage
          faithKey={currentFaith.key}
          faithName={currentFaith?.name || "Unknown Faith"}
          {...commonProps}
        />
      );
    }

    switch (activeTab) {
      case "registration":
        return (
          <LandingRegistrationPage
            onComplete={() => handleTabChange("chat2")}
            onSkip={() => handleTabChange("guides")}
            onNavigate={handleTabChange}
          />
        );
      case "guides":
        return <Suspense fallback={<LoadingFallback />}><SpiritGuidePage key={`guides-${userFaithPreference || 'default'}`} onNavigate={handleTabChange} onOpenMission={handleOpenMission} onOpenGuide={handleOpenGuide} initialFaithPreference={userFaithPreference} /></Suspense>;
      case "circle":
        return <CircleOfFaiths onOpenMission={handleOpenMission} onNavigateToFaith={handleNavigateToFaith} onNavigate={handleTabChange} />;
      case "chat2":
        return (
          <ChatErrorBoundary onNavigate={handleTabChange}>
            <Chat2 
              onOpenMission={handleOpenMission} 
              onNavigate={handleTabChange}
              setOverlayUrl={setOverlayUrl}
              setOverlayAgentName={setOverlayAgentName}
              setOverlayFaithColor={setOverlayFaithColor}
              setIsIframeLoading={setIsIframeLoading}
              setIsOverlayOpen={handleOpenOverlay}
              setOverlayGuideImage={setOverlayGuideImage}
              setOverlayGuideRole={setOverlayGuideRole}
            />
          </ChatErrorBoundary>
        );
      case "journal":
        return <JournalPage onNavigate={handleTabChange} onOpenMission={handleOpenMission} />;
      case "goals":
        return <SpiritualGoalsPage onNavigate={handleTabChange} onOpenMission={handleOpenMission} />;
      case "privacy-dashboard":
        return <PrivacyDashboard onNavigate={handleTabChange} onBack={() => handleTabChange("profile")} />;
      case "community":
        return <CircleOfFaiths onOpenMission={handleOpenMission} onNavigateToFaith={handleNavigateToFaith} onNavigate={handleTabChange} />;
      case "meditation":
        return <EnhancedQuietSpace onNavigate={handleTabChange} onOpenMission={handleOpenMission} />;
      case "quiet-space":
        return <QuietSpacePage onNavigate={handleTabChange} onOpenMission={handleOpenMission} />;
      case "quiet-space-ambient":
        return <QuietSpaceAmbientEnhanced onBack={() => handleTabChange("meditation")} />;
      case "analytics":
        return <AnalyticsDashboardPage onNavigate={handleTabChange} onBack={() => handleTabChange("profile")} onOpenMission={handleOpenMission} />;
      case "admin":
        return <AdminDashboardPage onBack={() => handleTabChange("profile")} />;
      case "leaders":
        return <VerifiedLeaders onNavigate={handleTabChange} onOpenMission={handleOpenMission} />;
      case "leader-steinruck":
        return <LeaderProfilePage leaderId="steinruck" onNavigate={handleTabChange} onBack={() => handleTabChange("leaders")} onOpenMission={handleOpenMission} />;
      case "leader-flaming-eagle":
        return <LeaderProfilePage leaderId="flaming-eagle" onNavigate={handleTabChange} onBack={() => handleTabChange("leaders")} onOpenMission={handleOpenMission} />;
      case "profile":
        return <ProfilePage onNavigate={handleTabChange} onOpenMission={handleOpenMission} />;
      case "badges":
        return <ProfilePage onNavigate={handleTabChange} onOpenMission={handleOpenMission} initialTab="badges" />;
      case "contributors":
        // Check if there's an initial type stored (from affiliate program navigation)
        const storedType = localStorage.getItem('divinityagi_contributor_initial_type') as ContributorType | null;
        if (storedType) {
          localStorage.removeItem('divinityagi_contributor_initial_type'); // Clear after reading
        }
        return <Contributors onOpenMission={handleOpenMission} onNavigate={handleTabChange} initialType={storedType || undefined} />;
      case "subscription":
        return <SubscriptionSystem onBack={() => handleTabChange("profile")} onOpenMission={handleOpenMission} onNavigate={handleTabChange} />;
      case "billing":
        return <BillingPage />;
      case "guide-process":
        return <GuideMatchingProcess onNavigate={handleTabChange} onOpenMission={handleOpenMission} />;
      case "guide-process-privacy":
        return <GuideMatchingProcess onNavigate={handleTabChange} onOpenMission={handleOpenMission} initialStep={1} />;
      case "chat-instantly":
        return <ChatInstantlyForm onNavigate={handleTabChange} />;
      case "affiliate":
        return <AffiliateProgramPage onBack={() => handleTabChange("guides")} onOpenMission={handleOpenMission} onNavigate={handleTabChange} />;
      case "privacy":
        return <PrivacyPage onBack={() => handleTabChange("circle")} onOpenMission={handleOpenMission} onNavigate={handleTabChange} />;
      case "terms":
        return <TermsPage onBack={() => handleTabChange("circle")} onOpenMission={handleOpenMission} onNavigate={handleTabChange} />;
      case "verified-leader-dashboard":
        return <VerifiedLeaderDashboard onBack={() => handleTabChange("affiliate")} onOpenMission={handleOpenMission} onNavigate={handleTabChange} />;
      case "home":
      default:
        return (
          <div className="min-h-screen bg-background">
            <LandingHero onGetStarted={() => handleTabChange("registration")} />
            <FeaturesSection />
            <OnboardingSteps onStartJourney={() => handleTabChange("registration")} />
            <AppFooter onOpenMission={handleOpenMission} onNavigate={handleTabChange} />
          </div>
        );
    }
  };

  return (
    <LocalizationProvider>
      <SocialMediaProvider>
        <CommunityProvider>
          <ThemeProvider>
          <HapticProvider>
            <SoundProvider>
              <CrisisSupportProvider>
                <JournalProvider>
                  <TimerProvider>
                    <SubscriptionProvider>
                      <GuestModeProvider>
                      <VerifiedLeaderUsageProvider>
                        <EngagementProvider>
                          <BadgesProvider>
                            <MeditationProvider>
                              <FavoriteMantrasProvider>
                                <AmbientSoundProvider>
                                <AtmosphereProvider>
                                <AnalyticsProvider>
                                  <AdminMonitoringProvider>
                                    <SavedGuidesProvider>
                                      <CreatedGuideProvider>
                                        <MatchedQuietSpaceProvider>
                                          <ArchivedQuietSpacesProvider>
                                            <AppContent 
                      activeTab={activeTab}
                      handleTabChange={handleTabChange}
                      handleOpenMission={handleOpenMission}
                      showScrollTop={showScrollTop}
                      scrollToTop={scrollToTop}
                      renderCurrentPage={renderCurrentPage}
                      showAgeGate={showAgeGate}
                      setShowAgeGate={setShowAgeGate}
                      handleAgeGateComplete={handleAgeGateComplete}
                      showMissionModal={showMissionModal}
                      setShowMissionModal={setShowMissionModal}
                      isOverlayOpen={isOverlayOpen}
                      setIsOverlayOpen={setIsOverlayOpen}
                      overlayUrl={overlayUrl}
                      overlayAgentName={overlayAgentName}
                      overlayFaithColor={overlayFaithColor}
                      isIframeLoading={isIframeLoading}
                      setIsIframeLoading={setIsIframeLoading}
                      overlayGuideImage={overlayGuideImage}
                      setOverlayGuideImage={setOverlayGuideImage}
                      overlayGuideRole={overlayGuideRole}
                      setOverlayGuideRole={setOverlayGuideRole}
                      conversationStarted={conversationStarted}
                      setConversationStarted={setConversationStarted}
                      />
                                          </ArchivedQuietSpacesProvider>
                                        </MatchedQuietSpaceProvider>
                                      </CreatedGuideProvider>
                                    </SavedGuidesProvider>
                                  </AdminMonitoringProvider>
                                </AnalyticsProvider>
                              </AtmosphereProvider>
                                </AmbientSoundProvider>
                            </FavoriteMantrasProvider>
                          </MeditationProvider>
                          </BadgesProvider>
                        </EngagementProvider>
                      </VerifiedLeaderUsageProvider>
                      </GuestModeProvider>
                    </SubscriptionProvider>
                  </TimerProvider>
                </JournalProvider>
              </CrisisSupportProvider>
            </SoundProvider>
          </HapticProvider>
          </ThemeProvider>
        </CommunityProvider>
      </SocialMediaProvider>
    </LocalizationProvider>
  );
}

interface AppContentProps {
  activeTab: TabType;
  handleTabChange: (tab: string) => void;
  handleOpenMission: () => void;
  showScrollTop: boolean;
  scrollToTop: () => void;
  renderCurrentPage: () => JSX.Element;
  showAgeGate: boolean;
  setShowAgeGate: (show: boolean) => void;
  handleAgeGateComplete: () => void;
  showMissionModal: boolean;
  setShowMissionModal: (show: boolean) => void;
  isOverlayOpen: boolean;
  setIsOverlayOpen: (show: boolean) => void;
  overlayUrl: string;
  overlayAgentName: string;
  overlayFaithColor: string;
  isIframeLoading: boolean;
  setIsIframeLoading: (show: boolean) => void;
  overlayGuideImage: string;
  setOverlayGuideImage: (image: string) => void;
  overlayGuideRole: string;
  setOverlayGuideRole: (role: string) => void;
  conversationStarted: boolean;
  setConversationStarted: (started: boolean) => void;
}

function AppContent({
  activeTab,
  handleTabChange,
  handleOpenMission,
  showScrollTop,
  scrollToTop,
  renderCurrentPage,
  showAgeGate,
  setShowAgeGate,
  handleAgeGateComplete,
  showMissionModal,
  setShowMissionModal,
  isOverlayOpen,
  setIsOverlayOpen,
  overlayUrl,
  overlayAgentName,
  overlayFaithColor,
  isIframeLoading,
  setIsIframeLoading,
  overlayGuideImage,
  setOverlayGuideImage,
  overlayGuideRole,
  setOverlayGuideRole,
  conversationStarted,
  setConversationStarted
}: AppContentProps) {
  const { isPortalOpen, closePortal, triggerContext, isSignupFlowOpen, closeSignupFlow } = useSubscription();
  const { clearCompanionGuides } = useSavedGuides();
  const { clearMatchedSpace } = useMatchedQuietSpace();

  // Global reset function for guest mode
  const resetGuestModeData = () => {
    console.log('🔄 Resetting guest mode data...');
    clearCompanionGuides(); // Clear companion guides from Chat 2
    clearMatchedSpace(); // Clear matched quiet space
    console.log('✅ Guest mode data reset complete');
  };

  // Listen for guest mode activation
  useEffect(() => {
    const handleGuestModeActivation = () => {
      resetGuestModeData();
    };

    // Custom event for guest mode activation
    window.addEventListener('divinityagi:guest-mode', handleGuestModeActivation);

    return () => {
      window.removeEventListener('divinityagi:guest-mode', handleGuestModeActivation);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* App Header - show on all pages except home, subscription, guide-process, billing, registration, privacy, verified-leader-dashboard, and leader profiles */}
      {!["home", "subscription", "guide-process", "guide-process-privacy", "chat-instantly", "billing", "registration", "privacy", "leader-steinruck", "leader-flaming-eagle", "verified-leader-dashboard"].includes(activeTab) && (
        <AppHeader 
          onLogoClick={() => handleTabChange("registration")}
          onTokenClick={() => handleTabChange("subscription")}
          onNavigate={handleTabChange}
          onOpenMission={handleOpenMission}
        />
      )}

      {/* Current Page Content */}
      <div className="min-h-screen">
        {renderCurrentPage()}
      </div>

      {/* Global Subscription Portal */}
      <GlobalSubscriptionPortal
        isOpen={isPortalOpen}
        onClose={closePortal}
        triggerContext={triggerContext}
        onNavigate={handleTabChange}
      />

      {/* Age Gate Modal */}
      <AgeGateModal
        isOpen={showAgeGate}
        onClose={() => setShowAgeGate(false)}
        onComplete={handleAgeGateComplete}
      />

      {/* Our Mission Modal */}
      <OurMissionModal
        isOpen={showMissionModal}
        onClose={() => setShowMissionModal(false)}
      />

      {/* Global Badge Notifications */}
      <GlobalBadgeNotifications />
      
      {/* Timer Badge Integration */}
      <TimerBadgeIntegration />

      {/* Subscription Signup Flow */}
      <SubscriptionSignupFlow
        isOpen={isSignupFlowOpen}
        onClose={closeSignupFlow}
        onNavigate={handleTabChange}
        onComplete={() => {
          toast.success("Your subscription has been activated!");
          handleTabChange("profile");
        }}
      />

      {/* Crisis Resources Modal */}
      <CrisisResourcesModal />

      {/* Global Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={(open) => { setIsOverlayOpen(open); if (!open) setConversationStarted(false); }}>
        <DialogContent 
          className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-gradient-to-b from-[#2A3441] to-[#1C232E] overflow-hidden [&>button]:hidden touch-pan-y"
          style={{ borderColor: `${overlayFaithColor}30` }}
        >
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          
          {!conversationStarted ? (
            /* Start Frame */
            <div className="relative w-full h-full flex flex-col">
              {/* Header with title and close button */}
              <div className="relative z-10 flex items-center justify-between p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse" 
                    style={{ backgroundColor: overlayFaithColor }}
                  />
                  <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOverlayOpen(false)} 
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all" 
                  aria-label="Close conversation"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Guide Image - Full screen portrait */}
              <div className="flex-1 relative overflow-hidden">
                {overlayGuideImage ? (
                  <ImageWithFallback 
                    src={overlayGuideImage} 
                    alt={overlayAgentName}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-700 to-slate-800">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-slate-600 mx-auto mb-4"></div>
                      <p className="text-white text-lg">{overlayAgentName}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Start Conversation Button - Positioned over the image */}
              <div className="absolute bottom-0 left-0 right-0 pb-32 px-6 z-10">
                <Button
                  onClick={() => setConversationStarted(true)}
                  className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 rounded-2xl px-6 py-6 text-base font-medium shadow-lg transition-all"
                >
                  <Mic className="w-5 h-5" />
                  <span>Start conversation</span>
                </Button>
              </div>

              {/* Guide Name/Role Badge - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
                <div className="text-center">
                  <p className="text-white text-sm font-medium">{overlayGuideRole}</p>
                </div>
              </div>
            </div>
          ) : (
            /* Conversation Mode - Show iframe */
            <>
              <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse shadow-lg" 
                    style={{ backgroundColor: overlayFaithColor, boxShadow: `0 0 20px ${overlayFaithColor}50` }}
                  />
                  <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOverlayOpen(false)} 
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] transition-all duration-300 hover:scale-110" 
                  style={{ 
                    borderColor: `${overlayFaithColor}30`,
                    color: overlayFaithColor
                  }}
                  aria-label="Close conversation"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              {isIframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
                  <div className="text-center space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                      <div 
                        className="absolute inset-0 rounded-full border-4"
                        style={{ borderColor: `${overlayFaithColor}20` }}
                      ></div>
                      <div 
                        className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                        style={{ borderColor: overlayFaithColor }}
                      ></div>
                    </div>
                    <p className="text-slate-300 text-sm">Connecting to {overlayAgentName}...</p>
                  </div>
                </div>
              )}
              <div className="w-full h-full pt-12 sm:pt-16">
                {overlayUrl && <iframe src={overlayUrl} className="w-full h-full border-0" title={`Chat with ${overlayAgentName}`} allow="microphone *; camera *; autoplay; encrypted-media; fullscreen" onLoad={() => setIsIframeLoading(false)} loading="eager" />}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />

      {/* Scroll to Top Button - only show on home page */}
      {showScrollTop && activeTab === "home" && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 w-12 h-12 bg-gradient-to-r from-[#497EBC] to-[#1E3A5F] hover:from-[#3A6BA5] hover:to-[#497EBC] text-white rounded-full shadow-lg hover:shadow-teal-500/30 flex items-center justify-center transition-all duration-300 z-40 border border-[#497EBC]/30 backdrop-blur-sm hover:-translate-y-0.5 hover:scale-110"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}