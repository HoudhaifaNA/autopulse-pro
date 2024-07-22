import * as S from "../statments/categoriesStatements";

import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";
import { Category } from "../../interfaces";

export const getAllCatogories = tryCatch((req, res, next) => {
  const categories = S.selectCategoriesStatment.all() as Category[];

  return res.status(200).json({ status: "success", categories });
});
export const getCatogorieById = tryCatch((req, res) => {
  const { id } = req.params;
  const category = S.selectCategoryByIdStatment.get(id) as Category;

  return res.status(200).json({ status: "success", category });
});

export const getCatogoryCars = tryCatch((req, res) => {
  const categories = S.selectCateogryCars.all();

  return res.status(200).json({ status: "success", categories });
});

export const createCatogory = tryCatch((req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Veuillez fournir un nom de catégorie.", 400));
  }

  const params = { name };

  const { lastInsertRowid } = S.insertCategoryStatment.run(params);

  const newCategory = S.selectCategoryByIdStatment.get(lastInsertRowid) as Category;

  return res.status(201).json({ status: "success", category: newCategory });
});

export const updateCategory = tryCatch((req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  S.updateCategoryStatment.run([name, id]);
  const category = S.selectCategoryByIdStatment.get(id) as Category;

  return res.status(200).json({ status: "success", category });
});

export const deleteCategoriesById = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deleteCategoriesByIdsStatment);

  return res.status(204).json({ status: "success" });
});

export const deleteAllCategories = tryCatch((_req, res) => {
  S.deleteAllCategoriesStatment.run();

  return res.status(204).json({ status: "success" });
});
