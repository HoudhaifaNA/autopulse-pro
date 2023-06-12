import bcrypt from "bcrypt";

import * as S from "../statments/userStatments";
import AppError from "../utils/AppError";
import tryCatch from "../utils/tryCatch";
import { validateName } from "../utils/validations";

export const getUsers = tryCatch((req, res) => {
  const users = S.getUsers.all();

  res.status(200).json({ status: "success", results: users.length, users });
});

export const createUser = tryCatch((req, res, next) => {
  const { username, password } = req.body;
  const [trimmedName, isValid] = validateName(username);

  if (!isValid) return next(new AppError("Username is invalid", 400));

  const hashedPassword = bcrypt.hashSync(password, 12);

  const { lastInsertRowid } = S.createUser.run([trimmedName, hashedPassword]);

  const newUser = S.getUserById.get(lastInsertRowid);

  res.status(201).json({ status: "success", user: newUser });
});

export const deleteUserById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const { changes } = S.deleteUserById.run(id);

  if (changes === 0) return next(new AppError(`User doesn't exist`, 404));

  res.status(204).json({ status: "success" });
});

export const deleteUsers = tryCatch((req, res) => {
  S.deleteUsers.run();

  res.status(204).json({ status: "success" });
});
