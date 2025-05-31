import { Container, Paper, Typography } from '@mui/material';
import SignupForm from '../components/Auth/Signup';

const SignupPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign Up
        </Typography>
        <SignupForm />
      </Paper>
    </Container>
  );
};

export default SignupPage;