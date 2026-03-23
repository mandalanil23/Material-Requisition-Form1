# 🎬 Visual Setup Guide - Step by Step

## PART 1: Google Sheet Setup (2 Minutes)

### Step 1.1: Create Google Sheet
```
1. Go to sheets.google.com
2. Click "+ New" (top left)
3. Select "Blank spreadsheet"
4. Rename it: "Construction MRF System"
   └─ Click "Untitled spreadsheet" → Type name → Press Enter
5. Click Share (top right)
```

**What you see:**
- Beautiful white spreadsheet
- Default "Sheet1" visible
- Rename button at top

---

### Step 1.2: Share Settings
```
In Share dialog:
1. Click "Change to anyone with the link"
2. Select "Editor" (dropdown)
3. Copy the URL shown
   └─ This is your SHEET URL (save it!)
4. Click "Share"
```

**What you see:**
- Share popup window
- Permission options
- Shareable link displayed

---

## PART 2: Google Apps Script (5 Minutes)

### Step 2.1: Open Apps Script
```
In your Google Sheet:
1. Click "Extensions" (top menu)
2. Click "Apps Script"
   └─ New tab opens with code editor
3. You see a blank function:
   function myFunction() {
   }
```

**What you see:**
- Code editor interface
- Blank function template
- Save button (top)

---

### Step 2.2: Paste Backend Code
```
1. Delete the default function
2. Copy ENTIRE code from: mrf-backend-script.gs
3. Paste into Apps Script editor
4. Click "💾 Save" (top left)
```

**What you see:**
- Your pasted code (70+ lines)
- Green checkmark (✓ saved)
- Status: "Saved" shown

---

### Step 2.3: Run Initialization
```
1. Find this function: initializeStockSheet()
2. Click the small play button (▶) next to it
3. Or select it and press Ctrl+Enter
4. Wait for "Execution complete" message
```

**What you see:**
- Code highlighted
- Execution log at bottom
- Success message appears
- "Execution completed successfully"

---

### Step 2.4: Deploy as Web App
```
1. Click "Deploy" button (top right)
   └─ Dropdown menu appears
2. Click "New Deployment"
   └─ Dialog opens
3. Click "Select type" → Choose "Web app"
4. Configure:
   ├─ Execute as: [Your Email]
   ├─ Who has access: [Anyone]
   └─ Click "Deploy"
5. COPY the URL shown!
   └─ Format: https://script.google.com/macros/d/XXXXX/usercontent
```

**What you see:**
- Deployment options
- Configuration dialog
- Success message with URL
- Copy button available

---

## PART 3: HTML Form Setup (2 Minutes)

### Step 3.1: Update Google Script URL in HTML
```
1. Open: construction-mrf-form.html (in text editor)
2. Find line ~442:
   GOOGLE_SHEET_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL',
3. Replace with your actual URL:
   GOOGLE_SHEET_URL: 'https://script.google.com/macros/d/XXXXX/usercontent',
4. Save the file
```

**What you see:**
- Text editor window
- Code highlighted
- URL replaced with your link

---

### Step 3.2: Optional - Customize Locations
```
1. In same HTML file
2. Find line ~234 (search for "Select Location")
3. Edit location options:
   <option value="Mumbai - Site A">Mumbai - Site A</option>
   ↓
   <option value="YOUR_SITE">YOUR_SITE</option>
4. Add all your project sites
5. Save the file
```

**What you see:**
- Location dropdown code
- Option values
- Easy to modify list

---

## PART 4: Deploy Online (Varies by Option)

### OPTION A: Netlify Deployment (30 Seconds - EASIEST!)

```
1. Go to netlify.com
2. Sign up (if needed) - Free account
3. Drag & drop your HTML file
   └─ Just drag the file into the browser
4. Wait for "Published" status
5. Copy your site URL
   └─ Format: https://RANDOMNAME.netlify.app
6. Your form is LIVE! 🎉
```

**What you see:**
- Netlify dashboard
- Upload area
- File processing animation
- Success: "Published"
- Your unique URL generated

---

### OPTION B: GitHub Pages Deployment (2 Minutes)

```
1. Go to github.com (create account if needed)
2. Create new repository:
   ├─ Name: construction-mrf
   ├─ Public (required)
   └─ Click "Create repository"
3. Click "Add file" → "Upload files"
4. Drag & drop construction-mrf-form.html
5. Click "Commit changes"
6. Go to Settings → Pages
7. Under "Source" select "main" branch
8. Wait for green checkmark
9. Your URL: https://USERNAME.github.io/construction-mrf/construction-mrf-form.html
```

