import React from 'react';
import { 
  Power, Calendar, Search, Lock, Gift, Phone, Bell, 
  Calculator, CreditCard, Wallet 
} from 'lucide-react';
import './user_dashboard.css';

const UserDashboard = () => {
  const tableData = [
    { id: '2026-2027', claimDate: '27-05-2026', billNo: '213', billDate: '27-05-2026', amountClaim: '2599.00', billReptStatus: 'Received', billReptDate: '27-05-2026', medicalStatus: 'Under Scrutiny', medicalDate: '27-05-2026', financeStatus: 'Yet to Receive', financeDate: '', passedAmt: '' },
    { id: '2026-2027', claimDate: '27-05-2026', billNo: '214', billDate: '27-05-2026', amountClaim: '10465.00', billReptStatus: 'Received', billReptDate: '27-05-2026', medicalStatus: 'Under Scrutiny', medicalDate: '27-05-2026', financeStatus: 'Yet to Receive', financeDate: '', passedAmt: '' },
    { id: '2026-2027', claimDate: '27-05-2026', billNo: '215', billDate: '27-05-2026', amountClaim: '692.00', billReptStatus: 'Received', billReptDate: '27-05-2026', medicalStatus: 'Under Scrutiny', medicalDate: '27-05-2026', financeStatus: 'Yet to Receive', financeDate: '', passedAmt: '' },
    { id: '2026-2027', claimDate: '27-05-2026', billNo: '206', billDate: '27-05-2026', amountClaim: '1041.00', billReptStatus: 'Received', billReptDate: '27-05-2026', medicalStatus: 'Under Scrutiny', medicalDate: '27-05-2026', financeStatus: 'Yet to Receive', financeDate: '', passedAmt: '' },
    { id: '2026-2027', claimDate: '27-05-2026', billNo: '207', billDate: '27-05-2026', amountClaim: '4329.00', billReptStatus: 'Received', billReptDate: '27-05-2026', medicalStatus: 'Under Scrutiny', medicalDate: '27-05-2026', financeStatus: 'Yet to Receive', financeDate: '', passedAmt: '' },
    { id: '2026-2027', claimDate: '27-05-2026', billNo: '208', billDate: '27-05-2026', amountClaim: '2613.00', billReptStatus: 'Received', billReptDate: '27-05-2026', medicalStatus: 'Under Scrutiny', medicalDate: '27-05-2026', financeStatus: 'Yet to Receive', financeDate: '', passedAmt: '' },
    { id: '2026-2027', claimDate: '27-05-2026', billNo: '212', billDate: '27-05-2026', amountClaim: '10538.00', billReptStatus: 'Received', billReptDate: '27-05-2026', medicalStatus: 'Under Scrutiny', medicalDate: '27-05-2026', financeStatus: 'Yet to Receive', financeDate: '', passedAmt: '' },
    { id: '2025-2026', claimDate: '16-03-2026', billNo: '8690', billDate: '16-03-2026', amountClaim: '2749.00', billReptStatus: 'Received', billReptDate: '16-03-2026', medicalStatus: 'Forwarded to Finance', medicalDate: '15-04-2026', financeStatus: 'Bill Passed', financeDate: '22-04-2026', passedAmt: '538.00' },
    { id: '2025-2026', claimDate: '26-11-2025', billNo: '5009', billDate: '26-11-2025', amountClaim: '2017.00', billReptStatus: 'Received', billReptDate: '26-11-2025', medicalStatus: 'Forwarded to Finance', medicalDate: '04-12-2025', financeStatus: 'Bill Passed', financeDate: '08-12-2025', passedAmt: '2017.00' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-placeholder">NALCO</div>
          <div className="welcome-text">
            <div>Welcome</div>
            <div style={{ fontWeight: 'bold' }}>Biswanath Rout</div>
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
          <div className="profile-img-container">
            <img src="https://via.placeholder.com/150x180?text=Profile+Photo" alt="Profile" className="profile-img" />
          </div>
          <div className="profile-help-text">
            Click On Image to View Your Profile<br />and Submit Changes
          </div>
          
          <button className="sidebar-btn"><Calendar size={16} /> Holiday List</button>
          <button className="sidebar-btn"><Search size={16} /> Find Friends</button>
          <button className="sidebar-btn"><Lock size={16} /> Change Password</button>
          <button className="sidebar-btn"><Gift size={16} /> Birthday List</button>
          <button className="sidebar-btn"><Phone size={16} /> Emergency Contact</button>
          <button className="sidebar-btn"><Bell size={16} /> SOS contact</button>
          <button className="sidebar-btn"><Calculator size={16} /> EPS Calculation</button>
        </aside>

        <main className="dashboard-content">
          <div className="section-card">
            <div className="section-header">Post-Retirement Medical Benefit Validity</div>
            <div className="benefit-grid">
              <div className="benefit-item">
                <div className="benefit-label"><Calendar size={14}/> MEMBERSHIP VALIDITY DATE</div>
                <div className="benefit-value">31-03-2027</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-label"><CreditCard size={14}/> AMOUNT PAID</div>
                <div className="benefit-value">₹0.00</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-label"><Wallet size={14}/> OPD LIMIT</div>
                <div className="benefit-value">₹120900.00</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-label"><Wallet size={14}/> BALANCE AMOUNT AVAILABLE</div>
                <div className="benefit-value">₹120900.00</div>
                <span className="benefit-subtext">As On: 13-05-2026</span>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#d32f2f', padding: '0 20px 10px', textAlign: 'right', fontWeight: '500' }}>
              *Based On Claims As Listed Below
            </div>
          </div>

          <div className="section-card">
            <div className="section-header">Medical Reimbursement Status View</div>
            <div className="filter-section">
              <select className="filter-select">
                <option>ALL</option>
              </select>
            </div>
            
            <div className="table-controls">
              <div>
                Show 
                <select style={{ margin: '0 5px', padding: '2px 5px' }}>
                  <option>10</option>
                </select> 
                entries
              </div>
            </div>

            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th rowSpan="2">Online ID</th>
                    <th rowSpan="2">View</th>
                    <th rowSpan="2">Financial<br/>Year</th>
                    <th rowSpan="2">Claim Date</th>
                    <th rowSpan="2">Bill No</th>
                    <th rowSpan="2">Bill Date</th>
                    <th rowSpan="2">Amount<br/>Claim(₹)</th>
                    <th colSpan="2">Bill Rept</th>
                    <th colSpan="2">Medical Status</th>
                    <th colSpan="2">Finance Status</th>
                    <th rowSpan="2">Passed<br/>Amt. (₹)</th>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td></td>
                      <td></td>
                      <td>{row.id}</td>
                      <td>{row.claimDate}</td>
                      <td>{row.billNo}</td>
                      <td>{row.billDate}</td>
                      <td>{row.amountClaim}</td>
                      <td>{row.billReptStatus}</td>
                      <td>{row.billReptDate}</td>
                      <td>{row.medicalStatus}</td>
                      <td>{row.medicalDate}</td>
                      <td>{row.financeStatus}</td>
                      <td>{row.financeDate}</td>
                      <td>{row.passedAmt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <div className="page-text">Showing 1 to 10 of 154 entries</div>
              <div className="pagination-controls">
                <button className="page-btn">Previous</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">5</button>
                <span style={{ padding: '0 5px' }}>...</span>
                <button className="page-btn">16</button>
                <button className="page-btn">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="footer-text">
        © 2017, NALCO India. All Rights Reserved
      </footer>
    </div>
  );
};

export default UserDashboard;
