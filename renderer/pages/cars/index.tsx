import { useContext } from "react";
import useSWR from "swr";

import PageHeader from "components/PageHeader/PageHeader";

import CarForm from "components/CarForm/CarForm";
import EmptyState from "components/EmptyState/EmptyState";
import Meta from "components/Meta/Meta";

import { fetcher } from "utils/API";
import CarsTable from "components/Tables/CarsTable";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import { GlobalContext } from "pages/_app";
import CarDocument from "components/CarDocument/CarDocument";

const CarsPage = () => {
  const { currModal, setModal, currDocument } = useContext(GlobalContext);
  const { data, isLoading, error } = useSWR("/cars", fetcher, {
    refreshInterval: 5,
  });

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
          image="cars"
          CTAText="Ajouter un voiture"
          CTAIcon="add"
          modal="cars"
        />
      );
    } else {
      return (
        <>
          <PageHeader
            title="Voitures"
            CTAText="Ajouter un voiture"
            CTAIcon="add"
            CTAonClick={() => setModal("cars")}
          />
          <CarsTable cars={data.cars} />
        </>
      );
    }
  };
  return (
    <>
      <Meta title="Voitures" />
      {renderPage()}
      {currModal === "cars" && <CarForm />}
      {currDocument.type === "cars" && (
        <CarDocument document={currDocument.document} />
      )}
    </>
  );
};

export default CarsPage;
