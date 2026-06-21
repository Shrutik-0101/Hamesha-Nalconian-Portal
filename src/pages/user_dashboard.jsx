import React from 'react';
import { 
  Power, Calendar, Search, Lock, Gift, Phone, Bell, 
  Calculator, CreditCard, Wallet 
} from 'lucide-react';
import './user_dashboard.css';

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-placeholder">NALCO</div>
          <div className="welcome-text">
            Welcome back,
            <strong>Biswanath Rout</strong>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#">Dashboard</a>
          <a href="#">Medical</a>
          <a href="#">Grievances</a>
          <a href="#">ePublications</a>
          <a href="#">Application Forms</a>
          <a href="#">Policies &amp; Docs</a>
          <a href="#">Rules &amp; Circulars</a>
          <button className="logout-btn" title="Logout">
            <Power size={20} />
          </button>
        </nav>
      </header>

      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          <div className="profile-card">
            <div className="profile-img-container">
              <img src="src/assets/user.jpg" alt="Profile" className="profile-img" />
            </div>
            <div className="profile-help-text">
              Click on image to view your profile and submit changes
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <button className="sidebar-btn"><Calendar size={18} /> Holiday List</button>
            <button className="sidebar-btn"><Search size={18} /> Find Friends</button>
            <button className="sidebar-btn"><Lock size={18} /> Change Password</button>
            <button className="sidebar-btn"><Gift size={18} /> Birthday List</button>
            <button className="sidebar-btn"><Phone size={18} /> Emergency Contact</button>
            <button className="sidebar-btn"><Bell size={18} /> SOS contact</button>
            <button className="sidebar-btn"><Calculator size={18} /> EPS Calculation</button>
          </nav>
        </aside>

        <main className="dashboard-content">
          <div className="section-card">
            <div className="section-header">Post-Retirement Medical Benefit Validity</div>
            <div className="benefit-grid">
              <div className="benefit-item">
                <div className="benefit-item-content">
                  <div className="benefit-label"><Calendar size={16}/> Membership Validity Date</div>
                  <div className="benefit-value">31-03-2027</div>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-item-content">
                  <div className="benefit-label"><CreditCard size={16}/> Amount Paid</div>
                  <div className="benefit-value">₹0.00</div>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-item-content">
                  <div className="benefit-label"><Wallet size={16}/> OPD Limit</div>
                  <div className="benefit-value">₹120,900.00</div>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-item-content">
                  <div className="benefit-label"><Wallet size={16}/> Balance Available</div>
                  <div className="benefit-value">₹120,900.00</div>
                  <span className="benefit-subtext">As On: 13-05-2026</span>
                </div>
              </div>
            </div>
            <div className="fine-print">
              *Based on claims registered
            </div>
          </div>
        </main>
      </div>
      <footer className="footer-text">
        © 2026, NALCO India. All Rights Reserved
      </footer>
    </div>
  );
};

export default UserDashboard;
