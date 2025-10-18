// Interactive Map Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Interactive map page loaded');

    // Map zoom level
    let zoomLevel = 1;
    const mapCanvas = document.getElementById('map-canvas');

    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            alert('Search functionality coming soon!');
        });
    }

    // Zoom In functionality
    const zoomInBtn = document.getElementById('zoom-in');
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            if (zoomLevel < 2) {
                zoomLevel += 0.2;
                updateMapZoom();
            }
        });
    }

    // Zoom Out functionality
    const zoomOutBtn = document.getElementById('zoom-out');
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            if (zoomLevel > 0.6) {
                zoomLevel -= 0.2;
                updateMapZoom();
            }
        });
    }

    // Locate Me functionality
    const locateBtn = document.getElementById('locate-me');
    if (locateBtn) {
        locateBtn.addEventListener('click', function() {
            // TODO: Implement geolocation
            alert('Location services feature coming soon!');
        });
    }

    // Update map zoom
    function updateMapZoom() {
        const staticMap = mapCanvas.querySelector('.static-map');
        if (staticMap) {
            staticMap.style.transform = `scale(${zoomLevel})`;
            staticMap.style.transformOrigin = 'center';
            staticMap.style.transition = 'transform 0.3s ease';
        }
    }

    // Map marker interactions
    const mapMarkers = document.querySelectorAll('.map-marker');
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            showLocationInfo(location);
        });
    });

    // Show location information
    function showLocationInfo(locationName) {
        alert(`More information about ${locationName} coming soon!\n\nThis will include:\n- Detailed description\n- Photos\n- Directions\n- Reviews\n- Contact information`);
        // TODO: Show modal or navigate to location detail page
    }

    // Focus on specific location
    window.focusLocation = function(locationType) {
        console.log(`Focusing on: ${locationType}`);
        
        // Scroll map into view
        mapCanvas.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Highlight corresponding marker
        const markers = {
            'church': 0,
            'falls': 1,
            'monument': 3
        };

        const markerIndex = markers[locationType];
        if (markerIndex !== undefined && mapMarkers[markerIndex]) {
            // Animate marker
            const marker = mapMarkers[markerIndex];
            marker.style.transform = 'translate(-50%, -100%) scale(1.5)';
            marker.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                marker.style.transform = 'translate(-50%, -100%) scale(1)';
            }, 1000);
        }
    };

    // Location card click handlers
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Pan map on drag (simple version)
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    mapCanvas.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX - mapCanvas.offsetLeft;
        startY = e.pageY - mapCanvas.offsetTop;
        scrollLeft = mapCanvas.scrollLeft;
        scrollTop = mapCanvas.scrollTop;
        mapCanvas.style.cursor = 'grabbing';
    });

    mapCanvas.addEventListener('mouseleave', function() {
        isDragging = false;
        mapCanvas.style.cursor = 'grab';
    });

    mapCanvas.addEventListener('mouseup', function() {
        isDragging = false;
        mapCanvas.style.cursor = 'grab';
    });

    mapCanvas.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - mapCanvas.offsetLeft;
        const y = e.pageY - mapCanvas.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        mapCanvas.scrollLeft = scrollLeft - walkX;
        mapCanvas.scrollTop = scrollTop - walkY;
    });

    // Initialize map
    mapCanvas.style.cursor = 'grab';
    console.log('Interactive map initialized');
});

// Future: Integrate with Google Maps API or Leaflet.js
// function initializeGoogleMaps() {
//     // Google Maps integration code here
// }
