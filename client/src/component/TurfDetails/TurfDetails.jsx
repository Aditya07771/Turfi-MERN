import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, CheckCircle } from 'lucide-react';
import { Box, Grid, LinearProgress, Rating } from '@mui/material';
import TurfReviewCard from './TurfReviewCard';
import image from '../../assets/background2.webp';
import { useNavigate } from 'react-router-dom';

// Turf Detail Mock Data
const turfDetails = {
  id: 2,
  name: "Urban Sports Complex",
  location: "Downtown, City Center",
  category: "Cricket",
  price: 1500,
  rating: 4.8,
  totalReviews: 245,
  images: [
    "https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1719570263115.webp&w=640&q=75",
    "https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1707839312772.webp&w=640&q=75 ",
    "https://static.vecteezy.com/system/resources/thumbnails/006/981/368/small_2x/artificial-turf-of-soccer-football-field-photo.jpg",
    "https://content.jdmagicbox.com/comp/goa/y1/0832px832.x832.220506011814.b6y1/catalogue/dcosta-sports-arena-quepem-goa-sports-clubs-y01ScKI3s5.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjtnlfz7_a-F7TJ9_7n0VzuT8h2pMD2zr2myqagcot3ymioFJ349ux1GCsanfe2EnRZYY&usqp=CAU"
  ],
  googleMapsLink: "https://www.google.com/maps/place/13%C2%B003'03.6%22N+80%C2%B009'00.4%22E/@13.051,80.1475251,17z/data=!3m1!4b1!4m4!3m3!8m2!3d13.051!4d80.1501?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoJLDEwMjExNjQwSAFQAw%3D%3D",
  amenities: [
    "Floodlights",
    "Professional Pitch",
    "Changing Rooms",
    "Seating Area",
    "Coaching Facilities",
    "Parking"
  ],
  rules: [
    "No Smoking",
    "No Alcohol",
    "No Metal Studs or Spikes Shoes",
    "No Eatables Allowed Inside Turf Arena"
  ]
};

  

// Time Slots Component
const TimeSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const currentTime = new Date();
    
    for (let hour = 6; hour <= 22; hour++) {
      const slot = `${hour.toString().padStart(2, '0')}:00`;
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hour, 0, 0, 0);
      
      slots.push({
        time: slot,
        available: slotTime > currentTime
      });
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <input 
          type="date" 
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
        <div className="grid grid-cols-4 gap-4">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              disabled={!slot.available}
              onClick={() => setSelectedSlot(slot.time)}
              className={`
                py-2 px-4 rounded-md transition-all
                ${slot.available 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                ${selectedSlot === slot.time ? 'ring-2 ring-green-500' : ''}
              `}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Turf Detail Page
export default function TurfDetailPage() {
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleBookNow = () => {
    console.log("Book Now clicked");
    navigate('/stepper');
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 mt-25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img 
                src={turfDetails.images[currentImageIndex]} 
                alt={`${turfDetails.name} - View ${currentImageIndex + 1}`}
                className="w-full h-[500px] object-cover object-center rounded-lg shadow-md"
              />
            </div>
            <div className="flex space-x-5 overflow-x-auto">
              {turfDetails.images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`
                    w-20 h-20 object-cover rounded-md cursor-pointer 
                    ${currentImageIndex === index 
                      ? 'ring-2 ring-green-500' 
                      : 'opacity-60 hover:opacity-100'}
                  `}
                />
              ))}
            </div>
          </div>

          {/* Turf Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {turfDetails.name}
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 mr-1" />
                  <span className="text-gray-700">
                    {turfDetails.rating} ({turfDetails.totalReviews} reviews)
                  </span>
                </div>
                <a 
                  href={turfDetails.googleMapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <MapPin className="w-5 h-5 mr-1" />
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* Location and Price */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-500" />
                    {turfDetails.location}
                  </p>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-500" />
                    {turfDetails.category} Turf
                  </p>
                </div>
                <div className="text-2xl font-bold text-green-700">
                  ₹{turfDetails.price}/hour
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-2">
                {turfDetails.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Ground Rules</h2>
              <ul className="space-y-2 text-gray-600">
                {turfDetails.rules.map((rule, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Time Slots */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Book Your Slot</h2>
              <TimeSlots />
            </div>

            {/* Book Now Button */}
            <button 
            onClick={handleBookNow}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              Proceed to Book
            </button>
          </div>
        </div>
      </div>
      
<section>
  <h1 className='font-semibold text-lg pb-4'>Recent Reviews and Rating</h1>
  <div className='border border-gray-200 p-5'>
    <Grid container spacing={7}>
      <Grid item xs={7}>
        <div className='space-y-5'>
          {[1,1,1].map((item, index) => <TurfReviewCard key={index}/> )}
        </div>
      </Grid>

      <Grid item xs={5}>
        <h1 className='text-xl font-semibold pb-1'>Product Ratings</h1>
        <div className='flex items-center space-x-3'>
          <Rating name='read-only' value={4.6} precision={0.5} readOnly/>
          <p className='opacity-60'>59815 Ratings</p>
        </div>

        <Box className='mt-5'>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <p className="text-sm">Excellent</p>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress 
                sx={{
                  bgcolor:"#d0d0d0", 
                  borderRadius:4, 
                  height:7,
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#4CAF50"
                  }
                }} 
                variant='determinate' 
                value={70}
              />
            </Grid>

            <Grid item xs={3}>
              <p className="text-sm">Very Good</p>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress 
                sx={{
                  bgcolor:"#d0d0d0", 
                  borderRadius:4, 
                  height:7,
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#8BC34A"
                  }
                }} 
                variant='determinate' 
                value={55}
              />
            </Grid>

            <Grid item xs={3}>
              <p className="text-sm">Good</p>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress 
                sx={{
                  bgcolor:"#d0d0d0", 
                  borderRadius:4, 
                  height:7,
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#FFC107"
                  }
                }} 
                variant='determinate' 
                value={40}
              />
            </Grid>

            <Grid item xs={3}>
              <p className="text-sm">Average</p>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress 
                sx={{
                  bgcolor:"#d0d0d0", 
                  borderRadius:4, 
                  height:7,
                 
                }} 
                variant='determinate' 
                value={25}
                color='warning'
              />
            </Grid>

            <Grid item xs={3}>
              <p className="text-sm">Poor</p>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress 
                sx={{
                  bgcolor:"#d0d0d0", 
                  borderRadius:4, 
                  height:7,
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#f44336"
                  }
                }} 
                variant='determinate' 
                value={10}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  </div>
</section>

    

    </div>
  );
}