/** @type {import('next').NextConfig} */
import { networkInterfaces } from "os";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**"
      },
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;

/* Log connection info to console */
const findIP = () => {
  const networkInterfaceRecords = networkInterfaces();

  for (const record in networkInterfaceRecords) {
    for (const network of networkInterfaceRecords[record]) {
      if (network.family === "IPv4" && !network.internal) {
        console.log(`Server listening on port 80`);
        console.log("Please turn on your computer's hotspot and connect to it with your phone");
        console.log(`Then on your phone, access '${network.address}' in your browser`);
        return;
      }
    }
  }
}

findIP();