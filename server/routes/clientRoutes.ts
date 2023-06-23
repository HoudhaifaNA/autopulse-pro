import express from "express";

import * as controller from "../controllers/clientController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllClients)
  .post(controller.createClient)
  .delete(controller.deleteClients);

router
  .route("/:ids")
  .get(controller.getClientByID)
  .patch(controller.updateClient)
  .delete(controller.deleteClientById);

router.patch("/balance/:id", controller.updateBalance);

export default router;
