import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography, 
  Box, 
  StepConnector,
  stepConnectorClasses
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckIcon from '@mui/icons-material/Check';
import LoginIcon from '@mui/icons-material/Login';

// Import your components
import UserDetails from './UserDetails';
import BookingSummary from './BookingSummary';
import Payment from './Payment';
import Confirmation from './confirmation';
import Footer from '../Layouts/Footer';

// Custom Connector for Stepper (keep existing styling)
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(95deg, #2E7D32 0%, #4CAF50 50%, #81C784 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(95deg, #2E7D32 0%, #4CAF50 50%, #81C784 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

// Custom Step Icon (keep existing styling)
const ColorlibStepIcon = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(95deg, #2E7D32 0%, #4CAF50 50%, #81C784 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(95deg, #2E7D32 0%, #4CAF50 50%, #81C784 100%)',
  }),
}));

// Step Icons
const stepIcons = {
  0: <LoginIcon />,   
  1: <PersonIcon />,
  2: <ReceiptIcon />,
  3: <PaymentIcon />,
  4: <CheckIcon />
};

function ColorlibStepIconRoot(props) {
  const { active, completed, className, icon } = props;

  return (
    <ColorlibStepIcon 
      ownerState={{ completed, active }} 
      className={className}
    >
      {stepIcons[icon - 1]}
    </ColorlibStepIcon>
  );
}

const steps = [
  "Login",
  "Enter Details", 
  "Booking Summary", 
  "Make Payment", 
  "Confirm Booking"
];

const BookingStepper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [bookingData, setBookingData] = useState({});

  // Parse URL for step navigation
  const querySearch = new URLSearchParams(location.search);
  const urlStep = querySearch.get('step');

  // Update active step based on URL
  useEffect(() => {
    const stepIndex = steps.findIndex(step => 
      step.toLowerCase().replace(/\s+/g, '') === urlStep
    );
    if (stepIndex !== -1) {
      setActiveStep(stepIndex);
    }
  }, [urlStep]);

  // Update URL when step changes
  useEffect(() => {
    const stepParam = steps[activeStep].toLowerCase().replace(/\s+/g, '');
    navigate(`?step=${stepParam}`, { replace: true });
  }, [activeStep, navigate]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const updateBookingData = (data) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <UserDetails 
            onNext={handleNext} 
            onBack={handleBack} 
            onUpdateData={updateBookingData}
            initialData={bookingData}
          />
        );
      case 2:
        return (
          <BookingSummary 
            onNext={handleNext} 
            onBack={handleBack} 
            bookingDetails={bookingData}
            onUpdateData={updateBookingData}
            fullWidth
          />
        );
      case 3:
        return (
          <Payment 
            onNext={handleNext} 
            onBack={handleBack} 
            totalAmount={bookingData.price}
            onUpdateData={updateBookingData}
          />
        );
      case 4:
        return (
          <Confirmation 
            bookingDetails={bookingData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='mt-20 bg-white'>
    <Box sx={{ width: '100%', py: 4 }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIconRoot}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 4, px: 4 }}>
        {renderStepContent(activeStep)}
      </Box>

      {activeStep < steps.length - 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          p: 3 
        }}>
          {activeStep > 0 && (
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
          )}
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleNext}
          >
            {activeStep === steps.length - 2 ? 'Confirm' : 'Next'}
          </Button>
        </Box>
      )}
    </Box>
    <div>
        <Footer/>
    </div>
   
    </div>
  );
};

export default BookingStepper;