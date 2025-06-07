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
import { accountsApi } from '../../api/axios';

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
            await accountsApi.post('forget/password/', { email });
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
        <Box sx={{ width: '100%' }}>
            {success ? (
                <Alert 
                    severity="success" 
                    sx={{ 
                        mb: 3,
                        '& .MuiAlert-message': {
                            width: '100%'
                        }
                    }}
                >
                    <Typography variant="body1" gutterBottom>
                        OTP has been sent to your email. Please check your inbox.
                    </Typography>
                    <Button 
                        fullWidth
                        variant="contained"
                        sx={{ 
                            mt: 2,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600
                        }}
                        onClick={() => navigate('/reset-password', { state: { email } })}
                    >
                        Continue to Reset Password
                    </Button>
                </Alert>
            ) : (
                <>
                    {errors.detail && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {errors.detail}
                        </Alert>
                    )}
                    
                    <Box 
                        component="form" 
                        onSubmit={handleSubmit}
                        sx={{ mt: 2 }}
                    >
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
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                }
                            }}
                            inputProps={{
                                autoComplete: 'email'
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
                                'Send OTP'
                            )}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ForgetPassword;