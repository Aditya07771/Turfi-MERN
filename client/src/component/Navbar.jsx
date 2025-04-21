import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/logos.png";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false); 
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter(x => x);
  const navigate = useNavigate();
  const { backendUrl, isloggedin, userData, setIsloggedin, setUserData } = useContext(AppContext);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  // User profile dropdown
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post(backendUrl +'/api/auth/logout');
      setIsloggedin(false);
      setUserData(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData?.name) return '';
  
    const trimmedName = userData.name.trim(); // Trim extra spaces
    const nameParts = trimmedName.split(' '); // Split the name
    return nameParts[0]?.charAt(0).toUpperCase() || ''; // Get first letter safely
  };
  

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 text-white px-10 transition-all duration-300 bg-sky-950/100`}>
        <div className='flex items-center gap-2 group'>
          <img 
            src={logo} 
            alt="Turfi logo" 
            className='h-[70px] w-[70px] transition-transform duration-300 group-hover:rotate-12' 
          />
          <span className='text-4xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent'>Turfi</span>
        </div>
        
        {/* Breadcrumb navigation */}
        <div className="absolute left-2/5 transform -translate-x-1/2 text-sm text-white/70">
          {pathNames.length > 0 && (
            <div className="flex items-center">
              <NavLink to="/" className="hover:text-green-400">Home</NavLink>
              {pathNames.map((name, index) => (
                <div key={index} className="flex items-center">
                  <span className="mx-2">/</span>
                  <NavLink 
                    to={`/${pathNames.slice(0, index + 1).join('/')}`}
                    className="hover:text-green-400 capitalize"
                  >
                    {name.replace(/-/g, ' ')}
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <ul className='flex space-x-6 items-center text-lg'>
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `relative px-2 py-1 transition-all duration-300 ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
              }
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
          <li>
            {isloggedin && userData ? (<NavLink 
              to="/my-bookings" 
              className={({isActive}) => 
                `relative px-2 py-1 transition-all duration-300 ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
              }
            >
              <span>My Booking</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>) : <NavLink 
              to="/for-business" 
              className={({isActive}) => 
                `relative px-2 py-1 transition-all duration-300 ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
              }
            >
              <span>For business</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>}
            
          </li>
          <li>
            <NavLink 
              to="/venue" 
              className={({isActive}) => 
                `relative px-2 py-1 transition-all duration-300 ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
              }
            >
              <span>Venue</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({isActive}) => 
                `relative px-2 py-1 transition-all duration-300 ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
              }
            >
              <span>Contact Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li> 
          
          {isloggedin && userData ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 focus:outline-none"
              >
                {userData.profilePicture ? (
                  <img 
                    src={userData.profilePicture} 
                    alt={userData.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-400" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold">
                    {getUserInitials()}
                  </div>
                )}
                <span className="hidden md:inline-block">{userData.name?.split(' ')[0]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-b border-white/10">
                      <p className="text-white font-medium">{userData.name}</p>
                      <p className="text-white/70 text-sm truncate">{userData.email}</p>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={() => {
                          setShowProfileDropdown(false);
                          navigate('/profile');
                        }}
                        className="px-4 py-2 text-sm text-white hover:bg-white/10 w-full text-left flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a8 8 0 00-8 8h16a8 8 0 00-8-8z" />
                        </svg>
                        Profile
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-white hover:bg-white/10 w-full text-left flex items-center gap-2"
                      >
                        <IoIosLogOut/>
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={toggleLoginModal}
              className="relative overflow-hidden w-[120px] py-2 rounded-full px-6 border-2 border-green-400 bg-transparent text-white transition-all duration-500 ease-in-out hover:border-white group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-300 to-lime-300 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Login</span>
            </button>
          )}
        </ul>
      </nav>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 w-[400px] shadow-2xl transform transition-all duration-300 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-sky-950">Welcome to Turfi</h2>
              <button 
                onClick={toggleLoginModal}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <button onClick={() => navigate('/login')} className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg font-medium hover:from-teal-600 hover:to-green-600 transition-all duration-300">
                User Login
              </button>
              <button onClick={() => navigate('/business-login')} className="w-full py-3 bg-sky-950 text-white rounded-lg font-medium hover:bg-sky-900 transition-all duration-300">
                Business Owner Login
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600">New to Turfi?</p>
              <div className="mt-3 space-x-4">
                <button onClick={() => navigate('/register')} className="text-teal-500 hover:text-teal-700 font-medium transition-colors">
                  Register as User
                </button>
                <button onClick={() => navigate('/for-business')} className="text-sky-950 hover:text-sky-800 font-medium transition-colors">
                  Register your Company
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;