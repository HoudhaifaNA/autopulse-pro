export const formatSortingQuery = (query: any) => {
  let orderBy = query;
  const isDescendingQuery = query.startsWith("-");

  if (isDescendingQuery) {
    const field = orderBy.split("-")[1];
    orderBy = `${field} DESC`;
  }

  if (query && query.length > 1) {
    return `ORDER BY ${orderBy}`;
  }

  return "";
};

export const setRangeFilter = (query: string, column: string, isHaving?: boolean) => {
  const [minNum, maxNum] = query.split("_");
  let min = isHaving ? -Number.MAX_VALUE : `${-Number.MAX_VALUE}`;
  let max = isHaving ? Number.MAX_VALUE : `${Number.MAX_VALUE * 2} `;
  if (minNum) min = minNum;
  if (maxNum) max = maxNum;

  let statment = `${column} BETWEEN '${min}' AND '${max}' `;

  if (isHaving) statment = `${column} BETWEEN ${min} AND ${max} `;

  return statment;
};

export const generateRangeFilters = (ranges: string[], query: any, table?: string) => {
  const filters: string[] = [];

  ranges.forEach((range) => {
    if (query[range] && typeof query[range] === "string") {
      const column = table ? `${table}.${range}` : range;
      const rangeFilter = setRangeFilter(query[range], column);
      filters.push(rangeFilter);
    }
  });

  return filters;
};
