import db from "../database";
import { CAR_SELECT_STMT } from "../statments/carStatments";
import { SELECT_BASE_QUERY } from "../statments/licenceStatments";
import tryCatch from "../utils/tryCatch";

const serachClients = db.prepare(`SELECT * FROM clients 
 WHERE fullName LIKE ? LIMIT 3
`);

const serachCars = db.prepare(`
  ${CAR_SELECT_STMT}
 WHERE cars.name LIKE ? OR cars.serialNumber LIKE ? LIMIT 3
`);

const serachLicences = db.prepare(`
${SELECT_BASE_QUERY}
 WHERE licences.moudjahid LIKE ? LIMIT 3
`);

const searchController = tryCatch((req, res) => {
  const { query } = req.query;

  const clients = serachClients.all(`${query}%`);
  const cars = serachCars.all(`${query}%`, `${query}%`);
  const licences = serachLicences.all(`${query}%`);

  res.status(200).json({
    status: "success",
    data: {
      clients,
      cars,
      licences,
    },
  });
});

export default searchController;
