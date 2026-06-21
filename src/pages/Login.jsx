import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';
import bgImage from '../assets/g4.jpg';
import { loginUser } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeNumber || !/^\d+$/.test(formData.employeeNumber)) {
      newErrors.employeeNumber = 'Retired Employee Number is required (numbers only).';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
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
    if (!validateForm()) return;

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginUser({ ...formData, captchaToken });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login successful!');

      setTimeout(() => {
        if (data.user?.role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page active" id="login">
      <ToastContainer />
      <div className="auth-page">
        <div className="card auth-card" style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.3rem', color: '#1d2f60' }}>Login to Your Account</h2>
          <div className="auth-body">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#1d2f60' }}>Retired Employee Number</label>
                <input
                  name="employeeNumber"
                  className="input"
                  placeholder="Retired Employee Number"
                  value={formData.employeeNumber}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem' }}
                />
                {errors.employeeNumber && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.employeeNumber}</span>}
              </div>

              <div className="form-group" style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#1d2f60' }}>Password</label>
                <input
                  name="password"
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '15px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}
              </div>

              <div className="form-group" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '1rem' }} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="back-home" style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Don't have an account? Register</Link>
              <Link to="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
