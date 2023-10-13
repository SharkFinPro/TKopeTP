import sqlite3 from "sqlite3";
import { join } from "path";

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

  accessDatabase(action: any): Promise<any> {
    return new Promise((resolve, reject): void => {
      if (!this.db) {
        reject(new Error("Database connection has not been established"));
        return;
      }

      action(resolve, reject);
    });
  }

  handleResponse(err: Error | null, data: any, resolve: any, reject: any): void {
    if (err) {
      reject(err);
      return;
    }

    resolve(data || true);
  }

  all(action: string): Promise<any> {
    return this.accessDatabase((resolve: any, reject: any): void => {
      this.db?.all(action, (err: any, data: any) => this.handleResponse(err, data, resolve, reject))
    });
  }

  each(action: string): Promise<any> {
    return this.accessDatabase((resolve: any, reject: any): void => {
      this.db?.each(action, (err: any, data: any) => this.handleResponse(err, data, resolve, reject))
    });
  }

  run(action: string, values: any[]): Promise<boolean> {
    return this.accessDatabase((resolve: any, reject: any): void => {
      this.db?.run(action, values, (err: any) => this.handleResponse(err, null, resolve, reject))
    });
  }
}

const databaseManager: DatabaseManager = new DatabaseManager();
export default databaseManager;