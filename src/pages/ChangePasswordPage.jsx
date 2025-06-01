import { Container, Paper, Typography } from '@mui/material';
import ChangePasswordForm from '../components/Auth/ChangePassword';

const ChangePasswordPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Change Password
        </Typography>
        <ChangePasswordForm />
      </Paper>
    </Container>
  );
};

export default ChangePasswordPage;