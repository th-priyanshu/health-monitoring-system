const express = require('express');
const cors = require('cors'); // Step 1: CORS import kiya
const connectDB = require('./config/db');
const healthRoutes = require('./routes/health');

const app = express();

// Step 2: CORS middleware ko routes se PEHLE lagaya
// Isse browser ko permission milegi data access karne ki
app.use(cors()); 

connectDB();

app.use('/health', healthRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is up and running!`);
    console.log(`🚀 Check Health Status here: http://localhost:${PORT}/health`);
    console.log(`Ready to monitor your dependencies...`);
});