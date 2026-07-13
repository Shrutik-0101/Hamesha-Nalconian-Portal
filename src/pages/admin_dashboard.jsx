import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Power, Users, Image as ImageIcon, Bell, Link as LinkIcon, FileText } from 'lucide-react';
import { getAllEmployees, updateEmployeeStatus, getMyEmployeeDetails } from '../services/employeeService';
import { getContent, updateContent } from '../services/contentService';
import './admin_dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  const [users, setUsers] = useState([]);
  const [adminDetails, setAdminDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const [content, setContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empData, adminData, contentData] = await Promise.all([
          getAllEmployees(),
          getMyEmployeeDetails().catch(() => null),
          getContent().catch(() => null)
        ]);
        setUsers(empData || []);
        setAdminDetails(adminData);
        if (contentData) setContent(contentData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoadingUsers(false);
        setLoadingContent(false);
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

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(user =>
        user.name?.toLowerCase().includes(lowerSearch) ||
        user.employeeId?.toLowerCase().includes(lowerSearch) ||
        user.position?.toLowerCase().includes(lowerSearch)
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(user => user.status === statusFilter);
    }

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

  const handleSaveContent = async () => {
    try {
      await updateContent(content);
      alert('Content updated successfully!');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content');
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo-placeholder">NALCO Admin Interface</div>
        <div className="header-right">
          <div className="title-text">Logout</div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <Power size={15} />
          </button>
        </div>
      </header>

      <div className="admin-body">
        <aside className="admin-sidebar">
          <div className={`sidebar-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <Users size={18} /> User Management
          </div>
          <div className={`sidebar-item ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
            <ImageIcon size={18} /> Gallery Images
          </div>
          <div className={`sidebar-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
            <Bell size={18} /> Notifications
          </div>
          <div className={`sidebar-item ${activeTab === 'links' ? 'active' : ''}`} onClick={() => setActiveTab('links')}>
            <LinkIcon size={18} /> Important Links
          </div>
          <div className={`sidebar-item ${activeTab === 'announcements' ? 'active' : ''}`} onClick={() => setActiveTab('announcements')}>
            <FileText size={18} /> Announcements Ticker
          </div>
        </aside>

        <main className="admin-content">
          {activeTab === 'users' && (
            <>
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
                    <option value="Retired">Retired</option>
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
                      <th onClick={() => handleSort('employeeId')} style={{ cursor: 'pointer' }}>
                        <span>Emp ID <SortIcon columnKey="employeeId" /></span>
                      </th>
                      <th onClick={() => handleSort('position')} style={{ cursor: 'pointer' }}>
                        <span>Position <SortIcon columnKey="position" /></span>
                      </th>
                      <th>Status Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingUsers ? (
                      <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>Loading employees...</td></tr>
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
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No users found matching your criteria.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'gallery' && content && (
            <div className="table-card" style={{ padding: '24px' }}>
              <h2>Gallery Images Management</h2>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Provide valid URLs or paths for the gallery images.</p>
              {content.galleryImages.map((imgUrl, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={imgUrl}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    onChange={(e) => {
                      const newImages = [...content.galleryImages];
                      newImages[idx] = e.target.value;
                      setContent({ ...content, galleryImages: newImages });
                    }}
                  />
                  <button className="btn" style={{ padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => {
                      const newImages = content.galleryImages.filter((_, i) => i !== idx);
                      setContent({ ...content, galleryImages: newImages });
                    }}>Remove</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn" style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => setContent({ ...content, galleryImages: [...content.galleryImages, ''] })}>Add Image</button>
                <button className="btn" style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={handleSaveContent}>Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && content && (
            <div className="table-card" style={{ padding: '24px' }}>
              <h2>Notifications Management</h2>
              {content.notifications.map((notif, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={notif.text}
                    placeholder="Notification text"
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    onChange={(e) => {
                      const newNotifs = [...content.notifications];
                      newNotifs[idx].text = e.target.value;
                      setContent({ ...content, notifications: newNotifs });
                    }}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input type="checkbox" checked={notif.isNewTag} onChange={(e) => {
                      const newNotifs = [...content.notifications];
                      newNotifs[idx].isNewTag = e.target.checked;
                      setContent({ ...content, notifications: newNotifs });
                    }} />
                    Is New?
                  </label>
                  <button className="btn" style={{ padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => {
                      const newNotifs = content.notifications.filter((_, i) => i !== idx);
                      setContent({ ...content, notifications: newNotifs });
                    }}>Remove</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn" style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => setContent({ ...content, notifications: [...content.notifications, { text: '', isNewTag: false }] })}>Add Notification</button>
                <button className="btn" style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={handleSaveContent}>Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'links' && content && (
            <div className="table-card" style={{ padding: '24px' }}>
              <h2>Important Links Management</h2>
              {content.importantLinks.map((link, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={link.text}
                    placeholder="Link text"
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    onChange={(e) => {
                      const newLinks = [...content.importantLinks];
                      newLinks[idx].text = e.target.value;
                      setContent({ ...content, importantLinks: newLinks });
                    }}
                  />
                  <input
                    type="text"
                    value={link.url}
                    placeholder="URL"
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    onChange={(e) => {
                      const newLinks = [...content.importantLinks];
                      newLinks[idx].url = e.target.value;
                      setContent({ ...content, importantLinks: newLinks });
                    }}
                  />
                  <button className="btn" style={{ padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => {
                      const newLinks = content.importantLinks.filter((_, i) => i !== idx);
                      setContent({ ...content, importantLinks: newLinks });
                    }}>Remove</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn" style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => setContent({ ...content, importantLinks: [...content.importantLinks, { text: '', url: '' }] })}>Add Link</button>
                <button className="btn" style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={handleSaveContent}>Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && content && (
            <div className="table-card" style={{ padding: '24px' }}>
              <h2>Announcements (Ticker) Management</h2>
              {content.announcements.map((announcement, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={announcement}
                    placeholder="Announcement text"
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    onChange={(e) => {
                      const newAnnouncements = [...content.announcements];
                      newAnnouncements[idx] = e.target.value;
                      setContent({ ...content, announcements: newAnnouncements });
                    }}
                  />
                  <button className="btn" style={{ padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => {
                      const newAnnouncements = content.announcements.filter((_, i) => i !== idx);
                      setContent({ ...content, announcements: newAnnouncements });
                    }}>Remove</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn" style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => setContent({ ...content, announcements: [...content.announcements, ''] })}>Add Announcement</button>
                <button className="btn" style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={handleSaveContent}>Save Changes</button>
              </div>
            </div>
          )}
        </main>
      </div>

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
                <div className="info-item"><span className="info-label">Name</span><span className="info-value">{selectedUser.name}</span></div>
                <div className="info-item"><span className="info-label">Employee ID</span><span className="info-value">{selectedUser.employeeId}</span></div>
                <div className="info-item"><span className="info-label">Position</span><span className="info-value">{selectedUser.position}</span></div>
                <div className="info-item"><span className="info-label">Date of Birth</span><span className="info-value">{new Date(selectedUser.dob).toLocaleDateString()}</span></div>
                <div className="info-item"><span className="info-label">Status</span><span className="info-value">{selectedUser.status}</span></div>
                {selectedUser.retirementDate && (
                  <div className="info-item"><span className="info-label">Retirement Date</span><span className="info-value">{new Date(selectedUser.retirementDate).toLocaleDateString()}</span></div>
                )}
                <div className="info-item"><span className="info-label">Emergency Contact</span><span className="info-value">{selectedUser.emergencyContact || 'Not Provided'}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
