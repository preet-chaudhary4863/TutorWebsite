# OTP Email Configuration & Testing Guide

## ⚙️ Setup Email Service (Choose One)

### Option 1: Gmail (Recommended for Production)

**Prerequisites:**
1. Google Account with 2-Factor Authentication enabled
2. Gmail App Password generated

**Steps:**
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Google will generate a 16-character password
4. Copy the password (with spaces, e.g., `xxxx xxxx xxxx xxxx`)

**Update `.env`:**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**Restart Server:**
```bash
npm start
```

---

### Option 2: Mailtrap (Best for Testing)

Mailtrap is a test email service perfect for development - all emails go to a dashboard instead of being sent.

**Free Plan:**
- Unlimited test emails
- No limits on recipients
- Free forever

**Setup Steps:**

1. **Create Account:**
   - Go to: https://mailtrap.io
   - Sign up for free

2. **Create Inbox:**
   - Click "Create Inbox"
   - Name it "Development" or "Testing"

3. **Get Credentials:**
   - Go to your inbox
   - Click "Integrations" (top right)
   - Select "Nodemailer"
   - Copy the credentials

4. **Update `.env`:**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-mailtrap-username
   EMAIL_PASSWORD=your-mailtrap-password
   ```
   
   OR update `emailService.js` to use custom SMTP:
   ```javascript
   const transporter = nodemailer.createTransport({
     host: 'smtp.mailtrap.io',
     port: 465,
     secure: true,
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASSWORD,
     },
   });
   ```

5. **Restart Server:**
   ```bash
   npm start
   ```

6. **Check Emails:**
   - All test emails appear in your Mailtrap inbox
   - View them without actually sending emails

---

### Option 3: Outlook/Hotmail

**Update `.env`:**
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-app-password
```

---

## 🧪 Testing the OTP Flow

### Method 1: Using Test Script (Automated)

```bash
# From server directory
node test-otp.js
```

**What it does:**
1. ✅ Requests OTP for sde1rajat@gmail.com
2. ✅ Retrieves OTP from MongoDB
3. ✅ Verifies OTP validity
4. ✅ Resets password
5. ✅ Reports success/failure

---

### Method 2: Manual Testing via Frontend

**Prerequisites:**
- Backend running on http://localhost:5001
- Frontend running on http://localhost:5173
- Email service configured

**Test Steps:**

1. **Navigate to Password Change:**
   ```
   http://localhost:5173/change-password
   ```

2. **Click "Reset with OTP"**

3. **Enter Email:**
   - Email: `sde1rajat@gmail.com`

4. **Request OTP:**
   - Click "Send OTP"
   - Check console for success message

5. **Check Email:**
   - **Gmail**: Check inbox for "Password Reset OTP - TutorConnect"
   - **Mailtrap**: Check Mailtrap dashboard inbox
   - **Outlook**: Check inbox

6. **Copy OTP:**
   - 6-digit code from email (e.g., `123456`)

7. **Verify OTP:**
   - Paste OTP in the form
   - Click "Verify OTP"

8. **Set New Password:**
   - Enter new password: `NewPassword123`
   - Confirm: `NewPassword123`
   - Click "Reset Password"

9. **Verify Success:**
   - Message shows "Password reset successfully!"
   - Try logging in with new password

---

### Method 3: API Testing (Postman/cURL)

**Request OTP:**
```bash
curl -X POST http://localhost:5001/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"sde1rajat@gmail.com"}'
```

**Expected Response:**
```json
{
  "message": "OTP sent to email"
}
```

**Verify OTP:**
```bash
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"sde1rajat@gmail.com","otp":"123456"}'
```

**Reset Password:**
```bash
curl -X POST http://localhost:5001/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email":"sde1rajat@gmail.com",
    "otp":"123456",
    "newPassword":"NewPassword123",
    "confirmPassword":"NewPassword123"
  }'
```

---

## ✅ Verification Checklist

- [ ] Email service configured in `.env`
- [ ] Server restarted after configuration
- [ ] OTP email sent successfully
- [ ] Email received in inbox or Mailtrap
- [ ] OTP verified successfully
- [ ] Password reset successfully
- [ ] Can login with new password

---

## 🐛 Troubleshooting

### "Failed to send OTP email"

**Check:**
1. ✅ EMAIL_USER and EMAIL_PASSWORD in `.env`
2. ✅ No placeholder values remaining
3. ✅ Server restarted after `.env` changes
4. ✅ Email service credentials are correct

**For Gmail:**
- Verify 2FA is enabled
- Verify app password generated (not account password)
- Ensure app password has no extra spaces at start/end

**For Mailtrap:**
- Copy credentials from Integrations → Nodemailer
- Ensure you're using username (not email)

### "Invalid OTP"

**Causes:**
- OTP expired (expires after 10 minutes)
- OTP already used (one-time only)
- Wrong email address

**Solution:**
- Request new OTP
- Use correct email address
- Verify within 10 minutes

### Server won't start

**Check:**
1. Port 5001 not in use: `netstat -ano | findstr :5001`
2. MongoDB connected: Check `MONGO_URI` in `.env`
3. All dependencies installed: `npm install`

---

## 📊 Testing Results

After setup, run:

```bash
npm test
```

Or manually verify:
```bash
node test-otp.js
```

Expected output:
```
🧪 Testing OTP Password Reset Flow

📧 Step 1: Requesting OTP...
✅ OTP requested successfully!

📋 Step 2: Verifying OTP...
✅ OTP verified successfully!

🔑 Step 3: Resetting password...
✅ Password reset successfully!

✨ OTP Flow Test Completed Successfully!
```

---

## 🔒 Security Notes

✅ **OTP Validity:** 10 minutes  
✅ **OTP Length:** 6 digits  
✅ **One-Time Use:** OTP deleted after verification  
✅ **Password Hashing:** Bcrypt with salt  
✅ **Token Expiration:** 7 days for JWT  
✅ **Email Verification:** Only registered emails accepted  

---

## 📞 Need Help?

1. Check server logs: `npm start` (stop with Ctrl+C)
2. Verify email service: Test credentials separately
3. Check MongoDB: Verify connection string in `.env`
4. Check firewall: Ensure port 5001 is open locally

