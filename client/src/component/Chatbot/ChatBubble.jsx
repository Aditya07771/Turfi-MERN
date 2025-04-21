import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can I help with your turf booking today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  
  // Preset questions categorized by topic
  const presetQuestions = [
    "What turf options are available?",
    "How do I book a turf?",
    "What are your cancellation policies?",
    "Do you offer any discounts?",
    "What amenities are included?",
    "What payment methods do you accept?"
  ];

  // Knowledge base for chatbot responses
  const knowledgeBase = {
    // Availability related keywords and responses
    availability: {
      keywords: ['available', 'free', 'open', 'time slot', 'when', 'schedule'],
      response: "We have several turfs available at different times. Football turfs are typically available from 6 AM to 10 PM daily, while cricket turfs are available from 6 AM to 6 PM. You can check real-time availability on our booking page or app. Would you like me to help you check specific availability?"
    },
    
    // Booking process related keywords and responses
    booking: {
      keywords: ['book', 'reserve', 'reservation', 'how to book', 'make a booking'],
      response: "Booking a turf is easy! Just follow these steps:\n1. Select your preferred turf type (football, cricket, etc.)\n2. Choose your preferred date and time slot\n3. Enter the number of players\n4. Complete the payment\n\nYou'll receive a confirmation email with your booking details."
    },
    
    // Pricing related keywords and responses
    pricing: {
      keywords: ['cost', 'price', 'fee', 'charges', 'how much', 'rate', 'package'],
      response: "Our pricing varies based on turf type, time of day, and day of week:\n• Football turfs: ₹800-1500/hour\n• Cricket turfs: ₹1000-1800/hour\n• Multi-sport turfs: ₹700-1200/hour\n\nWeekend rates are slightly higher. We also offer monthly packages for regular players with up to 20% discount."
    },
    
    // Cancellation related keywords and responses
    cancellation: {
      keywords: ['cancel', 'reschedule', 'refund', 'change booking', 'rain'],
      response: "Our cancellation policy is as follows:\n• Cancellations made 24+ hours in advance: Full refund\n• Cancellations within 12-24 hours: 50% refund\n• Cancellations less than 12 hours: No refund\n\nIn case of bad weather, we offer rescheduling options or indoor alternatives where available."
    },
    
    // Facilities related keywords and responses
    facilities: {
      keywords: ['facility', 'amenities', 'changing room', 'parking', 'equipment', 'floodlight'],
      response: "Our turfs come with the following amenities:\n• Clean changing rooms with showers\n• Free parking space\n• Floodlights for evening games\n• Basic sports equipment rental\n• Drinking water facilities\n• Seating areas for spectators\n• Some locations have cafes/refreshment stands"
    },
    
    // Sports and turf types related keywords and responses
    turfTypes: {
      keywords: ['type of turf', 'football turf', 'cricket turf', 'synthetic', 'grass', 'indoor'],
      response: "We offer multiple turf types:\n• Artificial grass football turfs (FIFA approved)\n• Natural grass cricket pitches\n• Multi-sport synthetic turfs\n• Indoor courts at select locations\n\nOur turfs are maintained to professional standards and suitable for both casual games and serious training."
    },
    
    // Location related keywords and responses
    location: {
      keywords: ['where', 'location', 'address', 'directions', 'near', 'reach'],
      response: "We have turfs at multiple locations across the city:\n• City Center: Green Field Arena\n• Downtown: Urban Sports Complex\n• Riverside Area: Riverside Turf\n• Suburban Area: Sunset Sports Ground\n\nDetailed directions and maps are available on our website's location page."
    },
    
    // Group booking related keywords and responses
    groupBooking: {
      keywords: ['group', 'team', 'tournament', 'event', 'corporate'],
      response: "We offer special packages for group bookings:\n• Team practice sessions at discounted rates\n• Full-day tournament rentals\n• Corporate event packages with additional services\n\nGroups of 10+ players can enjoy a 10% discount. For tournaments or events, please contact us directly at booking@turfexample.com."
    },
    
    // Payment related keywords and responses
    payment: {
      keywords: ['payment', 'pay', 'card', 'cash', 'upi', 'online'],
      response: "We accept multiple payment methods:\n• All major credit/debit cards\n• UPI payments (PhonePe, Google Pay, etc.)\n• Net banking\n• Cash payments at our reception\n\nOnline bookings require advance payment, while walk-in bookings can be paid for at the venue."
    },
    
    // Weather related keywords and responses
    weather: {
      keywords: ['rain', 'weather', 'covered', 'indoor', 'outdoor'],
      response: "For weather-related concerns:\n• Some of our turfs have covered areas or are indoor\n• In case of heavy rain, we offer rescheduling options\n• Light drizzle typically doesn't affect gameplay on our synthetic turfs\n• Weather cancellations are assessed on a case-by-case basis\n\nWe recommend checking the weather forecast before booking outdoor turfs."
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Function to find the best response based on user input
  const findResponse = (input) => {
    const normalizedInput = input.toLowerCase();
    
    // Check each category in knowledge base
    for (const category in knowledgeBase) {
      const { keywords, response } = knowledgeBase[category];
      
      // Check if any keyword matches
      if (keywords.some(keyword => normalizedInput.includes(keyword))) {
        return response;
      }
    }
    
    // Default response if no match found
    return "I'm not sure about that specific question. You can ask about our turfs, booking process, pricing, facilities, or contact our support team at support@turfexample.com for more detailed information.";
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { sender: 'user', text: userInput }]);
    
    // Get bot response
    const botResponse = findResponse(userInput);
    
    // Clear input field
    setUserInput('');
    
    // Simulate bot response with slight delay for realism
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: botResponse
      }]);
    }, 1000);
  };

  const handlePresetQuestion = (question) => {
    // Add preset question as user message
    setMessages([...messages, { sender: 'user', text: question }]);
    
    // Get bot response
    const botResponse = findResponse(question);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: botResponse
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
        >
          <MessageCircle className="text-white" size={24} />
        </button>
      )}
      
      {/* Chat Box */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 sm:w-96 h-96 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold">Turf Booking Assistant</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 max-w-3/4 ${
                  msg.sender === 'user' 
                    ? 'ml-auto bg-blue-100 rounded-lg p-2 rounded-tr-none' 
                    : 'mr-auto bg-white border border-gray-200 rounded-lg p-2 rounded-tl-none'
                }`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
          
          {/* Quick Questions */}
          <div className="p-2 border-t border-gray-200 bg-gray-50 max-h-32 overflow-y-auto">
            <p className="text-xs text-gray-500 mb-2">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {presetQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetQuestion(question)}
                  className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full text-gray-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 p-2 flex items-center bg-white">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;