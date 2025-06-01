// src/pages/ResetPasswordPage.jsx
import { Container, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ResetPassword from '../components/Auth/ResetPassword';

const ResetPasswordPage = () => {
  const location = useLocation();
  const email = location.state?.email || '';

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Reset Password
        </Typography>
        {email && (
          <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3 }}>
            Reset password for: {email}
          </Typography>
        )}
        <ResetPassword email={email} />
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;