import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Owner } from "./models/Owner.model.js"; // Adjust path if needed

dotenv.config(); // Load environment variables

const createAdmin = async () => {
  try {
    // ✅ Connect to MongoDB
    const MONGO_URI = process.env.MONGODB_URL || "your-mongo-uri";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // ✅ Check if admin already exists
    const existingAdmin = await Owner.findOne({ email: "adityaadmin@example.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists. Skipping insertion.");
      mongoose.disconnect();
      return;
    }

    // ✅ Correct Password Hashing (Single Hash)
    const hashedPassword = await bcrypt.hash("admin", 10);

    // ✅ Create Admin
    const admin = new Owner({
      fullName: "Aditya Nishad",
      email: "adityaadmin@example.com",
      password: hashedPassword,
      userType: "admin",
      companyName: "Turfi",
      accountStatus: "approved", // Make sure it's approved
    });

    // ✅ Save to Database
    await admin.save();
    console.log("✅ Admin Created Successfully!");

    // ✅ Disconnect from DB
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    mongoose.disconnect();
  }
};

// Run the function
createAdmin();
