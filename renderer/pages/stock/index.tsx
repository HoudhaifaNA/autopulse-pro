import useSWR from "swr";

import EmptyState from "components/EmptyState/EmptyState";
import Loading from "components/Loading/Loading";
import StockTable from "./components/StockTable";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Meta from "components/Meta/Meta";

import { fetcher } from "utils/API";
import { GetStockResponse } from "types";
import { useAppSelector } from "store";
import StockFilter from "./components/StockFilter";

const StockPage = () => {
  const url = useAppSelector((state) => state.resourceUrls.stock.fetchedUrl);
  const { data, isLoading, error } = useSWR<GetStockResponse>(url, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;
    if (error) {
      return <ErrorMessage>{error.response.data.message}</ErrorMessage>;
    }
    if (data) {
      return <StockTable stock={data} />;
    }
  };
  return (
    <>
      <Meta title="Stock" />
      <div style={{ marginBottom: "2rem" }}>
        <StockFilter />
      </div>
      {renderPage()}
    </>
  );
};

export default StockPage;
