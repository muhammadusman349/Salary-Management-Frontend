import { Container, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ResetPassword from '../components/Auth/ResetPassword';

const ResetPasswordPage = () => {
  const location = useLocation();
  const email = location.state?.email || '';

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh'
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          width: '100%',
          borderRadius: 2,
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'background.paper'
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
            mb: 2
          }}
        >
          Reset Password
        </Typography>
        
        {email && (
          <Typography 
            variant="body1" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 3,
              color: 'text.secondary'
            }}
          >
            Reset password for: <strong>{email}</strong>
          </Typography>
        )}
        
        <ResetPassword email={email} />
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;