import { useContext } from "react";
import useSWR from "swr";

import ClientForm from "components/ClientForm/ClientForm";
import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import Meta from "components/Meta/Meta";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import ClientsTable from "components/Tables/ClientsTable";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import ClientDocument from "components/ClientDocument/ClientDocument";

const ClientsPage = () => {
  const { data, isLoading, error } = useSWR("/clients", fetcher, {
    refreshInterval: 5,
  });
  const { currModal, setModal } = useContext(GlobalContext);
  const renderPage = () => {
    if (isLoading) return <Loading />;
    if (error) {
      return <ErrorMessage>{error.response.data.message}</ErrorMessage>;
    }
    if (data && data.results === 0) {
      return (
        <EmptyState
          title="Vous n'avez pas de clients"
          description="Ajoutez des clients pour les voir ici"
          image="clients"
          CTAText="Ajouter un client"
          CTAIcon="add"
          modal="clients"
        />
      );
    } else {
      return (
        <>
          <PageHeader
            title="Clients"
            CTAText="Ajouter un client"
            CTAIcon="add"
            CTAonClick={() => setModal("clients")}
          />
          <ClientsTable clients={data.clients} />
        </>
      );
    }
  };

  return (
    <>
      <Meta title="Clients" />
      {renderPage()}
    </>
  );
};

export default ClientsPage;
