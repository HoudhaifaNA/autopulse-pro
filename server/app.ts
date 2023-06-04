import express from "express";
import cors from "cors";

import db from "./database";

const app = express();

app.use(cors());

app.get("/api/cars", (_, res) => {
  db.each(`SELECT * FROM cars`, [], function (err, rows) {
    if (err) {
      console.log(err.message);
      return res.status(401).json({ message: "error", err: err.message });
    }
    return res.status(200).json({ message: "success ", rows });
  });

  db.close((err) => {
    if (err) console.log(err.message);
    console.log("Closed database successfully ✔");
  });
});

export default app;
