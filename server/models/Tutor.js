const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    expertise: [String], // e.g., ['Math', 'Physics', 'Chemistry']
    experience: {
      type: Number, // in years
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    availability: {
      type: String, // e.g., 'Mon-Fri: 9AM-5PM'
    },
    bio: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        createdAt: Date,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tutor', tutorSchema);
