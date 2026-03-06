# Mailtrap Setup - Step by Step

## Step 1: Create Mailtrap Account

1. Open: https://mailtrap.io
2. Click **"Sign Up"**
3. Choose **"Sign up with email"** or **"Continue with GitHub"**
4. Fill in details and create account
5. **Confirm your email** (check inbox)

---

## Step 2: Create Development Inbox

After login:
1. Click **"Create Inbox"** (if not already created)
2. Name it: **"Development"** (or any name)
3. Click **"Create"**

---

## Step 3: Get Nodemailer Credentials

1. Click on your **"Development"** inbox
2. Click **"Integrations"** button (top right)
3. Find and click **"Nodemailer"**
4. You'll see credentials like:
   ```
   Username: your-username (e.g., a1b2c3d4e5f6g7h8)
   Password: your-password (e.g., x9y8z7w6v5u4t3s2)
   ```
5. **Copy these values**

---

## Step 4: Update .env File

Replace these lines in `server/.env`:

```env
EMAIL_USER=your-mailtrap-username
EMAIL_PASSWORD=your-mailtrap-password
```

**Example:**
```env
EMAIL_USER=a1b2c3d4e5f6g7h8
EMAIL_PASSWORD=x9y8z7w6v5u4t3s2
```

---

## Step 5: Verify Configuration

After updating `.env`, run:

```bash
cd server
node test-otp.js
```

---

## Step 6: Check Email in Mailtrap

1. Go back to **Mailtrap inbox** (https://mailtrap.io)
2. Click on your **"Development"** inbox
3. **Refresh the page**
4. You should see the OTP email!

---

## What the Email Contains:

```
From: your-email@gmail.com
Subject: Password Reset OTP - TutorConnect

Your OTP is: 123456

This OTP will expire in 10 minutes.
If you didn't request this, please ignore this email.
```

---

## ✅ Success Indicators

When test runs successfully:
- ✅ `📧 Step 1: Requesting OTP...` → **✅ OTP requested successfully!**
- ✅ `📋 Step 2: Verifying OTP...` → **✅ OTP verified successfully!**
- ✅ `🔑 Step 3: Resetting password...` → **✅ Password reset successfully!**
- ✅ **✨ OTP Flow Test Completed Successfully!**

---

## Next: Test on Frontend

After successful backend test:

1. **Start frontend**: `cd Tutor && npm run dev`
2. **Go to**: http://localhost:5173/change-password
3. **Click**: "Reset with OTP"
4. **Enter**: sde1rajat@gmail.com
5. **Click**: "Send OTP"
6. **Check Mailtrap inbox** for OTP code
7. **Paste OTP** in the form
8. **Set new password** and reset

---

## 🎉 Complete!

After this, the OTP system is fully working and ready for production.

