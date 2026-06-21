import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;
  try {
    if (userStr) user = JSON.parse(userStr);
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
