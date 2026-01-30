import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useSubscription } from "./subscription-context";
import { 
  Crown,
  Calendar,
  CreditCard,
  Receipt,
  Download,
  Check,
  AlertCircle
} from "lucide-react";

export function BillingPage() {
  const { currentSubscription } = useSubscription();

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      plan: "Devotee Plan",
      date: "January 21, 2026",
      amount: "$9.99",
      status: "paid",
      invoice: "INV-2025-001",
      paymentMethod: "•••• 4242"
    },
    {
      id: 2,
      plan: "Devotee Plan",
      date: "December 22, 2025",
      amount: "$9.99",
      status: "paid",
      invoice: "INV-2024-012",
      paymentMethod: "•••• 4242"
    },
    {
      id: 3,
      plan: "Devotee Plan",
      date: "November 22, 2025",
      amount: "$9.99",
      status: "paid",
      invoice: "INV-2024-011",
      paymentMethod: "•••• 4242"
    }
  ];

  const getPlanName = () => {
    const plans = {
      seeker: "Guest",
      subscriber: "Free with an Account",
      devotee: "Devotee",
      enlightened: "Enlightened"
    };
    return plans[currentSubscription.tier] || "Guest";
  };

  const getPlanPrice = () => {
    const prices = {
      seeker: "Free",
      subscriber: "Free",
      devotee: "$9.99/month",
      enlightened: "$14.99/month"
    };
    return prices[currentSubscription.tier] || "Free";
  };

  return (
    <div className="min-h-screen bg-[#0b1426] pb-24" style={{ fontFamily: "'Helvetica', sans-serif" }}>
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#162844] to-[#0b1426] border-b border-[rgba(30,58,95,0.3)] px-6 pt-8 pb-6">
        <div className="flex items-center mb-6">
          <Crown className="w-6 h-6 text-[#FFD369] mr-3" />
          <h1 className="text-2xl text-white font-normal">Current Subscription</h1>
        </div>

        {/* Current Plan Card */}
        <Card className="bg-[rgba(22,40,68,0.4)] border-[rgba(30,58,95,0.4)] p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl text-white mb-2">{getPlanName()}</h2>
              <p className="text-[#90a1b9] text-sm mb-3">
                {currentSubscription.tier === 'seeker' || currentSubscription.tier === 'subscriber' 
                  ? 'Access to basic spiritual guidance' 
                  : 'Full access to spiritual guidance and content'}
              </p>
              <div className="flex items-baseline">
                <span className="text-3xl bg-gradient-to-r from-[#FFD369] to-[#FFD230] bg-clip-text text-transparent font-normal">
                  {getPlanPrice().split('/')[0]}
                </span>
                {getPlanPrice().includes('/') && (
                  <span className="text-[#90a1b9] text-base ml-2">
                    /{getPlanPrice().split('/')[1]}
                  </span>
                )}
              </div>
            </div>
            {(currentSubscription.tier === 'devotee' || currentSubscription.tier === 'enlightened') && (
              <Badge className="bg-[rgba(0,201,80,0.2)] border-[rgba(0,201,80,0.3)] text-[#7bf1a8] px-3 py-1">
                <Check className="w-3 h-3 mr-1 inline" />
                Active
              </Badge>
            )}
          </div>

          {(currentSubscription.tier === 'devotee' || currentSubscription.tier === 'enlightened') && (
            <>
              <div className="border-t border-[rgba(30,58,95,0.4)] pt-6 mb-6 space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[rgba(122,79,255,0.2)] rounded-2xl flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-[#7A4FFF]" />
                  </div>
                  <div>
                    <p className="text-[#90a1b9] text-sm">Next Billing Date</p>
                    <p className="text-white">February 21, 2026</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[rgba(0,188,125,0.2)] rounded-2xl flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-[#00D492]" />
                  </div>
                  <div>
                    <p className="text-[#90a1b9] text-sm">Payment Method</p>
                    <p className="text-white">Card ending in 4242</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[rgba(30,58,95,0.4)] pt-6 flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-[rgba(41,41,41,0.3)] border-[#292929] text-[#cad5e2] hover:bg-[rgba(41,41,41,0.5)]"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-[rgba(41,41,41,0.3)] border-[#292929] text-[#ff6467] hover:bg-[rgba(41,41,41,0.5)]"
                >
                  Cancel Subscription
                </Button>
              </div>
            </>
          )}

          {(currentSubscription.tier === 'seeker' || currentSubscription.tier === 'subscriber') && (
            <div className="border-t border-[rgba(30,58,95,0.4)] pt-6">
              <Button 
                className="w-full bg-gradient-to-r from-[#7A4FFF] to-[#5a3acc] hover:from-[#5a3acc] hover:to-[#7A4FFF] text-white"
                onClick={() => {/* Open subscription portal */}}
              >
                Upgrade to Premium
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Transaction History */}
      {(currentSubscription.tier === 'devotee' || currentSubscription.tier === 'enlightened') && (
        <div className="px-6 py-6">
          <div className="flex items-center mb-4">
            <Receipt className="w-6 h-6 text-[#7A4FFF] mr-3" />
            <h2 className="text-2xl text-white font-normal">Transaction History</h2>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <Card 
                key={transaction.id} 
                className="bg-[rgba(22,40,68,0.4)] border-[rgba(30,58,95,0.4)] p-6"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-[rgba(122,79,255,0.2)] rounded-2xl flex items-center justify-center mr-3 flex-shrink-0">
                    <Receipt className="w-5 h-5 text-[#05DF72]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-lg mb-1">{transaction.plan}</h3>
                    <p className="text-[#90a1b9] text-sm mb-1">{transaction.date}</p>
                    <div className="flex items-center text-sm">
                      <span className="text-[#62748e]">Invoice:</span>
                      <span className="text-[#7a4fff] ml-2">{transaction.invoice}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="text-white text-2xl mb-2">{transaction.amount}</p>
                    <Badge className="bg-[rgba(0,201,80,0.2)] border-[rgba(0,201,80,0.3)] text-[#7bf1a8] text-xs px-2 py-0.5">
                      Paid
                    </Badge>
                  </div>
                </div>

                <div className="border-t border-[rgba(30,58,95,0.4)] pt-4 flex items-center justify-between">
                  <div className="flex items-center text-[#90a1b9] text-sm">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {transaction.paymentMethod}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-[#7a4fff] hover:text-[#5a3acc] hover:bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
