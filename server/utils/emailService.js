const nodemailer = require('nodemailer');

// Create transporter (configure with your email service)
let transporter;

// Check if email credentials are configured
if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your-email@gmail.com') {
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
} else {
  // Test mode - log OTP to console instead of sending email
  transporter = null;
}

// Send OTP email
const sendOTPEmail = async (email, otp, purpose = 'password-reset') => {
  try {
    let subject = '';
    let text = '';
    let html = '';

    if (purpose === 'password-reset') {
      subject = 'Password Reset OTP - TutorConnect';
      text = `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`;
      html = `
        <h2>Password Reset Request</h2>
        <p>Your OTP is: <strong style="font-size: 24px; color: #007bff;">${otp}</strong></p>
        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `;
    } else if (purpose === 'email-verification') {
      subject = 'Email Verification OTP - TutorConnect';
      text = `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`;
      html = `
        <h2>Email Verification</h2>
        <p>Your OTP is: <strong style="font-size: 24px; color: #007bff;">${otp}</strong></p>
        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
      `;
    }

    // If no transporter, log to console (test mode)
    if (!transporter) {
      console.log('\n═══════════════════════════════════════════');
      console.log('📧 TEST MODE: OTP Email Would Be Sent');
      console.log('═══════════════════════════════════════════');
      console.log(`To: ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`\n🔐 OTP CODE: ${otp}`);
      console.log('═══════════════════════════════════════════\n');
      return true;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✓ OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to TutorConnect',
      html: `
        <h2>Welcome to TutorConnect, ${name}!</h2>
        <p>Your account has been successfully created.</p>
        <p>You can now login with your credentials and start learning with our expert tutors.</p>
        <p><a href="${process.env.FRONTEND_URL}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit TutorConnect</a></p>
      `,
    };

    if (!transporter) {
      console.log(`✓ Welcome email would be sent to ${email}`);
      return true;
    }

    await transporter.sendMail(mailOptions);
    console.log(`✓ Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail,
};
