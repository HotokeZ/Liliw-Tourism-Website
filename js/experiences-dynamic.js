// Dynamic Experiences Renderer - Loads content from JSON
// This makes the experiences page editable through the admin panel

let experiencesData = null;

// Load experiences content on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔍 Loading dynamic experiences content...');
    
    try {
        // Load from JSON file (updated by admin panel via server)
        console.log('📂 Loading from JSON file...');
        const response = await fetch('data/experiences.json?_=' + Date.now()); // Cache bust
        
        if (!response.ok) throw new Error('Failed to load experiences content');
        
        experiencesData = await response.json();
        console.log('✅ Experiences data loaded from JSON file:', experiencesData);
        
        console.log('🎨 Starting to render experiences...');
        renderExperiences();
        console.log('✅ Experiences rendering complete!');
        
    } catch (error) {
        console.error('❌ Error loading experiences:', error);
        // Fallback to static content (original HTML)
    }
});

// Render the experiences page from data
function renderExperiences() {
    const container = document.querySelector('.experiences-container');
    if (!container) {
        console.error('Experiences container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Get enabled sections
    const sections = experiencesData.sections.filter(section => section.enabled !== false);
    
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
    sectionDiv.className = 'experience-section';
    sectionDiv.id = section.id;
    
    // Section title
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = section.title || 'Experiences';
    sectionDiv.appendChild(title);
    
    // Items grid
    const grid = document.createElement('div');
    grid.className = 'experiences-grid';
    
    items.forEach(item => {
        const card = renderExperienceCard(item);
        grid.appendChild(card);
    });
    
    sectionDiv.appendChild(grid);
    
    return sectionDiv;
}

// Render individual experience card
function renderExperienceCard(item) {
    const card = document.createElement('div');
    card.className = 'experience-card';
    
    // Image
    const imgContainer = document.createElement('div');
    imgContainer.className = 'experience-image';
    
    const img = document.createElement('img');
    img.src = item.image || 'images/placeholder.png';
    img.alt = item.title || 'Experience';
    img.onerror = function() {
        this.src = 'images/placeholder.png';
    };
    
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    
    // Content
    const content = document.createElement('div');
    content.className = 'experience-content';
    
    // Title
    const title = document.createElement('h3');
    title.className = 'experience-title';
    title.textContent = item.title || 'Untitled Experience';
    content.appendChild(title);
    
    // Description
    if (item.description) {
        const desc = document.createElement('p');
        desc.className = 'experience-description';
        desc.textContent = item.description;
        content.appendChild(desc);
    }
    
    // Learn More button (only show if details are enabled)
    if (item.link && item.details && item.details.enabled) {
        const btn = document.createElement('a');
        btn.href = item.link;
        btn.className = 'btn-learn-more';
        btn.textContent = 'Explore';
        content.appendChild(btn);
    }
    
    card.appendChild(content);
    
    return card;
}
