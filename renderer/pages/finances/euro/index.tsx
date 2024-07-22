import FiatTable from "page-components/finances/FiatTable";
import FiatFilter from "page-components/finances/FiatFilter";
import PageWrapper from "components/PageWrapper";

const EuroPage = () => {
  return (
    <PageWrapper
      resourceName="transactionsEUR"
      resourceDisplayName="virements en euro"
      tableComponent={FiatTable}
      filterComponent={FiatFilter}
    />
  );
};

export default EuroPage;
