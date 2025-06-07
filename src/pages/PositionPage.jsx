import React from 'react';
import PositionList from '../components/Employee/PositionList';
import { Box, Typography } from '@mui/material';


const PositionPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Positions
      </Typography>
      <PositionList />
    </Box>
  );
};

export default PositionPage;