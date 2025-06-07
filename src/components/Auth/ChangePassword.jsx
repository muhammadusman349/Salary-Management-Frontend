import React, { useState } from 'react';
import { 
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {accountsApi} from '../../api/axios';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
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
            await accountsApi.post('changepassword/', formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/profile');
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
            <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                align="center"
                sx={{ 
                    mb: 3,
                    color: 'text.secondary',
                    fontWeight: 500
                }}
            >
                Update your password
            </Typography>
            
            {success && (
                <Alert 
                    severity="success" 
                    sx={{ 
                        mb: 3,
                        '& .MuiAlert-message': {
                            width: '100%'
                        }
                    }}
                >
                    <Typography variant="body1">
                        Password changed successfully! Redirecting to profile...
                    </Typography>
                </Alert>
            )}
            
            {errors.detail && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errors.detail}
                </Alert>
            )}
            
            <Box 
                component="form" 
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
            >
                <TextField
                    fullWidth
                    margin="normal"
                    label="Current Password"
                    name="old_password"
                    type="password"
                    value={formData.old_password}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.old_password)}
                    helperText={errors.old_password}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                        }
                    }}
                    inputProps={{
                        autoComplete: 'current-password'
                    }}
                />
                
                <TextField
                    fullWidth
                    margin="normal"
                    label="New Password"
                    name="new_password"
                    type="password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                    error={Boolean(errors.new_password)}
                    helperText={errors.new_password}
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
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Change Password'
                    )}
                </Button>
            </Box>
        </Box>
    );
};

export default ChangePassword;