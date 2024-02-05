import { Request } from "express";

import db from "../database";
import * as S from "../statments/carsStatments";
import { selectLicenceByIdStatment } from "../statments/licencesStatments";
import { insertTransactionStatment, updateTransactionByProductIdStatment } from "../statments/transactionsStatments";
import { selectProcurationByCarIdStatment, deleteProcurationsByIdQuery } from "../statments/procurationsStatments";
import { selectPaperByCarIdStatment, deletePapersByIdQuery } from "../statments/papersStatments";

import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";
import { Car, CarExpense, Licence, Paper, Procuration } from "../../interfaces";

interface ITotalCount {
  total_count: number;
}

export const getCarsWithPapersList = tryCatch((req, res) => {
  const { type } = req.query;
  const selectCarsForPPQuery = `${S.selectCarsListStatment}
  ${type === "sold" ? "  WHERE buyer_id IS NOT NULL" : ""}
  `;

  const cars = db.prepare(selectCarsForPPQuery).all();

  return res.status(200).json({ status: "success", results: cars.length, cars });
});

const filterCars = (req: Request) => {
  const {
    name,
    type,
    isSold,
    productionYears,
    isLicenceInComplete,
    isPPInComplete,
    isSoldPriceInComplete,
    isExpenseCostInComplete,
  } = req.query;

  const rangeFilters = [
    "purchased_at",
    "purchase_price_eur",
    "purchase_price_dzd",
    "expense_cost",
    "total_cost",
    "sold_at",
    "profit",
    "sold_price",
  ];

  const filterQueries = generateRangeFilters(rangeFilters, req.query, "cars");

  if (type) {
    const typeFilter = `cars.type = '${type}'`;
    filterQueries.push(typeFilter);
  }

  if (name && typeof name === "string") {
    const nameFilter = `cars.name LIKE '${name.trim()}%'`;
    filterQueries.push(nameFilter);
  }

  if (isSold && (isSold === "true" || isSold === "false")) {
    const isSoldCondition = isSold === "true" ? "IS NOT NULL" : "IS NULL";
    const soldFilter = `cars.buyer_id  ${isSoldCondition}`;
    filterQueries.push(soldFilter);
  }

  if (productionYears && typeof productionYears === "string") {
    const productionYearsFilter = `cars.production_year IN (${productionYears})`;
    filterQueries.push(productionYearsFilter);
  }

  if (isLicenceInComplete && (isLicenceInComplete === "true" || isLicenceInComplete === "false")) {
    const isLicenceInCompleteCondition = isLicenceInComplete === "true" ? "= 0" : "> 0";
    const isLicenceInCompleteFilter = `cars.owner_id IS NOT NULL AND cars.licence_price  ${isLicenceInCompleteCondition}`;
    filterQueries.push(isLicenceInCompleteFilter);
  }

  if (isPPInComplete && (isPPInComplete === "true" || isPPInComplete === "false")) {
    const isPPInCompleteCondition = isPPInComplete === "true" ? "= 0" : "> 0";
    const isPPInCompleteFilter = `cars.purchase_price_dzd ${isPPInCompleteCondition}`;
    filterQueries.push(isPPInCompleteFilter);
  }

  if (isExpenseCostInComplete && (isExpenseCostInComplete === "true" || isExpenseCostInComplete === "false")) {
    const isExpenseCostInCompleteCondition = isExpenseCostInComplete === "true" ? "= 0" : "> 0";
    const isExpenseCostInCompleteFilter = `cars.expense_cost ${isExpenseCostInCompleteCondition}`;
    filterQueries.push(isExpenseCostInCompleteFilter);
  }

  if (isSoldPriceInComplete && (isSoldPriceInComplete === "true" || isSoldPriceInComplete === "false")) {
    const isSoldPriceInCompleteCondition = isSoldPriceInComplete === "true" ? "= 0" : "> 0";
    const isSoldPriceInCompleteFilter = `cars.buyer_id IS NOT NULL AND cars.sold_price ${isSoldPriceInCompleteCondition}`;
    filterQueries.push(isSoldPriceInCompleteFilter);
  }
  const filters = filterQueries.join(" AND ");
  return { filters, filterQueries };
};

