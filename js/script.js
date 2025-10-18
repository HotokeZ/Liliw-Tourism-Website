// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Arrow button functionality - scroll to homepage section
    const arrowButton = document.getElementById('goToHomepage');
    const homepagePanel = document.querySelector('.homepage-panel');
    
    if (arrowButton && homepagePanel) {
        arrowButton.addEventListener('click', function() {
            // Smooth scroll effect
            homepagePanel.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Optional: Add a visual highlight to the homepage
            homepagePanel.style.transition = 'transform 0.3s ease';
            homepagePanel.style.transform = 'scale(1.02)';
            setTimeout(() => {
                homepagePanel.style.transform = 'scale(1)';
            }, 300);
        });
    }

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

    // Add parallax effect to main church image (optional)
    const churchImage = document.getElementById('mainChurchImage');
    if (churchImage) {
        window.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            churchImage.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // Add fade-in animation on scroll for homepage sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
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

    // Console log for debugging
    console.log('Liliw Tourism Website Loaded Successfully!');
    console.log('Ready for stakeholder presentation');
});

// Helper function for future navigation
function navigateToPage(pageName) {
    console.log(`Navigating to: ${pageName}`);
    // TODO: Implement actual page navigation when backend is added
}

// Helper function for future API calls
async function fetchData(endpoint) {
    try {
        // TODO: Replace with actual API endpoint when backend is ready
        console.log(`Fetching data from: ${endpoint}`);
        // const response = await fetch(endpoint);
        // const data = await response.json();
        // return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
