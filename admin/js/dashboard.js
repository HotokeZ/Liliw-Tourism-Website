// Dashboard JavaScript for Liliw Tourism Admin

(function() {
    'use strict';

    // Initialize dashboard
    window.addEventListener('DOMContentLoaded', function() {
        loadDashboardData();
        updateLastUpdate();
        updatePendingImagesBadge();
        setInterval(updateLastUpdate, 60000); // Update every minute
    });

    // Load dashboard data
    function loadDashboardData() {
        // Load image count
        loadImageCount();
        
        // Load last backup time
        loadLastBackup();
        
        // Load storage info
        loadStorageInfo();
        
        // Load recent activity
        loadRecentActivity();
    }

    // Load image count
    function loadImageCount() {
        const imageCountEl = document.getElementById('imageCount');
        
        // Try to get actual image count from data file
        fetch('../data/images.json')
            .then(response => response.json())
            .then(data => {
                const count = data.images ? data.images.length : 0;
                imageCountEl.textContent = count;
            })
            .catch(() => {
                // If file doesn't exist yet, show placeholder
                imageCountEl.textContent = '0';
            });
    }

    // Load last backup time
    function loadLastBackup() {
        const lastBackupEl = document.getElementById('lastBackup');
        const backupTime = localStorage.getItem('liliw_last_backup');
        
        if (backupTime) {
            const date = new Date(backupTime);
            lastBackupEl.textContent = formatRelativeTime(date);
        } else {
            lastBackupEl.textContent = 'Never';
        }
    }

    // Load storage info
    function loadStorageInfo() {
        const storageEl = document.getElementById('storageUsed');
        
        // Estimate storage usage
        let totalSize = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length + key.length;
            }
        }
        
        const sizeInKB = (totalSize / 1024).toFixed(2);
        storageEl.textContent = `${sizeInKB} KB`;
    }

    // Load recent activity
    function loadRecentActivity() {
        const activityListEl = document.getElementById('activityList');
        const activities = JSON.parse(localStorage.getItem('liliw_activity_log') || '[]');
        
        if (activities.length === 0) {
            activityListEl.innerHTML = '<p class="no-activity">No recent activity</p>';
            return;
        }
        
        // Show last 5 activities
        const recentActivities = activities.slice(0, 5);
        activityListEl.innerHTML = recentActivities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">📌</div>
                <div class="activity-details">
                    <p class="activity-action">${activity.action}</p>
                    <p class="activity-time">${formatRelativeTime(new Date(activity.timestamp))}</p>
                </div>
            </div>
        `).join('');
        
        // Add CSS for activity items if not exists
        if (!document.getElementById('activity-styles')) {
            const style = document.createElement('style');
            style.id = 'activity-styles';
            style.textContent = `
                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px;
                    background: #f8fafc;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                .activity-item:hover {
                    background: #f1f5f9;
                    transform: translateX(5px);
                }
                .activity-icon {
                    font-size: 24px;
                }
                .activity-details {
                    flex: 1;
                }
                .activity-action {
                    font-size: 14px;
                    font-weight: 500;
                    color: #1e293b;
                    margin-bottom: 4px;
                }
                .activity-time {
                    font-size: 12px;
                    color: #64748b;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Update last update time
    function updateLastUpdate() {
        const lastUpdateEl = document.getElementById('lastUpdate');
        if (lastUpdateEl) {
            lastUpdateEl.textContent = 'Just now';
        }
    }

    // Format relative time
    function formatRelativeTime(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (seconds < 60) return 'Just now';
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString();
    }

    // Update pending images badge
    function updatePendingImagesBadge() {
        const savedImages = JSON.parse(localStorage.getItem('pendingImages') || '[]');
        const imageHelperCard = document.querySelector('a[href="image-helper.html"]');
        
        if (savedImages.length > 0 && imageHelperCard) {
            // Add badge to show pending count
            const existingBadge = imageHelperCard.querySelector('.pending-badge');
            if (!existingBadge) {
                const badge = document.createElement('span');
                badge.className = 'pending-badge';
                badge.textContent = savedImages.length;
                badge.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                `;
                imageHelperCard.style.position = 'relative';
                imageHelperCard.appendChild(badge);
            } else {
                existingBadge.textContent = savedImages.length;
            }
        }
    }

    // Export functions
    window.LiliwDashboard = {
        loadDashboardData: loadDashboardData,
        formatRelativeTime: formatRelativeTime,
        updatePendingImagesBadge: updatePendingImagesBadge
    };

})();
