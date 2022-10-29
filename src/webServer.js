const path = require("path");
const express = require("express");
const compression = require("compression");

const os = require("os");

module.exports = class WebServer {
    constructor(port, publicDirectory) {
        this.port = port;

        this.server = express();
        this.server.use(express.static(path.join(__dirname, publicDirectory)));
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(compression());
    }

    init() {
        this.server.listen(this.port, () => {
            const networkInterfaces = os.networkInterfaces();

            let connectionIP;

            for (const network of Object.keys(networkInterfaces)) {
                for (const netData of networkInterfaces[network]) {
                    const familyV4Value = typeof netData.family === 'string' ? 'IPv4' : 4;
                    if (netData.family === familyV4Value && !netData.internal) {
                        connectionIP = netData.address;
                    }
                }
            }

            console.log(`Server listening on port ${this.port}`);
            console.log("Please turn your computer's hotspot on and connect to it with your phone.")
            console.log(`Then on your phone access: ${connectionIP}`)
        });
    }

    getRequest(endpoint, callback) {
        this.server.get(endpoint, (req, res) => {
            let response = callback();
            res.send(response);
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