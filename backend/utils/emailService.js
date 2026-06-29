import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  return transporter;
};

export const sendOtpEmail = async (to, otp) => {
  try {
    const t = await getTransporter();
    const info = await t.sendMail({
      from: '"HAMESHA NALCONIAN (NALCO)" <noreply@nalco.com>',
      to,
      subject: 'Your OTP for NALCO Portal Registration',
      text: `Your OTP for registration is ${otp}. It will expire in 5 minutes.`,
      html: `<b>Your OTP for registration is ${otp}. It will expire in 5 minutes.</b>`,
    });
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
