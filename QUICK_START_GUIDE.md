# 🚀 Quick Start Guide - Tutor Application Flow

## Admin Credentials
- **Email:** `sde1rajat@gmail.com`
- **Password:** `Admin@123456`

---

## Complete Flow Walkthrough

### 1️⃣ User Applies as Tutor
**Location:** Website Home Page
- Click **"Join as a Tutor"** button
- Fill out the form:
  - Name: John Doe
  - Email: john@example.com
  - Subject: Mathematics, Physics
  - Years of Experience: 5
  - Message: "I am passionate about teaching..."
- Click **Submit Application**

### 2️⃣ Admin Reviews Application
**Location:** Admin Panel
1. Go to: `http://localhost:5173/admin-login`
2. Login with admin credentials
3. Click on pending application card
4. Review application details in modal

### 3️⃣ Admin Accepts Application
**In the modal:**
1. Set **Hourly Rate:** ₹500 (or your preferred rate)
2. Click **"Accept & Create Profile"** button
3. ✅ Success! Tutor profile is created

### 4️⃣ Tutor Appears on Website
**Location:** Website Home Page
1. Scroll to **"Meet Our Expert Tutors"** section
2. See the newly accepted tutor displayed with:
   - Profile picture (initials in colored circle)
   - Name: John Doe
   - Expertise tags: Mathematics, Physics
   - Experience: 5 years
   - Hourly rate: ₹500/hour
   - Contact button

---

## Admin Panel Overview

### Dashboard Statistics
- **Pending Applications:** Number of new applications waiting for review
- **Total Applications:** All applications (pending, accepted, rejected)
- **Active Tutors:** Tutors currently displayed on website
- **Total Users:** All registered users

### Application Tabs
- **Pending:** New applications to review
- **Accepted:** Approved tutors (tutors shown on website)
- **Rejected:** Declined applications with reasons

### Actions
- **Accept:** Creates tutor profile, sets hourly rate
- **Reject:** Declines application, provides reason

---

## What Happens Behind the Scenes

```
1. User submits "Join as Tutor" form
   ↓
2. FormSubmission created with status "new"
   ↓
3. Admin sees application in Admin Panel
   ↓
4. Admin clicks Accept + sets hourly rate
   ↓
5. System creates:
   - User account (if doesn't exist)
   - Tutor profile (marked as active)
   ↓
6. TutorList fetches active tutors from database
   ↓
7. Tutor displayed on website
```

---

## Database Collections Involved

1. **FormSubmission** - Stores all tutor applications
2. **User** - User accounts with role (student/tutor/admin)
3. **Tutor** - Tutor profiles with details, rate, experience

---

## Features Included

✅ Tutor application form with validation  
✅ Admin authentication & authorization  
✅ Application review panel with accept/reject  
✅ Automatic tutor profile creation  
✅ Real-time display on website  
✅ Dashboard statistics  
✅ Application status tracking  
✅ Hourly rate configuration  

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Admin login failed | Check credentials: `sde1rajat@gmail.com` / `Admin@123456` |
| Tutor not appearing | Check if tutor was accepted (status should be "reviewed") |
| Form submission error | Check API server is running on port 5001 |
| Applications not loading | Ensure authentication token is valid |

---

## Port Configuration

- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5001` (or as configured in apiClient.js)

Make sure both are running for the full flow to work!

