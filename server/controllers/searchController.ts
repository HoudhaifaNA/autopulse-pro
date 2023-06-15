import db from "../database";
import { SELECT_BASE_QUERY } from "../statments/licenceStatments";
import tryCatch from "../utils/tryCatch";

const serachClients = db.prepare(`SELECT * FROM clients 
 WHERE fullName LIKE ? LIMIT 3
`);
`SELECT cars.*, 
  moudjahid,
  licences.price AS licencePrice,
  clients.fullName AS seller,
  CASE WHEN cars.buyerId IS NULL THEN NULL ELSE buyers.fullName END AS buyer,
  datetime(cars.created_at,'localtime') AS created_at, 
  datetime(cars.updated_at,'localtime') AS updated_at
  FROM cars
  INNER JOIN licences ON licences.id = licenceId
  INNER JOIN clients ON clients.id = cars.sellerId
  LEFT JOIN clients AS buyers ON buyers.id = cars.buyerId`;
const serachCars = db.prepare(`
SELECT cars.*, 
  moudjahid,
  licences.price AS licencePrice,
  clients.fullName AS seller,
  CASE WHEN cars.buyerId IS NULL THEN NULL ELSE buyers.fullName END AS buyer,
  datetime(cars.created_at,'localtime') AS created_at, 
  datetime(cars.updated_at,'localtime') AS updated_at
  FROM cars
  INNER JOIN licences ON licences.id = licenceId
  INNER JOIN clients ON clients.id = cars.sellerId
  LEFT JOIN clients AS buyers ON buyers.id = cars.buyerId
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
