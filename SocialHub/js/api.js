// API Layer - Social Media Platform
// All operations use localStorage (mock database)
// Ready to connect to real backend

class SocialAPI {
  // ==================== AUTH ====================

  static async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const user = db.users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const currentUser = { ...user };
          delete currentUser.password;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          localStorage.setItem('authToken', 'token_' + Date.now());
          resolve(currentUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  }

  static async register(name, email, password, username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        
        if (db.users.find(u => u.email === email || u.username === username)) {
          reject(new Error('Email or username already exists'));
          return;
        }

        const newUser = {
          id: db.users.length + 1,
          username: username,
          email: email,
          password: password,
          name: name,
          bio: '',
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop',
          followers: 0,
          following: 0,
          posts: 0,
          joinDate: new Date().toISOString().split('T')[0],
          isVerified: false
        };

        db.users.push(newUser);
        db.followers[newUser.id] = [];
        db.following[newUser.id] = [];
        db.postLikes[newUser.id] = [];

        saveDatabase(db);

        const currentUser = { ...newUser };
        delete currentUser.password;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('authToken', 'token_' + Date.now());

        resolve(currentUser);
      }, 500);
    });
  }

  static logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  }

  static getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  static isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
  }

  // ==================== USERS ====================

  static async getUser(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const user = db.users.find(u => u.id === userId);
        if (user) {
          const userData = { ...user };
          delete userData.password;
          resolve(userData);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  }

  static async getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const user = db.users.find(u => u.username === username);
        if (user) {
          const userData = { ...user };
          delete userData.password;
          resolve(userData);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  }

  static async getAllUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const users = db.users.map(u => {
          const userData = { ...u };
          delete userData.password;
          return userData;
        });
        resolve(users);
      }, 300);
    });
  }

  static async updateProfile(userId, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const user = db.users.find(u => u.id === userId);
        if (user) {
          Object.assign(user, updates);
          saveDatabase(db);
          resolve(user);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  }

  static async searchUsers(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const results = db.users.filter(u => 
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.username.toLowerCase().includes(query.toLowerCase())
        );
        const users = results.map(u => {
          const userData = { ...u };
          delete userData.password;
          return userData;
        });
        resolve(users);
      }, 300);
    });
  }

  // ==================== POSTS ====================

  static async getPosts(limit = 10) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const posts = db.posts.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
        resolve(posts);
      }, 400);
    });
  }

  static async getUserPosts(userId, limit = 10) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const posts = db.posts
          .filter(p => p.userId === userId)
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, limit);
        resolve(posts);
      }, 300);
    });
  }

  static async getPost(postId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const post = db.posts.find(p => p.id === postId);
        if (post) {
          resolve(post);
        } else {
          reject(new Error('Post not found'));
        }
      }, 200);
    });
  }

  static async createPost(userId, content, image = null) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!content.trim()) {
          reject(new Error('Post content cannot be empty'));
          return;
        }

        const db = getDatabase();
        
        // Extract hashtags from content
        const hashtagRegex = /#[\w]+/g;
        const hashtags = (content.match(hashtagRegex) || []).map(tag => tag.substring(1).toLowerCase());

        const newPost = {
          id: Math.max(...db.posts.map(p => p.id), 0) + 1,
          userId: userId,
          content: content,
          image: image,
          hashtags: hashtags,
          timestamp: Date.now(),
          likes: 0,
          comments: 0,
          shares: 0,
          isLiked: false,
          isEdited: false
        };

        db.posts.unshift(newPost);
        db.users.find(u => u.id === userId).posts += 1;
        
        // Update trending hashtags
        hashtags.forEach(tag => {
          const existing = db.trendingHashtags.find(h => h.tag === tag);
          if (existing) {
            existing.posts += 1;
          } else {
            db.trendingHashtags.push({ tag: tag, posts: 1, trend: 'up' });
          }
        });

        saveDatabase(db);
        resolve(newPost);
      }, 300);
    });
  }

  static async deletePost(postId, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const postIndex = db.posts.findIndex(p => p.id === postId);
        
        if (postIndex === -1) {
          reject(new Error('Post not found'));
          return;
        }

        const post = db.posts[postIndex];
        if (post.userId !== userId) {
          reject(new Error('Cannot delete other user\'s post'));
          return;
        }

        db.posts.splice(postIndex, 1);
        db.users.find(u => u.id === userId).posts -= 1;
        
        // Remove associated comments
        db.comments = db.comments.filter(c => c.postId !== postId);
        
        saveDatabase(db);
        resolve();
      }, 300);
    });
  }

  static async editPost(postId, userId, content, image = null) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!content.trim()) {
          reject(new Error('Post content cannot be empty'));
          return;
        }

        const db = getDatabase();
        const post = db.posts.find(p => p.id === postId);
        
        if (!post) {
          reject(new Error('Post not found'));
          return;
        }

        if (post.userId !== userId) {
          reject(new Error('Cannot edit other user\'s post'));
          return;
        }

        // Extract hashtags
        const hashtagRegex = /#[\w]+/g;
        const hashtags = (content.match(hashtagRegex) || []).map(tag => tag.substring(1).toLowerCase());

        post.content = content;
        post.image = image || post.image;
        post.hashtags = hashtags;
        post.isEdited = true;
        
        saveDatabase(db);
        resolve(post);
      }, 300);
    });
  }

  // ==================== COMMENTS ====================

  static async getPostComments(postId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const comments = db.comments.filter(c => c.postId === postId);
        resolve(comments);
      }, 300);
    });
  }

  static async addComment(postId, userId, content) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!content.trim()) {
          reject(new Error('Comment cannot be empty'));
          return;
        }

        const db = getDatabase();
        const post = db.posts.find(p => p.id === postId);
        
        if (!post) {
          reject(new Error('Post not found'));
          return;
        }

        const newComment = {
          id: Math.max(...db.comments.map(c => c.id), 0) + 1,
          postId: postId,
          userId: userId,
          content: content,
          timestamp: Date.now(),
          likes: 0,
          isLiked: false
        };

        db.comments.push(newComment);
        post.comments += 1;
        saveDatabase(db);

        resolve(newComment);
      }, 300);
    });
  }

  static async deleteComment(commentId, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const commentIndex = db.comments.findIndex(c => c.id === commentId);
        
        if (commentIndex === -1) {
          reject(new Error('Comment not found'));
          return;
        }

        const comment = db.comments[commentIndex];
        if (comment.userId !== userId) {
          reject(new Error('Cannot delete other user\'s comment'));
          return;
        }

        const post = db.posts.find(p => p.id === comment.postId);
        if (post) {
          post.comments -= 1;
        }

        db.comments.splice(commentIndex, 1);
        saveDatabase(db);
        resolve();
      }, 300);
    });
  }

  // ==================== LIKES ====================

  static async likePost(postId, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const post = db.posts.find(p => p.id === postId);
        
        if (!post) {
          reject(new Error('Post not found'));
          return;
        }

        if (!db.postLikes[postId]) {
          db.postLikes[postId] = [];
        }

        if (!db.postLikes[postId].includes(userId)) {
          db.postLikes[postId].push(userId);
          post.likes += 1;
          post.isLiked = true;
        }

        saveDatabase(db);
        resolve(post);
      }, 200);
    });
  }

  static async unlikePost(postId, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const post = db.posts.find(p => p.id === postId);
        
        if (!post) {
          reject(new Error('Post not found'));
          return;
        }

        if (db.postLikes[postId]) {
          const index = db.postLikes[postId].indexOf(userId);
          if (index > -1) {
            db.postLikes[postId].splice(index, 1);
            post.likes -= 1;
            post.isLiked = false;
          }
        }

        saveDatabase(db);
        resolve(post);
      }, 200);
    });
  }

  static async isPostLiked(postId, userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const isLiked = db.postLikes[postId] && db.postLikes[postId].includes(userId);
        resolve(isLiked);
      }, 100);
    });
  }

  // ==================== FOLLOW ====================

  static async followUser(userId, targetUserId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        
        if (!db.following[userId]) db.following[userId] = [];
        if (!db.followers[targetUserId]) db.followers[targetUserId] = [];

        if (!db.following[userId].includes(targetUserId)) {
          db.following[userId].push(targetUserId);
          db.followers[targetUserId].push(userId);
          
          const user = db.users.find(u => u.id === userId);
          const target = db.users.find(u => u.id === targetUserId);
          
          if (user) user.following += 1;
          if (target) target.followers += 1;
        }

        saveDatabase(db);
        resolve();
      }, 300);
    });
  }

  static async unfollowUser(userId, targetUserId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();

        if (db.following[userId]) {
          const idx = db.following[userId].indexOf(targetUserId);
          if (idx > -1) db.following[userId].splice(idx, 1);
        }

        if (db.followers[targetUserId]) {
          const idx = db.followers[targetUserId].indexOf(userId);
          if (idx > -1) db.followers[targetUserId].splice(idx, 1);
        }

        const user = db.users.find(u => u.id === userId);
        const target = db.users.find(u => u.id === targetUserId);
        
        if (user && user.following > 0) user.following -= 1;
        if (target && target.followers > 0) target.followers -= 1;

        saveDatabase(db);
        resolve();
      }, 300);
    });
  }

  static async isFollowing(userId, targetUserId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const isFollowing = db.following[userId] && db.following[userId].includes(targetUserId);
        resolve(isFollowing);
      }, 100);
    });
  }

  static async getFollowers(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const followerIds = db.followers[userId] || [];
        const followers = followerIds.map(id => {
          const user = db.users.find(u => u.id === id);
          const userData = { ...user };
          delete userData.password;
          return userData;
        });
        resolve(followers);
      }, 300);
    });
  }

  static async getFollowing(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const followingIds = db.following[userId] || [];
        const following = followingIds.map(id => {
          const user = db.users.find(u => u.id === id);
          const userData = { ...user };
          delete userData.password;
          return userData;
        });
        resolve(following);
      }, 300);
    });
  }

  // ==================== MESSAGES ====================

  static async getMessages(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const messages = db.messages.filter(m => m.recipientId === userId || m.senderId === userId);
        resolve(messages);
      }, 300);
    });
  }

  static async sendMessage(senderId, recipientId, content) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!content.trim()) {
          reject(new Error('Message cannot be empty'));
          return;
        }

        const db = getDatabase();
        const newMessage = {
          id: Math.max(...db.messages.map(m => m.id), 0) + 1,
          senderId: senderId,
          recipientId: recipientId,
          content: content,
          timestamp: Date.now(),
          isRead: false
        };

        db.messages.push(newMessage);
        saveDatabase(db);
        resolve(newMessage);
      }, 200);
    });
  }

  // ==================== NOTIFICATIONS ====================

  static async getNotifications(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const notifications = db.notifications.filter(n => n.userId === userId);
        resolve(notifications);
      }, 300);
    });
  }

  static async markNotificationAsRead(notificationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const notification = db.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
          saveDatabase(db);
        }
        resolve();
      }, 200);
    });
  }

  // ==================== HASHTAGS & TRENDING ====================

  static async getTrendingHashtags(limit = 10) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const trending = db.trendingHashtags
          .sort((a, b) => b.posts - a.posts)
          .slice(0, limit);
        resolve(trending);
      }, 300);
    });
  }

  static async getPostsByHashtag(hashtag) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const posts = db.posts.filter(p => 
          p.hashtags && p.hashtags.includes(hashtag.toLowerCase())
        );
        resolve(posts.sort((a, b) => b.timestamp - a.timestamp));
      }, 300);
    });
  }

  static async searchHashtags(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const results = db.trendingHashtags.filter(h => 
          h.tag.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results.sort((a, b) => b.posts - a.posts));
      }, 300);
    });
  }

  // ==================== MESSAGING CONVERSATIONS ====================

  static async getConversations(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const userMessages = db.messages.filter(m => 
          m.senderId === userId || m.recipientId === userId
        );

        // Group by conversation
        const conversations = {};
        userMessages.forEach(msg => {
          const otherUserId = msg.senderId === userId ? msg.recipientId : msg.senderId;
          const convKey = [userId, otherUserId].sort().join('_');
          
          if (!conversations[convKey]) {
            conversations[convKey] = {
              userId: otherUserId,
              lastMessage: msg.content,
              lastTimestamp: msg.timestamp,
              unreadCount: msg.recipientId === userId && !msg.isRead ? 1 : 0,
              messages: []
            };
          } else {
            if (msg.recipientId === userId && !msg.isRead) {
              conversations[convKey].unreadCount += 1;
            }
          }
          conversations[convKey].messages.push(msg);
        });

        const conversationList = Object.values(conversations)
          .sort((a, b) => b.lastTimestamp - a.lastTimestamp)
          .map(conv => {
            const user = db.users.find(u => u.id === conv.userId);
            return {
              userId: conv.userId,
              user: user ? {
                id: user.id,
                name: user.name,
                username: user.username,
                avatar: user.avatar
              } : null,
              lastMessage: conv.lastMessage,
              lastTimestamp: conv.lastTimestamp,
              unreadCount: conv.unreadCount
            };
          });

        resolve(conversationList);
      }, 300);
    });
  }

  static async getConversationMessages(userId, otherUserId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const messages = db.messages.filter(m =>
          (m.senderId === userId && m.recipientId === otherUserId) ||
          (m.senderId === otherUserId && m.recipientId === userId)
        );

        // Mark messages as read
        messages.forEach(msg => {
          if (msg.recipientId === userId) {
            msg.isRead = true;
          }
        });

        saveDatabase(db);
        resolve(messages.sort((a, b) => a.timestamp - b.timestamp));
      }, 300);
    });
  }

  static async getUnreadMessageCount(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDatabase();
        const unreadCount = db.messages.filter(m => 
          m.recipientId === userId && !m.isRead
        ).length;
        resolve(unreadCount);
      }, 200);
    });
  }
}
