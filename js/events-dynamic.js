// Dynamic Events Renderer - Loads content from JSON
// This makes the events page editable through the admin panel

let eventsData = null;

// Load events content on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔍 Loading dynamic events content...');
    
    try {
        // Load from JSON file (updated by admin panel via server)
        console.log('📂 Loading from JSON file...');
        const response = await fetch('data/events.json?_=' + Date.now()); // Cache bust
        
        if (!response.ok) throw new Error('Failed to load events content');
        
        eventsData = await response.json();
        console.log('✅ Events data loaded from JSON file:', eventsData);
        
        console.log('🎨 Starting to render events...');
        renderEvents();
        console.log('✅ Events rendering complete!');
        
    } catch (error) {
        console.error('❌ Error loading events:', error);
        // Fallback to static content (original HTML)
    }
});

// Render the events page from data
function renderEvents() {
    const container = document.querySelector('.events-container');
    if (!container) {
        console.error('Events container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get enabled sections
    const sections = eventsData.sections.filter(section => section.enabled !== false);
    
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
    sectionDiv.className = 'event-section';
    sectionDiv.id = section.id;
    
    // Section title
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = section.title || 'Events';
    sectionDiv.appendChild(title);
    
    // Items grid
    const grid = document.createElement('div');
    grid.className = 'events-grid';
    
    items.forEach(item => {
        const card = renderEventCard(item);
        grid.appendChild(card);
    });
    
    sectionDiv.appendChild(grid);
    
    return sectionDiv;
}

// Render individual event card
function renderEventCard(item) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    // Image
    const imgContainer = document.createElement('div');
    imgContainer.className = 'event-image';
    
    const img = document.createElement('img');
    img.src = item.image || 'images/placeholder.png';
    img.alt = item.title || 'Event';
    img.onerror = function() {
        this.src = 'images/placeholder.png';
    };
    
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    
    // Content
    const content = document.createElement('div');
    content.className = 'event-content';
    
    // Date badge
    if (item.date) {
        const dateBadge = document.createElement('div');
        dateBadge.className = 'event-date-badge';
        dateBadge.innerHTML = `<span class="date-icon">📅</span> ${item.date}`;
        content.appendChild(dateBadge);
    }
    
    // Title
    const title = document.createElement('h3');
    title.className = 'event-title';
    title.textContent = item.title || 'Untitled Event';
    content.appendChild(title);
    
    // Description
    if (item.description) {
        const desc = document.createElement('p');
        desc.className = 'event-description';
        desc.textContent = item.description;
        content.appendChild(desc);
    }
    
    // Learn More button (only show if details are enabled)
    if (item.link && item.details && item.details.enabled) {
        const btn = document.createElement('a');
        btn.href = item.link;
        btn.className = 'btn-learn-more';
        btn.textContent = 'View Details';
        content.appendChild(btn);
    }
    
    card.appendChild(content);
    
    return card;
}
