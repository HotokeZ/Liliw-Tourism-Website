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
    // Get primary image (first in array or fallback to single image property)
    let primaryImage = '';
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        primaryImage = item.images[0];
    } else if (item.image) {
        primaryImage = item.image;
    }
    
    // Count images
    const imageCount = item.images && Array.isArray(item.images) ? item.images.length : (item.image ? 1 : 0);
    const isEnabled = item.enabled !== false;
    const hasDetails = item.details && item.details.enabled;
    
    return `
        <div class="item-card ${!isEnabled ? 'card-disabled' : ''}" data-section="${sectionIndex}" data-item="${itemIndex}">
            <div class="item-drag-handle">⋮⋮</div>
            ${primaryImage ? `
                <div class="item-image-container">
                    <img src="../${primaryImage}" alt="${item.title}" class="item-image" 
                         onerror="this.src='../images/placeholder.png'">
                    ${imageCount > 1 ? `<span class="image-count-badge">🖼️ ${imageCount}</span>` : ''}
                    ${hasDetails ? `<span class="details-badge">📄 Details</span>` : ''}
                </div>
            ` : ''}
            <div class="item-content">
                <h4 class="item-title">${item.title || 'Untitled'}</h4>
                ${item.description ? `<p class="item-description">${truncate(item.description, 100)}</p>` : ''}
                ${item.date ? `<span class="item-badge">📅 ${item.date}</span>` : ''}
                ${item.location ? `<span class="item-badge">📍 ${item.location}</span>` : ''}
            </div>
            <div class="item-actions">
                <button class="btn-icon-sm btn-secondary" onclick="editItemDetails(${sectionIndex}, ${itemIndex})" 
                        title="Edit Details Page">
                    📄
                </button>
                <label class="toggle-switch-sm" title="Enable/Disable">
                    <input type="checkbox" ${isEnabled ? 'checked' : ''} 
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
    
    // Initialize empty images array
    currentEditingItemImages = [];
    window.pendingItemImageUploads = [];
    
    const form = document.getElementById('itemAddForm');
    form.innerHTML = generateItemForm({
        title: '',
        description: '',
        images: [],
        enabled: true
    }, config);
    
    openModal('addItemModal');
    
    // Initialize empty images list
    setTimeout(() => {
        renderItemImages();
    }, 100);
}

async function saveNewItem() {
    if (!currentEditingSection) return;
    
    const sectionIndex = currentEditingSection.index;
    
    // Validate title
    const title = document.getElementById('itemTitle').value.trim();
    if (!title) {
        showNotification('Please enter a title', 'error');
        return;
    }
    
    // Upload pending images first
    showNotification('Uploading images...', 'info');
    await uploadItemImages();
    
    // Get form data with images array
    const newItem = getItemFormData();
    
    if (!pageData.sections[sectionIndex].items) {
        pageData.sections[sectionIndex].items = [];
    }
    
    pageData.sections[sectionIndex].items.push(newItem);
    hasUnsavedChanges = true;
    
    closeModal('addItemModal');
    renderSections();
    showNotification('Item added! Saving to server...', 'success');
    
    // Auto-save to server
    try {
        await savePage();
        showNotification('Item saved successfully!', 'success');
    } catch (error) {
        console.error('Auto-save failed:', error);
        showNotification('Item added locally. Click Save to sync to server.', 'warning');
    }
    
    currentEditingSection = null;
    currentEditingItemImages = [];
}

function editItem(sectionIndex, itemIndex) {
    currentEditingItem = { sectionIndex, itemIndex };
    const item = pageData.sections[sectionIndex].items[itemIndex];
    const config = getPageConfig(currentPage);
    
    // Initialize images array for editing
    if (item.images && Array.isArray(item.images)) {
        currentEditingItemImages = [...item.images];
    } else if (item.image) {
        // Convert old single image to array
        currentEditingItemImages = [item.image];
    } else {
        currentEditingItemImages = [];
    }
    
    window.pendingItemImageUploads = [];
    
    const form = document.getElementById('itemEditForm');
    form.innerHTML = generateItemForm(item, config);
    
    openModal('editItemModal');
    
    // Initialize images list after modal opens
    setTimeout(() => {
        renderItemImages();
    }, 100);
}

async function saveItemChanges() {
    if (!currentEditingItem) return;
    
    const { sectionIndex, itemIndex } = currentEditingItem;
    
    // Validate title
    const title = document.getElementById('itemTitle').value.trim();
    if (!title) {
        showNotification('Please enter a title', 'error');
        return;
    }
    
    // Upload pending images first
    if (window.pendingItemImageUploads && window.pendingItemImageUploads.length > 0) {
        showNotification('Uploading images...', 'info');
        await uploadItemImages();
    }
    
    // Get updated form data with images array
    const updatedItem = getItemFormData();
    
    pageData.sections[sectionIndex].items[itemIndex] = updatedItem;
    hasUnsavedChanges = true;
    
    closeModal('editItemModal');
    renderSections();
    showNotification('Item updated! Saving to server...', 'success');
    
    // Auto-save to server
    try {
        await savePage();
        showNotification('Changes saved successfully!', 'success');
    } catch (error) {
        console.error('Auto-save failed:', error);
        showNotification('Item updated locally. Click Save to sync to server.', 'warning');
    }
    
    currentEditingItem = null;
    currentEditingItemImages = [];
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
// FORM GENERATION - RICH CARD EDITOR
// ============================================

function generateItemForm(item, config) {
    // Ensure images array exists
    if (!item.images && item.image) {
        // Convert old single image to array
        item.images = [item.image];
    } else if (!item.images) {
        item.images = [];
    }
    
    return `
        <div class="card-edit-grid">
            <!-- Left Column: Form Fields -->
            <div class="card-edit-fields">
                <div class="form-group">
                    <label>Title *</label>
                    <input type="text" id="itemTitle" value="${item.title || ''}" 
                           placeholder="Enter ${config.itemName.toLowerCase()} title" 
                           class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="itemDescription" rows="6" class="form-control" 
                              placeholder="Enter a detailed description...">${item.description || ''}</textarea>
                </div>
                
                ${currentPage === 'events' ? `
                    <div class="form-group">
                        <label>📅 Date</label>
                        <input type="text" id="itemDate" value="${item.date || ''}" 
                               placeholder="e.g., April 2026" class="form-control">
                    </div>
                ` : ''}
                
                ${['attractions', 'where-to-eat', 'where-to-stay'].includes(currentPage) ? `
                    <div class="form-group">
                        <label>📍 Location</label>
                        <input type="text" id="itemLocation" value="${item.location || ''}" 
                               placeholder="Address or location" class="form-control">
                    </div>
                ` : ''}
                
                <div class="form-group">
                    <label>🔗 Link/URL (Optional)</label>
                    <input type="text" id="itemLink" value="${item.link || ''}" 
                           placeholder="https://example.com or #section" class="form-control">
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="itemEnabled" ${item.enabled !== false ? 'checked' : ''}>
                        <span>✅ Item Enabled (visible on website)</span>
                    </label>
                </div>
            </div>
            
            <!-- Right Column: Image Management -->
            <div class="card-edit-images">
                <div class="images-section">
                    <label class="section-label">
                        <span>🖼️ Images</span>
                        <span class="label-hint">Drag to reorder • First image is primary</span>
                    </label>
                    
                    <!-- Images List (Sortable) -->
                    <div id="imagesList" class="images-list">
                        ${item.images.map((img, index) => `
                            <div class="image-item" data-index="${index}">
                                <div class="drag-handle-image">⋮⋮</div>
                                <img src="../${img}" alt="Image ${index + 1}" 
                                     onerror="this.src='../images/placeholder.png'">
                                <div class="image-item-info">
                                    <span class="image-order">#${index + 1}</span>
                                    <span class="image-filename">${img.split('/').pop()}</span>
                                </div>
                                <button type="button" class="btn-remove-image-item" 
                                        onclick="removeItemImage(${index})">
                                    🗑️
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Upload Button -->
                    <div class="image-upload-section">
                        <input type="file" id="itemImageUpload" accept="image/*" 
                               multiple onchange="handleItemImageUpload(event)" style="display: none;">
                        <button type="button" class="btn btn-outline btn-upload" 
                                onclick="document.getElementById('itemImageUpload').click()">
                            📁 Upload Images
                        </button>
                        <small class="form-hint">Max 5MB per image • JPG, PNG, WebP</small>
                    </div>
                    
                    ${item.images.length > 0 ? `
                        <div class="image-preview-info">
                            <strong>Primary Image:</strong> ${item.images[0].split('/').pop()}
                        </div>
                    ` : `
                        <div class="image-preview-info warning">
                            ⚠️ No images added yet
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}

// ============================================
// IMAGE MANAGEMENT FUNCTIONS
// ============================================

// Global variable to track current editing item's images
let currentEditingItemImages = [];

// Handle multiple image uploads
window.handleItemImageUpload = function(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    files.forEach(file => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification(`${file.name} is not a valid image file`, 'error');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification(`${file.name} is too large (max 5MB)`, 'error');
            return;
        }
        
        // Read and add to images array
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePath = `images/${file.name}`;
            
            // Add to current editing images array
            currentEditingItemImages.push(imagePath);
            
            // Store for upload
            if (!window.pendingItemImageUploads) {
                window.pendingItemImageUploads = [];
            }
            window.pendingItemImageUploads.push({
                file: file,
                path: imagePath,
                dataUrl: e.target.result
            });
            
            // Re-render images list
            renderItemImages();
            showNotification(`${file.name} ready to upload`, 'success');
        };
        reader.readAsDataURL(file);
    });
    
    // Clear file input
    event.target.value = '';
};

