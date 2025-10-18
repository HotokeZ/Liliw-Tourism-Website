// ================================================
// PAGE TRANSITION ANIMATIONS
// Smooth page transitions and link animations
// ================================================

(function() {
    'use strict';

    // ================================================
    // SMOOTH PAGE TRANSITIONS ON LINK CLICK
    // ================================================
    
    function initPageTransitions() {
        // Get all internal navigation links
        const navLinks = document.querySelectorAll('a[href^="/"], a[href$=".html"]');
        
        navLinks.forEach(link => {
            // Skip external links and anchors
            if (link.hostname !== window.location.hostname || link.getAttribute('href').startsWith('#')) {
                return;
            }
            
            link.addEventListener('click', function(e) {
                // Skip if it's a modifier key click (new tab, etc)
                if (e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 0) {
                    return;
                }
                
                e.preventDefault();
                const destination = this.href;
                
                // Add fade out class
                document.body.classList.add('page-transition');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = destination;
                }, 300); // Match fadeOut duration in CSS
            });
        });
    }

    // ================================================
    // ANIMATED ACTIVE PAGE INDICATOR
    // Updates the sliding bar position based on active page
    // ================================================
    
    function updateActiveIndicator() {
        const currentPage = document.body.getAttribute('data-page');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Remove active class from all
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current page
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (
                (currentPage === 'homepage' && (href === 'homepage.html' || href === '/')) ||
                (currentPage === 'attractions' && href.includes('attractions.html')) ||
                (currentPage === 'events' && href.includes('events.html')) ||
                (currentPage === 'map' && href.includes('map.html'))
            ) {
                link.classList.add('active');
            }
        });
    }

    // ================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================================
    
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // ================================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // Animate elements as they enter viewport
    // ================================================
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Only observe once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections and cards
        const animatedElements = document.querySelectorAll(
            '.content-section, .attraction-card, .place-card, .event-card, .location-card'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ================================================
    // PARALLAX EFFECT ON SCROLL
    // Subtle parallax for hero sections
    // ================================================
    
    function initParallax() {
        const hero = document.querySelector('.hero, .hero-card, .event-hero');
        
        if (!hero) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const parallaxSpeed = 0.5;
                    
                    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // ================================================
    // HOVER EFFECT ENHANCEMENT
    // Add ripple effect on button clicks
    // ================================================
    
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.cta-button, .learn-more, .view-all, .btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ================================================
    // PRELOAD NEXT PAGE
    // Preload linked pages on hover for faster navigation
    // ================================================
    
    function initPreloading() {
        const navLinks = document.querySelectorAll('a[href$=".html"]');
        const preloaded = new Set();
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const href = this.href;
                
                if (!preloaded.has(href)) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                    
                    preloaded.add(href);
                }
            });
        });
    }

    // ================================================
    // LOADING INDICATOR
    // Show loading state during page transition
    // ================================================
    
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
        
        return loader;
    }

    function showLoader() {
        const loader = document.querySelector('.page-loader') || createLoader();
        loader.classList.add('active');
    }

    function hideLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.remove('active');
        }
    }

    // ================================================
    // NAVIGATION COLOR TRANSITION
    // Animate navigation background on scroll
    // ================================================
    
    function initNavColorTransition() {
        const header = document.querySelector('.site-header');
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'white';
                header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ================================================
    // INITIALIZE ALL ANIMATIONS
    // ================================================
    
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Initialize all animation features
        initPageTransitions();
        updateActiveIndicator();
        initSmoothScroll();
        initScrollAnimations();
        initParallax();
        initRippleEffect();
        initPreloading();
        initNavColorTransition();
        
        // Hide loader when page is fully loaded
        window.addEventListener('load', hideLoader);
        
        // Show animations
        document.body.style.opacity = '1';
    }

    // Start initialization
    init();

    // ================================================
    // EXPOSE FUNCTIONS FOR EXTERNAL USE
    // ================================================
    
    window.PageAnimations = {
        showLoader,
        hideLoader,
        updateActiveIndicator
    };

})();
