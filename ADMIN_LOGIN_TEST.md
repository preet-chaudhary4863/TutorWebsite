# Admin Login Test Guide

## 🚀 Server Status

✅ **Backend Server**: http://localhost:5001  
✅ **Frontend Server**: http://localhost:5174  

---

## 📝 Test Credentials

### ✅ VALID Credentials
- **Email**: `sde1rajat@gmail.com`
- **Password**: `Admin@123456`
- **Expected**: Login successful → Redirects to admin panel

### ❌ INVALID Credentials (for testing errors)

**Test 1: Wrong Password**
- Email: `sde1rajat@gmail.com`
- Password: `WrongPassword123`
- Expected Error: "Invalid email or password"

**Test 2: Non-existent Email**
- Email: `nonexistent@email.com`
- Password: `Admin@123456`
- Expected Error: "Invalid email or password"

**Test 3: Not an Admin**
- Email: `tutor@example.com` (if exists in DB)
- Password: `TutorPassword123`
- Expected Error: "Only admin users can access this panel"

**Test 4: Empty Fields**
- Email: (leave empty)
- Password: (leave empty)
- Expected Error: "Please fill in all fields"

---

## 🧪 Testing Steps

### Step 1: Open Admin Login Page
```
Go to: http://localhost:5174/admin-login
```

### Step 2: Try INVALID Credentials First
```
Email:    sde1rajat@gmail.com
Password: WrongPassword123
Click: "Login"
Expected: Error message appears
```

### Step 3: Try VALID Credentials
```
Email:    sde1rajat@gmail.com
Password: Admin@123456
Click: "Login"
Expected: 
  - Success message appears
  - Redirected to admin panel
  - Dashboard displays tutor applications
```

---

## ✅ Expected Admin Panel Features

Once logged in with valid credentials, you should see:

1. **Dashboard Statistics**
   - Pending Applications count
   - Total Applications count
   - Active Tutors count
   - Total Users count

2. **Three Tabs**
   - Pending Applications
   - Accepted Applications
   - Rejected Applications

3. **Application Cards**
   - Tutor name
   - Email
   - Subject
   - Experience
   - Review button

4. **Header Buttons**
   - 🔐 Change Password
   - 🚪 Logout

5. **Application Review Modal**
   - Accept button (with hourly rate input)
   - Reject button (with reason input)

---

## 🔍 API Testing (Alternative Method)

### Test 1: Invalid Login Request
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sde1rajat@gmail.com",
    "password": "WrongPassword123"
  }'
```

**Expected Response:**
```json
{
  "message": "Invalid email or password"
}
```

---

### Test 2: Valid Login Request
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sde1rajat@gmail.com",
    "password": "Admin@123456"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "sde1rajat@gmail.com",
    "role": "admin"
  }
}
```

---

## 📊 Complete Login Flow Diagram

```
Start
  ↓
Go to /admin-login
  ↓
Enter credentials
  ↓
Click "Login"
  ↓
Frontend sends POST /api/auth/login
  ↓
Backend validates email & password
  ↓
┌─────────────────────┬──────────────────────┐
│                     │                      │
Invalid Credentials   Valid Credentials      Wrong Role (not admin)
  ↓                      ↓                      ↓
Show Error           Generate JWT Token    Show "Only admin..."
Message              Store in localStorage     Error
  ↓                      ↓                      ↓
Stay on Login        Redirect to            Stay on Login
Page                 /admin                 Page
  ↓                      ↓                      ↓
Can retry           Display Dashboard    Can retry
                        ↓
                    Admin Panel Ready
```

---

## 🐛 Troubleshooting

### Issue: "Can't connect to server"
**Solution**: Check if backend is running
```bash
cd c:\Users\ASUS\Desktop\Tutorcontent\server
node server.js
```

### Issue: "Invalid email or password"
**Check**:
- Email is exactly: `sde1rajat@gmail.com`
- Password is exactly: `Admin@123456`
- No extra spaces before/after

### Issue: "Only admin users can access this panel"
**Cause**: User exists but role is not 'admin'  
**Solution**: User needs to be promoted to admin:
```bash
# Run from server directory
node make-admin.js
```

### Issue: Admin account doesn't exist
**Solution**: Create admin account:
```bash
# Run from server directory
node setup-admin.js
```

---

## ✅ Success Checklist

- [ ] Backend server running on port 5001
- [ ] Frontend server running on port 5174
- [ ] Can access http://localhost:5174/admin-login
- [ ] Invalid credentials show error message
- [ ] Valid credentials login successfully
- [ ] Redirected to admin panel (/admin)
- [ ] Dashboard shows statistics
- [ ] Can see tutor applications
- [ ] Accept/Reject buttons work

---

## 📝 Notes

- Admin credentials are stored in MongoDB User collection
- Password is hashed with bcryptjs (cannot be recovered)
- JWT token expires after 7 days
- Admin can change password anytime using "🔐 Change Password" button
- To reset admin account: Delete user from DB and run `setup-admin.js`

