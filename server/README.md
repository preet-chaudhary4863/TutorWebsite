# Tutor Server Documentation

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure MongoDB
- Create a MongoDB account at [mongodb.com](https://www.mongodb.com)
- Create a cluster and get your connection string
- Update `.env` file with your MongoDB URI:
  ```
  MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/tutordb
  JWT_SECRET=your_secret_key_here
  PORT=5000
  ```

### 3. Start the Server
```bash
npm run dev  # Development with hot reload
npm start    # Production
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user profile

### Forms (`/api/forms`)
- `POST /submit` - Submit contact/inquiry form
- `GET /submissions` - Get all form submissions (admin)
- `PUT /submissions/:id` - Update submission status (admin)

### Tutors (`/api/tutors`)
- `GET /` - Get all tutors
- `GET /:id` - Get tutor details
- `POST /` - Create tutor profile
- `PUT /:id` - Update tutor profile

### Courses (`/api/courses`)
- `GET /` - Get all published courses
- `GET /:id` - Get course details
- `POST /` - Create course
- `PUT /:id` - Update course
- `POST /:id/enroll` - Enroll student in course

## Database Schema

### User
- name, email, password (hashed)
- phone, role (student/tutor/admin)
- profileImage, bio, isVerified

### Tutor
- userId (reference to User)
- qualifications, expertise[], experience, hourlyRate
- availability, bio, rating, reviews[], isActive

### Course
- title, description, category, level
- tutorId (reference to Tutor), price, duration
- content[], studentsEnrolled[], rating, isPublished

### FormSubmission
- name, email, phone, subject, message
- formType (contact/inquiry/booking/feedback)
- status (new/reviewed/resolved), adminNotes
