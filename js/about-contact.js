// About and Contact JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('About and Contact page loaded');

    // Animate about card
    const aboutCard = document.querySelector('.about-card');
    if (aboutCard) {
        aboutCard.style.opacity = '0';
        aboutCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            aboutCard.style.transition = 'all 0.6s ease';
            aboutCard.style.opacity = '1';
            aboutCard.style.transform = 'translateY(0)';
        }, 200);
    }

    // Animate contact card
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.style.opacity = '0';
        contactCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            contactCard.style.transition = 'all 0.6s ease';
            contactCard.style.opacity = '1';
            contactCard.style.transform = 'translateY(0)';
        }, 400);
    }

    // Animate quick links
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 600 + (index * 100));
    });

    // Add hover effect for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Smooth scroll for sections
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            title.style.transition = 'all 0.5s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
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
