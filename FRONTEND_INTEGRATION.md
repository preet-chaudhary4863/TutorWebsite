# React Frontend Integration Guide

## Setup Complete! ✅

Your React frontend is now connected to the MongoDB server.

### Files Created:
1. **`src/api/apiClient.js`** - All API calls (Auth, Forms, Tutors, Courses)
2. **`src/context/AuthContext.jsx`** - User authentication state management
3. **`src/components/ContactForm.jsx`** - Example contact form using API
4. **`src/main.jsx`** - Updated with AuthProvider

## How to Use

### 1. Authentication
```javascript
import { useAuth } from './context/AuthContext';

function LoginPage() {
  const { login, user, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password123');
      // User is now logged in
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      {user && <p>Welcome, {user.name}!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

### 2. Submit Forms
```javascript
import { formAPI } from './api/apiClient';

const submitContact = async () => {
  try {
    await formAPI.submitForm(
      'John Doe',
      'john@example.com',
      '1234567890',
      'Question',
      'Hello, I have a question...',
      'contact'
    );
    alert('Form submitted!');
  } catch (error) {
    alert('Error: ' + error.message);
  }
};
```

### 3. Get All Tutors
```javascript
import { tutorAPI } from './api/apiClient';
import { useEffect, useState } from 'react';

function TutorList() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    tutorAPI.getAllTutors().then(setTutors);
  }, []);

  return (
    <div>
      {tutors.map(tutor => (
        <div key={tutor._id}>
          <h3>{tutor.userId?.name}</h3>
          <p>₹{tutor.hourlyRate}/hr</p>
        </div>
      ))}
    </div>
  );
}
```

### 4. Get All Courses
```javascript
import { courseAPI } from './api/apiClient';

const courses = await courseAPI.getAllCourses();
console.log(courses);
```

## Important Notes

⚠️ **Make sure the server is running:**
```bash
cd server
npm run dev
```

⚠️ **CORS is enabled** on the server for `http://localhost:5173` (Vite default)

⚠️ **Authentication token** is stored in `localStorage` automatically

⚠️ **Change API_URL** in `src/api/apiClient.js` when deploying to production

## Next Steps

1. ✅ Start your server: `npm run dev` (in `/server`)
2. ✅ Start your frontend: `npm run dev` (in `/Tutor`)
3. Create Login/Register pages using `useAuth()` hook
4. Create Tutor profile pages
5. Create course enrollment system
6. Add admin dashboard for form submissions

## API Endpoints Reference

See `/server/README.md` for all available endpoints.

---
Everything is ready! Your MongoDB database is now connected to your React frontend! 🚀
