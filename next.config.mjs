/** @type {import('next').NextConfig} */
import { networkInterfaces } from "os";
const nextConfig = {
    reactStrictMode: true
};

export default nextConfig;

/* Log connection info to console */
const networkInterfaceRecords = networkInterfaces();
let connectionIP;

for (const record in networkInterfaceRecords)
    for (const network of networkInterfaceRecords[record])
        if (network.family === "IPv4" && !network.internal)
            connectionIP = network.address;


console.log(`Server listening on port 80`);
console.log("Please turn on your computer's hotspot and connect to it with your phone");
console.log(`Then on your phone, access '${connectionIP}' in your browser`);