export const checkNumber = (field: string) => {
  return `CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;
};

export const setOptionalUpdate = (field: string) => {
  return `${field} = COALESCE(?, ${field})`;
};
