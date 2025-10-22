# 📝 Manual Content Editing Guide

## Quick Start
**To edit your website content, simply edit the JSON files in the `data/` folder!**

When you save a JSON file and refresh the website page, your changes will appear immediately.

---

## 📂 Files You Can Edit

| File | What It Controls |
|------|-----------------|
| `data/attractions.json` | Attractions page content |
| `data/events.json` | Events page content |
| `data/experiences.json` | Experiences page content |
| `data/plan-trip.json` | Plan Your Trip page content |
| `data/homepage-content.json` | Homepage content (optional) |

---

## ✏️ How to Edit Content

### **Example: Editing Attractions**

1. Open `data/attractions.json` in VS Code
2. Find the section you want to edit
3. Change the text/images
4. Save the file (Ctrl+S)
5. Refresh the attractions page in your browser
6. Done! 🎉

### **Sample JSON Structure:**

```json
{
  "page": {
    "title": "Attractions",
    "description": "Discover the beauty and heritage of Liliw"
  },
  "sections": [
    {
      "id": "heritage-sites",
      "title": "Heritage Sites",
      "description": "Historical landmarks and cultural treasures",
      "enabled": true,
      "items": [
        {
          "id": "church",
          "title": "St. John the Baptist Church",
          "description": "Historic baroque church built in the 1600s",
          "image": "images/liliw-church-card.jpg",
          "location": "Town Center, Liliw, Laguna",
          "link": "heritage-attractions.html#church",
          "enabled": true
        }
      ]
    }
  ]
}
```

---

## 🎯 Common Editing Tasks

### **✏️ Change a Title**
```json
"title": "St. John the Baptist Church"
```
Just change the text between the quotes!

### **✏️ Change a Description**
```json
"description": "Historic baroque church built in the 1600s"
```
Update to whatever you want!

### **🖼️ Change an Image**
```json
"image": "images/liliw-church-card.jpg"
```
Make sure the image file exists in the `images/` folder!

### **📍 Change a Location**
```json
"location": "Town Center, Liliw, Laguna"
```

### **🔗 Change a Link**
```json
"link": "heritage-attractions.html#church"
```

### **👁️ Show/Hide Content**
```json
"enabled": true   // Shows the item
"enabled": false  // Hides the item
```

---

## ➕ Adding New Content

### **Add a New Attraction:**

1. Copy an existing item block
2. Change the `id` to something unique
3. Update all the fields
4. Make sure to add a comma after the previous item!

```json
{
  "items": [
    {
      "id": "church",
      "title": "St. John the Baptist Church",
      ...
    },  // ← Don't forget the comma!
    {
      "id": "new-attraction",  // ← New item
      "title": "New Attraction Name",
      "description": "Description here",
      "image": "images/new-photo.jpg",
      "location": "Location here",
      "link": "page.html",
      "enabled": true
    }
  ]
}
```

---

## 🖼️ Adding Images

### **Step 1: Add the image file**
1. Put your image in the `images/` folder
2. Name it something simple (e.g., `church-photo.jpg`)
3. Use lowercase, no spaces

### **Step 2: Reference it in JSON**
```json
"image": "images/church-photo.jpg"
```

### **Best Practices:**
- ✅ Use `.jpg` for photos
- ✅ Use `.png` for logos/graphics
- ✅ Keep file size under 500KB
- ✅ Use descriptive names
- ❌ Don't use spaces in filenames
- ❌ Don't use special characters

---

## 🗑️ Deleting Content

### **Option 1: Hide it (Recommended)**
```json
"enabled": false
```
This keeps the data but hides it from the website.

### **Option 2: Delete it (Permanent)**
Delete the entire item block:
```json
{
  "items": [
    {
      "id": "item1",
      ...
    },
    // DELETE THIS ENTIRE BLOCK ↓
    {
      "id": "item2",
      ...
    },
    // DELETE THIS ENTIRE BLOCK ↑
    {
      "id": "item3",
      ...
    }
  ]
}
```

**⚠️ Warning:** Make sure you don't break the JSON structure!

---

## ⚠️ Important JSON Rules

### **1. Commas Matter!**
```json
// ✅ CORRECT
{
  "title": "Item 1",
  "enabled": true
}

// ❌ WRONG (extra comma)
{
  "title": "Item 1",
  "enabled": true,  // ← Remove this comma
}
```

