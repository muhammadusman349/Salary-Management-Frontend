import { Container, Paper, Typography } from '@mui/material';
import ForgetPasswordForm from '../components/Auth/ForgetPassword';

const ForgetPasswordPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Forgot Password
        </Typography>
        <ForgetPasswordForm />
      </Paper>
    </Container>
  );
};

export default ForgetPasswordPage;