import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import Meta from "components/Meta/Meta";
import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
// import LicencesTable from "components/Tables/LicencesTable";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import { Heading5 } from "styles/Typography";
import ProcurationsTable from "components/Tables/ProcurationsTable";

const ProcurationsPage = () => {
  const { setModal, modalDelete } = useContext(GlobalContext);
  const [swrOptions, setSWROptions] = useState({});
  const url = `/procurations`;
  const { data, isLoading, error } = useSWR(url, fetcher, swrOptions);

  useEffect(() => {
    setSWROptions({ refreshInterval: 100 });

    const swrTimeOut = setTimeout(() => {
      setSWROptions({});
    }, 1000);

    return () => clearTimeout(swrTimeOut);
  }, [JSON.stringify(modalDelete)]);

  const renderPage = () => {
    if (isLoading) return <Loading />;
    if (error) {
      return <ErrorMessage>{error.response.data.message}</ErrorMessage>;
    }
    if (data && data.results === 0) {
      return (
        <EmptyState
          title="Vous n'avez pas de procurations"
          description="Ajoutez des procurations pour les voir ici"
          image="procuration"
          CTAText="Ajouter une procuration"
          CTAIcon="add"
          modal="procurations"
        />
      );
    } else {
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <Heading5>{data.results} </Heading5>
            <PageHeader
              CTAText="Ajouter"
              CTAIcon="add"
              CTAonClick={() => setModal({ name: "procurations" })}
            />
          </div>
          <ProcurationsTable procurations={data.procurations} />
        </>
      );
    }
  };
  return (
    <>
      <Meta title="Procurations" />
      {renderPage()}
    </>
  );
};

export default ProcurationsPage;
