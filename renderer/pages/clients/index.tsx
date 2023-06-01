import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "components/Table/Table";
import Badge from "components/Badge/Badge";
import Checkbox from "components/Checkbox/Checkbox";
import ClientForm from "components/ClientForm/ClientForm";
import Icon from "components/Icon/Icon";
import PageHeader from "components/PageHeader/PageHeader";
import Pagination from "components/Pagination/Pagination";
import { Body2 } from "styles/Typography";
import EmptyState from "components/EmptyState/EmptyState";
import Meta from "components/Meta/Meta";
import ClientDocument from "components/ClientDocument/ClientDocument";

const FAKE_DATA = [
  { text: "Date créée", sortable: true },
  { text: "Nom", sortable: true },
  { text: "Dette", sortable: true },
  { text: "Statue de payment", sortable: false },
  { text: "Dernière transaction", sortable: true },
];

const ClientsPage = () => {
  return (
    <div>
      <Meta title="Clients" />
      {/* <ClientForm /> */}
      <ClientDocument />
      <EmptyState
        title="Vous n'avez pas de clients"
        description="Ajoutez des clients pour les voir ici"
        image="clients"
        CTAText="Ajouter un client"
        CTAIcon="add"
      />
      {/* <div style={{ position: "relative", zIndex: "8000" }}>
        <PageHeader
          title="Clients"
          CTAText="Ajouter un client"
          CTAIcon="add"
          CTAonClick={() => console.log("Hello")}
        />
      </div> */}
      {/* <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>
                <Checkbox />
              </TableHeaderCell>
              {FAKE_DATA.map((el) => {
                return (
                  <TableHeaderCell key={el.text}>
                    <Body2>{el.text}</Body2>
                    {el.sortable && <Icon icon="expand" size="1.8rem" />}
                  </TableHeaderCell>
                );
              })}
              <TableHeaderCell>
                <Icon icon="more_vert" size="1.8rem" />
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(10).fill(1).map((_, i) => {
              return (
                <TableRow key={Math.random() * 5}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Body2>14/05/2016</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>Ahmed Nadhir</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>800000.00</Body2>
                  </TableCell>
                  <TableCell>
                    <Badge type="error">Endette</Badge>
                  </TableCell>
                  <TableCell>
                    <Body2>30/04/2018</Body2>
                  </TableCell>
                  <TableCell>
                    <Icon icon="more_vert" size="1.8rem" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableWrapper>
      <Pagination /> */}
    </div>
  );
};

export default ClientsPage;
