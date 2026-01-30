import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar?: string;
  isAnonymous: boolean;
  faithTradition: string;
  category: 'discussion' | 'question' | 'wisdom' | 'testimony';
  title: string;
  content: string;
  tags: string[];
  likes: number;
  replies: number;
  timestamp: number;
  hasLiked?: boolean;
  featured?: boolean;
  verified?: boolean; // For verified leaders
}

export interface CommunityReply {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar?: string;
  isAnonymous: boolean;
  content: string;
  likes: number;
  timestamp: number;
  hasLiked?: boolean;
  verified?: boolean;
}

interface CommunityContextType {
  posts: CommunityPost[];
  replies: CommunityReply[];
  createPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'likes' | 'replies'>) => void;
  createReply: (reply: Omit<CommunityReply, 'id' | 'timestamp' | 'likes'>) => void;
  likePost: (postId: string) => void;
  likeReply: (replyId: string) => void;
  getPostsByFaith: (faith: string) => CommunityPost[];
  getPostsByCategory: (category: string) => CommunityPost[];
  getRepliesForPost: (postId: string) => CommunityReply[];
  reportPost: (postId: string, reason: string) => void;
  userStats: {
    postsCreated: number;
    repliesCreated: number;
    likesReceived: number;
    reputationScore: number;
  };
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

// Sample seed data for demonstration
const samplePosts: CommunityPost[] = [
  {
    id: '1',
    authorName: 'Sarah M.',
    isAnonymous: false,
    faithTradition: 'christianity',
    category: 'question',
    title: 'How do you maintain daily prayer during busy seasons?',
    content: 'I struggle to find time for prayer with work and family commitments. What practices help you stay consistent?',
    tags: ['prayer', 'daily-practice', 'time-management'],
    likes: 24,
    replies: 12,
    timestamp: Date.now() - 3600000 * 5,
    featured: true,
  },
  {
    id: '2',
    authorName: 'Anonymous Seeker',
    isAnonymous: true,
    faithTradition: 'buddhism',
    category: 'wisdom',
    title: 'Finding peace in impermanence',
    content: 'Through meditation, I have learned that accepting change does not mean giving up hope. It means embracing each moment as it comes.',
    tags: ['meditation', 'mindfulness', 'impermanence'],
    likes: 89,
    replies: 23,
    timestamp: Date.now() - 3600000 * 12,
    featured: true,
  },
  {
    id: '3',
    authorName: 'Ahmed K.',
    isAnonymous: false,
    faithTradition: 'islam',
    category: 'discussion',
    title: 'Beautiful reflection on Surah Ar-Rahman',
    content: 'The repetition of "Which of the favors of your Lord will you deny?" reminds us to practice gratitude daily.',
    tags: ['quran', 'gratitude', 'reflection'],
    likes: 56,
    replies: 18,
    timestamp: Date.now() - 3600000 * 8,
  },
  {
    id: '4',
    authorName: 'Priya S.',
    isAnonymous: false,
    faithTradition: 'hinduism',
    category: 'question',
    title: 'Best time for morning meditation?',
    content: 'I want to establish a morning sadhana practice. Do you meditate before or after sunrise? What works best for you?',
    tags: ['meditation', 'sadhana', 'morning-routine'],
    likes: 31,
    replies: 15,
    timestamp: Date.now() - 3600000 * 2,
  },
  {
    id: '5',
    authorName: 'David L.',
    isAnonymous: false,
    faithTradition: 'judaism',
    category: 'wisdom',
    title: 'Learning from the Sabbath rest',
    content: 'Shabbat taught me that rest is not laziness but sacred. We honor our work by also honoring our rest.',
    tags: ['shabbat', 'rest', 'wisdom', 'work-life-balance'],
    likes: 67,
    replies: 21,
    timestamp: Date.now() - 3600000 * 24,
  },
  {
    id: '6',
    authorName: 'Anonymous Pilgrim',
    isAnonymous: true,
    faithTradition: 'sikhism',
    category: 'testimony',
    title: 'Seva changed my perspective on service',
    content: 'Volunteering at the Gurdwara langar taught me that true service is done without expectation. The joy comes from giving itself.',
    tags: ['seva', 'service', 'langar', 'selflessness'],
    likes: 42,
    replies: 9,
    timestamp: Date.now() - 3600000 * 6,
  },
];

