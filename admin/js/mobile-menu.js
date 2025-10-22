// Universal Mobile Menu Script for All Admin Pages
// This script handles the hamburger menu toggle functionality

(function() {
    'use strict';

    console.log('🍔 Mobile menu script loaded');

    function setupMobileMenu() {
        console.log('🍔 Setting up mobile menu...');

        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');

        console.log('🍔 Menu toggle element:', menuToggle);
        console.log('🍔 Sidebar element:', sidebar);

        if (!menuToggle || !sidebar) {
            console.error('❌ Required elements missing:', { menuToggle: !!menuToggle, sidebar: !!sidebar });
            return;
        }

        // Ensure overlay exists on mobile
        let overlay = document.getElementById('adminMenuOverlay');
        function ensureOverlay() {
            if (window.innerWidth > 768) return; // overlay only needed on mobile
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'adminMenuOverlay';
                overlay.className = 'admin-menu-overlay';
                // Insert overlay before sidebar and move sidebar inside
                sidebar.parentNode.insertBefore(overlay, sidebar);
                overlay.appendChild(sidebar);
                console.log('🧱 Admin menu overlay created and sidebar moved inside');
            } else if (!overlay.contains(sidebar)) {
                overlay.appendChild(sidebar);
            }
        }

        ensureOverlay();

        function openMenu() {
            ensureOverlay();
            if (!overlay) return;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('🍔 Admin menu opened');
        }

        function closeMenu() {
            if (!overlay) return;
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('🍔 Admin menu closed');
        }

        // Toggle with hamburger
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (overlay && overlay.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Click outside to close
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && overlay && overlay.classList.contains('active')) {
                if (e.target === overlay) {
                    closeMenu();
                }
            }
        });

        // ESC to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
                closeMenu();
            }
        });

        // Handle resize: close overlay and allow normal desktop layout
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        console.log('✅ Mobile menu setup complete!');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupMobileMenu);
    } else {
        setupMobileMenu();
    }
})();
