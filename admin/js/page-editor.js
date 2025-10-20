// Page Editor - Universal Content Management System
// Handles editing for Attractions, Events, Experiences, and all other pages

// ============================================
// GLOBAL STATE
// ============================================

let pageData = null;
let currentPage = null;
let hasUnsavedChanges = false;
let currentEditingSection = null;
let currentEditingItem = null;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Get page from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    currentPage = urlParams.get('page');
    
    if (!currentPage) {
        showNotification('No page specified', 'error');
        setTimeout(() => window.location.href = 'dashboard.html', 2000);
        return;
    }
    
    loadPageData();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Warn before leaving with unsaved changes
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

// ============================================
// DATA LOADING
// ============================================

async function loadPageData() {
    try {
        showNotification('Loading page data...', 'info');
        
        // Determine the data file based on page
        const dataFile = getDataFile(currentPage);
        const response = await fetch(dataFile);
        
        if (!response.ok) {
            throw new Error('Page data not found');
        }
        
        pageData = await response.json();
        
        // Update page title
        const pageConfig = getPageConfig(currentPage);
        document.getElementById('pageTitle').textContent = pageConfig.title;
        document.title = `${pageConfig.title} - Liliw Tourism Admin`;
        
        renderPageInfo(pageConfig);
        renderSections();
        
        showNotification('Page loaded successfully!', 'success');
    } catch (error) {
        console.error('Error loading page:', error);
        showNotification('Failed to load page data', 'error');
        renderEmptyState();
    }
}

// Get data file path based on page type
function getDataFile(page) {
    const dataFiles = {
        'attractions': '../data/attractions.json',
        'events': '../data/events.json',
        'experiences': '../data/experiences.json',
        'plan-trip': '../data/plan-trip.json',
        'where-to-eat': '../data/where-to-eat.json',
        'where-to-stay': '../data/where-to-stay.json',
        'travel-tips': '../data/travel-tips.json'
    };
    
    return dataFiles[page] || '../data/page-' + page + '.json';
}

// Get page configuration
function getPageConfig(page) {
    const configs = {
        'attractions': {
            title: 'Attractions Editor',
            icon: '🏛️',
            description: 'Manage tourist attractions, heritage sites, and natural wonders',
            itemName: 'Attraction',
            itemsName: 'Attractions'
        },
        'events': {
            title: 'Events Editor',
            icon: '🎉',
            description: 'Manage festivals, cultural events, and community celebrations',
            itemName: 'Event',
            itemsName: 'Events'
        },
        'experiences': {
            title: 'Experiences Editor',
            icon: '✨',
            description: 'Manage local experiences, activities, and things to do',
            itemName: 'Experience',
            itemsName: 'Experiences'
        },
        'plan-trip': {
            title: 'Plan Your Trip Editor',
            icon: '🗺️',
            description: 'Manage travel planning information, tips, and guides',
            itemName: 'Section',
            itemsName: 'Sections'
        },
        'where-to-eat': {
            title: 'Where to Eat Editor',
            icon: '🍴',
            description: 'Manage restaurant listings and dining options',
            itemName: 'Restaurant',
            itemsName: 'Restaurants'
        },
        'where-to-stay': {
            title: 'Where to Stay Editor',
            icon: '🏨',
            description: 'Manage accommodation listings and lodging options',
            itemName: 'Accommodation',
            itemsName: 'Accommodations'
        },
        'travel-tips': {
            title: 'Travel Tips Editor',
            icon: '💡',
            description: 'Manage helpful travel information and visitor tips',
            itemName: 'Tip',
            itemsName: 'Tips'
        }
    };
    
    return configs[page] || {
        title: 'Page Editor',
        icon: '📄',
        description: 'Manage page content',
        itemName: 'Item',
        itemsName: 'Items'
    };
}

// Render page info card
function renderPageInfo(config) {
    const pageInfoCard = document.getElementById('pageInfoCard');
    pageInfoCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <div style="font-size: 48px;">${config.icon}</div>
            <div>
                <h2 class="card-title">${config.title}</h2>
                <p class="card-description">${config.description}</p>
            </div>
        </div>
    `;
}

// Render empty state if no data
function renderEmptyState() {
    const container = document.getElementById('sectionsContainer');
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>No Content Yet</h3>
            <p>This page doesn't have content data yet. Create a JSON file in the /data folder to start editing.</p>
            <button class="btn btn-primary" onclick="createEmptyData()">Create Empty Data File</button>
        </div>
    `;
}

// ============================================
// SECTIONS RENDERING
// ============================================

