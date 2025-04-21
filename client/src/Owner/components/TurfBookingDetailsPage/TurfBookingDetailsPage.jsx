import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, CreditCard, Phone, Mail, AlertTriangle } from 'lucide-react';

const TurfBookingDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample data - replace with your actual data
  const turfDetails = {
    id: 1,
    name: "Green Field Turf",
    location: "Koramangala, Mumabi"
  };
  
  // Sample bookings data
  const bookings = {
    upcoming: [
      {
        id: 101,
        date: "2025-03-31",
        startTime: "18:00",
        endTime: "20:00",
        sport: "Football",
        user: {
          name: "Sanjay Yadav",
          age: 28,
          email: "sanjay.yadav@example.com",
          phone: "+91 9876543222"
        },
        payment: {
          amount: 2400,
          transactionId: "TXN123456789",
          status: "Paid",
          method: "Credit Card"
        }
      },
      {
        id: 102,
        date: "2025-03-31",
        startTime: "20:00",
        endTime: "22:00",
        sport: "Cricket",
        user: {
          name: "Kaushal Patil",
          age: 25,
          email: "kaushal.patil@example.com",
          phone: "+91 9876543223"
        },
        payment: {
          amount: 2400,
          transactionId: "TXN123456790",
          status: "Paid",
          method: "UPI"
        }
      }
    ],
    past: [
      {
        id: 103,
        date: "2025-03-29",
        startTime: "17:00",
        endTime: "19:00",
        sport: "Basketball",
        user: {
          name: "Amit Kumar",
          age: 32,
          email: "amit.k@example.com",
          phone: "+91 9876543224"
        },
        payment: {
          amount: 2400,
          transactionId: "TXN123456791",
          status: "Paid",
          method: "Net Banking"
        }
      }
    ],
    cancelled: [
      {
        id: 104,
        date: "2025-03-28",
        startTime: "16:00",
        endTime: "18:00",
        sport: "Football",
        user: {
          name: "Aditya Nishad",
          age: 27,
          email: "aditya.nishad@example.com",
          phone: "+91 9876543225"
        },
        payment: {
          amount: 2400,
          transactionId: "TXN123456792",
          status: "Refunded",
          method: "Credit Card",
          refundDetails: {
            amount: 2160, // 90% refund
            transactionId: "REF123456792",
            date: "2025-03-26"
          }
        },
        cancellationReason: "Bad weather forecast"
      }
    ]
  };

  const [selectedBooking, setSelectedBooking] = useState(null);
  
  // Function to handle booking cancellation
  const handleCancellation = (bookingId) => {
    // Implement your cancellation logic here
    alert(`Booking ${bookingId} cancellation process initiated`);
  };
  
  // Function to view user details
  const openUserDetails = (booking) => {
    setSelectedBooking(booking);
  };
  
  // Function to close user details modal
  const closeUserDetails = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <a 
          href="/turf-listings" 
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Listings</span>
        </a>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{turfDetails.name}</h1>
        <p className="text-gray-600 mt-1">{turfDetails.location}</p>
        
        <div className="mt-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming Bookings ({bookings.upcoming.length})
              </button>
              
              <button
                onClick={() => setActiveTab('past')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past Bookings ({bookings.past.length})
              </button>
              
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cancelled'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cancelled Bookings ({bookings.cancelled.length})
              </button>
            </nav>
          </div>
          
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sport
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings[activeTab].length > 0 ? (
                  bookings[activeTab].map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar size={16} className="text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.startTime} - {booking.endTime}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {booking.sport}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CreditCard size={16} className="text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              ₹{booking.payment.amount}
                            </div>
                            <div className={`text-xs ${
                              booking.payment.status === 'Paid' 
                                ? 'text-green-600' 
                                : booking.payment.status === 'Refunded'
                                  ? 'text-orange-600'
                                  : 'text-red-600'
                            }`}>
                              {booking.payment.status}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openUserDetails(booking)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View Details
                        </button>
                        
                        {activeTab === 'upcoming' && (
                          <button
                            onClick={() => handleCancellation(booking.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No {activeTab} bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* User Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
              <button
                onClick={closeUserDetails}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">User Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Name:</span>
                        <span className="text-sm ml-1">{selectedBooking.user.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs">
                        <span className="text-gray-400">A</span>
                      </span>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Age:</span>
                        <span className="text-sm ml-1">{selectedBooking.user.age} years</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Email:</span>
                        <span className="text-sm ml-1">{selectedBooking.user.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-gray-400 mr-2" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Phone:</span>
                        <span className="text-sm ml-1">{selectedBooking.user.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Booking Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Date:</span>
                        <span className="text-sm ml-1">
                          {new Date(selectedBooking.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Time:</span>
                        <span className="text-sm ml-1">
                          {selectedBooking.startTime} - {selectedBooking.endTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 flex items-center justify-center">
                        <span className="text-gray-400">⚽</span>
                      </span>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Sport:</span>
                        <span className="text-sm ml-1">{selectedBooking.sport}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-800 mt-6 mb-3">Payment Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CreditCard size={16} className="text-gray-400 mr-2" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Amount:</span>
                        <span className="text-sm ml-1">₹{selectedBooking.payment.amount}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs">
                        <span className="text-gray-400">ID</span>
                      </span>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Transaction ID:</span>
                        <span className="text-sm ml-1">{selectedBooking.payment.transactionId}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs">
                        <span className="text-gray-400">M</span>
                      </span>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Method:</span>
                        <span className="text-sm ml-1">{selectedBooking.payment.method}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs">
                        <span className={`${
                          selectedBooking.payment.status === 'Paid' 
                            ? 'text-green-600' 
                            : selectedBooking.payment.status === 'Refunded'
                              ? 'text-orange-600'
                              : 'text-red-600'
                        }`}>S</span>
                      </span>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className={`text-sm ml-1 font-medium ${
                          selectedBooking.payment.status === 'Paid' 
                            ? 'text-green-600' 
                            : selectedBooking.payment.status === 'Refunded'
                              ? 'text-orange-600'
                              : 'text-red-600'
                        }`}>
                          {selectedBooking.payment.status}
                        </span>
                      </div>
                    </div>
                    
                    {selectedBooking.payment.refundDetails && (
                      <div className="mt-2 p-2 bg-orange-50 border border-orange-100 rounded">
                        <div className="flex items-start">
                          <AlertTriangle size={16} className="text-orange-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-orange-800">Refund Details</p>
                            <p className="text-xs text-orange-700">
                              Amount: ₹{selectedBooking.payment.refundDetails.amount} • 
                              Processed: {new Date(selectedBooking.payment.refundDetails.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedBooking.cancellationReason && (
                <div className="mt-6 p-3 bg-gray-50 border rounded">
                  <p className="text-sm font-medium text-gray-700">Cancellation Reason:</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedBooking.cancellationReason}</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                {activeTab === 'upcoming' && (
                  <button
                    onClick={() => {
                      handleCancellation(selectedBooking.id);
                      closeUserDetails();
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                  >
                    Cancel Booking
                  </button>
                )}
                <button
                  onClick={closeUserDetails}
                  className="ml-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurfBookingDetailsPage;