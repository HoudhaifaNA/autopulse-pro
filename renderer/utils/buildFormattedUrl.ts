interface QueryParameters {
  [key: string]: string | number | boolean;
}

const buildFormattedUrl = (baseUrl: string, queryParams: QueryParameters): string => {
  const queryParamsList = Object.entries(queryParams).map(([key, value]) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  });

  const queryParamsString = queryParamsList.join("&");

  const formattedUrl = queryParamsList.length > 0 ? `${baseUrl}?${queryParamsString}` : baseUrl;

  return formattedUrl;
};

export default buildFormattedUrl;
