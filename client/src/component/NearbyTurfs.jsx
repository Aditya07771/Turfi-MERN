import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
const NearbyTurfs = ({ nearbyTurfs }) => {

  const navigate = useNavigate();
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-3">Find Courts Near You</h2>
              <p className="text-gray-600 max-w-xl">Discover top-rated sports facilities in your neighborhood with exclusive deals and instant booking.</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button onClick={() => navigate('/turf-filter')} className="flex items-center gap-2 bg-sky-950 hover:bg-sky-900 text-white px-6 py-3 rounded-full transition-colors duration-300">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {nearbyTurfs.map((turf, index) => (
              <motion.div 
                key={turf.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative">
                  <img 
                    src={turf.image} 
                    alt={turf.name} 
                    className="w-full h-48 object-cover"
                  />
                  
                  {turf.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white font-semibold text-sm px-3 py-1 rounded-full">
                      {turf.discount}% OFF
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-sky-950">
                    {turf.distance} away
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-sky-950">{turf.name}</h3>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-sky-950">{turf.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {turf.sports.map(sport => (
                      <span key={sport} className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">
                        {sport}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-500 text-sm">Starting from</span>
                      <div className="flex items-center gap-2">
                        {turf.discount > 0 && (
                          <span className="text-gray-400 line-through text-sm">₹{turf.price}</span>
                        )}
                        <span className="text-green-500 font-bold text-lg">
                          ₹{Math.round(turf.price * (1 - turf.discount / 100))}
                        </span>
                      </div>
                    </div>
                    
                    <button onClick={() => navigate('/turf-details')} className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm transition-colors duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default NearbyTurfs