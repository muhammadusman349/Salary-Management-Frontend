import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Paper,
  Stack,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  AttachMoney, 
  People, 
  Schedule, 
  Assessment,
  Security,
  Calculate
} from '@mui/icons-material';
import FeatureCard from '../components/FeatureCard';

const HomePage = () => {
  const theme = useTheme();
  const isAuthenticated = !!localStorage.getItem('access_token');

  const features = [
    {
      icon: <People fontSize="large" color="primary" />,
      title: "Employee Management",
      description: "Easily add, update, and manage all employee details in one centralized system."
    },
    {
      icon: <Schedule fontSize="large" color="primary" />,
      title: "Attendance Tracking",
      description: "Automated check-in/check-out system with real-time tracking and reporting."
    },
    {
      icon: <Calculate fontSize="large" color="primary" />,
      title: "Salary Calculation",
      description: "Automatically compute salaries based on attendance, overtime, and deductions."
    },
    {
      icon: <Assessment fontSize="large" color="primary" />,
      title: "Payroll Reports",
      description: "Generate detailed salary slips and comprehensive payroll summaries."
    },
    {
      icon: <Security fontSize="large" color="primary" />,
      title: "Role-Based Access",
      description: "Different permission levels for HR, managers, and employees."
    },
    {
      icon: <AttachMoney fontSize="large" color="primary" />,
      title: "Payment Processing",
      description: "Seamless integration with payment gateways for salary disbursements."
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            SalaryPro Management System
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Automated Payroll Solution for Modern Factories
          </Typography>
          {!isAuthenticated ? (
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/login"
                sx={{ px: 4, py: 1.5 }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={Link}
                to="/signup"
                sx={{ px: 4, py: 1.5 }}
              >
                Sign Up
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/dashboard"
              sx={{ px: 4, py: 1.5 }}
            >
              Go to Dashboard
            </Button>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
            Ready to Transform Your Payroll Process?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to={isAuthenticated ? "/dashboard" : "/signup"}
            sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;