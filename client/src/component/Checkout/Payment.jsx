// Payment.js
import React from "react";

const Payment = ({ onNext, onBack }) => {
  return (
    <div>
      <h2>Make Payment</h2>
      {/* Add payment UI here */}
      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Payment;
