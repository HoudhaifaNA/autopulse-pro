export const formatSortingQuery = (query: any) => {
  let orderBy = query ? String(query) : "created_at";
  if (orderBy.startsWith("-")) {
    const field = orderBy.split("-")[1];
    orderBy = `${field} DESC`;
  }
  return `ORDER BY ${orderBy}`;
};

export const setRangeFilter = (query: any, field: string) => {
  const [minNum, maxNum] = String(query).split("_");
  let min = `${-Number.MAX_VALUE}`;
  let max = `${Number.MAX_VALUE}`;
  if (minNum) min = minNum;
  if (maxNum) max = maxNum;

  return `${field} BETWEEN ${min} AND ${max}`;
};
