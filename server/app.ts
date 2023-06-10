import express from "express";
import cors from "cors";

import clientsRoutes from "./routes/clientRoutes";
import licenceRoutes from "./routes/licenceRoutes";
import carRoutes from "./routes/carRoutes";

const app = express();

app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use("/api/clients", clientsRoutes);
app.use("/api/licences", licenceRoutes);
app.use("/api/cars", carRoutes);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "error", message: "No api endpoint with this url" });
});

app.use((err, req, res, next) => {
  console.log(`ERROR 🔥🔥 :  ${err}`);
  return res.status(400).json({ status: "error", message: err.message });
});

export default app;
