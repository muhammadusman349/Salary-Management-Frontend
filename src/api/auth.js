import api from './axios';

export const login = async (credentials) => {
  try {
    const response = await api.post('login/', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('signup/', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('profile/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const response = await api.patch('profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};