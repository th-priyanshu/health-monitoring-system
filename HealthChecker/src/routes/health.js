const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const os = require('os');

router.get('/', async (req, res) => {
    try {
        // 1. MongoDB Status
        const dbStatus = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';

        // 2. Memory Calculation (Total vs Free)
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemoryPercent = (((totalMemory - freeMemory) / totalMemory) * 100).toFixed(2);

        // 3. Disk (Render par ye usually limited hota hai, isliye static ya simple rakhte hain)
        const diskUsage = "Active"; 

        res.json({
            status: dbStatus === 'UP' ? 'HEALTHY' : 'UNHEALTHY',
            details: {
                mongodb: dbStatus,
                customShell: 'UP',
                memory: `${usedMemoryPercent}%`,
                disk: diskUsage
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'DOWN', error: error.message });
    }
});

module.exports = router;