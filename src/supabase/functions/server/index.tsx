import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Health check
app.get('/make-server-444fb8a2/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Community Posts endpoints
app.get('/make-server-444fb8a2/posts', async (c) => {
  try {
    const faithGroup = c.req.query('faithGroup');
    const allPosts = await kv.getByPrefix('post:');
    
    let filteredPosts = allPosts;
    if (faithGroup && faithGroup !== 'all') {
      filteredPosts = allPosts.filter((post: any) => post.faithGroup === faithGroup);
    }
    
    // Sort by timestamp descending
    filteredPosts.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return c.json(filteredPosts);
  } catch (error: any) {
    console.log('Error fetching posts:', error);
    return c.json({ error: 'Failed to fetch posts', details: error.message }, 500);
  }
});

app.post('/make-server-444fb8a2/posts', async (c) => {
  try {
    const body = await c.req.json();
    const { content, author, faithGroup, imageUrl } = body;
    
    if (!content || !author || !faithGroup) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    const postId = `post:${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const post = {
      id: postId,
      content,
      author,
      faithGroup,
      imageUrl: imageUrl || null,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: []
    };
    
    await kv.set(postId, post);
    return c.json(post, 201);
  } catch (error: any) {
    console.log('Error creating post:', error);
    return c.json({ error: 'Failed to create post', details: error.message }, 500);
  }
});

app.post('/make-server-444fb8a2/posts/:id/like', async (c) => {
  try {
    const postId = c.req.param('id');
    const { userId } = await c.req.json();
    
    const post = await kv.get(postId);
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    const likedBy = post.likedBy || [];
    const hasLiked = likedBy.includes(userId);
    
    if (hasLiked) {
      post.likedBy = likedBy.filter((id: string) => id !== userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy = [...likedBy, userId];
      post.likes = (post.likes || 0) + 1;
    }
    
    await kv.set(postId, post);
    return c.json(post);
  } catch (error: any) {
    console.log('Error liking post:', error);
    return c.json({ error: 'Failed to like post', details: error.message }, 500);
  }
});

app.post('/make-server-444fb8a2/posts/:id/comment', async (c) => {
  try {
    const postId = c.req.param('id');
    const { author, content } = await c.req.json();
    
    const post = await kv.get(postId);
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    const comment = {
      id: `comment:${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      author,
      content,
      timestamp: new Date().toISOString()
    };
    
    post.comments = [...(post.comments || []), comment];
    await kv.set(postId, post);
    
    return c.json(post);
  } catch (error: any) {
    console.log('Error adding comment:', error);
    return c.json({ error: 'Failed to add comment', details: error.message }, 500);
  }
});

app.delete('/make-server-444fb8a2/posts/:id', async (c) => {
  try {
    const postId = c.req.param('id');
    await kv.del(postId);
    return c.json({ success: true });
  } catch (error: any) {
    console.log('Error deleting post:', error);
    return c.json({ error: 'Failed to delete post', details: error.message }, 500);
  }
});

// User Profile endpoints
app.get('/make-server-444fb8a2/profile/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const profile = await kv.get(`profile:${userId}`);
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    return c.json(profile);
  } catch (error: any) {
    console.log('Error fetching profile:', error);
    return c.json({ error: 'Failed to fetch profile', details: error.message }, 500);
  }
});

app.post('/make-server-444fb8a2/profile', async (c) => {
  try {
    const body = await c.req.json();
    const { userId, name, bio, faithGroup, avatarUrl } = body;
    
    if (!userId || !name) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    const profile = {
      userId,
      name,
      bio: bio || '',
      faithGroup: faithGroup || '',
      avatarUrl: avatarUrl || null,
      joinedDate: new Date().toISOString(),
      postsCount: 0,
      followersCount: 0
    };
    
    await kv.set(`profile:${userId}`, profile);
    return c.json(profile, 201);
  } catch (error: any) {
    console.log('Error creating profile:', error);
    return c.json({ error: 'Failed to create profile', details: error.message }, 500);
  }
});

app.put('/make-server-444fb8a2/profile/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const updates = await c.req.json();
    
    const profile = await kv.get(`profile:${userId}`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    const updatedProfile = { ...profile, ...updates };
    await kv.set(`profile:${userId}`, updatedProfile);
    
    return c.json(updatedProfile);
  } catch (error: any) {
    console.log('Error updating profile:', error);
    return c.json({ error: 'Failed to update profile', details: error.message }, 500);
  }
});

// Spiritual Guides endpoints
app.get('/make-server-444fb8a2/guides/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const guide = await kv.get(`guide:${userId}`);
    
    if (!guide) {
      return c.json({ error: 'Guide not found' }, 404);
    }
    
    return c.json(guide);
  } catch (error: any) {
    console.log('Error fetching guide:', error);
    return c.json({ error: 'Failed to fetch guide', details: error.message }, 500);
  }
});

app.post('/make-server-444fb8a2/guides', async (c) => {
  try {
    const body = await c.req.json();
    const { userId, guide } = body;
    
    if (!userId || !guide) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    await kv.set(`guide:${userId}`, guide);
    return c.json(guide, 201);
  } catch (error: any) {
    console.log('Error saving guide:', error);
    return c.json({ error: 'Failed to save guide', details: error.message }, 500);
  }
});

// Saved Guides endpoints
app.get('/make-server-444fb8a2/saved-guides/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const savedGuides = await kv.get(`savedGuides:${userId}`);
    
    return c.json(savedGuides || []);
  } catch (error: any) {
    console.log('Error fetching saved guides:', error);
    return c.json({ error: 'Failed to fetch saved guides', details: error.message }, 500);
  }
});

app.post('/make-server-444fb8a2/saved-guides', async (c) => {
  try {
    const body = await c.req.json();
    const { userId, guides } = body;
    
    if (!userId || !guides) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    await kv.set(`savedGuides:${userId}`, guides);
    return c.json(guides, 201);
  } catch (error: any) {
    console.log('Error saving guides:', error);
    return c.json({ error: 'Failed to save guides', details: error.message }, 500);
  }
});

// Analytics endpoints
app.get('/make-server-444fb8a2/analytics/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const analytics = await kv.get(`analytics:${userId}`);
    
    return c.json(analytics || {});
  } catch (error: any) {
    console.log('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics', details: error.message }, 500);
  }
});

app.post('/make-server-444fb8a2/analytics', async (c) => {
  try {
    const body = await c.req.json();
    const { userId, analytics } = body;
    
    if (!userId || !analytics) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    await kv.set(`analytics:${userId}`, analytics);
    return c.json(analytics, 201);
  } catch (error: any) {
    console.log('Error saving analytics:', error);
    return c.json({ error: 'Failed to save analytics', details: error.message }, 500);
  }
});

Deno.serve(app.fetch);
