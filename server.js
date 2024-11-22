// backend/server.js
// Entry point for the backend server, setting up the Express server and routes

const express = require('express');
const cors = require('cors'); // Require CORS only once
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const playerRoutes = require('./routes/players');
const progressRoutes = require('./routes/progress');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Configure CORS
const corsOptions = {
  origin: ['https://visualnovel9lives.netlify.app', 'http://localhost:5000'], // Allow specified origins
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions)); // Apply CORS middleware

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/progress', progressRoutes);

// Default route for root URL
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
