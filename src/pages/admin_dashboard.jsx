import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Power } from 'lucide-react';
import { getAllEmployees, updateEmployeeStatus, getMyEmployeeDetails } from '../services/employeeService';
import './admin_dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [adminDetails, setAdminDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empData, adminData] = await Promise.all([
          getAllEmployees(),
          getMyEmployeeDetails().catch(() => null) // Admin might not be an employee, catch error
        ]);
        setUsers(empData);
        setAdminDetails(adminData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEmployeeStatus(id, newStatus);
      setUsers(users.map(u => u._id === id ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name?.toLowerCase().includes(lowerSearch) ||
        user.employeeId?.toLowerCase().includes(lowerSearch) ||
        user.position?.toLowerCase().includes(lowerSearch)
      );
    }

    // Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(user => user.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortConfig.key] || '';
      let valB = b[sortConfig.key] || '';
      
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchTerm, statusFilter, sortConfig]);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo-placeholder">NALCO Admin Interface</div>
        <div className="header-right">
          <div className="title-text">
            Logout
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <Power size={15} />
          </button>
        </div>
      </header>

      <main className="admin-content">
        <div className="controls-bar">
          <div className="search-wrapper">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by name, emp id, or position..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filters-wrapper">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Retired">Retired (Default)</option>
              <option value="Deceased">Deceased</option>
              <option value="Resigned">Resigned</option>
            </select>
          </div>
        </div>

        <div className="table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th onClick={() => handleSort('employeeId')} style={{cursor: 'pointer'}}>
                  <span>Emp ID <SortIcon columnKey="employeeId" /></span>
                </th>
                <th onClick={() => handleSort('position')} style={{cursor: 'pointer'}}>
                  <span>Position <SortIcon columnKey="position" /></span>
                </th>
                <th>Status Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>Loading employees...</td>
                </tr>
              ) : filteredAndSortedUsers.length > 0 ? (
                filteredAndSortedUsers.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-cell">
                        <img src={'./src/assets/user.jpg'} alt={user.name} className="user-avatar" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} />
                        <div className="user-name-wrapper">
                          <span className="user-name">{user.name}</span>
                          <span className="user-email">{new Date(user.dob).toLocaleDateString()} (DOB)</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.employeeId}</td>
                    <td>{user.position}</td>
                    <td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <select 
                        className={`status-select ${user.status}`} 
                        value={user.status}
                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Retired">Retired</option>
                        <option value="Deceased">Deceased</option>
                        <option value="Resigned">Resigned</option>
                      </select>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '12px', whiteSpace: 'nowrap', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                        onClick={() => setSelectedUser(user)}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Employee Details</h2>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-avatar-container">
                <img src={'./src/assets/user.jpg'} alt={selectedUser.name} className="modal-avatar" onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }} />
              </div>
              <div className="modal-info-grid">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{selectedUser.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Employee ID</span>
                  <span className="info-value">{selectedUser.employeeId}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Position</span>
                  <span className="info-value">{selectedUser.position}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date of Birth</span>
                  <span className="info-value">{new Date(selectedUser.dob).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value">{selectedUser.status}</span>
                </div>
                {selectedUser.retirementDate && (
                  <div className="info-item">
                    <span className="info-label">Retirement Date</span>
                    <span className="info-value">{new Date(selectedUser.retirementDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-label">Emergency Contact</span>
                  <span className="info-value">{selectedUser.emergencyContact || 'Not Provided'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
