// Attraction Detail Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Attraction detail page loaded');

    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            alert('Search functionality coming soon!');
        });
    }

    // Learn More button functionality
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Scroll to description section
            const descriptionSection = document.querySelector('.description-section');
            if (descriptionSection) {
                descriptionSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Related attractions click handlers
    const smallCards = document.querySelectorAll('.small-card');
    smallCards.forEach(card => {
        card.addEventListener('click', function() {
            const attractionName = this.querySelector('p').textContent;
            console.log(`Clicked on: ${attractionName}`);
            // TODO: Navigate to specific attraction page
            alert(`More information about ${attractionName} coming soon!`);
        });
    });

    // Add scroll-triggered blur effect to hero image and overlay
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = heroCard.offsetHeight;
            
            // Start blurring after scrolling 100px, fully blurred at 400px
            const blurStart = 100;
            const blurEnd = 400;
            
            if (scrolled > blurStart) {
                const blurAmount = Math.min((scrolled - blurStart) / (blurEnd - blurStart), 1);
                const blurPx = blurAmount * 8; // 0 to 8px blur
                const scale = 1 + (blurAmount * 0.05); // 1 to 1.05 scale
                
                // Blur the image
                const heroImg = heroCard.querySelector('img');
                if (heroImg) {
                    heroImg.style.filter = `blur(${blurPx}px)`;
                    heroImg.style.transform = `scale(${scale})`;
                }
                
                // Blur the overlay (text and button)
                const heroOverlay = heroCard.querySelector('.hero-overlay');
                if (heroOverlay) {
                    heroOverlay.style.filter = `blur(${blurPx}px)`;
                }
            } else {
                // Reset blur when scrolled back to top
                const heroImg = heroCard.querySelector('img');
                if (heroImg) {
                    heroImg.style.filter = 'blur(0px)';
                    heroImg.style.transform = 'scale(1)';
                }
                
                const heroOverlay = heroCard.querySelector('.hero-overlay');
                if (heroOverlay) {
                    heroOverlay.style.filter = 'blur(0px)';
                }
            }
        });
    }

    // Image loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease';
        });
    });

    // Add smooth scroll for all internal links
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
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
