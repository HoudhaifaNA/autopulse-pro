import db from "../database";
import generateDeleteTranasctionTrigger from "../utils/generateDeleteTransactionTrigger";
import generateInsertedFields from "../utils/generateInsertedFields";
import { setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXISTS licences").run();

export const IS_LICENCE_VALID = `
	CASE
		WHEN datetime('now') < licences.expiration_date AND licences.car_id IS NULL THEN 1
		ELSE 0
	END AS is_valid
	`;

export const IS_LICENCE_EXPIRATED = `
	CASE
		WHEN datetime('now') > licences.expiration_date THEN 1
		ELSE 0
	END AS is_expirated
	`;

export const selectLicencesListQuery = `
  SELECT 
    licences.id,
    licences.moudjahid,
    licences.serial_number,
    licences.car_id,
    ${IS_LICENCE_VALID},
    licences.price,
    cars.has_procuration,
    cars.buyer_id,
    procurations.car_id AS procuration_exist
  FROM licences
  LEFT JOIN cars ON licences.car_id = cars.id
  LEFT JOIN procurations ON licences.id = procurations.licence_id
  `;

export const selectLicencesQuery = `
  SELECT licences.*,
  ${IS_LICENCE_VALID},
  ${IS_LICENCE_EXPIRATED},
  clients.full_name AS seller,
  ( cars.name || ' (' || cars.serial_number || ')' ) AS car
  FROM licences
  INNER JOIN clients ON clients.id = licences.seller_id
  LEFT JOIN cars ON licences.car_id IS NOT NULL AND licences.car_id = cars.id
`;

export const selectLicenceByIdStatment = db.prepare(`
	${selectLicencesQuery}
  WHERE licences.id = ?
	`);

export const selectLicenceByMoudjahidStatment = db.prepare(`
	SELECT *,
	${IS_LICENCE_EXPIRATED}
	FROM licences
  WHERE moudjahid = ? AND serial_number = ?
	`);

const INSERT_FIELDS = generateInsertedFields([
  "purchased_at",
  "moudjahid",
  "seller_id",
  "wilaya",
  "serial_number",
  "price",
  "attachments",
  "issue_date",
  "note",
]);

export const insertLicenceStatment = db.prepare(`
	INSERT INTO licences
	${INSERT_FIELDS}
	`);

export const updateLicenceStatment = db.prepare(`
  UPDATE licences
  SET ${setOptionalUpdate("purchased_at")},
 		${setOptionalUpdate("moudjahid")},
 		${setOptionalUpdate("seller_id")},
 		${setOptionalUpdate("wilaya")},
 		${setOptionalUpdate("serial_number")},
 		${setOptionalUpdate("price")},
 		${setOptionalUpdate("issue_date")},
 		${setOptionalUpdate("note")},
    updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
  `);

export const reserveLicenceStatment = db.prepare(`
  UPDATE licences
  SET ${setOptionalUpdate("is_reserved")},
    updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
  `);

export const deleteLicencesByIdQuery = `
	DELETE FROM licences
  WHERE id IN
	`;

export const deleteAllLicencesStatment = db.prepare(`DELETE FROM licences`);

const setCarId = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS set_car_id
  AFTER INSERT ON cars
  WHEN NEW.owner_id IS NOT NULL
  BEGIN
    UPDATE licences
    SET car_id = NEW.id
    WHERE licences.id = NEW.owner_id ;
  END;
  `);

const resetCarIdOnOwnerChange = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS reset_car_id_on_owner_change
  AFTER UPDATE OF owner_id ON cars
  FOR EACH ROW
  BEGIN
    UPDATE licences
    SET car_id = NULL
    WHERE id = OLD.owner_id;

    UPDATE licences
    SET car_id = NEW.id
    WHERE id = NEW.owner_id;
  END;
  `);

const updateCarInfo = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS update_car_info
  AFTER UPDATE ON licences
  FOR EACH ROW
  WHEN NEW.car_id IS NOT NULL
  BEGIN
    UPDATE cars
    SET owner_name = NEW.moudjahid,
    licence_price = NEW.price
    WHERE id = NEW.car_id;
  END;
  `);

const preventDeleteLicencedCar = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS prevent_delete_licensed_car
  BEFORE DELETE ON licences
  FOR EACH ROW
  WHEN OLD.car_id IS NOT NULL
  BEGIN
    SELECT RAISE(ABORT, "Impossible de supprimer une licence associée à une voiture.");
  END;
  `);

const deleteLicencesTransactions = db.prepare(`
  ${generateDeleteTranasctionTrigger("licences", "entrante", "licence")}
  `);

setCarId.run();
resetCarIdOnOwnerChange.run();
updateCarInfo.run();
preventDeleteLicencedCar.run();
deleteLicencesTransactions.run();
