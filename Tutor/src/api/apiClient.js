// API configuration - Use environment variable for flexibility
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// Helper function for API calls
const apiCall = async (endpoint, method = "GET", data = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    // Add body if POST/PUT
    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "API Error");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: (name, email, password, role = "student") =>
    apiCall("/auth/register", "POST", { name, email, password, role }),

  login: (email, password) =>
    apiCall("/auth/login", "POST", { email, password }),

  getCurrentUser: () => apiCall("/auth/me", "GET"),

  requestOTP: (email) => apiCall("/auth/request-otp", "POST", { email }),

  verifyOTP: (email, otp) =>
    apiCall("/auth/verify-otp", "POST", { email, otp }),

  changePassword: (oldPassword, newPassword, confirmPassword) =>
    apiCall("/auth/change-password", "POST", {
      oldPassword,
      newPassword,
      confirmPassword,
    }),

  resetPassword: (email, otp, newPassword, confirmPassword) =>
    apiCall("/auth/reset-password", "POST", {
      email,
      otp,
      newPassword,
      confirmPassword,
    }),
};

// Form API calls
export const formAPI = {
  submitForm: (name, email, phone, subject, message, formType = "contact") =>
    apiCall("/forms/submit", "POST", {
      name,
      email,
      phone,
      subject,
      message,
      formType,
    }),

  getSubmissions: () => apiCall("/forms/submissions", "GET"),

  updateSubmission: (id, status, adminNotes) =>
    apiCall(`/forms/submissions/${id}`, "PUT", { status, adminNotes }),
};

// Tutor API calls
export const tutorAPI = {
  getAllTutors: () => apiCall("/tutors", "GET"),

  getTutorById: (id) => apiCall(`/tutors/${id}`, "GET"),

  createTutorProfile: (
    userId,
    qualifications,
    expertise,
    experience,
    hourlyRate,
    availability,
    bio
  ) =>
    apiCall("/tutors", "POST", {
      userId,
      qualifications,
      expertise,
      experience,
      hourlyRate,
      availability,
      bio,
    }),

  updateTutorProfile: (id, data) => apiCall(`/tutors/${id}`, "PUT", data),
};

// Course API calls
export const courseAPI = {
  getAllCourses: () => apiCall("/courses", "GET"),

  getCourseById: (id) => apiCall(`/courses/${id}`, "GET"),

  createCourse: (
    title,
    description,
    tutorId,
    category,
    level,
    price,
    duration,
    content
  ) =>
    apiCall("/courses", "POST", {
      title,
      description,
      tutorId,
      category,
      level,
      price,
      duration,
      content,
    }),

  updateCourse: (id, data) => apiCall(`/courses/${id}`, "PUT", data),

  enrollCourse: (id, userId) =>
    apiCall(`/courses/${id}/enroll`, "POST", { userId }),
};

// Admin API calls
export const adminAPI = {
  getTutorApplications: () => apiCall("/admin/tutor-applications", "GET"),

  getApplicationById: (id) => apiCall(`/admin/tutor-applications/${id}`, "GET"),

  acceptTutor: (id, hourlyRate) =>
    apiCall(`/admin/accept-tutor/${id}`, "POST", { hourlyRate }),

  rejectTutor: (id, reason) =>
    apiCall(`/admin/reject-tutor/${id}`, "POST", { reason }),

  getAllSubmissions: () => apiCall("/admin/submissions", "GET"),

  getDashboardStats: () => apiCall("/admin/stats", "GET"),
};

export default {
  authAPI,
  formAPI,
  tutorAPI,
  courseAPI,
  adminAPI,
};
