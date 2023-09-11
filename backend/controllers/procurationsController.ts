import db from "../database";
import * as S from "../statments/procurationsStatments";
import { selectCarByIdStatment } from "../statments/carsStatments";
import { deleteExpensesByIdQuery, insertExpenseStatment, updateExpenseStatment } from "../statments/expensesStatments";
import {
  deleteTransactionsByProductIdQuery,
  insertTransactionStatment,
  updateTransactionByProductIdStatment,
} from "../statments/transactionsStatments";
import tryCatch from "../utils/tryCatch";
import { selectLicenceByIdStatment } from "../statments/licencesStatments";
import AppError from "../utils/AppError";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";
import { Car, Licence, Procuration } from "../../interfaces";

interface ITotalCount {
  total_count: number;
}

export const getAllProcurations = tryCatch((req, res) => {
  const { has_received, is_expirated, type, orderBy = "-purchased_at", page = 1, limit = 10 } = req.query;

  const ranges = ["purchased_at", "issue_date", "received_at", "price"];
  const skip = (Number(page) - 1) * Number(limit);

  const filterQueries = generateRangeFilters(ranges, req.query, "procurations");

  if (has_received) {
    const hasReceivedValue = has_received === "true" ? 1 : 0;
    const hasReceivedFilter = `procurations.has_received = ${hasReceivedValue}`;
    filterQueries.push(hasReceivedFilter);
  }

  if (type) {
    const typeFilter = `procurations.type = '${type}'`;
    filterQueries.push(typeFilter);
  }

  if (is_expirated) {
    const isExpiratedValue = is_expirated === "true" ? 1 : 0;
    const isExpiratedFilter = `is_expirated = ${isExpiratedValue}`;
    filterQueries.push(isExpiratedFilter);
  }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  const selectProcurationsQuery = `
    ${S.selectProcurationsQuery}
    ${filterClause}
    ${orderByQuery}
    LIMIT ? OFFSET ?
  `;

  const selectProcurationsCountQuery = `
    SELECT
    ${S.IS_PROCURATION_EXPIRATED},
    COUNT(*) AS total_count
    FROM procurations
    ${filterClause}
   `;

  const procurations = db.prepare(selectProcurationsQuery).all([limit, skip]);
  const { total_count } = db.prepare(selectProcurationsCountQuery).get() as ITotalCount;

  return res.status(200).json({
    status: "success",
    results: total_count,
    records_in_page: procurations.length,
    procurations,
  });
});

export const getProcurationById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const procuration = S.selectProcurationByIdStatment.get(id);
  if (!procuration) {
    return next(new AppError("Procuration non trouvée.", 404));
  }

  return res.status(200).json({ status: "success", procuration });
});

export const createProcuration = tryCatch((req, res, next) => {
  const { type, purchased_at, notary, licence_id, price, issue_date, received_at } = req.body;
  const licence = selectLicenceByIdStatment.get(licence_id) as Licence | undefined;
  let deal_id = null;

  if (!licence || !licence.car_id) {
    return next(new AppError("La licence est invalide. Veuillez vérifier les informations fournies.", 400));
  }

  const { car_id, seller_id } = licence;

  const car = selectCarByIdStatment.get(car_id) as Car;

  const { buyer_id, has_procuration } = car;

  if (!buyer_id || !has_procuration) {
    return next(
      new AppError(
        "Impossible d'ajouter une procuration pour cette voiture. La voiture n'a pas encore été vendue ou la procuration n'est pas activée.",
        400
      )
    );
  }

  db.exec("BEGIN TRANSACTION");
  try {
    if (type === "expense") {
      const expenseParams = {
        expense_date: purchased_at,
        raison: `Procuration de ${car.name} (${car.serial_number})`,
        cost: price,
      };

      const { lastInsertRowid } = insertExpenseStatment.run(expenseParams);
      deal_id = lastInsertRowid;
    }

    const params = {
      type,
      purchased_at,
      licence_id,
      car_id,
      notary,
      price,
      deal_id,
      issue_date,
      received_at,
    };

    const { lastInsertRowid } = S.insertProcurationStatment.run(params);

    if (type === "transaction") {
      const transactionParams = {
        client_id: seller_id,
        transaction_date: purchased_at,
        type: "procuration",
        product_id: lastInsertRowid,
        info1: "Procuration",
        info2: car.name,
        info3: car.serial_number,
        info4: licence.moudjahid,
        direction: "entrante",
        currency: "DZD",
        amount: price,
      };

      insertTransactionStatment.run(transactionParams);
    }

    const newProcuration = S.selectProcurationByIdStatment.get(lastInsertRowid);
    db.exec("COMMIT;");

    return res.status(201).json({ status: "success", procuration: newProcuration });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const updateProcuration = tryCatch((req, res, next) => {
  const { type, purchased_at, price, notary, issue_date, received_at } = req.body;
  const { id } = req.params;
  let deal_id = null;

  const procuration = S.selectProcurationByIdStatment.get(id) as Procuration | undefined;

  if (!procuration) {
    return next(new AppError("Procuration non trouvée.", 404));
  }

  deal_id = procuration.deal_id;

  const car = selectCarByIdStatment.get(procuration.car_id) as Car;

  db.exec("BEGIN TRANSACTION");
  try {
    if (type && type !== procuration.type) {
      if (type === "expense") {
        deleteDocumentsByIds(id, deleteTransactionsByProductIdQuery, ["procuration", "entrante"]);

        const expenseParams = {
          expense_date: purchased_at ?? procuration.purchased_at,
          raison: `Procuration de ${car.name} (${car.serial_number})`,
          cost: price ?? procuration.price,
        };

        const { lastInsertRowid } = insertExpenseStatment.run(expenseParams);
        deal_id = lastInsertRowid;
      } else if (type === "transaction") {
        S.resetProcurationDealIdStatment.run(id);
        deleteDocumentsByIds(`${procuration.deal_id}`, deleteExpensesByIdQuery);
        deal_id = null;

        const transactionParams = {
          client_id: procuration.seller_id,
          transaction_date: purchased_at ?? procuration.purchased_at,
          type: "procuration",
          product_id: id,
          info1: "Procuration",
          info2: car.name,
          info3: car.serial_number,
          info4: procuration.moudjahid,
          direction: "entrante",
          currency: "DZD",
          amount: price ?? procuration.price,
        };

        insertTransactionStatment.run(transactionParams);
      }
    } else {
      if (procuration.type === "expense") {
        const expenseParams = [purchased_at, null, price, procuration.deal_id];

        updateExpenseStatment.run(expenseParams);
      } else if (procuration.type === "transaction") {
        const transactionParams = [
          procuration.seller_id,
          purchased_at,
          "Procuration",
          car.name,
          car.serial_number,
          procuration.moudjahid,
          "entrante",
          "DZD",
          price,
        ];

        const productParams = ["procuration", id, "entrante"];

        updateTransactionByProductIdStatment.run([...transactionParams, ...productParams]);
      }
    }

    const params = [type, purchased_at, price, notary, deal_id, issue_date, received_at, id];

    S.updateProcurationStatment.run(params);
    const updatedProcuration = S.selectProcurationByIdStatment.get(id);
    db.exec("COMMIT;");

    res.status(200).json({ status: "success", procuration: updatedProcuration });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const deleteProcurationsById = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deleteProcurationsByIdQuery);

  return res.status(204).json({ status: "success" });
});

export const deleteAllProcurations = tryCatch((_req, res) => {
  S.deleteAllProcurationsStatment.run();

  return res.status(204).json({ status: "success" });
});
