/**
 * Email Confirmation Helper Component
 * Provides resend functionality and FAQ for users awaiting email confirmation
 */

import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Mail, RefreshCw, HelpCircle, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getSupabaseClient } from "./services/supabase-client";
import { motion, AnimatePresence } from "motion/react";
import { useAdminMonitoring } from "./admin-monitoring-context";

interface EmailConfirmationHelperProps {
  initialEmail?: string;
  onClose?: () => void;
}

export function EmailConfirmationHelper({ initialEmail = "", onClose }: EmailConfirmationHelperProps) {
  const [email, setEmail] = useState(initialEmail);
  const [isResending, setIsResending] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const { trackEmailConfirmation } = useAdminMonitoring();

  const handleResendConfirmation = async () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsResending(true);

    try {
      const supabase = await getSupabaseClient();
      
      if (!supabase) {
        toast.error('Email service not available. Please try again later.');
        setIsResending(false);
        return;
      }

      // Resend confirmation email using Supabase
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        console.error('❌ Resend error:', error);
        
        if (error.message.includes('already confirmed')) {
          toast.success('✓ This email is already confirmed! You can sign in now.');
          await trackEmailConfirmation(email, 'confirmed', { source: 'resend_attempt' });
        } else if (error.message.includes('not found')) {
          toast.error('No account found with this email. Please create a new account.');
          await trackEmailConfirmation(email, 'failed', { reason: 'account_not_found' });
        } else {
          toast.error(`Failed to resend: ${error.message}`);
          await trackEmailConfirmation(email, 'failed', { reason: error.message });
        }
      } else {
        toast.success('✅ Confirmation email resent! Check your inbox and spam folder.', {
          duration: 6000
        });
        
        setTimeout(() => {
          toast.info(`📧 We sent a new link to ${email}. The link expires in 24 hours.`, {
            duration: 8000
          });
        }, 1000);
        
        // Track successful resend
        await trackEmailConfirmation(email, 'resent', { source: 'user_request' });
      }
    } catch (error) {
      console.error('Exception resending email:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const faqItems = [
    {
      question: "I didn't receive the confirmation email. What should I do?",
      answer: "First, check your spam/junk folder and 'Promotions' tab (Gmail). If you still don't see it after 10 minutes, use the 'Resend Confirmation Email' button above. Make sure you entered the correct email address when signing up."
    },
    {
      question: "How long is the confirmation link valid?",
      answer: "The confirmation link expires after 24 hours for security reasons. If your link has expired, simply request a new one using the resend button. You can request a new confirmation email as many times as needed."
    },
    {
      question: "The confirmation link doesn't work. What's wrong?",
      answer: "This usually happens if the link expired (>24 hours) or was already used. Request a new confirmation email. Also try: copying/pasting the full URL instead of clicking, clearing your browser cache, or trying a different browser."
    },
    {
      question: "Can I change my email address?",
      answer: "Before confirming, you'll need to create a new account with the correct email. After confirmation, you can update your email in Account Settings. Each email can only be associated with one DivinityAGI account."
    },
    {
      question: "What happens if I don't confirm my email?",
      answer: "Your account will remain inactive and you won't be able to sign in or access DivinityAGI features. For security and to prevent spam, we require all users to verify their email ownership before accessing the platform."
    },
    {
      question: "Is my data secure during confirmation?",
      answer: "Absolutely! Your password is never sent via email - only a secure, one-time verification link. We use industry-standard encryption (TLS/SSL) for all email communications. Your confirmation link is unique and expires after 24 hours."
    },
    {
      question: "I confirmed my email but can't sign in. Help?",
      answer: "Make sure you're using the correct password (passwords are case-sensitive). Check that Caps Lock is off. If you forgot your password, use the 'Forgot Password' link on the sign-in page. Clear your browser cookies and try again."
    },
    {
      question: "Will I receive any other emails from DivinityAGI?",
      answer: "After confirmation, you'll only receive emails you've opted into (daily reflections, notifications). You can manage email preferences in your Account Settings. We never send spam or share your email with third parties."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Resend Email Section */}
      <Card className="bg-white border-2 border-[#7A4FFF]/20 shadow-lg">
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#7A4FFF]/10 rounded-full">
              <Mail className="w-6 h-6 text-[#7A4FFF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-1">Waiting for Confirmation Email?</h3>
              <p className="text-sm text-slate-600">
                If you didn't receive your confirmation email, we can send you a new one. Check your spam folder first!
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="resend-email" className="text-slate-700">Email Address</Label>
              <Input
                id="resend-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-white border-slate-300 focus:border-[#7A4FFF] focus:ring-[#7A4FFF]/20"
                disabled={isResending}
              />
            </div>

            <Button
              onClick={handleResendConfirmation}
              disabled={isResending || !email}
              className="w-full relative overflow-hidden rounded-full bg-gradient-to-r from-[#7A4FFF] to-[#9D7FFF] hover:from-[#6A3FEF] hover:to-[#8D6FEF] text-white shadow-lg transition-all duration-300"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend Confirmation Email
                </>
              )}
            </Button>
          </div>

          {/* Quick Tips */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Quick Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Check your spam/junk folder</li>
                  <li>Look in the "Promotions" tab (Gmail users)</li>
                  <li>Wait 5-10 minutes before resending</li>
                  <li>Verify your email address is correct</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* FAQ Section */}
      <Card className="bg-white border-2 border-slate-200">
        <div className="p-6">
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="w-full flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FFD369]/20 rounded-full">
                <HelpCircle className="w-5 h-5 text-[#FFD369]" />
              </div>
              <div>
                <h3 className="text-slate-900 group-hover:text-[#7A4FFF] transition-colors">
                  Frequently Asked Questions
                </h3>
                <p className="text-sm text-slate-600">
                  {showFAQ ? 'Click to hide' : 'Click to view common questions about email confirmation'}
                </p>
              </div>
            </div>
            {showFAQ ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          <AnimatePresence>
            {showFAQ && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 space-y-3">
                  {faqItems.map((item, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-lg overflow-hidden hover:border-[#7A4FFF]/30 transition-colors"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-4 text-left flex items-start justify-between gap-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <span className="text-slate-800 flex-1">
                          {item.question}
                        </span>
                        {expandedFAQ === index ? (
                          <ChevronUp className="w-5 h-5 text-[#7A4FFF] flex-shrink-0 mt-0.5" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-white border-t border-slate-200">
                              <p className="text-slate-700 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Support Contact */}
      <Card className="bg-gradient-to-br from-[#7A4FFF]/5 to-[#FFD369]/5 border-2 border-[#7A4FFF]/20">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#7A4FFF] mt-0.5" />
            <div>
              <h4 className="text-slate-900 mb-1">Still Need Help?</h4>
              <p className="text-sm text-slate-700 mb-3">
                Our support team is here to assist you with any email confirmation issues.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="mailto:support@divinityagi.com?subject=Email%20Confirmation%20Help"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#7A4FFF] text-[#7A4FFF] rounded-full hover:bg-[#7A4FFF] hover:text-white transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
                <span className="px-4 py-2 text-sm text-slate-600 bg-white rounded-full border border-slate-300">
                  Response within 24-48 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
