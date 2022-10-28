const path = require("path");
const express = require("express");
const compression = require('compression');

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
            console.log(`Server listening on port ${this.port}`);
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