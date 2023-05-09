import sqlite3 from "sqlite3";
import { join } from "path";

class DatabaseManager {
    db: sqlite3.Database | undefined = undefined;

    constructor() {
        this.connect();
    }

    connect(): void {
        if (this.db) {
            return console.log("Database connection is already established!");
        }

        this.db = new sqlite3.Database(join(process.cwd(), "db/TradingPost.sqlite"), sqlite3.OPEN_READWRITE, (error) => {
            if (error) {
                return console.error(error);
            }
        });
    }

    all(action: string, callback: (error: string, data: any) => void): void {
        if (typeof this.db === "undefined") {
            return console.log("Error: Database connection has not been established!");
        }

        this.db.all(action, callback);
    }

    each(action: string, callback: (error: string, data: any) => void): void {
        if (typeof this.db === "undefined") {
            return console.log("Error: Database connection has not been established!");
        }

        this.db.each(action, callback);
    }

    shutdown(): void {
        if (typeof this.db === "undefined") {
            return console.log("No database connection to shutdown!");
        }

        this.db.close((error) => {
            if (error) {
                return console.error(error);
            }
        });

        this.db = undefined;
    }
}

const databaseManager: DatabaseManager = new DatabaseManager();
export default databaseManager;