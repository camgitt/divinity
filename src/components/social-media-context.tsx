import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";

// ============================================================================
// DATA STRUCTURES
// ============================================================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  coverPhoto?: string;
  bio: string;
  location?: string;
  website?: string;
  faithTradition: string;
  interests: string[];
  joinedDate: number;
  isVerified?: boolean;
  stats: {
    posts: number;
    followers: number;
    following: number;
    reputation: number;
  };
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorUsername: string;
  content: string;
  images?: string[];
  link?: string;
  faithTradition?: string;
  groupId?: string; // If posted in a group
  type: 'status' | 'image' | 'link' | 'poll' | 'event';
  likes: number;
  comments: number;
  shares: number;
  timestamp: number;
  hasLiked?: boolean;
  hasShared?: boolean;
  visibility: 'public' | 'friends' | 'private';
  tags: string[];
  location?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorUsername: string;
  content: string;
  likes: number;
  timestamp: number;
  hasLiked?: boolean;
  replies: Comment[];
}

export interface FaithGroup {
  id: string;
  name: string;
  description: string;
  faithTradition: string;
  avatar: string;
  coverPhoto: string;
  type: 'public' | 'private' | 'secret';
  memberCount: number;
  postCount: number;
  admins: string[];
  moderators: string[];
  members: string[];
  joinedDate?: number;
  isJoined?: boolean;
  rules: string[];
  color: string;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'post' | 'comment' | 'like' | 'follow' | 'join_group' | 'share';
  content: string;
  targetId?: string;
  timestamp: number;
}

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  timestamp: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'group_invite' | 'friend_request';
  content: string;
  actorId: string;
  actorName: string;
  actorAvatar?: string;
  targetId?: string;
  timestamp: number;
  read: boolean;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  read: boolean;
}

// ============================================================================
// CONTEXT TYPE
// ============================================================================

interface SocialMediaContextType {
  // Current User
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile) => void;
  
  // Posts
  posts: Post[];
  createPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => void;
  editPost: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  sharePost: (postId: string) => void;
  
  // Comments
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'timestamp' | 'likes' | 'replies'>) => void;
  likeComment: (commentId: string) => void;
  getCommentsForPost: (postId: string) => Comment[];
  
  // Faith Groups
  faithGroups: FaithGroup[];
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  createGroupPost: (groupId: string, content: string) => void;
  getGroupPosts: (groupId: string) => Post[];
  
  // Friends/Following
  friendships: Friendship[];
  sendFriendRequest: (userId: string) => void;
  acceptFriendRequest: (friendshipId: string) => void;
  removeFriend: (userId: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  getFriends: () => UserProfile[];
  getFollowers: () => UserProfile[];
  getFollowing: () => UserProfile[];
  
  // Notifications
  notifications: Notification[];
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  
  // Activity Feed
  getActivityFeed: () => Post[];
  getUserPosts: (userId: string) => Post[];
  
  // Search
  searchUsers: (query: string) => UserProfile[];
  searchPosts: (query: string) => Post[];
  searchGroups: (query: string) => FaithGroup[];
  
  // Direct Messages
  messages: DirectMessage[];
  sendMessage: (receiverId: string, content: string) => void;
  getConversation: (userId: string) => DirectMessage[];
}

// ============================================================================
// CONTEXT
// ============================================================================

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

