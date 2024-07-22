import ProcurationsTable from "page-components/procurations/ProcurationsTable";
import ProcurationsFilter from "page-components/procurations/ProcuraitonFilter";
import PageWrapper from "components/PageWrapper";

const PapersPage = () => {
  return (
    <PageWrapper
      resourceName="procurations"
      resourceDisplayName="procuration"
      tableComponent={ProcurationsTable}
      filterComponent={ProcurationsFilter}
    />
  );
};

export default PapersPage;
