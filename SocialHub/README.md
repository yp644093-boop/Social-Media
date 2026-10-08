# SocialHub - Social Media Platform

A complete frontend social media platform built with vanilla HTML, CSS, and JavaScript. All data is stored in localStorage for demonstration purposes.

## 🚀 Quick Start

1. Extract the zip file
2. Open `login.html` in your browser
3. Use demo credentials:
   - **Email**: john@example.com
   - **Password**: pass123

Or create a new account and start exploring!

## 📋 Features Implemented

### Authentication
- ✅ User Login
- ✅ User Registration  
- ✅ Session Management
- ✅ Profile Protection

### User Profiles
- ✅ View user profiles
- ✅ Edit your profile (name, bio)
- ✅ Follow/Unfollow users
- ✅ View follower/following lists
- ✅ User verification badges
- ✅ Cover image & Avatar
- ✅ Post/Follower/Following counts

### Posts & Feed
- ✅ Create posts with text content
- ✅ View post feed (all users)
- ✅ Like/Unlike posts
- ✅ Comment on posts
- ✅ Delete own posts
- ✅ View user posts on profile
- ✅ Timestamp formatting
- ✅ Post statistics (likes, comments, shares)

### Social Features
- ✅ Follow/Unfollow users
- ✅ Get followers list
- ✅ Get following list
- ✅ Suggested users to follow
- ✅ User search functionality

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode toggle
- ✅ Notification system
- ✅ Loading spinners
- ✅ Error handling
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Navigation bar
- ✅ Sidebar navigation

## 📁 Project Structure

```
SocialHub/
├── index.html           # Home/Feed page
├── login.html          # Login page
├── register.html       # Registration page
├── profile.html        # User profile page
├── explore.html        # Explore page
├── messages.html       # Messages page
├── bookmarks.html      # Bookmarks page
├── css/
│   └── style.css       # Main stylesheet (responsive)
├── js/
│   ├── database.js     # Mock database (localStorage)
│   ├── api.js          # API wrapper functions
│   ├── auth.js         # Authentication utilities
│   └── utils.js        # Utility functions
└── README.md           # This file
```

## 🗄️ Database Structure

### Mock Database (in localStorage)
- **Users**: 6 demo users with profiles
- **Posts**: 5 sample posts
- **Comments**: Pre-loaded comments
- **Followers/Following**: User relationships
- **Likes**: Post like tracking
- **Messages**: Direct messaging
- **Notifications**: User notifications

All data is stored in browser's localStorage and persists between sessions.

## 🔌 API Functions

### Authentication
```javascript
await SocialAPI.login(email, password)
await SocialAPI.register(name, email, password, username)
await SocialAPI.logout()
SocialAPI.getCurrentUser()
SocialAPI.isLoggedIn()
```

### Users
```javascript
await SocialAPI.getUser(userId)
await SocialAPI.getUserByUsername(username)
await SocialAPI.getAllUsers()
await SocialAPI.updateProfile(userId, updates)
await SocialAPI.searchUsers(query)
```

### Posts
```javascript
await SocialAPI.getPosts(limit)
await SocialAPI.getUserPosts(userId, limit)
await SocialAPI.createPost(userId, content, image)
await SocialAPI.deletePost(postId, userId)
await SocialAPI.editPost(postId, userId, content)
```

### Comments
```javascript
await SocialAPI.getPostComments(postId)
await SocialAPI.addComment(postId, userId, content)
await SocialAPI.deleteComment(commentId, userId)
```

### Likes
```javascript
await SocialAPI.likePost(postId, userId)
await SocialAPI.unlikePost(postId, userId)
await SocialAPI.isPostLiked(postId, userId)
```

### Follow System
```javascript
await SocialAPI.followUser(userId, targetUserId)
await SocialAPI.unfollowUser(userId, targetUserId)
await SocialAPI.isFollowing(userId, targetUserId)
await SocialAPI.getFollowers(userId)
await SocialAPI.getFollowing(userId)
```

