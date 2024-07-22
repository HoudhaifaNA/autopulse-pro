import { AddModalPayload, CategoryCars } from "types";

const retreiveCategoryActions = (category: CategoryCars) => {
  const { id, name } = category;

  const UPDATE: AddModalPayload = {
    name: "categories",
    title: `Modifier la catégorie ${name}`,
    params: { isEdit: true, resourceId: id, document: { name } },
  };

  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `Supprimer la catégorie ${name}`,
    resource: "categories",
    idsToDelete: [id],
  };

  return { UPDATE, DELETE };
};

export default retreiveCategoryActions;
