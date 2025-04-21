// TurfCard.js
import React from "react";

const TurfCard = ({ turf, onProceed }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{turf.name}</h3>
      <p>{turf.location}</p>
      <p>Price: {turf.price}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={onProceed}>Book Now</button>
    </div>
  );
};

export default TurfCard;
