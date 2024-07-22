import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import clientsRoutes from "./routes/clientsRoutes";
import licencesRoutes from "./routes/licencesRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import carsRoutes from "./routes/carsRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import expensesRoutes from "./routes/expensesRoutes";
import procurationsRoutes from "./routes/procurationsRoutes";
import papersRoutes from "./routes/papersRoutes";
import statsRoutes from "./routes/statsRoutes";
import attachmentsController from "./controllers/attachmentsController";
import searchController from "./controllers/searchController";
import userRoutes from "./routes/usersRoutes";
import * as authController from "./controllers/authController";
import errorController from "./controllers/errorController";

const app = express();

app.use(cors({ credentials: true, origin: "*" }));

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

app.use((req, _res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  }

  next();
});

app.use("/api/users", userRoutes);

app.use(authController.protect);
app.delete("/api/*", authController.confirmAction);
app.use("/api/clients", clientsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/licences", licencesRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/procurations", procurationsRoutes);
app.use("/api/papers", papersRoutes);
app.use("/api/stats", statsRoutes);
app.get("/api/attachments/:filename", attachmentsController);
app.get("/api/search/:category", searchController);

app.all("*", (_req, res) => {
  res.status(404).json({ status: "error", message: "Le serveur n'a pas pu trouver la route API demandée." });
});

app.use(errorController);

export default app;
