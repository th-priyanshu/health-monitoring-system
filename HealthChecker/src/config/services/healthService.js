const mongoose = require('mongoose');
const { execSync } = require('child_process');

exports.checkAllDependencies = async () => {
    // MongoDB Check
    const mongoStatus = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';

    // Custom Shell Check
    let shellStatus = 'DOWN';
    try {
        const result = execSync('sh ./scripts/custom-check.sh').toString().trim();
        if (result === 'OK') shellStatus = 'UP';
    } catch (e) { 
        shellStatus = 'ERROR'; 
    }

    // Hierarchical Logic: Agar Mongo down hai toh overall status UNHEALTHY
    const isHealthy = mongoStatus === 'UP';

    return {
        status: isHealthy ? 'HEALTHY' : 'UNHEALTHY',
        timestamp: new Date(),
        details: {
            mongodb: mongoStatus,
            customShell: shellStatus
        }
    };
};