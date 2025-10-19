// Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Leaflet Map with error handling
    try {
        initializeMap();
    } catch (error) {
        console.error('Failed to initialize map:', error);
    }

    // Add click handlers to place cards
    const placeCards = document.querySelectorAll('.place-card');
    placeCards.forEach(card => {
        card.addEventListener('click', function() {
            const placeName = this.querySelector('p').textContent;
            console.log(`Clicked on: ${placeName}`);
            // TODO: Navigate to place detail page
        });
    });

    // Event card click handler
    const eventCard = document.querySelector('.event-card');
    if (eventCard) {
        eventCard.addEventListener('click', function() {
            console.log('Event clicked');
            // TODO: Navigate to event details page
        });
    }

    // Plan visit card click handler
    const planCard = document.querySelector('.plan-card');
    if (planCard) {
        planCard.addEventListener('click', function() {
            console.log('Plan your visit clicked');
            // TODO: Navigate to planning page
        });
    }

    // Social icons functionality
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Social icon clicked');
            // TODO: Add actual social media links
        });
    });

    // Smooth scroll for about section links
    const aboutLinks = document.querySelectorAll('.about-column a');
    aboutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            console.log(`Navigating to: ${targetId}`);
            // TODO: Implement navigation to respective pages
        });
    });

    // Add loading state for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // Placeholder if image fails to load
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            this.alt = 'Image not available';
        });
    });

    // Scroll to top button (optional)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if (window.scrollY > 500) {
                // Could add a "back to top" button here
                console.log('User has scrolled down');
            }
        }, 100);
    });

    console.log('Liliw Tourism Homepage Loaded Successfully!');
});

// Initialize Interactive Map with Leaflet
function initializeMap() {
    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.warn('Map container not found');
        return;
    }
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }

    // Coordinates for Liliw, Laguna (approximate center)
    const liliwCenter = [14.1333, 121.4333];

    // Initialize map
    const map = L.map('map', {
        scrollWheelZoom: false,  // Disable normal scroll zoom
        doubleClickZoom: true,   // Enable double-click zoom
        touchZoom: true          // Enable pinch zoom on touch devices
    }).setView(liliwCenter, 14);

    // Add OpenStreetMap tiles (free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Enable Ctrl + Scroll zoom only
    const mapDiv = map.getContainer();
    let isZooming = false;
    
    mapDiv.addEventListener('wheel', function(e) {
        // Only allow zoom when Ctrl key is pressed
        if (e.ctrlKey) {
            e.preventDefault();
            
            // Prevent multiple zooms while one is in progress
            if (isZooming) return;
            
            isZooming = true;
            const delta = e.deltaY;
            const currentZoom = map.getZoom();
            
            // Zoom in if scrolling down (positive delta), zoom out if scrolling up
            if (delta > 0 && currentZoom < map.getMaxZoom()) {
                map.setZoom(currentZoom + 1);
            } else if (delta < 0 && currentZoom > map.getMinZoom()) {
                map.setZoom(currentZoom - 1);
            }
            
            // Allow next zoom after a short delay
            setTimeout(function() {
                isZooming = false;
            }, 100);
        }
        // If Ctrl not pressed, don't prevent default - let page scroll normally
    }, { passive: false });

    // Enable Shift + Hover to pan
    let lastMousePosition = null;
    let isPanning = false;
    
    mapDiv.addEventListener('mousemove', function(e) {
        if (e.shiftKey) {
            mapDiv.style.cursor = 'move';
            
            if (lastMousePosition) {
                const deltaX = e.clientX - lastMousePosition.x;
                const deltaY = e.clientY - lastMousePosition.y;
                
                // Pan the map based on mouse movement
                map.panBy([-deltaX, -deltaY], { animate: false });
            }
            
            lastMousePosition = { x: e.clientX, y: e.clientY };
            isPanning = true;
        } else {
            if (isPanning) {
                mapDiv.style.cursor = '';
                lastMousePosition = null;
                isPanning = false;
            }
        }
    });
    
    mapDiv.addEventListener('mouseleave', function() {
        mapDiv.style.cursor = '';
        lastMousePosition = null;
        isPanning = false;
    });
    
    // Reset when Shift key is released
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Shift') {
            mapDiv.style.cursor = '';
            lastMousePosition = null;
            isPanning = false;
        }
    });

    // Define attractions with coordinates
    const attractions = [
        {
            name: 'St. John the Baptist Church',
            coords: [14.1340, 121.4350],
            description: 'Historic Spanish colonial church',
            link: 'heritage-attractions.html'
        },
        {
            name: 'Kilangin Falls',
            coords: [14.1200, 121.4500],
            description: 'Beautiful natural waterfall',
            link: 'natural-attractions.html'
        },
        {
            name: 'Gat Tayaw Monument',
            coords: [14.1330, 121.4340],
            description: 'Historical monument',
            link: 'heritage-attractions.html'
        },
        {
            name: 'Town Plaza',
            coords: [14.1335, 121.4345],
            description: 'Central town square',
            link: 'attractions.html'
        }
    ];

    // Add markers for each attraction
    attractions.forEach(attraction => {
        const marker = L.marker(attraction.coords).addTo(map);
        
        // Create popup content
        const popupContent = `
            <div style="text-align: center;">
                <h4 style="margin: 0 0 8px 0; color: #2c5282;">${attraction.name}</h4>
                <p style="margin: 0 0 8px 0; font-size: 14px;">${attraction.description}</p>
                <a href="${attraction.link}" style="color: #4299e1; text-decoration: none; font-weight: 600;">
                    Learn More →
                </a>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });

    // Add a circle to highlight Liliw area
    L.circle(liliwCenter, {
        color: '#4299e1',
        fillColor: '#4299e1',
        fillOpacity: 0.1,
        radius: 2000
    }).addTo(map);
}

// Helper function for future navigation
function navigateToPage(pageName) {
    console.log(`Navigating to: ${pageName}`);
    window.location.href = pageName;
}
