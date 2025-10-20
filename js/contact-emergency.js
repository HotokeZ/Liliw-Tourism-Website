// Contact and Emergency JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact and Emergency page loaded');

    // Animate emergency cards on load
    const emergencyCards = document.querySelectorAll('.emergency-card');
    emergencyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 100);
    });

    // Add click handlers for emergency cards (click to call)
    emergencyCards.forEach(card => {
        card.addEventListener('click', function() {
            const number = this.querySelector('.emergency-number').textContent;
            const service = this.querySelector('h3').textContent;
            console.log('Emergency contact:', service, number);
            // Could add click-to-call functionality: window.location.href = 'tel:' + number;
        });
    });

    // Animate tourism contact info
    const contactInfoCard = document.querySelector('.contact-info-card');
    if (contactInfoCard) {
        contactInfoCard.style.opacity = '0';
        contactInfoCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            contactInfoCard.style.transition = 'all 0.6s ease';
            contactInfoCard.style.opacity = '1';
            contactInfoCard.style.transform = 'translateY(0)';
        }, emergencyCards.length * 100);
    }

    // Animate contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            contactForm.style.transition = 'all 0.6s ease';
            contactForm.style.opacity = '1';
            contactForm.style.transform = 'translateY(0)';
        }, (emergencyCards.length * 100) + 300);

        // Handle form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            console.log('Form submitted:', formData);
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
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
