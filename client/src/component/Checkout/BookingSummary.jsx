import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  Button, 
  Grid 
} from '@mui/material';
import { 
  SportsSoccer, 
  AccessTime, 
  LocationOn, 
  DateRange, 
  Person, 
  Phone, 
  Wc 
} from '@mui/icons-material';

const BookingSummary = ({ onNext, onBack, bookingDetails }) => {
  const defaultBookingDetails = {
    turfName: 'Green Fields Sports Complex',
    date: '2024-03-30',
    time: '18:00 - 19:30',
    duration: '1.5 hours',
    location: 'Sector 42, City Center',
    price: 1200
  };

  const userDetails = {
    name: 'Aditya Nishad',
    phone: '7202626265',
    age: 19,
    gender: 'Male'
  };

  const details = bookingDetails || defaultBookingDetails;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
      <Typography variant="h5" align="center" color="primary" gutterBottom>
        Booking Summary
      </Typography>
      
      <Grid container spacing={3}>
        {/* User Details Section */}
        <Grid item xs={12} md={5}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                User Details
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Person color="action" />
                <Typography variant="body1">{userDetails.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Phone color="action" />
                <Typography variant="body1">{userDetails.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body1">Age: {userDetails.age}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Wc color="action" />
                <Typography variant="body1">Gender: {userDetails.gender}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Booking Details Section */}
        <Grid item xs={12} md={7}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Turf Details
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <SportsSoccer color="primary" />
                <Typography variant="subtitle1">{defaultBookingDetails.turfName}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <DateRange color="action" />
                <Typography variant="body2">{defaultBookingDetails.date}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AccessTime color="action" />
                <Typography variant="body2">{defaultBookingDetails.time}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOn color="action" />
                <Typography variant="body2">{defaultBookingDetails.location}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Total Duration:</Typography>
                <Typography variant="body1">{defaultBookingDetails.duration}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">Total Price:</Typography>
                <Typography variant="h6" color="success.main">₹{defaultBookingDetails.price}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="success" onClick={onNext}>
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default BookingSummary;