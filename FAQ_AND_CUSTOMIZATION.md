# ❓ FAQ & Customization Guide

## Frequently Asked Questions

---

## 💰 Cost & Budget Questions

### Q: Is this form completely free?
**A:** ✅ YES! 100% free.
- Google Sheets: Free
- Google Apps Script: Free (up to quota)
- Netlify/GitHub: Free hosting
- No monthly fees
- No credit card needed

---

### Q: What's the quota limit?
**A:** Google Apps Script gives:
- 30,000 function calls/day
- For typical construction: Can handle 500+ submissions/day
- Way more than enough for most companies

---

## 🔒 Security Questions

### Q: Is my data safe in Google Sheets?
**A:** ✅ Very safe!
- Google's enterprise-grade security
- Encrypted transmission
- Only you can access the sheet
- Automatic backups
- Version history (undo changes)

---

### Q: Can anyone access my form's Google Sheet?
**A:** No, you control access:
1. Only people with sheet link can submit
2. Only people with share permission can view
3. Edit the share settings to restrict access
4. Recommend: Share only with your team

---

### Q: What about file uploads - are they safe?
**A:** Yes, uploaded files are:
- Stored in Google Drive
- Encrypted
- Only you can access
- Can delete anytime
- Have version history

---

## 📱 Mobile & Browser Questions

### Q: Does form work on mobile?
**A:** ✅ Perfectly!
- Responsive design
- Works on all phones
- Works on tablets
- All features available
- Touch-friendly interface

---

### Q: Which browsers work?
**A:** All modern browsers:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

Avoid: Internet Explorer (old)

---

### Q: What if internet cuts off mid-form?
**A:** Most browsers auto-save:
- Data usually persists
- Refresh page to recover
- Try another browser if issue
- Offline mode not supported

---

## 🔄 Data & Workflow Questions

### Q: How do I export data to Excel?
**A:** Multiple ways:

**Method 1: From Google Sheet**
```
1. Open Google Sheet
2. Select all data (Ctrl+A)
3. Right-click → Download → Excel
4. File saved as .xlsx
```

**Method 2: Using Google's Download Option**
```
1. File → Download → Microsoft Excel
2. Instant download
```

---

### Q: Can I create backups?
**A:** ✅ Multiple backup options:

**Automatic (by Google):**
- Every change auto-saved
- Version history: File → Version history
- Can restore from any date

**Manual Backup:**
```
1. File → Download → Excel
2. Save to your computer
3. Do this weekly/monthly
```

---

### Q: Can multiple people submit forms simultaneously?
**A:** ✅ Yes, unlimited concurrent users!
- No user limit
- No concurrent submission limit
- All data safe
- Timestamps prevent conflicts

---

### Q: How long does data stay in Google Sheets?
**A:** Forever (until you delete):
- No automatic deletion
- No time limit
- Can keep 5+ years data
- Search/filter becomes slower with huge datasets

---

## 🎨 Customization Questions

### Q: Can I change form colors?
**A:** ✅ Yes! Easy customization:

**In HTML file (~Line 50):**
```css
:root {
    --primary: #FF6B35;      /* Orange */
    --secondary: #004E89;    /* Blue */
    --accent: #F7B801;       /* Yellow */
    --success: #06A77D;      /* Green */
}
```

**Popular Construction Color Schemes:**

**Option 1: Safety-First (Yellow/Orange)**
```css
--primary: #FFC107;
--secondary: #FF6B35;
--accent: #FF9800;
```

**Option 2: Professional (Navy/White)**
```css
--primary: #002B5C;
--secondary: #005A9C;
--accent: #0088CC;
```

**Option 3: Modern (Teal/Gray)**
```css
--primary: #00897B;
--secondary: #455A64;
--accent: #00BCD4;
```

After editing, save and redeploy!

---

### Q: Can I add more material types?
**A:** ✅ Yes, very easy:

**Method 1: Edit Stock Data Sheet**
```
1. Open your Google Sheet
2. Go to "Stock Data" sheet
3. Add new row:
   Material Name | Quantity | Unit
   Steel Plates  | 500      | Kg
4. Save
5. Form dropdown updates automatically!
```

**Method 2: Edit HTML (if not using Sheet)**
```
Around line ~100 in HTML:
${Object.keys(STOCK_DATA).map(...)}

Edit STOCK_DATA object:
const STOCK_DATA = {
    'New Material': { stock: 100, unit: 'Kg' },
    ...
}
```

---

### Q: Can I add more location sites?
**A:** ✅ Very simple!

**In HTML file (~Line 234):**
```html
<select id="location" name="location" required>
    <option value="">-- Select Location --</option>
    <option value="Your Site Name">Your Site Name</option>
    <option value="Another Site">Another Site</option>
    <!-- Add as many as needed -->
</select>
```

Common construction locations:
```html
<option value="Head Office">Head Office</option>
<option value="Site A - Mumbai">Site A - Mumbai</option>
<option value="Site B - Bangalore">Site B - Bangalore</option>
<option value="Warehouse - Pune">Warehouse - Pune</option>
<option value="Factory - Gujarat">Factory - Gujarat</option>
```

---

### Q: Can I change form field names?
**A:** ✅ Yes! 

**Important ones to be careful with:**
```html
name="mrfNo"         <!-- Do NOT change -->
name="mrfDate"       <!-- Do NOT change -->
name="requestedBy"   <!-- Can change label only -->
name="location"      <!-- Do NOT change -->
```

