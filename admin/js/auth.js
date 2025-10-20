// Authentication Handler for Liliw Tourism Admin
// Username: admin | Password: 1234Liliw

(function() {
    'use strict';

    // Hardcoded credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = '1234Liliw';
    const SESSION_KEY = 'liliw_admin_session';
    const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    // Check if user is authenticated
    function isAuthenticated() {
        const session = localStorage.getItem(SESSION_KEY);
        if (!session) return false;

        try {
            const sessionData = JSON.parse(session);
            const now = new Date().getTime();
            
            // Check if session is valid and not expired
            if (sessionData.authenticated && sessionData.expiry > now) {
                return true;
            } else {
                // Session expired, clear it
                localStorage.removeItem(SESSION_KEY);
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    // Create session
    function createSession(rememberMe) {
        const now = new Date().getTime();
        const expiry = rememberMe ? 
            now + (30 * 24 * 60 * 60 * 1000) : // 30 days if remember me
            now + SESSION_DURATION; // 24 hours otherwise

        const sessionData = {
            authenticated: true,
            username: ADMIN_USERNAME,
            loginTime: now,
            expiry: expiry
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        
        // Also log activity
        logActivity('User logged in');
    }

    // Logout function
    window.logout = function(event) {
        if (event) event.preventDefault();
        
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem(SESSION_KEY);
            logActivity('User logged out');
            window.location.href = 'index.html';
        }
    };

    // Log activity
    function logActivity(action) {
        const activities = JSON.parse(localStorage.getItem('liliw_activity_log') || '[]');
        activities.unshift({
            action: action,
            timestamp: new Date().toISOString(),
            user: ADMIN_USERNAME
        });
        
        // Keep only last 50 activities
        if (activities.length > 50) {
            activities.splice(50);
        }
        
        localStorage.setItem('liliw_activity_log', JSON.stringify(activities));
    }

    // Check authentication on page load
    window.addEventListener('DOMContentLoaded', function() {
        const currentPage = window.location.pathname;
        const isLoginPage = currentPage.includes('index.html') || currentPage.endsWith('/admin/') || currentPage.endsWith('/admin');

        if (isLoginPage) {
            // On login page - redirect if already authenticated
            if (isAuthenticated()) {
                window.location.href = 'dashboard.html';
                return;
            }

            // Handle login form submission
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    handleLogin();
                });
            }
        } else {
            // On other pages - redirect to login if not authenticated
            if (!isAuthenticated()) {
                window.location.href = 'index.html';
                return;
            }
        }

        // Setup mobile menu toggle
        setupMobileMenu();
    });

    // Handle login
    function handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        const errorMessage = document.getElementById('errorMessage');
        const loginBtn = document.querySelector('.login-btn');
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');

        // Hide error message
        errorMessage.style.display = 'none';

        // Show loader
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        loginBtn.disabled = true;

        // Simulate authentication delay (for better UX)
        setTimeout(function() {
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                // Success
                createSession(rememberMe);
                window.location.href = 'dashboard.html';
            } else {
                // Failed
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                loginBtn.disabled = false;

                errorMessage.textContent = '❌ Invalid username or password. Please try again.';
                errorMessage.style.display = 'block';

                // Shake animation
                loginBtn.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    loginBtn.style.animation = '';
                }, 500);

                // Log failed attempt
                console.warn('Failed login attempt');
            }
        }, 800);
    }

    // Setup mobile menu
    function setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                        sidebar.classList.remove('active');
                    }
                }
            });
        }
    }

    // Add shake animation to CSS if not exists
    if (!document.getElementById('shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Export functions for use in other scripts
    window.LiliwAuth = {
        isAuthenticated: isAuthenticated,
        logout: logout,
        logActivity: logActivity,
        getSession: function() {
            const session = localStorage.getItem(SESSION_KEY);
            return session ? JSON.parse(session) : null;
        }
    };
    
    // Also expose as global functions for convenience
    window.isAuthenticated = isAuthenticated;
    window.logActivity = logActivity;

})();
