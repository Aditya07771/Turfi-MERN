import React from 'react'
import { motion } from "framer-motion";

const MembershipRewards = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-sky-50">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-6">Join Our Membership & Earn Rewards</h2>
          <p className="text-gray-600 mb-8">Book more, save more! Become a member and enjoy exclusive discounts, priority bookings, and loyalty points for every reservation.</p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition-colors font-semibold">Become a Member</button>
            <button className="bg-gray-200 text-sky-950 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold">Learn More</button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img src="/assets/user-1.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="/assets/user-2.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="/assets/user-3.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-green-500">Join 5,000+ happy members</span> who save on bookings!
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/assets/membership-benefits.png" 
            alt="Membership Benefits" 
            className="max-w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  </section>
  )
}

export default MembershipRewards