// Render item images list with drag-drop reordering
function renderItemImages() {
    const imagesList = document.getElementById('imagesList');
    if (!imagesList) return;
    
    if (!currentEditingItemImages || currentEditingItemImages.length === 0) {
        imagesList.innerHTML = '<div class="no-images">No images added yet</div>';
        updateImagePreviewInfo();
        return;
    }
    
    const images = currentEditingItemImages;
    
    imagesList.innerHTML = images.map((img, index) => {
        // Check if this is a pending upload (data URL) or existing file
        let imageSrc = img;
        if (window.pendingItemImageUploads) {
            const pendingUpload = window.pendingItemImageUploads.find(upload => upload.path === img);
            if (pendingUpload && pendingUpload.dataUrl) {
                imageSrc = pendingUpload.dataUrl;
            } else if (!img.startsWith('data:')) {
                imageSrc = '../' + img;
            }
        } else if (!img.startsWith('data:')) {
            imageSrc = '../' + img;
        }
        
        return `
        <div class="image-item" data-index="${index}">
            <div class="drag-handle-image">⋮⋮</div>
            <img src="${imageSrc}" alt="Image ${index + 1}" 
                 onerror="this.src='../images/placeholder.png'">
            <div class="image-item-info">
                <span class="image-order">#${index + 1}</span>
                <span class="image-filename">${img.split('/').pop()}</span>
            </div>
            <button type="button" class="btn-remove-image-item" 
                    onclick="removeItemImage(${index})">
                🗑️
            </button>
        </div>
    `;
    }).join('');
    
    // Initialize sortable for images
    initializeImagesSortable();
    updateImagePreviewInfo();
}

