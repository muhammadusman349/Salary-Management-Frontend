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
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null);
        const response = await login(values);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        navigate('/');
      } catch (err) {
        setError(err.message || 'Login failed. Please check your credentials.');
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

      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email Address"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
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
        id="password"
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
        autoComplete="current-password"
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
          'Sign In'
        )}
      </Button>
    </Box>
  );
};

export default LoginForm;