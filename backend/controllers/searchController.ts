import db from "../database";
import { CAR_SELECT_STMT } from "../statments/carsStatments";
import { SELECT_BASE_QUERY } from "../statments/licenceStatments";
import { PROCURATION_SELECT_STMT } from "../statments/procurationStatments";
import tryCatch from "../utils/tryCatch";

const serachClients = db.prepare(`SELECT * FROM clients 
 WHERE fullName LIKE ? OR fullName LIKE ? 
`);

const serachCars = db.prepare(`
  ${CAR_SELECT_STMT}
 WHERE cars.name LIKE ? OR cars.serialNumber LIKE ? OR cars.registrationNumber LIKE ? 
`);

const serachLicences = db.prepare(`
${SELECT_BASE_QUERY}
 WHERE licences.moudjahid LIKE ? OR licences.moudjahid LIKE ?
`);
const serachProcurations = db.prepare(`
${PROCURATION_SELECT_STMT}
 WHERE moudjahid LIKE ? OR moudjahid LIKE ?
`);

const searchController = tryCatch((req, res) => {
  const { query, table } = req.query;

  let data = [];

  if (table === "clients") data = serachClients.all([`${query}%`, `% ${query}%`]);
  if (table === "cars") data = serachCars.all([`${query}%`, `${query}%`, `${query}%`]);
  if (table === "licences") data = serachLicences.all([`${query}%`, `% ${query}%`]);

  res.status(200).json({
    status: "success",
    data,
  });
});

export default searchController;
