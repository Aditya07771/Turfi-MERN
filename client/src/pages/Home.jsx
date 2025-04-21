import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../component/Navbar';
import Background from '../component/Background';
import TrufImage from "../assets/background2.webp";
import cricket from "../assets/cricket.jpeg";
import football from "../assets/football.jpeg";
import volleyball from "../assets/volleyball.jpeg";
import badminton from "../assets/batminton.jpeg";
import Hero from '../component/Hero';
import { motion } from 'framer-motion';
import OfferBanner from '../component/OfferBanner';
import MembershipRewards from '../component/MembershipRewards';
import Footer from '../component/Layouts/Footer';
import NearbyTurfs from '../component/NearbyTurfs';
import TurfCategories from '../component/TurfCategories';
import { MouseFollower } from 'react-mouse-follower';

const Home = () => {
  // Enhanced hero data with more engaging phrases
  let heroData = [
    {text1:"Dive into", text2:"what you love"},
    {text1:"Indulge", text2:"your passion"},
    {text1:"Discover", text2:"perfect spaces"},
  ];
  
  const [HeroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  
  // Media content for right side display
  const mediaContent = [
    { type: 'image', src: TrufImage, alt: 'Turf field overview' },
    { type: 'image', src: football, alt: 'Football match' },
    { type: 'image', src: cricket, alt: 'Cricket pitch' },
    { type: 'video', src: 'ultimate-turf-experience.mp4', alt: 'Turf experience video' }
  ];
  
  // Auto-rotate hero content
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((count) => (count === 2 ? 0 : count + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (playStatus) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [playStatus]);

  // Sample nearby turfs
  const nearbyTurfs = [
    {
      id: 1,
      name: 'Olympic Sports Arena',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA_uYuSdHX4UTSrj6QKKzh3xKbRPfDO3wDbQ&s',
      distance: '1.2 km',
      rating: 4.8,
      price: 1200,
      discount: 15,
      sports: ['Cricket', 'Football']
    },
    {
      id: 2,
      name: 'Green Field Sports',
      image: TrufImage,
      distance: '2.5 km',
      rating: 4.5,
      price: 1000,
      discount: 10,
      sports: ['Cricket', 'Volleyball']
    },
    {
      id: 3,
      name: 'Urban Playgrounds',
      image: 'https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1719570263115.webp&w=640&q=75',
      distance: '3.1 km',
      rating: 4.7,
      price: 1500,
      discount: 20,
      sports: ['Football', 'Badminton']
    },
    {
      id: 4,
      name: 'Arena Sports Complex',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLCrxVr7YkF7UWywEcnMyCzx-2Zr2jfDz4LAWn9jshRDGbYRU29D8mLeLDaZiMEgjKaw&usqp=CAU',
      distance: '3.8 km',
      rating: 4.6,
      price: 1300,
      discount: 12,
      sports: ['Badminton', 'Volleyball']
    }
  ];
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-sky-950 flex items-center justify-center z-50">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src="/assets/logos.png" 
            alt="Turfi" 
            className="w-32 h-32 mb-6"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="h-1 bg-green-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      
      
      {/* Enhanced visible background animations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Large animated circles */}
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-white/5 border border-white/10"
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
        />
        
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-green-400/5 border border-green-400/10"
          animate={{
            x: [0, -70, 0],
            y: [0, 40, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ bottom: '15%', right: '25%' }}
        />
        
        <motion.div 
          className="absolute w-48 h-48 rounded-full bg-teal-400/5 border border-teal-400/10"
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ top: '35%', right: '15%' }}
        />
        
        {/* Small glowing dots */}
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-400"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + (Math.random() * 0.6)
            }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ 
              duration: 3 + (Math.random() * 4), 
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <Background playStatus={playStatus} HeroCount={HeroCount} />
      
      <div className="flex flex-col md:flex-row justify-between items-start">
        <Hero 
          setPlayStatus={setPlayStatus}
          heroData={heroData[HeroCount]}
          HeroCount={HeroCount}
          setHeroCount={setHeroCount}
          playStatus={playStatus}
        />
        
        {/* Right side media content */}
        <motion.div 
          className="relative w-full md:w-2/5 h-screen mt-24 md:mt-0 z-10 pr-10 hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="relative mt-25 right-4 h-3/4 w-full rounded-l-3xl overflow-hidden shadow-2xl">
            {/* Images that rotate with HeroCount */}
            {[0, 1, 2].map((index) => (
              <motion.img
                key={`img-${index}`}
                src={mediaContent[index].src}
                alt={mediaContent[index].alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: HeroCount === index && !playStatus ? 1 : 0,
                  scale: HeroCount === index && !playStatus ? 1 : 1.1
                }}
                transition={{ duration: 0.8 }}
              />
            ))}
            
            {/* Video that plays when play button is clicked */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: playStatus ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={mediaContent[3].src}
                loop
                muted
                playsInline
              />
            </motion.div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/40 to-transparent z-10" />
            
            {/* Interactive elements */}
            <motion.div 
              className="absolute bottom-8 left-8 z-20 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">
                {playStatus ? 'Experience Turfi' : `${HeroCount === 0 ? 'Premium Facilities' : HeroCount === 1 ? 'Easy Booking' : 'Multiple Sports'}`}
              </div>
              
              {!playStatus && (
                <motion.div 
                  className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlayStatus(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Features section - preview */}
      
      
      {/* Turf Categories Section */}
      <TurfCategories/>

      {/* Nearby Turfs Section */}

      <NearbyTurfs nearbyTurfs = {nearbyTurfs}/>
      
      {/* Special Offers Banner */}
      <OfferBanner />

      {/* Membership and Reward Program */}
      <MembershipRewards />

      {/* Footer */}
      {/* <motion.div 
        className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-sky-950 to-transparent flex items-center justify-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="flex gap-4 md:gap-8 items-center"
          whileHover={{ y: -5 }}
        >
          <span className="text-white/70">Scroll to explore</span>
          <motion.div 
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            initial={{ y: 0 }}
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div 
              className="w-1 h-2 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </motion.div> */}
      
    </div>
  )}

export default Home;
