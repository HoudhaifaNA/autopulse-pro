import db from "../database";
import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";
import * as S from "../statments/carsStatments";

export const getAllCars = tryCatch((req, res) => {
  const cars = db.prepare(S.selectCarsQuery).all();
  return res.status(200).json({ status: "success", results: cars.length, cars });
});

// export const getCarSeries = tryCatch((req, res) => {
//   const series = S.getCarsSeries.all();

//   return res.status(200).json({ status: "success", series });
// });
// export const getCarsBySerie = tryCatch((req, res) => {
//   const { serie } = req.params;

//   const cars = S.getCarsBySerie.all(serie);

//   return res
//     .status(200)
//     .json({ status: "success", results: cars.length, cars });
// });

// export const getCarById = tryCatch((req, res, next) => {
//   const { carIds } = req.params;

//   const car = S.getCarById.get(carIds);

//   if (!car) return next(new AppError("Voiture n'existe pas", 404));

//   return res.status(200).json({ status: "success", car });
// });

// export const createCar = tryCatch((req, res, next) => {
//   const {
//     type,
//     brand,
//     model,
//     serialNumber,
//     registrationNumber,
//     secondRegistrationNumber,
//     keys,
//     mileage,
//     color,
//     year,
//     features,
//     sellerId,
//     ownerId,
//     ownerName,
//     costInEuros,
//     euroPrice,
//     purchasingPrice,
//     isExchange,
//     exchangeTypes,
//     expenses,
//     totalExpensesCost,
//     totalEurosAmount,
//     totalCost,
//     created_at,
//   } = req.body;

//   const carName = `${brand} ${model}`;
//   const createdAtDate = dayjs(created_at).format("YYYY-MM-DD");

//   // Check if the owner is a moudjahid with licence
//   if (ownerId !== 0) {
//     const licence: Licence = getLicenceById.get(ownerId);

//     if (!licence || licence.isValid === "false") {
//       return next(new AppError("Licence invalide", 400));
//     }
//   }

//   const params = [
//     type,
//     carName,
//     brand,
//     model,
//     serialNumber,
//     registrationNumber,
//     secondRegistrationNumber,
//     keys,
//     mileage,
//     color,
//     year,
//     features,
//     sellerId,
//     ownerId,
//     ownerName,
//     costInEuros,
//     euroPrice,
//     purchasingPrice,
//     isExchange,
//     JSON.stringify(exchangeTypes),
//     JSON.stringify(expenses),
//     totalExpensesCost,
//     totalEurosAmount,
//     totalCost,
//     createdAtDate,
//   ];

//   const client: any = getClientById.get(sellerId);
//   if (!client || (client.clientType === "euro" && type === "locale")) {
//     return next(
//       new AppError(`Client n'est pas autorisé à effectuer le transfert`, 401)
//     );
//   } else if (!client || (client.clientType !== "euro" && type !== "locale")) {
//     return next(
//       new AppError(`Client n'est pas autorisé à effectuer le transfert`, 401)
//     );
//   }
//   const { lastInsertRowid } = S.creatCar.run(params);

//   const transactionAmount = type === "locale" ? purchasingPrice : costInEuros;

//   const transacrtionParams = [
//     lastInsertRowid,
//     sellerId,
//     createdAtDate,
//     "car",
//     carName,
//     color,
//     `${registrationNumber} (${serialNumber})`,
//     year,
//     transactionAmount,
//     "entrante",
//   ];

//   createTransaction.run(transacrtionParams);

//   const newCar = S.getCarById.get(lastInsertRowid);

//   return res.status(201).json({ status: "success", car: newCar });
// });

// export const updateCar = tryCatch((req, res, next) => {
//   const { carIds } = req.params;
//   let carName;

//   let {
//     type,
//     brand,
//     model,
//     serialNumber,
//     registrationNumber,
//     secondRegistrationNumber,
//     keys,
//     mileage,
//     color,
//     year,
//     created_at,
//     features,
//     sellerId,
//     costInEuros,
//     euroPrice,
//     purchasingPrice,
//     isExchange,
//     exchangeTypes,
//     expenses,
//     totalExpensesCost,
//     totalEurosAmount,
//     totalCost,
//   } = req.body;
//   const createdAtDate = dayjs(created_at).format("YYYY-MM-DD");

//   if (brand && model) carName = `${brand} ${model}`;

//   // TODO SERIALIZE STATMENTS
//   const client: any = getClientById.get(sellerId);
//   if (!client || (client.clientType === "euro" && type === "locale")) {
//     return next(
//       new AppError(`Client n'est pas autorisé à effectuer le transfert`, 401)
//     );
//   } else if (!client || (client.clientType !== "euro" && type !== "locale")) {
//     return next(
//       new AppError(`Client n'est pas autorisé à effectuer le transfert`, 401)
//     );
//   }

//   const { changes } = S.updateCar.run([
//     type,
//     carName,
//     brand,
//     model,
//     serialNumber,
//     registrationNumber,
//     secondRegistrationNumber,
//     keys,
//     mileage,
//     color,
//     year,
//     createdAtDate,
//     features,
//     sellerId,
//     costInEuros,
//     euroPrice,
//     purchasingPrice,
//     isExchange,
//     JSON.stringify(exchangeTypes),
//     JSON.stringify(expenses),
//     totalExpensesCost,
//     totalEurosAmount,
//     totalCost,
//     carIds,
//   ]);

//   if (changes === 0) return next(new AppError("Voiture n'existe pas", 404));

//   deleteDocumentsByIds(carIds, deleteCarTransaction, ["entrante"]);

//   const updatedCar: any = S.getCarById.get(carIds);
//   const transactionAmount = type === "locale" ? purchasingPrice : costInEuros;

//   const sellerTransacrtionParams = [
//     carIds,
//     sellerId,
//     createdAtDate,
//     "car",
//     carName,
//     color,
//     `${registrationNumber} (${serialNumber})`,
//     year,
//     transactionAmount,
//     "entrante",
//   ];

//   createTransaction.run(sellerTransacrtionParams);

//   if (updatedCar.buyerId) {
//     const soldDate =
//       updatedCar.sold_date ?? dayjs(new Date()).format("YYYY-MM-DD");
//     const buyerTransacrtionParams = [
//       carIds,
//       updatedCar.buyerId,
//       soldDate,
//       "car",
//       carName,
//       color,
//       registrationNumber,
//       year,
//       updatedCar.soldPrice,
//       "sortante",
//     ];
//     deleteDocumentsByIds(carIds, deleteCarTransaction, ["sortante"]);

//     createTransaction.run(buyerTransacrtionParams);
//   }
//   return res.status(200).json({ status: "success", car: updatedCar });
// });

// export const getCarsByBrand = tryCatch((req, res) => {
//   let { brand, serie, type } = req.query;

//   brand = typeof brand === "string" ? brand.toLowerCase() : brand;

//   let STMT = S.getCarsByBrand;

//   if (serie) {
//     STMT += ` AND serie = '${serie}'`;
//   }
//   if (type) {
//     STMT += ` AND type = '${type}'`;
//   }

//   STMT += ` ORDER BY cars.name`;

//   const cars = db.prepare(STMT).all([brand]);

//   res.json({ status: "success", results: cars.length, cars });
// });
// export const getCarsByName = tryCatch((req, res) => {
//   let { name, serie, type } = req.query;

//   name = typeof name === "string" ? name.toLowerCase() : name;
//   let STMT = S.getCarsByName;
//   if (serie) {
//     STMT += ` AND serie = '${serie}'`;
//   }
//   if (type) {
//     STMT += ` AND type = '${type}'`;
//   }

//   STMT += ` ORDER BY cars.name`;
//   const cars = db.prepare(STMT).all([name]);

//   res.json({ status: "success", results: cars.length, cars });
// });
// export const getCarBrands = tryCatch((req, res) => {
//   const brands = S.getCarsBrands.all();

//   res.json({ status: "success", results: brands.length, brands });
// });

// export const getBrandModels = tryCatch((req, res) => {
//   let { brand } = req.query;

//   brand = typeof brand === "string" ? brand.toLowerCase() : brand;

//   const models = S.getBrandModels.all(brand);

//   res.json({ status: "success", results: models.length, models });
// });

