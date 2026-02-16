const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Temporary route to create admin user - REMOVE IN PRODUCTION
router.post('/create-admin', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      // If user exists, promote to admin
      existingUser.role = 'admin';
      await existingUser.save();
      
      return res.json({ 
        message: 'User promoted to admin successfully!',
        user: {
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role
        }
      });
    }

    // Create new admin user
    const adminUser = await User.create({
      username,
      email,
      password,
      role: 'admin'
    });

    res.status(201).json({
      message: 'Admin user created successfully!',
      user: {
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating admin user', 
      error: error.message 
    });
  }
});

// Route to promote existing user to admin
router.patch('/promote-user/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params; // email or username

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = 'admin';
    await user.save();

    res.json({
      message: 'User promoted to admin successfully!',
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error promoting user', 
      error: error.message 
    });
  }
});

module.exports = router;