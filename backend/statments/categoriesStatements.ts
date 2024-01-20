import db from "../database";
import { setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXISTS categories").run();

export const selectCategoriesStatment = db.prepare(`
  SELECT * FROM categories
  `);

export const selectCategoryByIdStatment = db.prepare(`
  SELECT * FROM categories
  WHERE id = ?
  `);

export const selectCateogryCars = db.prepare(`
  SELECT categories.id,
  categories.name,
  COALESCE(COUNT(cars.id), 0) AS total_cars
  FROM categories
  LEFT JOIN cars ON cars.type = categories.name
  GROUP BY categories.name
  `);

export const insertCategoryStatment = db.prepare(`
  INSERT INTO categories
  (name)
  VALUES(@name)
  `);

export const updateCategoryStatment = db.prepare(`
  UPDATE categories
  SET ${setOptionalUpdate("name")},
      updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
  `);

export const deleteCategoriesByIdsStatment = `DELETE FROM categories WHERE id IN `;

export const deleteAllCategoriesStatment = db.prepare(`DELETE FROM categories`);
