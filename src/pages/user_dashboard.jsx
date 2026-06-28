import React, { useState, useEffect } from 'react';
import { 
  Power, Calendar, Search, Lock, Gift, Phone, Bell, 
  Calculator, CreditCard, Wallet 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMyEmployeeDetails } from '../services/employeeService';
import './user_dashboard.css';

const UserDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getMyEmployeeDetails();
        setEmployee(data);
      } catch (error) {
        console.error('Failed to fetch employee details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-placeholder">NALCO</div>
          <div className="welcome-text">
            Welcome back,
            <strong>{employee ? employee.name : 'Loading...'}</strong>
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
          <button className="logout-btn" title="Logout" onClick={handleLogout}>
            <Power size={20} />
          </button>
        </nav>
      </header>

      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          <div className="profile-card">
            <div className="profile-img-container">
              <img src={employee?.photo || "src/assets/user.jpg"} alt="Profile" className="profile-img" />
            </div>
            <div className="profile-info" style={{ textAlign: 'center', marginTop: '10px' }}>
              <div style={{ fontWeight: 'bold' }}>{employee?.name || 'N/A'}</div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>{employee?.position || 'N/A'}</div>
              <div style={{ fontSize: '0.8em', color: '#888', marginTop: '5px' }}>
                DOB: {employee?.dob ? new Date(employee.dob).toLocaleDateString() : 'N/A'}
              </div>
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
