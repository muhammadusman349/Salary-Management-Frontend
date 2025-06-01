import { Container, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UserProfileForm from '../components/Profile/UserProfile';

const ProfilePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          User Profile
        </Typography>
        <UserProfileForm />
        <Button
          component={Link}
          to="/change-password"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          Change Password
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;