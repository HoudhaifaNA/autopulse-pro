import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Response } from "express";

import * as S from "../statments/userStatments";
import AppError from "../utils/AppError";
import tryCatch from "../utils/tryCatch";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config";
import { User } from "../../interfaces";

const ONE_SECOND = 1000;

const signToken = (username: string) => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const createAndSendToken = (user: User, res: Response) => {
  const token = signToken(user.username);

  res.cookie("tkn", token, {
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });

  const signedUser: Partial<User> = { ...user };

  delete signedUser["password"];

  res.status(200).json({ status: "success", token, user: signedUser });
};

export const login = tryCatch((req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Veuillez fournir un nom d'utilisateur et un mot de passe.", 403));
  }

  const user = S.selectUserByUsernameStatment.get(username) as User | undefined;

  if (!user) {
    return next(new AppError("Désolé, cet utilisateur n'existe pas.", 401));
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError(`Mot de passe incorrect.`, 401));
  }

  createAndSendToken(user, res);
});

export const logout = tryCatch((_req, res) => {
  res.cookie("tkn", "", {
    expires: new Date(Date.now() + ONE_SECOND),
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({ status: "success" });
});

export const protect = tryCatch((req, _res, next) => {
  const { authorization } = req.headers;
  let token: string | undefined;

  if (req.cookies.tkn) {
    token = req.cookies.tkn;
  } else if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à cette fonctionnalité.", 401)
    );
  }

  const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

  const user = S.selectUsernameStatment.get(decodedToken.username) as User | undefined;

  if (!user) {
    return new AppError("Désolé, cet utilisateur ou ce jeton est introuvable.", 401);
  }

  req.body.user = user;

  next();
});

export const updateMe = tryCatch((req, res, next) => {
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    return next(
      new AppError("Veuillez fournir votre mot de passe actuel valide ainsi que votre nouveau mot de passe", 403)
    );
  }

  const user = S.selectUserByUsernameStatment.get(req.body.user.username) as User | undefined;

  if (!user) {
    return next(new AppError("Désolé, cet utilisateur n'existe pas.", 401));
  }

  const isPasswordCorrect = bcrypt.compareSync(current_password, user.password);

  if (!isPasswordCorrect) {
    return next(
      new AppError(
        "Le mot de passe est incorrect. Veuillez vérifier le mot de passe que vous avez saisi et réessayer.",
        401
      )
    );
  }

  const hashedPassword = bcrypt.hashSync(new_password, 12);

  S.updatePasswordStatment.run([hashedPassword, req.body.user.username]);

  createAndSendToken(user, res);
});

export const getMe = tryCatch((req, res) => {
  res.status(200).json({ status: "success", user: req.body.user });
});

export const confirmAction = tryCatch((req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(new AppError("Veuillez fournir un mot de passe actuel valide.", 403));
  }

  const user = S.selectUserByUsernameStatment.get(req.body.user.username) as User;

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return next(
      new AppError(
        "Le mot de passe est incorrect. Veuillez vérifier le mot de passe que vous avez saisi et réessayer.",
        401
      )
    );
  }

  next();
});
