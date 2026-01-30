import React, { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import {
  ArrowLeft,
  Heart,
  TrendingUp,
  Users,
  DollarSign,
  Copy,
  Share2,
  MessageCircle,
  Clock,
  Star,
  Wallet,
  Building,
  Settings,
  Bell,
  BarChart3,
  Crown,
  CheckCircle,
  AlertCircle,
  Download,
  Send,
  Calendar,
  Eye,
  Sparkles,
  ChevronRight,
  TrendingDown,
  ArrowUpRight
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface VerifiedLeaderCommandCenterProps {
  onBack: () => void;
  onNavigate?: (route: string) => void;
}

// Mock data for charts
const affiliateData = [
  { month: "Jan", referrals: 12, commission: 120 },
  { month: "Feb", referrals: 18, commission: 195 },
  { month: "Mar", referrals: 25, commission: 280 },
  { month: "Apr", referrals: 32, commission: 365 },
  { month: "May", referrals: 40, commission: 450 },
  { month: "Jun", referrals: 52, commission: 580 },
];

const engagementData = [
  { day: "Mon", conversations: 8, earnings: 45 },
  { day: "Tue", conversations: 12, earnings: 68 },
  { day: "Wed", conversations: 6, earnings: 32 },
  { day: "Thu", conversations: 15, earnings: 85 },
  { day: "Fri", conversations: 10, earnings: 55 },
  { day: "Sat", conversations: 18, earnings: 102 },
  { day: "Sun", conversations: 9, earnings: 50 },
];

const revenueBreakdown = [
  { name: "Affiliates", value: 580, color: "#7A4FFF" },
  { name: "Engagement", value: 437, color: "#FFD369" },
  { name: "Donations", value: 850, color: "#4ECDC4" },
  { name: "Virtual Space", value: 201, color: "#FF6B9D" },
];

export function VerifiedLeaderCommandCenter({ onBack, onNavigate }: VerifiedLeaderCommandCenterProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [referralCopied, setReferralCopied] = useState(false);

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText("https://divinityagi.com/join?ref=LEADER123");
    setReferralCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setReferralCopied(false), 3000);
  };

  const totalMonthlyEarnings = revenueBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-amber-50/20 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
              
              <div className="flex items-center gap-3">
                {/* Green Heart Badge - Prominent */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
                  <Heart className="w-5 h-5 text-white fill-white" />
                  <span className="text-sm text-white" style={{ fontFamily: 'Raleway', fontWeight: 700 }}>
                    VERIFIED
                  </span>
                </div>
                
                <div>
                  <h1 className="text-xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    Command Center
                  </h1>
                  <p className="text-xs text-slate-500">Spiritual Innovator Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-[#7A4FFF] hover:bg-[#7A4FFF]/5 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-[#7A4FFF] hover:bg-[#7A4FFF]/5"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Revenue Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          {/* Total Earnings Card (Spans 2 columns) */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-[#7A4FFF] to-purple-600 border-0 text-white shadow-xl">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-purple-200 mb-1">Total Monthly Earnings</p>
                  <p className="text-4xl mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    ${totalMonthlyEarnings.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-300" />
                    <span className="text-green-300">+12% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
              
              <div className="space-y-2 mt-6">
                {revenueBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="text-purple-100">{item.name}</span>
                    <span className="font-semibold">${item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Individual Stream Cards */}
          {[
            { label: "Affiliates", value: "$580", icon: Users, color: "from-blue-500 to-cyan-500", change: "+8%" },
            { label: "Engagement", value: "$437", icon: MessageCircle, color: "from-purple-500 to-pink-500", change: "+15%" },
            { label: "Donations", value: "$850", icon: Heart, color: "from-green-500 to-emerald-500", change: "+22%" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="p-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-2xl text-[#3D3D6B] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    {stat.value}
                  </p>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Widget A: Affiliates Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white border-2 border-[#7A4FFF]/20 shadow-lg">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7A4FFF] to-purple-600 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                          Affiliate Dashboard
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600">
                        Share your referral link and earn 25% recurring commission
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <p className="text-xs text-slate-600 mb-1">Total Referrals</p>
                      <p className="text-2xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>52</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +12 this month
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <p className="text-xs text-slate-600 mb-1">This Month</p>
                      <p className="text-2xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>$580</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +8%
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-xs text-slate-600 mb-1">All-Time</p>
                      <p className="text-2xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>$3,245</p>
                      <p className="text-xs text-slate-500 mt-1">Since Jan 2025</p>
                    </div>
                  </div>

                  {/* Referral Link */}
                  <div className="p-4 bg-gradient-to-r from-[#7A4FFF]/10 to-purple-100/50 rounded-xl border border-[#7A4FFF]/20 mb-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-600 mb-1">Your Referral Link</p>
                        <p className="text-sm text-[#7A4FFF] truncate" style={{ fontFamily: 'mono' }}>
                          https://divinityagi.com/join?ref=LEADER123
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleCopyReferralLink}
                          size="sm"
                          className={`${
                            referralCopied
                              ? 'bg-green-500 hover:bg-green-600'
                              : 'bg-[#7A4FFF] hover:bg-purple-600'
                          } text-white transition-all`}
                        >
                          {referralCopied ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#7A4FFF] text-[#7A4FFF] hover:bg-[#7A4FFF]/5"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tier Breakdown */}
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 font-semibold">Breakdown by Tier:</p>
                    {[
                      { tier: "Basic", users: 12, monthly: "$30", color: "bg-slate-100" },
                      { tier: "Gold", users: 28, monthly: "$140", color: "bg-amber-100" },
                      { tier: "Platinum", users: 12, monthly: "$150", color: "bg-purple-100" },
                    ].map((item) => (
                      <div key={item.tier} className={`p-3 ${item.color} rounded-lg flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-white/60 text-slate-700 border-slate-200">
                            {item.tier}
                          </Badge>
                          <span className="text-sm text-slate-700">{item.users} users</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{item.monthly}/mo</span>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="mt-6">
                    <p className="text-sm text-slate-600 font-semibold mb-4">6-Month Performance</p>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={affiliateData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="commission"
                            stroke="#7A4FFF"
                            strokeWidth={3}
                            dot={{ fill: '#7A4FFF', r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Widget B: Engagement Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white border-2 border-purple-200 shadow-lg">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                          Engagement Dashboard
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600">
                        Earn 40% from Gold & Platinum user conversations
                      </p>
                    </div>
                  </div>

                  {/* Priority Inbox Alert */}
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-amber-900 mb-1">
                          Pending Premium Inquiries
                        </p>
                        <p className="text-xs text-amber-800 mb-3">
                          You have <strong>3 Gold</strong> and <strong>2 Platinum</strong> users waiting for responses
                        </p>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          View Priority Inbox (5)
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <p className="text-xs text-slate-600 mb-1">This Month</p>
                      <p className="text-2xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>$437</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +15%
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs text-slate-600 mb-1">Active Chats</p>
                      <p className="text-2xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>28</p>
                      <p className="text-xs text-slate-500 mt-1">18 Gold, 10 Platinum</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <p className="text-xs text-slate-600 mb-1">Avg Response</p>
                      <p className="text-2xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>4.2h</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        Under 24h target
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">User Satisfaction</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                          <span className="text-xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                            4.9
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Top 5% of Leaders
                      </Badge>
                    </div>
                  </div>

                  {/* Weekly Performance */}
                  <div>
                    <p className="text-sm text-slate-600 font-semibold mb-4">This Week's Activity</p>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={engagementData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                            }}
                          />
                          <Bar dataKey="conversations" fill="#7A4FFF" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar (1 column) */}
          <div className="space-y-6">
            {/* Widget C: NeoBanking [PLACEHOLDER] */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                      NeoBanking
                    </h3>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-slate-600 mb-2">Total Balance</p>
                    <p className="text-3xl text-[#3D3D6B] mb-1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                      $1,205.50
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Tax-Exempt: $850
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Taxable: $355.50
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-green-100 mb-4">
                    <p className="text-xs text-slate-600 mb-1">This Month's Donations</p>
                    <p className="text-2xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                      $850
                    </p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +22% from last month
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Total Donors</span>
                      <span className="font-semibold text-slate-800">34 people</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Avg Donation</span>
                      <span className="font-semibold text-slate-800">$25</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Withdraw Funds [PLACEHOLDER]
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Thank You
                    </Button>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-900">
                      <strong>Coming Soon:</strong> Full wallet management, tax documents, and expense tracking
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Widget D: Virtual Worship Spaces [PLACEHOLDER] */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                      Virtual Worship Space
                    </h3>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-cyan-100 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Space Type</span>
                      <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">Premium 2D</Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Current Members</span>
                      <span className="text-sm font-semibold text-slate-800">60 / 200</span>
                    </div>
                    <Progress value={30} className="h-2 bg-slate-100">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: '30%' }} />
                    </Progress>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl mb-4">
                    <p className="text-xs text-slate-700 mb-1">This Month's Revenue</p>
                    <p className="text-2xl text-[#3D3D6B]" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                      $201
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      60 members × $10 - $99 lease = $201 profit
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-cyan-100 mb-4">
                    <p className="text-xs text-slate-600 mb-2">Upcoming Services</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm text-slate-700">Sunday Service - 10:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm text-slate-700">Meditation - Wed 7:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white"
                    >
                      <Building className="w-4 h-4 mr-2" />
                      Manage Space [PLACEHOLDER]
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Service
                    </Button>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-900">
                      <strong>Coming Soon:</strong> VR spaces, live streaming, and advanced customization
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Links Card */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg text-[#3D3D6B] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                  Quick Links
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "My AI Clergy Twin", icon: Sparkles, badge: "Coming Soon" },
                    { label: "Congregation Analytics", icon: BarChart3 },
                    { label: "Revenue Reports", icon: TrendingUp },
                    { label: "Resources & Training", icon: Eye },
                  ].map((link) => (
                    <Button
                      key={link.label}
                      variant="ghost"
                      className="w-full justify-between text-left text-slate-700 hover:text-[#7A4FFF] hover:bg-[#7A4FFF]/5"
                    >
                      <div className="flex items-center gap-2">
                        <link.icon className="w-4 h-4" />
                        <span className="text-sm">{link.label}</span>
                      </div>
                      {link.badge ? (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                          {link.badge}
                        </Badge>
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
