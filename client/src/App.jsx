import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRoute from "./Routes/UserRoute";
import OwnerRoute from "./Routes/OwnerRoute";
import AdminRoutes from "./Routes/AdminRoutes";
import AdminDashboard from "./Owner/AdminDashboard/AdminDashboard";
import TurfListingForm from "./Owner/SlotTheTurf/TurfListingForm";
import ChatBubble from "./component/Chatbot/ChatBubble";

const App = () => {
  // return (
  //   <div className="bg-gradient-to-b from-sky-950 to-sky-900 min-h-screen">
  //     <div>
  //       <Navbar />
  //     </div>

  //     <Routes>
  //       <Route path='/' element={<Home />} />
  //       <Route path='/for-business' element={<ForBusiness/>} />
  //       <Route path='/venue' element={<Venue />} />
  //       <Route path='/contact' element={<ContactUs />} />
  //       <Route path='/login' element={<Login/>} />
  //       <Route path='/email-verify' element={<EmailVerify/>}/>
  //       <Route path='/admin' element={<AdminForm />} />
  //       <Route path='/reset-password' element={<ResetPassword/>} />
  //       <Route path='/turf-filter' element={<TurfBookingPage/>}/>
  //       <Route path='/turf-details' element={<TurfDetails/>}/>
  //       <Route path='/checkout' element={<Checkout/>}/>
  //       <Route path='/stepper' element={<BookingStepper/>}/>
  //       <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
  //       <Route path='/turf-slot-creation' element={<TurfSlotCreation/>}/>
  //       <Route path='/owner-registration' element={<OwnerRegistration/>}/>
  //       <Route path='/turf-listing' element={<TurfListingForm/>}/>
  //       <Route path='/owner-navigation' element={<OwnerNavigation/>}/>
  //     </Routes>
  //   </div>
  // );
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/owner/*" element={<OwnerRoute />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path='admin-dashboard' element={<AdminDashboard/>}/>
      </Routes>

      <ChatBubble/>
    </div>
  );
};

export default App;