**What you see:**
- GitHub repository page
- Upload interface
- Settings panel
- Pages configuration
- Your live URL

---

## PART 5: Testing (3 Minutes)

### Test Step 1: Open Form
```
1. Open your deployed URL
2. Wait for page to load (5-10 seconds first time)
3. You should see:
   ├─ Orange/Blue header
   ├─ "Material Requisition Form"
   ├─ All form fields
   └─ Submit button
```

**What you see:**
- Beautiful form interface
- Professional colors
- All dropdowns working
- "Stock Available" column

---

### Test Step 2: Fill Sample Data
```
1. MRF No:       MRF-2024-TEST-001
2. Date:         (auto-filled - today)
3. Requested By: Your Name
4. Location:     Mumbai - Site A
5. Click "+ Add Item"
6. Select Material: Cement
7. Quantity:     50
8. Unit:         (auto-fills to "Bags")
9. Required Date: 3 days from now
10. Remarks:     Test submission
```

**What you see:**
- Form fills up
- Dropdowns work
- Stock shows as "✓ 500"
- Rows multiply

---

### Test Step 3: Submit & Verify
```
1. Click "Preview" button
   └─ See all your data in preview
2. Click "Submit MRF"
3. Wait for success message:
   ✅ Material Requisition submitted successfully!
4. Open your Google Sheet
5. Check "MRF Data" sheet
   └─ Should see your test entry!
6. A new sheet "MRF-2024-TEST-001" created
   └─ Contains item details
```

**What you see:**
- Success popup message
- Form clears automatically
- New row in Google Sheet
- Timestamp recorded
- Status = "Pending"

---

## PART 6: Management (Ongoing)

### Monitor Submissions
```
Every day:
1. Open your Google Sheet
2. Check "MRF Data" sheet
3. See all submissions:
   ├─ MRF Number
   ├─ Requested By
   ├─ Location
   ├─ Item Count
   ├─ Status
   └─ Date/Time
4. Update Status column as needed
```

**What you see:**
- Table of all MRFs
- Color-coded by status
- Item counts visible
- Timestamps for tracking

---

### Share with Team
```
Send this link to all site engineers:
└─ YOUR_NETLIFY_OR_GITHUB_URL

They can:
✓ Access anytime
✓ Submit from phone/laptop
✓ See success message
✓ Submit again next time
```

---

## 🎯 Quick Reference Checklist

```
Setup Completed?
☐ Google Sheet created
☐ Shared to "Anyone"
☐ Apps Script deployed
☐ Stock data initialized
☐ HTML file updated with URL
☐ Form deployed online
☐ Test submission done
☐ Data in Google Sheet confirmed
☐ Team notified with link
☐ Ready for use! ✓
```

---

## 📊 Folder Structure (After Complete Setup)

```
Your Files:
├── construction-mrf-form.html
│   └─ (Updated with your Google Apps Script URL)
├── mrf-backend-script.gs
│   └─ (Code deployed to Google Apps Script)
├── Google Sheet: "Construction MRF System"
│   ├── MRF Data (main sheet)
│   ├── Stock Data (materials list)
│   └── [Individual MRF sheets created per submission]
├── Deployed URL (Netlify/GitHub)
│   └─ Live form accessible to team
└── Documentation
    └─ All guides saved for reference
```

---

## ✅ Success Indicators

✓ **Setup is complete when:**
- Form loads in browser
- Dropdowns work
- Stock quantities show
- Form submits without errors
- Success message appears
- Data appears in Google Sheet
- New sheet created with items
- Notification email received

---

## 🚨 If Something Goes Wrong

| Symptom | First Try |
|---------|-----------|
| Form doesn't load | Clear cache, try incognito |
| Dropdowns empty | Refresh page |
| Submit fails | Check Google Apps Script URL |
| No data in sheet | Re-deploy Apps Script |
| Slow loading | Check internet connection |
| Can't upload files | Check file size < 5MB |

---

## 📞 Final Checklist Before Launch

```
☐ Google Sheet test data submitted
☐ Data appears in Google Sheet
☐ All locations customized
☐ All materials added to stock
☐ File upload tested
☐ Mobile tested (on phone)
☐ Team has the form URL
☐ Backup of Google Sheet made
☐ Shared form URL documented
☐ Ready to announce to team! 🎉
```

---

**You're all set! Your professional Construction MRF Form is ready for your team.**

Send them this URL: **[YOUR_FORM_URL]**

Manage submissions here: **[YOUR_GOOGLE_SHEET_URL]**
