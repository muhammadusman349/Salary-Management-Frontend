import { Container, Paper, Typography } from '@mui/material';
import UserProfileForm from '../components/Profile/UserProfile';

const ProfilePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          User Profile
        </Typography>
        <UserProfileForm />
      </Paper>
    </Container>
  );
};

export default ProfilePage;