import PageWrapper from "components/PageWrapper";
import PapersTable from "page-components/papers/PapersTable";
import PapersFilter from "page-components/papers/PapersFilter";

const PapersPage = () => {
  return (
    <PageWrapper
      resourceName="papers"
      resourceDisplayName="dossier"
      tableComponent={PapersTable}
      filterComponent={PapersFilter}
    />
  );
};

export default PapersPage;
