import express from "express";

import * as controller from "../controllers/clientsController";

const router = express.Router();

router
  .route("/")
  .get(controller.getAllClients)
  .post(controller.verifyClientInfo, controller.createClient)
  .delete(controller.deleteAllClients);

router.get("/:id/transactions", controller.getClientTransactions);
router.get("/:id/lastTransaction", controller.getClientLastTransaction);
router.route("/:id").get(controller.getClientById).patch(controller.verifyClientInfo, controller.updateClient);
router.route("/:ids").delete(controller.deleteClientsByIds);

export default router;
