require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');
const adminRoutes = require('./routes/admin.routes');
const setupRoutes = require('./routes/setup.routes'); // Temporary setup routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/setup', setupRoutes); // Temporary setup routes - REMOVE IN PRODUCTION

// Connect to DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));