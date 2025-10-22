// Advanced Homepage Editor - Part 2: Card Management Functions

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Update image preview in real-time
window.updateImagePreview = function(imagePath) {
    const preview = document.getElementById('cardImagePreview');
    if (preview && imagePath) {
        preview.src = '../' + imagePath;
        preview.onerror = function() {
            this.src = '../images/placeholder.png';
        };
    }
};

// Handle image file upload
window.handleImageUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Image size must be less than 5MB', 'error');
        return;
    }
    
    // Read and display the image
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('cardImagePreview');
        const uploadArea = document.getElementById('imageUploadArea');
        const previewContainer = document.getElementById('imagePreviewContainer');
        const filenameDisplay = document.getElementById('imageFilename');
        
        // Update preview
        if (preview) {
            preview.src = e.target.result;
        }
        
        // Show preview, hide upload area
        if (uploadArea) uploadArea.style.display = 'none';
        if (previewContainer) previewContainer.style.display = 'block';
        
        // Display filename
        if (filenameDisplay) {
            filenameDisplay.textContent = `File: ${file.name}`;
        }
        
        // Store the image path (we'll save to images/ folder)
        const imagePath = `images/${file.name}`;
        document.getElementById('cardImage').value = imagePath;
        
        // Store the actual file data for later upload
        window.pendingImageUpload = {
            file: file,
            path: imagePath,
            dataUrl: e.target.result
        };
        
        showNotification('Image ready to upload', 'success');
    };
    
    reader.readAsDataURL(file);
};

// Handle multiple image uploads
window.handleMultipleImageUpload = function(event) {
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
            
            // Add to current editing card's images array
            if (!currentEditingCard.images) {
                currentEditingCard.images = [];
            }
            currentEditingCard.images.push(imagePath);
            
            // Store for upload
            if (!window.pendingImageUploads) {
                window.pendingImageUploads = [];
            }
            window.pendingImageUploads.push({
                file: file,
                path: imagePath,
                dataUrl: e.target.result
            });
            
            // Re-render images list
            renderCardImages();
            showNotification(`${file.name} added`, 'success');
        };
        reader.readAsDataURL(file);
    });
    
    // Clear file input
    event.target.value = '';
};