function renderSections() {
    const container = document.getElementById('sectionsContainer');
    
    if (!pageData || !pageData.sections || pageData.sections.length === 0) {
        renderEmptyState();
        return;
    }
    
    const config = getPageConfig(currentPage);
    
    container.innerHTML = pageData.sections.map((section, index) => `
        <div class="section-item" data-index="${index}">
            <div class="section-header">
                <div class="drag-handle">☰</div>
                <div class="section-info">
                    <h3 class="section-title">${section.title || 'Untitled Section'}</h3>
                    <p class="section-meta">${section.items ? section.items.length : 0} ${config.itemsName}</p>
                </div>
                <div class="section-actions">
                    <label class="toggle-switch" title="Enable/Disable Section">
                        <input type="checkbox" ${section.enabled !== false ? 'checked' : ''} 
                               onchange="toggleSection(${index})">
                        <span class="toggle-slider"></span>
                    </label>
                    <button class="btn-icon" onclick="editSection(${index})" title="Edit Section">
                        ✏️
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteSection(${index})" title="Delete Section">
                        🗑️
                    </button>
                </div>
            </div>
            
            ${section.items && section.items.length > 0 ? `
                <div class="items-list">
                    ${section.items.map((item, itemIndex) => renderItem(item, index, itemIndex)).join('')}
                </div>
            ` : '<div class="no-items">No items in this section</div>'}
            
            <button class="btn btn-sm btn-outline" onclick="addItem(${index})">
                ➕ Add ${config.itemName}
            </button>
        </div>
    `).join('');
    
    // Initialize sortable for sections
    initializeSectionsSortable();
}

// Render individual item
function renderItem(item, sectionIndex, itemIndex) {
    return `
        <div class="item-card" data-section="${sectionIndex}" data-item="${itemIndex}">
            <div class="item-drag-handle">⋮⋮</div>
            ${item.image ? `<img src="../${item.image}" alt="${item.title}" class="item-image" onerror="this.style.display='none'">` : ''}
            <div class="item-content">
                <h4 class="item-title">${item.title || 'Untitled'}</h4>
                ${item.description ? `<p class="item-description">${truncate(item.description, 100)}</p>` : ''}
                ${item.date ? `<span class="item-badge">📅 ${item.date}</span>` : ''}
                ${item.location ? `<span class="item-badge">📍 ${item.location}</span>` : ''}
            </div>
            <div class="item-actions">
                <label class="toggle-switch-sm" title="Enable/Disable">
                    <input type="checkbox" ${item.enabled !== false ? 'checked' : ''} 
                           onchange="toggleItem(${sectionIndex}, ${itemIndex})">
                    <span class="toggle-slider-sm"></span>
                </label>
                <button class="btn-icon-sm" onclick="editItem(${sectionIndex}, ${itemIndex})" title="Edit">
                    ✏️
                </button>
                <button class="btn-icon-sm btn-danger" onclick="deleteItem(${sectionIndex}, ${itemIndex})" title="Delete">
                    🗑️
                </button>
            </div>
        </div>
    `;
}

// ============================================
// SORTABLE FUNCTIONALITY
// ============================================

function initializeSectionsSortable() {
    const container = document.getElementById('sectionsContainer');
    if (!container || typeof Sortable === 'undefined') return;
    
    new Sortable(container, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        onEnd: function() {
            updateSectionOrder();
        }
    });
    
    // Initialize sortable for items within each section
    document.querySelectorAll('.items-list').forEach(list => {
        new Sortable(list, {
            animation: 150,
            handle: '.item-drag-handle',
            ghostClass: 'sortable-ghost',
            onEnd: function(evt) {
                updateItemOrder(evt.from);
            }
        });
    });
}

function updateSectionOrder() {
    const items = document.querySelectorAll('.section-item');
    const newOrder = Array.from(items).map(item => 
        parseInt(item.dataset.index)
    );
    
    const reorderedSections = newOrder.map(index => pageData.sections[index]);
    pageData.sections = reorderedSections;
    
    hasUnsavedChanges = true;
    showNotification('Section order changed', 'info');
    renderSections();
}

function updateItemOrder(listElement) {
    const sectionIndex = parseInt(listElement.closest('.section-item').dataset.index);
    const items = listElement.querySelectorAll('.item-card');
    
    const newOrder = Array.from(items).map(item => 
        parseInt(item.dataset.item)
    );
    
    const reorderedItems = newOrder.map(index => 
        pageData.sections[sectionIndex].items[index]
    );
    
    pageData.sections[sectionIndex].items = reorderedItems;
    
    hasUnsavedChanges = true;
    showNotification('Item order changed', 'info');
    renderSections();
}

// ============================================
// SECTION OPERATIONS
// ============================================

function addNewSection() {
    const config = getPageConfig(currentPage);
    const newSection = {
        id: 'section-' + Date.now(),
        title: 'New Section',
        enabled: true,
        items: []
    };
    
    if (!pageData.sections) {
        pageData.sections = [];
    }
    
    pageData.sections.push(newSection);
    hasUnsavedChanges = true;
    renderSections();
    showNotification('New section added', 'success');
}

