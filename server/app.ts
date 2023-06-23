import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import searchController from "./controllers/searchController";
import statsRoutes from "./routes/statsRoutes";
import clientsRoutes from "./routes/clientRoutes";
import licenceRoutes from "./routes/licenceRoutes";
import expensesRoutes from "./routes/expensesRoutes";
import carRoutes from "./routes/carRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";
import attachmentController from "./controllers/attachmentController";
import errorController from "./controllers/errorController";
import * as authController from "./controllers/authController";

const app = express();

app.use(cors({ credentials: true, origin: "*" }));

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

app.use("/api/users", userRoutes);

app.use(authController.protect);
app.delete("/api/*", authController.confirmDelete);
app.get("/api/search", searchController);
app.use("/api/stats", statsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/licences", licenceRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/transactions", transactionRoutes);
app.get("/api/attachments/:filename", attachmentController);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "error", message: "No API endpoint with this url" });
});

app.use(errorController);

export default app;