// Render card images list with drag-drop reordering
window.renderCardImages = function() {
    const imagesList = document.getElementById('cardImagesList');
    if (!imagesList) {
        console.warn('Images list element not found');
        return;
    }
    
    // Update primary image info
    const primaryImageInfo = document.getElementById('cardPrimaryImageName');
    if (primaryImageInfo && currentEditingCard && currentEditingCard.images && currentEditingCard.images.length > 0) {
        const primaryImage = currentEditingCard.images[0].split('/').pop();
        primaryImageInfo.textContent = primaryImage;
    }
    
    if (!currentEditingCard || !currentEditingCard.images || currentEditingCard.images.length === 0) {
        imagesList.innerHTML = '<div class="no-images">No images yet</div>';
        return;
    }
    
    const images = currentEditingCard.images;
    
    imagesList.innerHTML = images.map((img, index) => {
        // Check if this is a data URL (newly uploaded) or a file path (existing)
        let imageSrc = img;
        if (window.pendingImageUploads) {
            const pendingUpload = window.pendingImageUploads.find(upload => upload.path === img);
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
            <img src="${imageSrc}" alt="Image ${index + 1}" onerror="this.src='../images/placeholder.png'">
            <div class="image-item-info">
                ${index === 0 ? '<span class="image-badge primary-badge">#1</span>' : `<span class="image-badge">#${index + 1}</span>`}
                <span class="image-filename">${img.split('/').pop()}</span>
            </div>
            <button type="button" class="btn-remove-image-item" onclick="removeCardImage(${index})" title="Remove image">
                🗑️
            </button>
        </div>
    `;
    }).join('');
    
    // Initialize sortable for images
    initializeImagesSortable();
};

// Remove image from card
window.removeCardImage = function(index) {
    if (!currentEditingCard || !currentEditingCard.images) return;
    
    const filename = currentEditingCard.images[index].split('/').pop();
    
    if (currentEditingCard.images.length === 1) {
        showNotification('Card must have at least one image', 'error');
        return;
    }
    
    if (confirm(`Remove ${filename}?`)) {
        currentEditingCard.images.splice(index, 1);
        renderCardImages();
        showNotification('Image removed', 'success');
    }
};

// Initialize drag-drop for images
function initializeImagesSortable() {
    const imagesList = document.getElementById('cardImagesList');
    if (!imagesList || typeof Sortable === 'undefined') return;
    
    new Sortable(imagesList, {
        animation: 150,
        handle: '.drag-handle-image',
        ghostClass: 'sortable-ghost',
        onEnd: function(evt) {
            if (evt.oldIndex === evt.newIndex) return;
            
            // Reorder images array
            const images = currentEditingCard.images;
            const movedImage = images.splice(evt.oldIndex, 1)[0];
            images.splice(evt.newIndex, 0, movedImage);
            
            // Re-render
            renderCardImages();
            showNotification('Image order updated', 'info');
        }
    });
}

// Remove selected image (legacy single image function)
window.removeImage = function() {
    const uploadArea = document.getElementById('imageUploadArea');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const fileInput = document.getElementById('cardImageFile');
    
    // Reset displays
    if (uploadArea) uploadArea.style.display = 'flex';
    if (previewContainer) previewContainer.style.display = 'none';
    if (fileInput) fileInput.value = '';
    
    // Clear the image path
    document.getElementById('cardImage').value = 'images/placeholder.png';
    
    // Clear pending upload
    window.pendingImageUpload = null;
    
    showNotification('Image removed', 'info');
};

// Setup drag and drop for image upload
window.setupImageDragDrop = function() {
    const imagesSection = document.querySelector('.card-edit-images');
    if (!imagesSection) {
        console.warn('Images section not found for drag drop setup');
        return;
    }
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        imagesSection.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop area when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
        imagesSection.addEventListener(eventName, () => {
            imagesSection.classList.add('drag-over');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        imagesSection.addEventListener(eventName, () => {
            imagesSection.classList.remove('drag-over');
        }, false);
    });
    
    // Handle dropped files
    imagesSection.addEventListener('drop', handleDrop, false);
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            const fileInput = document.getElementById('cardImageUpload');
            if (fileInput) {
                fileInput.files = files;
                handleMultipleImageUpload({ target: fileInput });
            }
        }
    }
};

// Initialize image preview if card already has an image
window.initializeImagePreview = function(imagePath) {
    if (imagePath && imagePath !== 'images/placeholder.png') {
        const uploadArea = document.getElementById('imageUploadArea');
        const previewContainer = document.getElementById('imagePreviewContainer');
        const preview = document.getElementById('cardImagePreview');
        const filenameDisplay = document.getElementById('imageFilename');
        
        if (uploadArea) uploadArea.style.display = 'none';
        if (previewContainer) previewContainer.style.display = 'block';
        if (preview) {
            preview.src = '../' + imagePath;
        }
        if (filenameDisplay) {
            const filename = imagePath.split('/').pop();
            filenameDisplay.textContent = `Current: ${filename}`;
        }
    }
};

// Upload image to server
async function uploadImageToServer(imageData) {
    console.log('📤 Uploading image to server:', imageData.file.name);
    
    try {
        const response = await fetch('/api/upload-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: imageData.file.name,
                dataUrl: imageData.dataUrl
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Image uploaded successfully:', result.path);
            showNotification(`Image "${result.filename}" uploaded!`, 'success');
            return result;
        } else {
            throw new Error(result.error || 'Upload failed');
        }
    } catch (error) {
        console.error('❌ Error uploading image:', error);
        showNotification(`Failed to upload image: ${error.message}`, 'error');
        throw error;
    }
}

// ============================================
// CARD MANAGEMENT
// ============================================

// Toggle card enabled/disabled
window.toggleCard = function(sectionId, cardId) {
    const section = currentEditingSection.cards ? currentEditingSection : 
                    currentContent.sections.find(s => s.id === sectionId);
    if (!section || !section.cards) return;
    
    const card = section.cards.find(c => c.id === cardId);
    if (!card) return;
    
    card.enabled = !card.enabled;
    hasUnsavedChanges = true;
    
    // Update currentEditingSection if it's set
    if (currentEditingSection && currentEditingSection.id === sectionId) {
        const editCard = currentEditingSection.cards.find(c => c.id === cardId);
        if (editCard) editCard.enabled = card.enabled;
    }
    
    // Re-render card list
    renderCardList(currentEditingSection);
    
    showNotification(`Card "${card.title}" ${card.enabled ? 'enabled' : 'disabled'}`, 'info');
};

// Reorder cards within a section
function handleCardReorder(sectionId, oldIndex, newIndex) {
    if (oldIndex === newIndex) return;
    
    const section = currentEditingSection;
    if (!section || !section.cards) return;
    
    const movedCard = section.cards.splice(oldIndex, 1)[0];
    section.cards.splice(newIndex, 0, movedCard);
    
    section.cards.forEach((card, index) => {
        card.order = index + 1;
    });
    
    hasUnsavedChanges = true;
    renderCardList(section);
    
    showNotification('Card order changed', 'info');
}

// Add new card
window.addNewCard = function(sectionId) {
    const section = currentEditingSection;
    if (!section) return;
    
    if (!section.cards) section.cards = [];
    
    const newCard = {
        id: `card-${Date.now()}`,
        title: 'New Card',
        description: 'Description here',
        images: ['images/placeholder.png'],
        link: '#',
        enabled: true,
        order: section.cards.length + 1
    };
    
    section.cards.push(newCard);
    hasUnsavedChanges = true;
    
    renderCardList(section);
    showNotification('New card added. Click Edit to customize it.', 'success');
};

// Edit individual card
window.editCard = function(sectionId, cardId) {
    const section = currentEditingSection;
    if (!section || !section.cards) return;
    
    const card = section.cards.find(c => c.id === cardId);
    if (!card) return;
    
    // Create a copy and ensure images is an array (backward compatibility)
    currentEditingCard = JSON.parse(JSON.stringify(card));
    if (!currentEditingCard.images && currentEditingCard.image) {
        currentEditingCard.images = [currentEditingCard.image];
    }
    if (!currentEditingCard.images || currentEditingCard.images.length === 0) {
        currentEditingCard.images = ['images/placeholder.png'];
    }
    
    // Open card edit modal
    openModal('cardEditModal');
    
    // Update modal title
    document.querySelector('#cardEditModal .modal-header h2').textContent = `✏️ Edit Card: ${currentEditingCard.title}`;
    
    // Populate form fields
    document.getElementById('cardTitle').value = currentEditingCard.title || '';
    document.getElementById('cardDescription').value = currentEditingCard.description || '';
    document.getElementById('cardLink').value = currentEditingCard.link || '';
    document.getElementById('cardEnabled').checked = currentEditingCard.enabled !== false;
    
    // Show/hide optional fields based on card data
    const dateGroup = document.getElementById('cardDateGroup');
    const iconGroup = document.getElementById('cardIconGroup');
    
    if (currentEditingCard.date !== undefined) {
        dateGroup.style.display = 'block';
        document.getElementById('cardDate').value = currentEditingCard.date || '';
    } else {
        dateGroup.style.display = 'none';
    }
    
    if (currentEditingCard.icon !== undefined) {
        iconGroup.style.display = 'block';
        document.getElementById('cardIcon').value = currentEditingCard.icon || '';
    } else {
        iconGroup.style.display = 'none';
    }
    
    // Render images
    renderCardImages();
    
    // Setup file input handler
    const fileInput = document.getElementById('cardImageUpload');
    fileInput.onchange = handleMultipleImageUpload;
    
    // Setup drag and drop
    setTimeout(() => {
        setupImageDragDrop();
    }, 100);
};

// Save card changes
window.saveCardChanges = async function() {
    if (!currentEditingCard || !currentEditingSection) return;
    
    // Handle pending image uploads if exist
    if (window.pendingImageUploads && window.pendingImageUploads.length > 0) {
        try {
            showNotification(`Uploading ${window.pendingImageUploads.length} image(s)...`, 'info');
            for (const imageData of window.pendingImageUploads) {
                await uploadImageToServer(imageData);
            }
            showNotification('All images uploaded successfully!', 'success');
            window.pendingImageUploads = [];
        } catch (error) {
            console.error('Upload error:', error);
            showNotification('Some images failed to upload, but changes will be saved', 'warning');
        }
    }
    
    // Handle legacy single image upload
    if (window.pendingImageUpload) {
        try {
            showNotification('Uploading image...', 'info');
            await uploadImageToServer(window.pendingImageUpload);
            showNotification('Image uploaded successfully!', 'success');
        } catch (error) {
            console.error('Upload error:', error);
            showNotification('Image upload failed, but changes will be saved', 'warning');
        }
        window.pendingImageUpload = null;
    }
    
    // Get values from form
    currentEditingCard.title = document.getElementById('cardTitle').value;
    currentEditingCard.description = document.getElementById('cardDescription').value;
    currentEditingCard.link = document.getElementById('cardLink').value;
    
    // Images are already updated in currentEditingCard.images array
    // Remove old single image property for consistency
    delete currentEditingCard.image;
    
    // Ensure at least one image exists
    if (!currentEditingCard.images || currentEditingCard.images.length === 0) {
        currentEditingCard.images = ['images/placeholder.png'];
    }
    
    // Optional fields
    const dateField = document.getElementById('cardDate');
    if (dateField) currentEditingCard.date = dateField.value;
    
    const iconField = document.getElementById('cardIcon');
    if (iconField) currentEditingCard.icon = iconField.value;
    
    // Update in currentEditingSection
    const cardIndex = currentEditingSection.cards.findIndex(c => c.id === currentEditingCard.id);
    if (cardIndex !== -1) {
        currentEditingSection.cards[cardIndex] = currentEditingCard;
        
        // CRITICAL: Also update in main currentContent to persist changes
        const sectionIndex = currentContent.sections.findIndex(s => s.id === currentEditingSection.id);
        if (sectionIndex !== -1) {
            currentContent.sections[sectionIndex] = currentEditingSection;
            console.log('✅ Card updated in currentContent:', currentEditingCard.title);
        }
        
        hasUnsavedChanges = true;
        saveDraft(); // Save draft immediately
        
        closeModal('cardEditModal');
        renderCardList(currentEditingSection);
        
        showNotification('Saving to server...', 'info');
        
        // AUTO-SAVE TO SERVER: No need to click Save button twice!
        window.saveChanges().then(() => {
            showNotification('Card saved successfully!', 'success');
            logActivity(`Updated and saved card: ${currentEditingCard.title}`);
        }).catch(error => {
            console.error('Auto-save failed:', error);
            showNotification('Card updated locally. Click Save to sync to server.', 'warning');
        });
    }
    
    currentEditingCard = null;
};

// Delete card
window.deleteCard = function(sectionId, cardId) {
    const section = currentEditingSection;
    if (!section || !section.cards) return;
    
    const card = section.cards.find(c => c.id === cardId);
    if (!card) return;
    
    if (!confirm(`Are you sure you want to delete "${card.title}"?`)) return;
    
    section.cards = section.cards.filter(c => c.id !== cardId);
    hasUnsavedChanges = true;
    
    renderCardList(section);
    showNotification('Card deleted', 'success');
    logActivity(`Deleted card: ${card.title}`);
};

// ============================================
// SAVE MODAL CHANGES (Section Level)
// ============================================

window.saveModalChanges = function() {
    if (!currentEditingSection) return;
    
    // Check if this is a section with cards or section data
    if (currentEditingSection.cards && currentEditingSection.cards.length > 0) {
        // Section with cards - just update the section in currentContent
        const sectionIndex = currentContent.sections.findIndex(s => s.id === currentEditingSection.id);
        if (sectionIndex !== -1) {
            currentContent.sections[sectionIndex] = currentEditingSection;
            hasUnsavedChanges = true;
            
            closeModal('editModal');
            renderSections();
            initializeSortable();
            saveDraft();
            
            showNotification('Section updated!', 'success');
            logActivity(`Updated section: ${currentEditingSection.title}`);
        }
    } else {
        // Section without cards - update title and data
        const title = document.getElementById('sectionTitle')?.value;
        const dataText = document.getElementById('sectionData')?.value;
        
        if (title) currentEditingSection.title = title;
        
        if (dataText) {
            try {
                currentEditingSection.data = JSON.parse(dataText);
            } catch (e) {
                alert('Invalid JSON in Section Data field. Please fix the syntax.');
                return;
            }
        }
        
        const sectionIndex = currentContent.sections.findIndex(s => s.id === currentEditingSection.id);
        if (sectionIndex !== -1) {
            currentContent.sections[sectionIndex] = currentEditingSection;
            hasUnsavedChanges = true;
            
            closeModal('editModal');
            renderSections();
            initializeSortable();
            saveDraft();
            
            showNotification('Section updated!', 'success');
            logActivity(`Updated section: ${currentEditingSection.title}`);
        }
    }
    
    currentEditingSection = null;
};

// ============================================
// PREVIEW & SAVE
// ============================================

window.previewChanges = function() {
    saveDraft();
    
    openModal('previewModal');
    
    const iframe = document.getElementById('previewFrame');
    iframe.src = '../homepage.html?preview=' + Date.now();
    
    showNotification('Loading preview...', 'info');
    logActivity('Previewed homepage');
};

window.closePreview = function() {
    closeModal('previewModal');
};

window.openInNewTab = function() {
    window.open('../homepage.html', '_blank');
};

window.saveChanges = async function() {
    // REMOVED hasUnsavedChanges check to allow manual saves anytime
    console.log('💾 Save triggered - saving current content...');
    
    showNotification('Saving homepage...', 'saving');
    
    try {
        // Create backup
        const backupData = {
            content: currentContent,
            timestamp: new Date().toISOString()
        };
        const backupKey = `liliw_homepage_content_backup_${Date.now()}`;
        localStorage.setItem(backupKey, JSON.stringify(backupData));
        
        // Clean old backups
        const allKeys = Object.keys(localStorage);
        const backupKeys = allKeys.filter(key => key.startsWith('liliw_homepage_content_backup_')).sort().reverse();
        backupKeys.slice(5).forEach(key => localStorage.removeItem(key));
        
        // Save to server via API
        currentContent.lastUpdated = new Date().toISOString();
        
        console.log('📤 Preparing to save to server...');
        console.log('📊 Current content structure:', {
            hasSite: !!currentContent.site,
            hasSections: !!currentContent.sections,
            sectionCount: currentContent.sections?.length || 0,
            sectionIds: currentContent.sections?.map(s => s.id) || []
        });
        console.log('📦 Full data being saved:', JSON.stringify(currentContent).substring(0, 500) + '...');
        
        const response = await fetch('/api/save?page=homepage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentContent)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Saved to server:', result.file);
            console.log('📦 Data saved:', currentContent);
            
            // Also save to localStorage as backup
            localStorage.setItem('liliw_homepage_content', JSON.stringify(currentContent));
            
            // Clear draft
            localStorage.removeItem('liliw_homepage_content_draft');
            
            // Update last backup time
            localStorage.setItem('liliw_last_backup', new Date().toISOString());
            
            hasUnsavedChanges = false;
            
            showNotification('Homepage saved successfully!', 'success');
            logActivity('Saved homepage content');
        } else {
            throw new Error(result.error || 'Save failed');
        }
        
    } catch (error) {
        console.error('Save error:', error);
        showNotification(`Failed to save homepage: ${error.message}`, 'error');
    }
};

// ============================================
// AUTO-SAVE DRAFT
// ============================================

function saveDraft() {
    try {
        const draftData = {
            ...currentContent,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('liliw_homepage_content_draft', JSON.stringify(draftData));
        console.log('Draft saved');
    } catch (e) {
        console.error('Failed to save draft:', e);
    }
}

// ============================================
// UTILITIES
// ============================================

function setupEventListeners() {
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    });
    
    setInterval(() => {
        if (hasUnsavedChanges) {
            saveDraft();
        }
    }, 30000);
}

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

window.closeModal = function() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
};

function showNotification(message, type = 'info') {
    if (window.editorUtils && editorUtils.statusNotification) {
        editorUtils.statusNotification[type](message);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

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

console.log('Advanced homepage editor (part 2) loaded');
