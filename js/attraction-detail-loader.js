// Attraction Detail Page Dynamic Loader
// Loads content from JSON based on URL parameters

// Carousel state
let carouselImages = [];
let currentImageIndex = 0;
let carouselInterval = null;
let isHovering = false;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Detail page loader initialized');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const pageName = urlParams.get('page') || 'attractions';
    
    console.log('Loading detail for:', { itemId, pageName });
    
    if (!itemId) {
        showError('No item ID provided');
        return;
    }
    
    try {
        // Load the appropriate data file
        const dataFile = getDataFile(pageName);
        const response = await fetch(dataFile);
        
        if (!response.ok) {
            throw new Error(`Failed to load data (${response.status})`);
        }
        
        const data = await response.json();
        console.log('Data loaded:', data);
        
        // Find the item
        let item = null;
        let sectionTitle = '';
        
        for (const section of data.sections) {
            if (!section.items) continue;
            
            const found = section.items.find(i => i.id === itemId);
            if (found) {
                item = found;
                sectionTitle = section.title;
                break;
            }
        }
        
        if (!item) {
            throw new Error('Item not found');
        }
        
        console.log('Item found:', item);
        
        // Check if details are enabled
        if (!item.details || !item.details.enabled) {
            showError('Detail page is not available for this item');
            return;
        }
        
        // Render the detail page
        renderDetailPage(item, data, sectionTitle, pageName);
        
    } catch (error) {
        console.error('Error loading detail page:', error);
        showError(error.message);
    }
});

// Get data file based on page type
function getDataFile(page) {
    const dataFiles = {
        'attractions': 'data/attractions.json',
        'events': 'data/events.json',
        'experiences': 'data/experiences.json',
        'plan-trip': 'data/plan-trip.json'
    };
    
    return dataFiles[page] || 'data/attractions.json';
}

// Render the detail page content
function renderDetailPage(item, data, sectionTitle, pageName) {
    const details = item.details;
    
    // Update document title
    document.title = `${details.title || item.title} - Liliw, Laguna`;
    
    // Set back button
    const backButton = document.getElementById('backButton');
    backButton.href = getBackLink(pageName);
    
    // Update page title
    document.getElementById('pageTitle').textContent = 'Learn More About Liliw, Laguna';
    
    // Prepare carousel images - use all images from the item
    carouselImages = [];
    if (details.heroImage) {
        carouselImages.push(details.heroImage);
    }
    if (item.images && Array.isArray(item.images)) {
        item.images.forEach(img => {
            if (img && img !== 'images/placeholder.png' && !carouselImages.includes(img)) {
                carouselImages.push(img);
            }
        });
    } else if (item.image && !carouselImages.includes(item.image)) {
        carouselImages.push(item.image);
    }
    
    // Fallback to placeholder if no images
    if (carouselImages.length === 0) {
        carouselImages = ['images/placeholder.png'];
    }
    
    console.log('Carousel images:', carouselImages);
    
    // Initialize carousel
    initializeCarousel(details.title || item.title);
    
    document.getElementById('heroTitle').textContent = (details.title || item.title).toUpperCase();
    document.getElementById('heroLocation').textContent = item.location || 'LILIW, LAGUNA, PHILIPPINES';
    document.getElementById('heroSubtitle').textContent = details.subtitle || sectionTitle;
    
    // Update about title
    document.getElementById('aboutTitle').textContent = `About ${details.title || item.title}`;
    
    // Render description paragraphs
    const descriptionContent = document.getElementById('descriptionContent');
    descriptionContent.innerHTML = (details.description || [item.description])
        .filter(para => para && para.trim())
        .map(para => `<p>${para}</p>`)
        .join('');
    
    // Render related items
    renderRelatedItems(item, data, sectionTitle);
    
    // Hide loading, show content
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('detailContent').style.display = 'block';
    
    console.log('Detail page rendered successfully');
}

