const generateInsertedFields = (fields: string[]) => {
  let columns = "";
  let placeholders = "VALUES";

  fields.forEach((field, i) => {
    const isFirstField = i === 0;
    const isLastField = i === fields.length - 1;

    if (isFirstField) {
      columns += `(${field}, `;
      placeholders += `(@${field}, `;
    } else if (isLastField) {
      columns += `${field})`;
      placeholders += `@${field})`;
    } else {
      columns += `${field}, `;
      placeholders += `@${field}, `;
    }
  });

  return `${columns} \n ${placeholders}`;
};

export default generateInsertedFields;
