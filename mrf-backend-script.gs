// ============================================
// Construction MRF Form - Backend Script
// Google Apps Script for Material Requisition
// ============================================

// ⚠️ YOUR GOOGLE SHEET ID - Change this if you use a different sheet
const SHEET_ID = '1J2IcNxN2QeQBF6t8fv5O0LhmTtgalxYEHlfJ85ulBp8';

// Helper: Always open the specific Google Sheet by ID
function getSpreadsheet() {
  return SpreadsheetApp.openById(SHEET_ID);
}

// Main handler for POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = getSpreadsheet();
    
    // Get or create MRF Data sheet
    let sheet = ss.getSheetByName('MRF Data');
    if (!sheet) {
      sheet = ss.insertSheet('MRF Data', 0);
      createHeaders(sheet);
    }

    // Create materials sub-sheet name
    const mrfNo = data.mrfNo;
    let itemsSheet = ss.getSheetByName(mrfNo);
    if (!itemsSheet) {
      itemsSheet = ss.insertSheet(mrfNo);
      createItemHeaders(itemsSheet);
    }

    // Add main MRF record
    const mainRow = [
      data.timestamp,
      mrfNo,
      data.mrfDate,
      data.requestedBy,
      data.location,
      data.items.length,
      data.status,
      '', // For file links
      '', // For quotation 1 link
      '', // For quotation 2 link
      data.notes,
      'NEW'
    ];

    sheet.appendRow(mainRow);

    // Add items to sub-sheet
    data.items.forEach((item, index) => {
      const itemRow = [
        mrfNo,
        index + 1,
        item.material,
        item.quantity,
        item.unit,
        item.reqDate,
        item.remarks,
        new Date().toLocaleString('en-IN')
      ];
      itemsSheet.appendRow(itemRow);
    });

    // Send notification email
    sendNotificationEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Material Requisition submitted successfully!',
        mrfNo: mrfNo,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Create main data sheet headers
function createHeaders(sheet) {
  const headers = [
    'Timestamp',
    'MRF No',
    'Date',
    'Requested By',
    'Location',
    'Item Count',
    'Status',
    'MRF File Link',
    'Quotation 1 Link',
    'Quotation 2 Link',
    'Notes',
    'Action'
  ];
  sheet.appendRow(headers);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#004E89')
    .setFontColor('white')
    .setFontWeight('bold');
}

// Create items sub-sheet headers
function createItemHeaders(sheet) {
  const headers = ['MRF No', 'Sr No', 'Material', 'Quantity', 'Unit', 'Required Date', 'Remarks', 'Added Date'];
  sheet.appendRow(headers);
  
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#FF6B35')
    .setFontColor('white')
    .setFontWeight('bold');
}

// Send email notification
function sendNotificationEmail(data) {
  // ⚠️ APNA EMAIL YAHAN DAALEIN (replace with your actual email)
  const recipient = 'anil.anandskills009@gmail.com';
  const subject = '🏗️ New MRF Submitted: ' + data.mrfNo;
  
  let itemsList = '';
  data.items.forEach((item, index) => {
    itemsList += `${index + 1}. ${item.material} - ${item.quantity} ${item.unit}\n`;
  });

  const message = `New Material Requisition has been submitted!

MRF Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MRF Number: ${data.mrfNo}
Date: ${data.mrfDate}
Requested By: ${data.requestedBy}
Location: ${data.location}
Status: ${data.status}
Timestamp: ${data.timestamp}

Materials Required:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${itemsList}

Notes: ${data.notes || 'None'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Check your Google Sheet for complete details and file attachments.`;

  GmailApp.sendEmail(recipient, subject, message, {
    noReply: true,
    name: 'Construction MRF System'
  });
}

// Fetch stock data (for real-time stock updates)
function getStockData() {
  try {
    const ss = getSpreadsheet();
    let stockSheet = ss.getSheetByName('Stock Data');
    
    if (!stockSheet) {
      return null;
    }

    const data = stockSheet.getDataRange().getValues();
    const stockData = {};

    data.forEach((row, index) => {
      if (index > 0) { // Skip header
        stockData[row[0]] = {
          stock: row[1],
          unit: row[2]
        };
      }
    });

    return stockData;
  } catch (error) {
    Logger.log('Error fetching stock: ' + error);
    return null;
  }
}