function editSection(index) {
    currentEditingSection = { index, data: { ...pageData.sections[index] } };
    const section = pageData.sections[index];
    
    const form = document.getElementById('sectionEditForm');
    form.innerHTML = `
        <div class="form-group">
            <label>Section Title</label>
            <input type="text" id="sectionTitle" value="${section.title || ''}" 
                   placeholder="Enter section title" class="form-control">
        </div>
        
        <div class="form-group">
            <label>Section Description (Optional)</label>
            <textarea id="sectionDescription" rows="3" class="form-control" 
                      placeholder="Enter section description">${section.description || ''}</textarea>
        </div>
        
        <div class="form-group">
            <label class="checkbox-label">
                <input type="checkbox" id="sectionEnabled" ${section.enabled !== false ? 'checked' : ''}>
                <span>Section Enabled (visible on website)</span>
            </label>
        </div>
    `;
    
    openModal('editSectionModal');
}

function saveSectionChanges() {
    if (!currentEditingSection) return;
    
    const index = currentEditingSection.index;
    
    pageData.sections[index].title = document.getElementById('sectionTitle').value;
    pageData.sections[index].description = document.getElementById('sectionDescription').value;
    pageData.sections[index].enabled = document.getElementById('sectionEnabled').checked;
    
    hasUnsavedChanges = true;
    renderSections();
    closeModal('editSectionModal');
    showNotification('Section updated!', 'success');
    currentEditingSection = null;
}

function toggleSection(index) {
    pageData.sections[index].enabled = !pageData.sections[index].enabled;
    hasUnsavedChanges = true;
    showNotification(`Section ${pageData.sections[index].enabled ? 'enabled' : 'disabled'}`, 'info');
}

function deleteSection(index) {
    const section = pageData.sections[index];
    if (confirm(`Delete section "${section.title}"? This cannot be undone.`)) {
        pageData.sections.splice(index, 1);
        hasUnsavedChanges = true;
        renderSections();
        showNotification('Section deleted', 'success');
    }
}

// ============================================
// ITEM OPERATIONS
// ============================================

function addItem(sectionIndex) {
    currentEditingSection = { index: sectionIndex };
    const config = getPageConfig(currentPage);
    
    const form = document.getElementById('itemAddForm');
    form.innerHTML = generateItemForm({
        title: '',
        description: '',
        image: '',
        enabled: true
    }, config);
    
    openModal('addItemModal');
}

function saveNewItem() {
    if (!currentEditingSection) return;
    
    const sectionIndex = currentEditingSection.index;
    const newItem = getItemFormData();
    
    if (!pageData.sections[sectionIndex].items) {
        pageData.sections[sectionIndex].items = [];
    }
    
    pageData.sections[sectionIndex].items.push(newItem);
    hasUnsavedChanges = true;
    renderSections();
    closeModal('addItemModal');
    showNotification('Item added successfully!', 'success');
    currentEditingSection = null;
}

function editItem(sectionIndex, itemIndex) {
    currentEditingItem = { sectionIndex, itemIndex };
    const item = pageData.sections[sectionIndex].items[itemIndex];
    const config = getPageConfig(currentPage);
    
    const form = document.getElementById('itemEditForm');
    form.innerHTML = generateItemForm(item, config);
    
    openModal('editItemModal');
}

function saveItemChanges() {
    if (!currentEditingItem) return;
    
    const { sectionIndex, itemIndex } = currentEditingItem;
    const updatedItem = getItemFormData();
    
    pageData.sections[sectionIndex].items[itemIndex] = updatedItem;
    hasUnsavedChanges = true;
    renderSections();
    closeModal('editItemModal');
    showNotification('Item updated!', 'success');
    currentEditingItem = null;
}

function toggleItem(sectionIndex, itemIndex) {
    const item = pageData.sections[sectionIndex].items[itemIndex];
    item.enabled = !item.enabled;
    hasUnsavedChanges = true;
    showNotification(`Item ${item.enabled ? 'enabled' : 'disabled'}`, 'info');
}

function deleteItem(sectionIndex, itemIndex) {
    const item = pageData.sections[sectionIndex].items[itemIndex];
    if (confirm(`Delete "${item.title}"? This cannot be undone.`)) {
        pageData.sections[sectionIndex].items.splice(itemIndex, 1);
        hasUnsavedChanges = true;
        renderSections();
        showNotification('Item deleted', 'success');
    }
}

// ============================================
// FORM GENERATION
// ============================================

