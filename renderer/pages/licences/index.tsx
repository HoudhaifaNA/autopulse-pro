import LicencesTable from "page-components/licences/LicencesTable";
import LicencesFilter from "page-components/licences/LicencesFilter";
import PageWrapper from "components/PageWrapper";

const LicencesPage = () => {
  return (
    <PageWrapper
      resourceName="licences"
      resourceDisplayName="licence"
      tableComponent={LicencesTable}
      filterComponent={LicencesFilter}
    />
  );
};

export default LicencesPage;
