import express from "express";

import * as controller from "../controllers/carsController";

const router = express.Router();

router.route("/").get(controller.getAllCars).post(controller.createCar).delete(controller.deleteAllCars);

router.get("/brandsAndSeries", controller.getCarsBrandsAndSeries);

router.route("/:id").get(controller.getCarById).patch(controller.updateCar);
router.delete("/:ids", controller.deleteCarsById);

router.route("/sale/:id").post(controller.sellCar).patch(controller.updateCarSale).delete(controller.cancelCarSale);

export default router;