// Update status of MRF
function updateMRFStatus(mrfNo, newStatus) {
  try {
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName('MRF Data');
    
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === mrfNo) {
        sheet.getRange(i + 1, 7).setValue(newStatus); // Column G for Status
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log('Error updating status: ' + error);
    return false;
  }
}

// Approve MRF
function approveMRF(mrfNo) {
  return updateMRFStatus(mrfNo, 'APPROVED');
}

// Reject MRF
function rejectMRF(mrfNo, reason) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('MRF Data');
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === mrfNo) {
      sheet.getRange(i + 1, 7).setValue('REJECTED');
      sheet.getRange(i + 1, 11).setValue('Rejection: ' + reason);
      return true;
    }
  }
  return false;
}

// Get all MRFs for a location
function getMRFsByLocation(location) {
  try {
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName('MRF Data');
    
    if (!sheet) return [];
    
    const data = sheet.getDataRange().getValues();
    const results = [];

    data.forEach((row, index) => {
      if (index > 0 && row[4] === location) {
        results.push({
          mrfNo: row[1],
          date: row[2],
          requestedBy: row[3],
          itemCount: row[5],
          status: row[6]
        });
      }
    });

    return results;
  } catch (error) {
    Logger.log('Error: ' + error);
    return [];
  }
}

// Get all pending MRFs
function getPendingMRFs() {
  try {
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName('MRF Data');
    
    if (!sheet) return [];
    
    const data = sheet.getDataRange().getValues();
    const results = [];

    data.forEach((row, index) => {
      if (index > 0 && row[6] === 'Pending') {
        results.push({
          mrfNo: row[1],
          date: row[2],
          requestedBy: row[3],
          location: row[4],
          itemCount: row[5]
        });
      }
    });

    return results;
  } catch (error) {
    Logger.log('Error: ' + error);
    return [];
  }
}

// Generate MRF report
function generateMRFReport(startDate, endDate) {
  try {
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName('MRF Data');
    
    if (!sheet) return [];
    
    const data = sheet.getDataRange().getValues();
    const results = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    data.forEach((row, index) => {
      if (index > 0) {
        const rowDate = new Date(row[2]);
        if (rowDate >= start && rowDate <= end) {
          results.push({
            timestamp: row[0],
            mrfNo: row[1],
            date: row[2],
            requestedBy: row[3],
            location: row[4],
            itemCount: row[5],
            status: row[6],
            notes: row[10]
          });
        }
      }
    });

    return results;
  } catch (error) {
    Logger.log('Error: ' + error);
    return [];
  }
}

// Initialize stock data sheet (call this once to set up)
function initializeStockSheet() {
  const ss = getSpreadsheet();
  let stockSheet = ss.getSheetByName('Stock Data');
  
  if (!stockSheet) {
    stockSheet = ss.insertSheet('Stock Data');
  }
  
  const stockItems = [
    ['Cement', 500, 'Bags'],
    ['Steel Bars', 2000, 'Kg'],
    ['Sand', 10000, 'Cubic Meter'],
    ['Bricks', 50000, 'Piece'],
    ['Concrete Mix', 1500, 'Cubic Meter'],
    ['Tiles', 5000, 'Piece'],
    ['Paint', 200, 'Liter'],
    ['Wooden Frames', 100, 'Piece']
  ];
  
  stockSheet.clear();
  stockSheet.appendRow(['Material', 'Stock', 'Unit']);
  
  stockItems.forEach(item => {
    stockSheet.appendRow(item);
  });

  const headerRange = stockSheet.getRange(1, 1, 1, 3);
  headerRange.setBackground('#06A77D')
    .setFontColor('white')
    .setFontWeight('bold');
}

// Test function - delete after testing
function test() {
  Logger.log('Script working correctly!');
  Logger.log('Pending MRFs:', getPendingMRFs());
}
