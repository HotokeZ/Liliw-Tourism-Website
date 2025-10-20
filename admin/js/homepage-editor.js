// Homepage Editor - Liliw Tourism Admin
// Handles homepage section management, drag-drop, and content editing

let currentSections = [];
let sortableInstance = null;
let currentEditingSection = null;
let hasUnsavedChanges = false;

// ============================================
// INITIALIZATION
// ============================================

let retryCount = 0;
const MAX_RETRIES = 20; // Max 2 seconds (20 * 100ms)

// Wait for both DOM and auth.js to be ready
function initializeEditor() {
    console.log('Homepage Editor initializing... (attempt ' + (retryCount + 1) + ')');
    
    // Check authentication
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
    
    // Load homepage data
    console.log('Starting to load homepage data...');
    loadHomepageData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Log activity
    if (typeof logActivity === 'function') {
        logActivity('Opened Homepage Editor');
    }
}

document.addEventListener('DOMContentLoaded', initializeEditor);

// ============================================
// LOAD HOMEPAGE DATA
// ============================================

async function loadHomepageData() {
    console.log('[loadHomepageData] Starting...');
    const sectionList = document.getElementById('sectionList');
    
    if (!sectionList) {
        console.error('[loadHomepageData] ERROR: sectionList element not found!');
        return;
    }
    
    console.log('[loadHomepageData] sectionList element found');
    sectionList.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading sections...</p></div>';
    
    try {
        // Try to load from localStorage first (for unsaved changes)
        let data = null;
        
        console.log('[loadHomepageData] Checking for draft in localStorage...');
        try {
            const draftData = localStorage.getItem('liliw_homepage_draft');
            if (draftData) {
                const parsed = JSON.parse(draftData);
                console.log('[loadHomepageData] Draft found:', parsed);
                
                // Only use draft if it has sections
                if (parsed.sections && parsed.sections.length > 0) {
                    data = parsed;
                    console.log('[loadHomepageData] Using draft with', parsed.sections.length, 'sections');
                } else {
                    console.log('[loadHomepageData] Draft has no sections, ignoring it');
                    localStorage.removeItem('liliw_homepage_draft'); // Clear bad draft
                }
            } else {
                console.log('[loadHomepageData] No draft found in localStorage');
            }
        } catch (e) {
            console.log('[loadHomepageData] Error reading draft:', e);
        }
        
        // If no draft, load from JSON file
        if (!data) {
            console.log('[loadHomepageData] Fetching from ../data/homepage.json...');
            const response = await fetch('../data/homepage.json');
            console.log('[loadHomepageData] Fetch response:', response.status, response.ok);
            
            if (!response.ok) throw new Error('Failed to load homepage data (HTTP ' + response.status + ')');
            
            data = await response.json();
            console.log('[loadHomepageData] Loaded data from JSON file:', data);
        }
        
        if (!data.sections) {
            throw new Error('Data loaded but has no sections property');
        }
        
        currentSections = data.sections;
        console.log('[loadHomepageData] currentSections set:', currentSections.length, 'sections');
        
        if (currentSections.length === 0) {
            throw new Error('No sections found in data');
        }
        
        console.log('[loadHomepageData] Calling renderSections...');
        renderSections();
        
        console.log('[loadHomepageData] Calling initializeSortable...');
        initializeSortable();
        
        console.log('[loadHomepageData] Homepage data loaded successfully:', currentSections.length, 'sections');
    } catch (error) {
        console.error('[loadHomepageData] ERROR:', error);
        console.error('[loadHomepageData] Error stack:', error.stack);
        sectionList.innerHTML = `
            <div class="loading-spinner">
                <p style="color: var(--danger);">Failed to load sections: ${error.message}</p>
                <p style="color: #64748b; font-size: 12px;">Check console for details</p>
            </div>
        `;
        if (window.editorUtils && editorUtils.statusNotification) {
            editorUtils.statusNotification.error('Failed to load homepage data');
        }
    }
}

// ============================================
// RENDER SECTIONS
// ============================================