function generateItemForm(item, config) {
    return `
        <div class="form-group">
            <label>Title *</label>
            <input type="text" id="itemTitle" value="${item.title || ''}" 
                   placeholder="Enter ${config.itemName.toLowerCase()} title" class="form-control" required>
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="itemDescription" rows="4" class="form-control" 
                      placeholder="Enter description">${item.description || ''}</textarea>
        </div>
        
        <div class="form-group">
            <label>Image Path</label>
            <input type="text" id="itemImage" value="${item.image || ''}" 
                   placeholder="images/example.jpg" class="form-control">
            <small class="form-hint">Use Image Manager to upload and get image paths</small>
        </div>
        
        ${currentPage === 'events' ? `
            <div class="form-group">
                <label>Date</label>
                <input type="text" id="itemDate" value="${item.date || ''}" 
                       placeholder="April 2026" class="form-control">
            </div>
        ` : ''}
        
        ${['attractions', 'where-to-eat', 'where-to-stay'].includes(currentPage) ? `
            <div class="form-group">
                <label>Location</label>
                <input type="text" id="itemLocation" value="${item.location || ''}" 
                       placeholder="Address or location" class="form-control">
            </div>
        ` : ''}
        
        <div class="form-group">
            <label>Link/URL (Optional)</label>
            <input type="text" id="itemLink" value="${item.link || ''}" 
                   placeholder="https://example.com or #section" class="form-control">
        </div>
        
        <div class="form-group">
            <label class="checkbox-label">
                <input type="checkbox" id="itemEnabled" ${item.enabled !== false ? 'checked' : ''}>
                <span>Item Enabled (visible on website)</span>
            </label>
        </div>
    `;
}

function getItemFormData() {
    const item = {
        id: document.getElementById('itemId')?.value || 'item-' + Date.now(),
        title: document.getElementById('itemTitle').value,
        description: document.getElementById('itemDescription').value,
        image: document.getElementById('itemImage').value,
        link: document.getElementById('itemLink').value,
        enabled: document.getElementById('itemEnabled').checked
    };
    
    // Add optional fields based on page type
    if (currentPage === 'events') {
        item.date = document.getElementById('itemDate')?.value || '';
    }
    
    if (['attractions', 'where-to-eat', 'where-to-stay'].includes(currentPage)) {
        item.location = document.getElementById('itemLocation')?.value || '';
    }
    
    return item;
}

// ============================================
// SAVE & PREVIEW
// ============================================

async function savePage() {
    if (!hasUnsavedChanges) {
        showNotification('No changes to save', 'info');
        return;
    }
    
    try {
        showNotification('Saving page...', 'saving');
        
        // Create backup first
        await createBackup();
        
        // Save to localStorage (in production, this would save to server/GitHub)
        const dataKey = `pageData_${currentPage}`;
        localStorage.setItem(dataKey, JSON.stringify(pageData, null, 2));
        
        hasUnsavedChanges = false;
        showNotification('Page saved successfully!', 'success');
        
        // Log activity
        logActivity(`Saved ${getPageConfig(currentPage).title}`);
        
    } catch (error) {
        console.error('Save error:', error);
        showNotification('Failed to save page', 'error');
    }
}

async function createBackup() {
    const backupKey = `backup_${currentPage}_${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify(pageData));
    
    // Keep only last 5 backups
    const allBackups = Object.keys(localStorage)
        .filter(key => key.startsWith(`backup_${currentPage}_`))
        .sort()
        .reverse();
    
    if (allBackups.length > 5) {
        allBackups.slice(5).forEach(key => localStorage.removeItem(key));
    }
}

function previewPage() {
    showNotification('Loading preview...', 'info');
    
    const pageFiles = {
        'attractions': '../attractions.html',
        'events': '../events.html',
        'experiences': '../experiences.html',
        'plan-trip': '../plan-your-trip.html',
        'where-to-eat': '../where-to-eat.html',
        'where-to-stay': '../where-to-stay.html',
        'travel-tips': '../travel-tips.html'
    };
    
    const previewUrl = pageFiles[currentPage];
    
    if (previewUrl) {
        document.getElementById('previewFrame').src = previewUrl;
        openModal('previewModal');
    } else {
        showNotification('Preview not available for this page', 'error');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function truncate(text, length) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
}

function showNotification(message, type = 'info') {
    if (window.editorUtils && editorUtils.statusNotification) {
        editorUtils.statusNotification[type](message);
    }
}

function logActivity(message) {
    const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
    activities.unshift({
        message,
        timestamp: new Date().toISOString(),
        user: 'admin'
    });
    localStorage.setItem('recentActivities', JSON.stringify(activities.slice(0, 10)));
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Logout function
function logout(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        if (hasUnsavedChanges) {
            if (!confirm('You have unsaved changes. Logout anyway?')) {
                return;
            }
        }
        localStorage.removeItem('adminSession');
        window.location.href = 'index.html';
    }
}
