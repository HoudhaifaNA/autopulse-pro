import express from "express";

import * as controller from "../controllers/clientController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllClients)
  .post(controller.createClient)
  .delete(controller.deleteClients);

router
  .route("/:id")
  .get(controller.getClientByID)
  .patch(controller.updateClient)
  .delete(controller.deleteClientById);

export default router;
