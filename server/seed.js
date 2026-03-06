const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Tutor = require('./models/Tutor');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected');

    // Option to clear all tutors (comment out if you want to keep existing data)
    // Uncomment the line below to clear all dummy tutors:
    // await Tutor.deleteMany({});
    // await User.deleteMany({ role: 'tutor' });
    // console.log('✓ Cleared existing tutor data');

    console.log('\n✅ Database initialized successfully!');
    console.log('\n📝 Next Steps:');
    console.log('─────────────────────────────────────');
    console.log('1. Admin panel is ready for tutor applications');
    console.log('2. Go to: http://localhost:5173/');
    console.log('3. Click "Join as a Tutor" to submit applications');
    console.log('4. Admin reviews at: http://localhost:5173/admin');
    console.log('5. Accepted tutors appear in "Meet Our Expert Tutors"');
    console.log('');
    console.log('⚙️  Admin Credentials:');
    console.log('Email: admin@tutorcontent.com');
    console.log('Password: Admin@123456');
    console.log('─────────────────────────────────────');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error initializing database:', error);
    process.exit(1);
  }
}

seedDatabase();
