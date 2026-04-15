const express = require('express');
const router = express.Router();
const healthService = require('../services/healthService');
const mongoose = require('mongoose');

// Liveness: Is the app process alive?
router.get('/live', (req, res) => res.status(200).send('Alive'));

// Readiness: Is the DB ready to take traffic?
router.get('/ready', (req, res) => {
    const isReady = mongoose.connection.readyState === 1;
    res.status(isReady ? 200 : 503).json({ ready: isReady });
});

// Full Aggregated Health
router.get('/', async (req, res) => {
    const health = await healthService.checkAllDependencies();
    const code = health.status === 'HEALTHY' ? 200 : 503;
    res.status(code).json(health);
});

module.exports = router;