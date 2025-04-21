import React from 'react';
import { motion } from "framer-motion";
import cricket from "../assets/cricket.jpeg";
import football from "../assets/football.jpeg";
import volleyball from "../assets/volleyball.jpeg";
import badminton from "../assets/batminton.jpeg";

const TurfCategories = () => {

    // Sample turf categories
      const turfCategories = [
        { 
          id: 1, 
          name: 'Cricket', 
          image: cricket,
          count: 24
        },
        { 
          id: 2, 
          name: 'Football', 
          image: football,
          count: 36
        },
        { 
          id: 3, 
          name: 'Volleyball', 
          image: volleyball,
          count: 18
        },
        { 
          id: 4, 
          name: 'Badminton', 
          image: badminton,
          count: 42
        }
      ];


  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-4">Turf Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect playing field for your favorite sport. We offer a variety of well-maintained turfs for different sports and activities.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {turfCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10" />
                
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transition-all duration-300">
                  <h3 className="text-white text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-green-300">{category.count} Venues Available</p>
                  
                  <div className="h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100 group-hover:mt-3">
                    <button className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm transition-colors duration-300">
                      Explore Venues
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

export default TurfCategories