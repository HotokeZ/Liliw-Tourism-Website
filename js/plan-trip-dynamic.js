// Dynamic Plan Your Trip Renderer - Loads content from JSON
// This makes the plan your trip page editable through the admin panel

let planTripData = null;

// Load plan-trip content on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔍 Loading dynamic plan-trip content...');
    
    try {
        // Load from JSON file (updated by admin panel via server)
        console.log('📂 Loading from JSON file...');
        const response = await fetch('data/plan-trip.json?_=' + Date.now()); // Cache bust
        
        if (!response.ok) throw new Error('Failed to load plan-trip content');
        
        planTripData = await response.json();
        console.log('✅ Plan Trip data loaded from JSON file:', planTripData);
        
        console.log('🎨 Starting to render plan trip...');
        renderPlanTrip();
        console.log('✅ Plan Trip rendering complete!');
        
    } catch (error) {
        console.error('❌ Error loading plan trip:', error);
        // Fallback to static content (original HTML)
    }
});

// Render the plan trip page from data
function renderPlanTrip() {
    const container = document.querySelector('.plan-trip-container');
    if (!container) {
        console.error('Plan trip container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get enabled sections
    const sections = planTripData.sections.filter(section => section.enabled !== false);
    
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
    sectionDiv.className = 'plan-section';
    sectionDiv.id = section.id;
    
    // Section title
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = section.title || 'Plan Your Trip';
    sectionDiv.appendChild(title);
    
    // Items grid
    const grid = document.createElement('div');
    grid.className = 'plan-items-grid';
    
    items.forEach(item => {
        const card = renderPlanItem(item);
        grid.appendChild(card);
    });
    
    sectionDiv.appendChild(grid);
    
    return sectionDiv;
}

// Render individual plan item
function renderPlanItem(item) {
    const card = document.createElement('div');
    card.className = 'plan-item-card';
    
    // Content
    const content = document.createElement('div');
    content.className = 'plan-item-content';
    
    // Title
    const title = document.createElement('h3');
    title.className = 'plan-item-title';
    title.textContent = item.title || 'Untitled';
    content.appendChild(title);
    
    // Date/Season badge (if available)
    if (item.date) {
        const dateBadge = document.createElement('div');
        dateBadge.className = 'plan-date-badge';
        dateBadge.innerHTML = `<span class="date-icon">📅</span> ${item.date}`;
        content.appendChild(dateBadge);
    }
    
    // Description
    if (item.description) {
        const desc = document.createElement('p');
        desc.className = 'plan-item-description';
        desc.textContent = item.description;
        content.appendChild(desc);
    }
    
    // Learn More button
    if (item.link) {
        const btn = document.createElement('a');
        btn.href = item.link;
        btn.className = 'btn-learn-more';
        btn.textContent = 'Learn More';
        content.appendChild(btn);
    }
    
    card.appendChild(content);
    
    return card;
}
