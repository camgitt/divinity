import React, { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { AppFooter } from "./app-footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  MessageCircle,
  Clock,
  Upload,
  Calendar,
  Heart,
  Eye,
  Award,
  BarChart3,
  BookOpen,
  Video,
  FileText,
  Sparkles,
  Crown,
  CheckCircle,
  ArrowUpRight,
  Download,
  Settings,
  Bell,
  Shield
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface VerifiedLeaderDashboardProps {
  onBack: () => void;
  onOpenMission?: () => void;
  onNavigate?: (route: string) => void;
}

// Mock data for charts
const earningsData = [
  { month: "Jan", earnings: 2400, sessions: 145 },
  { month: "Feb", earnings: 2800, sessions: 168 },
  { month: "Mar", earnings: 3200, sessions: 192 },
  { month: "Apr", earnings: 3600, sessions: 216 },
  { month: "May", earnings: 4100, sessions: 245 },
  { month: "Jun", earnings: 4500, sessions: 270 },
];

const engagementData = [
  { day: "Mon", messages: 45, sessions: 12 },
  { day: "Tue", messages: 52, sessions: 15 },
  { day: "Wed", messages: 38, sessions: 10 },
  { day: "Thu", messages: 61, sessions: 18 },
  { day: "Fri", messages: 55, sessions: 16 },
  { day: "Sat", messages: 70, sessions: 22 },
  { day: "Sun", messages: 48, sessions: 14 },
];

const contentTypeData = [
  { name: "Reflections", value: 45, color: "#497EBC" },
  { name: "Meditations", value: 30, color: "#C9A882" },
  { name: "Teachings", value: 15, color: "#4ECDC4" },
  { name: "Videos", value: 10, color: "#FF6B9D" },
];

const recentSessions = [
  { id: 1, user: "Sarah M.", topic: "Finding Inner Peace", duration: "45 min", rating: 5, timestamp: "2 hours ago" },
  { id: 2, user: "John D.", topic: "Career Guidance", duration: "30 min", rating: 5, timestamp: "5 hours ago" },
  { id: 3, user: "Maria L.", topic: "Relationship Healing", duration: "60 min", rating: 4, timestamp: "1 day ago" },
  { id: 4, user: "Ahmed K.", topic: "Life Purpose", duration: "40 min", rating: 5, timestamp: "1 day ago" },
];

export function VerifiedLeaderDashboard({ onBack, onOpenMission, onNavigate }: VerifiedLeaderDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [contentTitle, setContentTitle] = useState("");
  const [contentBody, setContentBody] = useState("");
  const [contentType, setContentType] = useState("reflection");

  const handleUploadContent = () => {
    if (!contentTitle || !contentBody) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success(`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} uploaded successfully!`);
    setContentTitle("");
    setContentBody("");
  };

  return (
    <div className="min-h-screen bg-[#0D0D2B] text-white pb-20 relative overflow-hidden">
      {/* Enhanced Cosmic Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/10 via-transparent to-[#C9A882]/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#497EBC]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A882]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0D0D2B]/80 backdrop-blur-xl border-b border-[#497EBC]/20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={onBack}
                  variant="ghost" 
                  className="text-white hover:text-white p-0 h-auto backdrop-blur-md bg-[#1A1A3E]/60 hover:bg-[#1A1A3E]/80 rounded-xl px-4 py-3 transition-all duration-300 border border-[#497EBC]/30 hover:border-[#497EBC]/50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                <div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#C9A882]" />
                    <h1 className="text-xl text-white">Leader Dashboard</h1>
                  </div>
                  <p className="text-sm text-slate-400">Manage your spiritual leadership</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-[#1A1A3E]/60"
                >
                  <Bell className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-[#1A1A3E]/60"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-4 md:px-6 py-6 md:py-8 max-w-7xl mx-auto">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8"
          >
            <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm overflow-hidden">
              <div className="relative h-40 md:h-48 lg:h-56">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1632556719027-a2e7fa84d587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBsZWFkZXIlMjB0ZWFjaGluZyUyMHdpc2RvbXxlbnwxfHx8fDE3NjUxNzQ5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Leader Dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D2B]/90 via-[#0D0D2B]/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs md:text-sm">
                      Verified Leader
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                    Welcome Back, Master Teacher
                  </h2>
                  <p className="text-sm md:text-base text-slate-300 max-w-2xl" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                    Your spiritual guidance is impacting lives. Keep up the amazing work!
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
          >
            {[
              { 
                label: "Total Earnings", 
                value: "$4,500", 
                change: "+12%", 
                icon: DollarSign, 
                color: "from-[#C9A882] to-yellow-600",
                bgColor: "bg-[#C9A882]/10"
              },
              { 
                label: "Active Sessions", 
                value: "270", 
                change: "+8%", 
                icon: Users, 
                color: "from-[#497EBC] to-blue-600",
                bgColor: "bg-[#497EBC]/10"
              },
              { 
                label: "Avg Rating", 
                value: "4.9", 
                change: "+0.2", 
                icon: Star, 
                color: "from-[#C9A882] to-yellow-600",
                bgColor: "bg-[#C9A882]/10"
              },
              { 
                label: "Total Followers", 
                value: "2.5K", 
                change: "+156", 
                icon: Heart, 
                color: "from-[#497EBC] to-blue-600",
                bgColor: "bg-[#497EBC]/10"
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 hover:border-[#497EBC]/40 transition-all duration-300 backdrop-blur-sm overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {stat.change}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                      <p className="text-2xl text-white">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-[#1A1A3E]/40 border border-[#497EBC]/20 p-1 backdrop-blur-sm inline-flex">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#497EBC] data-[state=active]:to-[#C9A882] data-[state=active]:text-white"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#497EBC] data-[state=active]:to-[#C9A882] data-[state=active]:text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger 
                value="sessions" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#497EBC] data-[state=active]:to-[#C9A882] data-[state=active]:text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Sessions
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#497EBC] data-[state=active]:to-[#C9A882] data-[state=active]:text-white"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Earnings Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg text-white mb-1">Earnings Overview</h3>
                        <p className="text-sm text-slate-400">Last 6 months performance</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-[#497EBC]/40 text-[#497EBC] hover:bg-[#497EBC]/10 hover:border-[#497EBC]/60"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>

                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData}>
                          <defs>
                            <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#497EBC" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#497EBC" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#497EBC20" />
                          <XAxis dataKey="month" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1A1A3E', 
                              border: '1px solid #497EBC40',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="earnings" 
                            stroke="#497EBC" 
                            strokeWidth={2}
                            fill="url(#earningsGradient)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Content Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm h-full">
                    <div className="p-6">
                      <h3 className="text-lg text-white mb-6">Content Distribution</h3>
                      
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={contentTypeData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {contentTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#1A1A3E', 
                                border: '1px solid #497EBC40',
                                borderRadius: '8px',
                                color: '#fff'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-4 space-y-2">
                        {contentTypeData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-sm text-slate-300">{item.name}</span>
                            </div>
                            <span className="text-sm text-white">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm h-full">
                    <div className="p-6">
                      <h3 className="text-lg text-white mb-6">Quick Stats</h3>
                      
                      <div className="space-y-6">
                        {[
                          { label: "Response Rate", value: 98, color: "#497EBC" },
                          { label: "Session Completion", value: 95, color: "#C9A882" },
                          { label: "User Satisfaction", value: 92, color: "#4ECDC4" },
                        ].map((stat, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-300">{stat.label}</span>
                              <span className="text-sm text-white">{stat.value}%</span>
                            </div>
                            <Progress value={stat.value} className="h-2" style={{ backgroundColor: '#2A2A4E' }}>
                              <div 
                                className="h-full rounded-full transition-all" 
                                style={{ 
                                  width: `${stat.value}%`,
                                  backgroundColor: stat.color 
                                }}
                              />
                            </Progress>
                          </div>
                        ))}

                        <div className="pt-4 mt-4 border-t border-[#497EBC]/20">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-[#C9A882]" />
                              <span className="text-sm text-slate-300">Achievement Level</span>
                            </div>
                            <Badge className="bg-[#C9A882]/20 text-[#C9A882] border-[#C9A882]/30">
                              Master
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-[#497EBC]" />
                              <span className="text-sm text-slate-300">Verification Status</span>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Content Upload Tab */}
            <TabsContent value="content" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-[#497EBC]/20">
                        <Upload className="w-5 h-5 text-[#497EBC]" />
                      </div>
                      <div>
                        <h3 className="text-lg text-white">Upload New Content</h3>
                        <p className="text-sm text-slate-400">Share your wisdom with your followers</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="content-type" className="text-slate-300 mb-2">Content Type</Label>
                        <Select value={contentType} onValueChange={setContentType}>
                          <SelectTrigger className="bg-[#0D0D2B]/50 border-[#497EBC]/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A3E] border-[#497EBC]/30">
                            <SelectItem value="reflection">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Daily Reflection
                              </div>
                            </SelectItem>
                            <SelectItem value="meditation">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Guided Meditation
                              </div>
                            </SelectItem>
                            <SelectItem value="teaching">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Teaching
                              </div>
                            </SelectItem>
                            <SelectItem value="video">
                              <div className="flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                Video Content
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="title" className="text-slate-300 mb-2">Title</Label>
                        <Input
                          id="title"
                          value={contentTitle}
                          onChange={(e) => setContentTitle(e.target.value)}
                          placeholder="Enter a compelling title..."
                          className="bg-[#0D0D2B]/50 border-[#497EBC]/30 text-white placeholder:text-slate-500 focus:border-[#497EBC]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="content" className="text-slate-300 mb-2">Content</Label>
                        <Textarea
                          id="content"
                          value={contentBody}
                          onChange={(e) => setContentBody(e.target.value)}
                          placeholder="Share your wisdom, insights, or guidance..."
                          rows={8}
                          className="bg-[#0D0D2B]/50 border-[#497EBC]/30 text-white placeholder:text-slate-500 focus:border-[#497EBC] resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <Button 
                          onClick={handleUploadContent}
                          className="flex-1 bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6A9F] hover:to-[#B89770] text-white border border-[#497EBC]/30"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Content
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setContentTitle("");
                            setContentBody("");
                          }}
                          className="border-[#497EBC]/30 text-slate-300 hover:bg-[#1A1A3E]/60"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Recent Uploads */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm">
                  <div className="p-6">
                    <h3 className="text-lg text-white mb-4">Recent Uploads</h3>
                    
                    <div className="space-y-3">
                      {[
                        { type: "Reflection", title: "Finding Peace in Chaos", date: "2 days ago", views: 245, likes: 89 },
                        { type: "Meditation", title: "Morning Gratitude Practice", date: "5 days ago", views: 432, likes: 156 },
                        { type: "Teaching", title: "The Path of Compassion", date: "1 week ago", views: 567, likes: 203 },
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-xl bg-[#0D0D2B]/30 border border-[#497EBC]/10 hover:border-[#497EBC]/30 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-[#497EBC]/20 text-[#497EBC] border-[#497EBC]/30 text-xs">
                                  {item.type}
                                </Badge>
                                <span className="text-sm text-slate-400">{item.date}</span>
                              </div>
                              <p className="text-white mb-2">{item.title}</p>
                              <div className="flex items-center gap-4 text-sm text-slate-400">
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {item.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {item.likes}
                                </div>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-[#497EBC] hover:text-white hover:bg-[#497EBC]/20"
                            >
                              View
                              <ArrowUpRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg text-white">Recent Sessions</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {recentSessions.length} Active
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {recentSessions.map((session) => (
                        <div 
                          key={session.id}
                          className="p-5 rounded-xl bg-[#0D0D2B]/30 border border-[#497EBC]/10 hover:border-[#497EBC]/30 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#497EBC] to-[#C9A882] flex items-center justify-center text-xs text-white">
                                  {session.user.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-white">{session.user}</p>
                                  <p className="text-xs text-slate-400">{session.timestamp}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[#C9A882]">
                              {[...Array(session.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-slate-300 mb-1">{session.topic}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Clock className="w-3 h-3" />
                                {session.duration}
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#497EBC]/40 text-[#497EBC] hover:bg-[#497EBC]/10"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm">
                  <div className="p-6">
                    <h3 className="text-lg text-white mb-6">Weekly Engagement</h3>
                    
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={engagementData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#497EBC20" />
                          <XAxis dataKey="day" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1A1A3E', 
                              border: '1px solid #497EBC40',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                          />
                          <Bar dataKey="messages" fill="#497EBC" radius={[8, 8, 0, 0]} />
                          <Bar dataKey="sessions" fill="#C9A882" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#497EBC]" />
                        <span className="text-sm text-slate-300">Messages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#C9A882]" />
                        <span className="text-sm text-slate-300">Sessions</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Peak Hours", value: "6-9 PM", icon: Clock, trend: "Most active" },
                  { label: "Avg Session", value: "42 min", icon: MessageCircle, trend: "+5 min" },
                  { label: "Return Rate", value: "87%", icon: Users, trend: "+3%" },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  >
                    <Card className="bg-[#1A1A3E]/40 border-[#497EBC]/20 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-[#497EBC]/20">
                            <metric.icon className="w-5 h-5 text-[#497EBC]" />
                          </div>
                          <p className="text-sm text-slate-400">{metric.label}</p>
                        </div>
                        <p className="text-2xl text-white mb-1">{metric.value}</p>
                        <p className="text-xs text-green-400">{metric.trend}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      </div>
    </div>
  );
}