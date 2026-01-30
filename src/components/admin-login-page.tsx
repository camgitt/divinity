import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Shield, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminLoginPageProps {
  onLogin: (password: string) => boolean;
  onBack?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin, onBack }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast.error('Please enter admin password');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay for security
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = onLogin(password);
    
    if (success) {
      toast.success('Welcome to DivinityAGI Admin Dashboard');
    } else {
      toast.error('Invalid admin password');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1426] via-[#162844] to-[#0B1426] flex items-center justify-center p-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Back Button - Only show if onBack is provided */}
      {onBack && (
        <motion.div 
          className="absolute top-6 left-6 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-white hover:text-white p-0 h-auto bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/70 shadow-[0_2px_10px_rgba(122,79,255,0.2)] hover:shadow-[0_4px_15px_rgba(122,79,255,0.4)]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#7A4FFF] to-purple-700 rounded-full mb-4 shadow-lg shadow-purple-500/30"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-white text-3xl mb-2">DivinityAGI</h1>
          <p className="text-purple-300">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="bg-[#162844] border-[#1E3A5F] p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="password" className="text-white mb-2 block">
                Administrator Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-[#0B1426] border-[#1E3A5F] text-white pl-10 pr-10"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7A4FFF] to-[#1E3A5F] hover:from-[#6A3FEF] hover:to-[#7A4FFF] text-white border-0 shadow-[0_4px_15px_rgba(122,79,255,0.4)] hover:shadow-[0_6px_25px_rgba(122,79,255,0.6)] transition-all duration-300 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-purple-200 text-center">
              🔒 Secure Admin Access
            </p>
            <p className="text-xs text-slate-400 text-center mt-1">
              This dashboard monitors DivinityAGI app usage and analytics
            </p>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-slate-400">
          <p>DivinityAGI Admin Monitoring System v1.0</p>
          <p className="text-xs mt-1 text-slate-500">
            Unauthorized access is prohibited
          </p>
        </div>
      </motion.div>
    </div>
  );
};