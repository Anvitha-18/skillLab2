const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const parkingRoutes = require('./routes/parkingRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(logger); // Your custom logger

// Routes
app.use('/api/parking', parkingRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://anvitha7036sahyadri_db_user:KbB7QTk5nYZzwxYH@cluster0.n7qp8bj.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("Connection error:", err));