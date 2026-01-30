import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSocialMedia, Post } from "./social-media-context";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Clock,
  Edit2,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface UserPostsTabProps {
  userId?: string; // If not provided, shows current user's posts
}

export function UserPostsTab({ userId }: UserPostsTabProps) {
  const { currentUser, getUserPosts, posts, likePost, sharePost, deletePost } = useSocialMedia();
  const [activeFilter, setActiveFilter] = useState<'all' | 'public' | 'private'>('all');

  // Get posts for the user
  const userPosts = userId 
    ? getUserPosts(userId) 
    : currentUser 
    ? getUserPosts(currentUser.id)
    : [];

  // Filter by visibility
  const filteredPosts = userPosts.filter(post => {
    if (activeFilter === 'all') return true;
    return post.visibility === activeFilter;
  });

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
      toast.success('Post deleted');
    }
  };

  if (!currentUser) {
    return (
      <Card 
        className="relative rounded-3xl p-12 shadow-lg hover:shadow-xl transition-all duration-500"
        style={{
          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
          boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80 rounded-3xl" />
        <div className="text-center relative z-10">
          <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-white text-lg mb-2">Sign in to view posts</h3>
          <p className="text-slate-400">Create an account to share your spiritual journey</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-[#162844]/60 rounded-lg p-1">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all ${
            activeFilter === 'all'
              ? 'bg-gradient-to-r from-[#497EBC] to-[#4CAF50] text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Posts ({userPosts.length})
        </button>
        <button
          onClick={() => setActiveFilter('public')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all ${
            activeFilter === 'public'
              ? 'bg-gradient-to-r from-[#497EBC] to-[#4CAF50] text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4 inline mr-1" />
          Public
        </button>
        <button
          onClick={() => setActiveFilter('private')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all ${
            activeFilter === 'private'
              ? 'bg-gradient-to-r from-[#497EBC] to-[#4CAF50] text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <EyeOff className="w-4 h-4 inline mr-1" />
          Private
        </button>
      </div>

      {/* Posts List */}
      <AnimatePresence mode="wait">
        {filteredPosts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card 
              className="relative rounded-3xl p-12 shadow-lg hover:shadow-xl transition-all duration-500"
              style={{
                background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80 rounded-3xl" />
              <div className="text-center relative z-10">
                <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-white text-lg mb-2">No posts yet</h3>
                <p className="text-slate-400">
                  {activeFilter === 'all' 
                    ? 'Share your first thought with the community'
                    : `No ${activeFilter} posts yet`
                  }
                </p>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="posts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onLike={() => likePost(post.id)}
                onShare={() => sharePost(post.id)}
                onDelete={() => handleDeletePost(post.id)}
                formatTime={formatTime}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Post Card Component
interface PostCardProps {
  post: Post;
  currentUser: any;
  onLike: () => void;
  onShare: () => void;
  onDelete: () => void;
  formatTime: (timestamp: number) => string;
  index: number;
}

function PostCard({ post, currentUser, onLike, onShare, onDelete, formatTime, index }: PostCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const isOwnPost = post.authorId === currentUser?.id;

  const getVisibilityIcon = () => {
    switch (post.visibility) {
      case 'public':
        return <Eye className="w-3 h-3" />;
      case 'friends':
        return <MessageCircle className="w-3 h-3" />;
      case 'private':
        return <EyeOff className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        className="relative rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500"
        style={{
          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
          boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80 rounded-3xl" />
        <div className="p-6 relative z-10">
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
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="w-3 h-3" />
                  {formatTime(post.timestamp)}
                  <span>•</span>
                  {getVisibilityIcon()}
                  <span className="capitalize">{post.visibility}</span>
                </div>
              </div>
            </div>
            
            {isOwnPost && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
                
                {showMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-[#0B1426] border border-[#1E3A5F]/50 rounded-lg shadow-lg z-10 min-w-[150px]">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        toast.info('Edit feature coming soon');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-white hover:bg-[#162844] transition-colors rounded-t-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Post
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onDelete();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-400 hover:bg-[#162844] transition-colors rounded-b-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <p className="text-slate-200 mb-4">{post.content}</p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Group Badge */}
          {post.groupId && (
            <div className="mb-4">
              <Badge className="bg-[#497EBC]/20 text-[#497EBC] border-[#497EBC]/30">
                Posted in faith group
              </Badge>
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
            <button className="flex items-center gap-2 text-slate-400 hover:text-[#497EBC] transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            <button
              onClick={onShare}
              className={`flex items-center gap-2 hover:text-[#4CAF50] transition-colors ${
                post.hasShared ? 'text-[#4CAF50]' : 'text-slate-400'
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