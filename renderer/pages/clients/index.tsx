import Badge from "components/Badge/Badge";
import ClientForm from "components/ClientForm/ClientForm";
import PageHeader from "components/PageHeader/PageHeader";
import Table, { TableRow } from "components/Table/Table";
import { Body2 } from "styles/Typography";

const HeaderItems = [
  { text: "Date créée", sortable: true },
  { text: "Nom", sortable: true },
  { text: "Dette", sortable: true },
  { text: "Statut de paiement" },
  { text: "Dernière transaction", sortable: true },
  { text: "" },
];

const TableItems = [
  {
    userName: "Houdhaifa Lebbad",
    Debt: 15000.0,
    status: "endette",
    lastTransaction: "15/09/2019",
    createdAt: "15/09/2019",
  },
  {
    userName: "Saber Zehani",
    Debt: 17500.0,
    status: "Due",
    lastTransaction: "15/09/2012",
    createdAt: "15/09/2021",
  },
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
        {TableItems.map((el) => {
          return (
            <TableRow key={el.userName}>
              <Body2>{el.createdAt}</Body2>
              <Body2>{el.userName}</Body2>
              <Body2>{el.Debt}</Body2>
              <Badge type="success">{el.status}</Badge>
              <Body2>{el.lastTransaction}</Body2>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
};

export default ClientsPage;
