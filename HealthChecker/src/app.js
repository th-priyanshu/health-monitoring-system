const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const healthRoutes = require('./routes/health');

const app = express();

// 1. CORS Middleware (Browser security ke liye)
app.use(cors()); 
app.use(express.json());

// 2. LIVE LOGGING MIDDLEWARE (Isse aapko Render Logs mein clicks dikhenge)
app.use((req, res, next) => {
    console.log(`📩 [${new Date().toLocaleTimeString()}] Click Detect Hua: ${req.method} ${req.url}`);
    next();
});

// 3. Database Connection
connectDB();

// 4. Routes
app.use('/health', healthRoutes);

// 5. Render/Production Port Configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is up and running on port ${PORT}!`);
    console.log(`🚀 Health Check API ready to monitor your dependencies...`);
});