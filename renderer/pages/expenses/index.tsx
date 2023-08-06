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
import { Heading5 } from "styles/Typography";

const LicencesPage = () => {
  const { setModal } = useContext(GlobalContext);
  const { data, isLoading, error } = useSWR("/expenses", fetcher);

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
            <Heading5>{data.expenses.length} </Heading5>
            <PageHeader
              CTAText="Ajouter"
              CTAIcon="add"
              CTAonClick={() => setModal({ name: "expenses" })}
            />
          </div>
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