### **2. Quotes Matter!**
```json
// ✅ CORRECT
"title": "My Title"

// ❌ WRONG
"title": My Title      // Missing quotes
"title": 'My Title'    // Wrong quote type
```

### **3. True/False Don't Need Quotes!**
```json
// ✅ CORRECT
"enabled": true

// ❌ WRONG
"enabled": "true"  // Don't put quotes around true/false
```

### **4. Arrays Need Brackets!**
```json
// ✅ CORRECT
"items": [
  { ... },
  { ... }
]

// ❌ WRONG
"items": { ... }  // Missing brackets
```

---

## 🔍 Testing Your Changes

### **After editing a JSON file:**

1. **Save the file** (Ctrl+S)
2. **Go to your browser**
3. **Hard refresh** the page:
   - Windows: `Ctrl + F5` or `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`
4. **Check the console** (F12) for errors
5. **Verify your changes appear**

### **If something breaks:**

1. Open browser console (F12)
2. Look for red error messages
3. Common issues:
   - Missing comma
   - Extra comma at end
   - Unclosed quote
   - Typo in filename

---

## 🛠️ VS Code Tips

### **Format JSON (Make it Pretty):**
1. Right-click in the file
2. Select "Format Document"
3. Or press: `Shift + Alt + F`

### **Find Errors:**
- VS Code will show red squiggly lines for JSON errors
- Hover over them to see what's wrong

### **Fold Sections:**
- Click the little arrow next to line numbers to collapse sections
- Makes it easier to navigate large files

---

## 📋 Workflow Checklist

- [ ] Open the JSON file in VS Code
- [ ] Make your changes
- [ ] Save the file (Ctrl+S)
- [ ] Check for VS Code error markers
- [ ] Refresh your browser (Ctrl+F5)
- [ ] Verify changes appear
- [ ] Commit to GitHub (if ready)

---

## 🚀 Publishing Changes

### **Local Testing (Development):**
```bash
# Your changes appear immediately when you refresh
# No need to do anything special!
```

### **Publishing to Live Website:**

**Option A: Via VS Code**
1. Open Source Control (Ctrl+Shift+G)
2. Stage your changes (click +)
3. Write a commit message
4. Click ✓ Commit
5. Click "Sync Changes" or "Push"

**Option B: Via Terminal**
```bash
git add .
git commit -m "Updated attractions content"
git push
```

**Then:** Netlify will auto-deploy in 1-2 minutes! 🎉

---

## 🆘 Help & Support

### **JSON Validation**
If you're not sure if your JSON is valid:
1. Go to https://jsonlint.com
2. Paste your JSON
3. Click "Validate JSON"

### **Common Error Messages:**

**"Unexpected token" or "Unexpected end of JSON input"**
- Missing comma
- Extra comma
- Unclosed bracket or quote

**"Failed to load resource: 404"**
- Image path is wrong
- Image file doesn't exist in images/ folder

**"Nothing appears on the page"**
- Check browser console (F12)
- Look for error messages
- Verify JSON is valid

---

## 📚 Quick Reference

### **File Structure:**
```
Liliw Tourism/
├── data/
│   ├── attractions.json      ← Edit attractions
│   ├── events.json            ← Edit events
│   ├── experiences.json       ← Edit experiences
│   ├── plan-trip.json         ← Edit trip planning
│   └── homepage-content.json  ← Edit homepage
├── images/
│   └── your-image.jpg         ← Add images here
└── admin/
    └── (ignore for manual editing)
```

### **Field Types:**

| Field | Type | Example |
|-------|------|---------|
| `id` | Text (no spaces) | `"church"` |
| `title` | Text | `"St. John Church"` |
| `description` | Text | `"Built in 1600s"` |
| `image` | Path | `"images/photo.jpg"` |
| `location` | Text | `"Town Center"` |
| `link` | URL/Path | `"page.html#section"` |
| `enabled` | true/false | `true` |
| `date` | Text | `"April 2026"` |

---

## 🎉 You're Ready!

**That's it!** Editing your website is now as simple as editing a text file.

**Next Steps:**
1. Try editing `data/attractions.json`
2. Change a title or description
3. Save and refresh your browser
4. See your changes live! 🚀

**Later:**
When you're ready, we can upgrade to Netlify CMS for a visual editor interface!

---

*Last updated: October 22, 2025*
