import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Background = ({ playStatus, HeroCount }) => {
  const [videoSrc, setVideoSrc] = useState('');
  
  useEffect(() => {
    // In a real project, you would have actual video files
    // Here we're just simulating different video backgrounds based on HeroCount
    const videos = [
      '/ultimate-turf-experience.mp4'
    ];
    
    setVideoSrc(videos[HeroCount]);
  }, [HeroCount]);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/80 to-sky-900/80 z-10"></div>
      
      {/* Video background (simulated) */}
      <div className="absolute inset-0 z-0">
        {/* In a real implementation, this would be a video element */}
        {/* We're simulating with a gradient background that changes with HeroCount */}
        <motion.div 
          className="w-full h-full"
          animate={{ 
            background: [
              HeroCount === 0 ? "linear-gradient(135deg, #0f2b46 0%, #164e63 100%)" : "",
              HeroCount === 1 ? "linear-gradient(135deg, #134e4a 0%, #0f2b46 100%)" : "",
              HeroCount === 2 ? "linear-gradient(135deg, #15803d 0%, #0f2b46 100%)" : ""
            ]
          }}
          transition={{ duration: 1.5 }}
        ></motion.div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute inset-0 z-0 opacity-50">
        {/* Animated circles */}
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-white/5"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ top: '10%', left: '10%' }}
        ></motion.div>
        
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-green-400/5"
          animate={{
            x: [0, -70, 0],
            y: [0, 40, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ bottom: '5%', right: '15%' }}
        ></motion.div>
        
        {/* Dynamic patterns based on HeroCount */}
        {HeroCount === 0 && (
          <>
            <motion.div 
              className="absolute w-2 h-2 rounded-full bg-green-400"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              style={{ top: '25%', left: '30%' }}
            ></motion.div>
            
            <motion.div 
              className="absolute w-3 h-3 rounded-full bg-green-400"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 
              }}
              style={{ top: '65%', left: '70%' }}
            ></motion.div>
          </>
        )}
        
        {HeroCount === 1 && (
          <>
            <motion.div 
              className="absolute w-32 h-32 border-2 border-green-400/30 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.5, 2],
              }}
              transition={{ 
                duration:.5, 
                repeat: Infinity,
                ease: "easeOut" 
              }}
              style={{ top: '40%', left: '60%' }}
            ></motion.div>
          </>
        )}
        
        {HeroCount === 2 && (
          <>
            <motion.div 
              className="absolute w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div 
                className="absolute w-1 h-24 bg-gradient-to-b from-transparent via-green-400/40 to-transparent"
                animate={{ 
                  y: [-100, window.innerHeight + 100],
                  x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                  delay: Math.random() * 5
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute w-1 h-16 bg-gradient-to-b from-transparent via-green-400/30 to-transparent"
                animate={{ 
                  y: [-100, window.innerHeight + 100],
                  x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                  delay: Math.random() * 5
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute w-0.5 h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                animate={{ 
                  y: [-100, window.innerHeight + 100],
                  x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                  delay: Math.random() * 5
                }}
              ></motion.div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Background; 