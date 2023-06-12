import express from "express";

import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post("/login", authController.login);

router.use(authController.protect);

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser)
  .delete(userController.deleteUsers);

router.post("/logout", authController.logout);

router.patch("/updateMe", authController.updateMe);

router.route("/:id").delete(userController.deleteUserById);

export default router;
