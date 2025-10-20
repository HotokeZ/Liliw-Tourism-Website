// Experiences Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Experiences page loaded');

    // Smooth scroll for hash links
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

    // Add animation on scroll for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.festival-card, .product-card, .gallery-preview, .about-section').forEach(element => {
        observer.observe(element);
    });

    // Add click tracking (for analytics if needed)
    document.querySelectorAll('.festival-card, .product-card, .gallery-preview').forEach(card => {
        card.addEventListener('click', function() {
            console.log('Card clicked:', this.querySelector('h3')?.textContent || 'Unknown');
        });
    });
});
