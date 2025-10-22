// Dynamic Homepage Renderer - Loads content from JSON
// This makes the entire homepage editable through the admin panel

let homepageData = null;

// Load homepage content on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔍 Loading dynamic homepage content...');
    console.log('🐛 DEBUG MODE: Tracking church card data flow');
    
    try {
        // Load from JSON file (updated by admin panel via server)
        console.log('📂 Loading from JSON file...');
        const response = await fetch('data/homepage-content.json?_=' + Date.now()); // Cache bust
        
        if (!response.ok) throw new Error('Failed to load homepage content');
        
        homepageData = await response.json();
        console.log('✅ Homepage data loaded from JSON file:', homepageData);
        
        // DEBUG: Check for church card specifically
        const popularPlaces = homepageData.sections?.find(s => s.id === 'popular-places');
        if (popularPlaces) {
            console.log('🐛 DEBUG: Popular Places section found:', popularPlaces);
            const churchCard = popularPlaces.cards?.find(c => c.id === 'church');
            if (churchCard) {
                console.log('🐛 DEBUG: Church card data:', {
                    title: churchCard.title,
                    description: churchCard.description,
                    images: churchCard.images,
                    enabled: churchCard.enabled
                });
            } else {
                console.error('❌ DEBUG: Church card NOT FOUND in popular places!');
            }
        } else {
            console.error('❌ DEBUG: Popular Places section NOT FOUND!');
        }
        
        console.log('🎨 Starting to render homepage...');
        // Render all sections
        renderHomepage();
        console.log('✅ Homepage rendering complete!');
        
    } catch (error) {
        console.error('❌ Error loading homepage:', error);
        // Fallback to static content (original HTML)
    }
});

