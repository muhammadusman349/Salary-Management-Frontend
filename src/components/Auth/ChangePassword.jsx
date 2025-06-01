import React, { useState } from 'react';
import { 
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // Import your axios instance

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
            await api.post('changepassword/', formData);
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
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Change Password
                </Typography>
                
                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Password changed successfully!
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
                        label="Current Password"
                        name="old_password"
                        type="password"
                        value={formData.old_password}
                        onChange={handleChange}
                        required
                        error={Boolean(errors.old_password)}
                        helperText={errors.old_password}
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
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ChangePassword;