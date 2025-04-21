import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { Owner } from './models/Owner.model.js';

async function resetAdminPassword() {
  try {
    // Detailed connection with logging
    mongoose.set('debug', true);
    await mongoose.connect('mongodb+srv://adityanishad753:aditya123@cluster0.cante.mongodb.net/mern-auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connection Successful');

    // List all users to verify
    const allUsers = await Owner.find({});
    console.log('All Users in Database:');
    allUsers.forEach(user => {
      console.log(`Email: ${user.email}, UserType: ${user.userType}, _id: ${user._id}`);
    });

    // Try finding the user with case-insensitive email
    const adminUser = await Owner.findOne({ 
      email: { $regex: new RegExp('^' + 'adityaadmin@example.com' + '$', 'i') },
      userType: 'admin'
    });

    if (!adminUser) {
      console.log('No admin user found. Creating a new admin user...');

      // Generate salt and hash
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('AdminPassword123!', salt);

      const newAdminUser = new Owner({
        fullName: 'Admin User',
        email: 'adityaadmin@example.com',
        password: hashedPassword,
        userType: 'admin',
        companyName: 'Your Company',
        accountStatus: 'approved'
      });

      await newAdminUser.save();
      console.log('New admin user created successfully');
      console.log('Email:', newAdminUser.email);
      console.log('Hashed Password:', newAdminUser.password);
    } else {
      console.log('Admin user found:', adminUser);
    }

  } catch (error) {
    console.error('Error in reset process:', error);
  } finally {
    await mongoose.connection.close();
  }
}

resetAdminPassword();