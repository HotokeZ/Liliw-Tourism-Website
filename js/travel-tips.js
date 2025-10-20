// Travel Tips JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Travel Tips page loaded');

    // Animate tips sections on load
    const sections = document.querySelectorAll('.tips-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Animate tip cards
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });

    // Animate checklist items
    const checklistItems = document.querySelectorAll('.checklist-item');
    checklistItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 600 + (index * 80));
    });

    // Animate contact grid items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 800 + (index * 100));
    });

    // Add click handler for emergency contacts
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactType = this.querySelector('h3').textContent;
            const contactNumber = this.querySelector('p').textContent;
            console.log('Emergency contact:', contactType, contactNumber);
            // Could add click-to-call functionality here
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

    // Add smooth scroll for sections
    const sectionTitles = document.querySelectorAll('.tips-section h2');
    sectionTitles.forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            this.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