// Remove image from item
window.removeItemImage = function(index) {
    if (!currentEditingItemImages || currentEditingItemImages.length === 0) return;
    
    const filename = currentEditingItemImages[index].split('/').pop();
    
    if (confirm(`Remove ${filename}?`)) {
        currentEditingItemImages.splice(index, 1);
        
        // Also remove from pending uploads if exists
        if (window.pendingItemImageUploads) {
            window.pendingItemImageUploads = window.pendingItemImageUploads.filter(
                upload => upload.path !== `images/${filename}`
            );
        }
        
        renderItemImages();
        showNotification('Image removed', 'success');
    }
};

// Initialize drag-drop for images
function initializeImagesSortable() {
    const imagesList = document.getElementById('imagesList');
    if (!imagesList || typeof Sortable === 'undefined') return;
    
    // Remove any existing sortable instance
    if (imagesList.sortableInstance) {
        imagesList.sortableInstance.destroy();
    }
    
    imagesList.sortableInstance = new Sortable(imagesList, {
        animation: 150,
        handle: '.drag-handle-image',
        ghostClass: 'sortable-ghost',
        onEnd: function(evt) {
            // Reorder the images array
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            
            if (oldIndex !== newIndex) {
                const movedImage = currentEditingItemImages.splice(oldIndex, 1)[0];
                currentEditingItemImages.splice(newIndex, 0, movedImage);
                
                renderItemImages();
                showNotification('Image order updated', 'info');
            }
        }
    });
}

