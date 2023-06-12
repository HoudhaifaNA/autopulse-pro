import db from "../database";
import tryCatch from "../utils/tryCatch";

const serachClients = db.prepare(`SELECT id,fullName FROM clients 
 WHERE fullName LIKE ? LIMIT 3
`);

const serachCars = db.prepare(`SELECT id, name, serialNumber FROM cars 
 WHERE name LIKE ? OR serialNumber LIKE ? LIMIT 3
`);

const serachLicences = db.prepare(`SELECT id, moudjahid FROM licences
 WHERE moudjahid LIKE ? LIMIT 3
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
