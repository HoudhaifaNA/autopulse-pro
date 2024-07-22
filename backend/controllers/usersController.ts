import bcrypt from "bcrypt";

import * as S from "../statments/userStatments";
import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";

export const getAllUsers = tryCatch((_req, res) => {
  const users = S.selectUsersStatment.all();

  res.status(200).json({ status: "success", results: users.length, users });
});

export const getUserById = tryCatch((req, res) => {
  const { id } = req.params;

  const user = S.selectUsernameByIdStatment.get(id);

  res.status(200).json({ status: "success", user });
});

export const createUser = tryCatch((req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Veuillez fournir un nom d'utilisateur et un mot de passe.", 403));
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const params = { username, password: hashedPassword };
  const { lastInsertRowid } = S.insertUserStatment.run(params);

  const newUser = S.selectUsernameByIdStatment.get(lastInsertRowid);

  res.status(201).json({ status: "success", user: newUser });
});

export const deleteUserById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const { changes } = S.deleteUserByIdStatment.run(id);

  if (!changes) {
    return next(new AppError("Désolé, cet utilisateur n'existe pas.", 401));
  }

  res.status(204).json({ status: "success" });
});

export const deleteAllUsers = tryCatch((_req, res) => {
  S.deleteUsersStatment.run();

  res.status(204).json({ status: "success" });
});
