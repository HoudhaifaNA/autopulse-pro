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
  licences.id AS licence_id,
  licences.moudjahid AS moudjahid,
  clients.full_name AS seller,
  buyers.full_name AS buyer,
  buyers.id AS buyer_id,
  cars.id AS car_id,
  cars.name AS car,
  cars.serial_number AS car_serial_number
  FROM procurations
  INNER JOIN cars ON cars.id = procurations.car_id
  INNER JOIN clients ON clients.id = procurations.seller_id
  INNER JOIN licences ON licences.id = cars.owner_id
  LEFT JOIN clients AS buyers ON buyers.id = cars.buyer_id
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
  "purchased_at",
  "car_id",
  "seller_id",
  "procurator",
  "notary",
  "price",
  "note",
  "issue_date",
]);

export const insertProcurationStatment = db.prepare(`
  INSERT INTO procurations
  ${INSERTED_FIELDS}
  `);

export const updateProcurationStatment = db.prepare(`
  UPDATE procurations
  SET ${setOptionalUpdate("purchased_at")},
    ${setOptionalUpdate("car_id")},
    ${setOptionalUpdate("seller_id")},
    ${setOptionalUpdate("procurator")},
    ${setOptionalUpdate("notary")},
    ${setOptionalUpdate("price")},
    ${setOptionalUpdate("note")},
    ${setOptionalUpdate("issue_date")},
    updated_at = CURRENT_TIMESTAMP
  WHERE id = ? 
  `);

export const updateProcurationDeliveryStatment = db.prepare(`
  UPDATE procurations
  SET ${setOptionalUpdate("recipient")},
      ${setOptionalUpdate("received_at")},
      is_expense = ?,
      deal_id = ?,
      ${setOptionalUpdate("note")},
      updated_at = CURRENT_TIMESTAMP
  WHERE id = ? 
  `);

export const cancelProcurationDeliveryStatment = db.prepare(`
  UPDATE procurations
  SET recipient = null,
      received_at = null,
      is_expense = 0,
      deal_id = null,
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
    WHERE id = OLD.deal_id AND OLD.is_expense = 1;

    DELETE FROM transactions
    WHERE type = 'procuration' AND product_id = OLD.id;
  END;
  `);

const toggleCarProcurationOnInsert = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS toggle_car_procuration_on_insert
  AFTER INSERT ON procurations
  FOR EACH ROW
  BEGIN
    UPDATE cars
    SET procuration_received = NEW.has_received,
    has_procuration = 1
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
    SET procuration_received = null,
    has_procuration = 0
    WHERE cars.id = OLD.car_id ;
  END;
  `);

deleteProcurationsRelatedRecords.run();
toggleCarProcurationOnInsert.run();
toggleCarProcurationOnUpdate.run();
toggleCarProcurationOnDelete.run();
