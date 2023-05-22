import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import { Body2 } from "styles/Typography";

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
import Icon from "components/Icon/Icon";
import PageHeader from "components/PageHeader/PageHeader";
import Pagination from "components/Pagination/Pagination";
import EmptyState from "components/EmptyState/EmptyState";
import TransactionForm from "components/FinanceForm/TransactionForm";
import Meta from "components/Meta/Meta";
import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

const FAKE_DATA = [
  { text: "Date créée", sortable: true },
  { text: "Vendeur", sortable: true },
  { text: "Moudjahid", sortable: true },
  { text: "Wilaya", sortable: false },
  { text: "Prix", sortable: true },
];

const TransferOptions = () => (
  <Dropdown $right="0" $width="24rem">
    <ButtonItem>
      <Button variant="ghost" icon="exchange">
        Effectuer une transaction
      </Button>
    </ButtonItem>
    <ButtonItem>
      <Button variant="ghost" icon="euro">
        Acheter des euros
      </Button>
    </ButtonItem>
  </Dropdown>
);

const FinancePage = () => {
  return (
    <div>
      <Meta title="Finance" />
      <div className="background-black" />
      <TransactionForm />

      {/* <div style={{ position: "relative", zIndex: "8000" }}>
        <div>
          <PageHeader
            title="Finance"
            CTAText="Ajouter"
            CTAIcon="expand"
            IconP="right"
            CTAonClick={() => console.log("Hello")}
          />
          <TransferOptions />
        </div>
      </div> */}
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EmptyState
          title="Vous n'avez aucune transaction"
          description="Ajoutez des transactions pour les voir ici"
          image="finance"
          CTAText="Ajouter"
          CTAIcon="expand"
          IconP="right"
        />
        <div style={{ position: "relative", width: "11.6rem" }}>
          <TransferOptions />
        </div>
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
        <Pagination /> */}
    </div>
  );
};

export default FinancePage;
