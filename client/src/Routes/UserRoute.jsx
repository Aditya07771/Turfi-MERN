import React from 'react'
import Navbar from '../component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Venue from '../pages/Venue'
import ContactUs from '../pages/ContactUs'
import Footer from '../component/Layouts/Footer'
import ForBusiness from '../pages/ForBusinesss'
import Login from '../pages/auth/Login'
import EmailVerify from '../pages/auth/EmailVerify'
import TurfBookingPage from '../component/Product/TurfBookingPage'
import TurfDetailPage from '../component/TurfDetails/TurfDetails'
import Checkout from '../component/Checkout/Checkout'
import BookingStepper from '../component/Checkout/BookingStepper'
import WaitingApproval from '../Owner/WaitingApproval/WaitingApproval '
import BookingsPage from '../component/MyBooking/BookingsPage'

const UserRoute = () => {
  return (
    <div className="bg-gradient-to-b from-sky-950 to-sky-900 min-h-screen">
        <div>
            <Navbar/>
        </div>
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/for-business' element={<ForBusiness/>} />
                <Route path='/venue' element={<Venue />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/email-verify' element={<EmailVerify/>}/>
                <Route path='/turf-filter' element={<TurfBookingPage/>}/>
                {/* <Route path='/turf-details/:id' element={<TurfDetailPage/>}/> */}
                <Route path='/turf-details' element={<TurfDetailPage/>}/>
                <Route path='/stepper' element={<BookingStepper/>}/>
                <Route path='/waiting-approval' element={<WaitingApproval />} />
                <Route path='/my-bookings' element={<BookingsPage />} />
                
                
            </Routes>

            
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default UserRoute