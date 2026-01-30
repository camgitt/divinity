import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AppFooter } from "./app-footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import { 
  ChevronLeft, 
  Shield, 
  AlertCircle, 
  Scale, 
  UserX, 
  FileText, 
  Lock,
  Mail,
  Send
} from "lucide-react";

interface PrivacyPageProps {
  onBack?: () => void;
  onOpenMission?: () => void;
  onNavigate?: (tab: string) => void;
}

export function PrivacyPage({ onBack, onOpenMission, onNavigate }: PrivacyPageProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSendingContact, setIsSendingContact] = useState(false);

  // EmailJS configuration (same as contributors)
  const EMAILJS_SERVICE_ID = 'service_xawjo1g';
  const EMAILJS_TEMPLATE_ID = 'template_u38gulh';
  const EMAILJS_PUBLIC_KEY = 'DCwKRc4Y0WSgS1QfM';

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactData.name || !contactData.email || !contactData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSendingContact(true);

    try {
      // Format the email content
      const emailContent = `
DivinityAGI Contact Form Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject || 'General Inquiry'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${contactData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString()}
Source: Privacy/Disclaimer Page Contact Form
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
            subject: `DivinityAGI Contact: ${contactData.subject || 'General Inquiry'}`,
            message: emailContent,
            from_name: contactData.name,
            from_email: contactData.email,
          },
        }),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: 'We\'ll respond to your inquiry within 24-48 hours.'
        });
        setShowContactForm(false);
        setContactData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error('Email API returned non-200 status');
      }
    } catch (error) {
      console.error('Failed to send contact message:', error);
      toast.error('Failed to send message', {
        description: 'Please try again or email us directly at info@divinityagi.com'
      });
    } finally {
      setIsSendingContact(false);
    }
  };
  
  const sections = [
    {
      icon: FileText,
      title: "Informational and Educational Purposes Only",
      content: `DivinityAGI ("the Platform") and its AI Agents provide information, spiritual perspectives, and educational content. Nothing communicated by the AI Agents should be construed as professional legal, medical, mental health, or financial advice. Please consult a qualified professional if you require expert assistance in any of these areas.`
    },
    {
      icon: UserX,
      title: "No Substitute for Professional Guidance",
      content: `The Platform's AI Agents are programmed to discuss spiritual, religious, and personal growth topics. They are not certified counselors, clergy, health professionals, or financial advisors. Users should not rely on the AI Agents as a substitute for qualified advice or guidance.`
    },
    {
      icon: Scale,
      title: "User Responsibility and Personal Discretion",
      content: `You acknowledge that all actions and decisions arising from the AI Agents' information or suggestions are your sole responsibility. The Platform, its operators, and affiliates assume no liability for outcomes, decisions, or events resulting from your reliance on AI-provided content.`
    },
    {
      icon: AlertCircle,
      title: "No Guarantee of Accuracy or Completeness",
      content: `The AI Agents generate responses based on a vast range of sources and data. While efforts are made to maintain accuracy, the Platform does not warrant or guarantee the correctness, reliability, or completeness of any AI-generated information. Content may contain inaccuracies, omissions, or outdated details.`
    },
    {
      icon: Shield,
      title: "Spiritual and Religious Context",
      content: `DivinityAGI's AI Agents may represent or discuss various faith traditions and spiritual themes. These representations or discussions are generated from a technology-based model and may not align with every user's doctrinal understanding, personal convictions, or the official stance of any specific religious organization. Always consult recognized spiritual leaders or clergy within your faith tradition for definitive guidance.`
    },
    {
      icon: UserX,
      title: "No Attorney-Client or Clergy-Parishioner Relationship",
      content: `Interacting with the Platform or its AI Agents does not create an attorney-client, therapist-patient, clergy-parishioner, or any other professional relationship. All information and content provided through the AI Agents is offered on an "as-is" basis.`
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      content: `Under no circumstances shall DivinityAGI, its operators, employees, partners, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use—or inability to use—the Platform or AI Agents' content, even if advised of the possibility of such damages.`
    },
    {
      icon: Lock,
      title: "User Data and Privacy",
      content: `Your interactions with the AI Agents may involve sharing personal or sensitive information. By using this Platform, you acknowledge that such interactions are subject to our Privacy Policy, and you assume responsibility for the nature and extent of any data you choose to share.`
    },
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: `By engaging with the AI Agents, you confirm that you have read, understand, and agree to the terms of this Legal Disclaimer. If you do not agree, you are not permitted to interact with or use the Platform's AI services.`
    },
    {
      icon: AlertCircle,
      title: "Changes to Disclaimer",
      content: `DivinityAGI reserves the right to modify or update this Disclaimer at any time without prior notice. Updates will be posted on the Platform, and your continued use after any modifications indicates your acceptance of the revised terms.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2942] via-[#0f1d30] to-[#0a1525] text-white pb-20">
      {/* Enhanced Textured Cosmic Background */}
      <div className="fixed inset-0 pointer-events-none">
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

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-gradient-to-r from-[#1a2942]/95 to-[#0f1d30]/95 backdrop-blur-lg border-b border-[#497EBC]/20">
          <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              size="sm" 
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
              className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/10"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex-1 text-center">
              <div className="text-sm text-[#497EBC] uppercase tracking-wide">DivinityAGI</div>
              <div className="text-xl bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent">
                Legal Disclaimer & Privacy
              </div>
            </div>
            <div className="w-20" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-[#497EBC] mr-3" />
              <h1 className="text-4xl sm:text-5xl bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
                Legal Disclaimer
              </h1>
            </div>
            <p className="text-xl text-slate-300 mb-4">
              For Interacting with DivinityAGI AI Agents
            </p>
            <p className="text-sm text-slate-400">
              Last Updated: March 9, 2025
            </p>
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <Card className="bg-slate-800/30 border-[#497EBC]/20 backdrop-blur-sm overflow-hidden hover:border-[#497EBC]/40 transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#497EBC]/20 to-[#1E3A5F]/20 flex items-center justify-center border border-[#497EBC]/30">
                          <Icon className="w-6 h-6 text-[#497EBC]" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl text-white mb-3">{section.title}</h2>
                          <p className="text-slate-300 leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-[#497EBC]/10 to-[#1E3A5F]/10 border-[#497EBC]/30 backdrop-blur-sm overflow-hidden">
              <div className="p-8 text-center">
                <Mail className="w-12 h-12 text-[#FFD369] mx-auto mb-4" />
                <h2 className="text-2xl text-white mb-4">Contact Information</h2>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  For any questions or concerns regarding this Disclaimer, or to learn more about DivinityAGI's terms and policies, please contact us:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => setShowContactForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3d6aa3] hover:to-[#b89972] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#497EBC]/50"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                  <a 
                    href="mailto:info@divinityagi.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg transition-all duration-300 shadow-lg"
                  >
                    <Mail className="w-5 h-5" />
                    info@divinityagi.com
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form Dialog */}
          <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
            <DialogContent className="max-w-lg w-full bg-[#0B1426]/95 border-[#1E3A5F] backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-white bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
                  Contact DivinityAGI
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Send us a message about privacy, legal questions, or general inquiries
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleContactSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="contact-name" className="text-slate-300">Name *</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email" className="text-slate-300">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-subject" className="text-slate-300">Subject</Label>
                  <Input
                    id="contact-subject"
                    type="text"
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    placeholder="e.g., Privacy Question, General Inquiry"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message" className="text-slate-300">Message *</Label>
                  <Textarea
                    id="contact-message"
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    required
                    rows={6}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowContactForm(false)}
                    disabled={isSendingContact}
                    className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSendingContact}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    {isSendingContact ? (
                      <>
                        <span className="animate-pulse">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-slate-400 text-center pt-2">
                  We typically respond within 24-48 hours
                </p>
              </form>
            </DialogContent>
          </Dialog>
        </section>

        {/* Final Notice */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <Card className="bg-slate-800/40 border-purple-500/30 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-[#FFD369] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-slate-200 leading-relaxed">
                      By using DivinityAGI's AI Agents, you acknowledge and agree to this Disclaimer in full. If you do not agree, please discontinue any and all interactions with the AI Agents immediately.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Footer */}
        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      </div>
    </div>
  );
}