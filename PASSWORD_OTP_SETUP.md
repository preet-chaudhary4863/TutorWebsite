# Password Change & OTP Verification Setup Guide

## Features Added

✅ **Change Password** - Authenticated users can change their password  
✅ **Forgot Password** - Users can reset password using OTP verification  
✅ **OTP via Email** - 6-digit OTP sent to user's email  
✅ **OTP Expiration** - OTP expires after 10 minutes  
✅ **Admin Panel** - Change password button in admin panel

---

## 🔧 Configuration Required

### 1. Update `.env` file with email credentials:

```env
# Email Service Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

### 2. For Gmail (Recommended):

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
3. **Use in `.env`**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### 3. For Other Email Services:

Update the `EMAIL_SERVICE` value in `.env`:
- `gmail`
- `outlook`
- `yahoo`
- `aol`
- Or use custom SMTP settings

---

## 📋 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/change-password` | POST | Change password (authenticated) |
| `/api/auth/request-otp` | POST | Request OTP for password reset |
| `/api/auth/verify-otp` | POST | Verify OTP |
| `/api/auth/reset-password` | POST | Reset password with OTP |

---

## 🎯 User Flows

### Flow 1: Change Password (Logged-in Users)

```
User in Admin Panel
    ↓
Click "🔐 Change Password"
    ↓
Enter current password + new password
    ↓
Click "Update Password"
    ↓
Password updated successfully
```

### Flow 2: Forgot Password (Reset with OTP)

```
User on Login Page
    ↓
Click "Forgot Password?"
    ↓
Enter email address
    ↓
Click "Send OTP"
    ↓
OTP sent to email (6-digit code)
    ↓
Enter OTP
    ↓
Verify OTP
    ↓
Enter new password
    ↓
Password reset successfully
```

---

## 🚀 Using the Features

### Admin Panel - Change Password:

1. Login to admin panel at `/admin-login`
2. Click **"🔐 Change Password"** button (top right)
3. Enter current password
4. Enter new password
5. Confirm new password
6. Click **"Update Password"**

### Change Password Page:

- Access at: `/change-password`
- Two options:
  - **Change Password** (if logged in)
  - **Reset with OTP** (if forgot password)

---

## 📧 Email Templates

### OTP Email Format:

```
Subject: Password Reset OTP - TutorConnect

Your OTP is: 123456

This OTP will expire in 10 minutes.

If you didn't request this, please ignore this email.
```

---

## 🔒 Security Features

✅ **Password Hashing**: Bcrypt with salt  
✅ **OTP Expiration**: Auto-expires after 10 minutes  
✅ **One-Time Use**: OTP can only be used once  
✅ **JWT Authentication**: Secure token-based auth  
✅ **Password Validation**: Minimum 6 characters  
✅ **Email Verification**: OTP sent to registered email

---

## 🧪 Testing

### Test Change Password:

```bash
1. Login to admin panel
2. Click "Change Password"
3. Enter current: Admin@123456
4. Enter new: NewPassword123
5. Confirm: NewPassword123
6. Click Update
```

### Test Forgot Password:

```bash
1. Go to /change-password
2. Click "Reset with OTP"
3. Enter email: sde1rajat@gmail.com
4. Check email for OTP
5. Enter OTP
6. Enter new password
7. Confirm password
8. Click "Reset Password"
```

---

## 📱 Mobile Responsive

All password/OTP forms are fully responsive and work on:
- ✅ Desktop browsers
- ✅ Tablets
- ✅ Mobile devices

---

## ⚠️ Important Notes

1. **Email Configuration**: Must be set up before OTP can be sent
2. **OTP Validity**: 10 minutes by default (can be changed in OTP model)
3. **Password Requirements**: Minimum 6 characters
4. **Admin Button**: Only visible in admin panel (logged-in admins)
5. **Database**: Requires OTP collection to be created automatically

---

## 🐛 Troubleshooting

### OTP not being sent?

- Check `.env` has EMAIL_USER and EMAIL_PASSWORD
- Verify email service credentials are correct
- Check Gmail has 2FA and app password enabled
- Check email SMTP port (usually 587)

### "Invalid OTP" error?

- OTP expires after 10 minutes
- OTP can only be used once
- Each request generates a new OTP

### Password change still showing old password?

- Clear browser cache/cookies
- Logout and login again with new password
- Check MongoDB for user update

---

## 📞 Support

If issues persist:

1. Check server logs for email errors
2. Verify `.env` configuration
3. Test email service credentials separately
4. Check MongoDB OTP collection exists

