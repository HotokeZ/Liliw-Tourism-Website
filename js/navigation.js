// Navigation JavaScript - Reusable across all pages

function initNavigation() {
    console.log('Navigation loaded');

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
        document.body.style.overflow = '';
        // Close any open submenus
        document.querySelectorAll('.mobile-nav-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }

    // Desktop Dropdown Toggle (Click and Delayed Hover)
    const desktopDropdowns = document.querySelectorAll('.nav-item-dropdown');
    let hoverTimeout;

    desktopDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        // Click handler - immediate toggle
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                const wasOpen = dropdown.classList.contains('show');
                
                // Close all other dropdowns
                document.querySelectorAll('.nav-item-dropdown.show').forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('show');
                    }
                });
                
                // Toggle current dropdown
                if (wasOpen) {
                    dropdown.classList.remove('show');
                } else {
                    dropdown.classList.add('show');
                }
            });
        }
        
        // Delayed hover handler (500ms)
        dropdown.addEventListener('mouseenter', function() {
            // Don't trigger hover if already open via click
            if (!dropdown.classList.contains('show')) {
                hoverTimeout = setTimeout(() => {
                    dropdown.classList.add('hover-show');
                }, 500);
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);
            dropdown.classList.remove('hover-show');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item-dropdown')) {
            document.querySelectorAll('.nav-item-dropdown.show').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // Mobile Submenu Toggle
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('.mobile-nav-item');
            const wasActive = parent.classList.contains('active');
            
            // Close all other submenus
            document.querySelectorAll('.mobile-nav-item.active').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current submenu
            if (wasActive) {
                parent.classList.remove('active');
            } else {
                parent.classList.add('active');
            }
        });
    });

    // Search Modal
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 300);
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', closeSearchModal);
    }

    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }

    function closeSearchModal() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeSearchModal();
        }
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            console.log('Searching for:', query);
            // TODO: Implement actual search functionality
        });
    }

    // Set active page indicator
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page') || 
                        link.getAttribute('href').replace('.html', '').replace('/', '');
        
        if (currentPage === linkPage || 
            (currentPage === 'index' && linkPage === 'homepage') ||
            (currentPage === '' && linkPage === 'homepage')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Sticky navigation on scroll
    let lastScroll = 0;
    const nav = document.getElementById('mainNavigation');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });

        // Add transition for smooth hide/show
        nav.style.transition = 'transform 0.3s ease';
    }
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    // DOM is already ready, run immediately
    initNavigation();
}

// Function to highlight current page (can be called from individual pages)
function setActivePage(pageName) {
    document.body.setAttribute('data-page', pageName);
}

// Fix for Android back button blank page issue
// Force reload when page is restored from bfcache
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was restored from bfcache, force reload
        console.log('Page restored from cache, reloading...');
        window.location.reload();
    }
});

// Also handle visibility change (when user returns to tab)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible again
        // Check if body content is empty or not properly loaded
        if (document.body.children.length === 0 || 
            !document.querySelector('.homepage-content, .attractions-content, .events-content, .map-content')) {
            console.log('Page content missing, reloading...');
            window.location.reload();
        }
    }
});
