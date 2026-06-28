import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getAllEmployees = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const getRetiredEmployees = async () => {
  const response = await axios.get(`${API_URL}/retirees`);
  return response.data;
};

export const getRetiredCount = async () => {
  const response = await axios.get(`${API_URL}/retirees/count`);
  return response.data;
};

export const getMyEmployeeDetails = async () => {
  const response = await axios.get(`${API_URL}/me`, getAuthHeaders());
  return response.data;
};

export const updateEmployeeStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}/status`, { status }, getAuthHeaders());
  return response.data;
};
