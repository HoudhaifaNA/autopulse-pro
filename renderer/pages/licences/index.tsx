import { useContext } from "react";
import useSWR from "swr";

import Meta from "components/Meta/Meta";
import LicenceForm from "components/LicenceForm/LicenceForm";
import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import LicencesTable from "components/Tables/LicencesTable";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import LicenceDocument from "components/LicenceDocument/LicenceDocument";

const LicencesPage = () => {
  const { currModal, setModal, currDocument } = useContext(GlobalContext);
  const { data, isLoading, error } = useSWR("/licences", fetcher, {
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
          title="Vous n'avez pas de licences"
          description="Ajoutez des licences pour les voir ici"
          image="licences"
          CTAText="Ajouter une licence"
          CTAIcon="add"
          modal="licences"
        />
      );
    } else {
      return (
        <>
          <PageHeader
            title="Licences"
            CTAText="Ajouter une licence"
            CTAIcon="add"
            CTAonClick={() => setModal("licences")}
          />
          <LicencesTable licences={data.licences} />
        </>
      );
    }
  };
  return (
    <>
      <Meta title="Licences" />
      {renderPage()}
      {currModal === "licences" && <LicenceForm />}
      {currDocument.type === "licences" && <LicenceDocument />}
    </>
  );
};

export default LicencesPage;
