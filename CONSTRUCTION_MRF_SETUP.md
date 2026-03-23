# 🏗️ Construction MRF Form - Complete Setup Guide

> Professional Material Requisition Management System with Real-Time Google Sheets Integration

---

## 📋 Table of Contents
1. [Google Sheet Setup](#google-sheet-setup)
2. [Google Apps Script Configuration](#google-apps-script-configuration)
3. [HTML Form Configuration](#html-form-configuration)
4. [Online Deployment](#online-deployment)
5. [Testing & Troubleshooting](#testing--troubleshooting)

---

## 🔧 Google Sheet Setup

### Step 1: Create Google Sheet
1. Go to **sheets.google.com**
2. Create **NEW Sheet** named: `Construction MRF System`
3. Keep the default "Sheet1" - we'll use it for main data

### Step 2: Share Settings
1. Click **SHARE** (top right)
2. Change to **Anyone with the link** → **Editor**
3. Copy and save the Sheet URL (you'll need it)

---

## 📜 Google Apps Script Configuration

### Step 1: Open Apps Script Editor
1. In your Google Sheet → **Extensions** → **Apps Script**
2. Delete the default code
3. Copy the ENTIRE code from `mrf-backend-script.gs` file
4. Paste it into the Apps Script editor
5. Click **💾 Save**

### Step 2: Deploy as Web App
1. Click **Deploy** → **New Deployment** (top right)
2. Select: **Type** → **Web app**
3. Configure:
   - **Execute as:** Your email address
   - **Who has access:** **Anyone**
4. Click **Deploy**
5. **⚠️ COPY THE DEPLOYMENT URL** - This is CRITICAL!

   Example: `https://script.google.com/macros/d/YOUR_ID_HERE/usercontent`

### Step 3: Initialize Stock Data
1. In the Apps Script editor, paste this line and run it:
   ```javascript
   initializeStockSheet()
   ```
2. This creates a "Stock Data" sheet with sample materials
3. Go back to your Google Sheet - you'll see a new "Stock Data" sheet

---

## 🎨 HTML Form Configuration

### Step 1: Update Deployment URL
1. Open `construction-mrf-form.html` in a text editor
2. Find this line (around line 442):
   ```javascript
   GOOGLE_SHEET_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL',
   ```
3. Replace with your actual URL:
   ```javascript
   GOOGLE_SHEET_URL: 'https://script.google.com/macros/d/YOUR_ACTUAL_ID/usercontent',
   ```

### Step 2: Customize Locations (Optional)
In the HTML, find the location dropdown (around line 234):
```html
<select id="location" name="location" required>
    <option value="">-- Select Location --</option>
    <option value="Mumbai - Site A">Mumbai - Site A</option>
    <!-- Add your project locations here -->
</select>
```

Edit to match your actual project locations.

---

## 🚀 Online Deployment Options

### **Option A: Netlify (RECOMMENDED - Easiest)**

1. **Prepare your file:**
   - Ensure `construction-mrf-form.html` is updated with your Google Apps Script URL

2. **Deploy on Netlify:**
   - Go to **netlify.com**
   - Drag & drop `construction-mrf-form.html`
   - Your form is LIVE! 🎉
   - Get a shareable link instantly

3. **Custom Domain (Optional):**
   - In Netlify Settings → Domain Management
   - Connect your custom domain

---

### **Option B: GitHub Pages (Free)**

1. **Create GitHub Repository:**
   - Go to github.com → Create new repository: `construction-mrf`
   - Upload `construction-mrf-form.html`

2. **Enable GitHub Pages:**
   - Settings → Pages
   - Source: main branch
   - Your form live at: `https://yourusername.github.io/construction-mrf/construction-mrf-form.html`

---

### **Option C: Google Sites (Built-in)**

1. Go to **sites.google.com**
2. Create new site
3. **Insert** → **Embed URL**
4. Paste this iframe:
   ```html
   <iframe width="100%" height="1200" 
   src="YOUR_NETLIFY_OR_GITHUB_URL"
   frameborder="0" allow="fullscreen"></iframe>
   ```

---

### **Option D: Your Own Website**
- Simply upload `construction-mrf-form.html` to your hosting
- Access via your domain/subdomain

---

## 📊 Using Your Google Sheet

### Real-Time Data Tracking
After submitting the form:
1. Data appears automatically in "MRF Data" sheet
2. Each MRF gets its own sheet with item details
3. All timestamps are recorded

### Accessing Submitted Data
- **MRF Data Sheet**: Main requisitions
- **Individual MRF Sheets**: Detailed items for each MRF
- **Stock Data Sheet**: Current inventory levels

### Managing Submissions
1. Update **Status** column:
   - `Pending` → Initial state
   - `Approved` → Item approved
   - `REJECTED` → Item rejected

2. Add file links in columns:
   - **MRF File Link**
   - **Quotation 1 Link**
   - **Quotation 2 Link**

---

## 🧪 Testing & Troubleshooting

### Test the Form
1. Access your deployed form URL
2. Fill form with sample data:
   - MRF No: `MRF-2024-001`
   - Date: Today's date
   - Requested By: Your name
   - Location: Any option
   - Add 2-3 materials
3. Click **Preview** to verify
4. Click **Submit MRF**

### Expected Behavior
✅ Success message appears  
✅ Form clears  
✅ Data appears in Google Sheet within 5 seconds  
✅ New sheet created for items  

### Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Error submitting form"** | Check Apps Script URL in HTML is correct |
| **Data not in Sheet** | Re-deploy Apps Script (Extensions → Apps Script → Deploy) |
| **CORS Error** | Ensure Apps Script deployment set to "Anyone" |
| **No email notifications** | Check Gmail is enabled in Apps Script settings |
| **File upload shows error** | Files must be under 5MB |
| **Dropdown shows "Select Material"** | Default options in stock sheet, customize as needed |

---

## 🔐 Security & Best Practices

### Protect Your Google Sheet
1. Go to Sheet → **Share**
2. Remove "Anyone with link" access
3. Add specific email addresses only
4. Give "Viewer" access to read-only

### Keep Data Safe
1. Don't share Apps Script URL publicly
2. Use a password-protected form deployment
3. Regular backups of Google Sheet

### Monitor Submissions
1. Set up email notifications (built-in)
2. Check "MRF Data" sheet daily
3. Follow up on pending items

---

## 📱 Mobile Usage

Form works perfectly on mobile:
- ✓ Responsive design
- ✓ Touch-friendly dropdowns
- ✓ Easy file uploads
- ✓ All features work

---

## 🎨 Customization Tips

### Change Colors
Edit the color variables in HTML (line ~50):
```css
--primary: #FF6B35;        /* Orange */
--secondary: #004E89;      /* Blue */
--accent: #F7B801;         /* Yellow */
--success: #06A77D;        /* Green */
--danger: #E63946;         /* Red */
```

### Add More Locations
Edit the location dropdown in HTML to match your sites.

### Add More Material Types
1. Edit "Stock Data" sheet in Google Sheet
2. Add new materials with quantities and units
3. They'll auto-appear in the form dropdown

---

## 📞 Support & Resources

- **Google Apps Script Docs**: https://developers.google.com/apps-script
- **Netlify Support**: https://support.netlify.com
- **GitHub Pages Help**: https://docs.github.com/en/pages

---

## ✅ Setup Checklist

- [ ] Created Google Sheet
- [ ] Copied Apps Script code
- [ ] Deployed as Web App (and saved URL)
- [ ] Ran `initializeStockSheet()` function
- [ ] Updated HTML with Apps Script URL
- [ ] Deployed form online (Netlify/GitHub/etc)
- [ ] Tested form submission
- [ ] Data appears in Google Sheet
- [ ] Shared form link with team
- [ ] Customized locations and materials

---

## 🎉 You're All Set!

Your professional Material Requisition Form is now live and connected to Google Sheets!

**Share this URL with your team:**
```
YOUR_FORM_URL_HERE
```

**Monitor submissions here:**
```
YOUR_GOOGLE_SHEET_URL
```

---

**Questions? Check the troubleshooting section or review the code comments!**
