import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Register() {
  return (
    <div className="page active" id="register">
      <div className="auth-page">
        <div className="card auth-card">
          <div className="auth-head">
            <h2>Create Account</h2>
            <p>Register as a retired NALCO employee</p>
          </div>
          <div className="auth-body">
            <img src={logoImg} width="200" alt="NALCO Logo" className="auth-logo" />
            <input className="input" placeholder="First Name" />
            <input className="input" placeholder="Last Name" />
            <input className="input" placeholder="Employee Number" />
            <input className="input" type="date" />
            <input className="input" placeholder="Mobile Number" />
            <input className="input" type="password" placeholder="Create Password" />
            <button className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
            <div className="back-home">
              <Link to="/login">Already Registered? Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
