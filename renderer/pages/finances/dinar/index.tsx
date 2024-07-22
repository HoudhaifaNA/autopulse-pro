import FiatTable from "page-components/finances/FiatTable";
import FiatFilter from "page-components/finances/FiatFilter";
import PageWrapper from "components/PageWrapper";

const DinarPage = () => {
  return (
    <PageWrapper
      resourceName="transactionsDZD"
      resourceDisplayName="virements en dinar"
      tableComponent={FiatTable}
      filterComponent={FiatFilter}
    />
  );
};

export default DinarPage;
