import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isloggedin, userData, getUserData } = useContext(AppContext);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleInput = (e, index) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    // Update the input value
    e.target.value = value;
    
    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus(); // Move to the next input field
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').substring(0, 6);
    const pasteArray = paste.split('');
    
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        if (index === pasteArray.length - 1 && index < 5) {
          inputRefs.current[index + 1].focus();
        }
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      
      const otpArray = inputRefs.current.map((input) => input.value);
      const otp = otpArray.join('');
      
      if (otp.length !== 6) {
        toast.error('Please enter a complete 6-digit OTP');
        setLoading(false);
        return;
      }

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendDisabled(true);
      setCountdown(30);
      
      const { data } = await axios.post(backendUrl + '/api/auth/resend-otp');
      
      if (data.success) {
        toast.success('OTP resent successfully to your email');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP');
    }
  };

  useEffect(() => {
    if (isloggedin && userData) {
      if (userData.isAccountVerified) {
        navigate('/'); // Redirect to home if already verified
      }
    }
  }, [isloggedin, userData, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className='min-h-screen bg-sky-950 relative overflow-hidden'>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Large animated circles */}
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-white/5 border border-white/10"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ top: '10%', left: '10%' }}
        />
        
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-green-400/5 border border-green-400/10"
          animate={{
            x: [0, -70, 0],
            y: [0, 40, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ bottom: '15%', right: '25%' }}
        />
        
        {/* Small glowing dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-400"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + (Math.random() * 0.6)
            }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ 
              duration: 3 + (Math.random() * 4), 
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Logo and back navigation */}
      <div className="pt-6 pl-10">
        <div className='flex items-center gap-2 group cursor-pointer' onClick={() => navigate('/')}>
          <img 
            src={logo} 
            alt="Turfi logo" 
            className='h-[70px] w-[70px] transition-transform duration-300 group-hover:rotate-12' 
          />
          <span className='text-4xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent'>Turfi</span>
        </div>
      </div>

      <div className='flex items-center justify-center min-h-screen px-6 sm:px-0'>
        <motion.div 
          className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md text-white border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent'>
            Verify Your Email
          </h2>
          <p className='text-center text-white/70 mb-8'>
            We've sent a 6-digit verification code to your email.
            Please enter it below to complete your registration.
          </p>

          <form onSubmit={onSubmitHandler}>
            <div className='flex justify-between mb-8 gap-2' onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    key={index}
                    className='w-12 h-14 bg-white/10 border border-white/20 text-white text-center text-xl rounded-lg focus:border-green-400 outline-none transition-all'
                    ref={(el) => (inputRefs.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            
            <motion.button 
              className='w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium mt-2 relative overflow-hidden'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : 'Verify Email'}
            </motion.button>
          </form>

          <div className="flex justify-center mt-6">
            <p className="text-white/70 text-sm">
              Didn't receive the code?{' '}
              <button
                onClick={handleResendOTP}
                disabled={resendDisabled}
                className={`${resendDisabled ? 'text-white/40' : 'text-green-400 hover:underline'}`}
              >
                {resendDisabled ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerify;