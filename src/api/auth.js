import {accountsApi as api} from './axios';

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
    return response.data;x
  } catch (error) {
    throw error.response.data;
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await api.post('forget/password/', { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async ({ email, otp, password }) => {
  try {
    const response = await api.post('reset/password/', { 
      email, 
      otp, 
      password 
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const changePassword = async ({ old_password, new_password }) => {
  try {
    const response = await api.post('changepassword/', { 
      old_password, 
      new_password 
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UserService = {
  getUsers: async () => api.get('/users/'),
};