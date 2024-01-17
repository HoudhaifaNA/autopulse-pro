import db from "../database";
import generateInsertedFields from "../utils/generateInsertedFields";
import { setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXISTS papers").run();

export const selectPapersQuery = `
  SELECT papers.*,
  clients.full_name AS seller,
  ( cars.name || ' (' || cars.registration_number || ')' ) AS car
  FROM papers
  INNER JOIN clients ON clients.id = papers.seller_id
  INNER JOIN cars ON cars.id = papers.car_id
  `;

export const selectPaperByIdStatment = db.prepare(`
  ${selectPapersQuery}
  WHERE papers.id = ?
  `);

export const selectPaperByCarIdStatment = db.prepare(`
  ${selectPapersQuery}
  WHERE papers.car_id = ?
  `);

const INSERTED_FIELDS = generateInsertedFields([
  "type",
  "given_at",
  "purchased_at",
  "seller_id",
  "car_id",
  "owner",
  "price",
  "note",
]);

export const insertPaperStatment = db.prepare(`
  INSERT INTO papers
  ${INSERTED_FIELDS}
  `);

export const updatePaperStatment = db.prepare(`
  UPDATE papers
  SET ${setOptionalUpdate("type")},
    ${setOptionalUpdate("given_at")},
    ${setOptionalUpdate("purchased_at")},
    ${setOptionalUpdate("seller_id")},
    ${setOptionalUpdate("car_id")},
    ${setOptionalUpdate("owner")},
    ${setOptionalUpdate("note")},
    ${setOptionalUpdate("price")},
    updated_at = CURRENT_TIMESTAMP
  WHERE id = ? 
  `);

export const updatePaperDeliveryStatment = db.prepare(`
  UPDATE papers
  SET ${setOptionalUpdate("recipient")},
      ${setOptionalUpdate("received_at")},
      ${setOptionalUpdate("note")},
      updated_at = CURRENT_TIMESTAMP
  WHERE id = ? 
  `);

export const cancelPaperDeliveryStatment = db.prepare(`
  UPDATE papers
  SET recipient = null,
      received_at = null,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = ? 
  `);

export const deletePapersByIdQuery = `DELETE FROM papers WHERE id IN `;

export const deletePapersStatment = db.prepare(`DELETE FROM papers`);

const deletePapersRelatedRecords = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS delete_papers_related_records
  AFTER DELETE ON papers
  FOR EACH ROW
  BEGIN
    DELETE FROM transactions
    WHERE type = 'paper' AND product_id = OLD.id;
  END;
  `);

const toggleCarGrayCardOnInsert = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS toggle_car_gray_card_on_insert
  AFTER INSERT ON papers
  FOR EACH ROW
  BEGIN
    UPDATE cars
    SET gray_card_received = NEW.has_received
    WHERE cars.id = NEW.car_id ;
  END;
  `);

const toggleCarGrayCardOnUpdate = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS toggle_car_gray_card_on_update
  AFTER UPDATE ON papers
  FOR EACH ROW
  BEGIN
    UPDATE cars
    SET gray_card_received = NEW.has_received
    WHERE cars.id = NEW.car_id ;
  END;
  `);

const toggleCarGrayCardonOnDelete = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS toggle_car_gray_card_on_delete
  AFTER DELETE ON papers
  FOR EACH ROW
  BEGIN
    UPDATE cars
    SET gray_card_received = null
    WHERE cars.id = OLD.car_id ;
  END;
  `);

deletePapersRelatedRecords.run();
toggleCarGrayCardOnInsert.run();
toggleCarGrayCardOnUpdate.run();
toggleCarGrayCardonOnDelete.run();
