import db from "../database";
import tryCatch from "../utils/tryCatch";

const stockController = tryCatch((req, res) => {
  const carStock = db
    .prepare(
      `SELECT name,
      count(name) AS bought_number,
      SUM(CASE WHEN buyerId IS NOT NULL THEN 1 ELSE 0 END) AS sold_number,
      COUNT(*) - SUM(CASE WHEN buyerId IS NOT NULL THEN 1 ELSE 0 END) AS in_stock
      FROM cars
      GROUP BY LOWER(TRIM(name)) ;

`
    )
    .all();

  return res.status(200).json({
    status: "success",
    carStock,
  });
});

export default stockController;
