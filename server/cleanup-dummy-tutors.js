const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Tutor = require('./models/Tutor');

async function removeDummyTutors() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected');

    // List of dummy tutor emails to remove
    const dummyEmails = [
      'rajesh.kumar@tutor.com',
      'priya.singh@tutor.com',
      'amit.patel@tutor.com',
      'neha.verma@tutor.com',
      'vikram.singh@tutor.com',
      'anjali.sharma@tutor.com',
      'sanjay.sharma@tutor.com',
      'pooja.gupta@tutor.com',
    ];

    // Find and delete dummy tutors
    const dummyUsers = await User.find({ email: { $in: dummyEmails } });
    
    if (dummyUsers.length === 0) {
      console.log('✓ No dummy tutors found in database');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Delete their tutor profiles
    for (const user of dummyUsers) {
      await Tutor.deleteMany({ userId: user._id });
      console.log(`✓ Deleted tutor profile for: ${user.name}`);
    }

    // Delete the user accounts
    const deletedUsers = await User.deleteMany({ email: { $in: dummyEmails } });
    console.log(`✓ Deleted ${deletedUsers.deletedCount} dummy user accounts`);

    console.log('\n✅ Cleanup complete!');
    console.log('\nDatabase is now clean with NO dummy tutors.');
    console.log('Only real tutors accepted via admin panel will be shown.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error removing dummy tutors:', error);
    process.exit(1);
  }
}

removeDummyTutors();
