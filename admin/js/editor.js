// Core Editor Functionality for Liliw Tourism Admin

// ============================================
// MODAL MANAGEMENT
// ============================================

class ModalManager {
    constructor() {
        this.activeModal = null;
    }

    open(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.add('active');
        this.activeModal = modal;
        document.body.style.overflow = 'hidden';
        
        // Close on overlay click
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.onclick = () => this.close(modalId);
        }
    }

    close(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('active');
        this.activeModal = null;
        document.body.style.overflow = '';
    }

    closeAll() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        this.activeModal = null;
        document.body.style.overflow = '';
    }
}

const modalManager = new ModalManager();

// Global functions for modal control
window.closeModal = function() {
    modalManager.closeAll();
};

// ============================================
// RICH TEXT EDITOR (Quill)
// ============================================

class RichTextEditor {
    constructor() {
        this.editors = new Map();
    }

    initialize(containerId, options = {}) {
        const defaultOptions = {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link'],
                    ['clean']
                ]
            },
            placeholder: 'Enter content here...',
            ...options
        };

        try {
            const editor = new Quill(`#${containerId}`, defaultOptions);
            this.editors.set(containerId, editor);
            return editor;
        } catch (error) {
            console.error('Failed to initialize Quill editor:', error);
            return null;
        }
    }

    getEditor(containerId) {
        return this.editors.get(containerId);
    }

    getContent(containerId, format = 'html') {
        const editor = this.editors.get(containerId);
        if (!editor) return '';
        
        switch(format) {
            case 'html':
                return editor.root.innerHTML;
            case 'text':
                return editor.getText();
            case 'delta':
                return editor.getContents();
            default:
                return editor.root.innerHTML;
        }
    }

    setContent(containerId, content, format = 'html') {
        const editor = this.editors.get(containerId);
        if (!editor) return;
        
        switch(format) {
            case 'html':
                editor.root.innerHTML = content;
                break;
            case 'text':
                editor.setText(content);
                break;
            case 'delta':
                editor.setContents(content);
                break;
            default:
                editor.root.innerHTML = content;
        }
    }

    clear(containerId) {
        const editor = this.editors.get(containerId);
        if (editor) {
            editor.setText('');
        }
    }

    destroy(containerId) {
        const editor = this.editors.get(containerId);
        if (editor) {
            // Quill doesn't have a destroy method, but we can clean up
            this.editors.delete(containerId);
        }
    }
}

const richTextEditor = new RichTextEditor();

// ============================================
// IMAGE UPLOAD HANDLER
// ============================================

class ImageUploader {
    constructor() {
        this.maxSize = 5 * 1024 * 1024; // 5MB
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    }

    handleFileSelect(input, previewElement, callback) {
        const file = input.files[0];
        
        if (!file) return;

        // Validate file type
        if (!this.allowedTypes.includes(file.type)) {
            this.showError('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
            return;
        }

        // Validate file size
        if (file.size > this.maxSize) {
            this.showError('Image size must be less than 5MB');
            return;
        }

        // Read and preview image
        const reader = new FileReader();
        reader.onload = (e) => {
            if (previewElement) {
                previewElement.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            }
            
            if (callback) {
                callback({
                    file: file,
                    dataUrl: e.target.result,
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
            }
        };
        reader.readAsDataURL(file);
    }

    showError(message) {
        alert(message); // Simple error display, can be enhanced
    }

    // Convert base64 to blob
    dataURLtoBlob(dataUrl) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }
}

const imageUploader = new ImageUploader();

// ============================================
// DATA STORAGE (LocalStorage & JSON)
// ============================================

class DataManager {
    constructor() {
        this.storagePrefix = 'liliw_';
    }

    // Save to localStorage
    saveToStorage(key, data) {
        try {
            const fullKey = this.storagePrefix + key;
            localStorage.setItem(fullKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }

    // Load from localStorage
    loadFromStorage(key) {
        try {
            const fullKey = this.storagePrefix + key;
            const data = localStorage.getItem(fullKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return null;
        }
    }

    // Delete from localStorage
    deleteFromStorage(key) {
        const fullKey = this.storagePrefix + key;
        localStorage.removeItem(fullKey);
    }

    // Save backup
    createBackup(key, data) {
        const backup = {
            data: data,
            timestamp: new Date().toISOString(),
            key: key
        };
        
        const backupKey = `${key}_backup_${Date.now()}`;
        this.saveToStorage(backupKey, backup);
        
        // Keep only last 5 backups
        this.cleanupBackups(key);
        
        return backupKey;
    }

    // Cleanup old backups
    cleanupBackups(key) {
        const backupKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i);
            if (storageKey.includes(`${this.storagePrefix}${key}_backup_`)) {
                backupKeys.push(storageKey);
            }
        }
        
        // Sort by timestamp (newest first)
        backupKeys.sort().reverse();
        
        // Remove backups beyond the 5th
        backupKeys.slice(5).forEach(backupKey => {
            localStorage.removeItem(backupKey);
        });
    }

    // Get latest backup
    getLatestBackup(key) {
        const backupKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i);
            if (storageKey.includes(`${this.storagePrefix}${key}_backup_`)) {
                backupKeys.push(storageKey);
            }
        }
        
        if (backupKeys.length === 0) return null;
        
        // Get the most recent backup
        backupKeys.sort().reverse();
        return this.loadFromStorage(backupKeys[0].replace(this.storagePrefix, ''));
    }
}

const dataManager = new DataManager();

// ============================================
// STATUS NOTIFICATIONS
// ============================================

class StatusNotification {
    constructor() {
        this.container = null;
        this.timeout = null;
    }

    show(message, type = 'info', duration = 3000) {
        // Remove existing notification
        this.hide();

        // Create notification
        this.container = document.createElement('div');
        this.container.className = `save-status ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            saving: '⟳',
            info: 'ℹ'
        };
        
        this.container.innerHTML = `
            <span class="status-icon">${icons[type] || icons.info}</span>
            <span class="status-text">${message}</span>
        `;
        
        document.body.appendChild(this.container);
        
        // Auto-hide after duration
        if (duration > 0) {
            this.timeout = setTimeout(() => this.hide(), duration);
        }
    }

    hide() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    success(message, duration = 3000) {
        this.show(message, 'success', duration);
    }

    error(message, duration = 4000) {
        this.show(message, 'error', duration);
    }

    saving(message) {
        this.show(message, 'saving', 0); // No auto-hide
    }

    info(message, duration = 3000) {
        this.show(message, 'info', duration);
    }
}

const statusNotification = new StatusNotification();

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for auto-save
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Format date/time
function formatDateTime(date) {
    const d = new Date(date);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return d.toLocaleDateString('en-US', options);
}

// Sanitize HTML (basic)
function sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Compare objects for changes
function hasChanges(obj1, obj2) {
    return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl+S or Cmd+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (typeof window.saveChanges === 'function') {
            window.saveChanges();
        }
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        modalManager.closeAll();
    }
});

// ============================================
// EXPORT FOR USE IN OTHER SCRIPTS
// ============================================

window.editorUtils = {
    modalManager,
    richTextEditor,
    imageUploader,
    dataManager,
    statusNotification,
    debounce,
    formatFileSize,
    formatDateTime,
    sanitizeHTML,
    deepClone,
    hasChanges
};

console.log('Editor core loaded successfully');
