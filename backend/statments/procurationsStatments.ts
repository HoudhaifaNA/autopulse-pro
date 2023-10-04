import db from "../database";
import generateInsertedFields from "../utils/generateInsertedFields";
import { setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXISTS procurations").run();

export const IS_PROCURATION_EXPIRATED = `
  CASE
    WHEN datetime('now') > procurations.expiration_date THEN 1
    ELSE 0
  END AS is_expirated
  `;

export const selectProcurationsQuery = `
  SELECT procurations.*,
  ${IS_PROCURATION_EXPIRATED},
  licences.moudjahid AS moudjahid,
  clients.full_name AS seller,
  clients.id AS seller_id,
  cars.name AS car,
  owners.id AS owner_id,
  owners.full_name AS owner
  FROM procurations
  INNER JOIN licences ON licences.id = procurations.licence_id
  INNER JOIN clients ON clients.id = licences.seller_id
  INNER JOIN cars ON cars.id = licences.car_id
  LEFT JOIN clients AS owners ON owners.id = cars.buyer_id
  `;

export const selectProcurationByIdStatment = db.prepare(`
  ${selectProcurationsQuery}
  WHERE procurations.id = ?
  `);

export const selectProcurationByCarIdStatment = db.prepare(`
  ${selectProcurationsQuery}
  WHERE procurations.car_id = ?
  `);

const INSERTED_FIELDS = generateInsertedFields([
  "type",
  "purchased_at",
  "licence_id",
  "car_id",
  "notary",
  "price",
  "deal_id",
  "issue_date",
  "received_at",
]);

export const insertProcurationStatment = db.prepare(`
  INSERT INTO procurations
  ${INSERTED_FIELDS}
  `);

export const updateProcurationStatment = db.prepare(`
  UPDATE procurations
  SET ${setOptionalUpdate("type")},
    ${setOptionalUpdate("purchased_at")},
    ${setOptionalUpdate("price")},
    ${setOptionalUpdate("notary")},
    deal_id = ?,
    ${setOptionalUpdate("issue_date")},
    received_at = ?,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = ? 
  `);

export const resetProcurationDealIdStatment = db.prepare(`
  UPDATE procurations
  SET deal_id = null,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = ? 
  `);

export const deleteProcurationsByIdQuery = `DELETE FROM procurations WHERE id IN `;

export const deleteAllProcurationsStatment = db.prepare(`DELETE FROM procurations`);

const deleteProcurationsRelatedRecords = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS delete_procurations_related_records
  AFTER DELETE ON procurations
  FOR EACH ROW
  BEGIN
    DELETE FROM expenses
    WHERE id = OLD.deal_id AND OLD.type = 'expense';

    DELETE FROM transactions
    WHERE type = 'procuration' AND product_id = OLD.id AND OLD.type = 'transaction';
  END;
  `);

const toggleCarProcurationOnInsert = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS toggle_car_procuration_on_insert
  AFTER INSERT ON procurations
  FOR EACH ROW
  BEGIN
    UPDATE cars
    SET procuration_received = NEW.has_received
    WHERE cars.id = NEW.car_id ;
  END;
  `);

const toggleCarProcurationOnUpdate = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS toggle_car_procuration_on_update
  AFTER UPDATE ON procurations
  FOR EACH ROW
  BEGIN
    UPDATE cars
    SET procuration_received = NEW.has_received
    WHERE cars.id = NEW.car_id ;
  END;
  `);

const toggleCarProcurationOnDelete = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS toggle_car_procuration_on_delete
  AFTER DELETE ON procurations
  FOR EACH ROW
  BEGIN
    UPDATE cars
    SET procuration_received = null
    WHERE cars.id = OLD.car_id ;
  END;
  `);

deleteProcurationsRelatedRecords.run();
toggleCarProcurationOnInsert.run();
toggleCarProcurationOnUpdate.run();
toggleCarProcurationOnDelete.run();
