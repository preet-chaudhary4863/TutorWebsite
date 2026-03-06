const express = require('express');
const Tutor = require('../models/Tutor');
const User = require('../models/User');

const router = express.Router();

// Get all tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find({ isActive: true })
      .populate('userId', 'name email profileImage bio phone')
      .sort({ rating: -1 });
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tutor by ID
router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id).populate(
      'userId',
      'name email profileImage bio phone'
    );

    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    res.json(tutor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create tutor profile
router.post('/', async (req, res) => {
  try {
    const { userId, qualifications, expertise, experience, hourlyRate, availability, bio } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if tutor profile already exists
    let tutor = await Tutor.findOne({ userId });
    if (tutor) {
      return res.status(400).json({ message: 'Tutor profile already exists' });
    }

    tutor = new Tutor({
      userId,
      qualifications,
      expertise,
      experience,
      hourlyRate,
      availability,
      bio,
    });

    await tutor.save();

    // Update user role
    user.role = 'tutor';
    await user.save();

    res.status(201).json({
      message: 'Tutor profile created',
      tutor,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update tutor profile
router.put('/:id', async (req, res) => {
  try {
    const { qualifications, expertise, experience, hourlyRate, availability, bio } = req.body;

    const tutor = await Tutor.findByIdAndUpdate(
      req.params.id,
      {
        qualifications,
        expertise,
        experience,
        hourlyRate,
        availability,
        bio,
      },
      { new: true }
    ).populate('userId', 'name email profileImage bio phone');

    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    res.json({
      message: 'Tutor profile updated',
      tutor,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
