require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Admin user details
    const adminData = {
      username: 'admin',
      email: 'admin@todoapp.com',
      password: 'admin123456', // Will be hashed automatically by the model
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      $or: [{ email: adminData.email }, { username: adminData.username }] 
    });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
    } else {
      // Create admin user
      const admin = await User.create(adminData);
      console.log('Admin user created successfully!');
      console.log('Username:', admin.username);
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();