# Page View Tracking Without a Database

This site is static, so it cannot save view counts by itself. Use Google Sheets as the storage and Google Apps Script as the endpoint.

## 1. Create the Google Sheet

Create a new Google Sheet and add these headers in row 1:

```text
Timestamp | Page | Title
```

Your total view count is the number of saved data rows below the header.

## 2. Add Apps Script

In the Sheet, open `Extensions > Apps Script`, paste this code, and deploy it as a web app.

```javascript
const SPREADSHEET_ID = '1bsTFv2alr7eXQjNzvKqoyCZ1QNmB4gRsIoB3cdAXkGo';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents || '{}');

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.page || '',
    data.title || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy settings:

```text
Execute as: Me
Who has access: Anyone
```

Copy the generated web app URL.

## 3. Connect the Site

Open `script.js` and replace this line. Use the Google Apps Script Web App `/exec` URL, not the Google Sheet URL.

```javascript
const VISITOR_LOG_ENDPOINT = '';
```

with:

```javascript
const VISITOR_LOG_ENDPOINT = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
```

After deployment, each page open will save one view row to the Google Sheet.

## Notes

This only tracks view events. It does not collect IP, country, city, device, or user details.
