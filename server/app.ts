import express from "express";
import cors from "cors";

import db from "./database";

const app = express();

app.use(cors());

const CREATE_CAR = `INSERT INTO cars(brand, name)
VALUES(?, ?)`;

app.use(express.json());

export default app;
