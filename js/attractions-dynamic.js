// Dynamic Attractions Renderer - Loads content from JSON
// This makes the attractions page editable through the admin panel

let attractionsData = null;

// Load attractions content on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔍 Loading dynamic attractions content...');
    
    try {
        // Load from JSON file (updated by admin panel via server)
        console.log('📂 Loading from JSON file...');
        const response = await fetch('data/attractions.json?_=' + Date.now()); // Cache bust
        
        if (!response.ok) throw new Error('Failed to load attractions content');
        
        attractionsData = await response.json();
        console.log('✅ Attractions data loaded from JSON file:', attractionsData);
        
        console.log('🎨 Starting to render attractions...');
        // Render all sections
        renderAttractions();
        console.log('✅ Attractions rendering complete!');
        
    } catch (error) {
        console.error('❌ Error loading attractions:', error);
        // Fallback to static content (original HTML)
    }
});

// Render the attractions page from data
function renderAttractions() {
    const container = document.querySelector('.attractions-container');
    if (!container) {
        console.error('Attractions container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get enabled sections
    const sections = attractionsData.sections.filter(section => section.enabled !== false);
    
    // Render each section
    sections.forEach(section => {
        const sectionElement = renderSection(section);
        if (sectionElement) {
            container.appendChild(sectionElement);
        }
    });
}

// Render individual section
function renderSection(section) {
    // Get enabled items
    const items = section.items.filter(item => item.enabled !== false);
    
    if (items.length === 0) return null;
    
    // Create section container
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'attraction-section';
    sectionDiv.id = section.id;
    
    // Section title
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = section.title || 'Attractions';
    sectionDiv.appendChild(title);
    
    // Items grid
    const grid = document.createElement('div');
    grid.className = 'attractions-grid';
    
    items.forEach(item => {
        const card = renderAttractionCard(item);
        grid.appendChild(card);
    });
    
    sectionDiv.appendChild(grid);
    
    return sectionDiv;
}

// Render individual attraction card
function renderAttractionCard(item) {
    const card = document.createElement('div');
    card.className = 'attraction-card';
    
    // Image
    const imgContainer = document.createElement('div');
    imgContainer.className = 'attraction-image';
    
    const img = document.createElement('img');
    img.src = item.image || 'images/placeholder.png';
    img.alt = item.title || 'Attraction';
    img.onerror = function() {
        this.src = 'images/placeholder.png';
    };
    
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    
    // Content
    const content = document.createElement('div');
    content.className = 'attraction-content';
    
    // Title
    const title = document.createElement('h3');
    title.className = 'attraction-title';
    title.textContent = item.title || 'Untitled Attraction';
    content.appendChild(title);
    
    // Location badge
    if (item.location) {
        const location = document.createElement('div');
        location.className = 'attraction-location';
        location.innerHTML = `<span class="location-icon">📍</span> ${item.location}`;
        content.appendChild(location);
    }
    
    // Description
    if (item.description) {
        const desc = document.createElement('p');
        desc.className = 'attraction-description';
        desc.textContent = item.description;
        content.appendChild(desc);
    }
    
    // Learn More button (only show if details are enabled)
    if (item.link && item.details && item.details.enabled) {
        const btn = document.createElement('a');
        btn.href = item.link;
        btn.className = 'btn-learn-more';
        btn.textContent = 'See More';
        content.appendChild(btn);
    }
    
    card.appendChild(content);
    
    return card;
}
