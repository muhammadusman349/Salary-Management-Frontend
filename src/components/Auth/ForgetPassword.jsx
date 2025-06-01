// src/components/Auth/ForgetPassword.jsx
import React, { useState } from 'react';
import { 
  TextField,
  Button,
  Box,
  Alert,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        
        try {
            await api.post('forget/password/', { email });
            setSuccess(true);
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
        <>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Forgot Password
            </Typography>
            
            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    OTP has been sent to your email. Please check your inbox.
                    <Button 
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/reset-password', { state: { email } })}
                    >
                        Continue to Reset Password
                    </Button>
                </Alert>
            )}
            
            {errors.detail && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errors.detail}
                </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send OTP'}
                </Button>
            </Box>
        </>
    );
};

export default ForgetPassword;