export const getAllCars = tryCatch((req, res) => {
  const { orderBy = "-purchased_at", page = 1, limit = 250 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const { filters } = filterCars(req);
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  const selectCarsQuery = `
    ${S.selectCarsQuery}
    ${filterClause}
    ${orderByQuery}
    LIMIT ? OFFSET ?
  `;

  const selectCarsCountQuery = `
    SELECT COUNT(*) AS total_count
    FROM cars
    ${filterClause}
  `;

  const cars = db.prepare(selectCarsQuery).all([limit, skip]);
  const { total_count } = db.prepare(selectCarsCountQuery).get() as ITotalCount;

  return res.status(200).json({ status: "success", results: total_count, records_in_page: cars.length, cars });
});

export const getCarsBrandsAndSeries = tryCatch((req, res) => {
  const { name } = req.query;

  const { filters, filterQueries } = filterCars(req);
  const brandFilters = filterQueries.filter((query) => !query.startsWith("cars.name")).join(" AND ");

  const brandFilterClause = brandFilters ? `WHERE ${brandFilters}` : "";
  const filterClause = filters ? `WHERE ${filters}` : "";

  const carsBrandQuery = S.selectCarsBrandsQuery.replace("--FILTER", brandFilterClause);
  const carsNameQuery = S.selectCarsNamesQuery.replace("--FILTER", filterClause);

  const cars_brand = db.prepare(carsBrandQuery).all();
  const cars_name = db.prepare(carsNameQuery).all(name);

  return res.status(200).json({
    status: "success",
    cars_brand,
    cars_name,
  });
});

export const getCarById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const car = S.selectCarByIdStatment.get(id);

  if (!car) {
    return next(new AppError(`Voiture non trouvée.`, 404));
  }

  return res.status(200).json({ status: "success", car });
});

