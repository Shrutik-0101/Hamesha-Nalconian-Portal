import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  const isDummy = !process.env.SMTP_USER || process.env.SMTP_USER === 'your_ethereal_email_here';

  if (isDummy) {
    console.log('Generating ethereal test account...');
    const testAccount = await nodemailer.createTestAccount();
    console.log('-----------------------------------------');
    console.log('ETHEREAL TEST EMAIL CREDENTIALS');
    console.log(`Login URL: https://ethereal.email/login`);
    console.log(`Username:  ${testAccount.user}`);
    console.log(`Password:  ${testAccount.pass}`);
    console.log('-----------------------------------------');
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

export const sendOtpEmail = async (to, otp) => {
  try {
    const t = await getTransporter();
    const info = await t.sendMail({
      from: '"NALCO Portal" <noreply@nalco.com>',
      to,
      subject: 'Your OTP for NALCO Portal Registration',
      text: `Your OTP for registration is ${otp}. It will expire in 5 minutes.`,
      html: `<b>Your OTP for registration is ${otp}. It will expire in 5 minutes.</b>`,
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Initialize email service on startup to log credentials
getTransporter().catch(console.error);
