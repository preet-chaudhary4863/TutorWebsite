const express = require('express');
const FormSubmission = require('../models/FormSubmission');

const router = express.Router();

// Submit form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, contactNumber, subject, message, formType } = req.body;

    // Validate required fields
    if (!name || !email || !subject) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, subject' 
      });
    }

    const formSubmission = new FormSubmission({
      name,
      email,
      phone: phone || contactNumber,
      subject,
      message: message || '',
      formType: formType || 'contact',
    });

    await formSubmission.save();

    res.status(201).json({
      message: 'Form submitted successfully',
      id: formSubmission._id,
      submission: formSubmission,
    });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      details: error.errors || null
    });
  }
});

// Get all submissions (admin)
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update submission status
router.put('/submissions/:id', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );

    res.json({
      message: 'Submission updated',
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
