import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "components/Table/Table";
import Checkbox from "components/Checkbox/Checkbox";
import LicenceForm from "components/LicenceForm/LicenceForm";
import Icon from "components/Icon/Icon";
import PageHeader from "components/PageHeader/PageHeader";
import Pagination from "components/Pagination/Pagination";
import { Body2 } from "styles/Typography";
import EmptyState from "components/EmptyState/EmptyState";
import Meta from "components/Meta/Meta";
import LicenceDocument from "components/LicenceDocument/LicenceDocument";

const FAKE_DATA = [
  { text: "Date créée", sortable: true },
  { text: "Vendeur", sortable: true },
  { text: "Moudjahid", sortable: true },
  { text: "Wilaya", sortable: false },
  { text: "Prix", sortable: true },
];

const LicencesPage = () => {
  return (
    <div>
      <Meta title="Licences" />
      <LicenceDocument />
      {/* <LicenceForm /> */}
      {/* <EmptyState
        title="Vous n'avez pas de licences"
        description="Ajoutez des licences pour les voir ici"
        image="licences"
        CTAText="Ajouter une licence"
        CTAIcon="add"
      /> */}
      <div style={{ position: "relative", zIndex: "8000" }}>
        <PageHeader
          title="Licences"
          CTAText="Ajouter une licence"
          CTAIcon="add"
          CTAonClick={() => console.log("Hello")}
        />
      </div>
      <TableWrapper>
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
                  <TableCell blurrable={false}>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Body2>14/05/2016</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>Ahmed Nadhir</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>Taher Alaawa</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>Sétif</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>800000.00</Body2>
                  </TableCell>
                  <TableCell blurrable={false}>
                    <Icon icon="more_vert" size="1.8rem" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableWrapper>
      <Pagination />
    </div>
  );
};

export default LicencesPage;