// export const sellCar = tryCatch((req, res, next) => {
//   const { carId } = req.params;
//   const {
//     buyerId,
//     soldPrice,
//     sold_date,
//     given_keys,
//     folder,
//     procuration,
//     gray_card,
//     selling_details,
//   } = req.body;

//   const car: any = S.getCarById.get(carId);

//   if (!car) return next(new AppError("Voiture n'existe pas", 404));

//   const { brand, model, color, registrationNumber, serialNumber, year } = car;

//   if (car.soldPrice > 0) return next(new AppError("Voiture a été vendue", 403));

//   if (!buyerId || !soldPrice || !sold_date) {
//     return next(
//       new AppError(
//         "Fournir un acheteur, prix de vente, date de vente valide",
//         400
//       )
//     );
//   }
//   const client: any = getClientById.get(buyerId);
//   if (!client || client.clientType === "euro") {
//     return next(
//       new AppError(`Client n'est pas autorisé à effectuer le transfert`, 401)
//     );
//   }
//   const params = [
//     buyerId,
//     soldPrice,
//     sold_date,
//     given_keys,
//     folder,
//     procuration,
//     gray_card,
//     selling_details,
//     carId,
//   ];

//   S.sellCar.run(params);

//   // TODO CHANGE DATE NAME
//   const soldDate = dayjs(sold_date).format("YYYY-MM-DD");
//   const transacrtionParams = [
//     carId,
//     buyerId,
//     `${soldDate}`,
//     "car",
//     `${brand} ${model}`,
//     color,
//     `${registrationNumber} (${serialNumber})`,
//     year,
//     soldPrice,
//     "sortante",
//   ];

//   createTransaction.run(transacrtionParams);

//   const soldCar = S.getCarById.get(carId);

//   return res.status(200).json({ status: "success", car: soldCar });
// });

// export const updateSoldPrice = tryCatch((req, res, next) => {
//   const { carId } = req.params;
//   const {
//     buyerId,
//     soldPrice,
//     sold_date,
//     given_keys,
//     folder,
//     procuration,
//     gray_card,
//     selling_details,
//   } = req.body;

//   const car: any = S.getCarById.get(carId);

//   if (!car) return next(new AppError("Voiture n'existe pas", 404));

//   const { brand, model, color, registrationNumber, serialNumber, year } = car;
//   const params = [
//     soldPrice,
//     sold_date,
//     given_keys,
//     folder,
//     procuration,
//     gray_card,
//     selling_details,
//     carId,
//   ];

//   S.updateSoldPrice.run(params);
//   deleteDocumentsByIds(carId, deleteCarTransaction, ["sortante"]);

//   // TODO CHANGE DATE NAME
//   const soldDate = dayjs(sold_date).format("YYYY-MM-DD");
//   const transacrtionParams = [
//     carId,
//     buyerId,
//     `${soldDate}`,
//     "car",
//     `${brand} ${model}`,
//     color,
//     `${registrationNumber} (${serialNumber})`,
//     year,
//     soldPrice,
//     "sortante",
//   ];

//   createTransaction.run(transacrtionParams);

//   const soldCar = S.getCarById.get(carId);

//   return res.status(200).json({ status: "success", car: soldCar });
// });
// export const unsoldCar = tryCatch((req, res, next) => {
//   const { carId } = req.params;

//   const car: any = S.getCarById.get(carId);

//   if (!car) return next(new AppError("Voiture n'existe pas", 404));

//   S.unsoldCar.run(carId);
//   deleteDocumentsByIds(carId, deleteCarTransaction, ["sortante"]);

//   return res.status(200).json({ status: "success" });
// });

// export const deleteCarById = tryCatch((req, res) => {
//   const { carIds } = req.params;

//   deleteDocumentsByIds(carIds, S.deleteCarById);
//   deleteDocumentsByIds(carIds, deleteTransactionByProduct, ["car"]);
//   return res.status(204).json({ status: "success" });
// });

// export const deleteCars = tryCatch((req, res) => {
//   S.deleteAllCars.run();
//   deleteTransactionByType.run("car");

//   return res.status(204).json({ status: "success" });
// });