const sampleReplies: CommunityReply[] = [
  {
    id: 'r1',
    postId: '1',
    authorName: 'Michael T.',
    isAnonymous: false,
    content: 'I set a phone reminder for 7 AM and 7 PM. Even just 5 minutes makes a difference!',
    likes: 8,
    timestamp: Date.now() - 3600000 * 4,
  },
  {
    id: 'r2',
    postId: '1',
    authorName: 'Anonymous',
    isAnonymous: true,
    content: 'Try praying while commuting or during lunch breaks. God meets us wherever we are.',
    likes: 12,
    timestamp: Date.now() - 3600000 * 3,
  },
  {
    id: 'r3',
    postId: '2',
    authorName: 'Karma W.',
    isAnonymous: false,
    content: 'This resonates deeply. Impermanence is not our enemy but our teacher.',
    likes: 15,
    timestamp: Date.now() - 3600000 * 11,
  },
];

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [replies, setReplies] = useState<CommunityReply[]>([]);
  const [userStats, setUserStats] = useState({
    postsCreated: 0,
    repliesCreated: 0,
    likesReceived: 0,
    reputationScore: 0,
  });

  // Initialize with sample data and load from localStorage
  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem('divinityagi_community_posts');
      const storedReplies = localStorage.getItem('divinityagi_community_replies');
      const storedStats = localStorage.getItem('divinityagi_community_stats');

      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        // Initialize with sample data
        setPosts(samplePosts);
        localStorage.setItem('divinityagi_community_posts', JSON.stringify(samplePosts));
      }

      if (storedReplies) {
        setReplies(JSON.parse(storedReplies));
      } else {
        setReplies(sampleReplies);
        localStorage.setItem('divinityagi_community_replies', JSON.stringify(sampleReplies));
      }

      if (storedStats) {
        setUserStats(JSON.parse(storedStats));
      }
    } catch (e) {
      console.error('Failed to load community data:', e);
      setPosts(samplePosts);
      setReplies(sampleReplies);
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    try {
      localStorage.setItem('divinityagi_community_posts', JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save posts:', e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem('divinityagi_community_replies', JSON.stringify(replies));
    } catch (e) {
      console.error('Failed to save replies:', e);
    }
  }, [replies]);

  useEffect(() => {
    try {
      localStorage.setItem('divinityagi_community_stats', JSON.stringify(userStats));
    } catch (e) {
      console.error('Failed to save stats:', e);
    }
  }, [userStats]);

  const createPost = (postData: Omit<CommunityPost, 'id' | 'timestamp' | 'likes' | 'replies'>) => {
    const newPost: CommunityPost = {
      ...postData,
      id: `post_${Date.now()}`,
      timestamp: Date.now(),
      likes: 0,
      replies: 0,
    };

    setPosts(prev => [newPost, ...prev]);
    setUserStats(prev => ({
      ...prev,
      postsCreated: prev.postsCreated + 1,
      reputationScore: prev.reputationScore + 5,
    }));

    toast.success('Your post has been shared with the community!');
  };

  const createReply = (replyData: Omit<CommunityReply, 'id' | 'timestamp' | 'likes'>) => {
    const newReply: CommunityReply = {
      ...replyData,
      id: `reply_${Date.now()}`,
      timestamp: Date.now(),
      likes: 0,
    };

    setReplies(prev => [...prev, newReply]);
    
    // Increment reply count on the post
    setPosts(prev => prev.map(post => 
      post.id === replyData.postId 
        ? { ...post, replies: post.replies + 1 }
        : post
    ));

    setUserStats(prev => ({
      ...prev,
      repliesCreated: prev.repliesCreated + 1,
      reputationScore: prev.reputationScore + 2,
    }));

    toast.success('Your reply has been posted!');
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasLiked = post.hasLiked || false;
        return {
          ...post,
          likes: hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !hasLiked,
        };
      }
      return post;
    }));
  };

  const likeReply = (replyId: string) => {
    setReplies(prev => prev.map(reply => {
      if (reply.id === replyId) {
        const hasLiked = reply.hasLiked || false;
        return {
          ...reply,
          likes: hasLiked ? reply.likes - 1 : reply.likes + 1,
          hasLiked: !hasLiked,
        };
      }
      return reply;
    }));
  };

  const getPostsByFaith = (faith: string) => {
    return posts.filter(post => post.faithTradition === faith);
  };

  const getPostsByCategory = (category: string) => {
    return posts.filter(post => post.category === category);
  };

  const getRepliesForPost = (postId: string) => {
    return replies.filter(reply => reply.postId === postId)
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const reportPost = (postId: string, reason: string) => {
    toast.success('Thank you for reporting. Our moderation team will review this post.');
    console.log(`Post ${postId} reported for: ${reason}`);
  };

  return (
    <CommunityContext.Provider
      value={{
        posts,
        replies,
        createPost,
        createReply,
        likePost,
        likeReply,
        getPostsByFaith,
        getPostsByCategory,
        getRepliesForPost,
        reportPost,
        userStats,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within CommunityProvider');
  }
  return context;
}
