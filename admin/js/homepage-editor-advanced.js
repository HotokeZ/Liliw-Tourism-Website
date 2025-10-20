// Advanced Homepage Editor - Full CMS with Card-Level Editing
// Handles homepage section management AND card editing within each section

let currentContent = null;
let currentEditingSection = null;
let currentEditingCard = null;
let hasUnsavedChanges = false;
let quillEditor = null;

// ============================================
// INITIALIZATION
// ============================================

let retryCount = 0;
const MAX_RETRIES = 20;

function initializeEditor() {
    console.log('Advanced Homepage Editor initializing... (attempt ' + (retryCount + 1) + ')');
    
    if (typeof isAuthenticated !== 'function') {
        retryCount++;
        if (retryCount < MAX_RETRIES) {
            console.log('isAuthenticated function not found! Retrying in 100ms...');
            setTimeout(initializeEditor, 100);
        } else {
            console.error('Failed to load auth.js after ' + MAX_RETRIES + ' attempts');
            alert('Error: Authentication system failed to load. Please refresh the page.');
        }
        return;
    }
    
    console.log('Authentication system loaded successfully');
    
    if (!isAuthenticated()) {
        console.log('Not authenticated, redirecting to login...');
        window.location.href = 'index.html';
        return;
    }
    
    console.log('Authentication check passed');
    loadHomepageContent();
    setupEventListeners();
    
    if (typeof logActivity === 'function') {
        logActivity('Opened Advanced Homepage Editor');
    }
}

document.addEventListener('DOMContentLoaded', initializeEditor);

// ============================================
// LOAD HOMEPAGE CONTENT
// ============================================

async function loadHomepageContent() {
    console.log('[loadHomepageContent] Starting...');
    const sectionList = document.getElementById('sectionList');
    
    if (!sectionList) {
        console.error('[loadHomepageContent] ERROR: sectionList element not found!');
        return;
    }
    
    sectionList.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading content...</p></div>';
    
    try {
        // Try to load draft first
        let data = null;
        const draftData = localStorage.getItem('liliw_homepage_content_draft');
        
        if (draftData) {
            const parsed = JSON.parse(draftData);
            if (parsed.sections && parsed.sections.length > 0) {
                data = parsed;
                console.log('[loadHomepageContent] Using draft with', parsed.sections.length, 'sections');
            } else {
                localStorage.removeItem('liliw_homepage_content_draft');
            }
        }
        
        // Load from JSON if no draft
        if (!data) {
            console.log('[loadHomepageContent] Fetching from ../data/homepage-content.json...');
            const response = await fetch('../data/homepage-content.json');
            console.log('[loadHomepageContent] Fetch response:', response.status);
            
            if (!response.ok) throw new Error('Failed to load homepage content (HTTP ' + response.status + ')');
            
            data = await response.json();
            console.log('[loadHomepageContent] Loaded data from JSON');
        }
        
        if (!data.sections || data.sections.length === 0) {
            throw new Error('No sections found in data');
        }
        
        currentContent = data;
        console.log('[loadHomepageContent] Content loaded:', data.sections.length, 'sections');
        
        renderSections();
        initializeSortable();
        
    } catch (error) {
        console.error('[loadHomepageContent] ERROR:', error);
        sectionList.innerHTML = `
            <div class="loading-spinner">
                <p style="color: var(--danger);">Failed to load content: ${error.message}</p>
                <p style="color: #64748b; font-size: 12px;">Check console for details</p>
            </div>
        `;
    }
}

// ============================================
// RENDER SECTIONS
// ============================================

