import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Login() {
  return (
    <div className="page active" id="login">
      <div className="auth-page">
        <div className="card auth-card">
          <div className="auth-head">
            <h2>Welcome Back</h2>
            <p>Sign in to your portal account</p>
          </div>
          <div className="auth-body">
            <img src={logoImg} width="200" alt="NALCO Logo" className="auth-logo" />
            <input className="input" placeholder="Employee Number" />
            <input className="input" type="password" placeholder="Password" />
            <button className="btn btn-primary" style={{ width: '100%' }}>Login</button>
            <div className="back-home">
              <Link to="/">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
