// TurfSelection.js
import React from "react";

const TurfSelection = ({ onNext }) => {
  return (
    <div>
      <h2>Select Turf & Time Slot</h2>
      {/* Add turf selection UI here */}
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default TurfSelection;