// Render related items
function renderRelatedItems(currentItem, data, sectionTitle) {
    const relatedGrid = document.getElementById('relatedGrid');
    const relatedSection = document.getElementById('relatedSection');
    const relatedTitle = document.getElementById('relatedTitle');
    
    // Find related items from the same section
    let relatedItems = [];
    
    for (const section of data.sections) {
        if (section.title === sectionTitle && section.items) {
            relatedItems = section.items
                .filter(item => item.id !== currentItem.id && item.enabled !== false)
                .slice(0, 3); // Max 3 related items
            break;
        }
    }
    
    if (relatedItems.length === 0) {
        relatedSection.style.display = 'none';
        return;
    }
    
    relatedTitle.textContent = `Other ${sectionTitle}`;
    
    relatedGrid.innerHTML = relatedItems.map(item => {
        const image = (item.images && item.images[0]) || item.image || 'images/placeholder.png';
        const link = item.details && item.details.enabled 
            ? `attraction-detail.html?id=${item.id}&page=${new URLSearchParams(window.location.search).get('page') || 'attractions'}`
            : '#';
        
        return `
            <div class="small-card">
                <a href="${link}">
                    <img src="${image}" alt="${item.title}" 
                         onerror="this.src='images/placeholder.png'">
                    <p>${item.title}</p>
                </a>
            </div>
        `;
    }).join('');
}

// Get back link based on page type
function getBackLink(page) {
    const backLinks = {
        'attractions': 'attractions.html',
        'events': 'events.html',
        'experiences': 'experiences.html',
        'plan-trip': 'plan-your-trip.html'
    };
    
    return backLinks[page] || 'attractions.html';
}

// Show error state
function showError(message) {
    console.error('Error:', message);
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('detailContent').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

function initializeCarousel(title) {
    const carouselContainer = document.getElementById('heroCarousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const heroCard = document.getElementById('heroCard');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    // Clear existing images and indicators
    carouselContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Create image elements
    carouselImages.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = title;
        img.onerror = function() {
            this.src = 'images/placeholder.png';
        };
        
        if (index === 0) {
            img.classList.add('active');
        }
        
        carouselContainer.appendChild(img);
    });
    
    // Show/hide navigation arrows based on image count
    if (carouselImages.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        
        // Create indicators
        carouselImages.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) {
                indicator.classList.add('active');
            }
            indicator.onclick = () => goToSlide(index);
            indicatorsContainer.appendChild(indicator);
        });
        
        // Setup click handlers
        prevBtn.onclick = () => navigateCarousel(-1);
        nextBtn.onclick = () => navigateCarousel(1);
        
        // Setup hover handlers
        heroCard.addEventListener('mouseenter', () => {
            isHovering = true;
            stopCarousel();
        });
        
        heroCard.addEventListener('mouseleave', () => {
            isHovering = false;
            startCarousel();
        });
        
        // Setup touch/swipe handlers for mobile
        setupSwipeHandlers(carouselContainer);
        
        // Start automatic carousel
        startCarousel();
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
}

function navigateCarousel(direction) {
    const images = document.querySelectorAll('#heroCarousel img');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    // Remove active class from current image and indicator
    images[currentImageIndex].classList.remove('active');
    if (indicators[currentImageIndex]) {
        indicators[currentImageIndex].classList.remove('active');
    }
    
    // Calculate new index
    currentImageIndex += direction;
    
    // Wrap around
    if (currentImageIndex < 0) {
        currentImageIndex = carouselImages.length - 1;
    } else if (currentImageIndex >= carouselImages.length) {
        currentImageIndex = 0;
    }
    
    // Add active class to new image and indicator
    images[currentImageIndex].classList.add('active');
    if (indicators[currentImageIndex]) {
        indicators[currentImageIndex].classList.add('active');
    }
}

function goToSlide(index) {
    const images = document.querySelectorAll('#heroCarousel img');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    // Remove active class from current
    images[currentImageIndex].classList.remove('active');
    if (indicators[currentImageIndex]) {
        indicators[currentImageIndex].classList.remove('active');
    }
    
    // Set new index
    currentImageIndex = index;
    
    // Add active class to new
    images[currentImageIndex].classList.add('active');
    if (indicators[currentImageIndex]) {
        indicators[currentImageIndex].classList.add('active');
    }
    
    // Restart carousel timer
    stopCarousel();
    if (!isHovering) {
        startCarousel();
    }
}

function startCarousel() {
    // Clear any existing interval
    stopCarousel();
    
    // Only start if there are multiple images and not hovering
    if (carouselImages.length > 1 && !isHovering) {
        carouselInterval = setInterval(() => {
            navigateCarousel(1);
        }, 5000); // Transition every 5 seconds
    }
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopCarousel();
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function setupSwipeHandlers(element) {
    element.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isHovering = true;
        stopCarousel();
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isHovering = false;
        startCarousel();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left - show next image
        navigateCarousel(1);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right - show previous image
        navigateCarousel(-1);
    }
}
