import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import { Shield, Heart, Users } from "lucide-react";

interface AgeGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function AgeGateModal({ isOpen, onClose, onComplete }: AgeGateModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    agreeTerms: false,
    agreePrivacy: false,
    parentalConsent: false,
    emergencyContact: ""
  });

  const isMinor = parseInt(formData.age) < 18;
  const isValidAge = parseInt(formData.age) >= 13;

  const handleNext = () => {
    if (currentStep === 1 && isValidAge) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const canProceedStep1 = formData.age && isValidAge;
  const canProceedStep2 = formData.agreeTerms && formData.agreePrivacy && (!isMinor || formData.parentalConsent);
  const canProceedStep3 = !isMinor || formData.emergencyContact.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 border-0 bg-transparent">
        <DialogTitle className="sr-only">
          {currentStep === 1 ? "Age Verification" : currentStep === 2 ? "Terms & Privacy" : "Emergency Contact"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {currentStep === 1 ? "Please verify your age to continue" : 
           currentStep === 2 ? "Please review and accept our terms and privacy policy" : 
           "Please provide emergency contact information"}
        </DialogDescription>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-white shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl mb-2 text-slate-800">Age Verification</h2>
                  <p className="text-slate-600">We need to verify your age to provide appropriate guidance.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="age">Your Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="mt-2"
                    />
                    {formData.age && !isValidAge && (
                      <p className="text-red-500 text-sm mt-2">
                        You must be at least 13 years old to use DivinityAGI.
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedStep1}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-white shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl mb-2 text-slate-800">Terms & Privacy</h2>
                  <p className="text-slate-600">Please review and accept our policies to continue.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, agreeTerms: checked as boolean })
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the Terms of Service and understand that DivinityAGI provides spiritual guidance and is not a replacement for professional counseling.
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, agreePrivacy: checked as boolean })
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="privacy" className="text-sm leading-relaxed">
                      I agree to the Privacy Policy and understand how my data will be protected and used.
                    </Label>
                  </div>

                  {isMinor && (
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="parental"
                        checked={formData.parentalConsent}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, parentalConsent: checked as boolean })
                        }
                        className="mt-1"
                      />
                      <Label htmlFor="parental" className="text-sm leading-relaxed">
                        I have parental or guardian permission to use this app.
                      </Label>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedStep2}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      {isMinor ? 'Continue' : 'Complete'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && isMinor && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-white shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl mb-2 text-slate-800">Emergency Contact</h2>
                  <p className="text-slate-600">Please provide an emergency contact for safety purposes.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="emergency">Emergency Contact (Parent/Guardian)</Label>
                    <Input
                      id="emergency"
                      type="text"
                      placeholder="Enter contact information"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      className="mt-2"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      This information is encrypted and only used in emergency situations.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleComplete}
                      disabled={!canProceedStep3}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Complete
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {[1, 2, ...(isMinor ? [3] : [])].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                step === currentStep
                  ? 'bg-blue-600'
                  : step < currentStep
                  ? 'bg-green-600'
                  : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}