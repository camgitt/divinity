import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useSocialMedia, Post, FaithGroup } from "./social-media-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useHapticFeedback } from "./hooks/use-haptic";
import { toast } from "sonner@2.0.3";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Heart,
  Share2,
  PenSquare,
  Clock,
  TrendingUp,
  Send,
  Image as ImageIcon,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  Info,
  Shield,
  BookOpen,
  CalendarDays,
  Award
} from "lucide-react";

// Import faith symbols
import crossSymbolImage from 'figma:asset/b44167e6091487c7bc1ff72e9a70c5c1154c0a0a.png';
import starCrescentImage from 'figma:asset/df9ac2b88e7f75002855a82d0ca7b003f6f961c4.png';
import jewishStarImage from 'figma:asset/e2020c35261f80ef64b0d52af9babc23f58c0f26.png';
import dharmaWheelImage from 'figma:asset/4a1c4d32bad39322659f08685efcfd135dd2b561.png';
import toriiGateImage from 'figma:asset/bde1450d9d31d6ac819fc94a7943e467402ce923.png';
import ahimsaHandImage from 'figma:asset/7dc002689f83346c020bf1c6c800b3f09778f4cf.png';
import confucianSymbolImage from 'figma:asset/fb5ffdb7f71e1376c95a81fcec09a4046458e86a.png';
import hinduOmImage from 'figma:asset/fc363bf8713e2e810f69904b94bbd531b064ce0f.png';
import yinYangImage from 'figma:asset/51a7d0e6d1a6647dca02517899785892471e556b.png';
import circularCrossImage from 'figma:asset/4bea3d46cd4bef578aa7fe848e2106b3b7e7b181.png';
import khandaSymbolImage from 'figma:asset/1cda2d7f6a67b44acf470f38cd964150e10093ee.png';
import ninePointedStarImage from 'figma:asset/a13a3708168a7e3e76185b69927e1442dff12a8c.png';

// Faith tradition to symbol mapping
const faithSymbolMap: Record<string, string> = {
  'christianity': crossSymbolImage,
  'islam': starCrescentImage,
  'judaism': jewishStarImage,
  'buddhism': dharmaWheelImage,
  'shinto': toriiGateImage,
  'jainism': ahimsaHandImage,
  'confucianism': confucianSymbolImage,
  'hinduism': hinduOmImage,
  'taoism': yinYangImage,
  'daoism': yinYangImage,
  'polytheism': circularCrossImage,
  'sikhism': khandaSymbolImage,
  'bahai': ninePointedStarImage,
};

interface FaithGroupDetailPageProps {
  groupId: string;
  onNavigate?: (page: string, data?: any) => void;
  onBack?: () => void;
}

// Helper function to get faith symbol
const getFaithSymbol = (faithTradition: string): string => {
  return faithSymbolMap[faithTradition.toLowerCase()] || circularCrossImage;
};

