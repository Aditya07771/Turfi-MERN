// routes/turf.routes.js
const express = require("express");
const router = express.Router();
import {
  addTurfReview,
  getAllTurfs,
  getTurfAvailability,
  getTurfById,
  getTurfReviews,
} from "../controller/turf.controller";
import turfController from "../controllers/turf.controller";

// Public routes
router.get("/", getAllTurfs);
router.get("/:id", getTurfById);
router.get("/:id/availability", getTurfAvailability);
router.get("/:id/reviews", getTurfReviews);

// Protected routes
router.post("/:id/reviews", auth, addTurfReview);

module.exports = router;
