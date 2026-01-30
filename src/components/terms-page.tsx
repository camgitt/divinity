import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppFooter } from "./app-footer";
import {
  ArrowLeft,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Scale,
  Users,
  Lock,
  Clock,
  Ban,
  Gavel,
  Globe,
  Mail
} from "lucide-react";

interface TermsPageProps {
  onBack?: () => void;
  onOpenMission?: () => void;
  onNavigate?: (route: string) => void;
}

export function TermsPage({ onBack, onOpenMission, onNavigate }: TermsPageProps) {
  const lastUpdated = "October 30, 2025";

  const sections = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using DivinityAGI (\"the Service\"), you accept and agree to be bound by these Terms of Use.",
        "If you do not agree to these terms, please do not use the Service.",
        "We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the modified terms."
      ]
    },
    {
      icon: Users,
      title: "User Eligibility & Accounts",
      content: [
        "You must be at least 13 years old to use DivinityAGI. Users under 18 require parental consent.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate and complete information during registration.",
        "One person may not maintain more than one account without express permission.",
        "You are responsible for all activities that occur under your account."
      ]
    },
    {
      icon: Shield,
      title: "Spiritual Guidance Disclaimer",
      content: [
        "DivinityAGI provides AI-powered spiritual guidance for informational and educational purposes only.",
        "Our AI guides are not substitutes for professional mental health services, medical advice, or licensed religious counseling.",
        "If you are experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately.",
        "The spiritual advice provided is based on AI algorithms and may not reflect the views of any particular faith tradition or organization.",
        "Users should consult with qualified religious leaders and mental health professionals for serious spiritual or psychological concerns."
      ]
    },
    {
      icon: FileText,
      title: "User Content & Conduct",
      content: [
        "You retain ownership of content you create, but grant DivinityAGI a license to use, display, and distribute your content within the Service.",
        "You are solely responsible for the content you post and share on the platform.",
        "Prohibited content includes: hate speech, harassment, illegal activities, spam, explicit content, impersonation, and content that violates intellectual property rights.",
        "We reserve the right to remove any content that violates these terms or is deemed inappropriate.",
        "Repeated violations may result in account suspension or termination."
      ]
    },
    {
      icon: Lock,
      title: "Intellectual Property",
      content: [
        "All content, features, and functionality of DivinityAGI are owned by us and protected by copyright, trademark, and other intellectual property laws.",
        "The DivinityAGI name, logo, and all related names, logos, product and service names are our trademarks.",
        "Our proprietary faith-matching algorithm and AI systems are protected trade secrets.",
        "You may not copy, modify, distribute, sell, or reverse engineer any part of the Service without express written permission.",
        "AI-generated content and responses are owned by DivinityAGI and licensed to you for personal, non-commercial use only."
      ]
    },
    {
      icon: Scale,
      title: "Subscription & Payments",
      content: [
        "DivinityAGI operates on a freemium model with optional premium subscriptions.",
        "Subscription fees are billed in advance on a recurring basis (monthly or annually).",
        "All fees are non-refundable except as required by law or as explicitly stated in our refund policy.",
        "We reserve the right to modify subscription pricing with 30 days advance notice to active subscribers.",
        "You may cancel your subscription at any time, with access continuing until the end of the current billing period.",
        "Payment processing is handled by Stripe. Your payment information is subject to Stripe's terms and privacy policy."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: [
        "DivinityAGI is provided \"as is\" without warranties of any kind, either express or implied.",
        "We do not guarantee that the Service will be uninterrupted, secure, or error-free.",
        "We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.",
        "Our total liability to you for any claims arising from the Service is limited to the amount you paid us in the 12 months before the claim.",
        "Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so these limitations may not apply to you."
      ]
    },
    {
      icon: Ban,
      title: "Prohibited Uses",
      content: [
        "You may not use the Service for any illegal purpose or in violation of any laws.",
        "You may not attempt to gain unauthorized access to any part of the Service, other users' accounts, or connected systems.",
        "You may not use automated systems (bots, scrapers) to access the Service without permission.",
        "You may not interfere with or disrupt the Service or servers/networks connected to the Service.",
        "You may not impersonate any person or entity or falsely represent your affiliation with any person or entity.",
        "You may not use the Service to collect or harvest personal information about other users."
      ]
    },
    {
      icon: Gavel,
      title: "Termination",
      content: [
        "We reserve the right to suspend or terminate your account at any time for violation of these terms.",
        "You may terminate your account at any time by contacting our support team.",
        "Upon termination, your right to use the Service will immediately cease.",
        "We may retain certain information as required by law or for legitimate business purposes.",
        "Provisions that by their nature should survive termination will continue to apply."
      ]
    },
    {
      icon: Globe,
      title: "Governing Law & Disputes",
      content: [
        "These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles.",
        "Any disputes arising from these Terms or the Service will be resolved through binding arbitration in accordance with the American Arbitration Association rules.",
        "You waive any right to participate in a class action lawsuit or class-wide arbitration.",
        "If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.",
        "Our failure to enforce any right or provision in these Terms will not constitute a waiver of that right or provision."
      ]
    },
    {
      icon: Clock,
      title: "Data Protection & Privacy",
      content: [
        "Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.",
        "We collect, use, and protect your personal information as described in our Privacy Policy.",
        "DivinityAGI is not intended for collecting personally identifiable information (PII) or securing highly sensitive data.",
        "For users in the European Union, you have rights under GDPR including access, rectification, and deletion of your data.",
        "We use industry-standard security measures to protect your data, but cannot guarantee absolute security."
      ]
    },
    {
      icon: Mail,
      title: "Contact & Support",
      content: [
        "For questions about these Terms, please contact us at: support@divinityagi.com",
        "For technical support, use the in-app support feature or email: support@divinityagi.com",
        "For verified leader and contributor inquiries: partners@divinityagi.com",
        "For privacy-related requests: privacy@divinityagi.com",
        "We aim to respond to all inquiries within 48 hours during business days."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2942] via-[#0f1d30] to-[#0a1525] text-white pb-20 relative overflow-hidden">
      {/* Enhanced Textured Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cosmic spiritual image */}
        <div className="absolute inset-0 -top-20 h-[120vh]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Cosmic Legal Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-10 mix-blend-screen scale-105"
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2942]/90 via-[#0f1d30]/95 to-[#0a1525]/98" />
        </div>
        
        {/* Cosmic accent overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(73,126,188,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(201,168,130,0.10),_transparent_60%)]" />
        
        {/* Enhanced multi-layer texture system */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.15) 2px,
                rgba(255, 255, 255, 0.15) 4px
              )
            `
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => {
              if (onBack) {
                onBack();
              } else if (onNavigate) {
                onNavigate('circle');
              } else {
                // Safe fallback - only use history.back if we have history
                if (window.history.length > 1) {
                  window.history.back();
                }
              }
            }}
            variant="ghost"
            className="mb-6 text-slate-300 hover:text-white hover:bg-[#1E3A5F]/40 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <Gavel className="w-16 h-16 text-[#497EBC] drop-shadow-[0_0_20px_rgba(73,126,188,0.7)]" />
            </div>
            
            <h1 className="alt-font text-5xl sm:text-6xl mb-4 bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,211,105,0.4)]">
              Terms of Use
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-4">
              Legal Agreement for Using DivinityAGI Services
            </p>

            <Badge className="bg-[#497EBC]/20 border-[#497EBC]/50 text-[#497EBC] px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Last Updated: {lastUpdated}
            </Badge>
          </motion.div>
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-[#FFD369]/10 to-[#F59E0B]/5 border-[#FFD369]/40 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-[#FFD369] drop-shadow-[0_0_10px_rgba(255,211,105,0.6)]" />
              </div>
              <div>
                <h3 className="text-xl text-[#FFD369] mb-2">
                  Important Legal Information
                </h3>
                <p className="text-slate-200 leading-relaxed">
                  These Terms of Use constitute a legally binding agreement between you and DivinityAGI. 
                  Please read them carefully before using our services. By creating an account or using 
                  DivinityAGI, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
              >
                <Card className="bg-[#162844]/60 border-[#1E3A5F]/60 hover:border-[#497EBC]/50 transition-all duration-500 backdrop-blur-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_25px_rgba(73,126,188,0.2)]">
                  <div className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#497EBC]/20 to-[#1E3A5F]/20 border border-[#497EBC]/30 flex items-center justify-center shadow-[0_0_20px_rgba(73,126,188,0.3)]">
                          <Icon className="w-7 h-7 text-[#497EBC] drop-shadow-[0_0_8px_rgba(73,126,188,0.6)]" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h2 className="text-2xl text-white mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <div key={pIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1.5">
                            <div className="w-1.5 h-1.5 bg-[#497EBC] rounded-full shadow-[0_0_6px_rgba(73,126,188,0.6)]" />
                          </div>
                          <p className="text-slate-200 leading-relaxed">
                            {paragraph}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Agreement Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-[#497EBC]/10 to-[#1E3A5F]/10 border-[#497EBC]/40 p-8 backdrop-blur-sm text-center">
            <FileText className="w-12 h-12 text-[#497EBC] mx-auto mb-4 drop-shadow-[0_0_15px_rgba(73,126,188,0.7)]" />
            <h3 className="text-2xl text-white mb-4">
              Questions About These Terms?
            </h3>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto leading-relaxed">
              If you have any questions or concerns about these Terms of Use, please don't hesitate 
              to contact our support team. We're here to help ensure you have a clear understanding 
              of your rights and responsibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = 'mailto:info@divinityagi.com'}
                className="bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3d6aa3] hover:to-[#b89972] text-white shadow-[0_4px_15px_rgba(73,126,188,0.4)] hover:shadow-[0_6px_25px_rgba(73,126,188,0.6)] transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
              <Button
                onClick={() => onNavigate?.('privacy')}
                variant="outline"
                className="border-[#497EBC]/40 bg-[#162844]/40 text-[#497EBC] hover:bg-[#497EBC]/15 hover:text-white hover:border-[#497EBC]/60"
              >
                <Lock className="w-5 h-5 mr-2" />
                View Privacy Policy
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      </div>
    </div>
  );
}