export function FaithGroupDetailPage({ groupId, onNavigate, onBack }: FaithGroupDetailPageProps) {
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
    getGroupPosts,
  } = useSocialMedia();
  const haptic = useHapticFeedback();

  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'members'>('posts');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentContent, setCommentContent] = useState('');

  // Find the group
  const group = faithGroups.find(g => g.id === groupId);
  
  if (!group) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-300 text-xl mb-4">Group not found</p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Get group color (faith-specific)
  const groupColor = group.color || '#7A4FFF';

  // Default cover photos for specific groups
  const defaultCoverPhotos: Record<string, string> = {
    'judaism-group': 'https://images.unsplash.com/photo-1612388839403-4d732790455b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3JhaCUyMHNjcm9sbCUyMHN5bmFnb2d1ZXxlbnwxfHx8fDE3NjE1MzE5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  // Get cover photo (use group's cover photo, or default for specific groups, or fallback to gradient)
  const coverPhoto = group.coverPhoto || defaultCoverPhotos[group.id];

  // Get posts for this group
  const groupPosts = getGroupPosts(groupId).sort((a, b) => b.timestamp - a.timestamp);

  // Handle create post
  const handleCreatePost = () => {
    if (!postContent.trim() || !currentUser) {
      haptic.error();
      toast.error('Please enter some content');
      return;
    }

    haptic.success();
    createPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      content: postContent,
      type: 'status',
      visibility: 'public',
      tags: [group.faithTradition],
      faithTradition: group.faithTradition,
      groupId: group.id,
    });

    setPostContent('');
    setShowCreatePost(false);
    toast.success('Post shared in ' + group.name);
  };

  // Handle join/leave
  const handleJoinLeave = () => {
    haptic.impact();
    if (group.isJoined) {
      leaveGroup(group.id);
      toast.success(`Left ${group.name}`);
    } else {
      joinGroup(group.id);
      toast.success(`Joined ${group.name}!`, {
        description: "You're now part of this spiritual community."
      });
    }
  };

  // Handle like post
  const handleLikePost = (postId: string) => {
    haptic.impact();
    likePost(postId);
  };

  // Handle share post
  const handleSharePost = (postId: string) => {
    haptic.success();
    sharePost(postId);
    toast.success('Post shared!');
  };

  // Handle add comment
  const handleAddComment = (postId: string) => {
    if (!commentContent.trim() || !currentUser) {
      haptic.error();
      toast.error('Please enter a comment');
      return;
    }

    haptic.success();
    addComment({
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      content: commentContent,
    });

    setCommentContent('');
    setSelectedPost(null);
    toast.success('Comment added');
  };

  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#0B1426] text-white pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426] via-[#162844] to-[#0B1426]" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${groupColor}33, transparent 70%)`
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at 70% 80%, ${groupColor}22, transparent 60%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Cover Photo */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          {coverPhoto ? (
            <ImageWithFallback
              src={coverPhoto}
              alt={group.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div 
              className="w-full h-full relative"
              style={{ 
                background: `linear-gradient(135deg, ${groupColor}22 0%, ${groupColor}11 50%, ${groupColor}22 100%)`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <ImageWithFallback
                  src={getFaithSymbol(group.faithTradition)}
                  alt={`${group.name} symbol`}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1426]/50 to-[#0B1426]" />
          
          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="bg-[#0B1426]/80 hover:bg-[#0B1426] backdrop-blur-sm border border-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>

          {/* Group Avatar & Basic Info */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#0B1426] shadow-xl bg-[#162844]">
                <div 
                  className="w-full h-full flex items-center justify-center p-4"
                  style={{ backgroundColor: `${groupColor}33` }}
                >
                  <ImageWithFallback
                    src={getFaithSymbol(group.faithTradition)}
                    alt={`${group.name} symbol`}
                    className="w-full h-full object-contain opacity-90"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
                  />
                </div>
              </div>
              <div className="flex-1 pb-2">
                <h1 className="text-2xl sm:text-3xl mb-1">{group.name}</h1>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {group.memberCount.toLocaleString()} members
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {group.postCount.toLocaleString()} posts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-4 border-b border-[#1E3A5F]/40">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {group.isJoined ? (
                <Badge 
                  className="border px-4 py-2"
                  style={{ 
                    backgroundColor: `${groupColor}33`,
                    borderColor: `${groupColor}66`,
                    color: groupColor
                  }}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Member
                </Badge>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleJoinLeave}
                className="shadow-lg"
                style={{
                  backgroundColor: group.isJoined ? 'transparent' : groupColor,
                  color: group.isJoined ? groupColor : 'white',
                  borderColor: groupColor,
                  borderWidth: group.isJoined ? '1px' : '0'
                }}
                variant={group.isJoined ? 'outline' : 'default'}
              >
                {group.isJoined ? (
                  <>
                    <UserMinus className="w-4 h-4 mr-2" />
                    Leave Group
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join Group
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#162844]/60 border border-[#1E3A5F]/40 mb-6">
                <TabsTrigger 
                  value="posts"
                  className="data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Posts
                </TabsTrigger>
                <TabsTrigger 
                  value="about"
                  className="data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white"
                >
                  <Info className="w-4 h-4 mr-2" />
                  About
                </TabsTrigger>
                <TabsTrigger 
                  value="members"
                  className="data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Members
                </TabsTrigger>
              </TabsList>

              {/* Posts Tab */}
              <TabsContent value="posts" className="space-y-6">
                {/* Create Post */}
                {group.isJoined && currentUser && (
                  <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 p-6">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback style={{ backgroundColor: `${groupColor}33`, color: groupColor }}>
                          {currentUser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        {showCreatePost ? (
                          <div className="space-y-3">
                            <Textarea
                              value={postContent}
                              onChange={(e) => setPostContent(e.target.value)}
                              placeholder={`Share something with ${group.name}...`}
                              className="min-h-[100px] bg-[#0B1426]/60 border-[#1E3A5F]/40"
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={handleCreatePost}
                                style={{ backgroundColor: groupColor }}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Post
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setShowCreatePost(false);
                                  setPostContent('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowCreatePost(true)}
                            className="w-full text-left px-4 py-3 rounded-lg bg-[#0B1426]/60 border border-[#1E3A5F]/40 text-slate-400 hover:border-[#1E3A5F] transition-colors"
                          >
                            Share your thoughts...
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                )}

                {/* Posts Feed */}
                {groupPosts.length > 0 ? (
                  <div className="space-y-4">
                    {groupPosts.map((post) => (
                      <Card key={post.id} className="bg-[#162844]/40 border-[#1E3A5F]/40 p-6">
                        {/* Post Header */}
                        <div className="flex items-start gap-3 mb-4">
                          <Avatar>
                            <AvatarImage src={post.authorAvatar} />
                            <AvatarFallback style={{ backgroundColor: `${groupColor}33`, color: groupColor }}>
                              {post.authorName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white">{post.authorName}</p>
                                <p className="text-slate-400 text-sm">@{post.authorUsername}</p>
                              </div>
                              <span className="text-slate-400 text-sm">{formatTimestamp(post.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <p className="text-slate-200 mb-4 whitespace-pre-wrap">{post.content}</p>

                        {/* Post Stats & Actions */}
                        <div className="flex items-center gap-6 text-slate-400 text-sm">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className="flex items-center gap-2 hover:text-red-400 transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-red-400 text-red-400' : ''}`} />
                            {post.likes}
                          </button>
                          <button
                            onClick={() => setSelectedPost(post)}
                            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                          >
                            <MessageCircle className="w-5 h-5" />
                            {post.comments}
                          </button>
                          <button
                            onClick={() => handleSharePost(post.id)}
                            className="flex items-center gap-2 hover:text-green-400 transition-colors"
                          >
                            <Share2 className="w-5 h-5" />
                            {post.shares}
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 p-12 text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400 text-lg mb-2">No posts yet</p>
                    <p className="text-slate-500">
                      {group.isJoined 
                        ? 'Be the first to share something!' 
                        : 'Join the group to see and create posts'}
                    </p>
                  </Card>
                )}
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 p-6">
                  <h3 className="text-xl mb-4 flex items-center" style={{ color: groupColor }}>
                    <BookOpen className="w-5 h-5 mr-2" />
                    About This Group
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">{group.description}</p>

                  {group.rules && group.rules.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#1E3A5F]/40">
                      <h4 className="flex items-center mb-4" style={{ color: groupColor }}>
                        <Shield className="w-5 h-5 mr-2" />
                        Community Guidelines
                      </h4>
                      <ul className="space-y-3">
                        {group.rules.map((rule, index) => (
                          <li key={index} className="flex items-start text-slate-300">
                            <span className="mr-3 mt-1" style={{ color: groupColor }}>•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-[#1E3A5F]/40">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[#0B1426]/60 rounded-lg">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">Members</span>
                        </div>
                        <p className="text-2xl" style={{ color: groupColor }}>
                          {group.memberCount.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-[#0B1426]/60 rounded-lg">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Posts</span>
                        </div>
                        <p className="text-2xl" style={{ color: groupColor }}>
                          {group.postCount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Members Tab */}
              <TabsContent value="members" className="space-y-6">
                <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 p-12 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400 text-lg mb-2">Member Directory</p>
                  <p className="text-slate-500">
                    Connect with {group.memberCount.toLocaleString()} members of this community
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Comment Dialog */}
      <AnimatePresence>
        {selectedPost && (
          <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
            <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/40 max-w-lg">
              <DialogHeader className="sr-only">
                <DialogTitle>Post Comments</DialogTitle>
                <DialogDescription>View and add comments to this post</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <h3 className="text-xl">Comments</h3>
                
                {/* Existing Comments */}
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {getCommentsForPost(selectedPost.id).map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.authorAvatar} />
                        <AvatarFallback style={{ backgroundColor: `${groupColor}33`, color: groupColor }}>
                          {comment.authorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-slate-400">@{comment.authorUsername}</p>
                        <p className="text-slate-200">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                {currentUser && (
                  <div className="flex gap-3 pt-4 border-t border-[#1E3A5F]/40">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback style={{ backgroundColor: `${groupColor}33`, color: groupColor }}>
                        {currentUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Write a comment..."
                        className="mb-2 bg-[#162844]/60 border-[#1E3A5F]/40"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddComment(selectedPost.id);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddComment(selectedPost.id)}
                        style={{ backgroundColor: groupColor }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
