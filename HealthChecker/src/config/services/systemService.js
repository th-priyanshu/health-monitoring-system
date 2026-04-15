const os = require('os');
const { execSync } = require('child_process');

exports.getSystemStats = () => {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const memUsage = (((totalMem - freeMem) / totalMem) * 100).toFixed(2);
    
    // Simple Unix check via shell for disk usage
    let diskUsage = 'Unknown';
    try {
        diskUsage = execSync("df / | tail -1 | awk '{print $5}'").toString().trim();
    } catch (e) { console.error('Disk check failed'); }

    return { memUsage: `${memUsage}%`, diskUsage };
};