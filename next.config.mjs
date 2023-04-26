/** @type {import('next').NextConfig} */
import { networkInterfaces } from "os";
const nextConfig = {
    experimental: {
        appDir: true,
    }
};

export default () => {
    const interfaces = networkInterfaces();
    let connectionIP;

    for (const networkInterface in interfaces)
        for (const network of interfaces[networkInterface])
            if (network.family === "IPv4" && !network.internal)
                connectionIP = network.address;

    console.log(`Server listening on port 80`);
    console.log("Please turn on your computer's hotspot and connect to it with your phone");
    console.log(`Then on your phone, access '${connectionIP}' in your browser`);

    return nextConfig;
};