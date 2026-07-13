const API_URL = 'http://localhost:5000/api/content';

export const getContent = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }
  return response.json();
};

export const updateContent = async (contentData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(contentData)
  });

  if (!response.ok) {
    throw new Error('Failed to update content');
  }
  return response.json();
};
