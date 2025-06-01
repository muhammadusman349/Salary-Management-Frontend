import { Card, CardContent, Typography, Box } from '@mui/material';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
      elevation={3}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {icon}
        </Box>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="h3" 
          align="center"
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;