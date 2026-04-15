const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const healthRoutes = require('./routes/health');

const app = express();

// Middleware
app.use(cors()); // Frontend ko connect karne ke liye zaroori
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/health', healthRoutes);

// Render/Production ke liye Port configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is up and running on port ${PORT}!`);
    console.log(`🚀 Health Check API: https://health-checker-api.onrender.com/health`);
    console.log(`Ready to monitor your dependencies...`);
});