Labels can be changed (text before input), but don't change "name" attributes (Google Sheet sync depends on these).

---

## 📊 Reporting & Analytics Questions

### Q: Can I create reports/dashboards?
**A:** ✅ Yes, using Google Sheets features:

**Dashboard Option 1: Pivot Tables**
```
1. Insert → Pivot table
2. Analyze your MRF data
3. Create summaries by location/date/status
4. Auto-updates with new data
```

**Dashboard Option 2: Charts**
```
1. Insert → Chart
2. Select data range
3. Create visual charts:
   ├─ Requests by location
   ├─ Items requested over time
   ├─ Status breakdown
   └─ Department analysis
```

**Dashboard Option 3: Google Data Studio** (Advanced)
```
1. Go to datastudio.google.com
2. Create new report
3. Connect to your Google Sheet
4. Drag & drop visualizations
5. Share beautiful dashboard
```

---

### Q: How do I track MRF status?
**A:** Use the Status column:

```
Status Options:
□ NEW           → Just submitted
□ PENDING       → Under review
□ APPROVED      → Ready to order
□ ORDERED       → PO issued
□ RECEIVED      → Items delivered
□ REJECTED      → Needs revision
□ CANCELLED     → No longer needed
```

**Change status in Google Sheet:**
1. Click Status cell
2. Type new status
3. Automatically saves
4. Engineer sees updated status

---

### Q: Can I set reminders for pending MRFs?
**A:** ✅ Yes, using Google Apps Script:

Add this code to Google Apps Script:
```javascript
function sendReminderEmails() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  data.forEach((row, index) => {
    if (index > 0 && row[6] === 'Pending') {
      GmailApp.sendEmail(
        'manager@email.com',
        'Reminder: MRF ' + row[1] + ' Pending',
        'MRF ' + row[1] + ' from ' + row[3] + ' is still pending.'
      );
    }
  });
}
```

Then set up trigger to run daily:
```
1. Apps Script → Triggers (⏰)
2. Add Trigger → sendReminderEmails
3. Time-driven → Daily
4. Choose time (e.g., 9 AM)
```

---

## 🔧 Technical Questions

### Q: What if Google Apps Script has errors?
**A:** Troubleshooting steps:

**Step 1: Check Execution**
```
1. Open Apps Script
2. View → Execution log
3. Look for errors
4. Red X = Error occurred
```

**Step 2: Common Fixes**
```
- Click Deploy button again
- Clear browser cache
- Try different browser
- Check internet connection
```

**Step 3: Re-deploy**
```
1. Click Deploy → Edit
2. Click "Deploy" button
3. Give new deployment permission
```

---

### Q: Can I add custom validation?
**A:** ✅ Yes! Add to Google Apps Script:

```javascript
// Example: Reject if quantity > available stock
function validateQuantity(material, quantity) {
  const stock = STOCK_DATA[material];
  if (quantity > stock.stock) {
    return false; // Reject
  }
  return true; // Accept
}
```

---

### Q: How do I add more features?
**A:** Several options:

**Easy (No coding):**
- Add more columns to Google Sheet
- Create new sheets for different workflows
- Use Google Form for secondary data

**Medium (Basic coding):**
- Modify HTML to add fields
- Change Google Apps Script slightly
- Add new dropdown options

**Advanced (Full development):**
- Complete custom development
- Database integration
- Advanced features like approvals, notifications

---

## 🎓 Training & Support Questions

### Q: How do I train my team?
**A:** Use provided materials:

```
1. Share QUICK_START_GUIDE.txt with team
2. Send video tutorial link (when available)
3. Do 1-hour training session
4. Let them submit test MRFs
5. Answer questions
```

---

### Q: What if someone forgets their MRF number format?
**A:** Auto-generate helper script:

Add to Google Apps Script:
```javascript
function generateMRFNumber() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const count = SpreadsheetApp.getActiveSheet().getLastRow();
  return 'MRF-' + date.getFullYear() + month + day + '-' + count;
}
```

---

### Q: Can I get phone support?
**A:** Resources available:
- Documentation (provided)
- Video tutorials (to be added)
- Email support (if purchased professional)
- Community forums (Google Apps Script)

---

## 🌟 Advanced Questions

### Q: Can I integrate with accounting software?
**A:** ✅ Yes! Possible integrations:

**Popular Options:**
- Zapier (connect to any service)
- Google Sheets API (custom integration)
- Tally integration (India)
- SAP integration (enterprise)

---

### Q: Can I add approval workflow?
**A:** ✅ Yes, add this to Google Apps Script:

```javascript
function sendForApproval(mrfNo, approverEmail) {
  GmailApp.sendEmail(
    approverEmail,
    'MRF Approval Required: ' + mrfNo,
    'Please review and approve/reject this MRF: ' + mrfNo,
    {
      replyTo: 'approvals@company.com'
    }
  );
}
```

---

### Q: Can I add digital signatures?
**A:** Yes, using:
- Google's built-in signature (via DocuSign integration)
- Manual approval emails
- Digital signature service integration

---

## 📞 Still Have Questions?

**For common issues:**
→ Check CONSTRUCTION_MRF_SETUP.md

**For step-by-step setup:**
→ Check VISUAL_SETUP_GUIDE.md

**For daily usage:**
→ Check QUICK_START_GUIDE.txt

**For technical details:**
→ Check code comments in files

---

**Happy constructing! 🏗️**

*Last Updated: March 2024*
