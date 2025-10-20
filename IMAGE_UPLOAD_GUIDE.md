# 📷 Image Upload Guide - Liliw Tourism Admin

## Overview
The admin panel now features an easy-to-use **drag-and-drop image upload system**! No need to understand file paths - just drag, drop, and save.

---

## 🎯 How to Upload Images

### Method 1: Drag & Drop (Easiest!)

1. **Edit any card** in the Homepage Editor
2. **Drag an image file** from your computer
3. **Drop it** into the upload area (it will highlight when ready)
4. **Preview appears instantly** - you'll see your image right away
5. **Click "Save Card"** to save your changes

### Method 2: Choose File Button

1. **Edit any card** in the Homepage Editor
2. **Click "Choose File"** button
3. **Select an image** from your computer (JPG, PNG, or GIF)
4. **Preview appears instantly**
5. **Click "Save Card"** to save your changes

---

## 📋 Step-by-Step Complete Workflow

### Step 1: Upload Image in Card Editor

1. Go to **Admin Dashboard** → **Edit Homepage**
2. Click **Edit** on any section (e.g., "Popular Places")
3. Click the **✏️ Edit button** on a card
4. In the card edit form:
   - See the **image upload area** with a 📷 icon
   - **Drag & drop** your image OR click **"Choose File"**
   - Your image will appear in the preview
5. Click **"Save Card"** button
6. Click **"Save"** on the section modal
7. Click **"Save Changes"** at the top

### Step 2: Save Images to Your Project

⚠️ **IMPORTANT:** The images are temporarily stored. You need to save them to your project folder!

1. Go to **Admin Dashboard**
2. Click **"Image Upload Helper"** (you'll see a red badge if you have pending images)
3. You'll see all your uploaded images
4. For each image:
   - Click **"Download Image"**
   - Save it to the **`images/`** folder in your project
   - **Use the exact filename shown** (don't rename!)
5. After saving all images, click **"Clear All Saved Images"**

### Step 3: Verify Your Images

1. **Refresh your website** (http://localhost:8000)
2. Your new images should appear on the homepage!

---

## 🎨 Image Requirements

### Supported Formats
- ✅ **JPG/JPEG** - Best for photos
- ✅ **PNG** - Best for logos and graphics with transparency
- ✅ **GIF** - Supported but not recommended for large images

### Size Limits
- **Maximum file size:** 5 MB per image
- **Recommended size:** Under 2 MB for faster loading

### Recommended Dimensions
- **Card images:** 800×600 pixels (landscape)
- **Hero images:** 1920×1080 pixels
- **Thumbnails:** 400×300 pixels

---

## 🔧 Features

### ✨ Live Preview
- See your image **immediately** after uploading
- No need to save and refresh to see changes

### 🔄 Easy Replacement
- Click **"Change Image"** to replace an existing image
- Click **"Remove"** to delete and use placeholder

### 📁 Organized Storage
- All images are saved to the `images/` folder
- Consistent file structure
- Easy to find and manage

### 🚫 Automatic Validation
- Only image files accepted
- File size checked automatically
- Error messages if something goes wrong

---

## 🆘 Troubleshooting

### "Image not appearing on website"
**Solution:** Make sure you:
1. Downloaded the image from Image Upload Helper
2. Saved it to the `images/` folder (not any subfolder)
3. Used the exact filename shown
4. Refreshed your browser (Ctrl+F5)

### "File size too large" error
**Solution:** 
1. Compress your image using a tool like TinyPNG.com
2. Resize the image to recommended dimensions
3. Convert to JPG format if it's PNG

### "Pending images disappeared"
**Solution:**
- Pending images are stored temporarily in your browser
- Don't clear browser cache/data before saving images
- If lost, you'll need to re-upload them

### Image looks blurry or stretched
**Solution:**
1. Use higher resolution images (at least 800px wide)
2. Maintain aspect ratio (don't stretch images)
3. Use appropriate image dimensions for each section

---

## 📝 Best Practices

### DO ✅
- ✅ Use descriptive filenames (e.g., `church-exterior.jpg`)
- ✅ Optimize images before uploading (compress file size)
- ✅ Use landscape orientation for card images
- ✅ Save images immediately after uploading
- ✅ Check the Image Upload Helper regularly

### DON'T ❌
- ❌ Use spaces in filenames (use hyphens: `my-image.jpg`)
- ❌ Rename files after downloading from Image Upload Helper
- ❌ Upload extremely large files (>5MB)
- ❌ Use special characters in filenames
- ❌ Clear browser cache before saving images

---

## 🚀 Advanced: Future Improvements

In future updates, we plan to add:
- **Direct upload to server** (no manual save needed)
- **Image cropping and editing** in the admin panel
- **Automatic image optimization** on upload
- **Image gallery** to choose from existing images
- **Bulk upload** multiple images at once

---

## 💡 Tips for Non-Tech Users

### "What's a file path?"
You don't need to know! Just drag and drop images and follow the steps in the Image Upload Helper.

### "Where is the images folder?"
Ask your developer or check your project structure. It should be in the main folder alongside `index.html`.

### "Can I use images from my phone?"
Yes! Just transfer images to your computer first, then upload them through the admin panel.

### "How do I make images smaller?"
Use free online tools:
- **TinyPNG.com** - Compress images
- **ResizeImage.net** - Resize dimensions
- **Squoosh.app** - Advanced compression

---

## 📞 Need Help?

If you encounter issues:
1. Check this guide first
2. Check the browser console for errors (F12)
3. Contact your developer
4. Take screenshots of any error messages

---

**Last Updated:** October 20, 2025  
**Version:** 1.0.0
