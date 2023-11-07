// get-ip.js
function getLocalIP() {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    
    for (let name of Object.keys(interfaces)) {
        for (let iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}
module.exports = getLocalIP;
