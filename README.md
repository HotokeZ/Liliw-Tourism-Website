# Liliw, Laguna Tourism Website

A modern, responsive tourism website showcasing Liliw, Laguna - The Footwear Capital of Laguna.

## 🚀 Quick Start

### Running Locally (For Stakeholder Presentation)

**Option 1: Direct Open (Simplest)**
- Just double-click `index.html` to open in your browser

**Option 2: Using Python (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Option 3: Using VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
Liliw Tourism/
├── index.html          # Main HTML file with both panels
├── css/
│   └── style.css      # All styling
├── js/
│   └── script.js      # Interactive features
├── images/            # Place your images here
│   ├── liliw-church.jpg
│   ├── liliw-logo.png
│   ├── liliw-church-card.jpg
│   ├── gat-tayaw-tsinelas.jpg
│   ├── other-attraction.jpg
│   ├── tsinelas-festival.jpg
│   ├── nature-scene.jpg
│   ├── map-preview.jpg
│   └── liliw-logo-small.png
└── assets/            # Other assets (fonts, icons, etc.)
```

## 🖼️ Required Images

Add these images to the `images/` folder:

1. **liliw-church.jpg** - Main church photo for landing page
2. **liliw-logo.png** - Official Liliw logo (circular, 60x60px or larger)
3. **liliw-church-card.jpg** - Church thumbnail for popular places
4. **gat-tayaw-tsinelas.jpg** - Gat Tayaw monument
5. **other-attraction.jpg** - Any local attraction
6. **tsinelas-festival.jpg** - Tsinelas Festival promotional image
7. **nature-scene.jpg** - Nature/landscape photo of Liliw
8. **map-preview.jpg** - Map preview image
9. **liliw-logo-small.png** - Small logo for footer

> **Note**: The website will load without images but show placeholders. Add your actual images for the stakeholder presentation.

## ✨ Features

### Current Features (Static)
- ✅ Two-panel layout (Main + Homepage)
- ✅ Responsive design
- ✅ Smooth animations and transitions
- ✅ Interactive elements (buttons, cards)
- ✅ Parallax effects
- ✅ Scroll animations
- ✅ Mobile responsive

### Sections Included
1. **Main Landing Page** - Hero section with church image
2. **Welcome Section** - Introduction to Liliw
3. **Popular Places** - Showcase of tourist spots
4. **Events** - Tsinelas Festival and other events
5. **Plan Your Visit** - Trip planning resources
6. **Interactive Map** - Location guide
7. **About** - Links and information

## 🎨 Customization

### Colors
Edit in `css/style.css`:
- Main panel: `#4a5568` to `#2d3748`
- Homepage: `#1a365d` to `#2c5282`
- Accents: `#4299e1`, `#ffd700`

### Content
Edit text directly in `index.html`:
- Section titles
- Descriptions
- Links

### Layout
Adjust in `css/style.css`:
- Panel widths: `.main-panel` (45%) and `.homepage-panel` (55%)
- Grid layouts: `.image-grid`, `.about-links`

## 🔧 Future Backend Integration

When you're ready to add backend (Flask/Python):

### Features to Add:
- Contact forms
- Booking system
- User reviews
- Admin panel for content management
- Database for attractions/events
- Search functionality
- Multi-language support

### Setup Flask (When Ready):
```bash
pip install flask
```

Create `app.py`:
```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
```

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 TODO for Production

- [ ] Add actual images
- [ ] Implement contact form backend
- [ ] Add Google Maps integration
- [ ] Create individual pages for attractions
- [ ] Add booking system
- [ ] Implement search functionality
- [ ] Add language switcher (English/Tagalog)
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Add analytics

## 🤝 For Stakeholder Presentation

1. **Before the meeting:**
   - Add all images to `images/` folder
   - Test all sections scroll smoothly
   - Check responsive design on different screen sizes

2. **During the meeting:**
   - Open `index.html` in browser
   - Show main landing page
   - Scroll through homepage sections
   - Click interactive elements
   - Demonstrate responsive design (resize browser)

3. **Gather feedback on:**
   - Color scheme
   - Layout and design
   - Content sections
   - Features to add
   - Priority pages

## 📧 Support

For questions or issues, contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** October 2025  
**Status:** Ready for Stakeholder Review
