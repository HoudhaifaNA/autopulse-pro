import db from "../database";
import * as S from "../statments/papersStatments";
import { selectCarByIdStatment } from "../statments/carsStatments";
import { deleteExpensesByIdQuery, insertExpenseStatment, updateExpenseStatment } from "../statments/expensesStatments";
import {
  deleteTransactionsByProductIdQuery,
  insertTransactionStatment,
  updateTransactionByProductIdStatment,
} from "../statments/transactionsStatments";
import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";
import { Car, Paper } from "../../interfaces";

interface ITotalCount {
  total_count: number;
}

export const getAllPapers = tryCatch((req, res) => {
  const { has_received, is_expirated, type, orderBy = "-purchased_at", page = 1, limit = 10 } = req.query;

  const ranges = ["purchased_at", "issue_date", "received_at", "price"];
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

  if (is_expirated) {
    const isExpiratedValue = is_expirated === "true" ? 1 : 0;
    const isExpiratedFilter = `is_expirated = ${isExpiratedValue}`;
    filterQueries.push(isExpiratedFilter);
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
    ${S.IS_PAPER_EXPIRATED},
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
    return next(new AppError("Dossier non trouvé. Veuillez vérifier les informations.", 404));
  }

  return res.status(200).json({ status: "success", paper });
});

export const createPaper = tryCatch((req, res, next) => {
  const { type, purchased_at, seller_id, car_id, price, issue_date, received_at } = req.body;
  let deal_id = null;

  const car = selectCarByIdStatment.get(car_id) as Car | undefined;

  if (!car) {
    return next(new AppError(`Voiture non trouvée. Veuillez vérifier les informations.`, 404));
  }

  if (!car.buyer_id || !car.has_gray_card) {
    return next(
      new AppError(
        `Impossible d'ajouter une cart grise pour cette voiture. La voiture n'a pas encore été vendue ou la carte grise n'est pas activée.`,
        400
      )
    );
  }

  db.exec("BEGIN TRANSACTION");
  try {
    if (type === "expense") {
      const expenseParams = {
        expense_date: purchased_at,
        raison: `Cart grise de ${car.name} (${car.serial_number})`,
        cost: price,
      };

      const { lastInsertRowid } = insertExpenseStatment.run(expenseParams);
      deal_id = lastInsertRowid;
    }

    const params = {
      type,
      purchased_at,
      seller_id,
      car_id,
      price,
      deal_id,
      issue_date,
      received_at,
    };

    const { lastInsertRowid } = S.insertPaperStatment.run(params);

    if (type === "transaction") {
      const transactionParams = {
        client_id: seller_id,
        transaction_date: purchased_at,
        type: "paper",
        product_id: lastInsertRowid,
        info1: "Cart grise",
        info2: car.name,
        info3: car.color,
        info4: `${car.registration_number} (${car.serial_number})`,
        direction: "entrante",
        currency: "DZD",
        amount: price,
      };

      insertTransactionStatment.run(transactionParams);
    }

    const newPaper = S.selectPaperByIdStatment.get(lastInsertRowid);
    db.exec("COMMIT;");

    return res.status(201).json({ status: "success", paper: newPaper });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const updatePaper = tryCatch((req, res, next) => {
  const { type, purchased_at, price, seller_id, issue_date, received_at } = req.body;
  const { id } = req.params;
  let deal_id = null;

  const paper = S.selectPaperByIdStatment.get(id) as Paper | undefined;

  if (!paper) {
    return next(new AppError("Dossier non trouvé. Veuillez vérifier les informations.", 404));
  }

  deal_id = paper.deal_id;

  const car = selectCarByIdStatment.get(paper.car_id) as Car;

  db.exec("BEGIN TRANSACTION");
  try {
    if (type && type !== paper.type) {
      if (type === "expense") {
        deleteDocumentsByIds(id, deleteTransactionsByProductIdQuery, ["paper", "entrante"]);

        const expenseParams = {
          expense_date: purchased_at ?? paper.purchased_at,
          raison: `Cart grise de ${car.name} (${car.serial_number})`,
          cost: price ?? paper.price,
        };

        const { lastInsertRowid } = insertExpenseStatment.run(expenseParams);
        deal_id = lastInsertRowid;
      } else if (type === "transaction") {
        S.resetPaperDealIdStatment.run(id);
        deleteDocumentsByIds(`${paper.deal_id}`, deleteExpensesByIdQuery);

        const transactionParams = {
          client_id: seller_id ?? paper.seller_id,
          transaction_date: purchased_at ?? paper.purchased_at,
          type: "paper",
          product_id: id,
          info1: "Cart grise",
          info2: car.name,
          info3: car.color,
          info4: `${car.registration_number} (${car.serial_number})`,
          direction: "entrante",
          currency: "DZD",
          amount: price ?? paper.price,
        };

        insertTransactionStatment.run(transactionParams);
      }
    } else {
      if (paper.type === "expense") {
        const expenseParams = [purchased_at, null, price ?? paper.price, paper.deal_id];

        updateExpenseStatment.run(expenseParams);
      } else if (paper.type === "transaction") {
        const transactionParams = [
          seller_id,
          purchased_at,
          "Cart grise",
          car.name,
          car.color,
          `${car.registration_number} (${car.serial_number})`,
          "entrante",
          "DZD",
          price,
        ];

        const productParams = ["paper", id, "entrante"];

        updateTransactionByProductIdStatment.run([...transactionParams, ...productParams]);
      }
    }

    const params = [type, purchased_at, seller_id, price, deal_id, issue_date, received_at, id];

    S.updatePaperStatment.run(params);
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

  return res.status(204).json({ status: "success" });
});

export const deleteAllPapers = tryCatch((_req, res) => {
  S.deletePapersStatment.run();

  return res.status(204).json({ status: "success" });
});
