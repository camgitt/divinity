import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";
import { Shield, Mail, Lock, Eye, EyeOff, CheckCircle, X } from "lucide-react";

interface LeaderSignInModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSignInSuccess: () => void;
}

// Mock verified leaders database (in production, this would be a backend API)
const VERIFIED_LEADERS = [
  {
    email: "leader@divinityagi.com",
    password: "Leader123!",
    name: "Master Teacher",
    status: "verified",
    id: "leader-001"
  },
  {
    email: "spiritual@divinityagi.com",
    password: "Spiritual123!",
    name: "Spiritual Guide",
    status: "verified",
    id: "leader-002"
  }
];

export function LeaderSignInModal({ onClose, onSignInSuccess }: LeaderSignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify credentials
    const leader = VERIFIED_LEADERS.find(
      l => l.email.toLowerCase() === email.toLowerCase() && l.password === password
    );

    if (leader && leader.status === "verified") {
      // Store leader session in localStorage
      const leaderSession = {
        id: leader.id,
        email: leader.email,
        name: leader.name,
        status: leader.status,
        signedInAt: new Date().toISOString()
      };
      
      localStorage.setItem('divinityagi_leader_session', JSON.stringify(leaderSession));
      
      toast.success(`Welcome back, ${leader.name}!`, {
        description: "Accessing your Leader Dashboard..."
      });

      setTimeout(() => {
        onSignInSuccess();
        onClose();
      }, 500);
    } else {
      setError("Invalid credentials or account not verified. Please check your email and password.");
      toast.error("Sign in failed", {
        description: "Invalid credentials or your leader account is not yet verified."
      });
    }

    setIsLoading(false);
  };

  const handleDemoSignIn = () => {
    setEmail("leader@divinityagi.com");
    setPassword("Leader123!");
    toast.info("Demo credentials loaded", {
      description: "Click 'Access Dashboard' to sign in"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className="bg-[#0D0D2B] border-[#497EBC]/30 overflow-hidden relative">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/10 via-transparent to-[#C9A882]/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#497EBC]/20 rounded-full blur-[100px] animate-pulse" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#497EBC] to-[#C9A882] mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                Verified Leader Sign In
              </h2>
              <p className="text-sm text-slate-400">
                Access your Leader Dashboard
              </p>
            </div>

            {/* Sign in form */}
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="pl-10 bg-[#1A1A3E]/40 border-[#497EBC]/30 text-white placeholder:text-slate-500 focus:border-[#497EBC]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pl-10 pr-10 bg-[#1A1A3E]/40 border-[#497EBC]/30 text-white placeholder:text-slate-500 focus:border-[#497EBC]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6A9F] hover:to-[#B89770] text-white border-0 h-12"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Access Dashboard
                  </span>
                )}
              </Button>
            </form>

            {/* Demo credentials hint */}
            <div className="mt-6 pt-6 border-t border-[#497EBC]/20">
              <p className="text-xs text-slate-400 text-center mb-3">
                Demo Mode - Try these credentials:
              </p>
              <Button
                type="button"
                onClick={handleDemoSignIn}
                variant="outline"
                className="w-full border-[#497EBC]/30 text-[#497EBC] hover:bg-[#497EBC]/10 text-sm"
              >
                Load Demo Credentials
              </Button>
              <div className="mt-3 text-xs text-slate-500 text-center space-y-1">
                <p>Email: leader@divinityagi.com</p>
                <p>Password: Leader123!</p>
              </div>
            </div>

            {/* Help text */}
            <p className="mt-6 text-xs text-slate-500 text-center">
              Don't have a verified account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  toast.info("Application Process", {
                    description: "Please apply through the Affiliate Program to become a Verified Leader."
                  });
                }}
                className="text-[#497EBC] hover:text-[#C9A882] transition-colors"
              >
                Apply Now
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}