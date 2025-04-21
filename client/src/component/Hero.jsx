import React from 'react';
import { motion } from 'framer-motion';
import arrow_btn from "../assets/arrow_btn.png";
import play_icon from "../assets/play_icon.png";
import pause_icon from "../assets/pause_icon.png";

const Hero = ({ setPlayStatus, heroData, HeroCount, setHeroCount, playStatus }) => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };
  
  return (
    <motion.div
      className="relative z-10 ml-10 md:ml-20 mt-32 md:mt-40 max-w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="text-5xl md:text-7xl text-white font-bold leading-tight md:leading-[90px]"
        key={HeroCount} // This forces re-render of animation when HeroCount changes
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={textVariants}
      >
        <motion.p 
          className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          variants={textVariants}
        >
          {heroData.text1}
        </motion.p>
        <motion.p 
          className="bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          {heroData.text2}
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="group flex items-center gap-5 max-w-fit mt-10 p-1 pl-8 pr-2 rounded-full bg-white cursor-pointer shadow-lg hover:shadow-green-400/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-sky-950 text-lg font-medium group-hover:text-green-600 transition-colors">Explore the features</p>
        <motion.div 
          className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center"
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <img src={arrow_btn} alt="Explore" className="w-6 h-6" />
        </motion.div>
      </motion.div>
      
      <div className="mt-42 pb-10 flex flex-col md:flex-row md:justify-between md:items-end">
        <motion.ul 
          className="flex items-center gap-5 list-none mb-10 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.li 
              key={index}
              onClick={() => setHeroCount(index)} 
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                HeroCount === index 
                  ? "bg-green-400 scale-110" 
                  : "bg-white/60 hover:bg-white"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.ul>
        
        <motion.div 
          className="flex items-center gap-5 mr-10 md:mr-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        > 
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full bg-green-400/20 -z-10"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.img 
              onClick={() => setPlayStatus(!playStatus)} 
            src={playStatus ? pause_icon : play_icon} 
              alt={playStatus ? "Pause video" : "Play video"}
              className="w-14 h-14 md:w-16 md:h-16 cursor-pointer relative z-10"
            />
          </motion.div>
          <p className="text-white text-lg md:text-xl">See the video</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;