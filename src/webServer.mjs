import { join } from "path";
import { networkInterfaces as osNetworkInterfaces } from "os";
import express from "express";
import compression from "compression";

class WebServer {
    constructor(port, publicDirectory, adminDirectory) {
        this.port = port;

        this.server = express();
        this.server.use(express.static(join(process.cwd(), publicDirectory), {extensions: ['html']}));
        this.server.use("/admin", express.static(join(process.cwd(), adminDirectory), {extensions: ['html']}));
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(compression());

        this.init();
    }

    init() {
        this.server.listen(this.port, () => {
            const networkInterfaces = osNetworkInterfaces();
            let connectionIP;

            for (const networkInterface in networkInterfaces) {
                for (const network of networkInterfaces[networkInterface]) {
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
            callback(req).then((response) => {
                res.send(response);
            })
        });
    }

    postRequest(endpoint, callback) {
        this.server.post(endpoint, async (req, res) => {
            let body = JSON.parse(Object.keys(req.body)[0]);

            callback(body).then((response) => {
                res.send(response);
            });
        });
    }
}

export default new WebServer(80, "assets/app", "assets/adminPanel");