import React, { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-l175bo54ve";
import posterFrame from "figma:asset/49e37dc93adea1f9d6078b6b2d8aa1042fc1afd2.png";
import homePosterFrame from "figma:asset/3c5d95850e2e76f4394e8251568719a80d474f3c.png";
import taliaAccountPoster from "figma:asset/21e408b2e35c8b43439ce2c96e7fb457c2b20b85.png";
import spiritGuidesLogo from "figma:asset/119b63701f2199b9be7602ff43ebc12f2430d996.png";
import newSpiritGuidesLogo from "figma:asset/0dbac6a9c45fedadb587a8be571ddb79ec54cfde.png";
import signInLogo from "figma:asset/08a6d5f5012f09239a6ffb3c1819a3acc78514c8.png";
import landingLogo from "figma:asset/8a5c5551533b1297b98345f7179a0a7cc8223ad5.png";
import divinityAppLogo from "figma:asset/b877d7e34c1cddfbe5f83a3020f9034cc4acc8f4.png";
import newDivinityLogo from "figma:asset/5578f3fb8f7a6eebd6ae362650e8c82d141005db.png";
import whiteDivinityLogo from "figma:asset/3a80ad2751f347b22d1a22214bdaa63d4171359e.png";
import sacredSpaceBackground from "figma:asset/23a7d89bdbc101cda39db99bc5d6108a3ab2a28a.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import { ArrowLeft, Mail, User, Globe, MapPin, Heart, CheckCircle2, Loader2, Eye, EyeOff, Lock, ChevronRight, Menu, X, Sparkles, Users, Circle, MessageCircle, Shield, Flower2, HelpCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useSubscription } from "./subscription-context";
import { useSocialMedia } from "./social-media-context";
import { useAdminMonitoring } from "./admin-monitoring-context";
import { useCrisisSupport } from "./crisis-support-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { BackgroundVideo } from "./background-video";
import { getSupabaseClient } from "./services/supabase-client";
import { createUser, createUserPreferences, createTokenBalance, createUserSubscription } from "./services/user-service";
import { EmailConfirmationHelper } from "./email-confirmation-helper";

interface LandingRegistrationPageProps {
  onComplete: () => void;
  onSkip: () => void;
  onNavigate?: (tab: string) => void;
}

type AuthMode = "signin" | "signup" | "guest" | null;
type SignupStep = 1 | 2 | 3;

export function LandingRegistrationPage({ onComplete, onSkip, onNavigate }: LandingRegistrationPageProps) {
  const { upgradeTo, setUserEmail, userEmail } = useSubscription();
  const { setCurrentUser } = useSocialMedia();
  const { trackUserSignup, trackEmailConfirmation } = useAdminMonitoring();
  const { openCrisisResources } = useCrisisSupport();
  
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [signupStep, setSignupStep] = useState<SignupStep>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isGuestUser, setIsGuestUser] = useState(false);
  
  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  
  // Sign Up Form State - Step 1: Basic Info
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Step 2: Profile Details
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [faithTradition, setFaithTradition] = useState("christianity");
  
  // Step 3: Preferences
  const [interests, setInterests] = useState<string[]>([]);
  const [signUpLocale, setSignUpLocale] = useState("en-US");
  
  // Email confirmation helper
  const [showEmailHelper, setShowEmailHelper] = useState(false);

  // Check if user is already signed in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const supabase = await getSupabaseClient();
      let hasSession = false;
      
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log('✅ User already signed in:', session.user.email);
          setIsSignedIn(true);
          setUserEmail(session.user.email || '');
          setIsGuestUser(false); // Real user, not guest
          hasSession = true;
          
          // Restore from session
          localStorage.setItem('divinityagi_user', JSON.stringify({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            username: session.user.user_metadata?.username || '',
            faithTradition: session.user.user_metadata?.faith_tradition || '',
            registeredAt: session.user.created_at
          }));
        }
      }
      
      // If no Supabase session, check localStorage for guest users
      if (!hasSession) {
        const storedUser = localStorage.getItem('divinityagi_user');
        if (storedUser) {
          setIsSignedIn(true);
          try {
            const userData = JSON.parse(storedUser);
            if (userData.email) {
              setSignInEmail(userData.email);
              setUserEmail(userData.email);
            }
            // Check if this is a guest user
            if (userData.id && userData.id.startsWith('guest-')) {
              setIsGuestUser(true);
              console.log('✅ Guest user detected:', userData.email);
            } else {
              setIsGuestUser(false);
            }
          } catch (e) {
            console.error('Failed to parse stored user:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  // Interest options
  const interestOptions = [
    "Prayer & Meditation",
    "Scripture Study",
    "Spiritual Growth",
    "Community Service",
    "Interfaith Dialogue",
    "Mindfulness",
    "Contemplative Practice",
    "Sacred Texts"
  ];

  // Faith tradition options
  const faithOptions = [
    { value: "christianity", label: "Christianity" },
    { value: "islam", label: "Islam" },
    { value: "judaism", label: "Judaism" },
    { value: "hinduism", label: "Hinduism" },
    { value: "buddhism", label: "Buddhism" },
    { value: "sikhism", label: "Sikhism" },
    { value: "bahai", label: "Bahá'í Faith" },
    { value: "jainism", label: "Jainism" },
    { value: "taoism", label: "Taoism" },
    { value: "shinto", label: "Shinto" },
    { value: "confucianism", label: "Confucianism" },
    { value: "other", label: "Other/Interfaith" }
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // ==========================================================================
  // OPTION 2: EMAIL/PASSWORD AUTHENTICATION
  // ==========================================================================

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signInEmail || !signInPassword) {
      toast.error("Please enter your email and password");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = await getSupabaseClient();
      
      if (supabase) {
        // Sign in with email/password using Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: signInEmail,
          password: signInPassword
        });

        if (error) {
          console.error('❌ Supabase sign in error:', error);
          
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else if (error.message.includes('Email not confirmed')) {
            toast.error('📧 Please confirm your email address first');
            setTimeout(() => {
              toast.info('Click "Resend Confirmation Email" below if you need a new link', {
                duration: 6000
              });
            }, 1000);
            setShowEmailHelper(true);
          } else {
            toast.error(`Sign in error: ${error.message}`);
          }
          
          setIsLoading(false);
          return;
        }

        if (!data.session || !data.user) {
          toast.error('Failed to sign in. Please try again.');
          setIsLoading(false);
          return;
        }

        console.log('✅ User signed in:', data.user.email);

        const userEmail = data.user.email || signInEmail;
        const userName = data.user.user_metadata?.full_name || userEmail.split('@')[0];
        
        setUserEmail(userEmail);
        setIsSignedIn(true);
        
        // Save user to localStorage
        localStorage.setItem('divinityagi_user', JSON.stringify({
          id: data.user.id,
          email: userEmail,
          name: userName,
          username: data.user.user_metadata?.username || '',
          faithTradition: data.user.user_metadata?.faith_tradition || '',
          registeredAt: data.user.created_at
        }));
        
        toast.success(`Welcome back, ${userName}!`);
        
      } else {
        // Fallback to demo mode if Supabase not configured
        console.warn('⚠️ Supabase not configured - using demo mode');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const userName = signInEmail.split('@')[0];
        setUserEmail(signInEmail);
        setIsSignedIn(true);
        
        localStorage.setItem('divinityagi_user', JSON.stringify({
          id: `demo-${Date.now()}`,
          email: signInEmail,
          name: userName,
          registeredAt: new Date().toISOString()
        }));
        
        toast.success(`Welcome back, ${userName}!`);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const supabase = await getSupabaseClient();
      
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error signing out:', error);
        } else {
          console.log('✅ Signed out from Supabase Auth');
        }
      }
    } catch (error) {
      console.error('Exception during sign out:', error);
    }
    
    setIsSignedIn(false);
    setUserEmail("");
    setSignInEmail("");
    setSignInPassword("");
    setAuthMode(null);
    setIsGuestUser(false);
    localStorage.removeItem('divinityagi_user');
    toast.success("Successfully signed out");
  };

  // ==========================================================================
  // SIGNUP FLOW WITH PASSWORD
  // ==========================================================================

  const handleSignUpStep1 = () => {
    if (!signUpName || !signUpEmail || !username || !signUpPassword || !signUpPasswordConfirm) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Validate password strength
    if (signUpPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    if (signUpPassword !== signUpPasswordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!isAgeVerified) {
      toast.error("You must be 13+ years old to use DivinityAGI");
      return;
    }
    
    if (!acceptedTerms) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    
    setSignupStep(2);
  };

  const handleSignUpStep2 = () => {
    if (!faithTradition) {
      toast.error("Please select your faith tradition");
      return;
    }
    setSignupStep(3);
  };

  const handleSignUpComplete = async () => {
    // Validate all required fields
    if (!signUpName || !signUpEmail || !username || !signUpPassword || !signUpPasswordConfirm) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Validate password strength
    if (signUpPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    if (signUpPassword !== signUpPasswordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!faithTradition) {
      toast.error("Please select your faith tradition");
      return;
    }
    
    if (!isAgeVerified) {
      toast.error("You must be 13+ years old to use DivinityAGI");
      return;
    }
    
    if (!acceptedTerms) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const supabase = await getSupabaseClient();
      
      let userId: string;
      
      if (supabase) {
        // Create user with Supabase Auth using REAL password
        console.log('📝 Creating account with email/password...');
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: signUpEmail,
          password: signUpPassword, // Use REAL password entered by user
          options: {
            data: {
              full_name: signUpName,
              username: username,
              faith_tradition: faithTradition,
              preferred_language: signUpLocale.split('-')[0]
            },
            emailRedirectTo: `${window.location.origin}/welcome`
          }
        });

        if (authError) {
          console.error('❌ Supabase Auth error:', authError);
          
          if (authError.message.includes('already registered') || authError.message.includes('User already registered')) {
            toast.error('This email is already registered. Please sign in instead.', {
              duration: 6000
            });
            setTimeout(() => {
              toast.info('Use the "Sign In" option below or reset your password if you forgot it.', {
                duration: 8000
              });
            }, 1000);
            // Switch to sign-in mode
            setAuthMode('signin');
            setSignInEmail(signUpEmail);
          } else {
            toast.error(`Authentication error: ${authError.message}`);
          }
          
          setIsLoading(false);
          return;
        }

        if (!authData.user) {
          toast.error('Failed to create account. Please try again.');
          setIsLoading(false);
          return;
        }

        userId = authData.user.id;
        console.log('✅ User created in Supabase Auth:', authData.user);

        // Check if session was created (auto-login)
        if (authData.session) {
          console.log('✅ Auth session available:', authData.session.user.id);
          
          // Set the session in the Supabase client
          const { error: setSessionError } = await supabase.auth.setSession({
            access_token: authData.session.access_token,
            refresh_token: authData.session.refresh_token
          });
          
          if (setSessionError) {
            console.error('❌ Failed to set auth session:', setSessionError);
          } else {
            console.log('✅ Auth session set in Supabase client');
          }
        } else {
          console.log('ℹ️ Email confirmation required - session will be created after confirmation');
          toast.info('✉️ Confirmation email sent! Please check your inbox to activate your account.', {
            duration: 6000
          });
          // Track email confirmation sent
          await trackEmailConfirmation(signUpEmail, 'sent', { 
            userName: signUpName,
            source: 'initial_signup' 
          });
        }
        
        // Wait for database trigger to complete
        console.log('⏳ Waiting for database trigger to initialize user data...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Verify that the trigger created the user record
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (userError) {
          console.warn('⚠️ Could not verify user record:', userError);
        }

        if (!userData) {
          console.warn('⚠️ Trigger may not have created user record, creating manually...');
          
          // Fallback: Create user record manually using service role
          const userResult = await createUser({
            id: userId,
            email: signUpEmail,
            full_name: signUpName,
            username: username,
            faith_tradition: faithTradition,
            preferred_language: signUpLocale.split('-')[0],
            status: 'active',
            onboarding_completed: true
          });

          if (userResult.success) {
            console.log(userResult.existing 
              ? '✅ User record already exists (retrieved)' 
              : '✅ User record created manually'
            );
          } else {
            console.warn('⚠️ Could not create/retrieve user record:', userResult.error);
            // Continue anyway - localStorage fallback is in place
          }
        } else {
          console.log('✅ User record created by trigger:', userData);
        }

        // Save to localStorage
        localStorage.setItem('divinityagi_user', JSON.stringify({
          id: userId,
          email: signUpEmail,
          name: signUpName,
          username: username,
          faithTradition: faithTradition,
          registeredAt: authData.user.created_at
        }));

        // Track signup in admin monitoring
        trackUserSignup(signUpEmail, signUpName, 'subscriber');

        // Update state
        setUserEmail(signUpEmail);
        
        // Upgrade to subscriber tier with 25 tokens (new user registration)
        upgradeTo('subscriber', signUpEmail, true);
        
        if (authData.session) {
          setIsSignedIn(true);
          toast.success(`Welcome to DivinityAGI, ${signUpName}!`);
          
          // Start onboarding
          setTimeout(() => {
            onComplete();
          }, 1500);
        } else {
          toast.success('✅ Account created! Check your email to complete activation.', {
            duration: 8000
          });
          // Show a more detailed message
          setTimeout(() => {
            toast.info(`📧 We sent a confirmation link to ${signUpEmail}. Click the link to activate your account and start your spiritual journey!`, {
              duration: 10000
            });
          }, 1000);
          setAuthMode('signin');
        }

      } else {
        // Fallback to demo mode
        console.warn('⚠️ Supabase not configured - using demo mode');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        userId = `demo-${Date.now()}`;
        
        localStorage.setItem('divinityagi_user', JSON.stringify({
          id: userId,
          email: signUpEmail,
          name: signUpName,
          username: username,
          faithTradition: faithTradition,
          registeredAt: new Date().toISOString()
        }));

        trackUserSignup(signUpEmail, signUpName, 'subscriber');
        setUserEmail(signUpEmail);
        setIsSignedIn(true);
        
        // Upgrade to subscriber tier with 25 tokens (new user registration)
        upgradeTo('subscriber', signUpEmail, true);
        
        toast.success(`Welcome to DivinityAGI, ${signUpName}!`);
        
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // ==========================================================================
  // OPTION 3: SOCIAL LOGIN (OAUTH)
  // ==========================================================================

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    
    try {
      const supabase = await getSupabaseClient();
      
      if (!supabase) {
        toast.error('Social login requires Supabase configuration');
        setIsLoading(false);
        return;
      }

      console.log(`🔐 Initiating ${provider} OAuth login...`);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/welcome`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        console.error(`❌ ${provider} OAuth error:`, error);
        toast.error(`Failed to sign in with ${provider}: ${error.message}`);
        setIsLoading(false);
        return;
      }

      console.log(`✅ ${provider} OAuth initiated`);
      // User will be redirected to OAuth provider
      // After auth, they'll be redirected back to redirectTo URL
      
    } catch (error) {
      console.error(`Unexpected error during ${provider} login:`, error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Listen for OAuth callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const supabase = await getSupabaseClient();
      if (!supabase) return;

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          console.log('✅ OAuth sign in successful:', session.user.email);
          
          const userEmail = session.user.email || '';
          const userName = session.user.user_metadata?.full_name || 
                          session.user.user_metadata?.name || 
                          userEmail.split('@')[0];
          const userId = session.user.id;

          // Check if user exists in database
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          if (!existingUser) {
            // Create user record for OAuth user
            console.log('📝 Creating database record for OAuth user...');
            
            await createUser({
              id: userId,
              email: userEmail,
              full_name: userName,
              username: userName.toLowerCase().replace(/\s+/g, '_'),
              faith_tradition: 'Not specified',
              status: 'active'
            });

            trackUserSignup(userEmail, userName, 'subscriber');
          }

          // Save to localStorage
          localStorage.setItem('divinityagi_user', JSON.stringify({
            id: userId,
            email: userEmail,
            name: userName,
            username: session.user.user_metadata?.username || userName.toLowerCase().replace(/\s+/g, '_'),
            registeredAt: session.user.created_at
          }));

          setUserEmail(userEmail);
          setIsSignedIn(true);
          
          // Upgrade to subscriber tier with 25 tokens (new user registration)
          upgradeTo('subscriber', userEmail, true);
          
          toast.success(`Welcome, ${userName}!`);
          
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    handleOAuthCallback();
  }, []);

  // ==========================================================================
  // UI RENDERING
  // ==========================================================================

  // If user is already signed in, show welcome message
  if (isSignedIn) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={homePosterFrame}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ objectPosition: 'center 30%' }}
        >
          <source src="https://divinityagi.com/wp-content/uploads/2026/01/Home-Screen-Cover.mp4" type="video/mp4" />
        </video>
        
        {/* Elegant overlay for readability */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
        
        <div className="relative z-10 text-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white backdrop-blur-xl rounded-3xl p-8 sm:p-10 max-w-md mx-auto border-2 border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-[#C9A882] mx-auto mb-6" />
            <h2 className="text-gray-900 text-2xl sm:text-3xl mb-3 font-['Raleway',sans-serif] font-bold">Welcome back!</h2>
            <p className="text-gray-600 mb-8 text-base sm:text-lg break-words px-2">You're signed in as {userEmail === 'guest@example.com' ? 'Guest' : userEmail}</p>
            
            <div className="space-y-3">
              <button 
                onClick={onComplete}
                className="relative w-full h-[52px] sm:h-[56px] flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A882] via-[#B89872] to-[#C9A882] hover:from-[#B89872] hover:via-[#A88862] hover:to-[#B89872] text-gray-900 font-['Raleway',sans-serif] font-semibold text-[15px] sm:text-[17px] transition-all duration-200 active:scale-[0.98] shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full" />
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/50 to-transparent rounded-full" />
                <span className="relative">Continue to DivinityAGI</span>
              </button>
              
              <button 
                onClick={handleSignOut}
                className="relative w-full h-[52px] sm:h-[56px] flex items-center justify-center gap-2 rounded-full bg-white/95 hover:bg-white border-2 border-gray-300 text-gray-700 font-['Raleway',sans-serif] font-semibold text-[15px] sm:text-[17px] transition-all duration-200 active:scale-[0.98] shadow-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-gray-50/30 rounded-full" />
                <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white to-transparent rounded-full" />
                <span className="relative">Sign Out</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Landing page - before selecting auth mode
  if (!authMode) {
    return (
      <div className="relative min-h-screen flex flex-col overflow-hidden bg-white">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={homePosterFrame}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        >
          <source src="https://divinityagi.com/wp-content/uploads/2026/01/Home-Screen-Cover.mp4" type="video/mp4" />
        </video>
        
        {/* Reduced overlay for better video visibility */}
        <div className="absolute inset-0 bg-black/15" />
        
        {/* Header - Logo */}
        <div className="relative z-10 w-full pt-8 sm:pt-6 pb-4">
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={divinityAppLogo}
              alt="DivinityAGI"
              className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[550px] h-auto mx-auto"
            />
          </motion.div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="fixed bottom-6 sm:bottom-8 left-0 right-0 z-20 px-4 sm:px-6 flex flex-col items-center gap-2.5">
          <div className="w-full max-w-[340px] grid grid-cols-2 gap-2">
            {/* Create Account Button */}
            <motion.button
              onClick={() => setAuthMode('signup')}
              className="relative h-[42px] sm:h-[44px] flex items-center justify-center rounded-lg bg-gradient-to-r from-[#b69e60] to-[#a08e54] hover:from-[#a58d55] hover:to-[#8f7c4a] text-white transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden active:scale-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 rounded-lg" />
              <span className="relative font-['Raleway',sans-serif] text-[13px] sm:text-[14px] font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] text-white">
                Create Account
              </span>
            </motion.button>

            {/* Sign In / Sign Out Button */}
            <motion.button
              onClick={() => isGuestUser ? handleSignOut() : setAuthMode('signin')}
              className="relative h-[42px] sm:h-[44px] flex items-center justify-center rounded-lg bg-gradient-to-r from-[#b69e60] to-[#a08e54] hover:from-[#a58d55] hover:to-[#8f7c4a] text-white transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden active:scale-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 rounded-lg" />
              <span className="relative font-['Raleway',sans-serif] text-[13px] sm:text-[14px] font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] text-white">
                {isGuestUser ? 'Sign Out' : 'Sign In'}
              </span>
            </motion.button>
          </div>

          {/* Chat Instantly - Try Free / Guest Status Button */}
          <motion.button
            onClick={() => !isGuestUser && onNavigate?.('chat-instantly')}
            className={`relative w-full max-w-[340px] h-[42px] sm:h-[44px] flex items-center justify-center gap-2 rounded-lg transition-all duration-300 shadow-md border ${
              isGuestUser 
                ? 'bg-gradient-to-r from-[#497EBC] to-[#3867a0] text-white border-[#497EBC] cursor-default' 
                : 'bg-white/20 backdrop-blur-md hover:bg-white/30 text-white hover:shadow-lg border-white/30 active:scale-95'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={!isGuestUser ? { scale: 1.02 } : {}}
            whileTap={!isGuestUser ? { scale: 0.98 } : {}}
          >
            {isGuestUser ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Heart className="w-4 h-4 fill-[#C9A882]" />
            )}
            <span className="font-['Raleway',sans-serif] text-[13px] sm:text-[14px] font-semibold tracking-wide">
              {isGuestUser ? 'Signed in as a Guest' : 'Chat Instantly - Try Free'}
            </span>
          </motion.button>
        </div>

      </div>
    );
  }

  // ==========================================================================
  // SIGN IN PAGE
  // ==========================================================================

  if (authMode === 'signin') {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1426] px-4 py-12 sm:py-8">
        {/* Dark cosmic background matching signup page */}
        <div className="absolute inset-0">
          {/* Cosmic gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1426] via-[#162844] to-[#0B1426]" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#497EBC]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A882]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* White overlay for cosmic atmosphere */}
          <div className="absolute inset-0 bg-white/5" />
        </div>
        
        <div className="relative z-10 w-full max-w-md">
          {/* Logo at Top - Fixed position */}
          <div className="fixed top-6 sm:top-8 left-0 right-0 z-[100] flex justify-center px-4">
            <img
              src={newDivinityLogo}
              alt="DIVINITY"
              className="w-[240px] sm:w-80 md:w-96 h-auto"
            />
          </div>

          <div className="mt-28 sm:mt-32">
            <Button
              onClick={() => setAuthMode(null)}
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 mb-6 rounded-xl h-[48px] backdrop-blur-sm"
              style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <Card className="border-2 border-[#a79a4c]/50 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgba(167,154,76,0.3)]" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
              <div className="text-center mb-8">
                <h2 className="text-white text-2xl sm:text-3xl mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Welcome Back</h2>
                <p className="text-white/70 mt-3 text-base sm:text-lg" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>Sign in to continue your journey</p>
              </div>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <Label htmlFor="signin-email" className="text-white/90 text-base mb-2 block" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-[#0B1426]/60 border-2 border-[#a79a4c]/30 text-white placeholder:text-white/40 focus:border-[#a79a4c] rounded-xl h-[52px] text-base"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Label htmlFor="signin-password" className="text-white/90 text-base mb-2 block" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Password</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showSignInPassword ? "text" : "password"}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-[#0B1426]/60 border-2 border-[#a79a4c]/30 text-white placeholder:text-white/40 focus:border-[#a79a4c] pr-12 rounded-xl h-[52px] text-base"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-1"
                  >
                    {showSignInPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[52px] sm:h-[56px] rounded-full bg-[#a79a4c] hover:bg-[#8b7a4a] text-white border-0 text-[15px] sm:text-[17px] transition-all duration-200 active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Social Login Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#a79a4c]/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-white/70" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  variant="outline"
                  className="border-2 border-[#1e386e] bg-[#1e386e]/20 text-white hover:bg-[#1e386e]/40 hover:border-[#1e386e] rounded-xl h-[52px]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </Button>

                <Button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                  variant="outline"
                  className="border-2 border-[#1e386e] bg-[#1e386e]/20 text-white hover:bg-[#1e386e]/40 hover:border-[#1e386e] rounded-xl h-[52px]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Button>

                <Button
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  variant="outline"
                  className="border-2 border-[#1e386e] bg-[#1e386e]/20 text-white hover:bg-[#1e386e]/40 hover:border-[#1e386e] rounded-xl h-[52px]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/70 text-base" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="text-[#a79a4c] hover:text-[#b8a85d] font-semibold"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                >
                  Sign up
                </button>
              </p>
              <button
                onClick={() => setShowEmailHelper(!showEmailHelper)}
                className="mt-4 text-[#a79a4c] hover:text-[#b8a85d] text-base underline"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}
              >
                📧 Didn't receive confirmation email?
              </button>
            </div>
            </Card>

            {/* Email Confirmation Helper - Show when requested */}
            {showEmailHelper && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6"
              >
                <EmailConfirmationHelper 
                  initialEmail={signInEmail}
                  onClose={() => setShowEmailHelper(false)}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // SIGN UP PAGE - MULTI-STEP
  // ==========================================================================

  if (authMode === 'signup') {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden pb-24">
        {/* Background Video Layer - Full Screen */}
        <BackgroundVideo
          videoSrc="https://divinityagi.com/wp-content/uploads/2026/01/Guest-Intro.mp4"
          className="fixed inset-0"
          muted={false}
          loop={false}
          videoStyle={{
            transform: 'scale(1.05) translateY(-5%)',
            transformOrigin: 'center center'
          }}
        />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" style={{ zIndex: 1 }} />
        
        {/* Logo at Top */}
        <div className="relative z-10 pt-8 sm:pt-12 flex justify-center px-4">
          <img
            src={whiteDivinityLogo}
            alt="DIVINITY"
            className="w-64 sm:w-80 md:w-96 h-auto"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 pt-8 pb-8 bg-[rgba(0,0,0,0)] mt-[43px] mr-[0px] mb-[0px] ml-[0px]">

          <Button
            onClick={() => setAuthMode(null)}
            variant="ghost"
            className="text-white hover:text-[#b69e60] hover:bg-white/20 mb-4 rounded-xl min-h-[48px] sm:h-auto backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="bg-[#162844]/60 backdrop-blur-sm border-2 border-[#b69e60] p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgba(182,158,96,0.3)] bg-[rgba(22,40,68,0.79)] mx-[0px] my-[150px]">
            {/* Single Step Sign Up */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-white text-xl sm:text-2xl font-['Raleway',sans-serif] font-bold">Create Your Account</h2>
                <p className="text-white/70 mt-2 text-sm sm:text-base">Join the DivinityAGI community</p>
              </div>

                <div>
                  <Label htmlFor="signup-name" className="text-white/90 text-sm">Full Name *</Label>
                  <Input
                    id="signup-name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-[#0B1426]/60 border-2 border-[#b69e60]/30 text-white placeholder:text-white/40 focus:border-[#b69e60] rounded-xl min-h-[48px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-email" className="text-white/90 text-sm">Email *</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="bg-[#0B1426]/60 border-2 border-[#b69e60]/30 text-white placeholder:text-white/40 focus:border-[#b69e60] rounded-xl min-h-[48px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-username" className="text-white/90 text-sm">Username *</Label>
                  <Input
                    id="signup-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johndoe"
                    className="bg-[#0B1426]/60 border-2 border-[#b69e60]/30 text-white placeholder:text-white/40 focus:border-[#b69e60] rounded-xl min-h-[48px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password" className="text-white/90 text-sm">Password *</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showSignUpPassword ? "text" : "password"}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="bg-[#0B1426]/60 border-2 border-[#b69e60]/30 text-white placeholder:text-white/40 focus:border-[#b69e60] pr-10 rounded-xl min-h-[48px]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-white/50 text-xs mt-1">At least 6 characters</p>
                </div>

                <div>
                  <Label htmlFor="signup-password-confirm" className="text-white/90 text-sm">Confirm Password *</Label>
                  <Input
                    id="signup-password-confirm"
                    type={showSignUpPassword ? "text" : "password"}
                    value={signUpPasswordConfirm}
                    onChange={(e) => setSignUpPasswordConfirm(e.target.value)}
                    placeholder="Re-enter your password"
                    className="bg-[#0B1426]/60 border-2 border-[#b69e60]/30 text-white placeholder:text-white/40 focus:border-[#b69e60] rounded-xl min-h-[48px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="faith-tradition" className="text-white/90 text-sm">Faith Tradition *</Label>
                  <select
                    id="faith-tradition"
                    value={faithTradition}
                    onChange={(e) => setFaithTradition(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#0B1426]/60 border-2 border-[#b69e60]/30 text-white focus:border-[#b69e60] min-h-[48px]"
                    required
                  >
                    {faithOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#0B1426]">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="locale" className="text-white/90 text-sm">Preferred Language *</Label>
                  <select
                    id="locale"
                    value={signUpLocale}
                    onChange={(e) => setSignUpLocale(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#0B1426]/60 border-2 border-[#b69e60]/30 text-white focus:border-[#b69e60] min-h-[48px]"
                  >
                    <option value="en-US" className="bg-[#0B1426]">English (US)</option>
                    <option value="es-ES" className="bg-[#0B1426]">Español</option>
                    <option value="fr-FR" className="bg-[#0B1426]">Français</option>
                    <option value="ar-SA" className="bg-[#0B1426]">العربية</option>
                    <option value="hi-IN" className="bg-[#0B1426]">हिन्दी</option>
                    <option value="zh-CN" className="bg-[#0B1426]">中文</option>
                  </select>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="age-verify"
                    checked={isAgeVerified}
                    onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
                    className="border-2 border-[#b69e60]/50"
                  />
                  <label htmlFor="age-verify" className="text-white/80 text-sm cursor-pointer">
                    I confirm that I am 13 years or older
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="border-2 border-[#b69e60]/50"
                  />
                  <label htmlFor="terms" className="text-white/80 text-sm cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <button
                  onClick={handleSignUpComplete}
                  disabled={isLoading}
                  className="relative w-full h-[40px] sm:h-[46px] flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#b69e60] via-[#a88e56] to-[#b69e60] hover:from-[#c4ab6d] hover:via-[#b69e60] hover:to-[#c4ab6d] text-gray-900 font-['Raleway',sans-serif] font-semibold text-[14px] sm:text-[16px] transition-all duration-200 active:scale-[0.98] shadow-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#b69e60]/40 via-[#b69e60]/10 to-transparent rounded-full" />
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/50 to-transparent rounded-full" />
                  <span className="relative flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating your account...</span>
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </span>
                </button>

                {/* Social Sign Up */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#b69e60]/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#162844]/60 text-white/60">Or sign up with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      variant="outline"
                      className="border-2 border-[#b69e60]/30 text-white hover:bg-[#b69e60]/20 hover:border-[#b69e60]/50 rounded-xl min-h-[48px]"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </Button>

                    <Button
                      type="button"
                      onClick={() => handleSocialLogin('facebook')}
                      variant="outline"
                      className="border-2 border-[#b69e60]/30 text-white hover:bg-[#b69e60]/20 hover:border-[#b69e60]/50 rounded-xl min-h-[48px]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </Button>

                    <Button
                      type="button"
                      onClick={() => handleSocialLogin('apple')}
                      variant="outline"
                      className="border-2 border-[#b69e60]/30 text-white hover:bg-[#b69e60]/20 hover:border-[#b69e60]/50 rounded-xl min-h-[48px]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-white/70 text-sm">
                    Already have an account?{' '}
                    <button
                      onClick={() => setAuthMode('signin')}
                      className="text-[#b69e60] hover:text-[#c4ab6d] font-semibold"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}