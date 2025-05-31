import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to User Authentication
      </Typography>
      <Typography variant="body1" paragraph>
        {isAuthenticated
          ? 'You are logged in. Visit your profile to manage your account.'
          : 'Please login or signup to access your account.'}
      </Typography>
      {!isAuthenticated && (
        <>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </>
      )}
    </Container>
  );
};

export default HomePage;