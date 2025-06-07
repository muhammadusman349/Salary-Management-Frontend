// src/pages/DepartmentPage.jsx
import React from 'react';
import DepartmentList from '../components/Employee/DepartmentList';
import { Box, Typography } from '@mui/material';

const DepartmentPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      <DepartmentList />
    </Box>
  );
};

export default DepartmentPage;