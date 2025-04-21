import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/logos.png";
import Navbar from '../component/Navbar';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };
  
  const contactInfo = [
    {
      icon: "📱",
      title: "Phone",
      value: "+91 72087 39200",
      link: "tel:+919876543210"
    },
    {
      icon: "✉️",
      title: "Email",
      value: "support@turfi.com",
      link: "mailto:support@turfi.com"
    },
    {
      icon: "📍",
      title: "Address",
      value: "123 Sports Lane, Mumbai, India",
      link: "#"
    }
  ];
  
  return (
    <><div>
          <Navbar />
      </div><div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-sky-950 to-sky-900 text-white relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute top-20 right-20 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

              {/* Floating logos */}
              <motion.div
                  className="absolute top-1/4 left-10 opacity-20"
                  animate={{
                      y: [0, 20, 0],
                      rotate: [0, 10, 0]
                  }}
                  transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                  }}
              >
                  <img src={logo} alt="" className="w-20 h-20" />
              </motion.div>

              <motion.div
                  className="absolute bottom-1/4 right-10 opacity-20"
                  animate={{
                      y: [0, -20, 0],
                      rotate: [0, -10, 0]
                  }}
                  transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                  }}
              >
                  <img src={logo} alt="" className="w-16 h-16" />
              </motion.div>

              <div className="container mx-auto px-6">
                  <motion.div
                      className="text-center mb-16"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                  >
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">
                          Get In <span className="text-green-400">Touch</span>
                      </h1>
                      <p className="text-xl text-white/80 max-w-2xl mx-auto">
                          Have questions or feedback? We're here to help. Reach out to our team.
                      </p>
                  </motion.div>

                  <div className="flex flex-col lg:flex-row gap-12">
                      {/* Contact Form */}
                      <motion.div
                          className="lg:w-2/3 bg-white/10 backdrop-blur-md rounded-xl p-8 relative overflow-hidden"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                      >
                          <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/10 rounded-full blur-3xl -z-0"></div>

                          {submitted ? (
                              <motion.div
                                  className="h-full flex flex-col items-center justify-center py-12"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                              >
                                  <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center text-3xl mb-6">
                                      ✓
                                  </div>
                                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                                  <p className="text-white/80 text-center">
                                      Your message has been sent successfully. We'll get back to you soon.
                                  </p>
                              </motion.div>
                          ) : (
                              <form onSubmit={handleSubmit} className="relative z-10">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                      <div>
                                          <label className="block mb-2 text-sm">Your Name</label>
                                          <input
                                              type="text"
                                              name="name"
                                              value={formData.name}
                                              onChange={handleChange}
                                              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-colors"
                                              placeholder="John Doe"
                                              required />
                                      </div>

                                      <div>
                                          <label className="block mb-2 text-sm">Email Address</label>
                                          <input
                                              type="email"
                                              name="email"
                                              value={formData.email}
                                              onChange={handleChange}
                                              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-colors"
                                              placeholder="your@email.com"
                                              required />
                                      </div>
                                  </div>

                                  <div className="mb-6">
                                      <label className="block mb-2 text-sm">Subject</label>
                                      <input
                                          type="text"
                                          name="subject"
                                          value={formData.subject}
                                          onChange={handleChange}
                                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-colors"
                                          placeholder="How can we help you?"
                                          required />
                                  </div>

                                  <div className="mb-6">
                                      <label className="block mb-2 text-sm">Your Message</label>
                                      <textarea
                                          name="message"
                                          value={formData.message}
                                          onChange={handleChange}
                                          rows="5"
                                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-colors"
                                          placeholder="Tell us more about your inquiry..."
                                          required
                                      ></textarea>
                                  </div>

                                  <button
                                      type="submit"
                                      className="px-8 py-3 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-lg font-medium transition-all duration-300"
                                  >
                                      Send Message
                                  </button>
                              </form>
                          )}
                      </motion.div>

                      {/* Contact Info */}
                      <motion.div
                          className="lg:w-1/3"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                      >
                          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8">
                              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                              <div className="space-y-6">
                                  {contactInfo.map((item, index) => (
                                      <a
                                          key={index}
                                          href={item.link}
                                          className="flex items-start gap-4 group"
                                      >
                                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-green-400/20 transition-colors">
                                              {item.icon}
                                          </div>
                                          <div>
                                              <h4 className="text-lg font-medium">{item.title}</h4>
                                              <p className="text-white/70 group-hover:text-green-400 transition-colors">{item.value}</p>
                                          </div>
                                      </a>
                                  ))}
                              </div>
                          </div>

                          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
                              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>

                              <div className="space-y-3">
                                  <div className="flex justify-between">
                                      <span>Monday - Friday:</span>
                                      <span className="text-green-400">9:00 AM - 8:00 PM</span>
                                  </div>
                                  <div className="flex justify-between">
                                      <span>Saturday:</span>
                                      <span className="text-green-400">10:00 AM - 6:00 PM</span>
                                  </div>
                                  <div className="flex justify-between">
                                      <span>Sunday:</span>
                                      <span className="text-green-400">10:00 AM - 4:00 PM</span>
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                  </div>
              </div>
          </div></>
  );
};

export default ContactUs;