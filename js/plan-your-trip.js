// Plan Your Trip JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Plan Your Trip page loaded');

    // Animate sections on load
    const sections = document.querySelectorAll('.category-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Add click handlers for list items
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Clicked:', this.querySelector('h3').textContent);
            // Add navigation or modal logic here
        });
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
