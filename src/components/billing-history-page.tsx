import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AppFooter } from "./app-footer";
import { useSubscription } from "./subscription-context";
import { 
  ArrowLeft, 
  Download, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Receipt,
  Clock,
  DollarSign,
  FileText,
  Shield,
  Crown,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface BillingHistoryPageProps {
  onBack: () => void;
  onOpenMission?: () => void;
  onNavigate?: (tab: string) => void;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  plan: string;
  period: string;
  invoiceId: string;
  paymentMethod: string;
}

export function BillingHistoryPage({ onBack, onOpenMission, onNavigate }: BillingHistoryPageProps) {
  const { currentSubscription, currentPlan, tier } = useSubscription();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Get user data for billing information
  const getUserData = () => {
    try {
      const storedUser = localStorage.getItem('divinityagi_user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    } catch (e) {
      console.error('Failed to parse user data:', e);
    }
    return null;
  };

  const userData = getUserData();
  const userEmail = userData?.email || "user@example.com";

  // Mock transaction history (in a real app, this would come from your backend)
  const mockTransactions: Transaction[] = tier === 'seeker' ? [] : [
    {
      id: "inv_001",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      amount: currentPlan?.price || 0,
      status: "completed",
      plan: currentPlan?.name || "Subscriber",
      period: currentPlan?.period || "month",
      invoiceId: "INV-2025-001",
      paymentMethod: "•••• 4242"
    },
    {
      id: "inv_002",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      amount: currentPlan?.price || 0,
      status: "completed",
      plan: currentPlan?.name || "Subscriber",
      period: currentPlan?.period || "month",
      invoiceId: "INV-2024-012",
      paymentMethod: "•••• 4242"
    },
    {
      id: "inv_003",
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      amount: currentPlan?.price || 0,
      status: "completed",
      plan: currentPlan?.name || "Subscriber",
      period: currentPlan?.period || "month",
      invoiceId: "INV-2024-011",
      paymentMethod: "•••• 4242"
    }
  ];

  // Calculate next billing date
  const getNextBillingDate = () => {
    if (tier === 'seeker') return null;
    
    const today = new Date();
    if (currentPlan?.period === 'month') {
      const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
      return nextMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } else if (currentPlan?.period === 'year') {
      const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));
      return nextYear.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return null;
  };

  const nextBillingDate = getNextBillingDate();

  const handleDownloadInvoice = (transaction: Transaction) => {
    toast.success(`Downloading invoice ${transaction.invoiceId}...`);
    // In a real app, this would trigger a PDF download
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-400" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Paid</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] text-white pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-[#162844] to-[#0B1426] border-b border-[#1E3A5F]/30 px-6 pt-8 pb-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjQsNzksMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 text-slate-300 hover:text-white hover:bg-[#1E3A5F]/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#7A4FFF] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl mb-2 bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
                Billing History
              </h1>
              <p className="text-slate-400">Manage your subscriptions and view past transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        
        {tier === 'seeker' ? (
          // Free user - no billing history
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7A4FFF]/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-[#7A4FFF]" />
              </div>
              <h2 className="text-2xl mb-3 text-white">No Billing History Yet</h2>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                You're currently on the free Explorer plan. Upgrade to a premium plan to unlock unlimited spiritual guidance and exclusive features.
              </p>
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-[#7A4FFF] to-[#1E3A5F] hover:from-[#6A3FEF] hover:to-[#7A4FFF] text-white border-0 shadow-[0_4px_15px_rgba(122,79,255,0.4)] hover:shadow-[0_6px_25px_rgba(122,79,255,0.6)] transition-all duration-300 hover:scale-105"
              >
                <Crown className="w-4 h-4 mr-2" />
                View Premium Plans
              </Button>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Current Subscription Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6 text-[#FFD369]" />
                Current Subscription
              </h2>
              <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 hover:border-[#7A4FFF]/50 transition-all duration-500 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl text-white mb-2">{currentPlan?.name}</h3>
                      <p className="text-slate-400 mb-4">{currentPlan?.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl bg-gradient-to-r from-[#FFD369] to-amber-300 bg-clip-text text-transparent">
                          ${currentPlan?.price}
                        </span>
                        <span className="text-slate-400">/{currentPlan?.period}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#1E3A5F]/40">
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 bg-[#7A4FFF]/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#7A4FFF]" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Next Billing Date</p>
                        <p className="text-white">{nextBillingDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Payment Method</p>
                        <p className="text-white">Card ending in 4242</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#1E3A5F]/40 flex gap-3">
                    <Button
                      variant="outline"
                      className="border-[#1E3A5F] text-slate-300 hover:bg-[#1E3A5F]/30"
                      onClick={() => toast.info("Payment method management coming soon")}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Update Payment
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      onClick={() => toast.info("Subscription management coming soon")}
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-[#7A4FFF]" />
                Transaction History
              </h2>
              
              <div className="space-y-3">
                {mockTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  >
                    <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 hover:border-[#7A4FFF]/50 transition-all duration-300 cursor-pointer group">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-12 h-12 bg-[#7A4FFF]/20 rounded-xl flex items-center justify-center group-hover:bg-[#7A4FFF]/30 transition-colors">
                              {getStatusIcon(transaction.status)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg text-white group-hover:text-[#FFD369] transition-colors">
                                {transaction.plan} Plan
                              </h3>
                              <p className="text-sm text-slate-400">{transaction.date}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-sm text-slate-500">Invoice:</span>
                                <span className="text-sm text-[#7A4FFF]">{transaction.invoiceId}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl text-white mb-2">
                              ${transaction.amount}
                            </div>
                            {getStatusBadge(transaction.status)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[#1E3A5F]/40">
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <CreditCard className="w-4 h-4" />
                            <span>{transaction.paymentMethod}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadInvoice(transaction)}
                            className="text-[#7A4FFF] hover:text-[#FFD369] hover:bg-[#7A4FFF]/10"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Invoice
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Billing Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#7A4FFF]/10 to-purple-600/10 border-[#7A4FFF]/20">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7A4FFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-[#7A4FFF]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-white mb-2">Need Help with Billing?</h3>
                      <p className="text-slate-400 mb-4">
                        Our support team is here to assist you with any billing questions or concerns. We're committed to providing transparent and secure payment processing.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          className="border-[#7A4FFF]/30 text-[#7A4FFF] hover:bg-[#7A4FFF]/10"
                          onClick={() => toast.info("Support chat coming soon")}
                        >
                          Contact Support
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-slate-300 hover:text-white hover:bg-[#1E3A5F]/30"
                          onClick={() => toast.info("FAQ page coming soon")}
                        >
                          View FAQ
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Billing Email Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center text-sm text-slate-500"
            >
              <p>Invoices and receipts are automatically sent to <span className="text-[#7A4FFF]">{userEmail}</span></p>
            </motion.div>
          </>
        )}
      </div>

      {/* Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
    </div>
  );
}
