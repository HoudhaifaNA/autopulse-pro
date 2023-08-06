import useSWR from "swr";

import EmptyState from "components/EmptyState/EmptyState";
import StockTable from "components/Tables/StockTable";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Meta from "components/Meta/Meta";

import { fetcher } from "utils/API";

const StockPage = () => {
  const { data, isLoading, error } = useSWR("/stock", fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;
    if (error) {
      return <ErrorMessage>{error.response.data.message}</ErrorMessage>;
    }
    if (data && data.results === 0) {
      return (
        <EmptyState
          title="Vous n'avez pas de voitures"
          description="Ajoutez des voitures pour les voir ici"
          image="stock"
          CTAText="Ajouter un voiture"
          CTAIcon="add"
          modal="cars"
        />
      );
    } else {
      return <StockTable stock={data.carStock} />;
    }
  };
  return (
    <>
      <Meta title="Stock" />
      {renderPage()}
    </>
  );
};

export default StockPage;
