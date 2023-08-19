import db from "../database";

const deleteDocumentsByIds = (ids: string, script: string, additonalParams?: any[]) => {
  const placeHolders: string[] = [];
  const idsList = ids.split(",");
  const params = idsList;

  idsList.forEach(() => placeHolders.push("?"));

  if (additonalParams) {
    params.unshift(...additonalParams);
  }

  const deleteDocumentQuery = `${script} (${placeHolders})`;

  db.prepare(deleteDocumentQuery).run(params);
};

export default deleteDocumentsByIds;
