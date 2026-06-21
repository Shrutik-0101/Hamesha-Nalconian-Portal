import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p style={{ color: '#666' }}>(Mocked Dashboard)</p>
      <div style={{ marginTop: '20px' }}>
        <p>Welcome, Admin! This is a placeholder for the actual admin functionality.</p>
        <button 
          onClick={handleLogout}
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            background: '#d32f2f', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer' 
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
