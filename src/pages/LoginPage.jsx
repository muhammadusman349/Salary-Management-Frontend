import { Container, Paper, Typography, Link, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoginForm from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        py: 4
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          p: { xs: 3, sm: 4 },
          width: '100%',
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            mb: 1
          }}
        >
          Welcome Back
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          align="center" 
          sx={{ mb: 4 }}
        >
          Sign in to access your account
        </Typography>

        <LoginForm />

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <Link 
              component={RouterLink} 
              to="/forget-password" 
              sx={{ 
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Forgot password?
            </Link>
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Don't have an account?{' '}
            <Link 
              component={RouterLink} 
              to="/signup" 
              sx={{ 
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;