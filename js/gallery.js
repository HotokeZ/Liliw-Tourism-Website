// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery page loaded');

    // Lightbox functionality
    let lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Fullscreen image">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Open lightbox when photo is clicked
    document.querySelectorAll('.photo-item img').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Animate photos on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all photo items with stagger effect
    document.querySelectorAll('.photo-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe sections
    document.querySelectorAll('.gallery-section, .upload-section, .about-section').forEach(section => {
        observer.observe(section);
    });

    // Add loading effect for images
    document.querySelectorAll('.photo-item img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease';
        });

        // If image is already cached, trigger the animation
        if (img.complete) {
            img.style.animation = 'fadeIn 0.5s ease';
        }
    });

    // Upload button functionality (placeholder)
    const uploadButton = document.querySelector('.upload-button');
    if (uploadButton && !uploadButton.disabled) {
        uploadButton.addEventListener('click', function() {
            console.log('Upload functionality - Coming soon!');
            alert('Photo upload feature coming soon! Stay tuned.');
        });
    }

    // Track gallery section views
    let sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('.section-title')?.textContent;
                console.log('Viewing gallery section:', sectionTitle);
            }
        });
    }, {
        threshold: 0.3
    });

    document.querySelectorAll('.gallery-section').forEach(section => {
        sectionObserver.observe(section);
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
