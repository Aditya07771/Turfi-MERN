import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Divider 
} from '@mui/material';
import { 
  CheckCircle, 
  SportsSoccer, 
  ConfirmationNumber, 
  Print 
} from '@mui/icons-material';

const Confirmation = ({ bookingDetails }) => {
  const defaultBookingDetails = {
    bookingId: 'TRF-20240330-001',
    turfName: 'Green Fields Sports Complex',
    date: '2024-03-30',
    time: '18:00 - 19:30',
    location: 'Sector 42, City Center',
    price: 1200
  };

  const details = bookingDetails || defaultBookingDetails;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', p: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <CheckCircle 
          color="success" 
          sx={{ fontSize: 100, mb: 2 }} 
        />
        <Typography variant="h4" color="success.main">
          Booking Confirmed!
        </Typography>
      </Box>
      
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ConfirmationNumber color="primary" sx={{ mr: 2 }} />
            <Typography variant="subtitle1">
              Booking ID: {details.bookingId}
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SportsSoccer color="primary" sx={{ mr: 2 }} />
            <Typography variant="body1">
              {details.turfName}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Typography variant="body2">
              <strong>Date:</strong> {details.date}
            </Typography>
            <Typography variant="body2">
              <strong>Time:</strong> {details.time}
            </Typography>
            <Typography variant="body2">
              <strong>Location:</strong> {details.location}
            </Typography>
            <Typography variant="body2" color="success.main">
              <strong>Total Paid:</strong> ₹{details.price}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<Print />}
          onClick={handlePrint}
        >
          Print Ticket
        </Button>
        <Button 
          variant="outlined" 
          color="success"
        >
          Download Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;