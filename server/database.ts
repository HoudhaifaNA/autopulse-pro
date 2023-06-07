import path from "path";
import sqlite from "sqlite3";

const isProd: boolean = process.env.NODE_ENV === "production";
let dbPath = path.join(path.resolve(), "db", "db.db");
if (isProd) dbPath = path.join(path.resolve(), "resources", "db/db.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.log("Database connection error 🔥", err.message);
  console.log("Connected to database successfully ✔");
});

db.get("PRAGMA foreign_keys = ON");

export default db;
