import { dirname as pathDirname } from "path";
import { fileURLToPath as urlFileURLToPath } from "url";
import sqlite3 from "sqlite3";

const __filename = urlFileURLToPath(import.meta.url);
const __dirname = pathDirname(__filename);

class DatabaseManager {
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

export default new DatabaseManager();