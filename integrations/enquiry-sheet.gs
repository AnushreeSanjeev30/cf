/**
 * Canara Flex: website enquiries → Google Sheet.
 *
 * Paste this into Extensions → Apps Script of the Google Sheet that should
 * collect enquiries, then follow the setup steps in README.md ("Enquiry sheet").
 * Every quote or service request from the website is added as a new row.
 */

const SHEET_NAME = "Enquiries";
const HEADERS = [
  "Received", "Reference", "Type", "Machine", "Name", "Company", "Phone", "Email", "City", "Details",
  "Status", "Assigned to", "Follow-up notes",
];
const STATUSES = ["New", "Contacted", "Quote sent", "In progress", "Won", "Lost", "Closed"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || data.secret !== secret) return json({ ok: false, error: "unauthorised" });

    const sheet = getSheet();
    sheet.appendRow([
      new Date(data.receivedAt),
      data.reference,
      data.type,
      data.machine,
      data.name,
      data.company,
      data.phone,
      data.email,
      data.city,
      data.details,
      "New",
      "",
      "",
    ].map(safe));
    sheet.getRange(sheet.getLastRow(), 1).setNumberFormat("dd mmm yyyy, hh:mm am/pm");
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;

  ss.setSpreadsheetTimeZone("Asia/Kolkata");
  sheet = ss.insertSheet(SHEET_NAME, 0);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight("bold").setBackground("#2A3036").setFontColor("#FFFFFF");
  sheet.setFrozenRows(1);
  sheet.setColumnWidths(1, HEADERS.length, 140);
  sheet.setColumnWidth(10, 360);
  sheet.setColumnWidth(13, 300);
  // Status dropdown for the whole column.
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  sheet.getRange(2, 11, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  return sheet;
}

// Stop values like "+91 98..." or "=SUM()" being read as formulas.
function safe(v) {
  if (typeof v !== "string") return v;
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
