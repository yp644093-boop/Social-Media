// Authentication Utilities

class Auth {
  static isLoggedIn() {
    return SocialAPI.isLoggedIn();
  }

  static getCurrentUser() {
    return SocialAPI.getCurrentUser();
  }

  static requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
    }
  }

  static async logout() {
    if (confirm('Are you sure you want to logout?')) {
      SocialAPI.logout();
      window.location.href = 'login.html';
    }
  }

  static updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (this.isLoggedIn()) {
      const user = this.getCurrentUser();
      const authDiv = document.getElementById('auth-div');
      const userDiv = document.getElementById('user-div');

      if (authDiv && userDiv) {
        authDiv.style.display = 'none';
        userDiv.style.display = 'flex';
        
        const userNameEl = document.getElementById('user-name-display');
        if (userNameEl) userNameEl.textContent = user.name;
        
        const userAvatarEl = document.getElementById('user-avatar-nav');
        if (userAvatarEl) userAvatarEl.src = user.avatar;
      }
    } else {
      const authDiv = document.getElementById('auth-div');
      const userDiv = document.getElementById('user-div');

      if (authDiv && userDiv) {
        authDiv.style.display = 'flex';
        userDiv.style.display = 'none';
      }
    }
  }

  static init() {
    this.updateNavbar();
  }
}

// Initialize auth
document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});