function renderSections() {
    const sectionList = document.getElementById('sectionList');
    
    if (!currentContent || !currentContent.sections) {
        sectionList.innerHTML = '<div class="loading-spinner"><p>No sections found.</p></div>';
        return;
    }
    
    const sections = currentContent.sections.sort((a, b) => a.order - b.order);
    
    sectionList.innerHTML = sections.map((section, index) => {
        const isEnabled = section.enabled !== false;
        const cardCount = section.cards ? section.cards.length : 0;
        const enabledCardCount = section.cards ? section.cards.filter(c => c.enabled).length : 0;
        
        return `
            <div class="section-item ${!isEnabled ? 'disabled' : ''}" data-section-id="${section.id}">
                <div class="section-item-header">
                    <span class="drag-handle" title="Drag to reorder">☰</span>
                    <div class="section-order">${index + 1}</div>
                    <div class="section-info">
                        <div class="section-name">${section.title}</div>
                        <div class="section-id">${section.id} • ${section.type}${cardCount > 0 ? ` • ${enabledCardCount}/${cardCount} cards` : ''}</div>
                    </div>
                    <div class="section-controls">
                        <div class="toggle-switch ${isEnabled ? 'active' : ''}" 
                             onclick="toggleSection('${section.id}')"
                             title="${isEnabled ? 'Enabled - Click to disable' : 'Disabled - Click to enable'}">
                            <div class="toggle-slider"></div>
                        </div>
                        <button class="edit-btn" onclick="editSection('${section.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// SORTABLE (Drag and Drop)
// ============================================

let sortableInstance = null;

function initializeSortable() {
    const sectionList = document.getElementById('sectionList');
    
    if (sortableInstance) {
        sortableInstance.destroy();
    }
    
    if (typeof Sortable === 'undefined') {
        console.warn('SortableJS not loaded');
        return;
    }
    
    sortableInstance = Sortable.create(sectionList, {
        animation: 200,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: function(evt) {
            handleSectionReorder(evt.oldIndex, evt.newIndex);
        }
    });
}

function handleSectionReorder(oldIndex, newIndex) {
    if (oldIndex === newIndex) return;
    
    const movedSection = currentContent.sections.splice(oldIndex, 1)[0];
    currentContent.sections.splice(newIndex, 0, movedSection);
    
    currentContent.sections.forEach((section, index) => {
        section.order = index + 1;
    });
    
    hasUnsavedChanges = true;
    renderSections();
    initializeSortable();
    saveDraft();
    
    showNotification('Section order changed. Remember to save!', 'info');
}

// ============================================
// TOGGLE SECTION
// ============================================

window.toggleSection = function(sectionId) {
    const section = currentContent.sections.find(s => s.id === sectionId);
    if (!section) return;
    
    section.enabled = !section.enabled;
    hasUnsavedChanges = true;
    
    renderSections();
    initializeSortable();
    saveDraft();
    
    const status = section.enabled ? 'enabled' : 'disabled';
    showNotification(`Section "${section.title}" ${status}`, 'info');
    logActivity(`${section.enabled ? 'Enabled' : 'Disabled'} section: ${section.title}`);
};

// ============================================
// EDIT SECTION (Shows cards list or section data)
// ============================================

window.editSection = function(sectionId) {
    const section = currentContent.sections.find(s => s.id === sectionId);
    if (!section) return;
    
    currentEditingSection = JSON.parse(JSON.stringify(section));
    
    // Open modal
    openModal('editModal');
    
    // Populate modal based on section type
    const modalHeader = document.querySelector('#editModal .modal-header h2');
    const modalBody = document.querySelector('#editModal .modal-body');
    
    modalHeader.textContent = `Edit: ${section.title}`;
    
    if (section.cards && section.cards.length > 0) {
        // Section has cards - show card list
        renderCardList(section);
    } else {
        // Section has no cards - show section data editor
        renderSectionDataEditor(section);
    }
};

// Render card list for sections with cards
function renderCardList(section) {
    const modalBody = document.querySelector('#editModal .modal-body');
    
    const cards = section.cards.sort((a, b) => a.order - b.order);
    
    modalBody.innerHTML = `
        <div class="card-list-header">
            <h3>Manage Cards</h3>
            <button class="btn btn-primary" onclick="addNewCard('${section.id}')">
                <span>➕</span> Add Card
            </button>
        </div>
        
        <div class="card-list" id="cardList">
            ${cards.map((card, index) => {
                // Get first image (support both single image and images array)
                const firstImage = card.images ? card.images[0] : (card.image || 'images/placeholder.png');
                const imageCount = card.images ? card.images.length : 1;
                
                return `
                <div class="card-item ${!card.enabled ? 'disabled' : ''}" data-card-id="${card.id}">
                    <span class="drag-handle-small">☰</span>
                    <div class="card-preview">
                        <img src="../${firstImage}" alt="${card.title}" onerror="this.src='../images/placeholder.png'">
                        ${imageCount > 1 ? `<span class="image-count-badge">${imageCount} 📷</span>` : ''}
                    </div>
                    <div class="card-item-info">
                        <div class="card-item-title">${card.title}</div>
                        <div class="card-item-desc">${card.description || ''}</div>
                    </div>
                    <div class="card-item-controls">
                        <div class="toggle-switch ${card.enabled ? 'active' : ''}" 
                             onclick="toggleCard('${section.id}', '${card.id}')"
                             title="${card.enabled ? 'Enabled' : 'Disabled'}">
                            <div class="toggle-slider"></div>
                        </div>
                        <button class="btn-icon" onclick="editCard('${section.id}', '${card.id}')" title="Edit">
                            ✏️
                        </button>
                        <button class="btn-icon" onclick="deleteCard('${section.id}', '${card.id}')" title="Delete">
                            🗑️
                        </button>
                    </div>
                </div>
            `}).join('')}
        </div>
    `;
    
    // Initialize sortable for cards
    setTimeout(() => {
        const cardListEl = document.getElementById('cardList');
        if (cardListEl && typeof Sortable !== 'undefined') {
            Sortable.create(cardListEl, {
                animation: 200,
                handle: '.drag-handle-small',
                onEnd: function(evt) {
                    handleCardReorder(section.id, evt.oldIndex, evt.newIndex);
                }
            });
        }
    }, 100);
}

// Render section data editor (for sections without cards)
function renderSectionDataEditor(section) {
    const modalBody = document.querySelector('#editModal .modal-body');
    
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Section Title</label>
            <input type="text" id="sectionTitle" value="${section.title || ''}" />
        </div>
        
        <div class="form-group">
            <label>Section Type</label>
            <input type="text" id="sectionType" value="${section.type || ''}" readonly style="background: #f0f0f0;" />
        </div>
        
        <div class="form-group">
            <label>Section Data (JSON)</label>
            <textarea id="sectionData" rows="10" style="font-family: monospace;">${JSON.stringify(section.data || {}, null, 2)}</textarea>
            <p style="font-size: 12px; color: #64748b; margin-top: 5px;">Edit the JSON data for this section. Be careful with syntax!</p>
        </div>
    `;
}

// Continued in next file...
console.log('Advanced homepage editor (part 1) loaded');
