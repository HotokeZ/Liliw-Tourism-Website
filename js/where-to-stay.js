// Where to Stay JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Where to Stay page loaded');

    // Animate accommodation cards on load
    const cards = document.querySelectorAll('.accommodation-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Add click handlers for details buttons
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accommodationName = this.closest('.accommodation-card').querySelector('h3').textContent;
            console.log('View details for:', accommodationName);
            // Add modal or navigation logic here
        });
    });

    // Animate tips section
    const tipsSection = document.querySelector('.tips-section');
    if (tipsSection) {
        tipsSection.style.opacity = '0';
        tipsSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            tipsSection.style.transition = 'all 0.6s ease';
            tipsSection.style.opacity = '1';
            tipsSection.style.transform = 'translateY(0)';
        }, cards.length * 150);
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
