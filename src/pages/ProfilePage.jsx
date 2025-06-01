import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import UserProfileForm from '../components/Profile/UserProfile';

const ProfilePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={4} 
        sx={{ 
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
          flexWrap="wrap"
          gap={2}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: 'primary.main'
            }}
          >
            My Profile
          </Typography>
          
          <Button
            component={Link}
            to="/change-password"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              borderRadius: 1,
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            Change Password
          </Button>
        </Box>
        
        <UserProfileForm />
      </Paper>
    </Container>
  );
};

export default ProfilePage;