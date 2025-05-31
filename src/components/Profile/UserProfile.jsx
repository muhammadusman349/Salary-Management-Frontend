import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { getUserProfile, updateUserProfile } from '../../api/auth';

const UserProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserData({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          profile_pic: profile.profile_pic || '',
        });
        setProfilePicPreview(profile.profile_pic || null);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load profile data',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...(userData || {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        profile_pic: '',
      }),
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required('First name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
        .max(50, 'First name cannot be longer than 50 characters'),
      last_name: Yup.string()
        .required('Last name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
        .max(50, 'Last name cannot be longer than 50 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^\d+$/, 'Phone must contain only digits')
        .min(10, 'Phone must be at least 10 digits'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        if (profilePicFile) {
          formData.append('profile_pic', profilePicFile);
        }

        await updateUserProfile(formData);

        setSnackbar({
          open: true,
          message: 'Profile updated successfully! Reloading...',
          severity: 'success',
        });

        // Force page reload after 1.5 seconds (let user see the success message)
        setTimeout(() => {
          window.location.reload();
        }, 1500);

      } catch (error) {
        console.error('Update error:', error);
        if (error.errors) {
          const formErrors = {};
          Object.keys(error.errors).forEach((key) => {
            formErrors[key] = error.errors[key][0];
          });
          setErrors(formErrors);
        } else {
          setSnackbar({
            open: true,
            message: error.message || 'Profile update failed. Please try again.',
            severity: 'error',
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading || !userData) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
        encType="multipart/form-data"
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            src={profilePicPreview}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Button variant="contained" component="label">
            {profilePicFile ? 'Change Profile Picture' : 'Upload Profile Picture'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                if (file) {
                  setProfilePicFile(file);
                  setProfilePicPreview(URL.createObjectURL(file));
                }
              }}
            />
          </Button>
        </Box>

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
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Update Profile'
          )}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfileForm;