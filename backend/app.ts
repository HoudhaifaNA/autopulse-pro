import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import searchController from "./controllers/searchController";
// import statsRoutes from "./routes/statsRoutes";
import clientsRoutes from "./routes/clientsRoutes";
// import licenceRoutes from "./routes/licenceRoutes";
// import procurationRoutes from "./routes/procurationRoutes";
// import papersRoutes from "./routes/papersRoutes";
// import expensesRoutes from "./routes/expensesRoutes";
import carRoutes from "./routes/carsRoutes";
// import transactionRoutes from "./routes/transactionRoutes";
// import stockController from "./controllers/stockController";
// import userRoutes from "./routes/userRoutes";
// import attachmentController from "./controllers/attachmentController";
import errorController from "./controllers/errorController";
// import * as authController from "./controllers/authController";
import db from "./database";
// import {
//   CARS_YEARS,
//   EXPENSES_YEARS,
//   LICENCES_YEARS,
//   TRANSACTIONS_YEARS,
// } from "./statments/statStatments";

const app = express();

app.use(cors({ credentials: true, origin: "*" }));

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

// app.use("/api/users", userRoutes);

// app.use(authController.protect);
// app.delete("/api/*", authController.confirmDelete);
// app.get("/api/search", searchController);
// app.use("/api/stats", statsRoutes);
app.use("/api/clients", clientsRoutes);
// app.use("/api/licences", licenceRoutes);
// app.use("/api/procurations", procurationRoutes);
// app.use("/api/papers", papersRoutes);
// app.use("/api/expenses", expensesRoutes);
app.use("/api/cars", carRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.get("/api/stock", stockController);
// app.get("/api/attachments/:filename", attachmentController);
// app.get("/api/workingyears", (req, res) => {
//   const car_years = CARS_YEARS.all();
//   const licences_years = LICENCES_YEARS.all();
//   const transactions_years = TRANSACTIONS_YEARS.all();
//   const expenses_years = EXPENSES_YEARS.all();

//   function combineYears(...arrays) {
//     const allYears = new Set();

//     arrays.forEach((arr) => {
//       arr.forEach((item) => {
//         allYears.add(item.year_date);
//       });
//     });

//     return Array.from(allYears).sort();
//   }

//   const carYearsList = combineYears(car_years);
//   const licencesYearsList = combineYears(licences_years);
//   const transactionsYearsList = combineYears(transactions_years);
//   const expensesYearsList = combineYears(expenses_years);
//   const allYears = combineYears(
//     car_years,
//     licences_years,
//     transactions_years,
//     expenses_years
//   );

//   res.status(200).json({
//     status: "success",
//     years: allYears,
//     carYearsList,
//     licencesYearsList,
//     transactionsYearsList,
//     expensesYearsList,
//   });
// });

// db.prepare(
//   `UPDATE licences
// SET carId = (
//     SELECT id
//     FROM cars
//     WHERE cars.ownerId = licences.id AND cars.ownerId > 0
// )
// WHERE EXISTS (
//     SELECT 1
//     FROM cars
//     WHERE cars.ownerId = licences.id AND cars.ownerId > 0
// );`
// ).run();

// const stmt = db.prepare(`SELECT cars.*,
// CASE WHEN moudjahid IS NOT NULL THEN moudjahid ELSE ownerName END AS ownerName,
// licences.price AS licencePrice,
// clients.fullName AS seller,
// CASE WHEN cars.buyerId IS NULL THEN NULL ELSE buyers.fullName END AS buyer,
// datetime(cars.created_at,'localtime') AS created_at,
// datetime(cars.updated_at,'localtime') AS updated_at
// FROM cars
// LEFT JOIN licences ON cars.ownerId > 0 AND cars.ownerId = licences.id
// INNER JOIN clients ON clients.id = cars.sellerId
// LEFT JOIN clients AS buyers ON buyers.id = cars.buyerId`);
// let i = 0;
// let ok = 0;
// let ok1 = 0;
// let ok2 = 0;
// let ok3 = 0;
// for (const car of stmt.all() as any) {
//   if (car) {
//     i++;
//     let {
//       costInEuros,
//       euroPrice,
//       purchasingPrice,
//       ownerId,
//       licencePrice,
//       totalExpensesCost,
//       totalEurosAmount,
//       totalCost,
//       profit,
//       buyerId,
//     } = car;

//     let expenses = JSON.parse(car.expenses);
//     const calcExpnses = () => {
//       if (Array.isArray(expenses)) {
//         expenses.forEach((exp: any) => {
//           if (exp.type !== "locale") {
//             const expTotal = exp.euroCost * (euroPrice / 100);
//             exp.totalCost = expTotal;
//           }
//         });
//       }
//     };
//     calcExpnses();

//     let expensesEURCost = 0;
//     let expensesDAcost = 0;

//     // Calculate totalDA and EUR costs of expenses
//     expenses.forEach((expense) => {
//       expensesEURCost += Number(expense.euroCost);
//       expensesDAcost += Number(expense.totalCost);
//     });

//     let expensesJS = JSON.stringify(expenses);
//     console.log("-------------------------");
//     let PP = purchasingPrice;
//     if (car.type !== "locale") PP = (costInEuros * euroPrice) / 100;
//     let ttCost = PP + expensesDAcost;
//     if (ownerId > 0) ttCost += licencePrice;
//     ok += ttCost;
//     ok1 += licencePrice;
//     ok2 += PP;
//     ok3 += expensesDAcost;
//     // console.log(ttCost === totalCost);
//     // if (buyerId) {
//     //   console.log(profit === car.soldPrice - totalCost);
//     // }

//     // db.prepare(
//     //   `UPDATE cars
//     //  SET totalEurosAmount = ?,
//     //  totalExpensesCost = ?,
//     //  expenses = ?,
//     //  purchasingPrice = ?,
//     //  totalCost = ?
//     //  WHERE id = ?
//     //  `
//     // ).run([
//     //   expensesEURCost + costInEuros,
//     //   expensesDAcost,
//     //   expensesJS,
//     //   PP,
//     //   ttCost,
//     //   car.id,
//     // ]);
//     // db.prepare(
//     //   `UPDATE cars
//     //  SET totalExpensesCost = ?
//     //  WHERE id = ?
//     //  `
//     // ).run([expensesDAcost, car.id]);
//     // console.table({
//     //   costInEuros,
//     //   euroPrice,
//     //   purchasingPrice,
//     //   licencePrice,
//     //   totalExpensesCost,
//     //   totalEurosAmount,
//     //   totalCost,
//     // });
//   }
// }

app.all("*", (req, res) => {
  res.status(404).json({ status: "error", message: "No API endpoint with this url" });
});

app.use(errorController);

export default app;
