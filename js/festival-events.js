// Festival Events Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Festival Events page loaded');

    // Animate highlights on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all highlight items
    document.querySelectorAll('.highlights-list li').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate sections on scroll
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe major sections
    document.querySelectorAll('.hero-section, .about-festival, .highlights-section, .visit-info, .about-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero && scrolled < 500) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Share functionality (for future enhancement)
    const shareButton = document.querySelector('.learn-badge');
    if (shareButton) {
        shareButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Share festival information');
            // Could implement Web Share API here
        });
    }
});
