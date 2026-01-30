import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SubscriptionPromotionCard } from "./subscription-promotion-card";
import { AppFooter } from "./app-footer";
import { toast } from "sonner@2.0.3";
import { useAdminMonitoring } from "./admin-monitoring-context";
import { createLeaderApplication } from "./services/leader-application-service";
import newVerificationHeroImage from 'figma:asset/48a4d00d482a72f4e4712027db9ca6884d643948.png';
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  User,
  Upload,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Star,
  Video,
  Music,
  BookOpen,
  CheckCircle,
  Users,
  Award,
  DollarSign,
  FileText,
  Play,
  Eye,
  TrendingUp,
  Calendar,
  BarChart3,
  Settings,
  AlertCircle,
  Shield,
  Check,
  X,
  MessageSquare,
  Zap,
  Sparkles
} from "lucide-react";

type ContributorType = "ministry" | "individual" | null;
type FormStep = "ministry" | "individual-1" | "individual-2" | "individual-3" | "individual-4" | "individual-5" | "individual-6" | "individual-7";
type ContributorStatus = "guest" | "pending" | "approved" | "rejected";
type ContentType = "reflection" | "meditation" | "teaching" | "video";

interface MinistryData {
  ministryName: string;
  address: string;
  contactPerson: string;
  email: string;
  website: string;
}

interface IndividualData {
  // Step 1: Personal Information
  name: string;
  email: string;
  location: string;
  biography: string;
  website: string;
  linkedIn: string;
  twitter: string;
  instagram: string;
  
  // Step 2: Faith Background
  faithBackground: string;
  currentRole: string;
  yearsOfService: number;
  educationCredentials: string;
  areasOfExpertise: string[];
  
  // Step 3: Build AI Profile
  agentName: string;
  agentLanguage: string;
  agentRole: string;
  agentPersonality: string;
  specialInstructions: string;
  
  // Step 4-6: Profile Questions (grouped)
  question1: string; // How can I maintain faith in God amidst personal suffering and global crises?
  question2: string; // How can prayer help me in times of doubt?
  question3: string; // What does the Church say about why bad things happen to good people?
  question4: string; // What are three core values that guide your decisions and actions in life?
  question5: string; // Can you describe a time when your beliefs were challenged, and how you responded?
  question6: string; // How do you define "purpose" in your own life?
  question7: string; // In what ways do you find community and connection with others?
  question8: string; // What gives you hope or a sense of optimism about the future?
  question9: string; // How can I balance personal desires with God's plan for me?
  question10: string; // How do you approach moments of doubt or uncertainty?
  question11: string; // What role does compassion play in your interactions with others?
  question12: string; // Can you share an experience where you felt a sense of awe or wonder?
  
  // Step 7: Payment & Final
  introVideo: File | null;
  paymentMethod: string;
  paymentDetails: string;
  termsAccepted: boolean;
}

interface Content {
  id: string;
  title: string;
  type: ContentType;
  tradition: string;
  status: "draft" | "pending" | "approved" | "rejected";
  views: number;
  likes: number;
  revenue: number;
  createdAt: string;
}

interface RevenueData {
  totalEarnings: number;
  thisMonth: number;
  lastMonth: number;
  totalViews: number;
  totalContent: number;
  avgRating: number;
}

const faithBackgrounds = [
  "Christianity", "Catholic", "Protestant", "Orthodox", "Other Christian",
  "Islam", "Judaism", "Hinduism", "Buddhism", "Sikhism",
  "Taoism", "Bahá'í", "Jainism", "Shinto", "Confucianism",
  "Indigenous Spirituality", "Secular Humanism", "Universal/Interfaith", "Other"
];

const roleOptions = [
  "Faith Leader", "Faith Influencer", "Spiritual Teacher", "Life Coach",
  "Counselor", "Author/Writer", "Content Creator", "Educator", "Other"
];

const expertiseAreas = [
  "Prayer & Spiritual Doubt",
  "Mental Health & Spirituality",
  "Family Relationships & Conflict Resolution",
  "Spirituality in Modern World",
  "Science & Faith Integration",
  "Meditation & Mindfulness",
  "Scripture Study & Theology",
  "Social Justice & Faith",
  "Grief & Loss",
  "Addiction Recovery",
  "Youth & Young Adult Ministry",
  "Marriage & Relationships",
  "Life Purpose & Calling"
];

const personalityOptions = [
  "Wise and compassionate",
  "Warm and encouraging",
  "Direct and honest",
  "Gentle and nurturing",
  "Energetic and motivating",
  "Contemplative and thoughtful",
  "Practical and solution-focused"
];

const paymentMethods = [
  "Bank Transfer",
  "PayPal",
  "Direct Deposit",
  "Check",
  "Other"
];

const spiritualTraditions = [
  "Christianity", "Catholic", "Protestant", "Orthodox",
  "Islam", "Judaism", "Hinduism", "Buddhism", "Sikhism",
  "Taoism", "Bahá'í", "Jainism", "Shinto", "Confucianism",
  "Indigenous Spirituality", "Universal/Interfaith", "Other"
];

// Mock data for approved contributor
const mockContent: Content[] = [
  {
    id: "1",
    title: "Morning Prayer for Peace",
    type: "reflection",
    tradition: "Christianity",
    status: "approved",
    views: 1250,
    likes: 89,
    revenue: 45.20,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Guided Meditation: Finding Inner Light",
    type: "meditation",
    tradition: "Buddhism",
    status: "approved",
    views: 890,
    likes: 67,
    revenue: 32.50,
    createdAt: "2024-01-10"
  },
  {
    id: "3",
    title: "The Path of Compassion",
    type: "teaching",
    tradition: "Universal",
    status: "pending",
    views: 0,
    likes: 0,
    revenue: 0,
    createdAt: "2024-01-20"
  }
];

const mockRevenueData: RevenueData = {
  totalEarnings: 847.30,
  thisMonth: 245.80,
  lastMonth: 189.50,
  totalViews: 15420,
  totalContent: 24,
  avgRating: 4.8
};

interface ContributorsProps {
  onOpenMission?: () => void;
  onNavigate?: (route: string) => void;
  initialType?: ContributorType;
}

