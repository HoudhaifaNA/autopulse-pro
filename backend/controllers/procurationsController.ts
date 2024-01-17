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
  const { has_received, is_expirated, type, orderBy = "-purchased_at", page = 1, limit = 250 } = req.query;

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
  const { purchased_at, car_id, seller_id, notary, procurator, price, note, issue_date } = req.body;

  const car = selectCarByIdStatment.get(car_id) as Car | undefined;

  if (!car) {
    return next(new AppError(`Voiture non trouvée.`, 404));
  }

  const { buyer_id, buyer, has_procuration, owner_id } = car;

  if (!buyer_id || !has_procuration || !owner_id) {
    return next(
      new AppError(
        "Impossible d'ajouter une procuration pour cette voiture. La voiture n'a pas encore été vendue ou la procuration n'est pas activée ou licence est invalide.",
        400
      )
    );
  }

  const licence = selectLicenceByIdStatment.get(owner_id) as Licence;

  db.exec("BEGIN TRANSACTION");
  try {
    const params = {
      purchased_at,
      car_id,
      seller_id,
      procurator,
      notary,
      price,
      note,
      issue_date,
    };

    const { lastInsertRowid } = S.insertProcurationStatment.run(params);

    const sellerTransactionParams = {
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
      recipient: "company",
      note,
    };
    const buyerTransactionParams = {
      client_id: buyer_id,
      transaction_date: purchased_at,
      type: "procuration",
      product_id: lastInsertRowid,
      info1: "Procuration",
      info2: car.name,
      info3: car.serial_number,
      info4: licence.moudjahid,
      direction: "sortante",
      currency: "DZD",
      amount: -price,
      recipient: buyer,
      note,
    };

    insertTransactionStatment.run(sellerTransactionParams);
    insertTransactionStatment.run(buyerTransactionParams);

    const newProcuration = S.selectProcurationByIdStatment.get(lastInsertRowid);
    db.exec("COMMIT;");

    return res.status(201).json({ status: "success", procuration: newProcuration });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const updateProcuration = tryCatch((req, res, next) => {
  const { purchased_at, car_id, seller_id, notary, procurator, price, note, issue_date } = req.body;
  const { id } = req.params;

  const procuration = S.selectProcurationByIdStatment.get(id) as Procuration | undefined;

  if (!procuration) {
    return next(new AppError("Procuration non trouvée.", 404));
  }

  const car = selectCarByIdStatment.get(car_id) as Car | undefined;

  if (!car) {
    return next(new AppError(`Voiture non trouvée.`, 404));
  }

  const { buyer_id, buyer, has_procuration, owner_id } = car;

  if (!buyer_id || !has_procuration || !owner_id) {
    return next(
      new AppError(
        "Impossible d'ajouter une procuration pour cette voiture. La voiture n'a pas encore été vendue ou la procuration n'est pas activée ou licence est invalide.",
        400
      )
    );
  }

  const licence = selectLicenceByIdStatment.get(owner_id) as Licence;

  db.exec("BEGIN TRANSACTION");
  try {
    const sellerTransactionParams = [
      seller_id,
      purchased_at,
      "Procuration",
      car.name,
      car.serial_number,
      licence.moudjahid,
      "entrante",
      "DZD",
      price,
      "company",
      note,
    ];

    const productParams = ["procuration", id, "entrante"];

    updateTransactionByProductIdStatment.run([...sellerTransactionParams, ...productParams]);

    if (procuration.is_expense) {
      const expenseParams = [
        purchased_at,
        `Procuration de ${car.name} (${car.serial_number})`,
        price,
        note,
        procuration.deal_id,
      ];

      updateExpenseStatment.run(expenseParams);
    } else {
      const buyerTransactionParams = [
        buyer_id,
        purchased_at,
        "Procuration",
        car.name,
        car.serial_number,
        licence.moudjahid,
        "sortante",
        "DZD",
        -price,
        buyer,
        note,
      ];

      const productParams = ["procuration", id, "sortante"];

      updateTransactionByProductIdStatment.run([...buyerTransactionParams, ...productParams]);
    }

    const params = [purchased_at, car_id, seller_id, procurator, notary, price, note, issue_date, id];

    S.updateProcurationStatment.run(params);
    const updatedProcuration = S.selectProcurationByIdStatment.get(id);
    db.exec("COMMIT;");

    res.status(200).json({ status: "success", procuration: updatedProcuration });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const deliverProcuration = tryCatch((req, res, next) => {
  const { recipient, received_at, is_expense } = req.body;
  const { id } = req.params;

  const procuration = S.selectProcurationByIdStatment.get(id) as Procuration | undefined;

  if (!procuration) {
    return next(new AppError("Procuration non trouvée.", 404));
  }

  let { purchased_at, car, car_serial_number, moudjahid, price, buyer_id, buyer, deal_id } = procuration;
  let note = req.body.note || procuration.note;

  db.exec("BEGIN TRANSACTION");
  try {
    if (is_expense !== procuration.is_expense) {
      if (is_expense) {
        deleteDocumentsByIds(id, deleteTransactionsByProductIdQuery, ["procuration", "sortante"]);
        const expenseParams = {
          expense_date: purchased_at,
          raison: `Procuration de ${car} (${car_serial_number})`,
          cost: price,
          note,
        };

        const { lastInsertRowid } = insertExpenseStatment.run(expenseParams);

        deal_id = lastInsertRowid as number;
      } else {
        S.resetProcurationDealIdStatment.run(id);
        deleteDocumentsByIds(`${deal_id}`, deleteExpensesByIdQuery);
        deal_id = null;

        const buyerTransactionParams = {
          client_id: buyer_id,
          transaction_date: purchased_at,
          type: "procuration",
          product_id: id,
          info1: "Procuration",
          info2: car,
          info3: car_serial_number,
          info4: moudjahid,
          direction: "sortante",
          currency: "DZD",
          amount: -price,
          recipient: buyer,
          note,
        };

        insertTransactionStatment.run(buyerTransactionParams);
      }
    }

    const params = [recipient, received_at, is_expense, deal_id, note, id];

    S.updateProcurationDeliveryStatment.run(params);

    const updatedProcuration = S.selectProcurationByIdStatment.get(id);
    db.exec("COMMIT;");

    res.status(200).json({ status: "success", procuration: updatedProcuration });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const cancelProcurationDelivery = tryCatch((req, res, next) => {
  const { id } = req.params;

  const procuration = S.selectProcurationByIdStatment.get(id) as Procuration | undefined;

  if (!procuration) {
    return next(new AppError("Procuration non trouvée.", 404));
  }

  let { purchased_at, car, car_serial_number, is_expense, note, moudjahid, price, buyer_id, buyer, deal_id } =
    procuration;

  db.exec("BEGIN TRANSACTION");

  S.cancelProcurationDeliveryStatment.run(id);

  try {
    if (is_expense) {
      deleteDocumentsByIds(`${deal_id}`, deleteExpensesByIdQuery);

      const buyerTransactionParams = {
        client_id: buyer_id,
        transaction_date: purchased_at,
        type: "procuration",
        product_id: id,
        info1: "Procuration",
        info2: car,
        info3: car_serial_number,
        info4: moudjahid,
        direction: "sortante",
        currency: "DZD",
        amount: -price,
        recipient: buyer,
        note,
      };

      insertTransactionStatment.run(buyerTransactionParams);
    }

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
