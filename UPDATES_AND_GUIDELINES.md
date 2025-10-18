# 📖 Liliw Tourism Website - Complete Updates & Guidelines

**A Comprehensive Guide to Everything Built, Fixed, and Configured**

---

## 📚 Table of Contents

- [Part I: Project Overview](#part-i-project-overview)
- [Part II: Getting Started](#part-ii-getting-started)
- [Part III: Animation System](#part-iii-animation-system)
- [Part IV: Navigation Redesign](#part-iv-navigation-redesign)
- [Part V: Pages Created](#part-v-pages-created)
- [Part VI: Technical Reference](#part-vi-technical-reference)

---

# Part I: Project Overview

## 🌟 About This Project

The **Liliw Tourism Website** is a modern, responsive web application showcasing Liliw, Laguna - The Footwear Capital of Laguna. Built with HTML5, CSS3, and vanilla JavaScript, it features stunning animations, interactive elements, and a comprehensive navigation system.

## ✨ Key Features

### Design & User Experience
- ✅ **Fully Responsive** - Adapts seamlessly to desktop, tablet, and mobile
- ✅ **Modern UI/UX** - Clean design with professional animations
- ✅ **Smooth Page Transitions** - Fade in/out effects between pages
- ✅ **Interactive Elements** - Hover effects, click animations, scroll triggers
- ✅ **Consistent Navigation** - Unified header across all pages
- ✅ **Search Functionality** - Integrated search bar in navigation
- ✅ **Mobile Menu** - Hamburger menu for smaller screens

### Content Sections
- 🏠 **Homepage** - Welcome section with CTA buttons
- 🏛️ **Attractions** - Natural and heritage sites
- 🎉 **Events** - Tsinelas Festival and local celebrations
- 🗺️ **Interactive Map** - Location finder with clickable pins
- 📱 **Mobile Optimized** - Touch-friendly interface

## 📁 Project Structure

```
Liliw Tourism/
├── index.html                    # Splash screen entry point
├── homepage.html                 # Main landing page
├── attractions.html              # Attractions overview
├── natural-attractions.html      # Natural sites detail page
├── heritage-attractions.html     # Heritage sites detail page
├── interactive-map.html          # Interactive map view
├── events.html                   # Events and festivals
├── animation-preview.html        # Animation testing page
├── welcome.html                  # Getting started page
├── IMAGE_CHECKLIST.html          # Image requirements guide
│
├── css/
│   ├── style.css                 # Splash screen styles
│   ├── homepage.css              # Homepage-specific styles
│   ├── attractions.css           # Attractions page styles
│   ├── events.css                # Events page styles
│   ├── map.css                   # Interactive map styles
│   ├── navigation.css            # Shared navigation styles
│   ├── animations.css            # Animation system styles
│   └── attraction-detail.css     # Detail page styles
│
├── js/
│   ├── script.js                 # Main JavaScript
│   ├── homepage.js               # Homepage interactions
│   ├── attractions.js            # Attractions page logic
│   ├── events.js                 # Events page logic
│   ├── map.js                    # Map interactions
│   ├── include-nav.js            # Navigation injection system
│   ├── navigation.js             # Navigation functionality
│   ├── animations.js             # Animation engine
│   └── attraction-detail.js      # Detail page logic
│
├── images/                       # Image assets folder
│   ├── liliw-logo.png
│   ├── liliw-church.jpg
│   ├── kilangin-falls.jpg
│   └── ... (other images)
│
├── assets/                       # Additional resources
├── server.py                     # Python development server
└── UPDATES_AND_GUIDELINES.md     # This file!
```

---

# Part II: Getting Started

## 🚀 Quick Start Guide

### Prerequisites
- **Web Browser** - Chrome, Firefox, Safari, or Edge
- **Text Editor** - VS Code (recommended), Sublime Text, or any editor
- **Python** (optional) - For local development server

### Running the Website Locally

#### Method 1: Direct Open (Simplest)
```
1. Navigate to the project folder
2. Double-click index.html
3. Website opens in your default browser
```

**Pros:** No setup required  
**Cons:** Some features may not work (CORS restrictions)

#### Method 2: Python HTTP Server (Recommended)
```powershell
# Navigate to project directory
cd "c:\Users\justz\OneDrive\Desktop\Code\Liliw Tourism"

# Start server (Python 3)
python -m http.server 8000

# Open browser to:
http://localhost:8000
```

**Pros:** Full functionality, no CORS issues  
**Cons:** Requires Python installed

#### Method 3: VS Code Live Server
```
1. Install "Live Server" extension in VS Code
2. Right-click index.html
3. Select "Open with Live Server"
```

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

**Access Website:**
```
http://localhost:8000
```

## 📸 Image Setup

Your website needs 9 key images in the `images/` folder:

### Required Images

1. **liliw-logo.png** - Main logo (circular, 60x60px+)
2. **liliw-church.jpg** - St. John the Baptist Church hero image
3. **liliw-church-card.jpg** - Church thumbnail for cards
4. **kilangin-falls.jpg** - Waterfall main image
5. **gat-tayaw-tsinelas.jpg** - Gat Tayaw monument
6. **tsinelas-festival.jpg** - Festival promotional image
7. **other-attraction.jpg** - Generic attraction placeholder
8. **nature-scene.jpg** - Scenic Liliw landscape
9. **liliw-logo-small.png** - Footer logo (30x30px+)

### Image Guidelines

**Format:** JPG for photos, PNG for logos  
**Resolution:** Minimum 1200px width for hero images  
**Optimization:** Compress images for web (TinyPNG, ImageOptim)  
**Naming:** Use lowercase, hyphens instead of spaces  

**Example:**
```
❌ Liliw Church Photo.JPG
✅ liliw-church.jpg
```

### Adding Your Images

```
1. Save images to images/ folder
2. Ensure exact filename matches (case-sensitive)
3. Refresh browser (Ctrl+F5 for hard refresh)
```

**Pro Tip:** Open `IMAGE_CHECKLIST.html` to see visual guide!

---

# Part III: Animation System

## 🎨 Animation Architecture

The website features a sophisticated animation system that brings the entire experience to life with smooth, professional transitions.

## Core Animation Features

### 1. Page Load Animations

When a page loads, elements animate in sequence:

```
0.0s → Body fades in (opacity 0 → 1)
0.1s → Navigation slides down from top
0.2s → Hero section fades + slides up
0.3s → First content section appears
0.4s → Second content section appears
0.5s → Third content section appears
```

**CSS Classes Used:**
- `.fade-in` - Simple fade effect
- `.fade-in-up` - Fade + slide up combo
- `.slide-down` - Slide down from top
- `.scale-in` - Zoom in effect
- `.stagger-*` - Delayed animations

### 2. Navigation Active Indicator

**The Star Feature!** A blue animated bar that slides smoothly under the active page:

```
Home  Attractions  Events  Map
━━━━              ← Bar slides here!
```

**How It Works:**
- Detects current page via `data-page` attribute
- Calculates navigation link position
- Smoothly transitions bar (0.4s cubic-bezier)
- Glowing blue gradient effect

**Implementation:**
```html
<body data-page="homepage">
<!-- Navigation automatically highlights "Home" -->
```

### 3. Page Transitions

Smooth fade out/in when navigating:

```javascript
// Click any link
↓
Page fades out (0.3s)
↓
Navigate to new page
↓
New page fades in (0.4s)
```

### 4. Scroll Animations

Elements animate as you scroll:

- **Hero Parallax** - Background moves slower than content
- **Fade-In On Scroll** - Elements appear when visible
- **Navigation Opacity** - Header becomes more solid on scroll

### 5. Interactive Hover Effects

- **Cards:** Lift up + scale (1.03×)
- **Buttons:** Ripple effect on click
- **Links:** Color transition (0.3s)
- **Images:** Zoom effect on hover

### 6. Special Animations

**Homepage CTA Buttons:**
- "See Attractions" - Blue glow pulse
- "Upcoming Event" - Purple glow pulse
- Both scale on hover with smooth transition

**Event Cards:**
- Hover: Lift + shadow increase
- Image: Subtle zoom
- Text: Color shift

## Animation Files

### css/animations.css
Complete animation styles including:
- Keyframe definitions
- Transition effects
- Hover states
- Scroll-triggered animations

### js/animations.js
Animation engine with:
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
- Keep animation durations under 1 second
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

# Part IV: Navigation Redesign

## 🎯 Navigation System Overview

A complete redesign ensuring consistent, professional navigation across all pages.

## The Problem

**Initial Issue:**
- Homepage navigation looked different from other pages
- Each page (attractions, events, map) had duplicate `.top-nav` CSS
- Logo spacing was inconsistent
- No functional search bar

**Root Cause:**
```
attractions.css had .top-nav styles (lines 16-60)
events.css had .top-nav styles (lines 16-60)
map.css had .top-nav styles (lines 16-60)
↓
These overrode navigation.css from include-nav.js
```

## The Solution

### 1. Removed Duplicate CSS
Deleted old navigation styles from:
- ✅ `css/attractions.css`
- ✅ `css/events.css`
- ✅ `css/map.css`

**Result:** All pages now use unified `navigation.css`

### 2. Redesigned Layout

**New Structure:**
```
┌─────────────────────────────────────────────────┐
│ [Logo] Liliw Tourism  Home|Attractions|Events|Map  🔍 Search...  ☰ │
└─────────────────────────────────────────────────┘
  ↑ Far Left           ↑ Center           ↑ Right
```

**CSS Implementation:**
```css
.nav-container {
    display: flex;
    justify-content: space-between;
    gap: 40px;
}

.logo {
    flex-shrink: 0;  /* Stay on left */
}

.main-nav {
    justify-content: center;  /* Center links */
}

.nav-actions {
    flex-shrink: 0;  /* Stay on right */
}
```

### 3. Added Search Bar

**Replaced:** Icon button  
**With:** Full search input field

**Features:**
- 200px width (desktop)
- 150px width (mobile)
- Gray background (#f3f4f6)
- Blue focus state (#3b82f6)
- Smooth transitions
- Icon + input combo

**HTML:**
```html
<div class="search-bar">
    <svg><!-- Search icon --></svg>
    <input type="text" placeholder="Search..." id="headerSearchInput">
</div>
```

**CSS:**
```css
.search-bar {
    display: flex;
    background-color: #f3f4f6;
    border-radius: 24px;
    padding: 8px 16px;
}

.search-bar:focus-within {
    background-color: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### 4. Fixed Logo Position

**Issue:** Logo was centered (max-width: 1400px + margin: auto)

**Fix:**
```css
.nav-container {
    max-width: 100%;      /* Full width */
    margin: 0;            /* No centering */
    padding: 12px 20px;   /* Edge spacing */
}
```

**Result:** Logo now aligns with browser's back button

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
    <button class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
    </button>
</div>
```

**Functionality:**
- Type to search (future: live results)
- Enter to submit search
- Icon provides visual cue

## Active Page Detection

The system automatically highlights the current page:

```html
<!-- In homepage.html -->
<body data-page="homepage">

<!-- Navigation.js reads this and adds .active class -->
```

**CSS Selector:**
```css
body[data-page="homepage"] .main-nav a[data-page="homepage"],
body[data-page="attractions"] .main-nav a[data-page="attractions"],
body[data-page="events"] .main-nav a[data-page="events"],
body[data-page="map"] .main-nav a[data-page="map"] {
    background-color: #3b82f6;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
}
```

## Mobile Navigation

### Responsive Breakpoint: 768px

**Desktop (> 768px):**
- All nav links visible horizontally
- Search bar: 200px
- Hamburger menu hidden

**Mobile (≤ 768px):**
- Nav links hidden
- Search bar: 150px
- Hamburger menu visible
- Tap menu → Slide-in overlay

### Mobile Menu Structure
```html
<div class="mobile-menu-overlay" id="mobileMenuOverlay">
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

**Animation:**
- Overlay fades in (0.3s)
- Menu slides from right (0.3s)
- Backdrop click closes menu

## Integration Guide

### Adding Navigation to New Pages

**Step 1:** Add data-page attribute
```html
<body data-page="your-page-name">
```

**Step 2:** Include navigation script
```html
<script src="js/include-nav.js"></script>
```

**Step 3:** Update navigation links (if needed)
Edit `js/include-nav.js`:
```javascript
<nav class="main-nav">
    <!-- Add your new page link here -->
    <a href="your-page.html" data-page="your-page-name">Your Page</a>
</nav>
```

**Step 4:** Add to mobile menu
```javascript
<nav class="mobile-nav">
    <!-- Add mobile link -->
    <a href="your-page.html">Your Page</a>
</nav>
```

That's it! Navigation auto-loads with animations.

---

## 📱 Mobile Menu Animations

### Complete Animation System

The mobile menu features a sophisticated multi-layer animation system that creates a smooth, professional user experience.

### Animation Sequence

**Opening (Click Hamburger ☰):**

```
0.0s → Overlay fades in (transparent → black 80%)
0.0s → Menu panel slides in from right edge
0.2s → Close button (X) fades in and rotates 90°
0.1s → First link slides in
0.15s → Second link slides in
0.2s → Third link slides in
0.25s → Fourth link slides in
0.3s → Fifth link slides in
0.35s → Sixth link slides in
```

**Total Opening Time:** ~0.4 seconds

### CSS Implementation

**Overlay Background:**
```css
.mobile-menu-overlay {
    background-color: rgba(0, 0, 0, 0);
    visibility: hidden;
    opacity: 0;
    transition: background-color 0.3s ease, 
                visibility 0s linear 0.3s, 
                opacity 0.3s ease;
}

.mobile-menu-overlay.active {
    visibility: visible;
    opacity: 1;
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
