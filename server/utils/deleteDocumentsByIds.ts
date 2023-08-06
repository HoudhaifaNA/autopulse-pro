import db from "../database";

const deleteDocumentsByIds = (
  ids: string,
  script: string,
  additonalParams?: any[]
) => {
  const idsArr = ids.split(",");
  let placeHolders = [];
  for (let i = 0; i < idsArr.length; i++) {
    placeHolders.push("?");
  }
  const params = additonalParams ? [...additonalParams, ...idsArr] : idsArr;

  db.prepare(`${script} (${placeHolders})`).run(params);
};

export default deleteDocumentsByIds;
