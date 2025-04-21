import React from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/logos.png";
import Navbar from '../component/Navbar';

const ForBusiness = () => {
  
  const businessBenefits = [
    {
      id: 1,
      title: "Maximize Booking Potential",
      description: "Get more visibility and bookings through our platform with automated scheduling",
      icon: "📅"
    },
    {
      id: 2,
      title: "Simplified Management",
      description: "Manage all bookings, payments, and customer interactions from a single dashboard",
      icon: "🔄"
    },
    {
      id: 3,
      title: "Real-time Analytics",
      description: "Track performance metrics and insights to optimize your business operations",
      icon: "📊"
    },
    {
      id: 4,
      title: "Secure Payments",
      description: "Receive payments directly to your account with our secure payment gateway",
      icon: "💰"
    }
  ];

  const businessRules = [
    "Maintain high quality standards for your turf and facilities",
    "Respond to booking requests within 12 hours",
    "Keep your venue information and availability updated",
    "Provide clean and safe environment for players",
    "Honor all bookings made through the platform",
    "Process refunds according to the cancellation policy"
  ];

  return (
    <><div>
      <Navbar />
    </div><div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-sky-950 to-sky-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-green-400 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-green-400 rounded-full"></div>

        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <motion.img
                src={logo}
                alt="Turfi logo"
                className="w-20 h-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Grow Your Turf Business <span className="text-green-400">With Us</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join our platform and connect with thousands of players looking for quality venues like yours.
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {businessBenefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
                whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Rules Section */}
          <motion.div
            className="flex flex-col lg:flex-row gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 inline-block relative">
                <span className="relative z-10">Business Partner Rules</span>
                <span className="absolute bottom-1 left-0 w-full h-2 bg-green-400/30 -z-0"></span>
              </h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <ul className="space-y-4">
                  {businessRules.map((rule, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                    >
                      <div className="bg-green-400 text-sky-950 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>{rule}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                className="bg-gradient-to-br from-sky-800 to-sky-900 rounded-xl p-8 shadow-xl relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/10 rounded-full blur-3xl -z-0"></div>
                <h3 className="text-2xl font-bold mb-6 text-center">Register Your Company</h3>

                <form className="space-y-6 relative z-10">
                  <div>
                    <label className="block mb-2 text-sm">Company Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-colors"
                      placeholder="Enter your company name" />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-colors"
                      placeholder="Enter your email" />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-colors"
                      placeholder="Enter your phone number" />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Number of Venues</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-colors">
                      <option>1 Venue</option>
                      <option>2-5 Venues</option>
                      <option>6-10 Venues</option>
                      <option>More than 10 Venues</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-lg font-medium transition-all duration-300"
                  >
                    Register Your Company
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div></>
  );
};

export default ForBusiness;