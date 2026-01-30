import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle2, XCircle, Loader2, Database, Play, RefreshCw } from 'lucide-react';

// Get Supabase configuration from environment variables with fallback
const getEnvVar = (key: string, fallback: string = ''): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback;
  }
  return fallback;
};

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL', 'https://wukzavslddamlxoksxuo.supabase.co');
const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1a3phdnNsZGRhbWx4b2tzeHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Njk2NjYsImV4cCI6MjA3ODU0NTY2Nn0.oa3v9vuTLK4T4IXWzWJAExV3dnjfoXwkPwnXw6Ff6tw');

interface TableStatus {
  customers: boolean;
  subscriptions: boolean;
  payments: boolean;
  subscription_history: boolean;
  token_purchases: boolean;
}

interface SetupResult {
  success: boolean;
  message?: string;
  error?: string;
}

interface VerifyResult {
  success: boolean;
  tables?: TableStatus;
}

export function DatabaseSetupPage() {
  const [setupStatus, setSetupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [setupMessage, setSetupMessage] = useState<string>('');
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [tableStatus, setTableStatus] = useState<TableStatus | null>(null);

  const handleSetupDatabase = async () => {
    setSetupStatus('loading');
    setSetupMessage('');
    
    try {
      // Edge function removed - database setup should be done manually via Supabase dashboard
      setSetupStatus('error');
      setSetupMessage('Edge function not available. Please use Supabase Dashboard SQL Editor to run setup manually.');
    } catch (error) {
      console.error('Database setup error:', error);
      setSetupStatus('error');
      setSetupMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const handleVerifyTables = async () => {
    setVerifyStatus('loading');
    setTableStatus(null);
    
    try {
      // Edge function removed - table verification should be done manually via Supabase dashboard
      setVerifyStatus('error');
      setTableStatus(null);
    } catch (error) {
      console.error('Table verification error:', error);
      setVerifyStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0B2B] via-[#1a1347] to-[#0D0B2B] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Database className="w-16 h-16 mx-auto mb-4 text-[#7A4FFF]" />
          <h1 className="text-white mb-2">Database Setup</h1>
          <p className="text-gray-400">
            Initialize the DivinityAGI subscription management database
          </p>
        </div>

        {/* Setup Card */}
        <Card className="bg-[#1a1347]/50 border-[#7A4FFF]/20 p-6 mb-6">
          <h2 className="text-white mb-4">Step 1: Create Database Tables</h2>
          <p className="text-gray-400 mb-6">
            This will create 5 tables for managing subscriptions, payments, customers, 
            subscription history, and token purchases. This operation is safe to run multiple times.
          </p>

          <Button
            onClick={handleSetupDatabase}
            disabled={setupStatus === 'loading'}
            className="w-full bg-[#7A4FFF] hover:bg-[#6a3fee] text-white mb-4"
          >
            {setupStatus === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Setting up database...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Database Setup
              </>
            )}
          </Button>

          {setupStatus !== 'idle' && (
            <div className={`flex items-start gap-3 p-4 rounded-lg ${
              setupStatus === 'success' 
                ? 'bg-green-500/10 border border-green-500/20' 
                : setupStatus === 'error'
                ? 'bg-red-500/10 border border-red-500/20'
                : 'bg-blue-500/10 border border-blue-500/20'
            }`}>
              {setupStatus === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
              {setupStatus === 'error' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
              {setupStatus === 'loading' && <Loader2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5 animate-spin" />}
              <div className="flex-1">
                <p className={
                  setupStatus === 'success' 
                    ? 'text-green-400' 
                    : setupStatus === 'error'
                    ? 'text-red-400'
                    : 'text-blue-400'
                }>
                  {setupMessage}
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Verify Card */}
        <Card className="bg-[#1a1347]/50 border-[#7A4FFF]/20 p-6">
          <h2 className="text-white mb-4">Step 2: Verify Tables</h2>
          <p className="text-gray-400 mb-6">
            Check that all database tables were created successfully.
          </p>

          <Button
            onClick={handleVerifyTables}
            disabled={verifyStatus === 'loading'}
            variant="outline"
            className="w-full border-[#7A4FFF] text-[#7A4FFF] hover:bg-[#7A4FFF]/10 mb-4"
          >
            {verifyStatus === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying tables...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Verify Tables
              </>
            )}
          </Button>

          {tableStatus && (
            <div className="space-y-2">
              <p className="text-gray-400 mb-3">Table Status:</p>
              {Object.entries(tableStatus).map(([tableName, exists]) => (
                <div
                  key={tableName}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0D0B2B]/50"
                >
                  <span className="text-gray-300">{tableName}</span>
                  {exists ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Created</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400">
                      <XCircle className="w-4 h-4" />
                      <span>Missing</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Info Card */}
        <Card className="bg-[#1a1347]/30 border-[#FFD369]/20 p-6 mt-6">
          <h3 className="text-[#FFD369] mb-3">📋 Tables Created:</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• <span className="text-white">customers</span> - Stripe customer information</li>
            <li>• <span className="text-white">subscriptions</span> - Subscription states and tiers</li>
            <li>• <span className="text-white">payments</span> - Payment transaction logs</li>
            <li>• <span className="text-white">subscription_history</span> - Audit trail for tier changes</li>
            <li>• <span className="text-white">token_purchases</span> - Token purchase tracking</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}