import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/logos.png";
import Navbar from '../component/Navbar';

const Venue = () => {
  const cities = [
    { id: 1, name: "Mumbai", venues: 48 },
    { id: 2, name: "Delhi", venues: 36 },
    { id: 3, name: "Bangalore", venues: 42 },
    { id: 4, name: "Pune", venues: 24 },
    { id: 5, name: "Hyderabad", venues: 31 },
    { id: 6, name: "Chennai", venues: 28 }
  ];

  const [selectedCity, setSelectedCity] = useState(null);
  const [isLogoAnimated, setIsLogoAnimated] = useState(false);

  useEffect(() => {
    // Start logo animation after component mounts
    const timer = setTimeout(() => {
      setIsLogoAnimated(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <><div>
          <Navbar />
      </div><div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-sky-950 to-sky-900 text-white relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

              {/* Initial Logo Animation */}
              <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{
                      scale: isLogoAnimated ? [1, 1.5, 0.8, 0] : 1,
                      opacity: isLogoAnimated ? [1, 1, 0.5, 0] : 1,
                      rotate: isLogoAnimated ? [0, 180, 360] : 0
                  }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
              >
                  <img src={logo} alt="Turfi logo" className="w-40 h-40" />
              </motion.div>

              {/* Content (appears after logo animation) */}
              <motion.div
                  className="container mx-auto px-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLogoAnimated ? 1 : 0 }}
                  transition={{ delay: 2, duration: 1 }}
              >
                  <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
                      Find Your Perfect <span className="text-green-400">Venue</span>
                  </h1>

                  <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                      <h2 className="text-2xl font-semibold mb-6 text-center">Select Your City</h2>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {cities.map((city) => (
                              <motion.div
                                  key={city.id}
                                  className={`relative cursor-pointer rounded-lg p-6 text-center transition-all duration-300 ${selectedCity?.id === city.id ? 'bg-gradient-to-r from-teal-500 to-green-400' : 'bg-white/10 hover:bg-white/20'}`}
                                  onClick={() => handleCitySelect(city)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.98 }}
                              >
                                  <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                                  <p className="text-sm opacity-80">{city.venues} Venues Available</p>
                              </motion.div>
                          ))}
                      </div>
                  </div>

                  {selectedCity && (
                      <motion.div
                          className="max-w-4xl mx-auto mt-12 p-6 bg-white/10 backdrop-blur-md rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                      >
                          <h2 className="text-3xl font-bold mb-6 flex items-center">
                              <span className="text-green-400 mr-2">{selectedCity.name}</span> Venues
                          </h2>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Sample venues - would be populated dynamically */}
                              {[...Array(4)].map((_, idx) => (
                                  <div key={idx} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer group">
                                      <div className="h-40 bg-gradient-to-r from-sky-900 to-sky-800 rounded-lg mb-4 overflow-hidden relative">
                                          <div className="absolute inset-0 bg-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                      </div>
                                      <h3 className="text-lg font-semibold mb-1">Turf Arena {idx + 1}</h3>
                                      <p className="text-sm text-white/70 mb-2">{selectedCity.name} Central, Zone {idx + 1}</p>
                                      <div className="flex justify-between items-center">
                                          <span className="text-green-400 font-medium">₹1,200/hr</span>
                                          <button className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 rounded transition-colors">
                                              Book Now
                                          </button>
                                      </div>
                                  </div>
                              ))}
                          </div>

                          <div className="text-center mt-8">
                              <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-full transition-all duration-300 font-medium">
                                  View All {selectedCity.venues} Venues
                              </button>
                          </div>
                      </motion.div>
                  )}
              </motion.div>
          </div></>
  );
};

export default Venue;