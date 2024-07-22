import express from "express";

import * as controller from "../controllers/categoriesController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllCatogories)
  .post(controller.createCatogory)
  .delete(controller.deleteAllCategories);

router.get("/cars", controller.getCatogoryCars);

router.route("/:id").get(controller.getCatogorieById).patch(controller.updateCategory);
router.delete("/:ids", controller.deleteCategoriesById);

export default router;
