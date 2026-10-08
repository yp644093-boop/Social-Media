// Mock Database - Social Media Platform

const mockDatabase = {
  // Users data
  users: [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      password: 'pass123',
      name: 'John Doe',
      bio: 'Tech enthusiast & coffee lover ☕',
      avatar: 'https://i.pravatar.cc/150?img=1',
      cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop',
      followers: 245,
      following: 180,
      posts: 24,
      joinDate: '2023-01-15',
      isVerified: true
    },
    {
      id: 2,
      username: 'sarah_tech',
      email: 'sarah@example.com',
      password: 'pass123',
      name: 'Sarah Johnson',
      bio: 'Web developer | Open source enthusiast',
      avatar: 'https://i.pravatar.cc/150?img=5',
      cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      followers: 542,
      following: 234,
      posts: 67,
      joinDate: '2022-06-10',
      isVerified: true
    },
    {
      id: 3,
      username: 'mike_design',
      email: 'mike@example.com',
      password: 'pass123',
      name: 'Michael Chen',
      bio: 'UI/UX Designer | Photography 📸',
      avatar: 'https://i.pravatar.cc/150?img=3',
      cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      followers: 189,
      following: 145,
      posts: 42,
      joinDate: '2023-03-20',
      isVerified: false
    },
    {
      id: 4,
      username: 'emma_art',
      email: 'emma@example.com',
      password: 'pass123',
      name: 'Emma Wilson',
      bio: 'Digital Artist | Creative Coder 🎨',
      avatar: 'https://i.pravatar.cc/150?img=9',
      cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      followers: 312,
      following: 210,
      posts: 55,
      joinDate: '2022-11-05',
      isVerified: true
    },
    {
      id: 5,
      username: 'alex_startup',
      email: 'alex@example.com',
      password: 'pass123',
      name: 'Alex Rivera',
      bio: 'Startup founder | Entrepreneur 🚀',
      avatar: 'https://i.pravatar.cc/150?img=7',
      cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      followers: 678,
      following: 156,
      posts: 89,
      joinDate: '2022-02-14',
      isVerified: true
    },
    {
      id: 6,
      username: 'current_user',
      email: 'user@example.com',
      password: 'pass123',
      name: 'You',
      bio: 'Welcome to my profile!',
      avatar: 'https://i.pravatar.cc/150?img=11',
      cover: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop',
      followers: 45,
      following: 67,
      posts: 12,
      joinDate: '2024-01-01',
      isVerified: false
    }
  ],

  // Posts data
  posts: [
    {
      id: 1,
      userId: 5,
      content: 'Just launched our new startup! 🚀 Excited to share this journey with everyone. The hard work is just beginning! #startup #entrepreneur',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
      hashtags: ['startup', 'entrepreneur'],
      timestamp: Date.now() - 86400000 * 2,
      likes: 234,
      comments: 45,
      shares: 12,
      isLiked: false,
      isEdited: false
    },
    {
      id: 2,
      userId: 2,
      content: 'Working on an amazing new project with React and Node.js. Can\'t wait to share the details! #webdev #coding #javascript',
      image: null,
      hashtags: ['webdev', 'coding', 'javascript'],
      timestamp: Date.now() - 86400000 * 1,
      likes: 156,
      comments: 23,
      shares: 8,
      isLiked: true,
      isEdited: false
    },
    {
      id: 3,
      userId: 4,
      content: 'Finished this digital artwork today. What do you think? 🎨 #art #design #creative',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=400&fit=crop',
      hashtags: ['art', 'design', 'creative'],
      timestamp: Date.now() - 3600000 * 5,
      likes: 567,
      comments: 89,
      shares: 34,
      isLiked: true,
      isEdited: false
    },
    {
      id: 4,
      userId: 1,
      content: 'Coffee and code - the perfect combination ☕💻 #coding #programming #developer',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
      hashtags: ['coding', 'programming', 'developer'],
      timestamp: Date.now() - 3600000 * 2,
      likes: 234,
      comments: 45,
      shares: 12,
      isLiked: false,
      isEdited: false
    },
    {
      id: 5,
      userId: 3,
      content: 'New design system completed! Check out the awesome UI components we\'ve created. #ui #uxdesign #webdesign',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=400&fit=crop',
      hashtags: ['ui', 'uxdesign', 'webdesign'],
      timestamp: Date.now() - 1800000,
      likes: 345,
      comments: 56,
      shares: 18,
      isLiked: false,
      isEdited: false
    }
  ],

  // Comments data
  comments: [
    {
      id: 1,
      postId: 1,
      userId: 2,
      content: 'This is amazing! Congratulations on the launch! 🎉',
      timestamp: Date.now() - 86400000 * 2 + 3600000,
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      postId: 1,
      userId: 4,
      content: 'Wishing you all the best! Can\'t wait to see what you build.',
      timestamp: Date.now() - 86400000 * 2 + 7200000,
      likes: 8,
      isLiked: false
    },
    {
      id: 3,
      postId: 3,
      userId: 1,
      content: 'This is absolutely stunning! Your talent is incredible.',
      timestamp: Date.now() - 3600000 * 4,
      likes: 24,
      isLiked: true
    },
    {
      id: 4,
      postId: 3,
      userId: 5,
      content: 'Love the details in this piece!',
      timestamp: Date.now() - 3600000 * 3,
      likes: 15,
      isLiked: false
    }
  ],

  // Followers/Following relationships
  followers: {
    1: [2, 3, 4, 5],
    2: [1, 3, 4, 5, 6],
    3: [1, 2],
    4: [1, 2, 5],
    5: [1, 2, 3, 4, 6],
    6: [1, 2, 5]
  },

  following: {
    1: [2, 3, 4, 5],
    2: [1, 3, 4, 5],
    3: [1, 4, 5],
    4: [1, 2, 5],
    5: [1, 2, 3, 4],
    6: [1, 2, 5]
  },

  // Likes data
  postLikes: {
    1: [2, 4, 5, 6],
    2: [1, 3, 5, 6],
    3: [1, 2, 4, 5],
    4: [2, 3, 5],
    5: [1, 6]
  },

  // Direct messages
  messages: [
    {
      id: 1,
      senderId: 2,
      recipientId: 6,
      content: 'Hey! How are you doing?',
      timestamp: Date.now() - 3600000 * 3,
      isRead: true,
      conversationId: 'conv_2_6'
    },
    {
      id: 2,
      senderId: 6,
      recipientId: 2,
      content: 'Hi! I\'m doing great, thanks for asking!',
      timestamp: Date.now() - 3600000 * 2,
      isRead: true,
      conversationId: 'conv_2_6'
    },
    {
      id: 3,
      senderId: 2,
      recipientId: 6,
      content: 'That\'s awesome! Let\'s catch up soon',
      timestamp: Date.now() - 3600000 * 1,
      isRead: true,
      conversationId: 'conv_2_6'
    },
    {
      id: 4,
      senderId: 5,
      recipientId: 6,
      content: 'Want to collaborate on a project?',
      timestamp: Date.now() - 1800000,
      isRead: false,
      conversationId: 'conv_5_6'
    },
    {
      id: 5,
      senderId: 1,
      recipientId: 6,
      content: 'Check out my latest portfolio!',
      timestamp: Date.now() - 900000,
      isRead: false,
      conversationId: 'conv_1_6'
    }
  ],

  // Trending hashtags
  trendingHashtags: [
    { tag: 'webdev', posts: 1250, trend: 'up' },
    { tag: 'coding', posts: 987, trend: 'up' },
    { tag: 'design', posts: 845, trend: 'down' },
    { tag: 'startup', posts: 723, trend: 'up' },
    { tag: 'javascript', posts: 654, trend: 'up' },
    { tag: 'react', posts: 532, trend: 'stable' },
    { tag: 'ui', posts: 421, trend: 'up' },
    { tag: 'uxdesign', posts: 398, trend: 'down' }
  ],

  // Notifications
  notifications: [
    {
      id: 1,
      userId: 6,
      type: 'like',
      fromUserId: 2,
      postId: 2,
      message: 'Sarah liked your post',
      timestamp: Date.now() - 600000,
      isRead: false
    },
    {
      id: 2,
      userId: 6,
      type: 'comment',
      fromUserId: 4,
      postId: 3,
      message: 'Emma commented on your post',
      timestamp: Date.now() - 1200000,
      isRead: false
    },
    {
      id: 3,
      userId: 6,
      type: 'follow',
      fromUserId: 5,
      message: 'Alex started following you',
      timestamp: Date.now() - 1800000,
      isRead: true
    }
  ]
};

// Initialize localStorage with database
function initializeDatabase() {
  if (!localStorage.getItem('socialMediaDB')) {
    localStorage.setItem('socialMediaDB', JSON.stringify(mockDatabase));
  }
}

// Get database from localStorage
function getDatabase() {
  initializeDatabase();
  return JSON.parse(localStorage.getItem('socialMediaDB'));
}

// Save database to localStorage
function saveDatabase(db) {
  localStorage.setItem('socialMediaDB', JSON.stringify(db));
}

// Initialize on load
initializeDatabase();
