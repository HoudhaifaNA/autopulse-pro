import Badge from "components/Badge/Badge";
import ClientForm from "components/ClientForm/ClientForm";
import PageHeader from "components/PageHeader/PageHeader";
import Table, { TableRow } from "components/Table/Table";
import { Body2 } from "styles/Typography";

const HeaderItems = [
  { text: "Date", sortable: true },
  { text: "Client", sortable: true },
  { text: "Méthode" },
  { text: "Route" },
  { text: "Montant", sortable: true },
];

const ClientsPage = () => {
  return (
    <div>
      {/* <EmptyState
        title="Vous n'avez pas de clients"
        description="Ajoutez des clients pour les voir ici"
        image="clients"
        CTAText="Ajouter un client"
        CTAIcon="add"
      /> */}
      <div style={{ position: "relative", zIndex: "8000" }}>
        <PageHeader
          title="Clients"
          CTAText="Ajouter un client"
          CTAIcon="add"
          CTAonClick={() => console.log("Hello")}
        />
      </div>
      <Table HeaderItems={HeaderItems}>
        <TableRow>
          <Body2>Houdhaifa Lebbad</Body2>
          <Badge type="success">Endette</Badge>
          <Body2>Houdhaifa Lebbad</Body2>
          <Body2>Ahmed ss</Body2>
          <Body2>Ahmed ss</Body2>
          <Body2>Ahmed ss</Body2>
        </TableRow>
        <TableRow>
          <Body2>Ahmed Lebbad</Body2>
          <Badge type="error">Endette</Badge>
          <Body2>Ahmed ss</Body2>
          <Body2>Ahmed ss</Body2>
          <Body2>Ahmed ss</Body2>
          <Body2>Ahmed ss</Body2>
        </TableRow>
        <TableRow>
          <Body2>Houdhaifa Lebbad</Body2>
          <Badge type="success">Endette</Badge>
          <Body2>Ahmed Lebbad</Body2>
          <Body2>Ahmed ss</Body2>
          <Body2>Ahmed ss</Body2>
          <Body2>Ahmed ss</Body2>
        </TableRow>
      </Table>
    </div>
  );
};

export default ClientsPage;
