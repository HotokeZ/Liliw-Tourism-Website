// Business Directory JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Business Directory page loaded');

    // Animate business cards on load
    const cards = document.querySelectorAll('.business-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add click handlers for business cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const businessType = this.querySelector('h3').textContent;
            console.log('Clicked business type:', businessType);
            // Add navigation or filter logic here
        });
    });

    // Animate search section
    const searchSection = document.querySelector('.search-section');
    if (searchSection) {
        searchSection.style.opacity = '0';
        searchSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            searchSection.style.transition = 'all 0.6s ease';
            searchSection.style.opacity = '1';
            searchSection.style.transform = 'translateY(0)';
        }, cards.length * 100);
    }

    // Search functionality
    const searchInput = document.getElementById('businessSearch');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value;
            console.log('Searching for:', searchTerm);
            // Add search logic here
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('Searching for:', this.value);
                // Add search logic here
            }
        });
    }

    // Animate page title
    const title = document.querySelector('.page-title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            title.style.transition = 'all 0.6s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 100);
    }
});
