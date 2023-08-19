import express from "express";

import * as controller from "../controllers/carsController";

const router = express.Router();

router.route("/").get(controller.getAllCars);
// .post(controller.createCar)
// .delete(controller.deleteCars);

// router.get("/brands", controller.getCarBrands);
// router.get("/models", controller.getBrandModels);
// router.get("/carBrand", controller.getCarsByBrand);
// router.get("/carName", controller.getCarsByName);
// router.get("/series", controller.getCarSeries);
// router.get("/series/:serie", controller.getCarsBySerie);

// router
//   .route("/:carIds")
//   .get(controller.getCarById)
//   .patch(controller.updateCar)
//   .delete(controller.deleteCarById);

// router.patch("/sell/:carId", controller.sellCar);
// router.patch("/unsold/:carId", controller.unsoldCar);
// router.patch("/soldPrice/:carId", controller.updateSoldPrice);

export default router;
