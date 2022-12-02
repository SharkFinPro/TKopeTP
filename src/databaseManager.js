const sqlite3 = require('sqlite3');

module.exports = class DatabaseManager {
    constructor() {
        this.connect();
    }

    connect() {
        if (this.connected) {
            return console.log("Database connection is already established!");
        }

        this.db = new sqlite3.Database(__dirname + "/db/TradingPost.sqlite", sqlite3.OPEN_READWRITE, (error) => {
            if (error) {
                return console.error(error);
            }

            this.connected = true;
        });
    }

    all(action, callback) {
        this.db.all(action, callback);
    }

    each(action, callback) {
        this.db.each(action, callback);
    }

    shutdown() {
        if (!this.connected) {
            return console.log("No database connection to shutdown!");
        }

        this.db.close((error) => {
            if (error) {
                return console.error(error);
            }

            this.connected = false;
        })
    }
}