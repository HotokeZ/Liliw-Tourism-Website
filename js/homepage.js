// Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Map button functionality
    const mapButton = document.querySelector('.map-button');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            alert('Interactive map feature coming soon!');
            // TODO: Implement full map view modal or navigation
        });
    }

    // Add click handlers to place cards
    const placeCards = document.querySelectorAll('.place-card');
    placeCards.forEach(card => {
        card.addEventListener('click', function() {
            const placeName = this.querySelector('p').textContent;
            console.log(`Clicked on: ${placeName}`);
            // TODO: Navigate to place detail page
        });
    });

    // Event card click handler
    const eventCard = document.querySelector('.event-card');
    if (eventCard) {
        eventCard.addEventListener('click', function() {
            console.log('Event clicked');
            // TODO: Navigate to event details page
        });
    }

    // Plan visit card click handler
    const planCard = document.querySelector('.plan-card');
    if (planCard) {
        planCard.addEventListener('click', function() {
            console.log('Plan your visit clicked');
            // TODO: Navigate to planning page
        });
    }

    // Social icons functionality
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Social icon clicked');
            // TODO: Add actual social media links
        });
    });

    // Smooth scroll for about section links
    const aboutLinks = document.querySelectorAll('.about-column a');
    aboutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            console.log(`Navigating to: ${targetId}`);
            // TODO: Implement navigation to respective pages
        });
    });

    // Add loading state for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // Placeholder if image fails to load
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            this.alt = 'Image not available';
        });
    });

    // Scroll to top button (optional)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if (window.scrollY > 500) {
                // Could add a "back to top" button here
                console.log('User has scrolled down');
            }
        }, 100);
    });

    console.log('Liliw Tourism Homepage Loaded Successfully!');
});

// Helper function for future navigation
function navigateToPage(pageName) {
    console.log(`Navigating to: ${pageName}`);
    window.location.href = pageName;
}
