import sqlite3 from "sqlite3";
import { join } from "path";

class DatabaseManager {
  db: sqlite3.Database | undefined = undefined;

  constructor() {
    this.connect().catch((error) => {
      if (error) {
        throw new Error("Failed to connect to database!");
      }
    });
  }

  connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        console.error("Database connection is already established!");
        reject();
        return;
      }

      this.db = new sqlite3.Database(join(process.cwd(), "db/TradingPost.sqlite"), sqlite3.OPEN_READWRITE, (error) => {
        if (error) {
          console.error(error);
          reject();
        }
      });

      resolve(true);
    });
  }

  all(action: string, callback: (error: string, data: any) => void): void {
    if (!this.isConnected()) {
      return;
    }

    this.db?.all(action, callback);
  }

  each(action: string, callback: (error: string, data: any) => void): void {
    if (!this.isConnected()) {
      return;
    }

    this.db?.each(action, callback);
  }

  run(action: string, values: any[], err: any): void {
    if (!this.isConnected()) {
      return;
    }

    this.db?.run(action, values, err);
  }

  shutdown(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected()) {
        reject();
        return;
      }

      this.db?.close((error) => {
        if (error) {
          console.error(error);
          reject();
        }
      });

      this.db = undefined;

      resolve(true);
    });
  }

  isConnected(): boolean {
    if (typeof this.db === "undefined") {
      console.error("Database connection has not been established!");
      return false;
    }

    return true;
  }
}

const databaseManager: DatabaseManager = new DatabaseManager();
export default databaseManager;