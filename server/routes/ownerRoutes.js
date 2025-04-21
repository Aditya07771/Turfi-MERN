  import express from 'express';
  import bcrypt from 'bcryptjs';
  import jwt from 'jsonwebtoken';
  import dotenv from 'dotenv/config';
  import { Owner } from '../models/Owner.model.js';
  import { 
    ownerSignup, 
    adminApproveOwner,
    getPendingOwners,
    adminLogin,
    ownerLogout,
    verifyAdminToken,
    adminLogout,
    verifyOwnerToken,
    ownerLogin,
    getAllOwnerRequests
  } from '../controller/ownerController.js';
  import { 
    validateOwnerSignup,  
    requireAdmin,
    rateLimitSignup, 
    validateAdminApproval,
    validateLogin
  } from '../middleware/ownerAuth.js';

  const router = express.Router();

  /** ✅ Test Route */
  router.get('/test', (req, res) => {
    res.json({ message: 'Owner routes are working!' });
  });

  /** ✅ Admin Routes */
  router.post('/admin/login', validateLogin, adminLogin);
  router.post('/admin/logout', requireAdmin, adminLogout); 
  router.get('/all-requests', requireAdmin, getAllOwnerRequests);
  router.get('/verify-admin', verifyAdminToken);

  /** ✅ Protected Admin Routes */
  router.get('/pending-requests', requireAdmin, getPendingOwners);
  router.patch('/approve/:ownerId', requireAdmin, validateAdminApproval, adminApproveOwner);

  /** ✅ Public Routes */
  router.post('/signup', rateLimitSignup, validateOwnerSignup, ownerSignup);
  router.post('/login', validateLogin, ownerLogin); // Add this line
  router.get('/verify-owner', verifyOwnerToken);
  
  router.post('/logout', ownerLogout);

  /** 🔴 Global Error Handler */
  router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      success: false,
      message: 'Something went wrong!',
      error: err.message 
    });
    next(err);
  });

  export default router;
