import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { signup } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();

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
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // Always sign up as EMPLOYEE
        const dataToSend = {
          ...values,
          role: 'EMPLOYEE',
        };

        await signup(dataToSend);
        navigate('/login');
      } catch (error) {
        const errMsg =
          error.response?.data?.error ||
          JSON.stringify(error.response?.data) ||
          'Signup failed';
        setErrors({ submit: errMsg });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="First Name"
        {...formik.getFieldProps('first_name')}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Last Name"
        {...formik.getFieldProps('last_name')}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...formik.getFieldProps('email')}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...formik.getFieldProps('password')}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone"
        {...formik.getFieldProps('phone')}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
        margin="normal"
      />

      {formik.errors.submit && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {formik.errors.submit}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={formik.isSubmitting}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
