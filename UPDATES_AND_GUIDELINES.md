# 📖 Liliw Tourism Website - Complete Documentation

**Comprehensive Guide: Setup, Features, Admin Panel & Maintenance**

*Last Updated: October 22, 2025*

---

## 📚 Table of Contents

- [Part I: Project Overview](#part-i-project-overview)
- [Part II: Getting Started](#part-ii-getting-started)
- [Part III: Admin Panel System](#part-iii-admin-panel-system)
- [Part IV: Dynamic Content System](#part-iv-dynamic-content-system)
- [Part V: Detail Pages & Carousel](#part-v-detail-pages--carousel)
- [Part VI: Animation System](#part-vi-animation-system)
- [Part VII: Navigation System](#part-vii-navigation-system)
- [Part VIII: Pages Reference](#part-viii-pages-reference)
- [Part IX: Technical Reference](#part-ix-technical-reference)
- [Part X: Maintenance](#part-x-maintenance)

---

# Part I: Project Overview

## 🌟 About This Project

The **Liliw Tourism Website** is a modern, full-featured web application showcasing Liliw, Laguna - The Footwear Capital of Laguna. Built with HTML5, CSS3, and vanilla JavaScript, it features a complete Content Management System, stunning animations, and dynamic content loading.

## ✨ Key Features

### Public Website
- ✅ **Fully Responsive** - Seamless desktop, tablet, and mobile experience
- ✅ **Modern UI/UX** - Clean design with professional animations
- ✅ **Dynamic Content** - All pages load from JSON data files
- ✅ **Interactive Maps** - Leaflet.js integration with custom controls
- ✅ **Detail Pages** - Dedicated pages for each attraction with image carousels
- ✅ **Smart Navigation** - Active page detection and smooth transitions
- ✅ **Search Functionality** - Integrated search bar
- ✅ **Mobile Menu** - Touch-friendly hamburger menu

### Admin Panel (CMS)
- ✅ **Secure Login** - Authentication system
- ✅ **Dashboard** - Activity tracking and quick actions
- ✅ **Homepage Editor** - Multi-image carousel support with drag-drop
- ✅ **Universal Page Editor** - Single editor for all content pages
- ✅ **Detail Page Editor** - Create dedicated pages for each item
- ✅ **Image Management** - Upload and organize images
- ✅ **Drag & Drop** - Reorder sections and items
- ✅ **Live Preview** - See changes before publishing
- ✅ **Auto-backup** - Never lose your work

## 📁 Project Structure

```
Liliw Tourism/
├── index.html                    # Splash screen entry point
├── homepage.html                 # Main landing page
├── attractions.html              # Attractions overview
├── events.html                   # Events and festivals
├── experiences.html              # Local experiences
├── plan-your-trip.html           # Travel planning
├── interactive-map.html          # Interactive map
├── attraction-detail.html        # Universal detail page
│
├── admin/                        # Admin Panel (CMS)
│   ├── index.html                # Login page
│   ├── dashboard.html            # Admin dashboard
│   ├── edit-homepage.html        # Homepage editor
│   ├── edit-page.html            # Universal page editor
│   ├── image-helper.html         # Image management
│   ├── css/
│   │   ├── admin.css             # Admin panel styles
│   │   ├── editor.css            # Editor interface styles
│   │   └── page-editor-styles.css # Page editor specific styles
│   └── js/
│       ├── auth.js               # Authentication
│       ├── dashboard.js          # Dashboard functionality
│       ├── editor.js             # Core editor utilities
│       ├── homepage-editor-advanced.js      # Homepage CMS (part 1)
│       ├── homepage-editor-advanced-part2.js # Homepage CMS (part 2)
│       └── page-editor.js        # Universal page editor
│
├── css/                          # Public website styles
│   ├── style.css                 # Splash screen
│   ├── homepage.css              # Homepage
│   ├── attractions.css           # Attractions page
│   ├── events.css                # Events page
│   ├── experiences.css           # Experiences page
│   ├── navigation.css            # Shared navigation
│   ├── animations.css            # Animation system
│   ├── map.css                   # Interactive map
│   └── attraction-detail.css     # Detail pages with carousel
│
├── js/                           # Public website scripts
│   ├── script.js                 # Splash screen
│   ├── homepage-dynamic.js       # Dynamic homepage
│   ├── attractions-dynamic.js    # Dynamic attractions
│   ├── events-dynamic.js         # Dynamic events
│   ├── experiences-dynamic.js    # Dynamic experiences
│   ├── plan-trip-dynamic.js      # Dynamic plan trip
│   ├── attraction-detail-loader.js # Detail page carousel system
│   ├── include-nav.js            # Navigation injection
│   ├── navigation.js             # Navigation functionality
│   ├── animations.js             # Animation engine
│   └── map.js                    # Map interactions
│
├── data/                         # JSON data files
│   ├── homepage.json             # Homepage content
│   ├── attractions.json          # Attractions data
│   ├── events.json               # Events data
│   ├── experiences.json          # Experiences data
│   ├── plan-trip.json            # Plan trip data
│   └── images.json               # Image metadata
│
├── images/                       # Image assets
├── server.py                     # Python development server
└── netlify/functions/            # Backend API functions
```

---

# Part II: Getting Started

## 🚀 Quick Start Guide

### Prerequisites
- **Web Browser** - Chrome, Firefox, Safari, or Edge
- **Text Editor** - VS Code (recommended) or any editor
- **Python 3** - For local development server

### Running the Website Locally

#### Method 1: Python HTTP Server (Recommended)
```powershell
# Navigate to project directory
cd "c:\Users\justz\OneDrive\Desktop\Code\Liliw Tourism"

# Start server
python server.py

# Open browser to:
http://localhost:8000
```

**Pros:** Full functionality, no CORS issues  
**Cons:** Requires Python installed

#### Method 2: Direct Open (Quick Test)
1. Navigate to the project folder
2. Double-click `index.html`
3. Website opens in your default browser

**Pros:** No setup required  
**Cons:** Some features may not work (CORS restrictions)

#### Method 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

**Pros:** Auto-refresh on save, professional workflow  
**Cons:** Requires VS Code setup

### Server Management

**Start Server:**
```powershell
python server.py
```

**Stop Server:**
```
Press Ctrl+C in terminal
```

**Access Admin Panel:**
```
http://localhost:8000/admin/
```

**Login Credentials:**
- Username: `admin`
- Password: `1234Liliw`

---

# Part III: Admin Panel System

## 🎛️ Admin Panel Overview

The admin panel is a **full-featured Content Management System (CMS)** that allows non-technical users to manage all website content through an intuitive interface.

## 🔐 Authentication System

### Login Page (`admin/index.html`)
- Beautiful gradient design
- Username/password authentication
- "Remember me" functionality
- Session management
- Error handling with user feedback
- Mobile responsive

### Security Features
- Session-based authentication
- Auto-logout on session expire
- Protected admin routes
- Password validation

## 📊 Dashboard (`admin/dashboard.html`)

### Features:
- **Quick Stats Cards**
  - Total Pages
  - Active Sections
  - Total Images
  - Last Updated

- **Quick Actions**
  - Edit Homepage
  - Edit Attractions
  - Edit Events
  - Manage Images

- **Recent Activity Log**
  - Tracks all admin actions
  - Timestamps for each activity
  - Clear activity history

- **System Information**
  - Current logged-in user
  - Session duration
  - System status

### Navigation
- **Sidebar Menu**
  - Dashboard
  - Homepage Editor
  - Attractions
  - Events
  - Experiences
  - Plan Your Trip
  - Image Manager
  - Logout

- **Mobile Menu**
  - Hamburger icon
  - Slide-in overlay
  - Touch-friendly

## 🏠 Homepage Editor (`admin/edit-homepage.html`)

### ✨ Advanced Features

#### 1. Multi-Image Carousel System
- **Upload Multiple Images** per card
- **Drag to Reorder** images
- **Primary Image Selection** - Choose which shows first
- **Image Preview** - See all images before saving
- **Delete Images** - Remove unwanted images
- **Image Counter Badge** - Shows number of images

#### 2. Drag & Drop Functionality
- **Reorder Sections** - Drag sections up/down
- **Reorder Cards** - Drag cards within sections
- **Reorder Images** - Drag images within card editor
- **Visual Feedback** - Drag handles and hover effects

#### 3. Card-Level Editing
- **Edit Individual Cards** - Click ✏️ button
- **Rich Form Editor**:
  - Title
  - Description
  - Multiple images with preview
  - Link/URL
  - Date (for events)
  - Icon (for info sections)
  - Enable/disable toggle

#### 4. Section Management
- **Add Section** - Create new content sections
- **Edit Section** - Modify section properties
- **Delete Section** - Remove entire sections
- **Toggle Section** - Enable/disable visibility
- **Reorder Sections** - Drag to rearrange

#### 5. Card Management
- **Add Card** - Create new cards in any section
- **Edit Card** - Modify card content
- **Delete Card** - Remove cards
- **Toggle Card** - Enable/disable individual cards
- **Reorder Cards** - Drag within section

#### 6. Smart Features
- **Live Preview** - See changes in iframe before saving
- **Auto-Save** - Periodic auto-save to prevent data loss
- **Auto-Backup** - Before each save operation
- **Unsaved Changes Warning** - Alert before leaving page
- **Visual Indicators** - Shows sections/cards with changes

### Image Upload System

**Drag & Drop:**
1. Click **Edit Card**
2. Drag image file from computer
3. Drop into upload area (highlights when ready)
4. Preview appears instantly
5. Add more images as needed
6. Drag to reorder
7. Click **Save Card**

**Choose File Button:**
1. Click **Edit Card**
2. Click **"Choose File"**
3. Select image (JPG, PNG, GIF)
4. Preview appears
5. Click **Save Card**

**Image Requirements:**
- Format: JPG, PNG, GIF
- Max Size: 5MB per image
- Recommended: 800×600px for cards, 1920×1080px for heroes

## 📄 Universal Page Editor (`admin/edit-page.html`)

### 🎯 One Editor for All Pages

Single editor handles all content pages through URL parameters:
- `?page=attractions` - Attractions
- `?page=events` - Events
- `?page=experiences` - Experiences
- `?page=plan-trip` - Plan Your Trip

### Features:

#### 1. Dynamic Form Generation
Forms adapt based on page type:
- **All Pages**: Title, Description, Images, Link, Enable/Disable
- **Events**: Additional Date field
- **Attractions/Restaurants/Hotels**: Additional Location field

#### 2. Section & Item Management
- **Add/Edit/Delete** sections
- **Add/Edit/Delete** items
- **Drag & Drop** reordering
- **Toggle** visibility
- **Duplicate** items

#### 3. Multi-Image Support
- **Multiple images** per item
- **Drag to reorder** images
- **Primary image** selection
- **Image preview** grid
- **Delete** individual images

#### 4. Detail Page System (NEW!)
**Major Feature:** Each item can have its own dedicated detail page!

**How It Works:**
1. Create/Edit an item in admin
2. Click **"📄 Edit Details"** button on the card
3. Detail editor modal opens
4. **Enable/Disable** detail page
5. Set **Hero Image** (from uploaded images)
6. Add **Multiple Paragraphs** of description
7. Add **Related Items** (auto-populated)
8. **Save Details**
9. **"See More"** button automatically appears on public website

**Detail Editor Features:**
- ✅ **Enable/Disable Toggle** - Control if detail page is active
- ✅ **Hero Image Selector** - Choose from item's images
- ✅ **Multi-Paragraph Editor**:
  - Add unlimited paragraphs
  - Remove paragraphs
  - Numbered paragraph system
  - Large text areas for content
- ✅ **Auto-Link Generation** - Links created automatically
- ✅ **Visual Indicator** - 📄 badge shows which items have detail pages
- ✅ **Conditional "See More" Button** - Only shows if detail.enabled = true

**Detail Page Structure:**
```json
{
  "id": "item-123",
  "title": "Attraction Name",
  "images": ["image1.jpg", "image2.jpg"],
  "details": {
    "enabled": true,
    "title": "Custom Detail Title",
    "subtitle": "Tagline for detail page",
    "heroImage": "image1.jpg",
    "description": [
      "First paragraph...",
      "Second paragraph...",
      "Third paragraph..."
    ],
    "relatedItems": ["item-456", "item-789"]
  }
}
```

#### 5. Save & Preview
- **Save Changes** - Commits to JSON file
- **Preview** - See changes in modal iframe
- **Auto-Backup** - Before each save
- **Activity Log** - Tracks all changes

## 📸 Image Helper (`admin/image-helper.html`)

### Purpose
Helps manage uploaded images that are temporarily stored in browser.

### Features:
- **View Pending Uploads** - See all uploaded but not saved images
- **Download Images** - Save to project folder
- **Clear Storage** - Remove from browser cache
- **Instructions** - Step-by-step guide

### Workflow:
1. Upload images in editor
2. Save changes
3. Go to Image Helper
4. Download each image
5. Save to `images/` folder with exact filename
6. Clear storage
7. Refresh website

---

# Part IV: Dynamic Content System

## 🔄 How Dynamic Content Works

### Architecture Overview

```
Admin Panel → JSON Files → Dynamic Loaders → Public Website
```

### Data Flow:

1. **Admin Panel**
   - User edits content in admin interface
   - Clicks "Save Changes"
   - Data sent to server via POST request

2. **JSON Storage**
   - Server saves data to `data/[page].json`
   - JSON structure preserved
   - Backup created before overwrite

3. **Public Website**
   - User visits page (e.g., `attractions.html`)
   - Page loads dynamic loader script
   - Loader fetches JSON: `fetch('data/attractions.json')`
   - Content rendered dynamically

4. **User Sees Content**
   - Fully rendered page
   - All updates reflected
   - No page refresh needed (after initial load)

### Dynamic Loaders

#### `homepage-dynamic.js`
- Loads `data/homepage.json`
- Renders all homepage sections
- Handles carousel images
- Filters enabled/disabled content

#### `attractions-dynamic.js`
- Loads `data/attractions.json`
- Renders attraction sections
- Shows "See More" buttons conditionally
- Links to detail pages

#### `events-dynamic.js`
- Loads `data/events.json`
- Renders event cards with dates
- Formats date badges
- Event-specific styling

#### `experiences-dynamic.js`
- Loads `data/experiences.json`
- Renders experience cards
- "Explore" buttons
- Clean card layout

#### `plan-trip-dynamic.js`
- Loads `data/plan-trip.json`
- Travel information cards
- Optional date badges
- "Learn More" buttons

### JSON Structure

All data files follow consistent structure:

```json
{
  "page": {
    "title": "Page Title",
    "description": "Page description"
  },
  "sections": [
    {
      "id": "section-1",
      "title": "Section Title",
      "description": "Section description",
      "enabled": true,
      "items": [
        {
          "id": "item-1",
          "title": "Item Title",
          "description": "Item description",
          "images": ["image1.jpg", "image2.jpg"],
          "image": "image1.jpg",
          "link": "#",
          "enabled": true,
          "details": {
            "enabled": false
          }
        }
      ]
    }
  ]
}
```

### Enable/Disable System

**Section Level:**
```json
{
  "enabled": true  // Section appears on website
}
```

**Item Level:**
```json
{
  "enabled": false  // Item hidden from website
}
```

**Filtering Logic:**
```javascript
const enabledSections = data.sections.filter(s => s.enabled !== false);
const enabledItems = section.items.filter(i => i.enabled !== false);
```

---

# Part V: Detail Pages & Carousel

## 📄 Detail Page System (NEW Feature!)

### Overview
Each attraction, event, or experience can now have its own dedicated detail page with a beautiful image carousel!

### Universal Detail Page (`attraction-detail.html`)

**Single Template for All:**
- Works for attractions, events, experiences, etc.
- Loads content based on URL parameters
- Example: `attraction-detail.html?id=item-123&page=attractions`

### Features:

#### 1. **Automatic Image Carousel** 🎠

**When to Show:**
- Automatically activates when item has **2+ images**
- Single image shows static hero (no carousel)

**Carousel Features:**
- ✅ **Auto-Transition** - Changes every 5 seconds
- ✅ **Pause on Hover** - Stops when mouse hovers
- ✅ **Navigation Arrows** - Left/Right inside card
- ✅ **Dot Indicators** - Shows current image position
- ✅ **Touch/Swipe Support** - Mobile-friendly
- ✅ **Smooth Transitions** - Cross-fade effect
- ✅ **Responsive Design** - Works on all devices

**Carousel Controls:**
```
← (Previous)     [Image with smooth fade]     → (Next)
                 ⚫⚪⚪ (Dot indicators)
```

**Animation System:**
```javascript
// Auto-advance every 5 seconds
carouselInterval = setInterval(() => {
    navigateCarousel(1);
}, 5000);

// Pause on hover
heroCard.addEventListener('mouseenter', () => {
    stopCarousel();
});

// Resume on mouse leave
heroCard.addEventListener('mouseleave', () => {
    startCarousel();
});
```

**Touch/Swipe:**
- Swipe left → Next image
- Swipe right → Previous image
- Pause during swipe
- Resume after swipe

#### 2. **Hero Section**
- Large hero image (or carousel)
- Title overlay
- Location badge
- Subtitle
- "Learn More" button

#### 3. **Description Section**
- Multiple paragraphs
- Formatted text
- Rich content support

#### 4. **Related Items**
- Shows 3 related items from same section
- Clickable cards
- Links to other detail pages
- Automatic filtering

### Image Loading Strategy

**Priority Order:**
1. `details.heroImage` - Primary hero image
2. `item.images[]` - All uploaded images
3. `item.image` - Legacy single image
4. Placeholder - If no images available

**Implementation:**
```javascript
carouselImages = [];
if (details.heroImage) {
    carouselImages.push(details.heroImage);
}
if (item.images && Array.isArray(item.images)) {
    item.images.forEach(img => {
        if (img && !carouselImages.includes(img)) {
            carouselImages.push(img);
        }
    });
}
```

### Carousel CSS

**Navigation Arrows:**
```css
.carousel-nav {
    position: absolute;
    top: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    opacity: 0;  /* Hidden by default */
    transition: opacity 0.3s ease;
}

.hero-card:hover .carousel-nav {
    opacity: 1;  /* Show on hover */
}
```

**Dot Indicators:**
```css
.carousel-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
}

.carousel-indicator.active {
    background-color: white;
    transform: scale(1.2);
}
```

**Mobile Responsive:**
```css
@media (max-width: 768px) {
    .carousel-nav {
        opacity: 0.7;  /* Always visible on mobile */
        width: 40px;
        height: 40px;
    }
    
    .carousel-indicators {
        opacity: 1;  /* Always show dots on mobile */
    }
}
```

### Creating Detail Pages

**Step 1: Enable in Admin**
1. Edit item in page editor
2. Click **"📄 Edit Details"** button
3. Toggle **"Enable Detail Page"** to ON
4. Select hero image from dropdown
5. Add description paragraphs
6. Click **"Save Details"**

**Step 2: Automatic Features**
- "See More" button automatically appears on cards
- Link generated: `attraction-detail.html?id=ITEM_ID&page=PAGE_NAME`
- 📄 badge appears on admin card
- Detail page becomes accessible

**Step 3: Test Detail Page**
1. Save changes in admin
2. Go to public website
3. Click "See More" on the card
4. Detail page opens with carousel (if 2+ images)
5. Test carousel navigation
6. Test mobile swipe

---

# Part VI: Animation System

## 🎨 Animation Architecture

The website features a sophisticated animation system with scroll-triggered effects, page transitions, and interactive elements.

## Core Animation Features

### 1. Page Load Animations

**Sequence:**
```
0.0s → Body fades in (opacity 0 → 1)
0.1s → Navigation slides down from top
0.2s → Hero section fades + slides up
0.3s → First content section appears
0.4s → Second content section appears
0.5s → Third content section appears
```

**CSS Classes:**
- `.fade-in` - Simple fade effect
- `.fade-in-up` - Fade + slide up combo
- `.slide-down` - Slide down from top
- `.scale-in` - Zoom in effect
- `.stagger-*` - Delayed animations

**Implementation:**
```css
.fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### 2. Navigation Active Indicator

**The Star Feature!** Animated blue bar that slides under active page:

```
Home  Attractions  Events  Map
━━━━              ← Bar slides here!
```

**How It Works:**
```javascript
// Detect current page
const currentPage = document.body.getAttribute('data-page');

// Calculate position
const link = document.querySelector(`[data-page="${currentPage}"]`);
const indicator = document.querySelector('.active-indicator');
indicator.style.left = link.offsetLeft + 'px';
indicator.style.width = link.offsetWidth + 'px';
```

**Smooth Transition:**
```css
.active-indicator {
    transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
}
```

### 3. Page Transitions

**Navigation Flow:**
```javascript
// Click link
↓
Page fades out (0.3s)
↓
Navigate to new page
↓
New page fades in (0.4s)
```

**Implementation:**
```javascript
function navigateToPage(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}
```

### 4. Scroll Animations

**Hero Parallax:**
- Background moves slower than content
- Creates depth effect
- Smooth scrolling

**Fade-In On Scroll:**
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});
```

**Navigation Opacity:**
```javascript
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    }
});
```

### 5. Interactive Hover Effects

**Cards:**
- Lift up + scale (1.03×)
- Shadow increase
- Smooth 0.3s transition

**Buttons:**
- Ripple effect on click
- Color transition
- Scale on hover

**Links:**
- Color fade (0.3s)
- Underline animation

### 6. Homepage CTA Buttons

**"See Attractions":**
- Blue glow pulse
- Scale on hover

**"Upcoming Event":**
- Purple glow pulse
- Scale on hover

**Animation:**
```css
@keyframes pulse-blue {
    0%, 100% {
        box-shadow: 0 0 20px rgba(66, 153, 225, 0.6);
    }
    50% {
        box-shadow: 0 0 40px rgba(66, 153, 225, 0.8);
    }
}

.cta-button:hover {
    transform: scale(1.05);
}
```

### 7. Event Cards

**On Hover:**
- Lift + shadow increase
- Image subtle zoom
- Text color shift

### 8. Mobile Menu Animations

**Opening:**
```
0.0s → Overlay fades in
0.0s → Menu slides from right
0.2s → Close button rotates + fades
0.1s → First link slides in
0.15s → Second link slides in
0.2s → Third link slides in
...
```

**Implementation:**
```css
.mobile-menu {
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.mobile-menu-overlay.active .mobile-menu {
    transform: translateX(0);
}

.mobile-nav a:nth-child(1) {
    transition-delay: 0.1s;
}
```

## Animation Files

### `css/animations.css`
Complete animation styles:
- Keyframe definitions
- Transition effects
- Hover states
- Scroll-triggered animations

### `js/animations.js`
Animation engine:
- Scroll detection
- Active page indicator positioning
- Page transition handling
- Preloading optimization

## Animation Guidelines

### Adding Animations to New Elements

**Fade In:**
```html
<div class="fade-in">Content</div>
```

**Fade + Slide Up:**
```html
<section class="fade-in-up">Section Content</section>
```

**Staggered Appearance:**
```html
<div class="fade-in stagger-1">First</div>
<div class="fade-in stagger-2">Second</div>
<div class="fade-in stagger-3">Third</div>
```

### Performance Tips

✅ **Do:**
- Use CSS transforms (translateX, translateY, scale)
- Apply will-change for frequently animated elements
- Keep durations under 1 second
- Use cubic-bezier for natural motion

❌ **Don't:**
- Animate width/height directly (use scale)
- Use too many simultaneous animations
- Forget to test on slower devices
- Ignore user's motion preferences

### Accessibility

Respects user preferences:
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

# Part VII: Navigation System

## 🎯 Navigation Overview

Unified navigation system ensuring consistent experience across all pages.

## Desktop Navigation

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ [Logo] Liliw Tourism  Home|Attractions|Events|Map  🔍 Search...  ☰ │
└─────────────────────────────────────────────────┘
  ↑ Far Left           ↑ Center           ↑ Right
```

**Features:**
- **Centered Links**: Home, Attractions, Events, Map
- **Dropdown Submenu**: Attractions expandable
- **Click + Delayed Hover**: Primary click, 500ms hover delay
- **Functional Search Bar**: 200px width with icon
- **Active Page Indicator**: Blue background + animated bar
- **Smooth Animations**: 0.4s transitions

## Mobile Navigation

**Breakpoint:** 768px

**Features:**
- **Hamburger Menu**: Responsive ≤ 768px
- **Slide-In Animation**: From right with backdrop
- **Mobile Submenu**: Collapsible attractions
- **Touch-Friendly**: 44px+ tap targets
- **Staggered Links**: Cascade animation

**Structure:**
```html
<div class="mobile-menu-overlay">
    <div class="mobile-menu">
        <button class="close-menu">&times;</button>
        <nav class="mobile-nav">
            <a href="homepage.html">Home</a>
            <a href="attractions.html">Attractions</a>
            <a href="events.html">Events</a>
            <a href="interactive-map.html">Map</a>
        </nav>
    </div>
</div>
```

## Navigation Components

### Logo Section
```html
<div class="logo">
    <a href="index.html">
        <img src="images/liliw-logo.png" class="logo-img">
        <span class="logo-text">Liliw Tourism</span>
    </a>
</div>
```

**Styling:**
- Logo: 45×45px, 8px border-radius
- Text: 19px, bold, dark gray
- Gap: 12px between image and text

### Navigation Links
```html
<nav class="main-nav">
    <a href="homepage.html" data-page="homepage">Home</a>
    <a href="attractions.html" data-page="attractions">Attractions</a>
    <a href="events.html" data-page="events">Events</a>
    <a href="interactive-map.html" data-page="map">Map</a>
</nav>
```

**Styling:**
- Font: 16px, medium weight
- Padding: 10px 24px
- Border-radius: 8px
- Active: Blue (#3b82f6) with shadow

### Search Bar
```html
<div class="nav-actions">
    <div class="search-bar">
        <svg>...</svg>
        <input type="text" placeholder="Search..." id="headerSearchInput">
    </div>
    <button class="menu-toggle">☰</button>
</div>
```

**Features:**
- 200px width (desktop), 150px (mobile)
- Gray background (#f3f4f6)
- Blue focus state (#3b82f6)
- Icon + input combo

## Active Page Detection

**HTML:**
```html
<body data-page="homepage">
```

**JavaScript:**
```javascript
const currentPage = document.body.getAttribute('data-page');
document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
    }
});
```

**CSS:**
```css
body[data-page="homepage"] .main-nav a[data-page="homepage"],
body[data-page="attractions"] .main-nav a[data-page="attractions"] {
    background-color: #3b82f6;
    color: #ffffff;
}
```

## Integration Guide

### Adding Navigation to New Page

**Step 1:** Add data-page attribute
```html
<body data-page="your-page-name">
```

**Step 2:** Include navigation script
```html
<script src="js/include-nav.js"></script>
```

**Step 3:** Update navigation links (if needed)
```javascript
// Edit js/include-nav.js
<a href="your-page.html" data-page="your-page-name">Your Page</a>
```

---

# Part VIII: Pages Reference

## 🏠 Homepage (`homepage.html`)

**Purpose:** Main landing page after splash

**Sections:**
1. Welcome Section - Hero with logo and CTAs
2. Popular Places - 3 attraction cards
3. Events - Tsinelas Festival banner
4. Plan Your Visit - Nature scene CTA
5. About - Footer with social links

**Dynamic:** Loads from `data/homepage.json`

## 🏛️ Attractions (`attractions.html`)

**Purpose:** Attractions overview with categories

**Dynamic:** Loads from `data/attractions.json`

**Sections:**
- Heritage Sites
- Natural Attractions
- Each card has:
  - Image
  - Title
  - Description
  - Location
  - "See More" button (if detail page enabled)

## 🎉 Events (`events.html`)

**Purpose:** Events and festivals

**Dynamic:** Loads from `data/events.json`

**Sections:**
- Annual Festivals
- Cultural Events
- Each card has:
  - Date badge
  - Image
  - Title
  - Description
  - "View Details" button

## ✨ Experiences (`experiences.html`)

**Purpose:** Local experiences

**Dynamic:** Loads from `data/experiences.json`

**Sections:**
- Local Crafts & Shopping
- Food & Dining
- Each card has:
  - Image
  - Title
  - Description
  - "Explore" button

## 🗺️ Plan Your Trip (`plan-your-trip.html`)

**Purpose:** Travel planning information

**Dynamic:** Loads from `data/plan-trip.json`

**Sections:**
- Getting There
- Where to Stay
- Best Time to Visit

## 📄 Detail Page (`attraction-detail.html`)

**Purpose:** Universal detail page for all items

**URL Pattern:** `?id=ITEM_ID&page=PAGE_NAME`

**Features:**
- Hero carousel (2+ images)
- Static hero (1 image)
- Description paragraphs
- Related items (3 max)
- Back button

---

# Part IX: Technical Reference

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Leaflet.js** - Interactive maps
- **SortableJS** - Drag & drop

### Development
- **Python HTTP Server** - Local development
- **VS Code** - Code editor
- **Git** - Version control
- **GitHub** - Repository hosting

## 📐 Design System

### Colors

**Primary:**
- `#3b82f6` - Primary blue
- `#4299e1` - Light blue
- `#1a365d` - Dark blue

**Grays:**
- `#1f2937` - Dark gray
- `#4b5563` - Medium gray
- `#9ca3af` - Light gray
- `#f3f4f6` - Background gray

**Accents:**
- `#805ad5` - Purple (events)
- `#ffd700` - Gold (festival)
- `#63b3ed` - Cyan (attractions)

### Typography

**Font Family:**
```css
font-family: 'Poppins', sans-serif;
```

**Font Weights:** 300, 400, 500, 600, 700

**Font Sizes:**
- Headings: 42px, 32px, 24px, 19px
- Body: 16px
- Small: 14px

### Spacing

**Base Unit:** 4px

**Scale:** 4, 8, 12, 16, 20, 24, 30, 40px

**Container Padding:**
- Desktop: 40px
- Tablet: 30px
- Mobile: 20px

### Border Radius

- Small: 6px (buttons)
- Medium: 8px (inputs)
- Large: 12px (cards)
- Round: 24px (search)
- Circle: 50% (logos)

### Shadows

**Levels:**
```css
/* Subtle */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

/* Medium */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

/* Heavy */
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

/* Glow */
box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
```

## 🔧 Common Patterns

### Page Navigation
```javascript
function navigateToPage(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}
```

### Scroll Detection
```javascript
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    }
});
```

### Fetch JSON
```javascript
async function loadData() {
    const response = await fetch('data/page.json');
    const data = await response.json();
    render(data);
}
```

---

# Part X: Maintenance

## 🐛 Troubleshooting

### Navigation Not Showing
**Check:**
- Is `include-nav.js` loaded?
- Script after body content?
- Browser console errors?

### Images Not Loading
**Check:**
- Files in `images/` folder?
- Exact filename match (case-sensitive)?
- Hard refresh (Ctrl+F5)?

### Admin Can't Save
**Check:**
- Server running?
- Network tab in DevTools
- Console errors?

### Carousel Not Working
**Check:**
- Item has 2+ images?
- `details.enabled = true`?
- JavaScript errors in console?

## 📝 Maintenance Checklist

### Monthly
- [ ] Check all links
- [ ] Update event dates
- [ ] Add new attractions
- [ ] Review analytics
- [ ] Test on latest browsers

### Quarterly
- [ ] Refresh seasonal images
- [ ] Update festival info
- [ ] Content review
- [ ] Mobile responsiveness
- [ ] Performance audit

### Annual
- [ ] Complete content review
- [ ] Update copyright year
- [ ] Security updates
- [ ] Redesign evaluation

## 📞 Support

### Resources
- **Leaflet.js**: https://leafletjs.com
- **MDN Web Docs**: https://developer.mozilla.org
- **GitHub Repo**: https://github.com/HotokeZ/Liliw-Tourism-Website

### Tools
- **Image Optimization**: TinyPNG.com
- **Browser DevTools**: F12
- **VS Code Extensions**: Live Server, Prettier

---

## 🎉 Summary

### What's Been Built

#### Public Website
✅ Responsive design across all devices  
✅ Dynamic content loading from JSON  
✅ Interactive maps with Leaflet.js  
✅ Detail pages with image carousels  
✅ Smooth animations and transitions  
✅ Mobile-optimized navigation  

#### Admin Panel (CMS)
✅ Secure authentication system  
✅ Intuitive dashboard  
✅ Homepage editor with multi-image support  
✅ Universal page editor for all content  
✅ Detail page editor with carousel  
✅ Drag & drop reordering  
✅ Image upload and management  
✅ Live preview before publishing  
✅ Auto-save and backup system  

#### Recent Additions (October 22, 2025)
🆕 **Detail Page System** - Dedicated pages for each item  
🆕 **Automatic Image Carousel** - 5-second auto-advance, pause on hover  
🆕 **Touch/Swipe Support** - Mobile-friendly carousel navigation  
🆕 **Dot Indicators** - Visual current image indicator  
🆕 **Conditional "See More"** - Only shows when detail page enabled  
🆕 **📄 Visual Badges** - Shows which items have detail pages  

### Project Status: Production Ready ✨

**Version:** 4.0  
**Last Updated:** October 22, 2025  
**Status:** Fully Functional CMS with Dynamic Content

---

*Built with ❤️ for the Municipality of Liliw, Laguna*
*The Footwear Capital of the Philippines*
