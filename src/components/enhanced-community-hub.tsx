import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSocialMedia, Post, FaithGroup } from "./social-media-context";
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Search,
  PenSquare,
  Globe,
  TrendingUp,
  Clock,
  Image as ImageIcon,
  Link as LinkIcon,
  Send,
  UserPlus,
  Bell,
  Mail,
  Settings,
  MoreHorizontal,
  Edit2,
  Trash2,
  Flag,
  BookOpen,
  Compass,
  Home,
  Group,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useHapticFeedback } from "./hooks/use-haptic";

interface EnhancedCommunityHubProps {
  onNavigate?: (tab: string, data?: any) => void;
  embedded?: boolean;
}

export function EnhancedCommunityHub({ onNavigate, embedded = false }: EnhancedCommunityHubProps = {}) {
  const {
    currentUser,
    posts,
    createPost,
    likePost,
    sharePost,
    addComment,
    getCommentsForPost,
    faithGroups,
    joinGroup,
    leaveGroup,
  } = useSocialMedia();
  const haptic = useHapticFeedback();

  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'explore'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postContent, setPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on active tab
  const filteredPosts = posts.filter(post => {
    if (searchQuery) {
      return post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  const handleCreatePost = () => {
    if (!postContent.trim() || !currentUser) {
      haptic.error(); // Error pattern for validation failure
      toast.error('Please enter some content');
      return;
    }

    haptic.success(); // Success pattern for post creation
    createPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      content: postContent,
      type: 'status',
      visibility: 'public',
      tags: [],
      faithTradition: currentUser.faithTradition,
    });

    setPostContent('');
    setShowCreatePost(false);
    toast.success('Post shared!');
  };

  // If embedded, render without wrapper and hero
  if (embedded) {
    return (
      <>
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
              background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
              boxShadow: '0 0 0 2px #a79a4c, 0 4px 12px rgba(0, 0, 0, 0.12)'
            }}>
              <div className="relative">
                <h3 className="text-white mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Navigation</h3>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('feed')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'feed' ? 'bg-[#a79a4c] text-white' : 'text-slate-300 hover:bg-[#1e386e]/30'
                    }`}
                    style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
                  >
                    <Home className="w-5 h-5" />
                    <span>News Feed</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('groups')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'groups' ? 'bg-[#a79a4c] text-white' : 'text-slate-300 hover:bg-[#1e386e]/30'
                    }`}
                    style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
                  >
                    <Group className="w-5 h-5" />
                    <span>Faith Groups</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'explore' ? 'bg-[#a79a4c] text-white' : 'text-slate-300 hover:bg-[#1e386e]/30'
                    }`}
                    style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
                  >
                    <Compass className="w-5 h-5" />
                    <span>Explore</span>
                  </button>
                </nav>
              </div>
            </Card>

            {/* Faith Groups Quick Access */}
            <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
              background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
              boxShadow: '0 0 0 2px #a79a4c, 0 4px 12px rgba(0, 0, 0, 0.12)'
            }}>
              <div className="relative">
                <h3 className="text-white mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>My Groups</h3>
                <div className="space-y-2">
                  {faithGroups.slice(0, 3).map((group) => (
                    <button
                      key={group.id}
                      className="w-full flex items-center gap-3 px-3 py-2 bg-[#1e386e]/30 hover:bg-[#1e386e]/50 rounded-lg transition-colors"
                      style={{ fontFamily: 'Raleway, sans-serif' }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: group.color + '20' }}>
                        {group.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white text-sm" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>{group.name}</p>
                        <p className="text-slate-400 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>{group.memberCount} members</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Center - Main Feed */}
          <div className="lg:col-span-6 space-y-4">
            {/* Create Post */}
            {currentUser && (
              <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
                background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
              }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                <div className="relative flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#497EBC]/30 to-[#FFD369]/30">
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="w-full text-left px-4 py-3 bg-[#0B1426] border border-[#1E3A5F]/50 rounded-lg text-slate-400 hover:border-[#497EBC]/50 transition-colors"
                    >
                      What's on your mind, {currentUser.name.split(' ')[0]}?
                    </button>
                    <div className="flex items-center gap-4 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                        onClick={() => setShowCreatePost(true)}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Photo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                        onClick={() => setShowCreatePost(true)}
                      >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Link
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-10 bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
              />
            </div>

            {/* Posts Feed */}
            <AnimatePresence mode="wait">
              {activeTab === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {filteredPosts.length === 0 ? (
                    <Card className="relative rounded-3xl text-white border-0 overflow-hidden p-12" style={{
                      background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                      boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
                    }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                      <div className="relative text-center">
                        <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-white text-lg mb-2">No posts yet</h3>
                        <p className="text-slate-400 mb-4">Be the first to share something!</p>
                        <Button
                          onClick={() => setShowCreatePost(true)}
                          className="bg-gradient-to-r from-[#497EBC] to-[#C9A882]"
                        >
                          <PenSquare className="w-4 h-4 mr-2" />
                          Create Post
                        </Button>
                      </div>
                    </Card>
                  ) : (
                    filteredPosts.map((post, index) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onLike={() => likePost(post.id)}
                        onShare={() => sharePost(post.id)}
                        onComment={() => setSelectedPost(post)}
                        index={index}
                      />
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'groups' && (
                <motion.div
                  key="groups"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Explore Faiths Button */}
                  <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
                    background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                    boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
                  }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="text-white mb-1">Explore Faith Traditions</h3>
                        <p className="text-slate-400 text-sm">Discover 12 spiritual paths in depth</p>
                      </div>
                      <Button
                        onClick={() => onNavigate?.('circle')}
                        className="bg-gradient-to-r from-[#497EBC] to-[#C9A882]"
                      >
                        <Compass className="w-4 h-4 mr-2" />
                        Explore
                      </Button>
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 gap-4">
                    {faithGroups.map((group, index) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        onJoin={() => joinGroup(group.id)}
                        onLeave={() => leaveGroup(group.id)}
                        onView={() => onNavigate?.('group-detail', { groupId: group.id })}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar - Suggestions */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
              background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
              boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
              <div className="relative">
                <h3 className="text-white mb-4">Suggested Groups</h3>
                <div className="space-y-3">
                  {faithGroups.filter(g => !g.isJoined).slice(0, 3).map(group => (
                    <div key={group.id} className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: group.color + '20' }}
                      >
                        <span className="text-lg">{group.faithTradition.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm">{group.name}</h4>
                        <p className="text-slate-400 text-xs line-clamp-1">{group.description}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 border-[#497EBC]/50 text-[#497EBC] hover:bg-[#497EBC]/10"
                          onClick={() => joinGroup(group.id)}
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
              background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
              boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
              <div className="relative">
                <h3 className="text-white mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {['#prayer', '#meditation', '#gratitude', '#wisdom', '#faith'].map(tag => (
                    <button
                      key={tag}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1E3A5F]/30 transition-colors"
                    >
                      <div className="text-[#497EBC]">{tag}</div>
                      <div className="text-slate-400 text-xs">2.4k posts</div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
        content={postContent}
        setContent={setPostContent}
      />

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={() => likePost(selectedPost.id)}
          onAddComment={(content) => {
            if (currentUser) {
              addComment({
                postId: selectedPost.id,
                authorId: currentUser.id,
                authorName: currentUser.name,
                authorUsername: currentUser.username,
                authorAvatar: currentUser.avatar,
                content,
              });
            }
          }}
          comments={getCommentsForPost(selectedPost.id)}
        />
      )}
      </>
    );
  }

  // Full page version
  return (
    <div className="min-h-screen bg-[#0B1426]">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0D0B2B] via-[#0B1426] to-[#0B1426] pt-20 pb-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzdBNEZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#497EBC]/20 to-[#C9A882]/20 border border-[#497EBC]/30 rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4 text-[#497EBC]" />
              <span className="text-slate-300 text-sm">Global Spiritual Community</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
              Community Circle
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Connect, share, and grow with seekers from all faith traditions
            </p>
          </div>

          {/* Quick Stats */}
          {currentUser && (
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card className="bg-[#162844]/60 border-[#1E3A5F]/50 p-4 text-center">
                <div className="text-2xl text-[#FFD369] mb-1">{currentUser.stats.posts}</div>
                <div className="text-slate-400 text-sm">Posts</div>
              </Card>
              <Card className="bg-[#162844]/60 border-[#1E3A5F]/50 p-4 text-center">
                <div className="text-2xl text-[#497EBC] mb-1">{currentUser.stats.followers}</div>
                <div className="text-slate-400 text-sm">Followers</div>
              </Card>
              <Card className="bg-[#162844]/60 border-[#1E3A5F]/50 p-4 text-center">
                <div className="text-2xl text-[#C9A882] mb-1">{currentUser.stats.following}</div>
                <div className="text-slate-400 text-sm">Following</div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
              background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
              boxShadow: '0 0 0 1px rgba(201, 168, 130, 0.3), 0 4px 12px rgba(0, 0, 0, 0.12)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
              <div className="relative">
                <h3 className="text-white mb-4">Navigation</h3>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('feed')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'feed' ? 'bg-gradient-to-r from-[#497EBC] to-[#C9A882] text-white' : 'text-slate-300 hover:bg-[#1E3A5F]/30'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span>News Feed</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('groups')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'groups' ? 'bg-gradient-to-r from-[#497EBC] to-[#C9A882] text-white' : 'text-slate-300 hover:bg-[#1E3A5F]/30'
                    }`}
                  >
                    <Group className="w-5 h-5" />
                    <span>Faith Groups</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'explore' ? 'bg-gradient-to-r from-[#497EBC] to-[#C9A882] text-white' : 'text-slate-300 hover:bg-[#1E3A5F]/30'
                    }`}
                  >
                    <Compass className="w-5 h-5" />
                    <span>Explore</span>
                  </button>
                </nav>
              </div>
            </Card>

            {/* Faith Groups Quick Access */}
            <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
              background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
              boxShadow: '0 0 0 1px rgba(201, 168, 130, 0.3), 0 4px 12px rgba(0, 0, 0, 0.12)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
              <div className="relative">
                <h3 className="text-white mb-4">My Groups</h3>
                <div className="space-y-2">
                  {faithGroups.filter(g => g.isJoined).slice(0, 5).map(group => (
                    <button
                      key={group.id}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E3A5F]/30 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: group.color + '20' }}>
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          {group.faithTradition.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm truncate">{group.name}</div>
                        <div className="text-slate-400 text-xs">{group.memberCount} members</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Center - Main Feed */}
          <div className="lg:col-span-6 space-y-4">
            {/* Create Post */}
            {currentUser && (
              <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
                background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
              }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                <div className="relative flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#497EBC]/30 to-[#FFD369]/30">
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="w-full text-left px-4 py-3 bg-[#0B1426] border border-[#1E3A5F]/50 rounded-lg text-slate-400 hover:border-[#497EBC]/50 transition-colors"
                    >
                      What's on your mind, {currentUser.name.split(' ')[0]}?
                    </button>
                    <div className="flex items-center gap-4 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                        onClick={() => setShowCreatePost(true)}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Photo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                        onClick={() => setShowCreatePost(true)}
                      >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Link
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-10 bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
              />
            </div>

            {/* Posts Feed */}
            <AnimatePresence mode="wait">
              {activeTab === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {filteredPosts.length === 0 ? (
                    <Card className="relative rounded-3xl text-white border-0 overflow-hidden p-12" style={{
                      background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                      boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
                    }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                      <div className="relative text-center">
                        <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-white text-lg mb-2">No posts yet</h3>
                        <p className="text-slate-400 mb-4">Be the first to share something!</p>
                        <Button
                          onClick={() => setShowCreatePost(true)}
                          className="bg-gradient-to-r from-[#497EBC] to-[#C9A882]"
                        >
                          <PenSquare className="w-4 h-4 mr-2" />
                          Create Post
                        </Button>
                      </div>
                    </Card>
                  ) : (
                    filteredPosts.map((post, index) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onLike={() => likePost(post.id)}
                        onShare={() => sharePost(post.id)}
                        onComment={() => setSelectedPost(post)}
                        index={index}
                      />
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'groups' && (
                <motion.div
                  key="groups"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Explore Faiths Button */}
                  <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
                    background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                    boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
                  }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="text-white mb-1">Explore Faith Traditions</h3>
                        <p className="text-slate-400 text-sm">Discover 12 spiritual paths in depth</p>
                      </div>
                      <Button
                        onClick={() => onNavigate?.('circle')}
                        className="bg-gradient-to-r from-[#497EBC] to-[#C9A882]"
                      >
                        <Compass className="w-4 h-4 mr-2" />
                        Explore
                      </Button>
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 gap-4">
                    {faithGroups.map((group, index) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        onJoin={() => joinGroup(group.id)}
                        onLeave={() => leaveGroup(group.id)}
                        onView={() => onNavigate?.('group-detail', { groupId: group.id })}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar - Suggestions */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
              background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
              boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
              <div className="relative">
                <h3 className="text-white mb-4">Suggested Groups</h3>
                <div className="space-y-3">
                  {faithGroups.filter(g => !g.isJoined).slice(0, 3).map(group => (
                    <div key={group.id} className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: group.color + '20' }}
                      >
                        <span className="text-lg">{group.faithTradition.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm">{group.name}</h4>
                        <p className="text-slate-400 text-xs line-clamp-1">{group.description}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 border-[#497EBC]/50 text-[#497EBC] hover:bg-[#497EBC]/10"
                          onClick={() => joinGroup(group.id)}
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="relative rounded-3xl border-0 overflow-hidden p-4" style={{
              background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
              boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
              <div className="relative">
                <h3 className="text-white mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {['#prayer', '#meditation', '#gratitude', '#wisdom', '#faith'].map(tag => (
                    <button
                      key={tag}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1E3A5F]/30 transition-colors"
                    >
                      <div className="text-[#497EBC]">{tag}</div>
                      <div className="text-slate-400 text-xs">2.4k posts</div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
        content={postContent}
        setContent={setPostContent}
      />

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={() => likePost(selectedPost.id)}
          onAddComment={(content) => {
            if (currentUser) {
              addComment({
                postId: selectedPost.id,
                authorId: currentUser.id,
                authorName: currentUser.name,
                authorUsername: currentUser.username,
                authorAvatar: currentUser.avatar,
                content,
              });
            }
          }}
          comments={getCommentsForPost(selectedPost.id)}
        />
      )}
    </div>
  );
}

// Post Card Component
interface PostCardProps {
  post: Post;
  onLike: () => void;
  onShare: () => void;
  onComment: () => void;
  index: number;
}

function PostCard({ post, onLike, onShare, onComment, index }: PostCardProps) {
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="relative rounded-3xl text-white border-0 overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(73,126,188,0.3)]" style={{
        background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
        boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.authorAvatar} />
                <AvatarFallback className="bg-gradient-to-br from-[#497EBC]/30 to-[#FFD369]/30">
                  {post.authorName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-white">{post.authorName}</div>
                <div className="text-slate-400 text-sm flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {formatTime(post.timestamp)}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <p className="text-slate-200 mb-4">{post.content}</p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-slate-600 text-slate-400">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 border-t border-[#1E3A5F]/30 pt-4">
            <button
              onClick={onLike}
              className={`flex items-center gap-2 hover:text-[#FF6B35] transition-colors ${
                post.hasLiked ? 'text-[#FF6B35]' : 'text-slate-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={onComment}
              className="flex items-center gap-2 text-slate-400 hover:text-[#7A4FFF] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            <button
              onClick={onShare}
              className={`flex items-center gap-2 hover:text-[#C9A882] transition-colors ${
                post.hasShared ? 'text-[#C9A882]' : 'text-slate-400'
              }`}
            >
              <Share2 className="w-5 h-5" />
              <span>{post.shares}</span>
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Group Card Component
interface GroupCardProps {
  group: FaithGroup;
  onJoin: () => void;
  onLeave: () => void;
  onView?: () => void;
  index: number;
}

function GroupCard({ group, onJoin, onLeave, onView, index }: GroupCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="relative rounded-3xl text-white border-0 overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(122,79,255,0.3)]" style={{
        background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
        boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A4FFF]/8 to-transparent opacity-80" />
        
        {/* Cover Photo */}
        <div 
          className="relative h-32 cursor-pointer" 
          style={{ backgroundColor: group.color + '20' }}
          onClick={onView}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#162844]/80" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-xl">{group.name}</h3>
          </div>
        </div>
        
        <div className="relative p-6">
          <p className="text-slate-300 text-sm mb-4">{group.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-400">
              <Users className="w-4 h-4 inline mr-1" />
              {group.memberCount} members
            </div>
            <div className="text-sm text-slate-400">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              {group.postCount} posts
            </div>
          </div>

          <div className="flex gap-2">
            {group.isJoined ? (
              <Button
                onClick={onLeave}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300"
              >
                Leave Group
              </Button>
            ) : (
              <Button
                onClick={onJoin}
                className="flex-1 bg-gradient-to-r from-[#7A4FFF] to-[#C9A882]"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Join Group
              </Button>
            )}
            {onView && (
              <Button
                onClick={onView}
                variant="outline"
                className="border-[#7A4FFF]/50 text-[#7A4FFF]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Create Post Modal
interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  content: string;
  setContent: (content: string) => void;
}

function CreatePostModal({ isOpen, onClose, onSubmit, content, setContent }: CreatePostModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Create Post</DialogTitle>
          <DialogDescription className="text-slate-400">
            Share your thoughts with the community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white min-h-32"
            maxLength={1000}
          />

          <div className="flex items-center justify-between">
            <div className="text-slate-400 text-sm">
              {content.length}/1000
            </div>
            <div className="flex gap-2">
              <Button onClick={onClose} variant="outline" className="border-slate-600 text-slate-300">
                Cancel
              </Button>
              <Button
                onClick={onSubmit}
                className="bg-gradient-to-r from-[#7A4FFF] to-[#C9A882]"
                disabled={!content.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Post Detail Modal
interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
  onLike: () => void;
  onAddComment: (content: string) => void;
  comments: any[];
}

function PostDetailModal({ post, onClose, onLike, onAddComment, comments }: PostDetailModalProps) {
  const [commentContent, setCommentContent] = useState('');

  const handleSubmitComment = () => {
    if (!commentContent.trim()) return;
    onAddComment(commentContent);
    setCommentContent('');
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/50 max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Post by {post.authorName}</DialogTitle>
          <DialogDescription>View post content and community comments</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Post Header */}
          <div className="flex items-start gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={post.authorAvatar} />
              <AvatarFallback className="bg-gradient-to-br from-[#7A4FFF]/30 to-[#FFD369]/30">
                {post.authorName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-white">{post.authorName}</div>
              <div className="text-slate-400 text-sm">{formatTime(post.timestamp)}</div>
            </div>
          </div>

          {/* Post Content */}
          <p className="text-slate-200">{post.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-6 border-y border-[#1E3A5F]/30 py-4">
            <button
              onClick={onLike}
              className={`flex items-center gap-2 hover:text-[#FF6B35] transition-colors ${
                post.hasLiked ? 'text-[#FF6B35]' : 'text-slate-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center gap-2 text-slate-400">
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
            </div>
          </div>

          {/* Add Comment */}
          <div className="space-y-3">
            <Textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              className="bg-[#162844]/60 border-[#1E3A5F]/50 text-white"
            />
            <Button
              onClick={handleSubmitComment}
              className="bg-gradient-to-r from-[#7A4FFF] to-[#4CAF50]"
              disabled={!commentContent.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Comment
            </Button>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <h3 className="text-white">Comments ({comments.length})</h3>
            {comments.map(comment => (
              <div key={comment.id} className="bg-[#162844]/40 border border-[#1E3A5F]/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.authorAvatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#7A4FFF]/30 to-[#4CAF50]/30">
                      {comment.authorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm">{comment.authorName}</span>
                      <span className="text-slate-500 text-xs">•</span>
                      <span className="text-slate-400 text-xs">{formatTime(comment.timestamp)}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{comment.content}</p>
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