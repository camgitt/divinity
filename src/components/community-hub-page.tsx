import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useCommunity, CommunityPost } from "./community-context";
import { useLocalization } from "./localization-context";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  TrendingUp,
  Clock,
  Star,
  Search,
  Filter,
  PenSquare,
  Shield,
  Sparkles,
  BookOpen,
  HelpCircle,
  Award,
  Flag,
  ChevronRight,
  Eye,
  ThumbsUp,
  Send,
  X,
  Globe
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface CommunityHubPageProps {
  onNavigate?: (page: string) => void;
  onOpenMission?: () => void;
  onBack?: () => void;
}

export function CommunityHubPage({ onNavigate, onOpenMission, onBack }: CommunityHubPageProps) {
  const { posts, createPost, createReply, likePost, getPostsByCategory, getRepliesForPost, userStats, reportPost } = useCommunity();
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState<'all' | 'questions' | 'wisdom' | 'discussion'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [filterFaith, setFilterFaith] = useState<string>('all');

  // Get user info from localStorage
  const getUserInfo = () => {
    try {
      const stored = localStorage.getItem('divinityagi_user');
      if (stored) {
        const user = JSON.parse(stored);
        return {
          name: user.name || 'Anonymous',
          avatar: user.avatar,
        };
      }
    } catch (e) {
      console.error('Failed to get user info:', e);
    }
    return { name: 'Anonymous', avatar: undefined };
  };

  const userInfo = getUserInfo();

  // Filter posts based on active tab and search
  const getFilteredPosts = () => {
    let filtered = posts;

    // Filter by category
    if (activeTab === 'questions') {
      filtered = filtered.filter(p => p.category === 'question');
    } else if (activeTab === 'wisdom') {
      filtered = filtered.filter(p => p.category === 'wisdom');
    } else if (activeTab === 'discussion') {
      filtered = filtered.filter(p => p.category === 'discussion' || p.category === 'testimony');
    }

    // Filter by faith
    if (filterFaith !== 'all') {
      filtered = filtered.filter(p => p.faithTradition === filterFaith);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  // Format timestamp
  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Get faith color
  const getFaithColor = (faith: string) => {
    const colors: Record<string, string> = {
      christianity: '#E53935',
      islam: '#2E7D32',
      hinduism: '#F4511E',
      buddhism: '#F9A825',
      judaism: '#1565C0',
      sikhism: '#F57F17',
      taoism: '#212121',
      shinto: '#E64A19',
      jainism: '#FFB300',
      bahai: '#9C27B0',
      confucianism: '#5D4037',
      polytheism: '#F59E0B',
    };
    return colors[faith] || '#7A4FFF';
  };

  return (
    <div className="min-h-screen bg-[#0B1426]">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0D0B2B] via-[#0B1426] to-[#0B1426] pt-24 pb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzdBNEZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7A4FFF]/20 to-[#4CAF50]/20 border border-[#7A4FFF]/30 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-[#7A4FFF]" />
              <span className="text-slate-300 text-sm">Join the Global Spiritual Community</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
              Community Circle
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Connect with seekers from all faith traditions. Share wisdom, ask questions, and grow together.
            </p>

            {/* User Stats */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl text-white mb-1">{userStats.postsCreated}</div>
                <div className="text-slate-400 text-sm">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white mb-1">{userStats.repliesCreated}</div>
                <div className="text-slate-400 text-sm">Replies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-[#FFD369] mb-1">{userStats.reputationScore}</div>
                <div className="text-slate-400 text-sm">Reputation</div>
              </div>
            </div>

            <Button
              onClick={() => setShowCreatePost(true)}
              className="bg-gradient-to-r from-[#7A4FFF] to-[#4CAF50] hover:from-[#6A3FEF] hover:to-[#3C9F40] text-white"
            >
              <PenSquare className="w-4 h-4 mr-2" />
              Share Your Wisdom
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, questions, wisdom..."
              className="pl-10 bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
            />
          </div>
          
          <Select value={filterFaith} onValueChange={setFilterFaith}>
            <SelectTrigger className="w-full md:w-48 bg-[#162844]/60 border-[#1E3A5F]/50 text-white">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Faiths" />
            </SelectTrigger>
            <SelectContent className="bg-[#0B1426] border-[#1E3A5F]/50">
              <SelectItem value="all">All Faiths</SelectItem>
              <SelectItem value="christianity">Christianity</SelectItem>
              <SelectItem value="islam">Islam</SelectItem>
              <SelectItem value="hinduism">Hinduism</SelectItem>
              <SelectItem value="buddhism">Buddhism</SelectItem>
              <SelectItem value="judaism">Judaism</SelectItem>
              <SelectItem value="sikhism">Sikhism</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
          <TabsList className="bg-[#162844]/60 border border-[#1E3A5F]/30 grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7A4FFF] data-[state=active]:to-[#4CAF50]">
              <TrendingUp className="w-4 h-4 mr-2" />
              All
            </TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7A4FFF] data-[state=active]:to-[#4CAF50]">
              <HelpCircle className="w-4 h-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="wisdom" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7A4FFF] data-[state=active]:to-[#4CAF50]">
              <BookOpen className="w-4 h-4 mr-2" />
              Wisdom
            </TabsTrigger>
            <TabsTrigger value="discussion" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7A4FFF] data-[state=active]:to-[#4CAF50]">
              <MessageCircle className="w-4 h-4 mr-2" />
              Discussion
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredPosts.length === 0 ? (
                  <Card className="bg-[#162844]/40 border-[#1E3A5F]/30 p-12">
                    <div className="text-center">
                      <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-white text-lg mb-2">No posts found</h3>
                      <p className="text-slate-400">
                        Try adjusting your filters or be the first to post!
                      </p>
                    </div>
                  </Card>
                ) : (
                  filteredPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={() => likePost(post.id)}
                      onClick={() => setSelectedPost(post)}
                      getFaithColor={getFaithColor}
                      formatTime={formatTime}
                      index={index}
                    />
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={createPost}
        userInfo={userInfo}
      />

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={() => likePost(selectedPost.id)}
          onReply={(content) => {
            createReply({
              postId: selectedPost.id,
              authorName: userInfo.name,
              authorAvatar: userInfo.avatar,
              isAnonymous: false,
              content,
            });
          }}
          replies={getRepliesForPost(selectedPost.id)}
          getFaithColor={getFaithColor}
          formatTime={formatTime}
          onReport={reportPost}
        />
      )}
    </div>
  );
}

// Post Card Component
interface PostCardProps {
  post: CommunityPost;
  onLike: () => void;
  onClick: () => void;
  getFaithColor: (faith: string) => string;
  formatTime: (timestamp: number) => string;
  index: number;
}

function PostCard({ post, onLike, onClick, getFaithColor, formatTime, index }: PostCardProps) {
  const categoryIcons = {
    question: <HelpCircle className="w-4 h-4" />,
    wisdom: <Sparkles className="w-4 h-4" />,
    discussion: <MessageCircle className="w-4 h-4" />,
    testimony: <Award className="w-4 h-4" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="bg-[#162844]/60 border-[#1E3A5F]/50 hover:border-[#7A4FFF]/50 transition-all cursor-pointer overflow-hidden group">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A4FFF]/30 to-[#FFD369]/30 flex items-center justify-center text-lg flex-shrink-0">
                {post.isAnonymous ? '👤' : post.authorName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white">{post.isAnonymous ? 'Anonymous' : post.authorName}</span>
                  {post.verified && (
                    <Badge className="bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Badge 
                    variant="outline" 
                    className="border-[color:var(--color)] text-[color:var(--color)]"
                    style={{ '--color': getFaithColor(post.faithTradition) } as any}
                  >
                    {post.faithTradition}
                  </Badge>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(post.timestamp)}</span>
                </div>
              </div>
            </div>
            
            <Badge className="bg-[#7A4FFF]/20 text-[#7A4FFF] border-[#7A4FFF]/30 flex-shrink-0">
              {categoryIcons[post.category]}
              <span className="ml-1 capitalize">{post.category}</span>
            </Badge>
          </div>

          {/* Content */}
          <div onClick={onClick} className="mb-4">
            <h3 className="text-white text-lg mb-2 group-hover:text-[#FFD369] transition-colors">
              {post.title}
            </h3>
            <p className="text-slate-300 line-clamp-2">{post.content}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-slate-400">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              className={`flex items-center gap-2 hover:text-[#FF6B35] transition-colors ${post.hasLiked ? 'text-[#FF6B35]' : ''}`}
            >
              <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <button onClick={onClick} className="flex items-center gap-2 hover:text-[#7A4FFF] transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{post.replies}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-[#4CAF50] transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {post.featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-br from-[#FFD369] to-[#FF9800] text-white text-xs px-3 py-1 rounded-bl-lg">
            ⭐ Featured
          </div>
        )}
      </Card>
    </motion.div>
  );
}

// Create Post Modal Component
interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: any) => void;
  userInfo: { name: string; avatar?: string };
}

function CreatePostModal({ isOpen, onClose, onSubmit, userInfo }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'discussion' | 'question' | 'wisdom' | 'testimony'>('discussion');
  const [faith, setFaith] = useState('christianity');
  const [tags, setTags] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    onSubmit({
      authorName: userInfo.name,
      authorAvatar: userInfo.avatar,
      isAnonymous,
      faithTradition: faith,
      category,
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });

    // Reset form
    setTitle('');
    setContent('');
    setCategory('discussion');
    setTags('');
    setIsAnonymous(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Share with the Community</DialogTitle>
          <DialogDescription className="text-slate-400">
            Post your question, wisdom, or start a discussion
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-white mb-2">Category</Label>
            <Select value={category} onValueChange={(v: any) => setCategory(v)}>
              <SelectTrigger className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1426] border-[#1E3A5F]/50">
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="wisdom">Wisdom</SelectItem>
                <SelectItem value="discussion">Discussion</SelectItem>
                <SelectItem value="testimony">Testimony</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-white mb-2">Faith Tradition</Label>
            <Select value={faith} onValueChange={setFaith}>
              <SelectTrigger className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1426] border-[#1E3A5F]/50">
                <SelectItem value="christianity">Christianity</SelectItem>
                <SelectItem value="islam">Islam</SelectItem>
                <SelectItem value="hinduism">Hinduism</SelectItem>
                <SelectItem value="buddhism">Buddhism</SelectItem>
                <SelectItem value="judaism">Judaism</SelectItem>
                <SelectItem value="sikhism">Sikhism</SelectItem>
                <SelectItem value="taoism">Taoism</SelectItem>
                <SelectItem value="shinto">Shinto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-white mb-2">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title..."
              className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
              maxLength={120}
            />
          </div>

          <div>
            <Label className="text-white mb-2">Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, question, or wisdom..."
              className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white min-h-32"
              maxLength={1000}
            />
          </div>

          <div>
            <Label className="text-white mb-2">Tags (comma separated)</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="prayer, meditation, guidance..."
              className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded"
            />
            <Label className="text-slate-300">Post anonymously</Label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#7A4FFF] to-[#4CAF50] hover:from-[#6A3FEF] hover:to-[#3C9F40] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
            <Button onClick={onClose} variant="outline" className="border-slate-600 text-slate-300">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Post Detail Modal Component (abbreviated for brevity)
interface PostDetailModalProps {
  post: CommunityPost;
  onClose: () => void;
  onLike: () => void;
  onReply: (content: string) => void;
  replies: any[];
  getFaithColor: (faith: string) => string;
  formatTime: (timestamp: number) => string;
  onReport: (postId: string, reason: string) => void;
}

function PostDetailModal({ post, onClose, onLike, onReply, replies, getFaithColor, formatTime, onReport }: PostDetailModalProps) {
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    if (!replyContent.trim()) {
      toast.error('Please enter a reply');
      return;
    }
    onReply(replyContent.trim());
    setReplyContent('');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/50 max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Post Details</DialogTitle>
          <DialogDescription>View post content and replies from the community</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Post Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7A4FFF]/30 to-[#FFD369]/30 flex items-center justify-center text-xl">
                {post.isAnonymous ? '👤' : post.authorName.charAt(0)}
              </div>
              <div>
                <div className="text-white">{post.isAnonymous ? 'Anonymous' : post.authorName}</div>
                <div className="text-sm text-slate-400">{formatTime(post.timestamp)}</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onReport(post.id, 'inappropriate')}>
              <Flag className="w-4 h-4" />
            </Button>
          </div>

          {/* Post Content */}
          <div>
            <h2 className="text-white text-2xl mb-4">{post.title}</h2>
            <p className="text-slate-300">{post.content}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="border-slate-600 text-slate-400">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-slate-400 border-y border-[#1E3A5F]/30 py-4">
            <button
              onClick={onLike}
              className={`flex items-center gap-2 hover:text-[#FF6B35] transition-colors ${post.hasLiked ? 'text-[#FF6B35]' : ''}`}
            >
              <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>{post.replies}</span>
            </div>
          </div>

          {/* Reply Input */}
          <div className="space-y-3">
            <Label className="text-white">Add a reply</Label>
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Share your thoughts..."
              className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
            />
            <Button
              onClick={handleReply}
              className="bg-gradient-to-r from-[#7A4FFF] to-[#4CAF50] hover:from-[#6A3FEF] hover:to-[#3C9F40] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Reply
            </Button>
          </div>

          {/* Replies */}
          <div className="space-y-4">
            <h3 className="text-white">Replies ({replies.length})</h3>
            {replies.map(reply => (
              <div key={reply.id} className="bg-[#162844]/40 border border-[#1E3A5F]/30 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7A4FFF]/30 to-[#4CAF50]/30 flex items-center justify-center">
                    {reply.isAnonymous ? '👤' : reply.authorName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm">{reply.isAnonymous ? 'Anonymous' : reply.authorName}</span>
                      <span className="text-slate-500 text-xs">•</span>
                      <span className="text-slate-400 text-xs">{formatTime(reply.timestamp)}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{reply.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
