import path from "path";
// import sqlite from "sqlite3";
import Database from "better-sqlite3";

const isProd: boolean = process.env.NODE_ENV === "production";
let dbPath = path.join(path.resolve(), "db", "db.db");
if (isProd) dbPath = path.join(path.resolve(), "resources", "db/db.db");

const db = new Database(dbPath, { verbose: null });

if (db.open) console.log("Connected successfully");

export default db;
