const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    formType: {
      type: String,
      enum: ['contact', 'inquiry', 'booking', 'feedback', 'tutor_application', 'tutor_search'],
      default: 'contact',
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'resolved'],
      default: 'new',
    },
    adminNotes: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);
