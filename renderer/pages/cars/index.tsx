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
import Icon from "components/Icon/Icon";
import PageHeader from "components/PageHeader/PageHeader";
import Pagination from "components/Pagination/Pagination";
import { Body2 } from "styles/Typography";
import Dropdown from "components/Dropdown/Dropdown";
import EmptyState from "components/EmptyState/EmptyState";
import Meta from "components/Meta/Meta";
import CarForm from "components/CarForm/CarForm";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Buttons/Button";

const CARS_FAKE_DATA = [
  { text: "Date créée", sortable: true },
  { text: "Nom", sortable: true },
  { text: "Matricule", sortable: false },
  { text: "Vendeur", sortable: true },
  { text: "Prix", sortable: true },
  { text: "Depenses", sortable: true },
  { text: "Total", sortable: true },
  { text: "Categorie", sortable: false },
  { text: "Achateur", sortable: true },
  { text: "Pr. vente", sortable: true },
  { text: "Intérêt", sortable: true },
];

const CarsPage = () => {
  return (
    <div>
      <Meta title="Voitures" />
      <div className="background-black" />
      <CarForm />
      {/* <EmptyState
        title="Vous n'avez pas de voitures"
        description="Ajoutez des voitures pour les voir ici"
        image="cars"
        CTAText="Ajouter un voiture"
        CTAIcon="add"
      /> */}
      {/* <div style={{ position: "relative", zIndex: "8000" }}>
        <PageHeader
          title="Voitures"
          CTAText="Ajouter un voiture"
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
              {CARS_FAKE_DATA.map((el) => {
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
                    <Body2>04/25/2014</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>Mercedes CLA 220 ...</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>W9FE-VS5</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>Tarek Djerfi</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>7850000.00</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>400000.00</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>8000000.00</Body2>
                  </TableCell>
                  <TableCell>
                    <Badge type="warning">Importe</Badge>
                  </TableCell>
                  <TableCell>
                    <Body2>Mourad Denfir</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>45800000.00</Body2>
                  </TableCell>
                  <TableCell>
                    <Body2>913000.00</Body2>
                  </TableCell>
                  <TableCell blurrable={false}>
                    <Icon icon="more_vert" size="1.8rem" />
                    {i === 0 && (
                      <Dropdown
                        $width="20rem"
                        $right="0"
                        $top="0"
                        items={[
                          { mainText: "Vendre", icon: "sell" },
                          { mainText: "Imprimer", icon: "print" },
                          { mainText: "Edit", icon: "edit" },
                        ]}
                        onItemClick={(str) => console.log(str)}
                      >
                        <ButtonItem $ghostColor="red">
                          <Button variant="ghost" icon="delete">
                            Supprimer
                          </Button>
                        </ButtonItem>
                      </Dropdown>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableWrapper> */}
      {/* <Pagination /> */}
    </div>
  );
};

export default CarsPage;
