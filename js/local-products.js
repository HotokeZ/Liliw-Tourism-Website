// Local Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Local Products page loaded');

    // Smooth scroll to category sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offset = 80; // Account for fixed back button
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Highlight the category briefly
                target.style.transition = 'transform 0.3s ease';
                target.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    target.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });

    // Animate products on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all product cards with stagger effect
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe info cards
    document.querySelectorAll('.info-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe category sections
    document.querySelectorAll('.category-section, .shopping-info, .about-section').forEach(section => {
        observer.observe(section);
    });

    // Add hover effect enhancement for product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('click', function() {
            console.log('Product clicked:', this.querySelector('h3')?.textContent || 'Unknown');
            // Could navigate to detailed product page
        });
    });

    // Track which category is in view
    let categories = document.querySelectorAll('.category-section');
    let categoryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const categoryId = entry.target.id;
                console.log('Viewing category:', categoryId);
                // Could highlight corresponding nav link if there was one
            }
        });
    }, {
        threshold: 0.5
    });

    categories.forEach(category => {
        categoryObserver.observe(category);
    });
});
