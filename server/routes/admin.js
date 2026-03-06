const express = require('express');
const FormSubmission = require('../models/FormSubmission');
const User = require('../models/User');
const Tutor = require('../models/Tutor');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Get all tutor applications (admin only)
router.get('/tutor-applications', async (req, res) => {
  try {
    const applications = await FormSubmission.find({
      formType: { $in: ['tutor_application', 'tutor_search'] }
    }).sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single application
router.get('/tutor-applications/:id', async (req, res) => {
  try {
    const application = await FormSubmission.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Accept tutor application and create tutor profile
router.post('/accept-tutor/:id', async (req, res) => {
  try {
    const { hourlyRate } = req.body;
    const applicationId = req.params.id;

    // Get the application
    const application = await FormSubmission.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.formType !== 'tutor_application') {
      return res.status(400).json({ message: 'This is not a tutor application' });
    }

    // Check if user already exists with this email
    let user = await User.findOne({ email: application.email });

    if (!user) {
      // Create new user
      user = new User({
        name: application.name,
        email: application.email,
        phone: application.phone,
        role: 'tutor',
        password: Math.random().toString(36).slice(2), // Temporary password
      });
      await user.save();
    } else {
      // Update existing user role
      user.role = 'tutor';
      user.phone = application.phone || user.phone;
      await user.save();
    }

    // Check if tutor profile already exists
    let tutor = await Tutor.findOne({ userId: user._id });

    if (!tutor) {
      // Create tutor profile from application
      const expertise = application.subject
        ? application.subject.split(',').map(s => s.trim())
        : [];

      tutor = new Tutor({
        userId: user._id,
        qualifications: application.subject || 'Not specified',
        expertise: expertise,
        experience: parseInt(application.message?.split('experience')[1]?.split('year')[0]?.trim()) || 0,
        hourlyRate: hourlyRate || 500,
        availability: 'To be discussed',
        bio: application.message || '',
        isActive: true,
      });

      await tutor.save();
    }

    // Update application status
    application.status = 'reviewed';
    application.adminNotes = `Accepted and created tutor profile. Tutor ID: ${tutor._id}`;
    await application.save();

    res.json({
      message: 'Tutor application accepted successfully',
      user,
      tutor,
    });
  } catch (error) {
    console.error('Error accepting tutor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reject tutor application
router.post('/reject-tutor/:id', async (req, res) => {
  try {
    const { reason } = req.body;
    const applicationId = req.params.id;

    const application = await FormSubmission.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update application status
    application.status = 'resolved';
    application.adminNotes = `Rejected. Reason: ${reason || 'No reason provided'}`;
    await application.save();

    res.json({
      message: 'Tutor application rejected',
      application,
    });
  } catch (error) {
    console.error('Error rejecting tutor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalApplications = await FormSubmission.countDocuments({
      formType: { $in: ['tutor_application', 'tutor_search'] }
    });
    
    const pendingApplications = await FormSubmission.countDocuments({
      formType: 'tutor_application',
      status: 'new'
    });
    
    const acceptedTutors = await Tutor.countDocuments({ isActive: true });
    
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const tutorUsers = await User.countDocuments({ role: 'tutor' });
    const studentUsers = await User.countDocuments({ role: 'student' });

    res.json({
      applications: {
        total: totalApplications,
        pending: pendingApplications,
      },
      tutors: {
        active: acceptedTutors,
      },
      users: {
        total: totalUsers,
        admin: adminUsers,
        tutor: tutorUsers,
        student: studentUsers,
      },
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