// Render the entire homepage from data
function renderHomepage() {
    const container = document.querySelector('.homepage-content');
    if (!container) {
        console.error('Homepage container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get enabled sections and sort by order
    const sections = homepageData.sections
        .filter(section => section.enabled)
        .sort((a, b) => a.order - b.order);
    
    // Render each section
    sections.forEach(section => {
        const sectionElement = renderSection(section);
        if (sectionElement) {
            container.appendChild(sectionElement);
        }
    });
    
    // Re-initialize map if it exists
    if (document.getElementById('map')) {
        initializeMap();
    }
}

// Render individual section based on type
function renderSection(section) {
    switch (section.type) {
        case 'hero':
            return renderHeroSection(section);
        case 'card-grid':
            return renderCardGridSection(section);
        case 'featured-event':
            return renderFeaturedEventSection(section);
        case 'feature-card':
            return renderFeatureCardSection(section);
        case 'map':
            return renderMapSection(section);
        case 'info-section':
            return renderInfoSection(section);
        default:
            console.warn('Unknown section type:', section.type);
            return null;
    }
}

// Hero section (Welcome)
function renderHeroSection(section) {
    const div = document.createElement('div');
    div.className = 'welcome-section';
    div.innerHTML = `
        <div class="section-header">
            <h2>${section.data.heading}<br>${section.data.subheading}</h2>
            <img src="${section.data.logo}" alt="Liliw Logo" class="logo" onerror="this.style.display='none'">
        </div>
    `;
    return div;
}

// Card grid section (Popular Places)
function renderCardGridSection(section) {
    const div = document.createElement('div');
    div.className = 'content-section popular-places';
    div.id = section.id;
    
    const enabledCards = section.cards
        .filter(card => card.enabled)
        .sort((a, b) => a.order - b.order);
    
    div.innerHTML = `
        <h3 class="section-title">${section.title}</h3>
        <div class="image-grid">
            ${enabledCards.map(card => renderCardWithCarousel(card)).join('')}
        </div>
    `;
    
    // Initialize carousels after render
    setTimeout(() => initializeCarousels(div), 100);
    
    return div;
}

// Render a card with image carousel support
function renderCardWithCarousel(card) {
    const images = card.images || [card.image || 'images/placeholder.png'];
    const hasMultipleImages = images.length > 1;
    
    // DEBUG: Log church card rendering
    if (card.id === 'church') {
        console.log('🐛 DEBUG: Rendering church card with data:', {
            id: card.id,
            title: card.title,
            description: card.description,
            images: images,
            link: card.link,
            imageCount: images.length
        });
    }
    
    return `
        <div class="place-card" onclick="window.location.href='${card.link}'">
            <div class="card-image-container ${hasMultipleImages ? 'has-carousel' : ''}" data-card-id="${card.id}">
                ${images.map((img, index) => `
                    <img src="${img}" 
                         alt="${card.title}" 
                         class="card-image ${index === 0 ? 'active' : ''}"
                         onerror="this.src='images/placeholder.png'"
                         data-image-index="${index}">
                `).join('')}
                ${hasMultipleImages ? `
                    <div class="carousel-indicators">
                        ${images.map((_, index) => `
                            <span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <p>${card.title}</p>
        </div>
    `;
}

// Featured event section
function renderFeaturedEventSection(section) {
    const div = document.createElement('div');
    div.className = 'content-section events';
    div.id = section.id;
    
    const enabledCards = section.cards
        .filter(card => card.enabled)
        .sort((a, b) => a.order - b.order);
    
    if (enabledCards.length === 0) return null;
    
    const card = enabledCards[0]; // Show first enabled card
    const images = card.images || [card.image || 'images/placeholder.png'];
    const hasMultipleImages = images.length > 1;
    
    div.innerHTML = `
        <h3 class="section-title">${section.title}</h3>
        <div class="event-card" onclick="window.location.href='${card.link}'">
            <div class="card-image-container ${hasMultipleImages ? 'has-carousel' : ''}" data-card-id="${card.id}">
                ${images.map((img, index) => `
                    <img src="${img}" 
                         alt="${card.title}" 
                         class="card-image ${index === 0 ? 'active' : ''}"
                         onerror="this.src='images/placeholder.png'"
                         data-image-index="${index}">
                `).join('')}
                ${hasMultipleImages ? `
                    <div class="carousel-indicators">
                        ${images.map((_, index) => `
                            <span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="event-info">
                <h4>${card.title}</h4>
                ${card.date ? `<p class="event-date">${card.date}</p>` : ''}
            </div>
        </div>
    `;
    
    setTimeout(() => initializeCarousels(div), 100);
    return div;
}

// Feature card section (Plan Visit, Experiences)
function renderFeatureCardSection(section) {
    const div = document.createElement('div');
    div.className = `content-section ${section.id}`;
    div.id = section.id;
    
    const enabledCards = section.cards
        .filter(card => card.enabled)
        .sort((a, b) => a.order - b.order);
    
    if (enabledCards.length === 0) return null;
    
    const card = enabledCards[0]; // Show first enabled card
    const images = card.images || [card.image || 'images/placeholder.png'];
    const hasMultipleImages = images.length > 1;
    
    div.innerHTML = `
        <h3 class="section-title">${section.title}</h3>
        <div class="${section.id === 'plan-visit' ? 'plan-card' : 'experience-card'}" 
             onclick="window.location.href='${card.link}'" style="cursor: pointer;">
            <div class="card-image-container ${hasMultipleImages ? 'has-carousel' : ''}" data-card-id="${card.id}">
                ${images.map((img, index) => `
                    <img src="${img}" 
                         alt="${card.title}" 
                         class="card-image ${index === 0 ? 'active' : ''}"
                         onerror="this.src='images/placeholder.png'"
                         data-image-index="${index}">
                `).join('')}
                ${hasMultipleImages ? `
                    <div class="carousel-indicators">
                        ${images.map((_, index) => `
                            <span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="${section.id === 'plan-visit' ? 'plan-info' : 'experience-info'}">
                <h4>${card.title}</h4>
                <p>${card.description}</p>
            </div>
        </div>
    `;
    
    setTimeout(() => initializeCarousels(div), 100);
    return div;
}

// Map section
function renderMapSection(section) {
    const div = document.createElement('div');
    div.className = 'content-section interactive-map';
    div.id = section.id;
    
    div.innerHTML = `
        <h3 class="section-title">${section.title}</h3>
        <div class="map-container">
            <div id="${section.data.mapId}" style="height: ${section.data.height}; width: 100%; border-radius: 12px;"></div>
            <button class="map-button" onclick="window.location.href='${section.data.buttonLink}'">${section.data.buttonText}</button>
        </div>
        <div class="map-tips">
            <p><strong>💡 Map Navigation:</strong></p>
            <p>${section.data.tips}</p>
        </div>
    `;
    return div;
}

// Info section (About)
function renderInfoSection(section) {
    const div = document.createElement('div');
    div.className = 'content-section about';
    div.id = section.id;
    
    const enabledCards = section.cards
        .filter(card => card.enabled)
        .sort((a, b) => a.order - b.order);
    
    div.innerHTML = `
        <h3 class="section-title">${section.title}</h3>
        ${section.data.content ? `<div class="about-content">${section.data.content}</div>` : ''}
        <div class="about-links">
            ${enabledCards.map(card => `
                <a href="${card.link}" class="about-link">
                    <span class="about-icon">${card.icon || '📄'}</span>
                    <div class="about-link-content">
                        <h4>${card.title}</h4>
                        <p>${card.description}</p>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
    return div;
}

// Initialize Leaflet map (if map section exists)
function initializeMap() {
    if (typeof L === 'undefined') {
        console.log('Leaflet not loaded, skipping map initialization');
        return;
    }
    
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    
    // Liliw coordinates
    const liliw = [14.1311, 121.4331];
    
    const map = L.map('map', {
        center: liliw,
        zoom: 15,
        scrollWheelZoom: false
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker(liliw).addTo(map)
        .bindPopup('<b>Liliw, Laguna</b><br>Tsinelas Capital of the Philippines')
        .openPopup();
    
    // Enable scroll zoom with Ctrl key
    map.on('wheel', function(e) {
        if (e.originalEvent.ctrlKey) {
            map.scrollWheelZoom.enable();
        } else {
            map.scrollWheelZoom.disable();
        }
    });
}

// Initialize image carousels with fade transitions
function initializeCarousels(container) {
    const carousels = container.querySelectorAll('.card-image-container.has-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.card-image');
        const indicators = carousel.querySelectorAll('.indicator');
        
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        const interval = 4000; // 4 seconds per image
        
        // Auto-rotate images
        const rotateInterval = setInterval(() => {
            // Fade out current image
            images[currentIndex].classList.remove('active');
            indicators[currentIndex].classList.remove('active');
            
            // Move to next image
            currentIndex = (currentIndex + 1) % images.length;
            
            // Fade in next image
            images[currentIndex].classList.add('active');
            indicators[currentIndex].classList.add('active');
        }, interval);
        
        // Store interval ID for cleanup
        carousel.dataset.intervalId = rotateInterval;
        
        // Optional: Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carousel.dataset.intervalId);
        });
        
        carousel.addEventListener('mouseleave', () => {
            const newInterval = setInterval(() => {
                images[currentIndex].classList.remove('active');
                indicators[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
                indicators[currentIndex].classList.add('active');
            }, interval);
            carousel.dataset.intervalId = newInterval;
        });
    });
}

// Export for use in other scripts
window.homepageRenderer = {
    getData: () => homepageData,
    refresh: renderHomepage
};

console.log('Dynamic homepage renderer loaded');

