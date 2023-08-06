import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import Meta from "components/Meta/Meta";
import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import { Heading5 } from "styles/Typography";
import PapersTable from "components/Tables/PapersTable";

const PapersPage = () => {
  const { setModal, modalDelete } = useContext(GlobalContext);
  const [swrOptions, setSWROptions] = useState({});
  const url = `/papers`;
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
          title="Vous n'avez pas de dossier"
          description="Ajoutez des dossiers pour les voir ici"
          image="papers"
          CTAText="Ajouter un dossier"
          CTAIcon="add"
          modal="papers"
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
              CTAonClick={() => setModal({ name: "papers" })}
            />
          </div>
          <PapersTable papers={data.papers} />
        </>
      );
    }
  };
  return (
    <>
      <Meta title="Dossiers" />
      {renderPage()}
    </>
  );
};

export default PapersPage;
