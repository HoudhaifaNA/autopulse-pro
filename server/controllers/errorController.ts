import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

type TErrorController = (
  err: AppError,
  req: Request,
  res: Response,
  next?: NextFunction
) => void;

const handleUniqueError = (err) => {
  const fieldsNames = err.message
    .split(":")[1]
    .split(" ")
    .map((field) => {
      if (field) return field.split(".")[1];
    });

  const message = `${fieldsNames.join(" ")} doivent être uniques`;

  return new AppError(message, 400);
};

const handleForeignKeyError = () => {
  let message =
    "Impossible d'effectuer cette action en raison d'un document associé";

  return new AppError(message, 403);
};

const handleCheckError = (err) => {
  const condition = err.message.split(":")[1];
  const field = condition.split(" ")[1];
  let message = `'${field}' check a échoué`;

  return new AppError(message, 400);
};

const handleNullError = (err) => {
  const fieldPath = err.message.split(":")[1];
  const fieldName = fieldPath.split(".")[1];
  let message = `Veuillez indiquer ${fieldName}`;

  return new AppError(message, 400);
};

//-------------------------//

const sendErroDev: TErrorController = (err, req, res) => {
  console.log(`ERROR 🔥🔥 :  ${err}`);

  return res
    .status(err.statusCode)
    .json({ status: err.status, err, message: err.message, stack: err.stack });
};

const sendErrorProd: TErrorController = (err, req, res) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ title: "error", message: err.message });
  }

  console.log(`ERROR 🔥🔥 :  ${err}`);

  return res.status(err.statusCode).json({
    status: "Quelque chose a mal tourné",
    message: "Veuillez réessayer",
  });
};

const errorController: TErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErroDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.message.startsWith("UNIQUE")) error = handleUniqueError(err);
    if (error.message.startsWith("FOREIGN KEY"))
      error = handleForeignKeyError();
    if (error.message.startsWith("CHECK")) error = handleCheckError(err);
    if (error.message.startsWith("NOT NULL")) error = handleNullError(err);

    sendErrorProd(error, req, res);
  }
};

export default errorController;
