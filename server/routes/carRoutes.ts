import express from "express";

import * as controller from "../controllers/carController";

const router = express.Router();

router
  .route("/")
  .get(controller.getCars)
  .post(controller.createCar)
  .delete(controller.deleteCars);

router
  .route("/:carId")
  .get(controller.getCarById)
  .patch(controller.updateCar)
  .delete(controller.deleteCarById);

router.patch("/sell/:carId", controller.sellCar);

export default router;
