import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signup } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Only letters are allowed')
        .required('First name is required'),
      last_name: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Only letters are allowed')
        .required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      phone: Yup.string()
        .matches(/^\d+$/, 'Phone number must contain only digits')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone number is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null);
        const dataToSend = {
          ...values,
          role: 'EMPLOYEE',
        };
        await signup(dataToSend);
        navigate('/login', { state: { successMessage: 'Registration successful! Please login.' } });
      } catch (error) {
        const errMsg =
          error.response?.data?.error ||
          JSON.stringify(error.response?.data) ||
          'Signup failed. Please try again.';
        setError(errMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      component="form" 
      onSubmit={formik.handleSubmit} 
      sx={{ 
        width: '100%',
        mt: 3
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            {...formik.getFieldProps('first_name')}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
            margin="normal"
            autoComplete="given-name"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            {...formik.getFieldProps('last_name')}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
            margin="normal"
            autoComplete="family-name"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
        </Grid>
      </Grid>

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        {...formik.getFieldProps('email')}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
        autoComplete="email"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          }
        }}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        {...formik.getFieldProps('password')}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
        autoComplete="new-password"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Phone Number"
        {...formik.getFieldProps('phone')}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
        margin="normal"
        autoComplete="tel"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          }
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ 
          mt: 3,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 1,
          textTransform: 'none'
        }}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Create Account'
        )}
      </Button>
    </Box>
  );
};

export default SignupForm;