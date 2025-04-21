import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Owner, AccountStatus, UserType } from "../models/Owner.model.js";

export const ownerSignup = async (req, res) => {
  try {
    console.log("Received signup request:", req.body);
    const { fullName, email, password, companyName, companyDetails } = req.body;

    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      console.log("Owner already exists");
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newOwner = new Owner({
      fullName,
      email,
      password: hashedPassword,
      companyName,
      userType: UserType.OWNER,
      accountStatus: AccountStatus.PENDING,
      companyDetails,
    });

    await newOwner.save();
    console.log("New owner created:", newOwner._id);

    res.status(201).json({
      success: true,
      message: "Signup request submitted. Awaiting admin approval.",
      ownerId: newOwner._id,
    });
  } catch (error) {
    console.error("Owner Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during signup process",
      error: error.message,
    });
  }
};

export const getPendingOwners = async (req, res) => {
  try {
    const pendingOwners = await Owner.find({
      accountStatus: AccountStatus.PENDING,
      userType: UserType.OWNER,
    }).select("-password");

    res.status(200).json({
      success: true,
      pendingOwners,
    });
  } catch (error) {
    console.error("Error fetching pending owners:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching pending owners",
      error: error.message,
    });
  }
};

// In ownerController.js - update the adminApproveOwner function
export const adminApproveOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { status } = req.body;

    if (!ownerId) {
      return res.status(400).json({
        success: false,
        message: "Owner ID is required"
      });
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found"
      });
    }

    // In ownerController.js - adminApproveOwner
if (status !== AccountStatus.APPROVED && status !== AccountStatus.REJECTED) {
  return res.status(400).json({
    success: false,
    message: 'Invalid status. Must be either "approved" or "rejected"'
  });
}

    owner.accountStatus = status;
    await owner.save();

    console.log(`Owner ${ownerId} status changed to ${status}`);

    res.status(200).json({
      success: true,
      message: `Owner account ${status}`,
      ownerId: owner._id
    });
  } catch (error) {
    console.error("Admin Approval Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during approval process",
      error: error.message
    });
  }
};



export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Owner.findOne({ email, userType: UserType.ADMIN });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: admin._id, userType: admin.userType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        userType: admin.userType,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

export const adminLogout = async (req, res) => {
  res.clearCookie("adminToken");
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// In ownerController.js - update the ownerLogin function
export const ownerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Simplify the email query to avoid regex issues
    const owner = await Owner.findOne({ 
      email: email.toLowerCase(),
      userType: UserType.OWNER
    });

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (owner.accountStatus !== AccountStatus.APPROVED) {
      return res.status(403).json({
        success: false,
        message: "Account pending admin approval"
      });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: owner._id, userType: owner.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('ownerToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from conditional to always 'lax'
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // Add token in response
      owner: {
        id: owner._id,
        email: owner.email,
        companyName: owner.companyName
      }
    });
  } catch (error) {
    console.error('Owner login error:', error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

export const verifyAdminToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Owner.findById(decoded.id);
    
    if (!admin || admin.userType !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Invalid admin privileges",
      });
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        userType: admin.userType,
      },
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    console.error("Token Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during token verification",
      error: error.message,
    });
  }
};

export const ownerLogout = async (req, res) => {
  try {
    res.clearCookie("ownerToken");
    res.status(200).json({
      success: true,
      message: "Owner logout successful",
    });
  } catch (error) {
    console.error("Owner Logout Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout",
      error: error.message,
    });
  }
};

export const verifyOwnerToken = async (req, res) => {
  try {
    const token = req.cookies.ownerToken;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No owner session' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = await Owner.findOne({
      _id: decoded.id,
      userType: { $regex: /^owner$/i }
    });

    if (!owner) {
      return res.status(403).json({
        success: false,
        message: 'Invalid owner credentials'
      });
    }

    res.status(200).json({
      success: true,
      owner: {
        id: owner._id,
        email: owner.email,
        companyName: owner.companyName
      }
    });
  } catch (error) {
    res.clearCookie('ownerToken');
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired'
      });
    }
    res.status(401).json({
      success: false,
      message: 'Invalid session'
    });
  }
};

// Add this to your exports
export const getAllOwnerRequests = async (req, res) => {
  try {
    const allOwners = await Owner.find({ userType: UserType.OWNER })
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      owners: allOwners
    });
  } catch (error) {
    console.error("Error fetching all owners:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching owner requests",
      error: error.message
    });
  }
};


const sendOwnerStatusNotification = async (email, status) => {
  // Implement email sending logic
  // Use services like SendGrid, Nodemailer etc.
};