function renderSections() {
    const sectionList = document.getElementById('sectionList');
    
    if (currentSections.length === 0) {
        sectionList.innerHTML = '<div class="loading-spinner"><p>No sections found.</p></div>';
        return;
    }
    
    // Sort sections by order
    currentSections.sort((a, b) => a.order - b.order);
    
    sectionList.innerHTML = currentSections.map((section, index) => {
        const isEnabled = section.enabled !== false;
        return `
            <div class="section-item ${!isEnabled ? 'disabled' : ''}" data-section-id="${section.id}">
                <div class="section-item-header">
                    <span class="drag-handle" title="Drag to reorder">☰</span>
                    <div class="section-order">${index + 1}</div>
                    <div class="section-info">
                        <div class="section-name">${section.title || section.id}</div>
                        <div class="section-id">${section.id}</div>
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

function initializeSortable() {
    const sectionList = document.getElementById('sectionList');
    
    if (sortableInstance) {
        sortableInstance.destroy();
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
    
    console.log('Sortable initialized');
}

function handleSectionReorder(oldIndex, newIndex) {
    if (oldIndex === newIndex) return;
    
    // Reorder sections array
    const movedSection = currentSections.splice(oldIndex, 1)[0];
    currentSections.splice(newIndex, 0, movedSection);
    
    // Update order property
    currentSections.forEach((section, index) => {
        section.order = index + 1;
    });
    
    // Mark as changed
    hasUnsavedChanges = true;
    
    // Re-render to update order numbers
    renderSections();
    initializeSortable();
    
    // Auto-save draft
    saveDraft();
    
    showNotification('Section order changed. Remember to save!', 'info');
    console.log('Sections reordered:', currentSections.map(s => s.id));
}

// ============================================
// TOGGLE SECTION ENABLED/DISABLED
// ============================================

window.toggleSection = function(sectionId) {
    const section = currentSections.find(s => s.id === sectionId);
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
// EDIT SECTION
// ============================================

window.editSection = function(sectionId) {
    const section = currentSections.find(s => s.id === sectionId);
    if (!section) return;
    
    currentEditingSection = JSON.parse(JSON.stringify(section)); // Deep clone
    
    // Open modal
    if (window.editorUtils && editorUtils.modalManager) {
        editorUtils.modalManager.open('editModal');
    } else {
        document.getElementById('editModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Populate modal
    document.querySelector('#editModal .modal-header h2').textContent = `Edit: ${section.title}`;
    
    const modalBody = document.querySelector('#editModal .modal-body');
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Section Title</label>
            <input type="text" id="sectionTitle" value="${section.title || ''}" />
        </div>
        
        <div class="form-group">
            <label>Section Description</label>
            <textarea id="sectionDescription" rows="3">${section.description || ''}</textarea>
        </div>
        
        <div class="form-group">
            <label>Content</label>
            <div id="sectionContent" class="quill-editor"></div>
        </div>
        
        ${section.image ? `
            <div class="form-group">
                <label>Section Image</label>
                <div class="image-upload" onclick="document.getElementById('sectionImage').click()">
                    <i class="fas fa-image" style="font-size: 32px; color: var(--primary);"></i>
                    <p>Click to change image</p>
                </div>
                <input type="file" id="sectionImage" accept="image/*" style="display: none;" />
                <div class="image-preview" id="imagePreview">
                    <img src="${section.image}" alt="Current image" />
                </div>
            </div>
        ` : ''}
    `;
    
    // Initialize Quill editor for content
    setTimeout(() => {
        if (window.editorUtils && editorUtils.richTextEditor) {
            const editor = editorUtils.richTextEditor.initialize('sectionContent');
            if (section.content) {
                editorUtils.richTextEditor.setContent('sectionContent', section.content);
            }
        } else if (window.Quill) {
            // Fallback to direct Quill initialization
            const editor = new Quill('#sectionContent', {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link']
                    ]
                }
            });
            if (section.content) {
                editor.root.innerHTML = section.content;
            }
        }
        
        // Setup image upload if image field exists
        const imageInput = document.getElementById('sectionImage');
        if (imageInput && window.editorUtils && editorUtils.imageUploader) {
            imageInput.addEventListener('change', function(e) {
                const preview = document.getElementById('imagePreview');
                editorUtils.imageUploader.handleFileSelect(this, preview, (result) => {
                    currentEditingSection.image = result.dataUrl;
                });
            });
        }
    }, 100);
};

// ============================================
// SAVE MODAL CHANGES
// ============================================

window.saveModalChanges = function() {
    if (!currentEditingSection) return;
    
    // Get values from form
    const title = document.getElementById('sectionTitle').value;
    const description = document.getElementById('sectionDescription').value;
    
    // Get content from Quill editor
    let content = '';
    if (window.editorUtils && editorUtils.richTextEditor) {
        content = editorUtils.richTextEditor.getContent('sectionContent');
    } else {
        const contentEl = document.querySelector('#sectionContent .ql-editor');
        if (contentEl) {
            content = contentEl.innerHTML;
        }
    }
    
    // Update editing section
    currentEditingSection.title = title;
    currentEditingSection.description = description;
    currentEditingSection.content = content;
    
    // Find and update in main array
    const index = currentSections.findIndex(s => s.id === currentEditingSection.id);
    if (index !== -1) {
        currentSections[index] = currentEditingSection;
        hasUnsavedChanges = true;
        
        renderSections();
        initializeSortable();
        saveDraft();
        
        // Close modal
        if (window.editorUtils && editorUtils.modalManager) {
            editorUtils.modalManager.close('editModal');
        } else {
            document.getElementById('editModal').classList.remove('active');
            document.body.style.overflow = '';
        }
        
        showNotification('Section updated!', 'success');
        logActivity(`Edited section: ${currentEditingSection.title}`);
    }
    
    currentEditingSection = null;
};

