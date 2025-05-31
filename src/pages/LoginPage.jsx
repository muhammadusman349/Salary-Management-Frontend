import { Container, Paper, Typography } from '@mui/material';
import LoginForm from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default LoginPage;