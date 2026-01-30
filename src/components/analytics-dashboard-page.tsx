import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { useAnalytics } from './analytics-context';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Target,
  Heart,
  Sparkles,
  Award,
  Users,
  BookOpen,
  Download,
  RefreshCw,
  ArrowLeft,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AnalyticsDashboardPageProps {
  onNavigate: (tab: string) => void;
  onBack: () => void;
  onOpenMission: () => void;
}

export const AnalyticsDashboardPage: React.FC<AnalyticsDashboardPageProps> = ({
  onNavigate,
  onBack,
  onOpenMission
}) => {
  const {
    meditation,
    community,
    journal,
    goals,
    badges,
    overall,
    weeklySummary,
    monthlySummary,
    isLoading,
    refreshAnalytics,
    exportToPDF,
    exportToCSV
  } = useAnalytics();

  const [activeView, setActiveView] = useState<'overview' | 'meditation' | 'community' | 'journal' | 'goals'>('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  const handleExportPDF = async () => {
    toast.promise(exportToPDF(), {
      loading: 'Generating PDF report...',
      success: 'PDF report downloaded!',
      error: 'Failed to generate PDF'
    });
  };

  const handleExportCSV = async () => {
    toast.promise(exportToCSV(), {
      loading: 'Generating CSV export...',
      success: 'CSV data exported!',
      error: 'Failed to export CSV'
    });
  };

  const handleRefresh = () => {
    refreshAnalytics();
    toast.success('Analytics refreshed!');
  };

  if (isLoading || !overall || !meditation || !community || !journal || !goals || !badges) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#497EBC] animate-spin mx-auto mb-4" />
          <div className="text-white">Loading your analytics...</div>
        </div>
      </div>
    );
  }

  const getTrendIcon = () => {
    if (overall.overallTrend === 'improving') return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (overall.overallTrend === 'declining') return <TrendingDown className="w-5 h-5 text-red-400" />;
    return <Minus className="w-5 h-5 text-slate-400" />;
  };

  const getTrendColor = () => {
    if (overall.overallTrend === 'improving') return 'text-green-400';
    if (overall.overallTrend === 'declining') return 'text-red-400';
    return 'text-slate-400';
  };

  // Colors for charts
  const COLORS = ['#497EBC', '#C9A882', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-[#0B1426] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#497EBC] to-[#3867a0] pt-6 pb-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-white text-3xl mb-2">Your Spiritual Journey</h1>
          <p className="text-white/80">Analytics & Insights</p>
        </div>

        {/* Spiritual Growth Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#C9A882]" />
                <span className="text-white">Spiritual Growth Score</span>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon()}
                <span className={`${getTrendColor()} capitalize`}>
                  {overall.overallTrend}
                </span>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <div className="text-5xl text-white">{overall.spiritualGrowthScore}</div>
              <div className="text-xl text-white/70 pb-2">/ 100</div>
            </div>
            <Progress value={overall.spiritualGrowthScore} className="mt-4 h-3" />
          </Card>
        </motion.div>
      </div>

      {/* Time Range Selector */}
      <div className="px-6 py-4 bg-[#0D1B2A]">
        <div className="flex gap-2">
          <Button
            onClick={() => setTimeRange('week')}
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            className={timeRange === 'week' ? 'bg-[#497EBC] hover:bg-[#3867a0]' : ''}
          >
            This Week
          </Button>
          <Button
            onClick={() => setTimeRange('month')}
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            className={timeRange === 'month' ? 'bg-[#497EBC] hover:bg-[#3867a0]' : ''}
          >
            This Month
          </Button>
          <Button
            onClick={() => setTimeRange('all')}
            variant={timeRange === 'all' ? 'default' : 'outline'}
            size="sm"
            className={timeRange === 'all' ? 'bg-[#497EBC] hover:bg-[#3867a0]' : ''}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            icon={<Heart className="w-6 h-6" />}
            label="Activity Streak"
            value={overall.activityStreak}
            unit="days"
            color="from-red-500 to-pink-500"
          />
          <MetricCard
            icon={<Calendar className="w-6 h-6" />}
            label="Engagement"
            value={overall.totalEngagementMinutes}
            unit="min"
            color="from-blue-500 to-cyan-500"
          />
          <MetricCard
            icon={<Award className="w-6 h-6" />}
            label="Badges Earned"
            value={badges.totalBadges}
            unit=""
            color="from-yellow-500 to-orange-500"
          />
          <MetricCard
            icon={<Target className="w-6 h-6" />}
            label="Goal Progress"
            value={goals.completionRate}
            unit="%"
            color="from-green-500 to-emerald-500"
          />
        </div>

        {/* Strengths & Growth Areas */}
        {(overall.strengths.length > 0 || overall.areasForGrowth.length > 0) && (
          <Card className="bg-[#162844] border-[#C9A882] p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#497EBC]" />
              Insights
            </h3>
            
            {overall.strengths.length > 0 && (
              <div className="mb-4">
                <div className="text-sm text-green-400 mb-2">✨ Your Strengths</div>
                <div className="space-y-2">
                  {overall.strengths.map((strength, index) => (
                    <div key={index} className="text-slate-300 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {overall.areasForGrowth.length > 0 && (
              <div>
                <div className="text-sm text-blue-400 mb-2">🌱 Areas for Growth</div>
                <div className="space-y-2">
                  {overall.areasForGrowth.map((area, index) => (
                    <div key={index} className="text-slate-300 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="meditation" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#162844]">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {/* Meditation Tab */}
          <TabsContent value="meditation" className="space-y-4 mt-4">
            <MeditationAnalytics data={meditation} timeRange={timeRange} />
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-4 mt-4">
            <CommunityAnalytics data={community} timeRange={timeRange} />
          </TabsContent>

          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-4 mt-4">
            <JournalAnalytics data={journal} timeRange={timeRange} />
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4 mt-4">
            <GoalsAnalytics data={goals} />
          </TabsContent>
        </Tabs>

        {/* Weekly Summary */}
        {weeklySummary && timeRange === 'week' && (
          <Card className="bg-gradient-to-br from-[#497EBC]/20 to-[#3867a0]/20 border-[#C9A882] p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#C9A882]" />
              This Week's Highlights
            </h3>
            <div className="space-y-3">
              {weeklySummary.highlights.map((highlight, index) => (
                <div key={index} className="text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9A882]" />
                  {highlight}
                </div>
              ))}
            </div>
            {weeklySummary.insights.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-sm text-white/80 mb-2">💡 Insights</div>
                {weeklySummary.insights.map((insight, index) => (
                  <div key={index} className="text-sm text-slate-300">
                    {insight}
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Monthly Summary */}
        {monthlySummary && timeRange === 'month' && (
          <Card className="bg-gradient-to-br from-[#C9A882]/20 to-yellow-900/20 border-[#C9A882]/30 p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C9A882]" />
              {monthlySummary.month} {monthlySummary.year} Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Meditation</div>
                <div className="text-2xl text-white">{monthlySummary.meditation.sessions}</div>
                <div className="text-xs text-slate-400">sessions</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Community</div>
                <div className="text-2xl text-white">{monthlySummary.community.posts}</div>
                <div className="text-xs text-slate-400">posts</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Journal</div>
                <div className="text-2xl text-white">{monthlySummary.journal.entries}</div>
                <div className="text-xs text-slate-400">entries</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Goals</div>
                <div className="text-2xl text-white">{monthlySummary.goals.completed}</div>
                <div className="text-xs text-slate-400">completed</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, unit, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card className={`bg-gradient-to-br ${color} p-4 border-0`}>
      <div className="flex items-center gap-2 mb-2 text-white/80">
        {icon}
      </div>
      <div className="text-2xl text-white mb-1">
        {value}{unit}
      </div>
      <div className="text-sm text-white/70">{label}</div>
    </Card>
  </motion.div>
);

// Meditation Analytics Component
const MeditationAnalytics: React.FC<{ data: any; timeRange: string }> = ({ data, timeRange }) => {
  const chartData = timeRange === 'week' ? data.weeklyTrend : data.monthlyTrend;

  return (
    <>
      <Card className="bg-[#162844] border-[#1E3A5F] p-6">
        <h3 className="text-white mb-4">Meditation Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
            <XAxis
              dataKey="date"
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).getDate().toString()}
            />
            <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#162844', border: '1px solid #1E3A5F' }}
              labelStyle={{ color: '#FFF' }}
            />
            <Line type="monotone" dataKey="value" stroke="#497EBC" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#162844] border-[#C9A882] p-4">
          <div className="text-sm text-slate-400 mb-1">Avg. Duration</div>
          <div className="text-2xl text-white">{data.averageSessionLength} min</div>
        </Card>
        <Card className="bg-[#162844] border-[#C9A882] p-4">
          <div className="text-sm text-slate-400 mb-1">Completion Rate</div>
          <div className="text-2xl text-white">{data.completionRate}%</div>
        </Card>
      </div>

      {data.durationDistribution.length > 0 && (
        <Card className="bg-[#162844] border-[#C9A882] p-6">
          <h3 className="text-white mb-4">Session Duration</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.durationDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
              <XAxis dataKey="range" stroke="#94A3B8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#162844', border: '1px solid #1E3A5F' }}
              />
              <Bar dataKey="count" fill="#497EBC" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </>
  );
};

// Community Analytics Component
const CommunityAnalytics: React.FC<{ data: any; timeRange: string }> = ({ data, timeRange }) => {
  const chartData = timeRange === 'week' ? data.weeklyEngagement : data.monthlyEngagement;

  return (
    <>
      <Card className="bg-[#162844] border-[#1E3A5F] p-6">
        <h3 className="text-white mb-4">Engagement Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
            <XAxis
              dataKey="date"
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).getDate().toString()}
            />
            <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#162844', border: '1px solid #1E3A5F' }}
            />
            <Line type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Posts Created</div>
          <div className="text-2xl text-white">{data.postsCreated}</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Reputation</div>
          <div className="text-2xl text-white">{data.reputationScore}</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Likes Received</div>
          <div className="text-2xl text-white">{data.likesReceived}</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Replies Given</div>
          <div className="text-2xl text-white">{data.repliesGiven}</div>
        </Card>
      </div>
    </>
  );
};

// Journal Analytics Component
const JournalAnalytics: React.FC<{ data: any; timeRange: string }> = ({ data, timeRange }) => {
  const chartData = timeRange === 'week' ? data.weeklyTrend : data.monthlyTrend;

  return (
    <>
      <Card className="bg-[#162844] border-[#1E3A5F] p-6">
        <h3 className="text-white mb-4">Journal Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
            <XAxis
              dataKey="date"
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).getDate().toString()}
            />
            <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#162844', border: '1px solid #1E3A5F' }}
            />
            <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Total Entries</div>
          <div className="text-2xl text-white">{data.totalEntries}</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Current Streak</div>
          <div className="text-2xl text-white">{data.currentStreak} days</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Longest Streak</div>
          <div className="text-2xl text-white">{data.longestStreak} days</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Avg. Length</div>
          <div className="text-2xl text-white">{data.averageEntryLength}</div>
        </Card>
      </div>
    </>
  );
};

// Goals Analytics Component
const GoalsAnalytics: React.FC<{ data: any }> = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Total Goals</div>
          <div className="text-2xl text-white">{data.totalGoals}</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Completed</div>
          <div className="text-2xl text-white">{data.completedGoals}</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Active</div>
          <div className="text-2xl text-white">{data.activeGoals}</div>
        </Card>
        <Card className="bg-[#162844] border-[#1E3A5F] p-4">
          <div className="text-sm text-slate-400 mb-1">Success Rate</div>
          <div className="text-2xl text-white">{data.completionRate}%</div>
        </Card>
      </div>

      {data.categoryDistribution.length > 0 && (
        <Card className="bg-[#162844] border-[#1E3A5F] p-6">
          <h3 className="text-white mb-4">Goal Categories</h3>
          <div className="space-y-3">
            {data.categoryDistribution.map((cat: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{cat.category}</span>
                  <span className="text-white">{cat.count}</span>
                </div>
                <Progress
                  value={(cat.count / data.totalGoals) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
};