// Interactive Map Page JavaScript

let map;
let markers = {};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Interactive map page loaded');

    // Initialize Leaflet Map with error handling
    try {
        initializeInteractiveMap();
    } catch (error) {
        console.error('Failed to initialize map:', error);
    }

    // Location card click handlers
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            focusLocation(location);
        });
    });
});

// Initialize Interactive Map with Leaflet
function initializeInteractiveMap() {
    // Check if map container exists
    const mapContainer = document.getElementById('map-canvas');
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
    map = L.map('map-canvas', {
        scrollWheelZoom: false,  // Disable normal scroll zoom
        doubleClickZoom: true,   // Enable double-click zoom
        touchZoom: true          // Enable pinch zoom on touch devices
    }).setView(liliwCenter, 15);

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

    // Define attractions with coordinates and details
    const attractions = [
        {
            id: 'church',
            name: 'St. John the Baptist Church',
            coords: [14.1340, 121.4350],
            type: 'heritage',
            description: 'Historic Spanish colonial church with stunning baroque architecture',
            link: 'heritage-attractions.html',
            icon: '⛪'
        },
        {
            id: 'falls',
            name: 'Kilangin Falls',
            coords: [14.1200, 121.4500],
            type: 'nature',
            description: 'Beautiful natural waterfall surrounded by lush vegetation',
            link: 'natural-attractions.html',
            icon: '🌊'
        },
        {
            id: 'monument',
            name: 'Gat Tayaw Monument',
            coords: [14.1330, 121.4340],
            type: 'landmark',
            description: 'Iconic monument celebrating Liliw\'s footwear heritage',
            link: 'heritage-attractions.html',
            icon: '🏛️'
        },
        {
            id: 'plaza',
            name: 'Town Plaza',
            coords: [14.1335, 121.4345],
            type: 'landmark',
            description: 'Central town square and community gathering place',
            link: 'attractions.html',
            icon: '📍'
        }
    ];

    // Custom icon colors based on type
    const iconColors = {
        heritage: '#dc2626',
        nature: '#16a34a',
        landmark: '#2563eb'
    };

    // Add markers for each attraction
    attractions.forEach(attraction => {
        // Create custom icon HTML
        const iconHtml = `
            <div style="
                background-color: ${iconColors[attraction.type]};
                color: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                border: 3px solid white;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ">
                ${attraction.icon}
            </div>
        `;

        // Create custom icon
        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-map-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        const marker = L.marker(attraction.coords, { icon: customIcon }).addTo(map);
        
        // Store marker reference
        markers[attraction.id] = marker;
        
        // Create popup content
        const popupContent = `
            <div style="text-align: center; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: #2c5282; font-size: 16px;">${attraction.name}</h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563;">${attraction.description}</p>
                <a href="${attraction.link}" style="
                    display: inline-block;
                    background-color: #4299e1;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: background-color 0.2s;
                ">
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
        fillOpacity: 0.08,
        radius: 2500,
        weight: 2
    }).addTo(map);
}

// Focus on specific location when card is clicked
function focusLocation(locationId) {
    if (!map || !markers[locationId]) return;

    const marker = markers[locationId];
    
    // Get marker coordinates
    const coords = marker.getLatLng();
    
    // Open popup immediately
    marker.openPopup();
    
    // Fly to location with animation (faster)
    map.flyTo(coords, 17, {
        duration: 0.6  // Reduced from 1.5 to 0.6 seconds
    });
}
