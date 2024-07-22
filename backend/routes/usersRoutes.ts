import express from "express";

import * as authController from "../controllers/authController";
import * as userController from "../controllers/usersController";

const router = express.Router();

router.post("/login", authController.login);

router.use(authController.protect);

router.post("/logout", authController.logout);
router.get("/getMe", authController.getMe);
router.patch("/updateMe", authController.updateMe);

router.route("/").get(userController.getAllUsers).post(userController.createUser).delete(userController.deleteAllUsers);
router.route("/:id").get(userController.getUserById).delete(userController.deleteUserById);

export default router;
