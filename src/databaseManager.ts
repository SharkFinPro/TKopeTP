import sqlite3 from "sqlite3";
import { join } from "path";

const NOT_CONNECTED_MESSAGE: string = "Database connection has not been established";

class DatabaseManager {
  db: sqlite3.Database | undefined = undefined;

  constructor() {
    this.connect().catch((error): void => {
      if (error) {
        throw new Error("Failed to connect to database!");
      }
    });
  }

  connect(): Promise<boolean> {
    return new Promise((resolve, reject): void => {
      if (this.db) {
        reject(new Error("Database connection is already established!"));
        return;
      }

      this.db = new sqlite3.Database(join(process.cwd(), "db/TradingPost.sqlite"), sqlite3.OPEN_READWRITE, (error: Error | null): void => {
        if (error) {
          reject(error);
        }
      });

      resolve(true);
    });
  }

  all(action: string): Promise<any> {
    return new Promise((resolve, reject): void => {
      if (!this.isConnected()) {
        reject(new Error(NOT_CONNECTED_MESSAGE));
        return;
      }

      this.db?.all(action, (err: Error | null, data: any): void => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    });
  }

  each(action: string): Promise<any> {
    return new Promise((resolve, reject): void => {
      if (!this.isConnected()) {
        reject(new Error(NOT_CONNECTED_MESSAGE));
        return;
      }

      this.db?.each(action, (err: Error | null, data: any): void => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    });
  }

  run(action: string, values: any[]): Promise<boolean> {
    return new Promise((resolve, reject): void => {
      if (!this.isConnected()) {
        reject(new Error(NOT_CONNECTED_MESSAGE));
        return;
      }

      this.db?.run(action, values, (err: Error | null): void => {
        if (err) {
          reject(err);
          return;
        }

        resolve(true);
      });
    });
  }

  shutdown(): Promise<boolean> {
    return new Promise((resolve, reject): void => {
      if (!this.isConnected()) {
        reject(new Error(NOT_CONNECTED_MESSAGE));
        return;
      }

      this.db?.close((error: Error | null): void => {
        if (error) {
          reject(error);
        }
      });

      this.db = undefined;

      resolve(true);
    });
  }

  isConnected(): boolean {
    return typeof this.db !== "undefined"
  }
}

const databaseManager: DatabaseManager = new DatabaseManager();
export default databaseManager;