import jwt from "jsonwebtoken";
import { Owner } from "../models/Owner.model.js"; // Ensure `.js` extension is added for ES modules
import rateLimit from "express-rate-limit";
import validator from "validator";
// Input Validation Middleware

export const validateOwnerSignup = (req, res, next) => {
  const { fullName, email, password, companyName } = req.body;

  const errors = {};

  // Full Name Validation

  if (!fullName || fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters long";
  }

  // Email Validation

  if (!email || !validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }

  // Password Validation

  if (!password || password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  // Check for special characters and complexity

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
    errors.password =
      "Password must include uppercase, lowercase, number, and special character";
  }

  // Company Name Validation

  if (!companyName || companyName.trim().length < 2) {
    errors.companyName = "Company name must be at least 2 characters long";
  }

  // If there are validation errors, return them

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Validation failed",

      errors,
    });
  }

  next();
};

// Rate Limiting Middleware

export const rateLimitSignup = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5, // limit each IP to 5 signup attempts per window

  message: {
    message: "Too many signup attempts, please try again later",
  },

  standardHeaders: true,

  legacyHeaders: false,
});

// Authentication Middleware

export const requireAdmin = async (req, res, next) => {
  try {
    // Read token from Authorization header or cookies

    let token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode the token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin user

    const admin = await Owner.findById(decoded.id);

    if (!admin || admin.userType.toUpperCase() !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin rights required." });
    }

    req.admin = admin;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

// Update requireAdmin middleware

// export const requireAdmin = async (req, res, next) => {

//   try {

//     // Check both header and cookies

//     const token = req.headers.authorization?.split(' ')[1] || req.cookies.adminToken;

//     if (!token) {

//       return res.status(401).json({ message: "No token provided" });

//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Case-insensitive admin check

//     const admin = await Owner.findOne({

//       _id: decoded.id,

//       userType: { $regex: /^admin$/i }

//     });

//     if (!admin) throw new Error("Invalid admin");

//     req.admin = admin;

//     next();

//   } catch (error) {

//     return res.status(401).json({

//       message: error.message.includes("Invalid admin")

//         ? "Admin privileges required"

//         : "Invalid token"

//     });

//   }

// };

// export const requireAdmin = async (req, res, next) => {

//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {

//     return res.status(401).json({ message: "No token provided" });

//   }

//   const token = authHeader.split(" ")[1];

//   try {

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded.userId) {

//       return res.status(401).json({ message: "Invalid token structure" });

//     }

//     const admin = await Owner.findById(decoded.userId);

//     if (!admin || admin.userType !== "admin") {

//       return res.status(403).json({ message: "Access denied. Admin rights required." });

//     }

//     req.admin = admin;

//     next();

//   } catch (error) {

//     return res.status(401).json({ message: error.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });

//   }

// };

// Password Reset Validation Middleware

export const validatePasswordReset = (req, res, next) => {
  const { email, newPassword, resetToken } = req.body;

  const errors = {};

  // Email Validation

  if (!email || !validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }

  // Reset Token Validation

  if (!resetToken || resetToken.length < 10) {
    errors.resetToken = "Invalid reset token";
  }

  // New Password Validation

  if (!newPassword || newPassword.length < 8) {
    errors.newPassword = "New password must be at least 8 characters long";
  }

  // Password Complexity

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(newPassword)) {
    errors.newPassword =
      "New password must include uppercase, lowercase, number, and special character";
  }

  // If there are validation errors, return them

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Password reset validation failed",

      errors,
    });
  }

  next();
};

// Login Validation Middleware

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = {};

  // Email Validation

  if (!email || !validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }

  // Password Validation

  if (!password || password.length < 4) {
    // Reduced from 8 to 4

    errors.password = "Password must be at least 4 characters long";
  }

  // If there are validation errors, return them

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Login validation failed",

      errors,
    });
  }

  next();
};

// export const validateAdminApproval = (req, res, next) => {
//   const { status } = req.body;

//   const errors = {};

//   // Status Validation

//   if (!status || !["approved", "rejected"].includes(status)) {
//     errors.status = 'Status must be either "approved" or "rejected"';
//   }

//   // If validation fails

//   if (Object.keys(errors).length > 0) {
//     return res.status(400).json({
//       message: "Admin approval validation failed",

//       errors,
//     });
//   }

//   next();
// };

// Sanitization Middleware

// In ownerAuth.js - update the validateAdminApproval middleware
// In ownerAuth.js - modify validateAdminApproval
export const validateAdminApproval = (req, res, next) => {
  const { status } = req.body;
  const errors = {};

  if (!status || !["approved", "rejected"].includes(status.toLowerCase())) {
    errors.status = 'Status must be either "approved" or "rejected"';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Admin approval validation failed",
      errors,
    });
  }

  // Normalize to lowercase
  req.body.status = status.toLowerCase();
  next();
};


export const sanitizeInput = (req, res, next) => {
  // Sanitize all input fields

  for (let key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = validator.escape(req.body[key].trim());
    }
  }

  next();
};

export const ownerAuth = {
  validateOwnerSignup,
  rateLimitSignup,
  requireAdmin,
  validatePasswordReset,
  validateLogin,
  sanitizeInput,
  validateAdminApproval,
};