// ============================================
// PREVIEW CHANGES
// ============================================

window.previewChanges = function() {
    // Save current state to draft
    saveDraft();
    
    // Open preview modal
    if (window.editorUtils && editorUtils.modalManager) {
        editorUtils.modalManager.open('previewModal');
    } else {
        document.getElementById('previewModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Load homepage in iframe
    const iframe = document.getElementById('previewFrame');
    iframe.src = '../homepage.html?preview=' + Date.now();
    
    showNotification('Loading preview...', 'info');
    logActivity('Previewed homepage');
};

window.closePreview = function() {
    if (window.editorUtils && editorUtils.modalManager) {
        editorUtils.modalManager.close('previewModal');
    } else {
        document.getElementById('previewModal').classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.openInNewTab = function() {
    window.open('../homepage.html', '_blank');
};

// ============================================
// SAVE CHANGES
// ============================================

window.saveChanges = async function() {
    if (!hasUnsavedChanges) {
        showNotification('No changes to save', 'info');
        return;
    }
    
    showNotification('Saving homepage...', 'saving');
    
    try {
        // Create backup
        const backupData = {
            sections: currentSections,
            timestamp: new Date().toISOString()
        };
        const backupKey = `liliw_homepage_backup_${Date.now()}`;
        localStorage.setItem(backupKey, JSON.stringify(backupData));
        
        // Clean old backups (keep only last 5)
        const allKeys = Object.keys(localStorage);
        const backupKeys = allKeys.filter(key => key.startsWith('liliw_homepage_backup_')).sort().reverse();
        backupKeys.slice(5).forEach(key => localStorage.removeItem(key));
        
        console.log('Backup created:', backupKey);
        
        // Prepare data
        const saveData = {
            site: {
                name: "Liliw Tourism",
                tagline: "Discover the Beauty of Liliw",
                description: "Experience the rich culture, heritage, and natural wonders of Liliw, Laguna"
            },
            sections: currentSections,
            lastUpdated: new Date().toISOString()
        };
        
        // Save to localStorage (simulating save to JSON)
        localStorage.setItem('liliw_homepage', JSON.stringify(saveData));
        
        // Clear draft
        localStorage.removeItem('liliw_homepage_draft');
        
        // Update last backup time
        localStorage.setItem('liliw_last_backup', new Date().toISOString());
        
        hasUnsavedChanges = false;
        
        showNotification('Homepage saved successfully!', 'success');
        logActivity('Saved homepage changes');
        
        console.log('Homepage saved:', saveData);
        
        // Note: In production, this would send data to Netlify function
        // which would commit to GitHub repository
        
    } catch (error) {
        console.error('Save error:', error);
        showNotification('Failed to save homepage', 'error');
    }
};

// ============================================
// AUTO-SAVE DRAFT
// ============================================

function saveDraft() {
    try {
        const draftData = {
            sections: currentSections,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('liliw_homepage_draft', JSON.stringify(draftData));
        console.log('Draft saved');
    } catch (e) {
        console.error('Failed to save draft:', e);
    }
}

// ============================================
// NOTIFICATION HELPER
// ============================================

function showNotification(message, type = 'info') {
    if (window.editorUtils && editorUtils.statusNotification) {
        editorUtils.statusNotification[type](message);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

// ============================================
// EXPAND/COLLAPSE CONTROLS
// ============================================

window.expandAll = function() {
    document.querySelectorAll('.section-details').forEach(el => {
        el.classList.add('visible');
    });
    showNotification('All sections expanded', 'info');
};

window.collapseAll = function() {
    document.querySelectorAll('.section-details').forEach(el => {
        el.classList.remove('visible');
    });
    showNotification('All sections collapsed', 'info');
};

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Warn about unsaved changes
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    });
    
    // Auto-save draft every 30 seconds
    setInterval(() => {
        if (hasUnsavedChanges) {
            saveDraft();
        }
    }, 30000);
}

// ============================================
// UTILITY
// ============================================

function logActivity(action) {
    if (typeof window.logActivity === 'function') {
        window.logActivity(action);
    }
}

console.log('Homepage Editor loaded successfully');
