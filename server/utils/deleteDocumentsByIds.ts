import db from "../database";

const deleteDocumentsByIds = (
  ids: string,
  script: string,
  additonalParams?: any[]
) => {
  const idsArr = ids.split(",");
  const placeHolders = ids.replace(/\d+/g, "?");
  const params = additonalParams ? [...additonalParams, ...idsArr] : idsArr;

  db.prepare(`${script} (${placeHolders})`).run(params);
};

export default deleteDocumentsByIds;
