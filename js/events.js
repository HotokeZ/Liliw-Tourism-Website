// Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Events page loaded');

    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            alert('Search functionality coming soon!');
        });
    }

    // Event details button
    const eventDetailsBtn = document.querySelector('.event-details-btn');
    if (eventDetailsBtn) {
        eventDetailsBtn.addEventListener('click', function() {
            // Scroll to description
            const description = document.querySelector('.event-description');
            if (description) {
                description.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Calendar button
    const calendarBtn = document.querySelector('.calendar-btn');
    if (calendarBtn) {
        calendarBtn.addEventListener('click', function() {
            // TODO: Implement full calendar view
            alert('Full event calendar feature coming soon!\n\nThis will display:\n- Monthly calendar view\n- All upcoming events\n- Filter by event type\n- Add to personal calendar');
        });
    }

    // Event card interactions
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventTitle = this.querySelector('h3').textContent;
            console.log(`Clicked on: ${eventTitle}`);
            // TODO: Navigate to event detail page
            alert(`More details about "${eventTitle}" coming soon!`);
        });
    });

    // Add smooth transitions to event cards
    eventCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        card.style.opacity = '0';
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for all internal links
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
});
