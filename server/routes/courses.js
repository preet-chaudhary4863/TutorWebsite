const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('tutorId', 'qualifications expertise')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'tutorId',
      'qualifications expertise'
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create course
router.post('/', async (req, res) => {
  try {
    const { title, description, tutorId, category, level, price, duration, content } = req.body;

    const course = new Course({
      title,
      description,
      tutorId,
      category,
      level,
      price,
      duration,
      content,
    });

    await course.save();

    res.status(201).json({
      message: 'Course created',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course updated',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enroll student in course
router.post('/:id/enroll', async (req, res) => {
  try {
    const { userId } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          studentsEnrolled: {
            userId,
            enrolledAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Enrolled in course',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