export function SocialMediaProvider({ children }: { children: React.ReactNode }) {
  // Load current user from localStorage
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('divinityagi_user');
      if (stored) {
        const user = JSON.parse(stored);
        
        // Ensure stats object always exists with default values
        const defaultStats = {
          posts: 0,
          followers: 12,
          following: 24,
          reputation: 156,
        };
        
        return {
          id: user.id || '1',
          name: user.name || 'Anonymous',
          email: user.email || '',
          username: user.username || user.name?.toLowerCase().replace(/\s/g, '') || 'user',
          avatar: user.avatar,
          coverPhoto: user.coverPhoto,
          bio: user.bio || '',
          location: user.location,
          website: user.website,
          faithTradition: user.faithTradition || 'christianity',
          interests: user.interests || [],
          joinedDate: user.joinedDate || Date.now(),
          isVerified: user.isVerified || false,
          stats: {
            ...defaultStats,
            ...(user.stats || {})
          }
        };
      }
    } catch (e) {
      console.error('Failed to load user:', e);
    }
    return null;
  });

  // Initialize faith groups based on all 12 traditions
  const [faithGroups] = useState<FaithGroup[]>([
    {
      id: 'christianity-group',
      name: 'Christianity Circle',
      description: 'A community for Christians to share faith, prayer requests, and biblical wisdom.',
      faithTradition: 'christianity',
      avatar: '/faith-symbols/cross.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1629143949694-606987575b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjaHJpc3RpYW4lMjB3b3JzaGlwfGVufDF8fHx8MTc2MTU0MjA2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 1247,
      postCount: 3456,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: true,
      rules: [
        'Respectful discussion of Christian faith and practices',
        'No promotion of hate or discrimination',
        'Share prayer requests and testimonies freely'
      ],
      color: '#E53935'
    },
    {
      id: 'islam-group',
      name: 'Islam Circle',
      description: 'Connect with fellow Muslims for spiritual growth, Quranic insights, and community support.',
      faithTradition: 'islam',
      avatar: '/faith-symbols/crescent.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1600383963284-91ef78fc9b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBJc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MTUzMjg0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 982,
      postCount: 2134,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Respectful discussion of Islamic teachings',
        'Quranic reflections and hadith sharing welcome',
        'Support each other in the path of Islam'
      ],
      color: '#2E7D32'
    },
    {
      id: 'hinduism-group',
      name: 'Hinduism Circle',
      description: 'Explore Vedic wisdom, yoga philosophy, and Hindu spiritual practices together.',
      faithTradition: 'hinduism',
      avatar: '/faith-symbols/om.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW5kdSUyMHRlbXBsZSUyMHNhY3JlZHxlbnwxfHx8fDE3NjE1MzI4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 734,
      postCount: 1876,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Share teachings from Vedas, Upanishads, and Gita',
        'Discuss yoga, meditation, and dharma',
        'Respect all paths within Hindu tradition'
      ],
      color: '#F4511E'
    },
    {
      id: 'buddhism-group',
      name: 'Buddhism Circle',
      description: 'Walk the Noble Eightfold Path together through mindfulness, meditation, and compassion.',
      faithTradition: 'buddhism',
      avatar: '/faith-symbols/dharma-wheel.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1688935455227-85136cc9b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzYxNTMyODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 1089,
      postCount: 2987,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Practice right speech and compassion',
        'Share insights on dharma and meditation',
        'Support each other in mindfulness practice'
      ],
      color: '#F9A825'
    },
    {
      id: 'judaism-group',
      name: 'Judaism Circle',
      description: 'Study Torah, celebrate traditions, and strengthen Jewish community bonds.',
      faithTradition: 'judaism',
      avatar: '/faith-symbols/star-of-david.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1612388839403-4d732790455b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3JhaCUyMHNjcm9sbCUyMHN5bmFnb2d1ZXxlbnwxfHx8fDE3NjE1MzE5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 567,
      postCount: 1432,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Torah study and Jewish learning',
        'Celebrate holidays and traditions',
        'Respect all denominations of Judaism'
      ],
      color: '#1565C0'
    },
    {
      id: 'sikhism-group',
      name: 'Sikhism Circle',
      description: 'Connect through Gurbani, seva, and the teachings of the Guru Granth Sahib.',
      faithTradition: 'sikhism',
      avatar: '/faith-symbols/khanda.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1621377099913-ac1ec4848e52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjB0ZW1wbGUlMjBzaWtoaXNtfGVufDF8fHx8MTc2MTU0MTI2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 423,
      postCount: 876,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Share Gurbani and Sikh wisdom',
        'Discuss seva and community service',
        'Respect Sikh values and principles'
      ],
      color: '#F57F17'
    },
    {
      id: 'taoism-group',
      name: 'Taoism Circle',
      description: 'Flow with the Tao through wu wei, balance, and natural harmony.',
      faithTradition: 'taoism',
      avatar: '/faith-symbols/yin-yang.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1703222422237-b056400ac9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW9pc3QlMjB0ZW1wbGUlMjBuYXR1cmV8ZW58MXx8fHwxNzYxNTQyMDMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 345,
      postCount: 723,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Explore Tao Te Ching teachings',
        'Share practices of wu wei and balance',
        'Respect the natural flow of Tao'
      ],
      color: '#212121'
    },
    {
      id: 'shinto-group',
      name: 'Shinto Circle',
      description: 'Honor kami, celebrate nature, and share Japanese spiritual traditions.',
      faithTradition: 'shinto',
      avatar: '/faith-symbols/torii.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1667722540871-421aeb3cdc2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3JpaSUyMGdhdGUlMjBzaHJpbmV8ZW58MXx8fHwxNjE1NDIwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 289,
      postCount: 534,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Respect kami and natural spirits',
        'Share Shinto practices and festivals',
        'Honor Japanese spiritual traditions'
      ],
      color: '#E64A19'
    },
    {
      id: 'jainism-group',
      name: 'Jainism Circle',
      description: 'Practice ahimsa, meditation, and the path of non-violence together.',
      faithTradition: 'jainism',
      avatar: '/faith-symbols/jain-symbol.svg',
      coverPhoto: 'figma:asset/919d6c04ff947a94531581645e567cf7cb4edfa2.png',
      type: 'public',
      memberCount: 234,
      postCount: 467,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Practice and discuss ahimsa (non-violence)',
        'Share Jain teachings and meditation',
        'Support vegetarian and ethical living'
      ],
      color: '#B8858F'
    },
    {
      id: 'bahai-group',
      name: 'Bahá\'í Circle',
      description: 'Unite humanity through the teachings of Bahá\'u\'lláh and service to all.',
      faithTradition: 'bahai',
      avatar: '/faith-symbols/bahai-star.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1642661720955-13ee9063cdee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWhhaSUyMGdhcmRlbnMlMjB0ZW1wbGV8ZW58MXx8fHwxNzYxNTQxMjY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 198,
      postCount: 389,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Promote unity and oneness of humanity',
        'Share Bahá\'í writings and principles',
        'Service to humanity and social justice'
      ],
      color: '#9C27B0'
    },
    {
      id: 'confucianism-group',
      name: 'Confucianism Circle',
      description: 'Cultivate virtue, harmony, and wisdom through Confucian teachings.',
      faithTradition: 'confucianism',
      avatar: '/faith-symbols/confucian-symbol.svg',
      coverPhoto: 'https://images.unsplash.com/photo-1571422657236-d89a11b1cc3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mdWNpYW4lMjB0ZW1wbGUlMjBjaGluYXxlbnwxfHx8fDE3NjE1NDEyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'public',
      memberCount: 267,
      postCount: 512,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Discuss Analects and Confucian wisdom',
        'Cultivate virtue and proper conduct',
        'Respect family and social harmony'
      ],
      color: '#5D4037'
    },
    {
      id: 'polytheism-group',
      name: 'Polytheism Circle',
      description: 'Honor ancient traditions and diverse pantheons from around the world.',
      faithTradition: 'polytheism',
      avatar: '/faith-symbols/polytheism.svg',
      coverPhoto: 'figma:asset/accb037c8cb348d07830f83e4cb7b69ef5490d7f.png',
      type: 'public',
      memberCount: 445,
      postCount: 891,
      admins: ['1'],
      moderators: [],
      members: [],
      isJoined: false,
      rules: [
        'Respect all pantheons and traditions',
        'Share myths, rituals, and practices',
        'Honor ancient wisdom and deities'
      ],
      color: '#9B7DAB'
    }
  ]);

  const [posts, setPosts] = useState<Post[]>(() => {
    // Sample posts for demonstration
    return [
      {
        id: '1',
        authorId: '1',
        authorName: 'Sarah Mitchell',
        authorUsername: 'sarahmitchell',
        content: 'Finding peace in morning prayer has transformed my daily routine. Grateful for this community! 🙏',
        faithTradition: 'christianity',
        type: 'status',
        likes: 42,
        comments: 8,
        shares: 3,
        timestamp: Date.now() - 3600000,
        visibility: 'public',
        tags: ['prayer', 'gratitude'],
      },
      {
        id: '2',
        authorId: '2',
        authorName: 'Ahmed Hassan',
        authorUsername: 'ahmedhassan',
        content: 'Ramadan Mubarak to all our Muslim brothers and sisters! May this blessed month bring you closer to Allah.',
        faithTradition: 'islam',
        type: 'status',
        likes: 87,
        comments: 15,
        shares: 12,
        timestamp: Date.now() - 7200000,
        visibility: 'public',
        tags: ['ramadan', 'islam'],
      },
    ];
  });

  const [comments, setComments] = useState<Comment[]>([]);
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<DirectMessage[]>([]);

  // Save current user to localStorage when updated
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('divinityagi_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // ============================================================================
  // POSTS
  // ============================================================================

  const createPost = (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts(prev => [newPost, ...prev]);
    
    // Update user stats
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        stats: { ...currentUser.stats, posts: currentUser.stats.posts + 1 }
      });
    }
    
    toast.success('Post shared successfully!');
  };

  const editPost = (postId: string, content: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, content } : p));
    toast.success('Post updated');
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    toast.success('Post deleted');
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
          hasLiked: !p.hasLiked
        };
      }
      return p;
    }));
  };

  const sharePost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, shares: p.shares + 1, hasShared: true } : p));
    toast.success('Post shared!');
  };

  // ============================================================================
  // COMMENTS
  // ============================================================================

  const addComment = (comment: Omit<Comment, 'id' | 'timestamp' | 'likes' | 'replies'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      timestamp: Date.now(),
      likes: 0,
      replies: [],
    };
    setComments(prev => [...prev, newComment]);
    setPosts(prev => prev.map(p => p.id === comment.postId ? { ...p, comments: p.comments + 1 } : p));
    toast.success('Comment added');
  };

  const likeComment = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.hasLiked ? c.likes - 1 : c.likes + 1,
          hasLiked: !c.hasLiked
        };
      }
      return c;
    }));
  };

  const getCommentsForPost = (postId: string) => {
    return comments.filter(c => c.postId === postId);
  };

  // ============================================================================
  // FAITH GROUPS
  // ============================================================================

  const joinGroup = (groupId: string) => {
    const group = faithGroups.find(g => g.id === groupId);
    if (group) {
      group.isJoined = true;
      group.memberCount++;
      toast.success(`Joined ${group.name}!`);
    }
  };

  const leaveGroup = (groupId: string) => {
    const group = faithGroups.find(g => g.id === groupId);
    if (group) {
      group.isJoined = false;
      group.memberCount--;
      toast.success(`Left ${group.name}`);
    }
  };

  const createGroupPost = (groupId: string, content: string) => {
    if (!currentUser) return;
    createPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      content,
      groupId,
      type: 'status',
      visibility: 'public',
      tags: [],
    });
  };

  const getGroupPosts = (groupId: string) => {
    return posts.filter(p => p.groupId === groupId);
  };

  // ============================================================================
  // FRIENDS/FOLLOWING
  // ============================================================================

  const sendFriendRequest = (userId: string) => {
    const newFriendship: Friendship = {
      id: Date.now().toString(),
      userId: currentUser?.id || '1',
      friendId: userId,
      status: 'pending',
      timestamp: Date.now(),
    };
    setFriendships(prev => [...prev, newFriendship]);
    toast.success('Friend request sent');
  };

  const acceptFriendRequest = (friendshipId: string) => {
    setFriendships(prev => prev.map(f => f.id === friendshipId ? { ...f, status: 'accepted' as const } : f));
    toast.success('Friend request accepted');
  };

  const removeFriend = (userId: string) => {
    setFriendships(prev => prev.filter(f => f.friendId !== userId));
    toast.success('Friend removed');
  };

  const followUser = (userId: string) => {
    sendFriendRequest(userId);
  };

  const unfollowUser = (userId: string) => {
    removeFriend(userId);
  };

  const getFriends = () => {
    // Return mock friends for now
    return [];
  };

  const getFollowers = () => {
    return [];
  };

  const getFollowing = () => {
    return [];
  };

  // ============================================================================
  // NOTIFICATIONS
  // ============================================================================

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // ============================================================================
  // ACTIVITY FEED
  // ============================================================================

  const getActivityFeed = () => {
    // Show all public posts, sorted by timestamp
    return posts
      .filter(p => p.visibility === 'public')
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(p => p.authorId === userId);
  };

  // ============================================================================
  // SEARCH
  // ============================================================================

  const searchUsers = (query: string) => {
    // Mock search - in real app would query backend
    return [];
  };

  const searchPosts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return posts.filter(p => 
      p.content.toLowerCase().includes(lowerQuery) ||
      p.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
  };

  const searchGroups = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return faithGroups.filter(g => 
      g.name.toLowerCase().includes(lowerQuery) ||
      g.description.toLowerCase().includes(lowerQuery)
    );
  };

  // ============================================================================
  // DIRECT MESSAGES
  // ============================================================================

  const sendMessage = (receiverId: string, content: string) => {
    if (!currentUser) return;
    const newMessage: DirectMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: Date.now(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
    toast.success('Message sent');
  };

  const getConversation = (userId: string) => {
    if (!currentUser) return [];
    return messages.filter(m => 
      (m.senderId === currentUser.id && m.receiverId === userId) ||
      (m.senderId === userId && m.receiverId === currentUser.id)
    ).sort((a, b) => a.timestamp - b.timestamp);
  };

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const value: SocialMediaContextType = {
    currentUser,
    setCurrentUser,
    posts,
    createPost,
    editPost,
    deletePost,
    likePost,
    sharePost,
    comments,
    addComment,
    likeComment,
    getCommentsForPost,
    faithGroups,
    joinGroup,
    leaveGroup,
    createGroupPost,
    getGroupPosts,
    friendships,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    followUser,
    unfollowUser,
    getFriends,
    getFollowers,
    getFollowing,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    getActivityFeed,
    getUserPosts,
    searchUsers,
    searchPosts,
    searchGroups,
    messages,
    sendMessage,
    getConversation,
  };

  return (
    <SocialMediaContext.Provider value={value}>
      {children}
    </SocialMediaContext.Provider>
  );
}

export function useSocialMedia() {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
}