import { NextFunction, Request, Response } from "express";

import db from "../database";
import * as SQLs from "./sqls";

db.run(SQLs.CREATE_LICENCES_TABLE);
// db.run("DROP TABLE licences");

type Controller = (req: Request, res: Response, next: NextFunction) => void;

const handleDBError = (err: Error, res: Response, status: number = 400) => {
  console.log(err);
  return res.status(status).json({ status: "error", message: err.message });
};

export const getAllLicences: Controller = (req, res) => {
  db.all(SQLs.GET_ALL_LICENCES, (err, rows) => {
    if (err) return handleDBError(err, res);

    return res.status(200).json({
      status: "success",
      licences: rows,
    });
  });
};

export const getLicenceById: Controller = (req, res) => {
  const { id } = req.params;

  db.get(SQLs.GET_LICENCE_BY_ID, [id], (err, row) => {
    if (err) return handleDBError(err, res);
    if (!row) return handleDBError(new Error("Licence doesn't exist"), res);

    return res.status(200).json({ status: "success", licence: row });
  });
};

export const createLicence: Controller = (req, res) => {
  const { seller, moudjahid, wilaya, price } = req.body;
  const trimmedName = moudjahid.replace(/\s{2,}/g, " ").trim();
  const params = [seller, trimmedName, wilaya, price];

  db.run(SQLs.CREATE_LICENCE, params, function (err) {
    if (err) return handleDBError(err, res);

    db.get(SQLs.GET_LICENCE_BY_ID, [this.lastID], (err, row) => {
      return res.status(201).json({ status: "success", licence: row });
    });
  });
};

export const updateLicence: Controller = (req, res) => {
  const { id } = req.params;
  const { moudjahid, wilaya, price } = req.body;
  const params = [moudjahid, wilaya, price, id];

  db.run(SQLs.UPDATE_LICENCE, params, function (err) {
    if (err) return handleDBError(err, res);

    // IF NO ROW HAS BEEN EFFECTED
    if (this.changes === 0) {
      return handleDBError(new Error("licence doesn't exist"), res);
    }

    return db.get(SQLs.GET_LICENCE_BY_ID, [id], (err, row) => {
      return res.status(200).json({ status: "success", licence: row });
    });
  });
};

export const deleteLicenceById: Controller = (req, res) => {
  const { id } = req.params;

  db.run(SQLs.DELETE_LICENCE_BY_ID, [id], function (err) {
    if (err) return handleDBError(err, res);

    if (this.changes === 0) {
      return handleDBError(new Error("licence doesn't exist"), res);
    }

    return res.status(204).json({ status: "success" });
  });
};

export const deleteLicences: Controller = (req, res) => {
  db.run(SQLs.DELETE_LICENCES, (err) => {
    if (err) return handleDBError(err, res);

    return res.status(204).json({ status: "success" });
  });
};
