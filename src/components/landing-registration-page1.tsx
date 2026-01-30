import React, { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-l175bo54ve";
import posterFrame from "figma:asset/49e37dc93adea1f9d6078b6b2d8aa1042fc1afd2.png";
import spiritGuidesLogo from "figma:asset/18cc30da426a3271a0cbced5656b46ccf7e6143b.png"; // Spirit Guides logo
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import { ArrowLeft, Mail, User, Globe, MapPin, Heart, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useSubscription } from "./subscription-context";
import { useSocialMedia } from "./social-media-context";
import { useAdminMonitoring } from "./admin-monitoring-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { BackgroundVideo } from "./background-video";
import { getSupabaseClient } from "./services/supabase-client";
import { createUser, createUserPreferences, createTokenBalance, createUserSubscription } from "./services/user-service";

interface LandingRegistrationPageProps {
  onComplete: () => void;
  onSkip: () => void;
}

type AuthMode = "signin" | "signup" | "guest" | null;
type SignupStep = 1 | 2 | 3;

export function LandingRegistrationPage({ onComplete, onSkip }: LandingRegistrationPageProps) {
  const { upgradeTo, setUserEmail, userEmail } = useSubscription();
  const { setCurrentUser } = useSocialMedia();
  const { trackUserSignup } = useAdminMonitoring();
  
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [signupStep, setSignupStep] = useState<SignupStep>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  
  // Sign Up Form State - Step 1: Basic Info
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
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
  
  // Magic Link Sent State
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  // Check if user is already signed in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('divinityagi_user');
    if (storedUser) {
      setIsSignedIn(true);
      // Also restore email from stored user
      try {
        const userData = JSON.parse(storedUser);
        if (userData.email) {
          setSignInEmail(userData.email);
          setUserEmail(userData.email);
        }
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
  }, [setUserEmail]);

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
    { value: "taoism", label: "Taoism" },
    { value: "jainism", label: "Jainism" },
    { value: "shinto", label: "Shinto" },
    { value: "other", label: "Other" }
  ];

  const handleSignIn = async () => {
    if (!signInEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const supabase = await getSupabaseClient();
      
      if (supabase) {
        // Send magic link via Supabase Auth
        const { error } = await supabase.auth.signInWithOtp({
          email: signInEmail,
          options: {
            emailRedirectTo: window.location.origin
          }
        });

        if (error) {
          console.error('Error sending magic link:', error);
          toast.error(`Failed to send magic link: ${error.message}`);
          setIsLoading(false);
          return;
        }

        setMagicLinkSent(true);
        toast.success(`Magic link sent to ${signInEmail}! Check your email.`);
        
        console.log('✅ Magic link sent via Supabase Auth');
        
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            console.log('✅ User signed in:', session.user);
            const userEmail = session.user.email || signInEmail;
            const userName = session.user.user_metadata?.full_name || userEmail.split('@')[0];
            
            setUserEmail(userEmail);
            setIsSignedIn(true);
            
            // Save user to database (create if doesn't exist)
            const userResult = await createUser({
              id: session.user.id,
              email: userEmail,
              username: session.user.user_metadata?.username || userName.toLowerCase().replace(/\s+/g, '_'),
              full_name: userName,
              faith_tradition: session.user.user_metadata?.faith_tradition || 'Not specified'
            });

            // Create related records ONLY if user was just created (not existing)
            if (userResult.success && userResult.source === 'supabase' && !userResult.existing) {
              await createUserPreferences({
                user_id: session.user.id,
                preferred_faith_traditions: session.user.user_metadata?.faith_tradition ? [session.user.user_metadata.faith_tradition] : []
              });
              
              await createTokenBalance({
                user_id: session.user.id,
                daily_tokens: 50
              });
              
              await createUserSubscription({
                user_id: session.user.id,
                tier_id: 'subscriber',
                status: 'active'
              });

              // Track in admin monitoring only for new users
              trackUserSignup(userEmail, userName, 'subscriber');
              console.log('✅ New user created with all related records');
            } else if (userResult.existing) {
              console.log('✅ Existing user logged in - no new records created');
            }
            
            // Save user info to localStorage
            localStorage.setItem('divinityagi_user', JSON.stringify({
              id: session.user.id,
              email: userEmail,
              name: userName,
              username: session.user.user_metadata?.username || '',
              faithTradition: session.user.user_metadata?.faith_tradition || '',
              registeredAt: session.user.created_at
            }));
            
            toast.success("Successfully signed in!");
          }
        });
      } else {
        // Fallback to demo mode if Supabase not configured
        console.warn('⚠️ Supabase not configured - using demo magic link');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMagicLinkSent(true);
        toast.success(`Magic link sent to ${signInEmail}! Check your email.`);
        
        // For demo purposes, simulate immediate sign in
        setTimeout(async () => {
          const userName = signInEmail.split('@')[0];
          const userId = `demo-${Date.now()}`;
          
          setUserEmail(signInEmail);
          setIsSignedIn(true);
          
          // Save user to database even in demo mode
          const userResult = await createUser({
            id: userId,
            email: signInEmail,
            username: userName.toLowerCase().replace(/\s+/g, '_'),
            full_name: userName,
            faith_tradition: 'Not specified'
          });

          // Create related records ONLY for new users
          if (userResult.success && !userResult.existing) {
            await createUserPreferences({
              user_id: userId,
              preferred_faith_traditions: []
            });
            
            await createTokenBalance({
              user_id: userId,
              daily_tokens: 50
            });
            
            await createUserSubscription({
              user_id: userId,
              tier_id: 'subscriber',
              status: 'active'
            });

            trackUserSignup(signInEmail, userName, 'subscriber');
            console.log('✅ New demo user created');
          } else if (userResult.existing) {
            console.log('✅ Existing demo user logged in');
          }
          
          localStorage.setItem('divinityagi_user', JSON.stringify({
            id: userId,
            email: signInEmail,
            name: userName,
            registeredAt: new Date().toISOString()
          }));
          toast.success("Successfully signed in!");
        }, 2000);
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
    setMagicLinkSent(false);
    setAuthMode(null);
    localStorage.removeItem('divinityagi_user');
    toast.success("Successfully signed out");
  };

  const handleSignUpStep1 = () => {
    if (!signUpName || !signUpEmail || !username) {
      toast.error("Please fill in all required fields");
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
    setIsLoading(true);
    
    try {
      // Get Supabase client
      const supabase = await getSupabaseClient();
      
      let userId: string;
      
      if (supabase) {
        // Create user with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: signUpEmail,
          password: Math.random().toString(36).slice(-12), // Generate random password for magic link
          options: {
            data: {
              full_name: signUpName,
              username: username,
              faith_tradition: faithTradition
            }
          }
        });

        if (authError) {
          console.error('Supabase Auth error:', authError);
          toast.error(`Authentication error: ${authError.message}`);
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

        // CRITICAL: Verify we have a session from signup
        if (!authData.session) {
          console.error('❌ No session returned from signup');
          toast.error('Authentication session error. Please try again.');
          setIsLoading(false);
          return;
        }
        
        console.log('✅ Auth session available:', authData.session.user.id);
        
        // CRITICAL: Manually set the session in the Supabase client
        // This ensures subsequent queries have the auth token
        const { error: setSessionError } = await supabase.auth.setSession({
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token
        });
        
        if (setSessionError) {
          console.error('❌ Failed to set auth session:', setSessionError);
          toast.error('Authentication session error. Please try again.');
          setIsLoading(false);
          return;
        }
        
        console.log('✅ Auth session set in Supabase client');
        
        // Wait briefly for the database trigger to complete
        // The trigger automatically creates user, preferences, tokens, and subscription
        console.log('⏳ Waiting for database trigger to initialize user data...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Increased to 2s for trigger

        // Verify that the trigger created the user record
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (userError || !userData) {
          console.warn('⚠️ Trigger may not have created user record, creating manually...');
          
          // Fallback: Create user record manually
          const userResult = await createUser({
            id: userId,
            email: signUpEmail,
            full_name: signUpName,
            username: username,
            faith_tradition: faithTradition,
            preferred_language: signUpLocale.split('-')[0],
            bio: bio || "Spiritual seeker on a journey of growth and discovery.",
            location: location || "",
            website: website || "",
            interests: interests,
            locale: signUpLocale,
            status: 'active',
            onboarding_completed: true
          });

          if (!userResult.success) {
            console.error('❌ Failed to create user record:', userResult.error);
            
            // Check if it's an RLS error
            if (userResult.error?.code === '42501') {
              console.log('%c ', 'font-size: 1px;');
              console.log('%c╔════════════════════════════════════════════════════════════════════════╗', 'color: #ff0000; font-weight: bold; font-size: 14px;');
              console.log('%c║                                                                        ║', 'color: #ff0000; font-weight: bold; font-size: 14px;');
              console.log('%c║   🚨  DATABASE MIGRATION REQUIRED  🚨                                  ║', 'color: #ff0000; font-weight: bold; font-size: 14px;');
              console.log('%c║                                                                        ║', 'color: #ff0000; font-weight: bold; font-size: 14px;');
              console.log('%c╠════════════════════════════════════════════════════════════════════════╣', 'color: #ff0000; font-weight: bold; font-size: 14px;');
              console.log('%c║                                                                        ║', 'color: #ff6600; font-size: 13px;');
              console.log('%c║  📋 QUICK FIX (5 minutes):                                            ║', 'color: #ff6600; font-size: 13px;');
              console.log('%c║                                                                        ║', 'color: #ff6600; font-size: 13px;');
              console.log('%c║  1. Go to: https://app.supabase.com → SQL Editor                      ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║                                                                        ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║  2. Open: /supabase/migrations/APPLY_THIS_MIGRATION.sql               ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║                                                                        ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║  3. Copy ALL content → Paste in SQL Editor → Click "Run"              ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║                                                                        ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║  4. Wait for: 🎉 MIGRATION SUCCESSFUL!                                ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║                                                                        ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║  5. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Win)    ║', 'color: #ffaa00; font-size: 12px;');
              console.log('%c║                                                                        ║', 'color: #ff6600; font-size: 13px;');
              console.log('%c╠════════════════════════════════════════════════════════════════════════╣', 'color: #ff0000; font-weight: bold; font-size: 14px;');
              console.log('%c║                                                                        ║', 'color: #00ccff; font-size: 12px;');
              console.log('%c║  📖 Detailed instructions: /DATABASE_MIGRATION_REQUIRED.md             ║', 'color: #00ccff; font-size: 12px;');
              console.log('%c║  📖 Quick checklist: /START_HERE.md                                    ║', 'color: #00ccff; font-size: 12px;');
              console.log('%c║                                                                        ║', 'color: #00ccff; font-size: 12px;');
              console.log('%c╚════════════════════════════════════════════════════════════════════════╝', 'color: #ff0000; font-weight: bold; font-size: 14px;');
              console.log('%c ', 'font-size: 1px;');
              
              toast.error(
                'Database migration required! Check console for step-by-step instructions.',
                { duration: 15000 }
              );
              setIsLoading(false);
              return;
            }
          }

          // Also create preferences, tokens, and subscription
          const prefsResult = await createUserPreferences({
            user_id: userId,
            theme: 'light',
            ambient_sound_enabled: true,
            ambient_sound_type: null,
            ambient_sound_volume: 50,
            notifications_enabled: true,
            email_notifications: true,
            daily_reflection_time: '08:00:00'
          });

          if (prefsResult && !prefsResult.success && prefsResult.error?.code === '42501') {
            console.error('RLS error on user_preferences - migration not applied');
            toast.error('Database setup incomplete. Check console for instructions.', { duration: 10000 });
            setIsLoading(false);
            return;
          }

          const tokenResult = await createTokenBalance({
            user_id: userId,
            daily_tokens: 50,
            purchased_tokens: 0,
            bonus_tokens: 0,
            total_tokens_earned: 50,
            total_tokens_spent: 0
          });

          if (tokenResult && !tokenResult.success && tokenResult.error?.code === '42501') {
            console.error('RLS error on token_balances - migration not applied');
            toast.error('Database setup incomplete. Check console for instructions.', { duration: 10000 });
            setIsLoading(false);
            return;
          }

          const subResult = await createUserSubscription({
            user_id: userId,
            tier_id: 'subscriber',
            status: 'active'
          });

          if (subResult && !subResult.success && subResult.error?.code === '42501') {
            console.error('RLS error on user_subscriptions - migration not applied');
            toast.error('Database setup incomplete. Check console for instructions.', { duration: 10000 });
            setIsLoading(false);
            return;
          }
        } else {
          console.log('✅ User record created by trigger:', userData);
        }

        console.log('✅ User fully initialized in Supabase');
      } else {
        // Fallback to localStorage only if Supabase not configured
        userId = `local_${Date.now()}`;
        console.warn('⚠️ Supabase not configured - using localStorage only');
      }
      
      // Create user profile for context
      const newUser = {
        id: userId,
        username,
        name: signUpName,
        email: signUpEmail,
        bio: bio || "Spiritual seeker on a journey of growth and discovery.",
        location: location || "",
        website: website || "",
        faithTradition,
        interests,
        locale: signUpLocale,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        joinedDate: new Date().toISOString(),
        followersCount: 0,
        followingCount: 0,
        postsCount: 0
      };

      // Save to contexts
      setCurrentUser(newUser);
      setUserEmail(signUpEmail);
      
      // Upgrade tier from seeker to subscriber
      upgradeTo('subscriber');
      
      // Save to localStorage for quick access
      localStorage.setItem('divinityagi_user', JSON.stringify({
        id: userId,
        email: signUpEmail,
        name: signUpName,
        username,
        faithTradition: faithTradition,
        interests: interests,
        bio: bio,
        location: location,
        website: website,
        locale: signUpLocale,
        registeredAt: new Date().toISOString()
      }));

      console.log('💾 Saved user registration to localStorage with faith preference:', faithTradition);
      console.log('✨ When Guides page loads, this faith will be displayed first!');

      // Track signup in admin monitoring
      trackUserSignup(signUpEmail, signUpName, 'subscriber');
      
      setIsLoading(false);
      toast.success("Account created successfully! Welcome to DivinityAGI!");
      
      onComplete();
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Guest Account Handler - simplified flow
  const handleGuestAccountCreate = async () => {
    if (!signUpName || !faithTradition) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!isAgeVerified) {
      toast.error("You must be 13+ years old to use DivinityAGI");
      return;
    }

    setIsLoading(true);
    
    // Simulate guest account creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create guest profile with unique ID
    const guestId = `guest-${Date.now()}`;
    const guestEmail = `guest_${Date.now()}@divinityagi.guest`;
    const guestUsername = `guest_${Date.now()}`;
    
    const guestUser = {
      id: guestId,
      username: guestUsername,
      name: signUpName,
      email: guestEmail,
      bio: "Guest user exploring DivinityAGI",
      location: '',
      website: '',
      faithTradition,
      interests,
      locale: signUpLocale,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=guest${Date.now()}`,
      joinedDate: new Date().toISOString(),
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      isGuest: true  // Mark as guest account
    };

    // Save guest to database
    const userResult = await createUser({
      id: guestId,
      email: guestEmail,
      username: guestUsername,
      full_name: signUpName,
      faith_tradition: faithTradition
    });

    if (userResult.success) {
      // Create related records
      await createUserPreferences({
        user_id: guestId,
        preferred_faith_traditions: [faithTradition],
        preferred_language: signUpLocale
      });
      
      await createTokenBalance({
        user_id: guestId,
        daily_tokens: 10  // Limited tokens for guests
      });
      
      await createUserSubscription({
        user_id: guestId,
        tier: 'seeker',
        status: 'active'
      });

      console.log('✅ Guest account saved to database');
    }

    // Save to contexts
    setCurrentUser(guestUser);
    setUserEmail(guestEmail);
    
    // Track guest signup in admin monitoring
    trackUserSignup(guestEmail, signUpName, 'seeker');
    
    setIsLoading(false);
    toast.success("Guest account created! Explore DivinityAGI.");
    
    // Dispatch custom event to reset guest mode data
    window.dispatchEvent(new CustomEvent('divinityagi:guest-mode'));
    
    onSkip();  // Continue as guest
  };

  // If showing auth forms
  if (authMode === 'signin') {
    return (
      <div className="min-h-screen bg-[#0B1426] relative overflow-hidden">
        {/* Dark Cosmic Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cosmic background image */}
          <div className="absolute inset-0 -top-20 h-[120vh]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1711994872230-e3cb2690b54d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBzdGFycyUyMGdhbGF4eSUyMHVuaXZlcnNlJTIwcGFydG5lcnNoaXB8ZW58MXx8fHwxNzU5ODc5NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cosmic Background"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-25 mix-blend-multiply scale-105"
            />
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/40 via-[#0B1426]/60 via-[#162844]/70 to-[#0B1426]/95" />
          </div>
          
          {/* Purple and gold accent overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(122,79,255,0.15),_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,211,105,0.12),_transparent_60%)]" />
          
          {/* Atmospheric depth layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(122,79,255,0.08),_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,_rgba(255,211,105,0.06),_transparent_60%)]" />
          
          {/* Enhanced multi-layer texture system */}
          <div 
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(122, 79, 255, 0.15) 2px,
                  rgba(122, 79, 255, 0.15) 4px
                )
              `
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 3px,
                  rgba(255, 211, 105, 0.1) 3px,
                  rgba(255, 211, 105, 0.1) 6px
                )
              `
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.05] mix-blend-screen"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(122,79,255,0.2) 1px, transparent 0)
              `,
              backgroundSize: '24px 24px'
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(122,79,255,0.15) 1px, transparent 0),
                radial-gradient(circle at 16px 16px, rgba(255,211,105,0.1) 1px, transparent 0)
              `,
              backgroundSize: '32px 32px, 28px 28px'
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 8px,
                  rgba(122, 79, 255, 0.05) 8px,
                  rgba(122, 79, 255, 0.05) 9px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 8px,
                  rgba(122, 79, 255, 0.05) 8px,
                  rgba(122, 79, 255, 0.05) 9px
                )
              `
            }}
          />

          {/* Floating spiritual elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#7A4FFF] rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
          {/* Back button */}
          <button
            onClick={() => {
              setAuthMode(null);
              setMagicLinkSent(false);
            }}
            className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-[#FFD369] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-['Raleway',sans-serif] font-medium">Back</span>
          </button>

          <Card className="w-full max-w-md p-8 space-y-6 bg-[#162844]/60 backdrop-blur-sm border-[#7A4FFF]/30 shadow-[0_8px_30px_rgba(122,79,255,0.3)]">
            <div className="text-center space-y-2">
              <h2 className="text-2xl text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                {isSignedIn ? "Signed In" : "Sign In"}
              </h2>
              <p className="text-white/70 text-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>
                {isSignedIn ? "You are currently signed in" : "We'll send you a magic link to sign in"}
              </p>
            </div>

            {isSignedIn ? (
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-green-400" />
                </div>
                <p className="text-white" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Signed in as: <span className="font-semibold text-[#FFD369]">{signInEmail}</span>
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={onComplete}
                    className="w-full bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] hover:from-[#6A3FEF] hover:to-[#F5A83D] text-white"
                  >
                    Continue to App
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full border-[#7A4FFF] text-white hover:bg-[#7A4FFF]/20"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : magicLinkSent ? (
              <div className="text-center space-y-4">
                <Mail className="w-16 h-16 mx-auto text-[#7A4FFF]" />
                <div className="space-y-2">
                  <p className="text-white font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    Check your email!
                  </p>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    We sent a magic link to {signInEmail}
                  </p>
                </div>
                <Button
                  onClick={() => setMagicLinkSent(false)}
                  variant="outline"
                  className="w-full border-[#7A4FFF]/50 text-white hover:bg-[#7A4FFF]/20"
                >
                  Try different email
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="border-[#7A4FFF]/30 focus:border-[#7A4FFF] bg-[#0B1426]/40 text-white placeholder:text-white/40"
                  />
                </div>
                <Button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] hover:from-[#6A3FEF] hover:to-[#F5A83D] text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending Magic Link...
                    </>
                  ) : (
                    "Send Magic Link"
                  )}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  if (authMode === 'signup') {
    return (
      <div className="min-h-screen bg-[#0B1426] relative overflow-hidden">
        {/* Dark Cosmic Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cosmic background image */}
          <div className="absolute inset-0 -top-20 h-[120vh]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1711994872230-e3cb2690b54d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBzdGFycyUyMGdhbGF4eSUyMHVuaXZlcnNlJTIwcGFydG5lcnNoaXB8ZW58MXx8fHwxNzU5ODc5NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cosmic Background"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-25 mix-blend-multiply scale-105"
            />
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/40 via-[#0B1426]/60 via-[#162844]/70 to-[#0B1426]/95" />
          </div>
          
          {/* Purple and gold accent overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(122,79,255,0.15),_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,211,105,0.12),_transparent_60%)]" />
          
          {/* Atmospheric depth layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(122,79,255,0.08),_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,_rgba(255,211,105,0.06),_transparent_60%)]" />
          
          {/* Enhanced multi-layer texture system */}
          <div 
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(122, 79, 255, 0.15) 2px,
                  rgba(122, 79, 255, 0.15) 4px
                )
              `
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 3px,
                  rgba(255, 211, 105, 0.1) 3px,
                  rgba(255, 211, 105, 0.1) 6px
                )
              `
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.05] mix-blend-screen"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(122,79,255,0.2) 1px, transparent 0)
              `,
              backgroundSize: '24px 24px'
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(122,79,255,0.15) 1px, transparent 0),
                radial-gradient(circle at 16px 16px, rgba(255,211,105,0.1) 1px, transparent 0)
              `,
              backgroundSize: '32px 32px, 28px 28px'
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 8px,
                  rgba(122, 79, 255, 0.05) 8px,
                  rgba(122, 79, 255, 0.05) 9px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 8px,
                  rgba(122, 79, 255, 0.05) 8px,
                  rgba(122, 79, 255, 0.05) 9px
                )
              `
            }}
          />

          {/* Floating spiritual elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#7A4FFF] rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
          {/* Back button */}
          <button
            onClick={() => {
              if (signupStep > 1) {
                setSignupStep(prev => (prev - 1) as SignupStep);
              } else {
                setAuthMode(null);
                setSignupStep(1);
              }
            }}
            className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-[#FFD369] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-['Raleway',sans-serif] font-medium">Back</span>
          </button>

          <Card className="w-full max-w-md p-8 space-y-6 bg-[#162844]/60 backdrop-blur-sm border-[#7A4FFF]/30 shadow-[0_8px_30px_rgba(122,79,255,0.3)]">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      signupStep >= step
                        ? 'bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] text-white'
                        : 'bg-[#0B1426]/60 text-white/40 border border-[#7A4FFF]/20'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        signupStep > step ? 'bg-gradient-to-r from-[#7A4FFF] to-[#FFD369]' : 'bg-[#0B1426]/40'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Basic Info */}
            {signupStep === 1 && (
              <div className="space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-2xl text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Create Account
                  </h2>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    Let's start with the basics
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A4FFF]" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      className="pl-10 border-[#7A4FFF]/30 focus:border-[#7A4FFF] bg-[#0B1426]/40 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A4FFF]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="pl-10 border-[#7A4FFF]/30 focus:border-[#7A4FFF] bg-[#0B1426]/40 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username *</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="border-[#7A4FFF]/30 focus:border-[#7A4FFF] bg-[#0B1426]/40 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="age"
                    checked={isAgeVerified}
                    onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
                  />
                  <label htmlFor="age" className="text-sm text-white/80 leading-relaxed cursor-pointer">
                    I confirm that I am 13 years of age or older
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm text-white/80 leading-relaxed cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <Button
                  onClick={handleSignUpStep1}
                  className="w-full bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] hover:from-[#6A3FEF] hover:to-[#F5A83D] text-white"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Profile Details */}
            {signupStep === 2 && (
              <div className="space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-2xl text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Profile Details
                  </h2>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    Tell us about yourself
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">Bio (Optional)</Label>
                  <textarea
                    id="bio"
                    placeholder="Share a bit about your spiritual journey..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full min-h-[80px] px-3 py-2 border border-[#7A4FFF]/30 rounded-md focus:border-[#7A4FFF] focus:outline-none resize-none bg-[#0B1426]/40 text-white placeholder:text-white/40"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Location (Optional)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A4FFF]" />
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 border-[#7A4FFF]/30 focus:border-[#7A4FFF] bg-[#0B1426]/40 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">Website (Optional)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A4FFF]" />
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="pl-10 border-[#7A4FFF]/30 focus:border-[#7A4FFF] bg-[#0B1426]/40 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faith" className="text-white">Faith Tradition *</Label>
                  <select
                    id="faith"
                    value={faithTradition}
                    onChange={(e) => setFaithTradition(e.target.value)}
                    className="w-full px-3 py-2 border border-[#7A4FFF]/30 rounded-md focus:border-[#7A4FFF] focus:outline-none bg-[#0B1426]/40 text-white"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {faithOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-[#0B1426] text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleSignUpStep2}
                  className="w-full bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] hover:from-[#6A3FEF] hover:to-[#F5A83D] text-white"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 3: Preferences */}
            {signupStep === 3 && (
              <div className="space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-2xl text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Your Interests
                  </h2>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    Help us personalize your experience
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Select Your Interests</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          interests.includes(interest)
                            ? 'border-[#7A4FFF] bg-[#7A4FFF]/20 text-[#FFD369] font-medium'
                            : 'border-[#7A4FFF]/30 bg-[#0B1426]/40 text-white/70 hover:border-[#7A4FFF]/50'
                        }`}
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        <Heart className={`w-4 h-4 mx-auto mb-1 ${interests.includes(interest) ? 'fill-[#FFD369]' : ''}`} />
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locale" className="text-white">Preferred Language</Label>
                  <select
                    id="locale"
                    value={signUpLocale}
                    onChange={(e) => setSignUpLocale(e.target.value)}
                    className="w-full px-3 py-2 border border-[#7A4FFF]/30 rounded-md focus:border-[#7A4FFF] focus:outline-none bg-[#0B1426]/40 text-white"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    <option value="en-US" className="bg-[#0B1426] text-white">English (US)</option>
                    <option value="en-GB" className="bg-[#0B1426] text-white">English (UK)</option>
                    <option value="es" className="bg-[#0B1426] text-white">Spanish</option>
                    <option value="fr" className="bg-[#0B1426] text-white">French</option>
                    <option value="de" className="bg-[#0B1426] text-white">German</option>
                    <option value="ar" className="bg-[#0B1426] text-white">Arabic</option>
                    <option value="hi" className="bg-[#0B1426] text-white">Hindi</option>
                    <option value="zh" className="bg-[#0B1426] text-white">Chinese</option>
                  </select>
                </div>

                <Button
                  onClick={handleSignUpComplete}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] hover:from-[#6A3FEF] hover:to-[#F5A83D] text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // Guest Account Creation Form
  if (authMode === 'guest') {
    return (
      <div className="min-h-screen bg-[#0B1426] relative overflow-hidden">
        {/* Dark Cosmic Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cosmic background image */}
          <div className="absolute inset-0 -top-20 h-[120vh]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1711994872230-e3cb2690b54d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBzdGFycyUyMGdhbGF4eSUyMHVuaXZlcnNlJTIwcGFydG5lcnNoaXB8ZW58MXx8fHwxNzU5ODc5NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cosmic Background"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-25 mix-blend-multiply scale-105"
            />
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/40 via-[#0B1426]/60 via-[#162844]/70 to-[#0B1426]/95" />
          </div>
          
          {/* Purple and gold accent overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(122,79,255,0.15),_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,211,105,0.12),_transparent_60%)]" />
          
          {/* Atmospheric depth layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(122,79,255,0.08),_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,_rgba(255,211,105,0.06),_transparent_60%)]" />
          
          {/* Enhanced multi-layer texture system */}
          <div 
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(122, 79, 255, 0.15) 2px,
                  rgba(122, 79, 255, 0.15) 4px
                )
              `
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 3px,
                  rgba(255, 211, 105, 0.1) 3px,
                  rgba(255, 211, 105, 0.1) 6px
                )
              `
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.05] mix-blend-screen"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(122,79,255,0.2) 1px, transparent 0)
              `,
              backgroundSize: '24px 24px'
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(122,79,255,0.15) 1px, transparent 0),
                radial-gradient(circle at 16px 16px, rgba(255,211,105,0.1) 1px, transparent 0)
              `,
              backgroundSize: '32px 32px, 28px 28px'
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 8px,
                  rgba(122, 79, 255, 0.05) 8px,
                  rgba(122, 79, 255, 0.05) 9px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 8px,
                  rgba(122, 79, 255, 0.05) 8px,
                  rgba(122, 79, 255, 0.05) 9px
                )
              `
            }}
          />

          {/* Floating spiritual elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#7A4FFF] rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
          {/* Back button */}
          <button
            onClick={() => {
              setAuthMode(null);
              // Reset form
              setSignUpName("");
              setIsAgeVerified(false);
              setFaithTradition("christianity");
              setInterests([]);
            }}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-white/80 hover:text-[#FFD369] transition-colors z-20"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-['Raleway',sans-serif] font-medium text-sm sm:text-base">Back</span>
          </button>

          <Card className="w-full max-w-md p-5 sm:p-8 space-y-4 sm:space-y-6 bg-[#162844]/60 backdrop-blur-sm border-[#FFD369]/40 shadow-[0_8px_30px_rgba(255,211,105,0.4)] mt-12 sm:mt-0">
            <div className="text-center space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center mb-1 sm:mb-2">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" viewBox="0 0 16 16">
                  <g clipPath="url(#clip0_sparkles_guest)">
                    <path d={svgPaths.p319d7580} stroke="#FFD369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M13.3333 2V4.66667" stroke="#FFD369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M14.6667 3.33333H12" stroke="#FFD369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M2.66667 11.3333V12.6667" stroke="#FFD369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M3.33333 12H2" stroke="#FFD369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                  <defs>
                    <clipPath id="clip0_sparkles_guest">
                      <rect fill="white" height="16" width="16" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                Create Guest Account
              </h2>
              <p className="text-[#FFD369] text-xs sm:text-sm font-medium px-2" style={{ fontFamily: "'Raleway', sans-serif" }}>
                Try DivinityAGI with full functionality
              </p>
              <div className="bg-[#7A4FFF]/20 border border-[#FFD369]/30 rounded-lg p-2.5 sm:p-3 mt-3 sm:mt-4">
                <p className="text-white/90 text-[11px] sm:text-xs leading-relaxed" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  ⚡ <strong className="text-[#FFD369]">Guest Mode:</strong> Explore all features without saving history. No email required. Your session data won't be retained.
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="guest-name" className="text-white text-sm">Your Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFD369]" />
                  <Input
                    id="guest-name"
                    placeholder="Enter your name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="pl-10 h-11 sm:h-10 text-base sm:text-sm border-[#FFD369]/30 focus:border-[#FFD369] bg-[#0B1426]/40 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="guest-faith" className="text-white text-sm">Faith Tradition *</Label>
                <select
                  id="guest-faith"
                  value={faithTradition}
                  onChange={(e) => setFaithTradition(e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-2 text-base sm:text-sm border border-[#FFD369]/30 rounded-md focus:border-[#FFD369] focus:outline-none bg-[#0B1426]/40 text-white"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {faithOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-[#0B1426] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-white text-sm">Interests (Optional)</Label>
                <div className="grid grid-cols-2 gap-2 max-h-[180px] sm:max-h-[200px] overflow-y-auto pr-1 scrollbar-thin">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-2.5 sm:p-2 rounded-lg border-2 transition-all text-[11px] sm:text-xs touch-manipulation ${
                        interests.includes(interest)
                          ? 'border-[#FFD369] bg-[#FFD369]/20 text-[#FFD369] font-medium'
                          : 'border-[#FFD369]/30 bg-[#0B1426]/40 text-white/70 hover:border-[#FFD369]/50 active:bg-[#FFD369]/10'
                      }`}
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      <Heart className={`w-3 h-3 mx-auto mb-0.5 sm:mb-1 ${interests.includes(interest) ? 'fill-[#FFD369]' : ''}`} />
                      <span className="leading-tight">{interest}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-1 sm:pt-2">
                <Checkbox
                  id="guest-age"
                  checked={isAgeVerified}
                  onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="guest-age" className="text-xs sm:text-sm text-white/80 leading-relaxed cursor-pointer">
                  I confirm that I am 13 years of age or older *
                </label>
              </div>

              <Button
                onClick={handleGuestAccountCreate}
                disabled={isLoading}
                className="w-full h-12 sm:h-10 text-base sm:text-sm bg-gradient-to-r from-[#FFD369] to-[#7A4FFF] hover:from-[#F5A83D] hover:to-[#6A3FEF] text-white font-semibold touch-manipulation"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span className="text-sm sm:text-base">Creating Guest Account...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm sm:text-base">Start Exploring as Guest</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 16 16">
                      <g clipPath="url(#clip0_sparkles2)">
                        <path d={svgPaths.p319d7580} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M13.3333 2V4.66667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M14.6667 3.33333H12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M2.66667 11.3333V12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M3.33333 12H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </g>
                      <defs>
                        <clipPath id="clip0_sparkles2">
                          <rect fill="white" height="16" width="16" />
                        </clipPath>
                      </defs>
                    </svg>
                  </>
                )}
              </Button>

              <div className="text-center pt-1 sm:pt-2">
                <p className="text-white/60 text-[11px] sm:text-xs px-2" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Want to save your progress?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-[#FFD369] hover:text-[#F5A83D] font-medium underline touch-manipulation"
                  >
                    Create a full account
                  </button>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Default landing view
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-start overflow-hidden">
      {/* Full-page Background Video - Looping video background */}
      <BackgroundVideo 
        videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/App-BG-Clip-2.mp4"
        posterSrc={posterFrame}
      />
      
      {/* Subtle gradient overlay - top for logo and bottom for button readability */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{ 
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0.35) 90%, rgba(255,255,255,0.5) 100%)' 
        }} 
      />

      {/* Content - positioned above background */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 py-6 sm:py-8 md:py-12" style={{ zIndex: 10 }}>
        {/* Logo Container - Responsive sizing */}
        <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] flex-shrink-0 mb-4 sm:mb-6 md:mb-8">
          <img 
            alt="Spirit Guides - Spiritual AI for Humans" 
            className="w-[80%] h-auto object-contain mx-auto my-[-14px]" 
            src={spiritGuidesLogo} 
          />
        </div>

        {/* Spacer to push buttons down - Reduced for visibility */}
        <div className="flex-1 min-h-[80px] sm:min-h-[120px] md:min-h-[180px]" />

        {/* Buttons Container - Responsive width */}
        <div className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] flex flex-col gap-3 pb-4 sm:pb-6 mx-[0px] my-[39px]">
          {/* Create Account & Sign In Buttons Row */}
          <div className="w-full grid grid-cols-2 gap-2">
            {/* Create Account Button */}
            <button 
              onClick={() => {
                if (isSignedIn) {
                  toast.info("You're already signed in! Use 'Continue to App' to explore.", {
                    duration: 3000
                  });
                } else {
                  setAuthMode('signup');
                }
              }}
              className={`group relative w-full h-[44px] rounded-xl transition-all duration-300 active:scale-[0.98] overflow-hidden flex items-center justify-center border-2 shadow-lg ${
                isSignedIn 
                  ? 'bg-gradient-to-br from-[#8B6F47]/40 via-[#A0826D]/40 to-[#B8956A]/40 border-[#8B6F47]/50 hover:shadow-[0px_8px_30px_0px_rgba(139,111,71,0.3)] cursor-default' 
                  : 'bg-gradient-to-br from-[#C17A4F] via-[#D4A574] to-[#E6C9A8] border-[#8B6F47] hover:shadow-[0px_8px_30px_0px_rgba(193,122,79,0.5)]'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent ${isSignedIn ? 'opacity-50' : 'opacity-100'}`} />
              <div className={`absolute inset-0 bg-gradient-to-t from-[#8B6F47]/20 via-transparent to-white/30 ${isSignedIn ? 'opacity-30' : 'opacity-60'}`} />
              <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/50 to-transparent rounded-t-xl" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-xl" />
              <span className={`relative font-['Raleway',sans-serif] text-[14px] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${isSignedIn ? 'text-white/80' : 'text-white font-semibold'}`}>
                {isSignedIn ? "✓ Signed In" : "Create Account"}
              </span>
            </button>

            {/* Sign In/Out Button */}
            <button 
              onClick={() => {
                if (isSignedIn) {
                  handleSignOut();
                } else {
                  setAuthMode('signin');
                }
              }}
              className="group relative w-full h-[44px] bg-gradient-to-br from-[#A67C52] via-[#8B6F47] to-[#6B5540] rounded-xl hover:shadow-[0px_8px_30px_0px_rgba(166,124,82,0.5)] transition-all duration-300 active:scale-[0.98] overflow-hidden flex items-center justify-center border-2 border-[#6B5540] shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/15 to-transparent opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6B5540]/30 via-transparent to-white/20 opacity-60" />
              <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/40 to-transparent rounded-t-xl" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/25 rounded-xl" />
              <span className="relative font-['Raleway',sans-serif] text-white font-semibold text-[14px] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {isSignedIn ? "Sign Out" : "Sign In"}
              </span>
            </button>
          </div>

          {/* Skip for Now - Try as Guest Button OR Continue to App Button */}
          {isSignedIn ? (
            <button
              onClick={onComplete}
              className="group relative w-full h-[44px] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A574] via-[#E6C9A8] to-[#F4E4D7] hover:from-[#C17A4F] hover:to-[#E6C9A8] border-2 border-[#A67C52]/40 transition-all duration-300 active:scale-[0.98] overflow-hidden shadow-lg hover:shadow-[0px_8px_30px_0px_rgba(212,165,116,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#C17A4F]/20 via-transparent to-white/40 opacity-50" />
              <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-xl" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-xl" />
              <span className="relative font-['Raleway',sans-serif] font-semibold text-[14px] text-[#5B4636] tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
                Continue to App →
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode('guest');
              }}
              className="group relative w-full h-[42px] flex items-center justify-center gap-2 rounded-xl bg-white/85 hover:bg-white border-2 border-[#A67C52]/40 hover:border-[#C17A4F]/60 transition-all duration-300 active:scale-[0.98] overflow-hidden shadow-md hover:shadow-lg"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6C9A8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glossy top highlight */}
              <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/40 to-transparent rounded-t-xl" />
              
              {/* Subtle inner border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-xl" />
              
              {/* Animated sparkle accent */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 right-3 w-1 h-1 bg-[#C17A4F] rounded-full animate-pulse" />
              </div>
              
              <svg className="relative w-4 h-4 text-[#A67C52]" fill="none" viewBox="0 0 16 16">
                <g clipPath="url(#clip0_sparkles_landing)">
                  <path d={svgPaths.p319d7580} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M13.3333 2V4.66667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M14.6667 3.33333H12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M2.66667 11.3333V12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M3.33333 12H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </g>
                <defs>
                  <clipPath id="clip0_sparkles_landing">
                    <rect fill="white" height="16" width="16" />
                  </clipPath>
                </defs>
              </svg>
              <span className="relative font-['Raleway',sans-serif] font-medium text-[14px] text-[#6B5540]">
                Create Guest Account - Try Free
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Spacer for bottom navigation */}
      <div className="h-[100px]" />
    </div>
  );
}