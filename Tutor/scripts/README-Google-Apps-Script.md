Google Apps Script: Email on Form Submit

1. Open the Google Sheet that is collecting your Form responses.
2. Extensions -> Apps Script.
3. Create a new script file and paste the contents of `google_apps_script_email.gs`.
4. Save, then from the Apps Script editor: Triggers (left) -> Add Trigger.
   - Choose function: `sendFormResponseByEmail`
   - Event source: `From spreadsheet`
   - Event type: `On form submit`
5. Authorize the script when prompted. After that, each new submission will trigger an email to `rajatgamerzexpert@gmail.com`.

Notes:

- The script uses `e.values` to construct a basic email. You can customize the mapping to match your form headers.
- If you want richer HTML emails, replace `MailApp.sendEmail(RECIPIENT_EMAIL, subject, body)` with an HTML body option.
