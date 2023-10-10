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
      return this.notConnectedError();
    }

    this.db.all(action, callback);
  }

  each(action: string, callback: (error: string, data: any) => void): void {
    if (typeof this.db === "undefined") {
      return this.notConnectedError();
    }

    this.db.each(action, callback);
  }

  run(action: string, values: any[], err: any): void {
    if (typeof this.db === "undefined") {
      return this.notConnectedError();
    }

    this.db?.run(action, values, err);
  }

  shutdown(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof this.db === "undefined") {
        console.error("No database connection to shutdown!");
        reject();
        return;
      }

      this.db.close((error) => {
        if (error) {
          console.error(error);
          reject();
        }
      });

      this.db = undefined;

      resolve(true);
    });
  }

  notConnectedError(): void {
    console.log("Error: Database connection has not been established!");
  }
}

const databaseManager: DatabaseManager = new DatabaseManager();
export default databaseManager;