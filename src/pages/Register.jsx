import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';
import bgImage from '../assets/g4.jpg';
import { sendOtp, registerUser, resendOtp } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeNumber: '',
    dob: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isSubmittingRef = useRef(false);

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length > 0) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[@$!%*?&]/.test(password)) score += 1;
    return score;
  };

  const getStrengthColor = (score) => {
    if (score === 0) return 'transparent';
    if (score <= 2) return '#ff4d4d'; // Weak
    if (score <= 4) return '#ffd24d'; // Fair
    if (score === 5) return '#a3ff4d'; // Good
    return '#00e600'; // Strong
  };

  const getStrengthLabel = (score) => {
    if (score === 0) return '';
    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Fair';
    if (score === 5) return 'Good';
    return 'Strong';
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeNumber || !/^\d+$/.test(formData.employeeNumber)) {
      newErrors.employeeNumber = 'Retired employee number is required (numbers only).';
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    } else {
      const dobDate = new Date(formData.dob);
      const diff_ms = Date.now() - dobDate.getTime();
      const age_dt = new Date(diff_ms);
      const age = Math.abs(age_dt.getUTCFullYear() - 1970);
      if (age <= 40) {
        newErrors.dob = 'You must be strictly above 40 years old to register.';
      }
    }
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number is required (exactly 10 digits).';
    }
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'A valid email is required.';
    }
    if (!formData.password || !validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 chars, with 1 uppercase, 1 lowercase, 1 number, and 1 special char.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    if (!validateForm()) return;

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA.');
      return;
    }

    isSubmittingRef.current = true;
    setIsLoading(true);
    try {
      // Send OTP to email
      await sendOtp(formData.email, captchaToken);
      toast.success('OTP sent to your email!');
      setShowOtpModal(true);
      setCooldown(60);
    } catch (error) {
      console.error('sendOtp error:', error);
      toast.error(error.response?.data?.message || `Error: ${error.message || 'Failed to send OTP.'}`);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }

    setIsLoading(true);
    try {
      // Complete registration with OTP
      await registerUser({
        ...formData,
        otp,
      });
      
      toast.success('Account created successfully!');
      setShowOtpModal(false);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (cooldown > 0 && showOtpModal) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown, showOtpModal]);

  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    try {
      await resendOtp(formData.email);
      toast.success('OTP resent!');
      setCooldown(60);
    } catch (error) {
      toast.error('Failed to resend OTP.');
    }
  };

  return (
    <div className="page active" id="register">
      <ToastContainer />
      <div className="auth-page">
        <div className="card auth-card" style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.3rem', color: '#000000' }}>Create Your Account</h2>
          <div className="auth-body">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#1d2f60' }}>Retired Employee Number</label>
                <input name="employeeNumber" className="input" placeholder="Retired Employee Number" value={formData.employeeNumber} onChange={handleChange} />
                {errors.employeeNumber && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.employeeNumber}</span>}
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#1d2f60' }}>Date of Birth</label>
                <input name="dob" className="input" type="date" value={formData.dob} onChange={handleChange} />
                {errors.dob && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.dob}</span>}
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#1d2f60' }}>Mobile Number</label>
                <input name="mobile" className="input" placeholder="Mobile Number (10 digits)" value={formData.mobile} onChange={handleChange} />
                {errors.mobile && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.mobile}</span>}
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#1d2f60' }}>Email Address</label>
                <input name="email" className="input" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
              </div>

              <div className="form-group" style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#1d2f60' }}>Create Password</label>
                <input 
                  name="password" 
                  className="input" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Create Password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  style={{ width: '100%', paddingRight: '2.5rem', marginBottom: '4px' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {formData.password && (
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: getStrengthColor(getPasswordStrength(formData.password)), marginBottom: '4px' }}>
                    Password Strength: {getStrengthLabel(getPasswordStrength(formData.password))}
                  </div>
                )}
                {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}
              </div>

              <div className="form-group" style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#1d2f60' }}>Confirm Password</label>
                <input 
                  name="confirmPassword" 
                  className="input" 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  style={{ width: '100%', paddingRight: '2.5rem' }}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.confirmPassword && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.confirmPassword}</span>}
              </div>

              <div className="form-group" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Create Account'}
              </button>
            </form>

            <div className="back-home" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Already Registered? Sign In</Link>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
            <h3>Verify Email</h3>
            <p style={{ margin: '1rem 0', fontSize: '0.9rem', color: '#555' }}>Enter the 6-digit OTP sent to {formData.email}</p>
            
            <input 
              type="text" 
              maxLength="6" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.2rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            
            <button 
              onClick={handleOtpSubmit}
              disabled={isLoading || otp.length !== 6}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}
            >
              {isLoading ? 'Verifying...' : 'Verify & Register'}
            </button>
            
            <div>
              <button 
                onClick={handleResendOtp} 
                disabled={cooldown > 0 || isLoading}
                style={{ background: 'none', border: 'none', color: cooldown > 0 ? '#aaa' : '#007bff', cursor: cooldown > 0 ? 'not-allowed' : 'pointer', textDecoration: 'underline' }}
              >
                {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
              </button>
            </div>
            
            <button onClick={() => setShowOtpModal(false)} style={{ background: 'none', border: 'none', color: '#888', marginTop: '1rem', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
