import React from 'react'
import { motion } from "framer-motion";

const OfferBanner = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
        <motion.div 
          className="container mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-r from-sky-900 to-sky-700 rounded-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M44.8,-76.5C57.9,-68.2,68.6,-55.9,76.4,-42.1C84.2,-28.2,89.1,-14.1,87.9,-0.7C86.7,12.7,79.4,25.4,71.5,37.7C63.7,50,55.2,61.9,43.4,70.1C31.6,78.3,15.8,82.7,0.3,82.3C-15.3,81.8,-30.6,76.5,-43.9,68.1C-57.2,59.7,-68.5,48.3,-76.2,34.9C-83.9,21.5,-88,6.2,-85.6,-8.2C-83.2,-22.6,-74.3,-36.1,-63.6,-45.8C-52.9,-55.5,-40.5,-61.5,-28.4,-70.3C-16.3,-79.1,-4.3,-90.7,7.8,-90.5C19.9,-90.3,39.9,-78.4,44.8,-76.5Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="relative z-10">
                <span className="inline-block bg-green-400 text-sky-900 font-bold px-4 py-1 rounded-full text-sm mb-4">LIMITED TIME OFFER</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Early Bird Discount: 25% Off on All Weekday Bookings</h2>
                <p className="text-white/80 mb-8">Book any turf Monday through Thursday before 4 PM and get an exclusive 25% discount. Perfect for practice sessions, friendly matches, or corporate events.</p>
                
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-sky-900 hover:bg-green-400 px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                    Book Now
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 w-full max-w-sm">
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="text-sky-900 font-bold text-xl mb-4">Use Promo Code</h3>
                    <div className="bg-sky-50 border-2 border-dashed border-sky-300 rounded-lg p-3 text-center mb-6">
                      <span className="text-2xl font-bold tracking-wider text-sky-800">EARLYBIRD25</span>
                    </div>
                    <p className="text-gray-600 text-sm">Valid until March 15, 2025. Terms and conditions apply.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
  )
}

export default OfferBanner