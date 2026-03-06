const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Admin credentials
    const adminEmail = 'sde1rajat@gmail.com';
    const adminPassword = 'Admin@123456';
    const adminName = 'Admin User';

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });
    if (admin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`Email: ${admin.email}`);
      console.log(`Role: ${admin.role}`);
      console.log(`Name: ${admin.name}`);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(adminPassword, salt);

    // Create admin user
    admin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });

    await admin.save();

    console.log('✅ Admin account created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('─────────────────────────────────────');
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`Role:     admin`);
    console.log('─────────────────────────────────────');
    console.log('\n🔗 Next steps:');
    console.log('1. Go to: http://localhost:5173/admin-login');
    console.log('2. Login with the credentials above');
    console.log('3. Access the admin panel at: http://localhost:5173/admin');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up admin:', error.message);
    process.exit(1);
  }
}

setupAdmin();
