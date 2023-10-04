import ClientsTable from "page-components/clients/ClientsTable";
import ClientsFilter from "page-components/clients/ClientsFilter";
import PageWrapper from "components/PageWrapper";

const ClientsPage = () => {
  return (
    <PageWrapper
      resourceName="clients"
      resourceDisplayName="client"
      tableComponent={ClientsTable}
      filterComponent={ClientsFilter}
    />
  );
};

export default ClientsPage;
