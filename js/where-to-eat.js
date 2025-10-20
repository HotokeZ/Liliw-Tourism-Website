// Where to Eat JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Where to Eat page loaded');

    // Animate restaurant cards on load
    const cards = document.querySelectorAll('.restaurant-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Add click handlers for restaurant cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const restaurantName = this.querySelector('h3').textContent;
            console.log('Clicked restaurant:', restaurantName);
            // Add navigation or modal logic here
        });
    });

    // Animate recommendations section
    const recommendationsSection = document.querySelector('.recommendations-section');
    if (recommendationsSection) {
        recommendationsSection.style.opacity = '0';
        recommendationsSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            recommendationsSection.style.transition = 'all 0.6s ease';
            recommendationsSection.style.opacity = '1';
            recommendationsSection.style.transform = 'translateY(0)';
        }, cards.length * 150);
    }

    // Animate recommendation items
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    recommendationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, (cards.length * 150) + (index * 100));
    });

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
