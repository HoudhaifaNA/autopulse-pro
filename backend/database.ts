import path from "path";
import Database from "better-sqlite3";

import {
  createCategoriesTableStatment,
  createClientsTableStatment,
  createCarsTableStatment,
  createExpensesTableStatment,
  createTransactionsTable,
  createLicencesTableStatment,
  createPapersTableStatment,
  createProcurationsTableStatment,
  createUsersTableStatment,
} from "./statments/createTablesQueries";

const isProd: boolean = process.env.NODE_ENV === "production";

let dbPath = path.join(path.resolve(), "db", "db.db");
if (isProd) dbPath = path.join(path.resolve(), "..", "..", "db/db.db");

const db = new Database(dbPath);

if (db.open) {
  // db.prepare("DROP TRIGGER IF EXISTS toggle_car_gray_card_on_insert;").run();
  // db.prepare("DROP TRIGGER IF EXISTS toggle_car_gray_card_on_update;").run();
  // db.prepare("DROP TRIGGER IF EXISTS toggle_car_gray_card_on_delete;").run();
  // db.prepare("DROP TRIGGER IF EXISTS toggle_car_procuration_on_insert;").run();
  // db.prepare("DROP TRIGGER IF EXISTS toggle_car_procuration_on_update;").run();
  // db.prepare("DROP TRIGGER IF EXISTS toggle_car_procuration_on_delete;").run();
  console.log("Connected successfully");
  db.exec(createCategoriesTableStatment);
  db.exec(createClientsTableStatment);
  db.exec(createCarsTableStatment);
  db.exec(createExpensesTableStatment);
  db.exec(createTransactionsTable);
  db.exec(createLicencesTableStatment);
  db.exec(createPapersTableStatment);
  db.exec(createProcurationsTableStatment);
  db.exec(createUsersTableStatment);
}

export default db;
