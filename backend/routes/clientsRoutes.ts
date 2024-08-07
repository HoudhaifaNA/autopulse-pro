import express from "express";

import * as controller from "../controllers/clientsController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllClients)
  .post(controller.verifyClientInfo, controller.createClient)
  .delete(controller.deleteAllClients);

router.get("/list", controller.getClientsList);
router.get("/:id/transactions", controller.getClientTransactions);
router.get("/:id/lastTransaction", controller.getClientLastTransaction);
router.route("/:id").get(controller.getClientById).patch(controller.verifyClientInfo, controller.updateClient);
router.delete("/:ids", controller.deleteClientsByIds);

export default router;
