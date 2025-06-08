import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton
} from '@mui/material';
import { 
  AccountCircle, 
  Logout, 
  Dashboard, 
  People, 
  AttachMoney,
  Schedule,
  Business,
  Work,
  Groups // Alternative icon for Organizations
} from '@mui/icons-material';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = !!localStorage.getItem('access_token');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <AttachMoney sx={{ mr: 1, fontSize: 32 }} />
          <Typography variant="h6" component={Link} to="/" sx={{ 
            fontWeight: 700, 
            textDecoration: 'none',
            color: 'inherit'
          }}>
            SalaryPro
          </Typography>
        </Box>

        {isAuthenticated ? (
          <Box display="flex" alignItems="center">
            <Button 
              color="inherit" 
              startIcon={<Dashboard />} 
              component={Link} 
              to="/dashboard"
              sx={{ mr: 2 }}
            >
              Dashboard
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<Groups />} 
              component={Link} 
              to="/organizations"
              sx={{ mr: 2 }}
            >
              Organizations
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<Business />} 
              component={Link} 
              to="/departments"
              sx={{ mr: 2 }}
            >
              Departments
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<Work />} 
              component={Link} 
              to="/positions"
              sx={{ mr: 2 }}
            >
              Positions
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<People />} 
              component={Link} 
              to="/employees"
              sx={{ mr: 2 }}
            >
              Employees
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<Schedule />} 
              component={Link} 
              to="/attendance"
              sx={{ mr: 2 }}
            >
              Attendance
            </Button>
            
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ ml: 2 }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                <AccountCircle />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem 
                component={Link} 
                to="/profile" 
                onClick={handleMenuClose}
              >
                <AccountCircle sx={{ mr: 1 }} /> My Profile
              </MenuItem>
              
              <MenuItem 
                component={Link} 
                to="/admin" 
                onClick={handleMenuClose}
              >
                <People sx={{ mr: 1 }} /> Admin Panel
              </MenuItem>
              
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              component={Link} 
              to="/signup"
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;