import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { sendOtpEmail } from '../utils/emailService.js';

// Helper to generate 6 digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (req, res) => {
  try {
    const { email, captchaToken } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Validate captcha
    if (!captchaToken) {
      return res.status(400).json({ message: 'CAPTCHA token is required' });
    }
    let recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaToken}`;
    const captchaResponse = await axios.post(captchaVerifyUrl);
    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    // Generate OTP
    const otpCode = generateOtp();
    // Expiry: 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save/Update OTP in DB
    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, expiresAt },
      { upsert: true, new: true }
    );

    // Send email
    const emailSent = await sendOtpEmail(email, otpCode);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req, res) => {
  try {
    const { employeeNumber, dob, mobile, email, password, otp } = req.body;

    // Verify OTP again just to be secure before creating user
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp || new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ message: 'Invalid or expired OTP. Please verify again.' });
    }

    // Check if user already exists (employee number or email)
    const existingUser = await User.findOne({ $or: [{ employeeNumber }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this Employee Number or Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      employeeNumber,
      dob,
      mobile,
      email,
      password: hashedPassword,
      isVerified: true,
    });

    await newUser.save();

    // Delete OTP record after successful registration
    await Otp.deleteOne({ email });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { employeeNumber, password, captchaToken } = req.body;

    if (!employeeNumber || !password) {
      return res.status(400).json({ message: 'Employee number and password are required' });
    }

    if (!captchaToken) {
      return res.status(400).json({ message: 'CAPTCHA token is required' });
    }

    let recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaToken}`;
    
    const captchaResponse = await axios.post(captchaVerifyUrl);
    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    // Find user
    const user = await User.findOne({ employeeNumber });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user._id,
        employeeNumber: user.employeeNumber,
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        employeeNumber: user.employeeNumber,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingOtp = await Otp.findOne({ email });
    if (!existingOtp) {
      return res.status(400).json({ message: 'No pending OTP request found. Please register again.' });
    }

    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, expiresAt },
      { upsert: true, new: true }
    );

    const emailSent = await sendOtpEmail(email, otpCode);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to resend OTP email' });
    }

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Resend OTP Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
