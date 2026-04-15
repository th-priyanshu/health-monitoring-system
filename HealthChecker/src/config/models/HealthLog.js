const mongoose = require('mongoose');

const HealthLogSchema = new mongoose.Schema({
    status: String,
    timestamp: { type: Date, default: Date.now },
    details: {
        mongodb: String,
        memory: String,
        disk: String,
        customShell: String
    }
});

module.exports = mongoose.model('HealthLog', HealthLogSchema);