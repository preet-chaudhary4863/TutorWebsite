const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api';

async function testOTPFlow() {
  console.log('🧪 Testing OTP Password Reset Flow\n');
  
  const testEmail = 'sde1rajat@gmail.com';
  
  try {
    // Step 1: Request OTP
    console.log('📧 Step 1: Requesting OTP...');
    const otpResponse = await axios.post(`${API_BASE_URL}/auth/request-otp`, {
      email: testEmail,
    });
    
    console.log('✅ OTP requested successfully!');
    console.log('Response:', otpResponse.data);
    console.log(`\n📧 Check email: ${testEmail} for the OTP\n`);
    
    // For testing purposes, we'll get the OTP from the database
    const mongoose = require('mongoose');
    require('dotenv').config();
    
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;
    
    // Query the OTP directly from database
    const otpDoc = await db.collection('otps').findOne(
      { email: testEmail },
      { sort: { createdAt: -1 } }
    );
    
    if (!otpDoc) {
      console.log('❌ No OTP found in database');
      await db.disconnect();
      return;
    }
    
    const generatedOTP = otpDoc.otp;
    console.log(`🔐 Retrieved OTP from database: ${generatedOTP}`);
    console.log(`⏱️  OTP expires at: ${otpDoc.expiresAt}\n`);
    
    // Step 2: Verify OTP
    console.log('📋 Step 2: Verifying OTP...');
    const verifyResponse = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
      email: testEmail,
      otp: generatedOTP,
    });
    
    console.log('✅ OTP verified successfully!');
    console.log('Response:', verifyResponse.data);
    const tempToken = verifyResponse.data.token;
    console.log(`\n🎫 Temporary token received: ${tempToken.substring(0, 20)}...\n`);
    
    // Step 3: Reset Password
    console.log('🔑 Step 3: Resetting password...');
    const resetResponse = await axios.post(
      `${API_BASE_URL}/auth/reset-password`,
      {
        email: testEmail,
        otp: generatedOTP,
        newPassword: 'TestPassword123',
        confirmPassword: 'TestPassword123',
      }
    );
    
    console.log('✅ Password reset successfully!');
    console.log('Response:', resetResponse.data);
    console.log('\n✨ OTP Flow Test Completed Successfully!\n');
    
    await db.disconnect();
  } catch (error) {
    console.error('❌ Error during OTP flow test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testOTPFlow();
