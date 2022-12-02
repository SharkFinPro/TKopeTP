const path = require("path");
const express = require("express");
const compression = require("compression");
const os = require("os");

module.exports = class WebServer {
    constructor(port, publicDirectory, adminDirectory) {
        this.port = port;

        this.server = express();
        this.server.use(express.static(path.join(__dirname, publicDirectory)));
        this.server.use("/admin", express.static(path.join(__dirname, adminDirectory)));
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(compression());

        this.init();
    }

    init() {
        this.server.listen(this.port, () => {
            const networkInterfaces = os.networkInterfaces();
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