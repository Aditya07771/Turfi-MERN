import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

const UserDetails = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    const { firstName, lastName, phone, age, gender } = formData;
    if (firstName && lastName && phone && age && gender) {
      onNext();
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
      <Typography variant="h5" align="center" color="primary" gutterBottom>
        Personal Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            variant="outlined"
            value={formData.age}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 3 
        }}
      >
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={onBack}
        >
          Back
        </Button>
        
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetails;