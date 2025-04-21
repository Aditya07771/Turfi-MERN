const mongoose = require("mongoose");


const TurfSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    turfName: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    latitude: { type: Number, required: true },  // Store location
    longitude: { type: Number, required: true }, // Store location
    sportsAvailable: [{ type: String }],
    amenities: [{ type: String }],
    groundType: { type: String },
    pricePerHour: { type: Number, required: true },
    openingTime: { type: String },
    closingTime: { type: String },
    availability: { type: Map, of: [String] },
    images: [{ type: String }],
    video: { type: String },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number },
        comment: { type: String }
      }
    ],
    averageRating: { type: Number, default: 0 },
    contactNumber: { type: String, required: true },
    email: { type: String },
    website: { type: String },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    cancellationPolicy: { type: String },
    termsAndConditions: { type: String },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Turf", TurfSchema);
  