export const createCar = tryCatch((req, res, next) => {
  const {
    purchased_at,
    type,
    brand,
    model,
    serial_number,
    registration_number,
    second_registration_number,
    color,
    production_year,
    keys,
    mileage,
    papers_type,
    has_procuration,
    has_gray_card,
    features,
    seller_id,
    owner_id,
    owner_name,
    purchase_price_eur,
    eur_exchange_rate,
    purchase_price_dzd,
    is_exchange,
    exchange_types,
    expenses,
    expense_cost,
    euro_cost,
  } = req.body;

  let ownerName = owner_name;
  let licence_price = 0;

  if (owner_id) {
    const licence = selectLicenceByIdStatment.get(owner_id) as Licence | undefined;

    if (!licence || !licence.is_valid) {
      return next(new AppError("La licence est invalide. Veuillez vérifier les informations fournies.", 400));
    }

    ownerName = licence.moudjahid;
    licence_price = licence.price;
  }

  db.exec("BEGIN TRANSACTION");
  try {
    const params = {
      purchased_at,
      type,
      brand,
      model,
      serial_number,
      registration_number,
      second_registration_number,
      color,
      production_year,
      keys,
      mileage,
      papers_type,
      has_procuration,
      has_gray_card,
      features,
      seller_id,
      owner_id,
      owner_name: ownerName,
      licence_price,
      purchase_price_eur,
      eur_exchange_rate,
      purchase_price_dzd,
      is_exchange,
      exchange_types: JSON.stringify(exchange_types),
      expenses: JSON.stringify(expenses),
      expense_cost,
      euro_cost,
    };

    const { lastInsertRowid } = S.insertCarStatment.run(params);

    const carName = `${brand} ${model}`;
    const currency = type.includes("lcl") ? "DZD" : "EUR";
    const transactionAmount = type.includes("lcl") ? purchase_price_dzd : purchase_price_eur;

    const transacrtionParams = {
      client_id: seller_id,
      transaction_date: purchased_at,
      type: "car",
      product_id: lastInsertRowid,
      info1: carName,
      info2: color,
      info3: `${registration_number} (${serial_number})`,
      info4: production_year,
      direction: "entrante",
      currency: currency,
      amount: transactionAmount,
      recipient: "company",
      note: features,
    };

    insertTransactionStatment.run(transacrtionParams);

    const newCar = S.selectCarByIdStatment.get(lastInsertRowid) as Car;
    db.exec("COMMIT;");

    return res.status(201).json({ status: "success", car: newCar });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const updateCar = tryCatch((req, res, next) => {
  const { id } = req.params;
  const {
    purchased_at,
    type,
    brand,
    model,
    serial_number,
    registration_number,
    second_registration_number,
    color,
    production_year,
    keys,
    mileage,
    papers_type,
    has_procuration,
    has_gray_card,
    features,
    seller_id,
    owner_id,
    owner_name,
    purchase_price_eur,
    eur_exchange_rate,
    purchase_price_dzd,
    is_exchange,
    exchange_types,
    expenses,
    expense_cost,
    euro_cost,
  } = req.body;

  let ownerName = owner_name;
  let licence_price = 0;

  if (owner_id) {
    const licence = selectLicenceByIdStatment.get(owner_id) as Licence | undefined;

    if (!licence || (!licence.is_valid && String(licence.car_id) !== id)) {
      return next(new AppError("La licence est invalide. Veuillez vérifier les informations fournies.", 400));
    }

    ownerName = licence.moudjahid;
    licence_price = licence.price;
  }

  db.exec("BEGIN TRANSACTION");
  try {
    const params = [
      purchased_at,
      type,
      brand,
      model,
      serial_number,
      registration_number,
      second_registration_number,
      color,
      production_year,
      keys,
      mileage,
      papers_type,
      has_procuration,
      has_gray_card,
      features,
      seller_id,
      owner_id,
      ownerName,
      licence_price,
      purchase_price_eur,
      eur_exchange_rate,
      purchase_price_dzd,
      is_exchange,
      JSON.stringify(exchange_types),
      JSON.stringify(expenses),
      expense_cost,
      euro_cost,
      id,
    ];

    const procuration = selectProcurationByCarIdStatment.get(id) as Procuration | undefined;

    if (procuration && !owner_id) {
      db.exec("ROLLBACK;");
      return next(new AppError(`Licence invalide pour une voiture avec procuration.`, 400));
    }

    const { changes } = S.updateCarStatment.run(params);

    if (!changes) {
      db.exec("ROLLBACK;");
      return next(new AppError(`Voiture non trouvée.`, 404));
    }

    const updatedCar = S.selectCarByIdStatment.get(id) as Car;

    const currency = updatedCar.type.includes("lcl") ? "DZD" : "EUR";
    const transactionAmount = updatedCar.type.includes("lcl")
      ? updatedCar.purchase_price_dzd
      : updatedCar.purchase_price_eur;

    const productParams = ["car", id, "entrante"];

    const transacrtionParams = [
      updatedCar.seller_id,
      updatedCar.purchased_at,
      updatedCar.name,
      updatedCar.color,
      `${updatedCar.registration_number} (${updatedCar.serial_number})`,
      updatedCar.production_year,
      "entrante",
      currency,
      transactionAmount,
      "company",
      features,
    ];

    updateTransactionByProductIdStatment.run([...transacrtionParams, ...productParams]);

    db.exec("COMMIT;");

    return res.status(200).json({ status: "success", car: updatedCar });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const sellCar = tryCatch((req, res, next) => {
  const { id } = req.params;
  const defautSoldDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const {
    buyer_id,
    sold_at = defautSoldDate,
    given_keys = 0,
    papers_type,
    has_procuration,
    has_gray_card,
    selling_details,
    sold_price = 0,
  } = req.body;

  if (!buyer_id) {
    return next(
      new AppError("Veuillez fournir les informations de l'acheteur, elles sont nécessaires pour continuer.", 403)
    );
  }

  const car = S.selectCarByIdStatment.get(id) as Car | undefined;

  if (!car) {
    return next(new AppError(`Voiture non trouvée.`, 404));
  }

  if (car.buyer_id) {
    return next(new AppError("Voiture déjà vendue. Impossible de procéder à la vente.", 403));
  }

  db.exec("BEGIN TRANSACTION");
  try {
    const saleParams = [
      buyer_id,
      sold_at,
      given_keys,
      papers_type,
      has_procuration,
      has_gray_card,
      selling_details,
      sold_price,
      id,
    ];

    S.sellCarStatment.run(saleParams);

    const transacrtionParams = {
      client_id: buyer_id,
      transaction_date: sold_at,
      type: "car",
      product_id: id,
      info1: car.name,
      info2: car.color,
      info3: `${car.registration_number} (${car.serial_number})`,
      info4: car.production_year,
      direction: "sortante",
      currency: "DZD",
      amount: -sold_price,
      recipient: "buyer",
      note: selling_details,
    };

    insertTransactionStatment.run(transacrtionParams);

    const soldCar = S.selectCarByIdStatment.get(id) as Car;
    db.exec("COMMIT;");

    return res.status(200).json({ status: "success", car: soldCar });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const updateCarSale = tryCatch((req, res, next) => {
  const { id } = req.params;
  const { buyer_id, sold_at, given_keys, papers_type, has_procuration, has_gray_card, selling_details, sold_price } =
    req.body;

  const car = S.selectCarByIdStatment.get(id) as Car | undefined;

  if (!car) {
    return next(new AppError(`Voiture non trouvée.`, 404));
  }

  if (!car.buyer_id) {
    return next(
      new AppError("Impossible de mettre à jour la vente de la voiture. Cette voiture n'a pas encore été vendue.", 403)
    );
  }

  db.exec("BEGIN TRANSACTION");
  try {
    const saleParams = [
      buyer_id,
      sold_at,
      given_keys,
      papers_type,
      has_procuration,
      has_gray_card,
      selling_details,
      sold_price,
      id,
    ];

    S.updateCarSaleStatment.run(saleParams);

    const soldCar = S.selectCarByIdStatment.get(id) as Car;

    const procuration = selectProcurationByCarIdStatment.get(id) as Procuration | undefined;

    if (procuration && !procuration.is_expense && procuration.buyer_id !== buyer_id) {
      const procurationParams = ["procuration", procuration.id, "sortante"];

      const procurationBuyerParams = [buyer_id, null, null, null, null, null, null, null, null, null, null];

      updateTransactionByProductIdStatment.run([...procurationBuyerParams, ...procurationParams]);
    }

    const carSaleProductParams = ["car", id, "sortante"];

    const carSaletransacrtionParams = [
      buyer_id,
      sold_at,
      soldCar.name,
      soldCar.color,
      `${soldCar.registration_number} (${soldCar.serial_number})`,
      soldCar.production_year,
      "sortante",
      "DZD",
      -sold_price,
      "buyer",
      selling_details,
    ];

    updateTransactionByProductIdStatment.run([...carSaletransacrtionParams, ...carSaleProductParams]);

    db.exec("COMMIT;");

    return res.status(200).json({ status: "success", car: soldCar });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const cancelCarSale = tryCatch((req, res, next) => {
  const { id } = req.params;

  const car = S.selectCarByIdStatment.get(id) as Car | undefined;

  if (!car) {
    return next(new AppError(`Voiture non trouvée.`, 404));
  }

  if (!car.buyer_id) {
    return next(new AppError("Annulation de la vente impossible. Cette voiture n'a pas encore été vendue.", 403));
  }

  const carProcuration = selectProcurationByCarIdStatment.get(id) as Procuration | undefined;
  const carPaper = selectPaperByCarIdStatment.get(id) as Paper | undefined;

  if (carProcuration) {
    deleteDocumentsByIds(`${carProcuration.id}`, deleteProcurationsByIdQuery);
  } else if (carPaper) {
    deleteDocumentsByIds(`${carPaper.id}`, deletePapersByIdQuery);
  }

  db.exec("BEGIN TRANSACTION");
  try {
    S.cancelCarSaleStatment.run(id);
    db.exec("COMMIT;");
    const car = S.selectCarByIdStatment.get(id);

    return res.status(200).json({ status: "success", car });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const updateCarsExchangeRate = tryCatch((req, res, next) => {
  const { eur_exchange_rate } = req.body;
  const { ids } = req.params;

  if (!eur_exchange_rate) {
    return next(new AppError(`Veuillez fournir le taux de change de l'euro, s'il vous plaît.`, 400));
  }

  const placeHolders: string[] = [];
  const idsList = ids.split(",");
  const params = idsList;
  idsList.forEach(() => placeHolders.push("?"));

  const cars = db.prepare(`SELECT * FROM cars WHERE id IN (${placeHolders})`).all(params) as Car[];

  cars.forEach((car) => {
    if (car.type.includes("lcl")) {
      return next(new AppError(`Impossible de mettre à jour le taux de change des voitures locales.`, 403));
    }
  });

  cars.forEach((car) => {
    const newPPDZ = car.purchase_price_eur * (eur_exchange_rate / 100);
    const parsedExpenses = JSON.parse(car.expenses) as CarExpense[];

    parsedExpenses.forEach((expense) => {
      if (expense.type === "à l'étranger") {
        expense.cost_in_dzd = expense.cost_in_eur * (eur_exchange_rate / 100);
      }
    });

    const updatedExpenseCost = parsedExpenses.reduce((total, expense) => total + expense.cost_in_dzd, 0);

    S.updateCarsExchangeRateStatment.run([
      eur_exchange_rate,
      newPPDZ,
      JSON.stringify(parsedExpenses),
      updatedExpenseCost,
      car.id,
    ]);
  });

  return res.status(200).json({ status: "success" });
});

export const deleteCarsById = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deleteCarsByIdQuery);

  return res.status(204).json({ status: "success" });
});

export const deleteAllCars = tryCatch((_req, res) => {
  S.deleteAllCarsStatment.run();

  return res.status(204).json({ status: "success" });
});
