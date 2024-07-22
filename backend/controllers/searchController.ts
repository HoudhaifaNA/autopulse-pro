import * as S from "../statments/searchStatments";
import tryCatch from "../utils/tryCatch";
import { Car, Client, Licence, Paper, Procuration } from "../../interfaces";

type SearchResults = Client[] | Licence[] | Car[] | Procuration[] | Paper[];

const searchController = tryCatch((req, res) => {
  const { category } = req.params;
  const { query } = req.query;

  let searchResults: SearchResults = [];
  const params = { query: `%${query}%` };

  if (category === "clients") {
    searchResults = S.searchClientsQuery.all(params) as Client[];
  }

  if (category === "cars") {
    searchResults = S.searchCarsQuery.all(params) as Car[];
  }

  if (category === "licences") {
    searchResults = S.searchLicencesQuery.all(params) as Licence[];
  }

  if (category === "procurations") {
    searchResults = S.searchProcurationsQuery.all(params) as Procuration[];
  }

  if (category === "papers") {
    searchResults = S.searchPapersQuery.all(params) as Paper[];
  }

  res.status(200).json({
    status: "success",
    results: searchResults.length,
    items: searchResults,
  });
});

export default searchController;
