import { Container, Paper, Typography } from '@mui/material';
import ForgetPasswordForm from '../components/Auth/ForgetPassword';

const ForgetPasswordPage = () => {
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
            mb: 3
          }}
        >
          Forgot Password
        </Typography>
        <ForgetPasswordForm />
      </Paper>
    </Container>
  );
};

export default ForgetPasswordPage;