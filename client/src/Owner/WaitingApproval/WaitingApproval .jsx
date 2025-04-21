import React from 'react';

const WaitingApproval = () => {
  return (
    <div className="min-h-screen bg-sky-950 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-center text-white">
        <h1 className="text-2xl mb-4">Your registration is pending approval</h1>
        <p>Our admin team will review your application within 24-48 hours.</p>
      </div>
    </div>
  );
};

export default WaitingApproval;