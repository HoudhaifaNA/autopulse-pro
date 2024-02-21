import db from "../database";
import * as S from "../statments/papersStatments";
import { selectCarByIdStatment, selectCarsQuery, updateCarExpenses } from "../statments/carsStatments";
import { insertTransactionStatment, updateTransactionByProductIdStatment } from "../statments/transactionsStatments";
import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";
import { Car, CarExpense, Paper } from "../../interfaces";
import uid from "../../renderer/utils/uniqid";

interface ITotalCount {
  total_count: number;
}

const calculateTotalExpenseCost = (expenses: CarExpense[]): number => {
  return expenses.reduce((total, expense) => total + expense.cost_in_dzd, 0);
};

const updateCarPaperExpenses = (car: Car, paperPrice: number, toDelete: boolean) => {
  const { id } = car;
  const RAISON = "Dossier / Cart grise";
  let expenses = JSON.parse(car.expenses) as CarExpense[];
  let doesExpenseExist = expenses.findIndex((exp) => exp.raison === RAISON);

  if (toDelete) {
    expenses = expenses.filter((exp) => exp.raison !== RAISON);
  } else {
    if (doesExpenseExist !== -1) {
      expenses = expenses.map((exp) => {
        if (exp.raison === RAISON) {
          return { ...exp, cost_in_dzd: paperPrice };
        }
        return exp;
      });
    } else {
      expenses = [...expenses, { id: uid(), raison: RAISON, type: "locale", cost_in_eur: 0, cost_in_dzd: paperPrice }];
    }
  }

  const expense_cost = calculateTotalExpenseCost(expenses);
  updateCarExpenses.run([JSON.stringify(expenses), expense_cost, id]);
};

export const getAllPapers = tryCatch((req, res) => {
  const { has_received, type, orderBy = "-purchased_at", page = 1, limit = 250 } = req.query;

  const ranges = ["purchased_at", "given_at", "received_at", "price"];
  const skip = (Number(page) - 1) * Number(limit);

  const filterQueries = generateRangeFilters(ranges, req.query, "papers");

  if (has_received) {
    const hasReceivedValue = has_received === "true" ? 1 : 0;
    const hasReceivedFilter = `papers.has_received = ${hasReceivedValue}`;
    filterQueries.push(hasReceivedFilter);
  }

  if (type) {
    const typeFilter = `papers.type = '${type}'`;
    filterQueries.push(typeFilter);
  }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  const selectPapersQuery = `
    ${S.selectPapersQuery}
    ${filterClause}
    ${orderByQuery}
    LIMIT ? OFFSET ?
  `;

  const selectPapersCountQuery = `
    SELECT
    COUNT(*) AS total_count
    FROM papers
    ${filterClause}
   `;

  const papers = db.prepare(selectPapersQuery).all([limit, skip]);
  const { total_count } = db.prepare(selectPapersCountQuery).get() as ITotalCount;

  return res.status(200).json({
    status: "success",
    results: total_count,
    records_in_page: papers.length,
    papers,
  });
});

export const getPaperById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const paper = S.selectPaperByIdStatment.get(id);
  if (!paper) {
    return next(new AppError("Dossier non trouvé.", 404));
  }

  return res.status(200).json({ status: "success", paper });
});

