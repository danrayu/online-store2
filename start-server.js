// start-server.js

const { exec } = require('child_process');
const getLocalIP = require('./get-ip');

// Set the IP as an environment variable
const ip = getLocalIP();

const command = `next dev --hostname ${ip}`;

console.log(`Starting server on ${ip}:3000`);
const child = exec(command);

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
