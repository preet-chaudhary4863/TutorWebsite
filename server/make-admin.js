// Script to make a user an admin
// Run this in the MongoDB shell or use a Node.js script to make an existing user an admin

const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function makeUserAdmin(email) {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found`);
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log(`✅ User ${email} is now an admin!`);
    console.log(`User details:`, {
      name: user.name,
      email: user.email,
      role: user.role,
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.log('Usage: node make-admin.js <email>');
  console.log('Example: node make-admin.js admin@example.com');
  process.exit(1);
}

makeUserAdmin(email);