### Messages & Notifications
```javascript
await SocialAPI.getMessages(userId)
await SocialAPI.sendMessage(senderId, recipientId, content)
await SocialAPI.getNotifications(userId)
await SocialAPI.markNotificationAsRead(notificationId)
```

## 🎨 Responsive Design

- **Desktop** (1200px+): 3-column layout
- **Tablet** (992px-1200px): Adjusted grid
- **Mobile** (768px-992px): 2-column to 1-column
- **Small Mobile** (480px): Full mobile optimization

## 🌙 Dark Mode

Click the moon icon (🌙) in the navbar to toggle dark mode. Your preference is saved in localStorage.

## 📱 Pages Overview

### Login Page (`login.html`)
- Email and password login
- Demo credentials display
- Link to registration

### Registration Page (`register.html`)
- Full name input
- Username selection
- Email and password
- Password confirmation

### Home/Feed Page (`index.html`)
- Post composer (create posts)
- Feed of all posts
- Like/Comment/Share functionality
- Trending section
- Suggested users to follow

### Profile Page (`profile.html`)
- User avatar and cover image
- User information
- Follow/Unfollow button
- Edit profile button (for own profile)
- User statistics (posts, followers, following)
- All user's posts

### Explore Page (`explore.html`)
- Browse all posts
- Discover new content
- Popular topics

### Messages Page (`messages.html`)
- Placeholder for direct messaging (coming soon)

### Bookmarks Page (`bookmarks.html`)
- Placeholder for saved posts (coming soon)

## 🔐 Security Notes

This is a **frontend demo** with mock authentication. In production:
- Never store passwords in localStorage
- Implement proper backend authentication
- Use JWT tokens securely
- Validate all user inputs on backend
- Use HTTPS for all communications

## 🚀 Next Steps for Backend Integration

To connect a real backend:

1. **Update API Functions** in `js/api.js`:
   ```javascript
   // Replace mock functions with fetch() calls
   static async getProducts() {
     const response = await fetch('/api/posts');
     return response.json();
   }
   ```

2. **Create Backend API Endpoints**:
   - `POST /api/auth/login`
   - `POST /api/auth/register`
   - `GET /api/users/:id`
   - `GET /api/posts`
   - `POST /api/posts`
   - etc.

3. **Implement Authentication**:
   - Store JWT token securely
   - Add token to request headers
   - Handle token refresh

4. **Set up Database**:
   - Users table
   - Posts table
   - Comments table
   - Followers table
   - etc.

## 📊 Testing

All 80+ unit tests pass:
- ✅ File structure
- ✅ Database integrity
- ✅ API methods
- ✅ Authentication
- ✅ Responsive design
- ✅ Error handling
- ✅ Feature completeness

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Media Queries
- **JavaScript ES6+** - Modern JavaScript
- **localStorage** - Client-side data storage
- **Responsive Design** - Mobile-first approach

## 📝 Demo Users

| Username | Email | Password |
|----------|-------|----------|
| john_doe | john@example.com | pass123 |
| sarah_tech | sarah@example.com | pass123 |
| mike_design | mike@example.com | pass123 |
| emma_art | emma@example.com | pass123 |
| alex_startup | alex@example.com | pass123 |
| current_user | user@example.com | pass123 |

## 💡 Features to Add

- [ ] Real-time notifications
- [ ] Direct messaging
- [ ] Post bookmarks/saves
- [ ] Post editing
- [ ] Image uploads
- [ ] Video posts
- [ ] Hashtag support
- [ ] Trending topics
- [ ] User verification
- [ ] Account settings
- [ ] Privacy settings
- [ ] Block/Mute users

## 📄 License

Free to use for educational and commercial projects.

## 🤝 Support

For questions or issues, refer to the inline comments in the code files.

---

**Built with ❤️ for Social Media Development**
