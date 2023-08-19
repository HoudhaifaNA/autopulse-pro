import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as S from "../statments/userStatments";
import AppError from "../utils/AppError";
import tryCatch from "../utils/tryCatch";

interface User {
  username?: string;
  password?: string;
}

const ONE_SECOND = 1000;

const signToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const createAndSendToken = (user, res) => {
  const token = signToken(user.username);

  res.cookie("tkn", token, {
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });

  user.password = undefined;

  res.status(200).json({ status: "success", token, user });
};

export const login = tryCatch((req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new AppError("Please, provide valid username and password", 403)
    );
  }

  const user: User = S.getUserPassword.get(username);

  if (!user) return next(new AppError(`Cet utilisateur n'existe pas`, 401));

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect)
    return next(new AppError(`Mot de passe incorrect`, 401));

  createAndSendToken(user, res);
});

export const logout = tryCatch((req, res, next) => {
  res.cookie("tkn", "", {
    expires: new Date(Date.now() + ONE_SECOND),
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({ status: "success" });
});

export const protect = tryCatch((req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (req.cookies.tkn) {
    token = req.cookies.tkn;
  } else if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token) return next(new AppError(`Vous n'êtes pas connecté`, 401));

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

  const user = S.getUserByUsername.get(decodedToken.username);

  if (!user) {
    return next(new AppError(`L'utilisateur avec ce jeton n'existe plus`, 401));
  }

  req["user"] = user;

  next();
});

export const updateMe = tryCatch((req, res, next) => {
  const { currPassword, newPassword } = req.body;

  if (!currPassword || !newPassword) {
    return next(
      new AppError(
        "Please, provide valid current passowrd and the new password",
        403
      )
    );
  }

  const user: User = S.getUserPassword.get(req["user"].username);

  const isPasswordCorrect = bcrypt.compareSync(currPassword, user.password);

  if (!isPasswordCorrect)
    return next(new AppError(`Mot de passe incorrect`, 401));

  const hashedPassword = bcrypt.hashSync(newPassword, 12);

  S.updatePassword.run([hashedPassword, req["user"].username]);

  createAndSendToken(user, res);
});

export const getMe = tryCatch((req, res) => {
  res.status(200).json({ status: "success", user: req["user"] });
});

export const confirmDelete = tryCatch((req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(new AppError("Please, provide valid current passowrd", 403));
  }

  const user: User = S.getUserPassword.get(req["user"].username);

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect)
    return next(new AppError(`Mot de passe incorrect`, 401));

  next();
});