export const createPaper = tryCatch((req, res, next) => {
  const { type, given_at, purchased_at, seller_id, car_id, owner, note, price } = req.body;

  const car = selectCarByIdStatment.get(car_id) as Car | undefined;

  if (!car) {
    return next(new AppError(`Voiture non trouvée.`, 404));
  }

  db.exec("BEGIN TRANSACTION");
  try {
    const params = {
      type,
      given_at,
      purchased_at,
      seller_id,
      car_id,
      owner,
      note,
      price,
    };

    const { lastInsertRowid } = S.insertPaperStatment.run(params);

    if (purchased_at) {
      const sellerTransactionParams = {
        client_id: seller_id,
        transaction_date: purchased_at,
        type: "paper",
        product_id: lastInsertRowid,
        info1: "Cart grise",
        info2: car.name,
        info3: car.serial_number,
        info4: owner,
        direction: "entrante",
        currency: "DZD",
        amount: price,
        recipient: "company",
        note,
      };

      insertTransactionStatment.run(sellerTransactionParams);
    }

    const newPaper = S.selectPaperByIdStatment.get(lastInsertRowid);
    updateCarPaperExpenses(car, price, false);
    db.exec("COMMIT;");

    return res.status(201).json({ status: "success", paper: newPaper });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const updatePaper = tryCatch((req, res, next) => {
  const { type, given_at, purchased_at, seller_id, car_id, owner, note, price } = req.body;
  const { id } = req.params;

  const paper = S.selectPaperByIdStatment.get(id) as Paper | undefined;

  if (!paper) {
    return next(new AppError("Dossier / Cart grise non trouvée.", 404));
  }

  const car = selectCarByIdStatment.get(car_id) as Car | undefined;

  if (!car) {
    return next(new AppError(`Voiture non trouvée.`, 404));
  }

  db.exec("BEGIN TRANSACTION");
  try {
    if (purchased_at && !paper.purchased_at) {
      const sellerTransactionParams = {
        client_id: seller_id,
        transaction_date: purchased_at,
        type: "paper",
        product_id: id,
        info1: "Cart grise",
        info2: car.name,
        info3: car.serial_number,
        info4: owner,
        direction: "entrante",
        currency: "DZD",
        amount: price,
        recipient: "company",
        note,
      };

      insertTransactionStatment.run(sellerTransactionParams);
    } else if (purchased_at && paper.purchased_at) {
      const sellerTransactionParams = [
        seller_id,
        purchased_at,
        "Cart grise",
        car.name,
        car.serial_number,
        owner,
        "entrante",
        "DZD",
        price,
        "company",
        note,
      ];

      const productParams = ["paper", id, "entrante"];

      updateTransactionByProductIdStatment.run([...sellerTransactionParams, ...productParams]);
    }

    const params = [type, given_at, purchased_at, seller_id, car_id, owner, note, price, id];

    S.updatePaperStatment.run(params);
    const updatedPaper = S.selectPaperByIdStatment.get(id);
    updateCarPaperExpenses(car, price, false);
    db.exec("COMMIT;");

    res.status(200).json({ status: "success", paper: updatedPaper });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const deliverPaper = tryCatch((req, res, next) => {
  const { recipient, received_at, note } = req.body;
  const { id } = req.params;

  const paper = S.selectPaperByIdStatment.get(id) as Paper | undefined;

  if (!paper) {
    return next(new AppError("Dossier / Cart grise non trouvée.", 404));
  }

  try {
    const params = [recipient, received_at, note, id];

    S.updatePaperDeliveryStatment.run(params);

    const updatedPaper = S.selectPaperByIdStatment.get(id);

    res.status(200).json({ status: "success", paper: updatedPaper });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const cancelPaperDelivery = tryCatch((req, res, next) => {
  const { id } = req.params;

  const paper = S.selectPaperByIdStatment.get(id) as Paper | undefined;

  if (!paper) {
    return next(new AppError("Dossier / Cart grise non trouvée.", 404));
  }

  db.exec("BEGIN TRANSACTION");

  try {
    S.cancelPaperDeliveryStatment.run(id);
    const updatedPaper = S.selectPaperByIdStatment.get(id);

    db.exec("COMMIT;");

    res.status(200).json({ status: "success", paper: updatedPaper });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const deletePapersById = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deletePapersByIdQuery);

  const carsList = db
    .prepare(
      `
  ${selectCarsQuery}
  WHERE cars.id IN (${ids}) 
  `
    )
    .all() as Car[];
  carsList.forEach((car) => {
    updateCarPaperExpenses(car, 0, true);
  });

  return res.status(204).json({ status: "success" });
});

export const deleteAllPapers = tryCatch((_req, res) => {
  S.deletePapersStatment.run();

  return res.status(204).json({ status: "success" });
});
