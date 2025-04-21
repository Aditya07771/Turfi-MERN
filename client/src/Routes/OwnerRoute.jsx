import React from "react";
import Footer from "../component/Layouts/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import OwnerNavigation from "../Owner/components/Navigation/OwnerNavigation";
import TurfListingForm from "../Owner/SlotTheTurf/TurfListingForm";
import TurfBookingDetailsPage from "../Owner/components/TurfBookingDetailsPage/TurfBookingDetailsPage";
import TurfListingPage from "../Owner/components/MyTurfListingPage/TurfListingPage";
import OwnerRegistration from "../Owner/SlotTheTurf/OwnerRegistration";

const OwnerRoute = () => {
  return (
    <div className="bg-gradient-to-b from-sky-950 to-sky-900 min-h-screen">
      <div>
        <OwnerNavigation />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="turf-listing" element={<TurfListingForm />} /> 
          <Route path='/register' element={<OwnerRegistration/>}/>
          {/* <Route path="turf-bookings/:id" element={<TurfBookingDetailsPage/>}/> */}
          <Route path="turf-bookings/1" element={<TurfBookingDetailsPage/>}/>
          <Route path="my-turf-listing" element={<TurfListingPage/>}/>
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default OwnerRoute;
