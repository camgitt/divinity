import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";
import {
  Upload,
  Shield,
  CheckCircle,
  FileText,
  CreditCard,
  Clock,
  Lock,
  Award,
  DollarSign,
  Users,
  Building,
  Heart,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

interface VerifiedLeaderGatekeeperProps {
  onBack: () => void;
  onComplete: () => void;
}

export function VerifiedLeaderGatekeeper({ onBack, onComplete }: VerifiedLeaderGatekeeperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Step 1: Credential Upload State
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  
  // Step 2: KYC State
  const [kycComplete, setKycComplete] = useState(false);
  
  // Step 3: Payment State
  const [paymentComplete, setPaymentComplete] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (docType: string) => {
    // Simulate file upload
    toast.success(`${docType} uploaded successfully`);
    setUploadedDocs([...uploadedDocs, docType]);
  };

  const handleKYCVerification = () => {
    setIsProcessing(true);
    // Simulate KYC verification
    setTimeout(() => {
      setKycComplete(true);
      setIsProcessing(false);
      toast.success("Identity verification complete!");
    }, 2000);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentComplete(true);
      setIsProcessing(false);
      toast.success("Payment processed successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-amber-50/20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                className="text-slate-600 hover:text-[#7A4FFF] hover:bg-[#7A4FFF]/5"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                  Become a Spiritual Innovator
                </h1>
                <p className="text-sm text-slate-500">Join our verified leader community</p>
              </div>
            </div>
            <Badge className="bg-[#FFD369]/20 text-[#d4793f] border-[#FFD369]/40 px-4 py-2">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Progress value={progress} className="h-2 bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </Progress>
          <div className="flex justify-between mt-2">
            {['Credentials', 'Identity', 'Payment', 'Review'].map((label, index) => (
              <div
                key={label}
                className={`flex items-center gap-2 ${
                  currentStep > index + 1
                    ? 'text-[#7A4FFF]'
                    : currentStep === index + 1
                    ? 'text-[#7A4FFF]'
                    : 'text-slate-400'
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    currentStep >= index + 1 ? 'border-[#7A4FFF] bg-[#7A4FFF]' : 'border-slate-300'
                  }`} />
                )}
                <span className="text-xs" style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Credential Upload */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-white border-2 border-[#7A4FFF]/20 shadow-lg">
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-[#7A4FFF] to-purple-600 rounded-2xl">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl text-[#3D3D6B] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                            Upload Your Credentials
                          </h2>
                          <p className="text-slate-600">
                            We verify all spiritual leaders to ensure authentic, qualified guidance for our community.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Document Upload Zones */}
                        {[
                          { id: 'ordination', label: 'Ordination Certificate or Seminary Degree', required: true },
                          { id: '501c3', label: '501(c)(3) Status (if applicable)', required: false },
                          { id: 'photo-id', label: 'Government-Issued Photo ID', required: true },
                          { id: 'headshot', label: 'Professional Headshot', required: true },
                          { id: 'resume', label: 'Resume/CV with Leadership Experience', required: true },
                        ].map((doc) => (
                          <div
                            key={doc.id}
                            className={`p-6 border-2 border-dashed rounded-2xl transition-all cursor-pointer hover:border-[#7A4FFF] hover:bg-[#7A4FFF]/5 ${
                              uploadedDocs.includes(doc.id)
                                ? 'border-green-500 bg-green-50'
                                : 'border-slate-300'
                            }`}
                            onClick={() => handleFileUpload(doc.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {uploadedDocs.includes(doc.id) ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Upload className="w-5 h-5 text-slate-400" />
                                )}
                                <div>
                                  <p className="text-[#3D3D6B]" style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
                                    {doc.label}
                                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-1">
                                    {uploadedDocs.includes(doc.id)
                                      ? 'Uploaded successfully'
                                      : 'Click to upload or drag and drop'}
                                  </p>
                                </div>
                              </div>
                              {!uploadedDocs.includes(doc.id) && (
                                <Button size="sm" variant="outline" className="border-[#7A4FFF] text-[#7A4FFF]">
                                  Browse
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* References Section */}
                      <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <h3 className="text-lg text-[#3D3D6B] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                          Professional References
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                          Please provide 2-3 references from faith community leaders who can vouch for your credentials and character.
                        </p>
                        <div className="space-y-3">
                          {[1, 2, 3].map((num) => (
                            <div key={num} className="grid grid-cols-2 gap-3">
                              <Input
                                placeholder={`Reference ${num} Name`}
                                className="bg-white border-slate-300"
                              />
                              <Input
                                placeholder="Email or Phone"
                                className="bg-white border-slate-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button
                      onClick={onBack}
                      variant="outline"
                      className="border-slate-300 text-slate-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={uploadedDocs.length < 4}
                      className="bg-gradient-to-r from-[#7A4FFF] to-purple-600 hover:from-purple-600 hover:to-[#7A4FFF] text-white px-8"
                    >
                      Continue to Identity Verification
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Sidebar - Why We Verify */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-[#7A4FFF]/10 to-purple-100/50 border-[#7A4FFF]/30">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-[#7A4FFF]" />
                        <h3 className="text-lg text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                          Why We Verify
                        </h3>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#7A4FFF] mt-0.5 flex-shrink-0" />
                          <span>Ensures authentic spiritual guidance from qualified leaders</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#7A4FFF] mt-0.5 flex-shrink-0" />
                          <span>Builds trust with seekers looking for genuine wisdom</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#7A4FFF] mt-0.5 flex-shrink-0" />
                          <span>Protects our community from unqualified or harmful actors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#7A4FFF] mt-0.5 flex-shrink-0" />
                          <span>Maintains high standards for spiritual leadership</span>
                        </li>
                      </ul>
                    </div>
                  </Card>

                  <Card className="bg-white border border-slate-200">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Lock className="w-5 h-5 text-slate-600" />
                        <h3 className="text-lg text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                          Your Data is Secure
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        All documents are encrypted with 256-bit SSL and stored securely. We never share your information without consent.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-slate-100 text-slate-700 border-slate-300">256-bit SSL</Badge>
                        <Badge className="bg-slate-100 text-slate-700 border-slate-300">SOC 2 Compliant</Badge>
                        <Badge className="bg-slate-100 text-slate-700 border-slate-300">GDPR</Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: KYC Identity Verification */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mx-auto">
                <Card className="bg-white border-2 border-[#7A4FFF]/20 shadow-lg">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-8">
                      <div className="p-3 bg-gradient-to-br from-[#7A4FFF] to-purple-600 rounded-2xl">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl text-[#3D3D6B] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                          Identity Verification (KYC)
                        </h2>
                        <p className="text-slate-600">
                          To enable secure payouts and prevent fraud, we need to verify your identity.
                        </p>
                      </div>
                    </div>

                    {!kycComplete ? (
                      <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                          <h3 className="text-lg text-[#3D3D6B] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                            What You'll Need:
                          </h3>
                          <ul className="space-y-2 text-sm text-slate-700">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                              Government-issued photo ID (Driver's License, Passport, etc.)
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                              A selfie for liveness verification
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                              Bank account information for payouts (routing & account numbers)
                            </li>
                          </ul>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                          <h3 className="text-lg text-[#3D3D6B] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                            Why We Need This:
                          </h3>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• Enable secure ACH bank transfers for your earnings</li>
                            <li>• Comply with IRS 1099 tax reporting requirements</li>
                            <li>• Prevent identity theft and fraudulent accounts</li>
                            <li>• Ensure you're eligible to receive payments</li>
                          </ul>
                        </div>

                        <div className="flex gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-amber-900">
                            <p className="font-semibold mb-1">Powered by Stripe Identity</p>
                            <p>Your verification is processed securely by Stripe, a trusted leader in payment security. Your information is never stored on our servers.</p>
                          </div>
                        </div>

                        <Button
                          onClick={handleKYCVerification}
                          disabled={isProcessing}
                          className="w-full bg-gradient-to-r from-[#7A4FFF] to-purple-600 hover:from-purple-600 hover:to-[#7A4FFF] text-white py-6 text-base"
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Verifying Identity...
                            </>
                          ) : (
                            <>
                              Begin Identity Verification
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl text-[#3D3D6B] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                          Identity Verified!
                        </h3>
                        <p className="text-slate-600 mb-6">
                          Your identity has been successfully verified. You're ready for the next step.
                        </p>
                        <Button
                          onClick={handleNextStep}
                          className="bg-gradient-to-r from-[#7A4FFF] to-purple-600 hover:from-purple-600 hover:to-[#7A4FFF] text-white px-8"
                        >
                          Continue to Payment
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Navigation */}
                {!kycComplete && (
                  <div className="flex justify-between mt-6">
                    <Button
                      onClick={handlePreviousStep}
                      variant="outline"
                      className="border-slate-300 text-slate-600"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment ($99 Application Fee) */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Payment Card */}
                  <Card className="bg-white border-2 border-[#7A4FFF]/20 shadow-lg">
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-[#FFD369] to-amber-500 rounded-2xl">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl text-[#3D3D6B] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                            Application Fee
                          </h2>
                          <p className="text-slate-600">
                            One-time investment to join our verified leader community.
                          </p>
                        </div>
                      </div>

                      {!paymentComplete ? (
                        <div className="space-y-6">
                          <div className="p-6 bg-gradient-to-br from-[#7A4FFF]/5 to-purple-50 rounded-2xl border border-[#7A4FFF]/20">
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-4xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                                $99
                              </span>
                              <span className="text-slate-500">one-time</span>
                            </div>
                            <p className="text-sm text-slate-600">
                              Non-refundable application processing fee
                            </p>
                          </div>

                          <div>
                            <Label className="text-[#3D3D6B] mb-2">Cardholder Name</Label>
                            <Input
                              placeholder="John Doe"
                              className="border-slate-300"
                            />
                          </div>

                          <div>
                            <Label className="text-[#3D3D6B] mb-2">Card Number</Label>
                            <Input
                              placeholder="4242 4242 4242 4242"
                              className="border-slate-300"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-[#3D3D6B] mb-2">Expiry Date</Label>
                              <Input
                                placeholder="MM/YY"
                                className="border-slate-300"
                              />
                            </div>
                            <div>
                              <Label className="text-[#3D3D6B] mb-2">CVC</Label>
                              <Input
                                placeholder="123"
                                className="border-slate-300"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <p>
                              Secured by Stripe. Your payment information is encrypted and never stored on our servers.
                            </p>
                          </div>

                          <Button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-gradient-to-r from-[#FFD369] to-amber-500 hover:from-amber-500 hover:to-[#FFD369] text-white py-6 text-base shadow-lg"
                          >
                            {isProcessing ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Processing Payment...
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Pay $99 & Submit Application
                              </>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          </div>
                          <h3 className="text-xl text-[#3D3D6B] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                            Payment Successful!
                          </h3>
                          <p className="text-slate-600 mb-6">
                            Your application fee has been processed. Almost there!
                          </p>
                          <Button
                            onClick={handleNextStep}
                            className="bg-gradient-to-r from-[#7A4FFF] to-purple-600 hover:from-purple-600 hover:to-[#7A4FFF] text-white px-8"
                          >
                            View Application Status
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Benefits Card */}
                  <Card className="bg-gradient-to-br from-[#7A4FFF]/10 via-purple-50 to-[#FFD369]/10 border-2 border-[#7A4FFF]/30">
                    <div className="p-8">
                      <h3 className="text-2xl text-[#3D3D6B] mb-6" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                        What You Get:
                      </h3>
                      
                      <div className="space-y-4">
                        {[
                          {
                            icon: Heart,
                            title: 'Green Heart Badge',
                            description: 'Verified status displayed across the platform',
                            color: 'text-green-600'
                          },
                          {
                            icon: Sparkles,
                            title: 'AI Clergy Twin',
                            description: 'Digital assistant to help manage your ministry',
                            color: 'text-purple-600'
                          },
                          {
                            icon: Building,
                            title: 'NeoBanking Suite',
                            description: 'Manage donations, tithes, and earnings',
                            color: 'text-amber-600'
                          },
                          {
                            icon: DollarSign,
                            title: '4 Revenue Streams',
                            description: 'Affiliate, Engagement, Donations, Virtual Spaces',
                            color: 'text-green-600'
                          },
                          {
                            icon: Users,
                            title: 'Command Center Dashboard',
                            description: 'Professional analytics and revenue tracking',
                            color: 'text-blue-600'
                          },
                          {
                            icon: Award,
                            title: 'Marketing Support',
                            description: 'Profile optimization and SEO assistance',
                            color: 'text-indigo-600'
                          },
                        ].map((benefit, index) => (
                          <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-4 bg-white/60 rounded-xl border border-white/80"
                          >
                            <div className={`p-2 bg-white rounded-lg shadow-sm ${benefit.color}`}>
                              <benefit.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-[#3D3D6B] mb-1" style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
                                {benefit.title}
                              </h4>
                              <p className="text-sm text-slate-600">{benefit.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <p className="text-sm text-green-900 text-center" style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
                          💰 Average Leader Earnings: $800-$3,600/month
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Navigation */}
                {!paymentComplete && (
                  <div className="flex justify-between mt-6">
                    <Button
                      onClick={handlePreviousStep}
                      variant="outline"
                      className="border-slate-300 text-slate-600"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Pending Review Status */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-3xl mx-auto">
                <Card className="bg-white border-2 border-[#7A4FFF]/20 shadow-lg">
                  <div className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="w-24 h-24 bg-gradient-to-br from-[#FFD369] to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Clock className="w-12 h-12 text-white" />
                    </motion.div>

                    <h2 className="text-3xl text-[#3D3D6B] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                      Application Under Review
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Thank you for applying! Our verification team will carefully review your credentials.
                    </p>

                    {/* Timeline */}
                    <div className="max-w-2xl mx-auto mb-8">
                      <div className="relative">
                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200" />
                        <div className="relative flex justify-between">
                          {[
                            { label: 'Application Submitted', status: 'complete' },
                            { label: 'Document Review', status: 'current' },
                            { label: 'Video Interview', status: 'pending' },
                            { label: 'Final Decision', status: 'pending' },
                          ].map((step, index) => (
                            <div key={step.label} className="flex flex-col items-center">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                  step.status === 'complete'
                                    ? 'bg-green-500 text-white'
                                    : step.status === 'current'
                                    ? 'bg-[#7A4FFF] text-white'
                                    : 'bg-slate-200 text-slate-400'
                                }`}
                              >
                                {step.status === 'complete' ? (
                                  <CheckCircle className="w-6 h-6" />
                                ) : (
                                  <span className="text-sm font-bold">{index + 1}</span>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 max-w-[100px] text-center">
                                {step.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                      <h3 className="text-lg text-[#3D3D6B] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        What Happens Next:
                      </h3>
                      <ul className="text-left space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Days 1-3:</strong> We verify your credentials with issuing institutions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Days 4-7:</strong> We contact your references and conduct background checks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Days 8-12:</strong> We schedule a 30-minute video interview with you</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Days 13-14:</strong> Final decision and notification sent via email</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
                      <h3 className="text-lg text-[#3D3D6B] mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                        Estimated Review Time
                      </h3>
                      <p className="text-2xl text-[#7A4FFF]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                        7-14 Business Days
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 mb-6">
                      You'll receive email updates at each stage of the review process. Check your inbox (and spam folder) for messages from team@divinityagi.com
                    </p>

                    <Button
                      onClick={onComplete}
                      className="bg-gradient-to-r from-[#7A4FFF] to-purple-600 hover:from-purple-600 hover:to-[#7A4FFF] text-white px-8 py-6 text-base"
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
