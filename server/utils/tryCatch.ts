import { NextFunction, Response, Request } from "express";

type Middlware = (req: Request, res: Response, next: NextFunction) => void;

const tryCatch = (fn: Middlware) => {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default tryCatch;
