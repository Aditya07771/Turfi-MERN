import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../../assets/logos.png";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../../context/AppContext';
import { IoIosLogOut } from "react-icons/io";

const OwnerNavigation = () => {
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
        
        <ul className='flex items-center space-x-6 text-lg'>
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
            <NavLink 
              to="/owner/my-turf-listing" 
              className={({isActive}) => 
                `relative px-2 py-1 transition-all duration-300 ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
              }
            >
              <span>My Turf</span>
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
          
          <li>
            <NavLink 
              to="/owner/turf-listing"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
            >
              List Your Court
            </NavLink>
          </li>
          
          <li>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-white hover:text-red-400 transition-colors duration-300"
            >
              <IoIosLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
      
      
    </>
  );
};

export default OwnerNavigation;