export const Contributors = React.memo(function Contributors({ onOpenMission, onNavigate, initialType }: ContributorsProps) {
  // Admin Monitoring Integration
  const { trackEvent } = useAdminMonitoring();
  
  const [currentStep, setCurrentStep] = useState<FormStep>(
    initialType === "ministry" ? "ministry" : "individual-1"
  );
  const [contributorType, setContributorType] = useState<ContributorType>(initialType || null);
  const [contributorStatus, setContributorStatus] = useState<ContributorStatus>("guest");
  const [activePortalTab, setActivePortalTab] = useState("dashboard");
  const [ministryData, setMinistryData] = useState<MinistryData>({
    ministryName: "",
    address: "",
    contactPerson: "",
    email: "",
    website: ""
  });
  const [individualData, setIndividualData] = useState<IndividualData>({
    // Step 1: Personal Information
    name: "",
    email: "",
    location: "",
    biography: "",
    website: "",
    linkedIn: "",
    twitter: "",
    instagram: "",
    
    // Step 2: Faith Background
    faithBackground: "",
    currentRole: "",
    yearsOfService: 1,
    educationCredentials: "",
    areasOfExpertise: [],
    
    // Step 3: Build AI Profile
    agentName: "",
    agentLanguage: "English",
    agentRole: "",
    agentPersonality: "",
    specialInstructions: "",
    
    // Step 4-6: Profile Questions
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
    question11: "",
    question12: "",
    
    // Step 7: Payment & Final
    introVideo: null,
    paymentMethod: "",
    paymentDetails: "",
    termsAccepted: false
  });

  // Handle initialType from navigation
  useEffect(() => {
    if (initialType) {
      setContributorType(initialType);
      if (initialType === "ministry") {
        setCurrentStep("ministry");
      } else if (initialType === "individual") {
        setCurrentStep("individual-1");
      }
    }
  }, [initialType]);

  // Load Master Tim Steinruck's profile data for testing/example
  const loadMasterTimProfile = () => {
    setIndividualData({
      // Step 1: Personal Information
      name: "Tim Steinruck",
      email: "timsteinruck@gmail.com",
      location: "306 Begin Street, Coquitlam, BC, Canada",
      biography: "Tim Steinruck is musician, music and tv producer, transformational/spiritual certified master life coach. He grew up in Northern B.C. In a Mennonite community and at 18 became a high profile North American touring musician. In his early 20s he secured a multimillion dollar management and recording contract with Paul Stanley of KISS. He has gone on to become an international multi-award winning songwriter and touring artist. He is a respected public figure with an inspiring message of hope, purpose, empowerment. In 2026 he will release a series of books detailing the power of daily disciplines entitled The Blissi-plines, A Path To Personal Mastery. He is a voting member of the Grammys with three songs being considered for 2026 Grammy Awards.",
      website: "https://www.timsteinruck.com",
      linkedIn: "https://www.linkedin.com/in/timsteinruck",
      twitter: "https://www.twitter.com/the_mighty_one",
      instagram: "https://www.instagram.com/timsteinruck",
      
      // Step 2: Faith Background
      faithBackground: "Other Christian",
      currentRole: "Faith Influencer",
      yearsOfService: 20,
      educationCredentials: "Accelerated Evolution Certified Psycho-spiritual coach",
      areasOfExpertise: ["Prayer & Spiritual Doubt", "Mental Health & Spirituality", "Family Relationships & Conflict Resolution", "Spirituality in Modern World", "Science & Faith Integration"],
      
      // Step 3: Build AI Profile
      agentName: "Master Steinruck",
      agentLanguage: "English",
      agentRole: "Psycho-Spiritual counselor",
      agentPersonality: "Wise and compassionate",
      specialInstructions: "Provides spiritual and life guidance from deep intuition. He does not provide the answers to the questioner but guides the individual to seek deeper meaning, purpose and realization of their own truth. He is wise, kind, compassionate yet clear and firm. He values integrity and blunt honesty more than flowery words and dogma.",
      
      // Step 4-6: Profile Questions
      question1: "All the answers you need already exist in the God that lives within you",
      question2: "Prayer adjusts your frequency to receive direction from the Universal Mind of God",
      question3: "When we do not clear our subconscious negative programming it will show up as challenges in our lives to learn from",
      question4: "Discipline, surrender and self commitment",
      question5: "As a child I questioned the Old Testament Yahweh and his direction to fear him. I became a self identified victim of that fear. Once I realized that I AM the God within me I set myself free",
      question6: "To feed healing, light and transformation into the infinite field of human consciousness",
      question7: "When I live in coherence with myself the right people come into my life at the right time to support my purposes",
      question8: "Through music, frequency and divine creativity",
      question9: "Listen to my divine intuition",
      question10: "With my divine intuition",
      question11: "Compassion and empathy are the key to meaningful communication",
      question12: "Reach states of pleroma and bliss through deep self processing using the psycho-spiritual processes I have mastered.",
      
      // Step 7: Payment & Final
      introVideo: null,
      paymentMethod: "Bank Transfer",
      paymentDetails: "PayPal to bigred13@mac.com",
      termsAccepted: false
    });
    setContributorStatus("approved");
  };

  // For demo purposes, simulate different contributor states
  const simulateStatus = (status: ContributorStatus) => {
    setContributorStatus(status);
    if (status === "approved") {
      loadMasterTimProfile();
    }
  };

  const getCurrentStepNumber = () => {
    if (currentStep.startsWith("individual-")) {
      return parseInt(currentStep.split("-")[1]);
    }
    return 1;
  };

  const getTotalSteps = () => {
    return contributorType === "ministry" ? 1 : 7;
  };

  const handleNext = async () => {
    if (contributorType === "ministry") {
      console.log("Ministry application submitted:", ministryData);
      await sendMinistryApplicationEmail(ministryData);
      setContributorStatus("pending");
      return;
    }

    const currentStepNum = getCurrentStepNumber();
    if (currentStepNum < 7) {
      setCurrentStep(`individual-${currentStepNum + 1}` as FormStep);
    } else {
      console.log("Individual application submitted:", individualData);
      await sendIndividualApplicationEmail(individualData);
      setContributorStatus("pending");
    }
  };

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_xawjo1g';
  const EMAILJS_TEMPLATE_ID = 'template_u38gulh';
  const EMAILJS_PUBLIC_KEY = 'DCwKRc4Y0WSgS1QfM';

  // Send email for ministry application
  const sendMinistryApplicationEmail = async (data: MinistryData) => {
    try {
      // Get form submission number
      const formCount = parseInt(localStorage.getItem('divinityagi_ministry_form_count') || '0') + 1;
      localStorage.setItem('divinityagi_ministry_form_count', formCount.toString());

      // Save to Supabase database
      const applicationResult = await createLeaderApplication({
        application_type: 'ministry',
        full_name: data.contactPerson,
        email: data.email,
        faith_tradition: 'Ministry Partner', // Default for ministry
        ministry_name: data.ministryName,
        ministry_website: data.website,
        ministry_address: data.address,
        metadata: {
          formNumber: formCount,
          contactPerson: data.contactPerson,
          submittedAt: new Date().toISOString()
        }
      });

      if (applicationResult.success) {
        console.log('✅ Ministry application saved to database:', applicationResult.data);
      } else {
        console.error('❌ Failed to save ministry application to database:', applicationResult.error);
      }

      // Format the email content
      const emailContent = `
DivinityAGI Verified Leader Application (Ministry Partner)

Form Number: ${formCount}
Submission Date: ${new Date().toLocaleString()}
Application Type: MINISTRY PARTNER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MINISTRY INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ministry Name: ${data.ministryName}
Address: ${data.address}
Website: ${data.website}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Person: ${data.contactPerson}
Email Address: ${data.email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This application was submitted through the DivinityAGI Verified Leader onboarding process.
Please review and respond to the applicant at: ${data.email}
      `.trim();

      // Send email via EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: 'info@divinityagi.com',
            subject: `DivinityAGI Ministry Partner Application No. ${formCount}`,
            message: emailContent,
            from_name: data.contactPerson,
            from_email: data.email,
            form_number: formCount.toString(),
          },
        }),
      });

      if (response.ok) {
        console.log('Ministry application email sent successfully');
        
        // Track in Admin Monitoring System
        await trackEvent(
          'verification_request',
          'warning',
          'New Ministry Partner Application',
          `Ministry application received from ${data.ministryName} (${data.contactPerson})`,
          {
            applicationType: 'ministry',
            ministryName: data.ministryName,
            contactPerson: data.contactPerson,
            email: data.email,
            website: data.website,
            address: data.address,
            formNumber: formCount,
            submittedAt: new Date().toISOString()
          }
        );
        
        toast.success('Application submitted! We\'ll review and contact you soon.', {
          description: 'Check your email for confirmation'
        });
      } else {
        throw new Error('Email API returned non-200 status');
      }
    } catch (error) {
      // Silently handle email failure - application still tracks successfully
      
      // Still track the event even if email fails
      try {
        await trackEvent(
          'verification_request',
          'warning',
          'New Ministry Partner Application (Email Failed)',
          `Ministry application received from ${data.ministryName} (${data.contactPerson}) - Email delivery may have failed`,
          {
            applicationType: 'ministry',
            ministryName: data.ministryName,
            contactPerson: data.contactPerson,
            email: data.email,
            website: data.website,
            address: data.address,
            emailError: true,
            submittedAt: new Date().toISOString()
          }
        );
      } catch (trackError) {
        console.error('Failed to track ministry application:', trackError);
      }
      
      toast.info('Application submitted successfully!', {
        description: 'Confirmation email may be delayed'
      });
    }
  };

  // Send email for individual application
  const sendIndividualApplicationEmail = async (data: IndividualData) => {
    try {
      // Get form submission number
      const formCount = parseInt(localStorage.getItem('divinityagi_leader_form_count') || '0') + 1;
      localStorage.setItem('divinityagi_leader_form_count', formCount.toString());

      // Save to Supabase database
      const applicationResult = await createLeaderApplication({
        application_type: 'individual',
        full_name: data.name,
        email: data.email,
        faith_tradition: data.faithBackground,
        credentials: data.educationCredentials,
        years_of_service: data.yearsOfService,
        bio: data.biography,
        metadata: {
          formNumber: formCount,
          location: data.location,
          website: data.website,
          socialMedia: {
            linkedIn: data.linkedIn,
            twitter: data.twitter,
            instagram: data.instagram
          },
          currentRole: data.currentRole,
          areasOfExpertise: data.areasOfExpertise,
          aiProfile: {
            agentName: data.agentName,
            agentLanguage: data.agentLanguage,
            agentRole: data.agentRole,
            agentPersonality: data.agentPersonality,
            specialInstructions: data.specialInstructions
          },
          profileQuestions: {
            question1: data.question1,
            question2: data.question2,
            question3: data.question3,
            question4: data.question4,
            question5: data.question5,
            question6: data.question6,
            question7: data.question7,
            question8: data.question8,
            question9: data.question9,
            question10: data.question10,
            question11: data.question11,
            question12: data.question12
          },
          paymentInfo: {
            paymentMethod: data.paymentMethod,
            paymentDetails: data.paymentDetails,
            introVideoUploaded: !!data.introVideo
          },
          submittedAt: new Date().toISOString()
        }
      });

      if (applicationResult.success) {
        console.log('✅ Individual leader application saved to database:', applicationResult.data);
      } else {
        console.error('❌ Failed to save individual application to database:', applicationResult.error);
      }

      // Format the email content
      const emailContent = `
DivinityAGI Verified Leader Application (Individual)

Form Number: ${formCount}
Submission Date: ${new Date().toLocaleString()}
Application Type: INDIVIDUAL VERIFIED LEADER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${data.name}
Email: ${data.email}
Location: ${data.location}
Website: ${data.website || 'Not provided'}
LinkedIn: ${data.linkedIn || 'Not provided'}
Twitter: ${data.twitter || 'Not provided'}
Instagram: ${data.instagram || 'Not provided'}

Biography:
${data.biography}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FAITH BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Faith Background: ${data.faithBackground}
Current Role: ${data.currentRole}
Years of Service: ${data.yearsOfService}
Education/Credentials: ${data.educationCredentials}
Areas of Expertise: ${data.areasOfExpertise.join(', ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI AGENT PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Agent Name: ${data.agentName}
Language: ${data.agentLanguage}
Role: ${data.agentRole}
Personality: ${data.agentPersonality}

Special Instructions:
${data.specialInstructions}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROFILE QUESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: How can I maintain faith in God amidst personal suffering and global crises?
A: ${data.question1}

Q2: How can prayer help me in times of doubt?
A: ${data.question2}

Q3: What does the Church say about why bad things happen to good people?
A: ${data.question3}

Q4: What are three core values that guide your decisions and actions in life?
A: ${data.question4}

Q5: Can you describe a time when your beliefs were challenged, and how you responded?
A: ${data.question5}

Q6: How do you define "purpose" in your own life?
A: ${data.question6}

Q7: In what ways do you find community and connection with others?
A: ${data.question7}

Q8: What gives you hope or a sense of optimism about the future?
A: ${data.question8}

Q9: How can I balance personal desires with God's plan for me?
A: ${data.question9}

Q10: How do you approach moments of doubt or uncertainty?
A: ${data.question10}

Q11: What role does compassion play in your interactions with others?
A: ${data.question11}

Q12: Can you share an experience where you felt a sense of awe or wonder?
A: ${data.question12}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAYMENT & FINAL DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Intro Video: ${data.introVideo ? data.introVideo.name : 'Not uploaded'}
Payment Method: ${data.paymentMethod}
Payment Details: ${data.paymentDetails}
Terms Accepted: ${data.termsAccepted ? 'Yes' : 'No'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This application was submitted through the DivinityAGI Verified Leader onboarding process.
Please review and respond to the applicant at: ${data.email}
      `.trim();

      // Send email via EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: 'info@divinityagi.com',
            subject: `DivinityAGI Verified Leader Application No. ${formCount}`,
            message: emailContent,
            from_name: data.name,
            from_email: data.email,
            form_number: formCount.toString(),
          },
        }),
      });

      if (response.ok) {
        console.log('Individual application email sent successfully');
        
        // Track in Admin Monitoring System
        await trackEvent(
          'verification_request',
          'warning',
          'New Individual Verified Leader Application',
          `Individual application received from ${data.name} (${data.currentRole})`,
          {
            applicationType: 'individual',
            name: data.name,
            email: data.email,
            location: data.location,
            faithBackground: data.faithBackground,
            currentRole: data.currentRole,
            yearsOfService: data.yearsOfService,
            areasOfExpertise: data.areasOfExpertise,
            agentName: data.agentName,
            agentLanguage: data.agentLanguage,
            website: data.website,
            socialMedia: {
              linkedIn: data.linkedIn,
              twitter: data.twitter,
              instagram: data.instagram
            },
            formNumber: formCount,
            submittedAt: new Date().toISOString()
          }
        );
        
        toast.success('Application submitted successfully! 🎉', {
          description: 'We\'ll review your application and contact you within 3-5 business days.'
        });
      } else {
        throw new Error('Email API returned non-200 status');
      }
    } catch (error) {
      // Silently handle email failure - application still tracks successfully
      
      // Still track the event even if email fails
      try {
        await trackEvent(
          'verification_request',
          'warning',
          'New Individual Verified Leader Application (Email Failed)',
          `Individual application received from ${data.name} (${data.currentRole}) - Email delivery may have failed`,
          {
            applicationType: 'individual',
            name: data.name,
            email: data.email,
            location: data.location,
            faithBackground: data.faithBackground,
            currentRole: data.currentRole,
            areasOfExpertise: data.areasOfExpertise,
            agentName: data.agentName,
            emailError: true,
            submittedAt: new Date().toISOString()
          }
        );
      } catch (trackError) {
        console.error('Failed to track individual application:', trackError);
      }
      
      toast.info('Application submitted successfully!', {
        description: 'Confirmation email may be delayed'
      });
    }
  };

  const handleBack = () => {
    if (currentStep === "ministry" || currentStep === "individual-1") {
      // Navigate back to affiliate program page
      onNavigate?.("affiliate");
    } else if (currentStep.startsWith("individual-")) {
      const currentStepNum = getCurrentStepNumber();
      setCurrentStep(`individual-${currentStepNum - 1}` as FormStep);
    }
  };



  const renderHeader = () => (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {contributorStatus === "guest" && (
        <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
      )}
      <div className="flex-1 text-center">
        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">DivinityAGI</div>
        <div className="text-lg font-semibold text-gray-900">Contributors</div>
      </div>
      {contributorStatus === "guest" && (
        <div className="w-16 text-right">
          <div className="text-sm text-gray-500">
            {getCurrentStepNumber()}/{getTotalSteps()}
          </div>
        </div>
      )}
    </header>
  );

  const renderProgressBar = () => {
    if (contributorStatus !== "guest") return null;
    
    const progress = (getCurrentStepNumber() / getTotalSteps()) * 100;
    
    return (
      <div className="px-4 py-3 bg-gray-50">
        <Progress value={progress} className="h-2" />
      </div>
    );
  };

  // Application Status Screen
  const renderStatusScreen = () => {
    if (contributorStatus === "pending") {
      return (
        <div className="min-h-screen bg-white">
          {renderHeader()}
          <div className="px-4 py-12 max-w-sm mx-auto text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Under Review</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Thank you for your application! Our team is reviewing your submission and will notify you within 2-3 business days.
            </p>
            <Button onClick={() => setContributorStatus("guest")} variant="outline" className="w-full border-[#497EBC]/30 text-[#497EBC] hover:bg-[#497EBC]/10 hover:text-white hover:border-[#497EBC]/50 transition-all duration-300 backdrop-blur-sm font-medium">
              Return to Application
            </Button>
          </div>
        </div>
      );
    }

    if (contributorStatus === "approved") {
      return renderContributorPortal();
    }

    return renderSelectScreen();
  };

  // Contributor Portal Dashboard
  const renderContributorPortal = () => (
    <div className="min-h-screen bg-[#0B1426] text-white relative overflow-hidden">
      {/* Enhanced Textured Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cosmic contributor background - enhanced with better blending */}
        <div className="absolute inset-0 -top-20 h-[120vh]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1711994872230-e3cb2690b54d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBzdGFycyUyMGdhbGF4eSUyMHVuaXZlcnNlJTIwcGFydG5lcnNoaXB8ZW58MXx8fHwxNzU5ODc5NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Cosmic Creator Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-25 mix-blend-multiply scale-105"
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/40 via-[#0B1426]/60 via-[#162844]/70 to-[#0B1426]/95" />
        </div>
        
        {/* Creator-specific accent overlays using purple/gold theme */}
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

        {/* Floating spiritual elements - optimized */}
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

      <div className="relative z-10">
        {/* Portal Header */}
        <header className="bg-[#162844]/40 border-b border-[#1E3A5F]/40 px-6 py-6 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs text-[#FFD369] uppercase tracking-wide font-medium">DivinityAGI</div>
              <div className="text-2xl text-white bg-gradient-to-r from-white via-[#7A4FFF] to-[#FFD369] bg-clip-text text-transparent">
                Creator Portal
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 px-4 py-2">
                <Check className="w-4 h-4 mr-2" />
                Verified Creator
              </Badge>
              <Avatar className="h-10 w-10 border-2 border-[#7A4FFF]/50">
                <AvatarFallback className="bg-gradient-to-r from-[#7A4FFF] to-[#9D5CFF] text-white">SJ</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </header>

        {/* Portal Content */}
        <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-white via-[#7A4FFF] to-[#FFD369] bg-clip-text text-transparent text-center">
            Creator Dashboard
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#497EBC] to-[#FFD369] mx-auto rounded-full" />
        </motion.div>

        <Tabs value={activePortalTab} onValueChange={setActivePortalTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-[#162844]/40 border border-[#1E3A5F]/40 backdrop-blur-sm p-1 rounded-xl">
            <TabsTrigger 
              value="dashboard" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7A4FFF] data-[state=active]:to-[#9D5CFF] data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7A4FFF] data-[state=active]:to-[#9D5CFF] data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Content
            </TabsTrigger>
            <TabsTrigger 
              value="upload" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7A4FFF] data-[state=active]:to-[#9D5CFF] data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Upload
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7A4FFF] data-[state=active]:to-[#9D5CFF] data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Revenue
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Total Earnings</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">${mockRevenueData.totalEarnings}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Total Views</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{mockRevenueData.totalViews.toLocaleString()}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-[#497EBC]" />
                  <span className="text-sm font-medium text-gray-600">Content</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{mockRevenueData.totalContent}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-600">Rating</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{mockRevenueData.avgRating}</div>
              </Card>
            </div>

            {/* Recent Content */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Content</h3>
              <div className="space-y-4">
                {mockContent.slice(0, 3).map((content) => (
                  <div key={content.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#497EBC]/10 rounded-lg flex items-center justify-center">
                        {content.type === "video" ? (
                          <Play className="w-4 h-4 text-[#497EBC]" />
                        ) : (
                          <FileText className="w-4 h-4 text-[#497EBC]" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{content.title}</div>
                        <div className="text-sm text-gray-500">
                          {content.tradition} • {content.views} views
                        </div>
                      </div>
                    </div>
                    <Badge variant={content.status === "approved" ? "default" : "secondary"}>
                      {content.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Your Content</h3>
              <Button onClick={() => setActivePortalTab("upload")}>
                <Upload className="w-4 h-4 mr-2" />
                Upload New
              </Button>
            </div>

            <div className="space-y-4">
              {mockContent.map((content) => (
                <Card key={content.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {content.type === "video" ? (
                          <Play className="w-5 h-5 text-gray-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{content.title}</h4>
                        <div className="text-sm text-gray-500 mb-2">
                          {content.tradition} • Created {content.createdAt}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{content.views} views</span>
                          <span>{content.likes} likes</span>
                          <span>${content.revenue}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={content.status === "approved" ? "default" : "secondary"}>
                      {content.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Upload New Content</h3>
              
              <form className="space-y-4">
                <div>
                  <Label htmlFor="contentTitle">Title</Label>
                  <Input id="contentTitle" placeholder="Enter content title" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reflection">Daily Reflection</SelectItem>
                      <SelectItem value="meditation">Guided Meditation</SelectItem>
                      <SelectItem value="teaching">Teaching</SelectItem>
                      <SelectItem value="video">Video Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tradition">Spiritual Tradition</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select tradition" />
                    </SelectTrigger>
                    <SelectContent>
                      {spiritualTraditions.map((tradition) => (
                        <SelectItem key={tradition} value={tradition.toLowerCase()}>
                          {tradition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="contentBody">Content</Label>
                  <Textarea 
                    id="contentBody"
                    placeholder="Write your content here..."
                    className="mt-1 min-h-32"
                  />
                </div>

                <div>
                  <Label>Media Upload (Optional)</Label>
                  <div className="mt-1">
                    <Button variant="outline" className="w-full border-[#497EBC]/30 text-[#497EBC] hover:bg-[#497EBC]/10 hover:text-white hover:border-[#497EBC]/50 transition-all duration-300 backdrop-blur-sm font-medium">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Audio/Video
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit for Review
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">This Month</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">${mockRevenueData.thisMonth}</div>
                <div className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +29% from last month
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Last Month</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">${mockRevenueData.lastMonth}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-[#497EBC]" />
                  <span className="text-sm font-medium text-gray-600">All Time</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">${mockRevenueData.totalEarnings}</div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
              <div className="space-y-4">
                {mockContent.filter(c => c.revenue > 0).map((content) => (
                  <div key={content.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium text-gray-900">{content.title}</div>
                      <div className="text-sm text-gray-500">{content.views} views</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">${content.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );

  // Form rendering functions (simplified for space - same as before)
  const renderMinistryForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#497EBC]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-lg border-b border-[#497EBC]/20">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#497EBC] uppercase tracking-wide">DivinityAGI Partnership</div>
            <div className="text-lg bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">Ministry Application</div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="px-4 py-3 bg-slate-800/30">
          <Progress value={100} className="h-2" />
        </div>
        
        <div className="px-4 py-8 max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
              Ministry Partnership Details
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Join our institutional partner program with 4 revenue streams: Affiliate (25%), Engagement (40%), Donations, and Virtual Worship Spaces
            </p>
            
            {/* Partnership Benefits */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-slate-800/30 rounded-lg p-3 border border-[#C9A882]/20">
                <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <p className="text-xs text-slate-300">4 Revenue Streams</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-3 border border-[#C9A882]/20">
                <Building2 className="w-6 h-6 text-[#497EBC] mx-auto mb-1" />
                <p className="text-xs text-slate-300">Virtual Spaces</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-3 border border-[#C9A882]/20">
                <Users className="w-6 h-6 text-[#497EBC] mx-auto mb-1" />
                <p className="text-xs text-slate-300">Command Center</p>
              </div>
            </div>
          </div>
          
          <Card className="bg-slate-800/30 border-[#C9A882]/20 backdrop-blur-sm p-6">
            {/* Application Fee Notice */}
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-200 font-semibold mb-1">Application Fee: $99</p>
                  <p className="text-xs text-amber-300/80">One-time fee for verification and onboarding. Access to Command Center Dashboard, NeoBanking Suite, and 4 revenue streams.</p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <Label htmlFor="ministryName" className="text-sm text-[#8BC4EA]">Ministry/Organization Name</Label>
                <Input
                  id="ministryName"
                  value={ministryData.ministryName}
                  onChange={(e) => setMinistryData({...ministryData, ministryName: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Enter your ministry or organization name"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-sm text-[#8BC4EA]">Physical Address</Label>
                <Input
                  id="address"
                  value={ministryData.address}
                  onChange={(e) => setMinistryData({...ministryData, address: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Street address, city, state, zip"
                />
              </div>

              <div>
                <Label htmlFor="contactPerson" className="text-sm text-[#8BC4EA]">Primary Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={ministryData.contactPerson}
                  onChange={(e) => setMinistryData({...ministryData, contactPerson: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Pastor, Director, or authorized representative"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm text-[#8BC4EA]">Official Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={ministryData.email}
                  onChange={(e) => setMinistryData({...ministryData, email: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="contact@yourministry.org"
                />
              </div>

              <div>
                <Label htmlFor="website" className="text-sm text-[#8BC4EA]">Ministry Website</Label>
                <Input
                  id="website"
                  value={ministryData.website}
                  onChange={(e) => setMinistryData({...ministryData, website: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="https://www.yourministry.org"
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleNext} className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white">
                  Submit Partnership Application
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );

  // Step 1: Personal Information
  const renderIndividualStep1 = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#497EBC]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-lg border-b border-[#497EBC]/20">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#497EBC] uppercase tracking-wide">DivinityAGI Affiliate</div>
            <div className="text-lg bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">Influencer Application</div>
          </div>
          <div className="w-16 text-right">
            <div className="text-sm text-[#497EBC]">{getCurrentStepNumber()}/{getTotalSteps()}</div>
          </div>
        </header>

        <div className="px-4 py-3 bg-slate-800/30">
          <Progress value={(getCurrentStepNumber() / getTotalSteps()) * 100} className="h-2" />
        </div>
        
        <div className="px-4 py-8 max-w-2xl mx-auto">
          {/* Verification Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-full max-w-sm">
              <img 
                src={newVerificationHeroImage} 
                alt="Get Verified as a Leader"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
              Personal Information
            </h2>
            <p className="text-slate-400 text-sm">
              Tell us about yourself and your online presence
            </p>
          </div>
          
          <Card className="bg-slate-800/30 border-[#C9A882]/20 backdrop-blur-sm p-6">
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm text-[#8BC4EA]">Full Name *</Label>
                <Input
                  id="name"
                  value={individualData.name}
                  onChange={(e) => setIndividualData({...individualData, name: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm text-[#8BC4EA]">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={individualData.email}
                  onChange={(e) => setIndividualData({...individualData, email: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-sm text-[#8BC4EA]">Location *</Label>
                <Input
                  id="location"
                  value={individualData.location}
                  onChange={(e) => setIndividualData({...individualData, location: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="City, State/Province, Country"
                />
              </div>

              <div>
                <Label htmlFor="biography" className="text-sm text-[#8BC4EA]">Biographical Info *</Label>
                <Textarea
                  id="biography"
                  value={individualData.biography}
                  onChange={(e) => setIndividualData({...individualData, biography: e.target.value})}
                  className="mt-2 min-h-[120px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your story, credentials, and what makes you uniquely qualified to guide others..."
                />
              </div>

              <div>
                <Label htmlFor="website" className="text-sm text-[#8BC4EA]">Website or Blog</Label>
                <Input
                  id="website"
                  type="url"
                  value={individualData.website}
                  onChange={(e) => setIndividualData({...individualData, website: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="https://www.yourwebsite.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="linkedIn" className="text-sm text-[#8BC4EA]">LinkedIn</Label>
                  <Input
                    id="linkedIn"
                    value={individualData.linkedIn}
                    onChange={(e) => setIndividualData({...individualData, linkedIn: e.target.value})}
                    className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    placeholder="Profile URL"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter" className="text-sm text-[#8BC4EA]">Twitter/X</Label>
                  <Input
                    id="twitter"
                    value={individualData.twitter}
                    onChange={(e) => setIndividualData({...individualData, twitter: e.target.value})}
                    className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram" className="text-sm text-[#8BC4EA]">Instagram</Label>
                  <Input
                    id="instagram"
                    value={individualData.instagram}
                    onChange={(e) => setIndividualData({...individualData, instagram: e.target.value})}
                    className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    placeholder="@username"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="button" onClick={handleNext} className="w-full h-12 bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6A9F] hover:to-[#B89770] text-white">
                  Continue to Faith Background
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );

  // Step 2: Faith Background
  const renderIndividualStep2 = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#497EBC]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-lg border-b border-[#497EBC]/20">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#497EBC] uppercase tracking-wide">DivinityAGI Affiliate</div>
            <div className="text-lg bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">Influencer Application</div>
          </div>
          <div className="w-16 text-right">
            <div className="text-sm text-[#497EBC]">{getCurrentStepNumber()}/{getTotalSteps()}</div>
          </div>
        </header>

        <div className="px-4 py-3 bg-slate-800/30">
          <Progress value={(getCurrentStepNumber() / getTotalSteps()) * 100} className="h-2" />
        </div>
        
        <div className="px-4 py-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
              Faith Background
            </h2>
            <p className="text-slate-400 text-sm">
              Share your spiritual journey and expertise
            </p>
          </div>
          
          <Card className="bg-slate-800/30 border-[#C9A882]/20 backdrop-blur-sm p-6">
            <form className="space-y-6">
              <div>
                <Label htmlFor="faithBackground" className="text-sm text-[#8BC4EA]">Faith Background *</Label>
                <Select value={individualData.faithBackground} onValueChange={(value) => setIndividualData({...individualData, faithBackground: value})}>
                  <SelectTrigger className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select your faith tradition" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 max-h-[300px]">
                    {faithBackgrounds.map(faith => (
                      <SelectItem key={faith} value={faith} className="text-white focus:bg-slate-700 focus:text-white">{faith}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currentRole" className="text-sm text-[#8BC4EA]">Current Role / Position *</Label>
                <Select value={individualData.currentRole} onValueChange={(value) => setIndividualData({...individualData, currentRole: value})}>
                  <SelectTrigger className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {roleOptions.map(role => (
                      <SelectItem key={role} value={role} className="text-white focus:bg-slate-700 focus:text-white">{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="yearsOfService" className="text-sm text-[#8BC4EA]">Years of Service: {individualData.yearsOfService}</Label>
                <input
                  id="yearsOfService"
                  type="range"
                  min="1"
                  max="50"
                  value={individualData.yearsOfService}
                  onChange={(e) => setIndividualData({...individualData, yearsOfService: parseInt(e.target.value)})}
                  className="mt-2 w-full h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-[#497EBC]"
                />
              </div>

              <div>
                <Label htmlFor="educationCredentials" className="text-sm text-[#8BC4EA]">Education & Credentials *</Label>
                <Textarea
                  id="educationCredentials"
                  value={individualData.educationCredentials}
                  onChange={(e) => setIndividualData({...individualData, educationCredentials: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="List your relevant education, certifications, and credentials..."
                />
              </div>

              <div>
                <Label className="text-sm text-[#8BC4EA] mb-3 block">Areas of Expertise *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[240px] overflow-y-auto bg-slate-700/30 rounded-lg p-4">
                  {expertiseAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={individualData.areasOfExpertise.includes(area)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIndividualData({...individualData, areasOfExpertise: [...individualData.areasOfExpertise, area]});
                          } else {
                            setIndividualData({...individualData, areasOfExpertise: individualData.areasOfExpertise.filter(a => a !== area)});
                          }
                        }}
                        className="border-[#497EBC]/30"
                      />
                      <Label htmlFor={area} className="text-sm text-slate-300 cursor-pointer">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button type="button" onClick={handleNext} className="w-full h-12 bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6A9F] hover:to-[#B89770] text-white">
                  Continue to AI Profile
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );

  // Step 3: Build AI Profile
  const renderIndividualStep3 = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#497EBC]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-lg border-b border-[#497EBC]/20">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#497EBC] uppercase tracking-wide">DivinityAGI Affiliate</div>
            <div className="text-lg bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">Influencer Application</div>
          </div>
          <div className="w-16 text-right">
            <div className="text-sm text-[#497EBC]">{getCurrentStepNumber()}/{getTotalSteps()}</div>
          </div>
        </header>

        <div className="px-4 py-3 bg-slate-800/30">
          <Progress value={(getCurrentStepNumber() / getTotalSteps()) * 100} className="h-2" />
        </div>
        
        <div className="px-4 py-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
              Build Your AI Profile
            </h2>
            <p className="text-slate-400 text-sm">
              Define how your AI avatar will interact with seekers
            </p>
          </div>
          
          <Card className="bg-slate-800/30 border-[#C9A882]/20 backdrop-blur-sm p-6">
            <form className="space-y-6">
              <div>
                <Label htmlFor="agentName" className="text-sm text-[#8BC4EA]">Agent Name *</Label>
                <Input
                  id="agentName"
                  value={individualData.agentName}
                  onChange={(e) => setIndividualData({...individualData, agentName: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="e.g., Sister Grace, Rabbi David, Guru Ananda"
                />
                <p className="text-xs text-slate-400 mt-1">How should your AI guide be addressed?</p>
              </div>

              <div>
                <Label htmlFor="agentLanguage" className="text-sm text-[#8BC4EA]">Primary Language *</Label>
                <Input
                  id="agentLanguage"
                  value={individualData.agentLanguage}
                  onChange={(e) => setIndividualData({...individualData, agentLanguage: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="English, Spanish, French, etc."
                />
              </div>

              <div>
                <Label htmlFor="agentRole" className="text-sm text-[#8BC4EA]">What's your agent's role? *</Label>
                <Input
                  id="agentRole"
                  value={individualData.agentRole}
                  onChange={(e) => setIndividualData({...individualData, agentRole: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="e.g., Spiritual Counselor, Life Coach, Meditation Guide"
                />
              </div>

              <div>
                <Label htmlFor="agentPersonality" className="text-sm text-[#8BC4EA]">Personality *</Label>
                <Select value={individualData.agentPersonality} onValueChange={(value) => setIndividualData({...individualData, agentPersonality: value})}>
                  <SelectTrigger className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select personality style" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {personalityOptions.map(personality => (
                      <SelectItem key={personality} value={personality} className="text-white focus:bg-slate-700 focus:text-white">{personality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialInstructions" className="text-sm text-[#8BC4EA]">Special Instructions *</Label>
                <Textarea
                  id="specialInstructions"
                  value={individualData.specialInstructions}
                  onChange={(e) => setIndividualData({...individualData, specialInstructions: e.target.value})}
                  className="mt-2 min-h-[120px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Describe your unique approach, communication style, and guiding philosophy..."
                />
                <p className="text-xs text-slate-400 mt-1">
                  How should your AI guide interact with seekers? What values and principles should it embody?
                </p>
              </div>

              <div className="pt-4">
                <Button type="button" onClick={handleNext} className="w-full h-12 bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6A9F] hover:to-[#B89770] text-white">
                  Continue to Profile Questions
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );

  // Step 4: Profile Questions (Part 1)
  const renderIndividualStep4 = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#497EBC]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-lg border-b border-[#497EBC]/20">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#497EBC] uppercase tracking-wide">DivinityAGI Affiliate</div>
            <div className="text-lg bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">Influencer Application</div>
          </div>
          <div className="w-16 text-right">
            <div className="text-sm text-[#497EBC]">{getCurrentStepNumber()}/{getTotalSteps()}</div>
          </div>
        </header>

        <div className="px-4 py-3 bg-slate-800/30">
          <Progress value={(getCurrentStepNumber() / getTotalSteps()) * 100} className="h-2" />
        </div>
        
        <div className="px-4 py-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
              Profile Questions - Part 1
            </h2>
            <p className="text-slate-400 text-sm">
              Share your wisdom and perspective on faith
            </p>
          </div>
          
          <Card className="bg-slate-800/30 border-[#C9A882]/20 backdrop-blur-sm p-6">
            <form className="space-y-6">
              <div>
                <Label htmlFor="question1" className="text-sm text-[#8BC4EA]">
                  How can I maintain faith in God amidst personal suffering and global crises? *
                </Label>
                <Textarea
                  id="question1"
                  value={individualData.question1}
                  onChange={(e) => setIndividualData({...individualData, question1: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your perspective..."
                />
              </div>

              <div>
                <Label htmlFor="question2" className="text-sm text-[#8BC4EA]">
                  How can prayer help me in times of doubt? *
                </Label>
                <Textarea
                  id="question2"
                  value={individualData.question2}
                  onChange={(e) => setIndividualData({...individualData, question2: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your perspective..."
                />
              </div>

              <div>
                <Label htmlFor="question3" className="text-sm text-[#8BC4EA]">
                  What does the Church say about why bad things happen to good people? *
                </Label>
                <Textarea
                  id="question3"
                  value={individualData.question3}
                  onChange={(e) => setIndividualData({...individualData, question3: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your perspective..."
                />
              </div>

              <div>
                <Label htmlFor="question4" className="text-sm text-[#8BC4EA]">
                  What are three core values that guide your decisions and actions in life? *
                </Label>
                <Textarea
                  id="question4"
                  value={individualData.question4}
                  onChange={(e) => setIndividualData({...individualData, question4: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your core values..."
                />
              </div>

              <div className="pt-4">
                <Button type="button" onClick={handleNext} className="w-full h-12 bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6A9F] hover:to-[#B89770] text-white">
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );

  // Step 5: Profile Questions (Part 2)
  const renderIndividualStep5 = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#497EBC]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-lg border-b border-[#497EBC]/20">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#497EBC] uppercase tracking-wide">DivinityAGI Affiliate</div>
            <div className="text-lg bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">Influencer Application</div>
          </div>
          <div className="w-16 text-right">
            <div className="text-sm text-[#497EBC]">{getCurrentStepNumber()}/{getTotalSteps()}</div>
          </div>
        </header>

        <div className="px-4 py-3 bg-slate-800/30">
          <Progress value={(getCurrentStepNumber() / getTotalSteps()) * 100} className="h-2" />
        </div>
        
        <div className="px-4 py-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
              Profile Questions - Part 2
            </h2>
            <p className="text-slate-400 text-sm">
              Continue sharing your wisdom and perspective
            </p>
          </div>
          
          <Card className="bg-slate-800/30 border-[#C9A882]/20 backdrop-blur-sm p-6">
            <form className="space-y-6">
              <div>
                <Label htmlFor="question5" className="text-sm text-[#8BC4EA]">
                  Can you describe a time when your beliefs were challenged, and how you responded? *
                </Label>
                <Textarea
                  id="question5"
                  value={individualData.question5}
                  onChange={(e) => setIndividualData({...individualData, question5: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your experience..."
                />
              </div>

              <div>
                <Label htmlFor="question6" className="text-sm text-[#8BC4EA]">
                  How do you define "purpose" in your own life? *
                </Label>
                <Textarea
                  id="question6"
                  value={individualData.question6}
                  onChange={(e) => setIndividualData({...individualData, question6: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your perspective..."
                />
              </div>

              <div>
                <Label htmlFor="question7" className="text-sm text-[#8BC4EA]">
                  In what ways do you find community and connection with others? *
                </Label>
                <Textarea
                  id="question7"
                  value={individualData.question7}
                  onChange={(e) => setIndividualData({...individualData, question7: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your approach..."
                />
              </div>

              <div>
                <Label htmlFor="question8" className="text-sm text-[#8BC4EA]">
                  What gives you hope or a sense of optimism about the future? *
                </Label>
                <Textarea
                  id="question8"
                  value={individualData.question8}
                  onChange={(e) => setIndividualData({...individualData, question8: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share what inspires you..."
                />
              </div>

              <div className="pt-4">
                <Button type="button" onClick={handleNext} className="w-full h-12 bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6A9F] hover:to-[#B89770] text-white">
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );

  // Step 6: Profile Questions (Part 3)
  const renderIndividualStep6 = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#497EBC]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-lg border-b border-[#497EBC]/20">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#497EBC] uppercase tracking-wide">DivinityAGI Affiliate</div>
            <div className="text-lg bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">Influencer Application</div>
          </div>
          <div className="w-16 text-right">
            <div className="text-sm text-[#497EBC]">{getCurrentStepNumber()}/{getTotalSteps()}</div>
          </div>
        </header>

        <div className="px-4 py-3 bg-slate-800/30">
          <Progress value={(getCurrentStepNumber() / getTotalSteps()) * 100} className="h-2" />
        </div>
        
        <div className="px-4 py-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
              Profile Questions - Part 3
            </h2>
            <p className="text-slate-400 text-sm">
              Final questions to complete your wisdom profile
            </p>
          </div>
          
          <Card className="bg-slate-800/30 border-[#C9A882]/20 backdrop-blur-sm p-6">
            <form className="space-y-6">
              <div>
                <Label htmlFor="question9" className="text-sm text-[#8BC4EA]">
                  How can I balance personal desires with God's plan for me? *
                </Label>
                <Textarea
                  id="question9"
                  value={individualData.question9}
                  onChange={(e) => setIndividualData({...individualData, question9: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your guidance..."
                />
              </div>

              <div>
                <Label htmlFor="question10" className="text-sm text-[#8BC4EA]">
                  How do you approach moments of doubt or uncertainty? *
                </Label>
                <Textarea
                  id="question10"
                  value={individualData.question10}
                  onChange={(e) => setIndividualData({...individualData, question10: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your approach..."
                />
              </div>

              <div>
                <Label htmlFor="question11" className="text-sm text-[#8BC4EA]">
                  What role does compassion play in your interactions with others? *
                </Label>
                <Textarea
                  id="question11"
                  value={individualData.question11}
                  onChange={(e) => setIndividualData({...individualData, question11: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your perspective..."
                />
              </div>

              <div>
                <Label htmlFor="question12" className="text-sm text-[#8BC4EA]">
                  Can you share an experience where you felt a sense of awe or wonder? *
                </Label>
                <Textarea
                  id="question12"
                  value={individualData.question12}
                  onChange={(e) => setIndividualData({...individualData, question12: e.target.value})}
                  className="mt-2 min-h-[100px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="pt-4">
                <Button type="button" onClick={handleNext} className="w-full h-12 bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6A9F] hover:to-[#B89770] text-white">
                  Continue to Payment & Finalize
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );

  // Step 7: Payment & Finalize
  const renderIndividualStep7 = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-lg border-b border-purple-500/20">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-purple-300 hover:text-white hover:bg-purple-400/10">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xs text-purple-300 uppercase tracking-wide">DivinityAGI Affiliate</div>
            <div className="text-lg bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Influencer Application</div>
          </div>
          <div className="w-16 text-right">
            <div className="text-sm text-purple-300">{getCurrentStepNumber()}/{getTotalSteps()}</div>
          </div>
        </header>

        <div className="px-4 py-3 bg-slate-800/30">
          <Progress value={(getCurrentStepNumber() / getTotalSteps()) * 100} className="h-2" />
        </div>
        
        <div className="px-4 py-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Introduction Video & Payment
            </h2>
            <p className="text-slate-400 text-sm">
              Final step to complete your application
            </p>
          </div>
          
          <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm p-6">
            <form className="space-y-6">
              <div>
                <Label htmlFor="introVideo" className="text-sm text-purple-200">Upload Your Introduction Video (Optional)</Label>
                <p className="text-xs text-slate-400 mb-2">
                  A short video introducing yourself helps us understand your personality and teaching style
                </p>
                <Button variant="outline" className="w-full h-12 border-purple-400/30 text-[#7A4FFF] hover:bg-purple-500/10 hover:text-white hover:border-purple-400/50 backdrop-blur-sm font-medium">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </div>

              <Separator className="bg-purple-500/20" />

              <div>
                <Label htmlFor="paymentMethod" className="text-sm text-purple-200">Preferred Payment Method *</Label>
                <Select value={individualData.paymentMethod} onValueChange={(value) => setIndividualData({...individualData, paymentMethod: value})}>
                  <SelectTrigger className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {paymentMethods.map(method => (
                      <SelectItem key={method} value={method} className="text-white focus:bg-slate-700 focus:text-white">{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="paymentDetails" className="text-sm text-purple-200">Payment Details *</Label>
                <Input
                  id="paymentDetails"
                  value={individualData.paymentDetails}
                  onChange={(e) => setIndividualData({...individualData, paymentDetails: e.target.value})}
                  className="mt-2 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="PayPal email, bank account, or other payment details"
                />
                <p className="text-xs text-slate-400 mt-1">
                  This information will be used to process your revenue share payments
                </p>
              </div>

              <Separator className="bg-purple-500/20" />

              <div className="flex items-start space-x-3 bg-slate-700/30 p-4 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={individualData.termsAccepted}
                  onCheckedChange={(checked) => setIndividualData({...individualData, termsAccepted: checked as boolean})}
                  className="mt-1 border-purple-400/30"
                />
                <Label htmlFor="terms" className="text-sm text-slate-300 leading-relaxed cursor-pointer">
                  I agree to the DivinityAGI Contributor Terms of Service, Privacy Policy, and Content Guidelines. 
                  I understand that my application will be reviewed and I will be notified of the decision within 5-7 business days.
                </Label>
              </div>

              <div className="pt-4">
                <Button 
                  type="button"
                  onClick={handleNext} 
                  disabled={!individualData.termsAccepted}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Application
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );

  // Main component return logic
  if (contributorStatus !== "guest") {
    if (contributorStatus === "pending") {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="p-8 max-w-md text-center">
            <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Application Under Review</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your interest in becoming a DivinityAGI contributor. Your application is currently being reviewed by our team.
            </p>
            <Button onClick={() => setContributorStatus("guest")} variant="outline" className="w-full">
              Return to Application
            </Button>
          </Card>
        </div>
      );
    }

    if (contributorStatus === "approved") {
      return renderContributorPortal();
    }

    // Default: show the form based on contributor type
    return contributorType === "ministry" ? renderMinistryForm() : renderIndividualStep1();
  }

  switch (currentStep) {
    case "ministry":
      return renderMinistryForm();
    case "individual-1":
      return renderIndividualStep1();
    case "individual-2":
      return renderIndividualStep2();
    case "individual-3":
      return renderIndividualStep3();
    case "individual-4":
      return renderIndividualStep4();
    case "individual-5":
      return renderIndividualStep5();
    case "individual-6":
      return renderIndividualStep6();
    case "individual-7":
      return renderIndividualStep7();
    default:
      return contributorType === "ministry" ? renderMinistryForm() : renderIndividualStep1();
  }
});