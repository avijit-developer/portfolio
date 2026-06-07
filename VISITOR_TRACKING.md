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
  const data = e && e.postData
    ? JSON.parse(e.postData.contents || '{}')
    : {};

  saveView(data);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function testViewLog() {
  saveView({
    timestamp: new Date().toISOString(),
    page: 'manual-test',
    title: 'Manual Test'
  });
}

function saveView(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.page || '',
    data.title || ''
  ]);
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

## Troubleshooting

If the site opens but no row appears in the Sheet, check the Apps Script deployment:

```text
Deploy > Manage deployments > Edit
Execute as: Me
Who has access: Anyone
Version: New version
Deploy
```

If `Who has access` is not `Anyone`, the endpoint returns `403 Forbidden` and the browser silently fails because the tracker uses `no-cors`.

Also confirm the Google Sheet tab name matches this line:

```javascript
const SHEET_NAME = 'Sheet1';
```

Do not manually run `doPost` from the Apps Script editor. It only works when the website sends a POST request. To test from the editor, select and run this function instead:

```javascript
testViewLog
```

If the endpoint shows `Script function not found: doPost`, the Apps Script code was not pasted/saved correctly or the deployment is using an old version. Make sure the script has this exact function name:

```javascript
function doPost(e) {
```

Then click `Save`, deploy a `New version`, and copy the Web app URL again.
