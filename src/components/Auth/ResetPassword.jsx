// src/components/Auth/ResetPassword.jsx
import { 
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography
} from '@mui/material';
import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ email }) => {
  const [formData, setFormData] = useState({
    email: email || '',
    otp: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      await api.post('reset/password/', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Password reset successfully! Please login with your new password.' 
          } 
        });
      }, 2000);
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {!email && (
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
      )}
      
      <TextField
        fullWidth
        margin="normal"
        label="OTP"
        name="otp"
        value={formData.otp}
        onChange={handleChange}
        required
        error={Boolean(errors.otp)}
        helperText={errors.otp}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="New Password"
        name="password"
        type="password"
        value={formData.new_password}
        onChange={handleChange}
        required
        error={Boolean(errors.new_password)}
        helperText={errors.new_password}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Confirm New Password"
        name="confirm_password"
        type="password"
        value={formData.confirm_password}
        onChange={handleChange}
        required
        error={Boolean(errors.confirm_password)}
        helperText={errors.confirm_password}
      />
      
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Password reset successfully! Redirecting to login...
        </Alert>
      )}
      
      {errors.detail && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errors.detail}
        </Alert>
      )}
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Reset Password'}
      </Button>
    </Box>
  );
};

export default ResetPassword;