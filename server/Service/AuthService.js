const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Owner } = require('../models/Owner');

class AuthService {
  // Generate JWT Token
  static generateToken(userId, userType) {
    return jwt.sign(
      { 
        userId, 
        userType 
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: '24h' 
      }
    );
  }

  // Login Method
  static async login(email, password) {
    // Find user by email
    const user = await Owner.findOne({ email });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if account is approved
    if (user.accountStatus !== 'approved') {
      throw new Error('Account not approved. Please contact administrator.');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user._id, user.userType);

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        companyName: user.companyName
      }
    };
  }

  // Password Reset Method
  static async resetPassword(email, newPassword, resetToken) {
    // Find user by email and valid reset token
    const user = await Owner.findOne({ 
      email, 
      resetToken,
      resetTokenExpiry: { $gt: Date.now() } 
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return true;
  }

  // Generate Password Reset Token
  static async generatePasswordResetToken(email) {
    // Find user by email
    const user = await Owner.findOne({ email });

    if (!user) {
      throw new Error('No account found with this email');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save reset token to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;

    await user.save();

    // Send reset email (implement email service)
    await this.sendPasswordResetEmail(email, resetToken);

    return true;
  }

  // Send Password Reset Email (placeholder)
  static async sendPasswordResetEmail(email, resetToken) {
    // Implement email sending logic using nodemailer or another email service
    // This is a placeholder - you'll need to implement actual email sending
    console.log(`Password reset email sent to ${email} with token: ${resetToken}`);
  }
}

module.exports = AuthService;