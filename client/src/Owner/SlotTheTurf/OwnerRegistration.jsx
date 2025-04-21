import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Box
} from '@mui/material';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const OwnerRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    registrationNumber: '',
    industry: '',
    contactNumber: ''
  });

  const [location, setLocation] = useState({
    lat: 20.5937, // Default to India's center
    lng: 78.9629
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log('Form Data:', formData);
    console.log('Turf Location:', location);
  };

  return (
    <div className='bg-gradient-to-b from-sky-950 to-sky-900 min-h-screen mt-25'>
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Turf Owner Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Details */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Company Details */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  name="industry"
                  value={formData.industry}
                  label="Industry"
                  onChange={handleChange}
                >
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="entertainment">Entertainment</MenuItem>
                  <MenuItem value="recreation">Recreation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Location Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Turf Location
              </Typography>
              <Box sx={{ height: 400, width: '100%' }}>
                <LoadScript
                  googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
                >
                  <GoogleMap
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={location}
                    zoom={5}
                    onClick={handleMapClick}
                  >
                    <Marker 
                      position={location} 
                      draggable={true}
                      onDragEnd={handleMapClick}
                    />
                  </GoogleMap>
                </LoadScript>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
              >
                Register Turf
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
  );
};

export default OwnerRegistration;