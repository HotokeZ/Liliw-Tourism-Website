# 📖 Liliw Tourism Website - Updates & Guidelines# 📖 Liliw Tourism Website - Updates & Guidelines



**Essential Documentation for Setup, Features, and Maintenance****Essential Documentation for Setup, Features, and Maintenance**



*Last Updated: October 19, 2025*---



---## 📚 Table of Contents



## 📚 Table of Contents- [Getting Started](#getting-started)

- [Recent Updates](#recent-updates)

- [Getting Started](#getting-started)- [Features](#features)

- [Recent Updates](#recent-updates)- [Bug Fixes](#bug-fixes)

- [Features](#features)- [Technical Reference](#technical-reference)

- [Bug Fixes](#bug-fixes)- [Maintenance](#maintenance)

- [Technical Reference](#technical-reference)

- [Maintenance](#maintenance)---



---# Part I: Project Overview



## 🚀 Getting Started## 🌟 About This Project



### Running the Website LocallyThe **Liliw Tourism Website** is a modern, responsive web application showcasing Liliw, Laguna - The Footwear Capital of Laguna. Built with HTML5, CSS3, and vanilla JavaScript, it features stunning animations, interactive elements, and a comprehensive navigation system.



**Method 1: Python HTTP Server (Recommended)**## ✨ Key Features

```powershell

# Navigate to project directory### Design & User Experience

cd "c:\Users\justz\OneDrive\Desktop\Code\Liliw Tourism"- ✅ **Fully Responsive** - Adapts seamlessly to desktop, tablet, and mobile

- ✅ **Modern UI/UX** - Clean design with professional animations

# Start server- ✅ **Smooth Page Transitions** - Fade in/out effects between pages

python -m http.server 8000- ✅ **Interactive Elements** - Hover effects, click animations, scroll triggers

- ✅ **Consistent Navigation** - Unified header across all pages

# Open browser to: http://localhost:8000- ✅ **Search Functionality** - Integrated search bar in navigation

```- ✅ **Mobile Menu** - Hamburger menu for smaller screens



**Method 2: Direct Open**### Content Sections

- Double-click `index.html` to open in browser- 🏠 **Homepage** - Welcome section with CTA buttons

- Note: Some features may not work due to CORS restrictions- 🏛️ **Attractions** - Natural and heritage sites

- 🎉 **Events** - Tsinelas Festival and local celebrations

**Method 3: VS Code Live Server**- 🗺️ **Interactive Map** - Location finder with clickable pins

- Install "Live Server" extension- 📱 **Mobile Optimized** - Touch-friendly interface

- Right-click `index.html` → "Open with Live Server"

## 📁 Project Structure

### Project Structure

```

```Liliw Tourism/

Liliw Tourism/├── index.html                    # Splash screen entry point

├── index.html                    # Splash screen├── homepage.html                 # Main landing page

├── homepage.html                 # Main landing page├── attractions.html              # Attractions overview

├── attractions.html              # Attractions overview├── natural-attractions.html      # Natural sites detail page

├── natural-attractions.html      # Natural sites├── heritage-attractions.html     # Heritage sites detail page

├── heritage-attractions.html     # Heritage sites├── interactive-map.html          # Interactive map view

├── interactive-map.html          # Interactive map with Leaflet.js├── events.html                   # Events and festivals

├── events.html                   # Events page├── animation-preview.html        # Animation testing page

│├── welcome.html                  # Getting started page

├── css/                          # Stylesheets├── IMAGE_CHECKLIST.html          # Image requirements guide

│   ├── style.css│

│   ├── homepage.css├── css/

│   ├── navigation.css│   ├── style.css                 # Splash screen styles

│   ├── animations.css│   ├── homepage.css              # Homepage-specific styles

│   └── map.css│   ├── attractions.css           # Attractions page styles

││   ├── events.css                # Events page styles

├── js/                           # JavaScript files│   ├── map.css                   # Interactive map styles

│   ├── homepage.js│   ├── navigation.css            # Shared navigation styles

│   ├── map.js│   ├── animations.css            # Animation system styles

│   ├── include-nav.js│   └── attraction-detail.css     # Detail page styles

│   ├── navigation.js│

│   └── animations.js├── js/

││   ├── script.js                 # Main JavaScript

└── images/                       # Image assets│   ├── homepage.js               # Homepage interactions

```│   ├── attractions.js            # Attractions page logic

│   ├── events.js                 # Events page logic

---│   ├── map.js                    # Map interactions

│   ├── include-nav.js            # Navigation injection system

## 🆕 Recent Updates│   ├── navigation.js             # Navigation functionality

│   ├── animations.js             # Animation engine

### October 19, 2025 - Interactive Map Enhancements│   └── attraction-detail.js      # Detail page logic

│

#### 1. **FREE Interactive Maps with Leaflet.js**├── images/                       # Image assets folder

- Replaced static map images with fully interactive Leaflet.js maps│   ├── liliw-logo.png

- Using OpenStreetMap tiles (100% free, no API key required)│   ├── liliw-church.jpg

- Added to both `homepage.html` and `interactive-map.html`│   ├── kilangin-falls.jpg

│   └── ... (other images)

**Features:**│

- Custom markers with emoji icons (⛪🌊🏛️📍)├── assets/                       # Additional resources

- Color-coded markers by type (red heritage, green nature, blue landmarks)├── server.py                     # Python development server

- Clickable markers with popups showing attraction details└── UPDATES_AND_GUIDELINES.md     # This file!

- Location cards that fly to markers when clicked```

- Smooth animations and transitions

---

#### 2. **Advanced Map Controls**

- **Ctrl + Scroll Zoom**: Hold Ctrl and scroll to zoom map# Part II: Getting Started

- **Shift + Hover Pan**: Hold Shift and move mouse to pan map

- **Drag to Pan**: Click and drag to move around (default)## 🚀 Quick Start Guide

- **Double-Click Zoom**: Quick zoom in

- **+/- Buttons**: Standard zoom controls### Prerequisites

- **Inverted Scroll Direction**: Scroll down = zoom in (intuitive)- **Web Browser** - Chrome, Firefox, Safari, or Edge

- **Throttled Zoom**: One zoom level per scroll notch (no acceleration)- **Text Editor** - VS Code (recommended), Sublime Text, or any editor

- **Python** (optional) - For local development server

**Implementation Details:**

```javascript### Running the Website Locally

// Ctrl+Scroll zoom with instant response

mapDiv.addEventListener('wheel', function(e) {#### Method 1: Direct Open (Simplest)

    if (e.ctrlKey) {```

        e.preventDefault();1. Navigate to the project folder

        if (!isZooming) {2. Double-click index.html

            isZooming = true;3. Website opens in your default browser

            // Zoom logic```

            setTimeout(() => { isZooming = false; }, 100);

        }**Pros:** No setup required  

    }**Cons:** Some features may not work (CORS restrictions)

});

#### Method 2: Python HTTP Server (Recommended)

// Shift+Hover pan```powershell

mapDiv.addEventListener('mousemove', function(e) {# Navigate to project directory

    if (e.shiftKey && lastMousePosition) {cd "c:\Users\justz\OneDrive\Desktop\Code\Liliw Tourism"

        const deltaX = e.clientX - lastMousePosition.x;

        const deltaY = e.clientY - lastMousePosition.y;# Start server (Python 3)

        map.panBy([-deltaX, -deltaY], { animate: false });python -m http.server 8000

    }

});# Open browser to:

```http://localhost:8000

```

#### 3. **Enhanced Location Interactions**

- **Instant Popup Display**: Information appears immediately when clicking location cards**Pros:** Full functionality, no CORS issues  

- **Fast Animations**: Reduced fly duration from 1.5s → 0.6s**Cons:** Requires Python installed

- **Smooth Transitions**: Map pans while popup stays visible

- **No Delays**: Removed popup delay for better responsiveness#### Method 3: VS Code Live Server

```

**Before:**1. Install "Live Server" extension in VS Code

```javascript2. Right-click index.html

map.flyTo(coords, 17, { duration: 1.5 });3. Select "Open with Live Server"

setTimeout(() => { marker.openPopup(); }, 1500);  // 3 second total wait```

```

**Pros:** Auto-refresh on save, professional workflow  

**After:****Cons:** Requires VS Code setup

```javascript

marker.openPopup();  // Instant### Server Management

map.flyTo(coords, 17, { duration: 0.6 });  // Fast pan

```**Start Server:**

```powershell

#### 4. **Map Navigation Tips**python server.py

Added user-friendly instructions on both map pages:```

- 🖱️ Drag to pan

- Ctrl + Scroll to zoom**Stop Server:**

- Shift + Hover to pan```

- Double-click to zoom inPress Ctrl+C in terminal

- 📍 Click markers for details```

- 📱 Pinch to zoom on mobile

**Access Website:**

#### 5. **Scroll Behavior Improvements**```

- Disabled default scroll zoom to prevent page scroll interferencehttp://localhost:8000

- Normal scrolling over map scrolls the page (not the map)```

- Ctrl+Scroll zooms the map precisely

- 100ms throttle prevents zoom acceleration## 📸 Image Setup

- Respects zoom limits (min/max zoom levels)

Your website needs 9 key images in the `images/` folder:

---

### Required Images

## ✨ Features

1. **liliw-logo.png** - Main logo (circular, 60x60px+)

### Navigation System2. **liliw-church.jpg** - St. John the Baptist Church hero image

3. **liliw-church-card.jpg** - Church thumbnail for cards

#### Desktop Navigation4. **kilangin-falls.jpg** - Waterfall main image

- **Centered Links**: Home, Attractions, Events, Map5. **gat-tayaw-tsinelas.jpg** - Gat Tayaw monument

- **Dropdown Submenu**: Attractions has expandable submenu6. **tsinelas-festival.jpg** - Festival promotional image

  - All Attractions7. **other-attraction.jpg** - Generic attraction placeholder

  - Natural Attractions8. **nature-scene.jpg** - Scenic Liliw landscape

  - Heritage Sites9. **liliw-logo-small.png** - Footer logo (30x30px+)

- **Click + Delayed Hover**: Primary click interaction, 500ms hover delay

- **Functional Search Bar**: 200px width with icon### Image Guidelines

- **Active Page Indicator**: Blue background on current page

- **Smooth Animations**: 0.4s transitions**Format:** JPG for photos, PNG for logos  

**Resolution:** Minimum 1200px width for hero images  

#### Mobile Navigation**Optimization:** Compress images for web (TinyPNG, ImageOptim)  

- **Hamburger Menu**: Responsive menu for screens ≤ 768px**Naming:** Use lowercase, hyphens instead of spaces  

- **Slide-In Animation**: Menu slides from right with backdrop fade

- **Mobile Submenu**: Collapsible Attractions section**Example:**

- **Touch-Friendly**: Large tap targets (44px+)```

- **Staggered Animations**: Links cascade in one by one❌ Liliw Church Photo.JPG

✅ liliw-church.jpg

**Key CSS:**```

```css

.top-nav {### Adding Your Images

    height: 70px;

    padding: 12px 20px;```

    z-index: 100;1. Save images to images/ folder

}2. Ensure exact filename matches (case-sensitive)

3. Refresh browser (Ctrl+F5 for hard refresh)

.dropdown-menu {```

    z-index: 9999;

    opacity/transform: 0.4s transitions;**Pro Tip:** Open `IMAGE_CHECKLIST.html` to see visual guide!

}

```---



### Animation System# Part III: Animation System



#### Scroll-Triggered Hero Blur## 🎨 Animation Architecture

- Progressive blur effect on hero images when scrolling

- Blur range: 0-8px over 100-400px scroll distanceThe website features a sophisticated animation system that brings the entire experience to life with smooth, professional transitions.

- Smooth 0.3s transitions

- Applies to hero images and overlays## Core Animation Features



**Implementation:**### 1. Page Load Animations

```javascript

window.addEventListener('scroll', function() {When a page loads, elements animate in sequence:

    const scrollPosition = window.scrollY;

    let blurAmount = 0;```

    0.0s → Body fades in (opacity 0 → 1)

    if (scrollPosition > 100 && scrollPosition < 400) {0.1s → Navigation slides down from top

        blurAmount = ((scrollPosition - 100) / 300) * 8;0.2s → Hero section fades + slides up

    } else if (scrollPosition >= 400) {0.3s → First content section appears

        blurAmount = 8;0.4s → Second content section appears

    }0.5s → Third content section appears

    ```

    heroImg.style.filter = `blur(${blurAmount}px)`;

});**CSS Classes Used:**

```- `.fade-in` - Simple fade effect

- `.fade-in-up` - Fade + slide up combo

#### Page Transitions- `.slide-down` - Slide down from top

- Fade out on navigation (0.3s)- `.scale-in` - Zoom in effect

- Fade in on page load (0.4s)- `.stagger-*` - Delayed animations

- Staggered element animations

- Active page indicator slides smoothly### 2. Navigation Active Indicator



### Interactive Map Features**The Star Feature!** A blue animated bar that slides smoothly under the active page:



#### Leaflet.js Integration```

- **Version**: 1.9.4 from unpkg CDNHome  Attractions  Events  Map

- **Tile Provider**: OpenStreetMap (free)━━━━              ← Bar slides here!

- **Map Center**: Liliw, Laguna [14.1333, 121.4333]```

- **Zoom Levels**: Homepage (14), Interactive Map (15)

**How It Works:**

#### Custom Markers- Detects current page via `data-page` attribute

```javascript- Calculates navigation link position

const attractions = [- Smoothly transitions bar (0.4s cubic-bezier)

    {- Glowing blue gradient effect

        name: 'St. John the Baptist Church',

        coords: [14.1340, 121.4350],**Implementation:**

        type: 'heritage',```html

        icon: '⛪',<body data-page="homepage">

        description: 'Historic Spanish colonial church',<!-- Navigation automatically highlights "Home" -->

        link: 'heritage-attractions.html'```

    },

    // ... more attractions### 3. Page Transitions

];

```Smooth fade out/in when navigating:



#### Location Cards```javascript

- Click card → Map flies to location// Click any link

- Popup opens immediately↓

- Smooth 0.6s pan animationPage fades out (0.3s)

- "Learn More" links to attraction pages↓

Navigate to new page

### Back Button Functionality↓

All pages use browser history for back buttons:New page fades in (0.4s)

```html```

<a href="javascript:history.back()" class="back-button">←</a>

```### 4. Scroll Animations



**Benefits:**Elements animate as you scroll:

- Respects user's navigation path

- Works from any page- **Hero Parallax** - Background moves slower than content

- No hardcoded redirects- **Fade-In On Scroll** - Elements appear when visible

- **Navigation Opacity** - Header becomes more solid on scroll

---

### 5. Interactive Hover Effects

## 🐛 Bug Fixes

- **Cards:** Lift up + scale (1.03×)

### Navigation Fixes- **Buttons:** Ripple effect on click

- **Links:** Color transition (0.3s)

#### 1. **Inconsistent Header Size** ✅ FIXED- **Images:** Zoom effect on hover

**Problem:** Navigation header different sizes across pages

- Homepage: 45px logo, 12px 20px padding### 6. Special Animations

- Other pages: 50px logo, 15px 30px padding (from duplicate CSS)

**Homepage CTA Buttons:**

**Solution:**- "See Attractions" - Blue glow pulse

- Removed duplicate `.top-nav` styles from attraction-detail.css (lines 16-60)- "Upcoming Event" - Purple glow pulse

- Added explicit constraints with !important- Both scale on hover with smooth transition

- All pages now use unified navigation.css

**Event Cards:**

```css- Hover: Lift + shadow increase

.top-nav {- Image: Subtle zoom

    min-height: 70px !important;- Text: Color shift

    padding: 12px 20px !important;

}## Animation Files



.logo-img {### css/animations.css

    width: 45px !important;Complete animation styles including:

    height: 45px !important;- Keyframe definitions

}- Transition effects

```- Hover states

- Scroll-triggered animations

#### 2. **Dropdown Redirect Issue** ✅ FIXED

**Problem:** Clicking "Attractions" immediately redirected to page### js/animations.js

Animation engine with:

**Solution:** Changed dropdown toggle from `<a href>` to `<span>`- Scroll detection

```html- Active page indicator positioning

<!-- Before -->- Page transition handling

<a href="attractions.html" class="dropdown-toggle">Attractions</a>- Preloading optimization



<!-- After -->## Animation Guidelines

<span class="dropdown-toggle">Attractions</span>

```### Adding Animations to New Elements



#### 3. **Z-Index Stacking Context** ✅ FIXED**Fade In:**

**Problem:** Dropdown menu covered by page content when scrolling```html

<div class="fade-in">Content</div>

**Solution:** Established proper z-index hierarchy```

```css

.top-nav { z-index: 100; }**Fade + Slide Up:**

.dropdown-menu { z-index: 9999; }```html

/* Page content: z-index: 10 */<section class="fade-in-up">Section Content</section>

``````



### Map Improvements**Staggered Appearance:**

```html

#### 1. **Scroll Zoom Interference** ✅ FIXED<div class="fade-in stagger-1">First</div>

**Problem:** Scrolling over map zoomed the map instead of page<div class="fade-in stagger-2">Second</div>

<div class="fade-in stagger-3">Third</div>

**Solution:**```

```javascript

// Disabled default scroll zoom### Performance Tips

const map = L.map('map', {

    scrollWheelZoom: false,✅ **Do:**

    doubleClickZoom: true,- Use CSS transforms (translateX, translateY, scale)

    touchZoom: true- Apply will-change for frequently animated elements

});- Keep animation durations under 1 second

- Use cubic-bezier for natural motion

// Custom Ctrl+Scroll implementation

mapDiv.addEventListener('wheel', function(e) {❌ **Don't:**

    if (e.ctrlKey) {- Animate width/height directly (use scale)

        e.preventDefault();- Use too many simultaneous animations

        // Custom zoom logic- Forget to test on slower devices

    }- Ignore user's motion preferences

    // Otherwise, page scrolls normally

});### Accessibility

```

Respects user preferences:

#### 2. **Zoom Acceleration** ✅ FIXED```css

**Problem:** Fast scrolling caused multiple zoom levels (acceleration effect)@media (prefers-reduced-motion: reduce) {

    * {

**Solution:** Added throttle with `isZooming` flag        animation-duration: 0.01ms !important;

```javascript        transition-duration: 0.01ms !important;

let isZooming = false;    }

}

if (e.ctrlKey && !isZooming) {```

    isZooming = true;

    // Zoom exactly one level---

    setTimeout(() => { isZooming = false; }, 100);

}# Part IV: Navigation Redesign

```

## 🎯 Navigation System Overview

#### 3. **Unintuitive Zoom Direction** ✅ FIXED

**Problem:** Scroll up zoomed in (counter-intuitive)A complete redesign ensuring consistent, professional navigation across all pages.



**Solution:** Inverted scroll direction## The Problem

```javascript

// Scroll down (positive delta) = Zoom IN**Initial Issue:**

if (delta > 0) { map.setZoom(currentZoom + 1); }- Homepage navigation looked different from other pages

// Scroll up (negative delta) = Zoom OUT- Each page (attractions, events, map) had duplicate `.top-nav` CSS

else if (delta < 0) { map.setZoom(currentZoom - 1); }- Logo spacing was inconsistent

```- No functional search bar



#### 4. **Slow Location Transitions** ✅ FIXED**Root Cause:**

**Problem:** ```

- Map took 1.5s to fly to locationattractions.css had .top-nav styles (lines 16-60)

- Popup appeared after additional 1.5s delayevents.css had .top-nav styles (lines 16-60)

- Total: 3 seconds wait timemap.css had .top-nav styles (lines 16-60)

↓

**Solution:**These overrode navigation.css from include-nav.js

```javascript```

// Open popup immediately

marker.openPopup();## The Solution



// Fast fly animation (2.5x faster)### 1. Removed Duplicate CSS

map.flyTo(coords, 17, { duration: 0.6 });Deleted old navigation styles from:

```- ✅ `css/attractions.css`

- ✅ `css/events.css`

**Result:** Information appears instantly, map pans smoothly- ✅ `css/map.css`



---**Result:** All pages now use unified `navigation.css`



## 🔧 Technical Reference### 2. Redesigned Layout



### Required Files for Each Page**New Structure:**

```

**Every HTML page needs:**┌─────────────────────────────────────────────────┐

```html│ [Logo] Liliw Tourism  Home|Attractions|Events|Map  🔍 Search...  ☰ │

<!-- In <head> -->└─────────────────────────────────────────────────┘

<link rel="stylesheet" href="css/navigation.css">  ↑ Far Left           ↑ Center           ↑ Right

```

<!-- Before </body> -->

<script src="js/include-nav.js"></script>**CSS Implementation:**

<script src="js/navigation.js"></script>```css

.nav-container {

<!-- Page-specific CSS/JS -->    display: flex;

<link rel="stylesheet" href="css/[page-name].css">    justify-content: space-between;

<script src="js/[page-name].js"></script>    gap: 40px;

```}



**For pages with maps:**.logo {

```html    flex-shrink: 0;  /* Stay on left */

<!-- Leaflet CSS in <head> -->}

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

.main-nav {

<!-- Leaflet JS before map.js -->    justify-content: center;  /* Center links */

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>}

<script src="js/map.js"></script>

```.nav-actions {

    flex-shrink: 0;  /* Stay on right */

### Active Page Detection}

```

**Set data-page attribute:**

```html### 3. Added Search Bar

<body data-page="homepage">

```**Replaced:** Icon button  

**With:** Full search input field

**Matches navigation link:**

```html**Features:**

<a href="homepage.html" data-page="homepage">Home</a>- 200px width (desktop)

```- 150px width (mobile)

- Gray background (#f3f4f6)

**Auto-highlights active page with blue background**- Blue focus state (#3b82f6)

- Smooth transitions

### Map Configuration- Icon + input combo



**Homepage Map:****HTML:**

```javascript```html

const map = L.map('map', {<div class="search-bar">

    scrollWheelZoom: false,    <svg><!-- Search icon --></svg>

    doubleClickZoom: true,    <input type="text" placeholder="Search..." id="headerSearchInput">

    touchZoom: true</div>

}).setView([14.1333, 121.4333], 14);```

```

**CSS:**

**Interactive Map:**```css

```javascript.search-bar {

const map = L.map('map-canvas', {    display: flex;

    scrollWheelZoom: false,    background-color: #f3f4f6;

    doubleClickZoom: true,    border-radius: 24px;

    touchZoom: true    padding: 8px 16px;

}).setView([14.1333, 121.4333], 15);}

```

.search-bar:focus-within {

### Color Scheme    background-color: #ffffff;

    border-color: #3b82f6;

**Primary Colors:**    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);

- `#3b82f6` - Primary blue (buttons, active states)}

- `#4299e1` - Light blue (accents)```

- `#1a365d` - Dark blue (backgrounds)

### 4. Fixed Logo Position

**Map Marker Colors:**

- `#dc2626` - Red (heritage sites)**Issue:** Logo was centered (max-width: 1400px + margin: auto)

- `#16a34a` - Green (natural attractions)

- `#2563eb` - Blue (landmarks)**Fix:**

```css

### Animation Timing.nav-container {

    max-width: 100%;      /* Full width */

- Page transitions: 0.3s - 0.4s    margin: 0;            /* No centering */

- Navigation dropdown: 0.4s    padding: 12px 20px;   /* Edge spacing */

- Hover effects: 0.3s}

- Map fly animation: 0.6s```

- Zoom throttle: 100ms

- Hover delay (dropdown): 500ms**Result:** Logo now aligns with browser's back button



---## Navigation Components



## 📝 Maintenance### Logo Section

```html

### Adding New Attractions to Map<div class="logo">

    <a href="index.html">

**1. Update attraction array in js/homepage.js and js/map.js:**        <img src="images/liliw-logo.png" class="logo-img">

```javascript        <span class="logo-text">Liliw Tourism</span>

{    </a>

    id: 'your-attraction',</div>

    name: 'Attraction Name',```

    coords: [latitude, longitude],  // Get from Google Maps

    type: 'heritage', // or 'nature' or 'landmark'**Styling:**

    description: 'Short description',- Logo: 45×45px, 8px border-radius

    link: 'attraction-page.html',- Text: 19px, bold, dark gray

    icon: '📍'  // Choose appropriate emoji- Gap: 12px between image and text

}

```### Navigation Links

```html

**2. Add location card to interactive-map.html:**<nav class="main-nav">

```html    <a href="homepage.html" data-page="homepage">Home</a>

<div class="location-card" data-location="your-attraction">    <a href="attractions.html" data-page="attractions">Attractions</a>

    <img src="images/your-image.jpg" alt="Attraction">    <a href="events.html" data-page="events">Events</a>

    <div class="location-info">    <a href="interactive-map.html" data-page="map">Map</a>

        <h3>Attraction Name</h3></nav>

        <p>Description</p>```

        <span class="distance">📍 Location</span>

    </div>**Styling:**

</div>- Font: 16px, medium weight

```- Padding: 10px 24px

- Border-radius: 8px

### Adding New Pages- Active: Blue (#3b82f6) with shadow



**1. Create HTML file**### Search Bar

```html```html

<!DOCTYPE html><div class="nav-actions">

<html lang="en">    <div class="search-bar">

<head>        <svg>...</svg>

    <meta charset="UTF-8">        <input type="text" placeholder="Search..." id="headerSearchInput">

    <title>Page Name - Liliw</title>    </div>

    <link rel="stylesheet" href="css/navigation.css">    <button class="menu-toggle">

    <link rel="stylesheet" href="css/your-page.css">        <span></span>

</head>        <span></span>

<body data-page="your-page">        <span></span>

    <!-- Content -->    </button>

    </div>

    <script src="js/include-nav.js"></script>```

    <script src="js/navigation.js"></script>

    <script src="js/your-page.js"></script>**Functionality:**

</body>- Type to search (future: live results)

</html>- Enter to submit search

```- Icon provides visual cue



**2. Add to navigation in js/include-nav.js:**## Active Page Detection

```javascript

// Desktop navThe system automatically highlights the current page:

<a href="your-page.html" data-page="your-page">Your Page</a>

```html

// Mobile nav<!-- In homepage.html -->

<a href="your-page.html">Your Page</a><body data-page="homepage">

```

<!-- Navigation.js reads this and adds .active class -->

### Image Requirements```



**Format:** JPG for photos, PNG for logos  **CSS Selector:**

**Resolution:** Minimum 1200px width for hero images  ```css

**Optimization:** Compress for web (use TinyPNG)  body[data-page="homepage"] .main-nav a[data-page="homepage"],

**Naming:** lowercase with hyphens (e.g., `liliw-church.jpg`)body[data-page="attractions"] .main-nav a[data-page="attractions"],

body[data-page="events"] .main-nav a[data-page="events"],

### Testing Checklistbody[data-page="map"] .main-nav a[data-page="map"] {

    background-color: #3b82f6;

Before deploying changes:    color: #ffffff;

- [ ] All pages load without errors    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);

- [ ] Navigation works on all pages}

- [ ] Active page highlights correctly```

- [ ] Search bar appears properly

- [ ] Maps load and are interactive## Mobile Navigation

- [ ] All images display

- [ ] Mobile menu works### Responsive Breakpoint: 768px

- [ ] Animations are smooth

- [ ] No console errors**Desktop (> 768px):**

- [ ] Test on mobile device- All nav links visible horizontally

- Search bar: 200px

### Git Workflow- Hamburger menu hidden



```powershell**Mobile (≤ 768px):**

# Check status- Nav links hidden

git status- Search bar: 150px

- Hamburger menu visible

# Stage changes- Tap menu → Slide-in overlay

git add .

### Mobile Menu Structure

# Commit with message```html

git commit -m "Description of changes"<div class="mobile-menu-overlay" id="mobileMenuOverlay">

    <div class="mobile-menu">

# Push to GitHub        <button class="close-menu">&times;</button>

git push origin main        <nav class="mobile-nav">

```            <a href="homepage.html">Home</a>

            <a href="attractions.html">Attractions</a>

---            <a href="events.html">Events</a>

            <a href="interactive-map.html">Map</a>

## 🎯 Quick Reference        </nav>

    </div>

### Common Tasks</div>

```

**Start Development Server:**

```powershell**Animation:**

python -m http.server 8000- Overlay fades in (0.3s)

```- Menu slides from right (0.3s)

- Backdrop click closes menu

**Hard Refresh Browser:**

```## Integration Guide

Ctrl + F5

```### Adding Navigation to New Pages



**Open DevTools:****Step 1:** Add data-page attribute

``````html

F12 or Ctrl + Shift + I<body data-page="your-page-name">

``````



**Check Console for Errors:****Step 2:** Include navigation script

``````html

F12 → Console tab<script src="js/include-nav.js"></script>

``````



### File Locations**Step 3:** Update navigation links (if needed)

Edit `js/include-nav.js`:

- **Navigation HTML**: Generated by `js/include-nav.js````javascript

- **Navigation Styles**: `css/navigation.css`<nav class="main-nav">

- **Map Configuration**: `js/map.js` and `js/homepage.js`    <!-- Add your new page link here -->

- **Animation Engine**: `js/animations.js`    <a href="your-page.html" data-page="your-page-name">Your Page</a>

- **Page-Specific JS**: `js/[page-name].js`</nav>

```

### Key Features Summary

**Step 4:** Add to mobile menu

✅ Responsive navigation with mobile menu  ```javascript

✅ Dropdown submenu for Attractions  <nav class="mobile-nav">

✅ Scroll-triggered hero blur effect      <!-- Add mobile link -->

✅ Interactive maps with Leaflet.js      <a href="your-page.html">Your Page</a>

✅ Custom map controls (Ctrl+Scroll, Shift+Hover)  </nav>

✅ Fast location transitions (0.6s)  ```

✅ Instant popup display  

✅ Browser history back buttons  That's it! Navigation auto-loads with animations.

✅ Smooth page transitions  

✅ Active page highlighting  ---



---## 📱 Mobile Menu Animations



## 📞 Support### Complete Animation System



### TroubleshootingThe mobile menu features a sophisticated multi-layer animation system that creates a smooth, professional user experience.



**Navigation not showing:**### Animation Sequence

- Check if `include-nav.js` is loaded

- Verify script is after body content**Opening (Click Hamburger ☰):**

- Check browser console for errors

```

**Map not loading:**0.0s → Overlay fades in (transparent → black 80%)

- Verify internet connection (needs CDN access)0.0s → Menu panel slides in from right edge

- Check Leaflet CSS/JS links0.2s → Close button (X) fades in and rotates 90°

- Ensure `#map` or `#map-canvas` div exists0.1s → First link slides in

0.15s → Second link slides in

**Images not displaying:**0.2s → Third link slides in

- Check file paths (case-sensitive)0.25s → Fourth link slides in

- Verify images are in `images/` folder0.3s → Fifth link slides in

- Hard refresh (Ctrl+F5)0.35s → Sixth link slides in

```

**Animations not working:**

- Check if animations.css is loaded**Total Opening Time:** ~0.4 seconds

- Verify animations.js is loaded

- Check user's motion preferences### CSS Implementation



### Resources**Overlay Background:**

```css

- **Leaflet.js Documentation**: https://leafletjs.com/reference.html.mobile-menu-overlay {

- **OpenStreetMap**: https://www.openstreetmap.org    background-color: rgba(0, 0, 0, 0);

- **MDN Web Docs**: https://developer.mozilla.org    visibility: hidden;

- **Repository**: https://github.com/HotokeZ/Liliw-Tourism-Website    opacity: 0;

    transition: background-color 0.3s ease, 

---                visibility 0s linear 0.3s, 

                opacity 0.3s ease;

**Version:** 3.0  }

**Last Updated:** October 19, 2025  

**Status:** Production Ready ✨.mobile-menu-overlay.active {

    visibility: visible;

*Built for the Municipality of Liliw, Laguna*    opacity: 1;

    background-color: rgba(0, 0, 0, 0.8);
    transition: background-color 0.3s ease, 
                visibility 0s linear, 
                opacity 0.3s ease;
}
```

**Menu Panel Slide:**
```css
.mobile-menu {
    transform: translateX(100%);  /* Off-screen right */
    transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
}

.mobile-menu-overlay.active .mobile-menu {
    transform: translateX(0);  /* Slide to position */
}
```

**Close Button Animation:**
```css
.close-menu {
    opacity: 0;
    transform: rotate(0deg) scale(0.8);
    transition: transform 0.2s ease, color 0.2s ease;
}

.mobile-menu-overlay.active .close-menu {
    opacity: 1;
    transform: rotate(90deg) scale(1);
    transition: opacity 0.3s ease 0.2s, 
                transform 0.3s ease 0.2s;
}

.close-menu:hover {
    color: #4299e1;
    transform: rotate(90deg) scale(1.1);
}
```

**Staggered Link Animation:**
```css
.mobile-nav a {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.3s ease;
}

.mobile-menu-overlay.active .mobile-nav a {
    opacity: 1;
    transform: translateX(0);
}

/* Individual delays for cascade effect */
.mobile-menu-overlay.active .mobile-nav a:nth-child(1) {
    transition-delay: 0.1s;
}
.mobile-menu-overlay.active .mobile-nav a:nth-child(2) {
    transition-delay: 0.15s;
}
.mobile-menu-overlay.active .mobile-nav a:nth-child(3) {
    transition-delay: 0.2s;
}
/* ... continues for all links */
```

### Animation Features

**1. Overlay Fade**
- Duration: 0.3s
- Easing: ease
- Effect: Background darkens smoothly
- Uses `visibility` + `opacity` for proper transition support

**2. Menu Panel Slide**
- Duration: 0.4s
- Easing: cubic-bezier(0.4, 0.0, 0.2, 1) - Material Design deceleration
- Effect: Slides from right with smooth deceleration
- Shadow: Adds depth with left-side shadow

**3. Close Button**
- Duration: 0.3s
- Delay: 0.2s (appears after menu starts sliding)
- Effect: Fades in while rotating 90° and scaling up
- Hover: Scales to 1.1× and turns blue

**4. Navigation Links**
- Duration: 0.3s each
- Delay: Staggered 50ms apart
- Effect: Fade + slide from right (30px → 0)
- Creates: Cascading waterfall effect

### JavaScript Control

**Opening Menu:**
```javascript
menuToggle.addEventListener('click', function() {
    mobileMenuOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
});
```

**Closing Menu:**
```javascript
function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
}
```

**Key Features:**
- Uses CSS classes for animation (hardware-accelerated)
- Prevents body scroll when menu is open
- Closes on overlay click, X button, or Escape key
- Smooth reverse animation on close

### Performance Optimization

**GPU-Accelerated Properties:**
- `transform` - For slide animations
- `opacity` - For fade effects
- `visibility` - For display management

**Avoided Properties:**
- No `width`, `height`, or `left` animations (CPU-intensive)
- No `display` toggling during transition (breaks animations)

### Browser Compatibility

**Technique Used:**
```css
/* visibility + opacity instead of display */
visibility: hidden;  /* Removes from accessibility tree */
opacity: 0;          /* Makes transparent */
transition: visibility 0s linear 0.3s;  /* Delayed hide */
```

**Why This Works:**
- `display: none` → `display: flex` doesn't animate
- `visibility: hidden` → `visible` can transition
- Delayed visibility ensures smooth fade out

### Testing Checklist

- [ ] Overlay fades in smoothly (no pop)
- [ ] Menu slides from right edge (not instant)
- [ ] Close button spins and fades in
- [ ] Links cascade one by one
- [ ] Hamburger animates to X
- [ ] Close animation is smooth reverse
- [ ] No visual glitches or jumps
- [ ] Works on mobile devices
- [ ] Touch-friendly (44px+ tap targets)

### Customization Options

**Faster Animation:**
```css
.mobile-menu {
    transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

**Slower (More Dramatic):**
```css
.mobile-menu {
    transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

**Bounce Effect:**
```css
.mobile-menu {
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

**Different Direction (From Left):**
```css
.mobile-menu {
    left: 0;
    right: auto;
    transform: translateX(-100%);
    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.2);
}
```

### Accessibility

**Respects User Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
    .mobile-menu-overlay,
    .mobile-menu,
    .close-menu,
    .mobile-nav a {
        transition-duration: 0.01ms !important;
    }
}
```

**Keyboard Navigation:**
- Escape key closes menu
- Focus trap within menu when open
- Tab navigation works correctly

### Files Modified

**CSS:** `css/navigation.css`
- Updated `.mobile-menu-overlay` (visibility + opacity)
- Enhanced `.mobile-menu` (cubic-bezier easing)
- Added `.close-menu` animation
- Staggered `.mobile-nav a` transitions

**JavaScript:** `js/navigation.js`
- Simplified menu toggle (no display manipulation)
- Clean class-based animation control

---

# Part V: Pages Created

## 🏠 Homepage (homepage.html)

**Purpose:** Main landing page after splash screen

**Sections:**
1. **Welcome Section**
   - Large "Welcome to LILIW, LAGUNA" header
   - Liliw logo (circular)
   - Two CTA buttons:
     - "See Attractions" (blue)
     - "Upcoming Event" (purple)

2. **Popular Places**
   - Grid of 3 attraction cards
   - St. John the Baptist Church
   - Gat Tayaw Tsinelas Monument
   - Local Attraction placeholder

3. **Events**
   - Featured: Tsinelas Festival
   - Large banner with golden text

4. **Plan Your Visit**
   - Nature scene background
   - Call-to-action button

5. **About Section**
   - Footer with logo
   - Social icons
   - Copyright info

**Color Scheme:** Dark blue gradient (#1a365d → #2c5282)

**Key Files:**
- HTML: `homepage.html`
- CSS: `css/homepage.css`
- JS: `js/homepage.js`

---

## 🏛️ Attractions (attractions.html)

**Purpose:** Main attractions overview with categories

**Layout:**
- Navigation header
- Page title: "What's Popular?"
- Two large category cards:
  1. **Natural Attractions** → links to natural-attractions.html
  2. **Heritage Attractions** → links to heritage-attractions.html
- Footer

**Features:**
- Hover effects on cards
- Large imagery
- Clear category distinction
- Click entire card to navigate

**Color Scheme:** Dark blue gradient (#1a2d5a → #2a4080)

**Key Files:**
- HTML: `attractions.html`
- CSS: `css/attractions.css`
- JS: `js/attractions.js`

---

## 🌊 Natural Attractions (natural-attractions.html)

**Purpose:** Showcase natural attractions (waterfalls, mountains, etc.)

**Featured Attraction:** Kilangin Falls

**Sections:**
1. **Hero Card**
   - Large falls image
   - Title: "A JOURNEY TO DISCOVERING KILANGIN FALLS"
   - "Learn More" button

2. **Description**
   - Detailed information about the falls
   - Visitor information

3. **Related Attractions Grid**
   - Mt. Kalisungan
   - Buruwisan Falls
   - Rice Terraces
   - Each with thumbnail + description

**Color Scheme:** Light blue gradient (#63b3ed → #a0d8ef)

**Key Files:**
- HTML: `natural-attractions.html`
- CSS: `css/attraction-detail.css`
- JS: `js/attraction-detail.js`

---

## 🏰 Heritage Attractions (heritage-attractions.html)

**Purpose:** Showcase historical and cultural sites

**Featured Attraction:** St. John the Baptist Church

**Sections:**
1. **Hero Card**
   - Church tower image
   - Historical site information
   - "Learn More" button

2. **Description**
   - Church history
   - Architectural details
   - Cultural significance

3. **Related Heritage Sites**
   - Gat Tayaw Monument
   - Old Spanish Houses
   - Town Plaza
   - Each with thumbnail + info

**Color Scheme:** Light blue/cyan gradient (matching natural)

**Key Files:**
- HTML: `heritage-attractions.html`
- CSS: `css/attraction-detail.css`
- JS: `js/attraction-detail.js`

---

## 🗺️ Interactive Map (interactive-map.html)

**Purpose:** Show locations of attractions with interactive elements

**Features:**

1. **Map Canvas**
   - Static map image (placeholder for Google Maps)
   - Clickable location pins (📍)
   - Hover tooltips showing place names
   - Pan/drag functionality (future)

2. **Map Controls**
   - Zoom In button (+)
   - Zoom Out button (−)
   - Locate Me button (📍)

3. **Map Legend**
   - Heritage Sites (📍)
   - Natural Attractions (📍)
   - Food & Dining (📍)
   - Shopping (📍)

4. **Location Cards**
   - St. John the Baptist Church (0.5km)
   - Kilangin Falls (3.2km)
   - Gat Tayaw Monument (0.3km)
   - Click card → Focus map on location

**Color Scheme:** Teal gradient (#a8dadc → #457b9d)

**Interactive Elements:**
```javascript
// Click marker
<div class="map-marker" data-location="Church">
    <div class="marker-pin">📍</div>
    <div class="marker-tooltip">St. John the Baptist Church</div>
</div>

// Click location card
<div class="location-card" onclick="focusLocation('church')">
```

**Key Files:**
- HTML: `interactive-map.html`
- CSS: `css/map.css`
- JS: `js/map.js`

**Future Enhancements:**
- Integrate Google Maps API
- Real-time location tracking
- Directions from current location
- Filter by category

---

## 🎉 Events (events.html)

**Purpose:** Display upcoming events and festivals

**Sections:**

1. **Featured Event Hero**
   - Large banner image
   - Event badge: "FEATURED EVENT"
   - Title: "THE 17TH LILIW GAT TAYAW TSINELAS FESTIVAL"
   - Date: September 24-29, 2025
   - Location: Liliw Town Plaza
   - "View Details" button

2. **Event Description**
   - About the festival
   - What to expect
   - Cultural significance

3. **Other Events Grid**
   - **Feast of St. John the Baptist** (Religious, June 24)
   - **Weekly Town Market** (Market, Every Sunday)
   - **Heritage Month Celebration** (Cultural, May 2025)

4. **Calendar Teaser**
   - "Full Event Calendar" heading
   - "View Full Calendar" button

**Features:**
- Event cards with badges (Religious, Market, Cultural)
- Date and description for each event
- Hover effects
- Click to view details

**Color Scheme:** Purple gradient (#805ad5 → #553c9a)

**Key Files:**
- HTML: `events.html`
- CSS: `css/events.css`
- JS: `js/events.js`

---

# Part VI: Technical Reference

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox, Grid, Animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **SVG** - Icons and graphics

### Development Tools
- **VS Code** - Code editor
- **Python HTTP Server** - Local development
- **Git** - Version control
- **GitHub** - Repository hosting

## 📐 Design System

### Colors

**Primary Blues:**
- `#3b82f6` - Primary blue (buttons, active states)
- `#4299e1` - Light blue (accents)
- `#1a365d` - Dark blue (backgrounds)
- `#2c5282` - Medium blue (gradients)

**Grays:**
- `#1f2937` - Dark gray (text)
- `#4b5563` - Medium gray (secondary text)
- `#6b7280` - Light gray (icons)
- `#9ca3af` - Very light gray (placeholders)
- `#f3f4f6` - Background gray
- `#e5e7eb` - Border gray

**Accent Colors:**
- `#805ad5` - Purple (events)
- `#ffd700` - Gold (festival text)
- `#63b3ed` - Cyan (attractions)

### Typography

**Font Family:**
```css
font-family: 'Poppins', sans-serif;
```

**Font Weights:**
- 300 - Light
- 400 - Regular
- 500 - Medium
- 600 - Semi-bold
- 700 - Bold

**Font Sizes:**
- Headings: 42px, 32px, 24px, 19px
- Body: 16px
- Small: 14px
- Button: 16px

### Spacing System

**Base Unit:** 4px

**Scale:**
- 4px (1×)
- 8px (2×)
- 12px (3×)
- 16px (4×)
- 20px (5×)
- 24px (6×)
- 30px (7.5×)
- 40px (10×)

**Container Padding:**
- Desktop: 40px
- Tablet: 30px
- Mobile: 20px

### Border Radius

- Small: 6px (buttons, small cards)
- Medium: 8px (nav links, inputs)
- Large: 12px (cards, sections)
- Round: 24px (search bar)
- Circle: 50% (avatars, logos)

### Shadows

**Levels:**

1. **Subtle** (navigation, cards at rest)
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
```

2. **Medium** (cards on hover)
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
```

3. **Heavy** (modals, dropdowns)
```css
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
```

4. **Glow** (active buttons)
```css
box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
```

## 🔧 Component Library

### Buttons

**Primary Button:**
```html
<button class="cta-button see-attractions">See Attractions</button>
```
```css
.cta-button {
    padding: 15px 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    transition: all 0.3s ease;
}
```

**Secondary Button:**
```html
<button class="event-details-btn">View Details</button>
```

### Cards

**Basic Card:**
```html
<div class="place-card">
    <img src="image.jpg" alt="Place">
    <p>Place Name</p>
</div>
```

**Large Card (Clickable):**
```html
<div class="attraction-card large-card" onclick="navigate()">
    <img src="image.jpg" alt="Attraction">
    <div class="card-overlay">
        <p class="card-label">Explore Nature</p>
    </div>
</div>
```

### Navigation

**Include Navigation:**
```html
<body data-page="homepage">
    <!-- Content -->
    <script src="js/include-nav.js"></script>
</body>
```

**Custom Navigation Link:**
```html
<a href="page.html" data-page="page-name" class="active">Page</a>
```

### Forms

**Search Input:**
```html
<div class="search-bar">
    <svg><!-- Icon --></svg>
    <input type="text" placeholder="Search...">
</div>
```

**Text Input:**
```html
<input type="text" class="search-input" placeholder="Search...">
```

## 🎨 CSS Architecture

### File Organization

**Global Styles:**
- `style.css` - Base styles, reset, splash screen

**Page-Specific:**
- `homepage.css` - Homepage only
- `attractions.css` - Attractions page only
- `events.css` - Events page only
- `map.css` - Map page only
- `attraction-detail.css` - Detail pages

**Shared Components:**
- `navigation.css` - Navigation system
- `animations.css` - Animation system

### CSS Methodology

**BEM-Inspired Naming:**
```css
/* Block */
.card { }

/* Element */
.card-title { }
.card-image { }

/* Modifier */
.card--large { }
.card--featured { }
```

**State Classes:**
```css
.active { }
.hidden { }
.visible { }
.loading { }
```

### Responsive Design

**Breakpoints:**
```css
/* Mobile First */
@media (min-width: 480px) { /* Small phones */ }
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 1024px) { /* Small desktops */ }
@media (min-width: 1280px) { /* Large desktops */ }
```

**Mobile Overrides:**
```css
@media (max-width: 768px) {
    .main-nav { display: none; }
    .menu-toggle { display: flex; }
}
```

## 🎭 JavaScript Guide

### File Structure

**Global:**
- `script.js` - Splash screen logic

**Page-Specific:**
- `homepage.js` - Homepage interactions
- `attractions.js` - Attractions logic
- `events.js` - Events functionality
- `map.js` - Map interactions

**System:**
- `include-nav.js` - Navigation injection
- `navigation.js` - Navigation functionality
- `animations.js` - Animation engine

### Common Patterns

**Page Navigation:**
```javascript
function navigateToPage(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}
```

**Scroll Detection:**
```javascript
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    }
});
```

**Active Page Detection:**
```javascript
const currentPage = document.body.getAttribute('data-page');
document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
    }
});
```

## 🐛 Debugging Guide

### Common Issues

**1. Navigation Not Showing**

**Problem:** Navigation doesn't appear on page

**Check:**
- Is `<script src="js/include-nav.js"></script>` present?
- Is script loaded AFTER body content?
- Check browser console for errors

**Solution:**
```html
<!-- Add before closing </body> tag -->
<script src="js/include-nav.js"></script>
```

**2. Active Page Not Highlighted**

**Problem:** Current page not blue in navigation

**Check:**
- Does `<body>` have `data-page` attribute?
- Does it match navigation link's `data-page`?
- Is navigation.js loaded?

**Solution:**
```html
<body data-page="homepage">
<!-- Make sure matches: -->
<a href="homepage.html" data-page="homepage">Home</a>
```

**3. Animations Not Working**

**Problem:** No fade/slide effects

**Check:**
- Is animations.css loaded?
- Is animations.js loaded?
- Check `prefers-reduced-motion` setting

**Solution:**
Open browser DevTools → Network tab → Verify files loaded

**4. Images Not Loading**

**Problem:** Broken image icons

**Check:**
- Are images in `images/` folder?
- Exact filename match (case-sensitive)?
- Correct file extension?

**Solution:**
```
images/liliw-logo.png  ✅
images/Liliw-Logo.PNG  ❌ (wrong case)
```

**5. Search Bar Not Styled**

**Problem:** Search bar looks plain

**Check:**
- Is navigation.css loaded?
- Hard refresh (Ctrl+F5)?
- Check CSS cascade

**Solution:**
```powershell
# Clear cache
Ctrl+F5

# Or use incognito mode
Ctrl+Shift+N
```

### Browser Developer Tools

**Open DevTools:**
- Chrome/Edge: `F12` or `Ctrl+Shift+I`
- Firefox: `F12` or `Ctrl+Shift+I`
- Safari: `Cmd+Option+I`

**Useful Panels:**
- **Console** - See JavaScript errors
- **Network** - Check file loading
- **Elements** - Inspect HTML/CSS
- **Sources** - Debug JavaScript

**Console Commands:**
```javascript
// Check if navigation loaded
document.getElementById('mainNavigation')

// Check current page
document.body.getAttribute('data-page')

// List loaded stylesheets
Array.from(document.styleSheets).map(s => s.href)
```

## 🚀 Deployment Guide

### Preparing for Production

**1. Optimize Images**
```bash
# Use tools like:
- TinyPNG (tinypng.com)
- ImageOptim (imageoptim.com)
- Squoosh (squoosh.app)
```

**2. Minify CSS/JS**
```bash
# Use online tools or:
npm install -g csso-cli uglify-js

csso css/style.css --output css/style.min.css
uglifyjs js/script.js --compress --mangle -o js/script.min.js
```

**3. Test All Pages**
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Images appear properly
- [ ] Animations smooth
- [ ] Mobile responsive
- [ ] Search bar functional
- [ ] No console errors

### Hosting Options

**1. GitHub Pages (Free)**
```bash
# In repository settings, enable GitHub Pages
# Your site: https://username.github.io/Liliw-Tourism-Website
```

**2. Netlify (Free)**
```bash
# Drag and drop your folder to netlify.com
# Automatic deployment
```

**3. Traditional Web Hosting**
```
Upload via FTP:
- All HTML files
- css/ folder
- js/ folder
- images/ folder
- assets/ folder
```

## 📝 Maintenance Checklist

### Monthly Tasks
- [ ] Check all links (no 404s)
- [ ] Update event dates
- [ ] Add new attractions if needed
- [ ] Review analytics (if implemented)
- [ ] Test on latest browsers

### Quarterly Tasks
- [ ] Refresh images (seasonal photos)
- [ ] Update festival information
- [ ] Review and update content
- [ ] Check mobile responsiveness
- [ ] Performance audit

### Annual Tasks
- [ ] Complete content review
- [ ] Update copyright year
- [ ] Security updates (if using backend)
- [ ] Redesign evaluation

## 🎓 Learning Resources

### HTML/CSS
- MDN Web Docs: developer.mozilla.org
- CSS-Tricks: css-tricks.com
- W3Schools: w3schools.com

### JavaScript
- JavaScript.info: javascript.info
- MDN JavaScript Guide: developer.mozilla.org/JavaScript
- Eloquent JavaScript: eloquentjavascript.net

### Design
- Dribbble: dribbble.com (inspiration)
- Behance: behance.net (case studies)
- Awwwards: awwwards.com (best websites)

---

## 🎉 Conclusion

This comprehensive guide covers everything built for the Liliw Tourism Website. From initial setup to advanced animations, from consistent navigation to interactive maps - every component is documented for future reference and maintenance.

**Key Achievements:**
- ✅ Modern, responsive design
- ✅ Consistent navigation system
- ✅ Smooth animations throughout
- ✅ Multiple functional pages
- ✅ Mobile-optimized
- ✅ Professional code structure
- ✅ Complete documentation

**For Questions or Support:**
- Review this guide
- Check browser DevTools
- Test in incognito mode
- Verify file paths and names

---

**Last Updated:** October 19, 2025  
**Version:** 2.0  
**Project:** Liliw Tourism Website  
**Status:** Production Ready ✨

---

*Built with ❤️ for the Municipality of Liliw, Laguna*
