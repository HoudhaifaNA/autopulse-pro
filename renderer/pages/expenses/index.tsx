import { useContext } from "react";
import useSWR from "swr";

import Meta from "components/Meta/Meta";
import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import ExpensesTable from "components/Tables/ExpensesTable";

const LicencesPage = () => {
  const { setModal } = useContext(GlobalContext);
  const { data, isLoading, error } = useSWR("/expenses", fetcher, {
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
          title="Vous n'avez pas de dépenses"
          description="Ajoutez des dépenses pour les voir ici"
          image="expenses"
          CTAText="Ajouter une dépense"
          CTAIcon="add"
          modal="expenses"
        />
      );
    } else {
      console.log(data);

      return (
        <>
          <PageHeader
            title="Dépenses"
            CTAText="Ajouter une dépense"
            CTAIcon="add"
            CTAonClick={() => setModal("expenses")}
          />
          <ExpensesTable expenses={data.expenses} />
        </>
      );
    }
  };
  return (
    <>
      <Meta title="Dépenses" />
      {renderPage()}
    </>
  );
};

export default LicencesPage;
