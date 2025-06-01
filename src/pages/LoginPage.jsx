import { Container, Paper, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoginForm from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <LoginForm />
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Link component={RouterLink} to="/forget-password">
            Forgot Password?
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;