// Update image preview info
function updateImagePreviewInfo() {
    const infoDiv = document.querySelector('.image-preview-info');
    if (!infoDiv) return;
    
    if (currentEditingItemImages.length > 0) {
        infoDiv.className = 'image-preview-info';
        infoDiv.innerHTML = `<strong>Primary Image:</strong> ${currentEditingItemImages[0].split('/').pop()}`;
    } else {
        infoDiv.className = 'image-preview-info warning';
        infoDiv.innerHTML = '⚠️ No images added yet';
    }
}

// Upload images to server
async function uploadItemImages() {
    if (!window.pendingItemImageUploads || window.pendingItemImageUploads.length === 0) {
        return true; // No images to upload
    }
    
    console.log('📤 Uploading images:', window.pendingItemImageUploads.length);
    
    for (const upload of window.pendingItemImageUploads) {
        try {
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dataUrl: upload.dataUrl,
                    filename: upload.file.name
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Image uploaded:', result.path);
            } else {
                console.error('❌ Upload failed:', result.error);
                showNotification(`Failed to upload ${upload.file.name}`, 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            showNotification(`Error uploading ${upload.file.name}`, 'error');
        }
    }
    
    // Clear pending uploads
    window.pendingItemImageUploads = [];
    return true;
}

function getItemFormData() {
    const item = {
        id: 'item-' + Date.now(),
        title: document.getElementById('itemTitle').value,
        description: document.getElementById('itemDescription').value,
        images: currentEditingItemImages.length > 0 ? [...currentEditingItemImages] : ['images/placeholder.png'],
        link: document.getElementById('itemLink').value,
        enabled: document.getElementById('itemEnabled').checked
    };
    
    // For backwards compatibility, also set single image property to first image
    if (item.images && item.images.length > 0) {
        item.image = item.images[0];
    }
    
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
    console.log('🔵 SAVE BUTTON CLICKED!');
    console.log('🔵 Current page:', currentPage);
    console.log('🔵 Page data:', pageData);
    
    try {
        console.log('🔵 Starting save process...');
        showNotification('Saving page...', 'saving');
        
        // Save to server via API
        const response = await fetch(`/api/save?page=${currentPage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ SUCCESSFULLY SAVED TO FILE!');
            console.log('� File saved:', result.file);
            console.log('� Data saved:', pageData);
            
            hasUnsavedChanges = false;
            showNotification('Page saved successfully!', 'success');
            
            // Log activity
            logActivity(`Saved ${getPageConfig(currentPage).title}`);
        } else {
            throw new Error(result.error || 'Save failed');
        }
        
        
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

function openPreviewInNewTab() {
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
        window.open(previewUrl, '_blank');
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
    console.log(`[Notification ${type}]:`, message);
    
    // Try to use the editor utils notification system
    if (window.editorUtils && window.editorUtils.statusNotification) {
        window.editorUtils.statusNotification.show(message, type);
    } else {
        // Fallback to console
        console.log(`Notification (${type}): ${message}`);
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
// DETAIL PAGE EDITOR
// ============================================

let currentEditingDetail = null;

window.editItemDetails = function(sectionIndex, itemIndex) {
    currentEditingDetail = { sectionIndex, itemIndex };
    const item = pageData.sections[sectionIndex].items[itemIndex];
    const config = getPageConfig(currentPage);
    
    // Initialize details object if it doesn't exist
    if (!item.details) {
        item.details = {
            enabled: false,
            title: item.title,
            subtitle: item.location || '',
            heroImage: item.images && item.images[0] ? item.images[0] : (item.image || ''),
            description: [item.description || ''],
            relatedItems: []
        };
    }
    
    const form = document.getElementById('detailEditorForm');
    form.innerHTML = `
        <div class="detail-editor-container">
            <div class="detail-editor-header">
                <h3>📄 Detail Page for: ${item.title}</h3>
                <label class="checkbox-label">
                    <input type="checkbox" id="detailsEnabled" ${item.details.enabled ? 'checked' : ''}>
                    <span>✅ Enable "See More" button and detail page</span>
                </label>
            </div>
            
            <div class="form-group">
                <label>Detail Page Title</label>
                <input type="text" id="detailTitle" class="form-control" 
                       value="${item.details.title || item.title}" 
                       placeholder="Title for detail page">
            </div>
            
            <div class="form-group">
                <label>Subtitle / Category</label>
                <input type="text" id="detailSubtitle" class="form-control" 
                       value="${item.details.subtitle || ''}" 
                       placeholder="e.g., Historical Heritage Site">
            </div>
            
            <div class="form-group">
                <label>Hero Image (Detail Page)</label>
                <select id="detailHeroImage" class="form-control">
                    ${(item.images || [item.image]).filter(img => img).map(img => `
                        <option value="${img}" ${item.details.heroImage === img ? 'selected' : ''}>
                            ${img.split('/').pop()}
                        </option>
                    `).join('')}
                </select>
                <small class="form-hint">Select which image to use as the hero image on the detail page</small>
            </div>
            
            <div class="form-group">
                <label>Description Paragraphs</label>
                <div id="descriptionParagraphs">
                    ${(item.details.description || ['']).map((para, index) => `
                        <div class="paragraph-group">
                            <textarea class="form-control description-para" rows="4" 
                                      placeholder="Paragraph ${index + 1}">${para}</textarea>
                            ${index > 0 ? `<button type="button" class="btn-remove-para" onclick="removeParagraph(${index})">🗑️</button>` : ''}
                        </div>
                    `).join('')}
                </div>
                <button type="button" class="btn btn-sm btn-outline" onclick="addParagraph()">
                    ➕ Add Paragraph
                </button>
            </div>
            
            <div class="form-group">
                <label>Related Items (Show at bottom)</label>
                <p class="form-hint">Related items will be automatically populated from the same section</p>
            </div>
        </div>
    `;
    
    openModal('detailEditorModal');
};

window.addParagraph = function() {
    const container = document.getElementById('descriptionParagraphs');
    const index = container.querySelectorAll('.paragraph-group').length;
    
    const div = document.createElement('div');
    div.className = 'paragraph-group';
    div.innerHTML = `
        <textarea class="form-control description-para" rows="4" 
                  placeholder="Paragraph ${index + 1}"></textarea>
        <button type="button" class="btn-remove-para" onclick="removeParagraph(${index})">🗑️</button>
    `;
    container.appendChild(div);
};

window.removeParagraph = function(index) {
    const container = document.getElementById('descriptionParagraphs');
    const groups = container.querySelectorAll('.paragraph-group');
    if (groups.length > 1 && groups[index]) {
        groups[index].remove();
    }
};

window.saveDetailChanges = async function() {
    if (!currentEditingDetail) return;
    
    const { sectionIndex, itemIndex } = currentEditingDetail;
    const item = pageData.sections[sectionIndex].items[itemIndex];
    
    // Gather paragraph data
    const paragraphs = Array.from(document.querySelectorAll('.description-para'))
        .map(textarea => textarea.value.trim())
        .filter(text => text.length > 0);
    
    // Update details
    item.details = {
        enabled: document.getElementById('detailsEnabled').checked,
        title: document.getElementById('detailTitle').value,
        subtitle: document.getElementById('detailSubtitle').value,
        heroImage: document.getElementById('detailHeroImage').value,
        description: paragraphs,
        relatedItems: [] // Will be populated dynamically
    };
    
    // Auto-generate link if details are enabled
    if (item.details.enabled) {
        const slug = item.id || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        item.link = `attraction-detail.html?id=${slug}&page=${currentPage}`;
    } else {
        item.link = '';
    }
    
    hasUnsavedChanges = true;
    
    closeModal('detailEditorModal');
    renderSections();
    showNotification('Detail page updated! Saving to server...', 'success');
    
    // Auto-save to server
    try {
        await savePage();
        showNotification('Details saved successfully!', 'success');
    } catch (error) {
        console.error('Auto-save failed:', error);
        showNotification('Details updated locally. Click Save to sync to server.', 'warning');
    }
    
    currentEditingDetail = null;
};

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
