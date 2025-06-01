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
    <Box sx={{ width: '100%' }}>
      {!email && (
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={Boolean(errors.email)}
          helperText={errors.email}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            }
          }}
          inputProps={{
            autoComplete: 'email'
          }}
        />
      )}
      
      <TextField
        fullWidth
        margin="normal"
        label="OTP Code"
        name="otp"
        value={formData.otp}
        onChange={handleChange}
        required
        error={Boolean(errors.otp)}
        helperText={errors.otp || 'Enter the 6-digit code sent to your email'}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          }
        }}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="New Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        error={Boolean(errors.password)}
        helperText={errors.password}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          }
        }}
        inputProps={{
          autoComplete: 'new-password'
        }}
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
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          }
        }}
        inputProps={{
          autoComplete: 'new-password'
        }}
      />
      
      {success && (
        <Alert 
          severity="success" 
          sx={{ 
            mt: 3,
            '& .MuiAlert-message': {
              width: '100%'
            }
          }}
        >
          Password reset successfully! Redirecting to login...
        </Alert>
      )}
      
      {errors.detail && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {errors.detail}
        </Alert>
      )}
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ 
          mt: 3,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 1,
          textTransform: 'none'
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
      </Button>
    </Box>
  );
};

export default ResetPassword;