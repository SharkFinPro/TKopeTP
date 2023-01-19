import { networkInterfaces } from "os";
import express from "express";
import compression from "compression";

class WebServer {
    constructor(port) {
        this.port = port;

        this.server = express();
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(compression());
    }

    init() {
        this.server.listen(this.port, () => {
            const interfaces = networkInterfaces();
            let connectionIP;

            for (const networkInterface in interfaces) {
                for (const network of interfaces[networkInterface]) {
                    if (network.family === "IPv4" && !network.internal) {
                        connectionIP = network.address;
                    }
                }
            }

            console.log(`Server listening on port ${this.port}`);
            console.log("Please turn on your computer's hotspot and connect to it with your phone");
            console.log(`Then on your phone, access '${connectionIP}' in your browser`);
        });
    }

    getRequest(endpoint, callback) {
        this.server.get(endpoint, (req, res) => {
            callback(req, res);
        });
    }

    postRequest(endpoint, callback) {
        this.server.post(endpoint, async (req, res) => {
            callback(req.body, res);
        });
    }
}

export default new WebServer(80);