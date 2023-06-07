import { NextFunction, Request, Response } from "express";

import db from "../database";
import * as SQLs from "./sqls";

type Controller = (req: Request, res: Response, next: NextFunction) => void;

db.run(SQLs.CREATE_CLIENTS_TABLE);
// db.run("DROP TABLE clients");

const isValidPhoneNumber = (phoneNumber: string) => {
  const pattern = /^\+?[0-9]{1,3}[0-9]{3}[0-9]{3,14}$/;

  return pattern.test(phoneNumber);
};

const handleDBError = (err: Error, res: Response, status: number = 400) => {
  console.log(`ERROR 🔥🔥 :  ${err.message}`);
  return res.status(status).json({ status: "error", message: err.message });
};

export const getAllClients: Controller = (req, res) => {
  db.all(SQLs.GET_ALL_CLIENTS, (err, rows) => {
    if (err) return handleDBError(err, res);

    return res.status(200).json({ status: "success", clients: rows });
  });
};

export const getClientByID: Controller = (req, res) => {
  const { id } = req.params;

  db.get(SQLs.GET_CLIENT_BY_ID, [id], (err, row) => {
    if (err) return handleDBError(err, res);
    if (!row) {
      return handleDBError(new Error("No client with this id"), res, 404);
    }

    return res.status(201).json({ status: "success", client: row });
  });
};

export const createClient: Controller = (req, res) => {
  const { fullName, phoneNumber, balance = 0 } = req.body;
  const trimmedName = fullName.replace(/\s{2,}/g, " ").trim();
  const params = [trimmedName, phoneNumber, balance];

  if (!isValidPhoneNumber(phoneNumber))
    return handleDBError(new Error("Invalid phone number"), res, 400);

  db.run(SQLs.CREATE_A_CLIENT, params, function (err) {
    if (err) return handleDBError(err, res);

    db.get(SQLs.GET_CLIENT_BY_ID, [this.lastID], (err, row) => {
      return res.status(201).json({ status: "success", client: row });
    });
  });
};

export const updateClient: Controller = (req, res, next) => {
  const { id } = req.params;
  const { fullName, phoneNumber, balance } = req.body;
  const params = [fullName, phoneNumber, balance, id];

  if (phoneNumber && !isValidPhoneNumber(phoneNumber))
    return handleDBError(new Error("Invalid phone number"), res, 400);

  db.run(SQLs.UPDATE_CLIENT, params, function (err) {
    if (err) return handleDBError(err, res);

    // IF NO ROW HAS BEEN EFFECTED
    if (this.changes === 0) {
      return handleDBError(new Error("No client with this id"), res);
    }

    return db.get(SQLs.GET_CLIENT_BY_ID, [id], (err, row) => {
      return res.status(200).json({ status: "success", client: row });
    });
  });
};

export const deleteClientById: Controller = (req, res) => {
  const { id } = req.params;

  db.run(SQLs.DELETE_CLIENT_BY_ID, [id], function (err) {
    if (err) return handleDBError(err, res);

    if (this.changes === 0) {
      return handleDBError(new Error("No client with this id"), res);
    }

    return res.status(204).json({ status: "success" });
  });
};

export const deleteClients: Controller = (req, res) => {
  db.run(SQLs.DELETE_CLIENTS, (err) => {
    if (err) return handleDBError(err, res);

    return res.status(204).json({ status: "success" });
  });
};
