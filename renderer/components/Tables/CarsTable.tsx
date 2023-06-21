import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "components/Table/Table";
import API from "utils/API";
import { useContext, useState } from "react";
import { GlobalContext } from "pages/_app";

interface IProps {
  cars: any[];
}

const TB_HEADER_DATA = [
  { text: "Date créée", sortable: true },
  { text: "Nom", sortable: true },
  { text: "Matricule", sortable: false },
  { text: "Vendeur", sortable: true },
  { text: "Prix", sortable: true },
  { text: "Depenses", sortable: true },
  { text: "Pr. licence", sortable: true },
  { text: "Total", sortable: true },
  { text: "Categorie", sortable: false },
  { text: "Achateur", sortable: true },
  { text: "Pr. vente", sortable: true },
  { text: "Intérêt", sortable: true },
];

const CarsTable = ({ cars }: IProps) => {
  const { setDocument, toggleModalDelete } = useContext(GlobalContext);
  const [ids, addIds] = useState<number[]>([]);
  const checkRow = (id: number) => {
    if (ids.indexOf(id) === -1) {
      addIds((ids) => [...ids, id]);
    } else {
      addIds((ids) => ids.filter((el) => el !== id));
    }
  };

  const checkAllRows = () => {
    if (cars.length === ids.length) {
      addIds([]);
    } else {
      cars.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = async () => {
    if (cars.length === ids.length) {
      return toggleModalDelete({
        name: `${ids.length} voitures`,
        url: `/cars/`,
      });
    } else if (ids.length > 0) {
      return toggleModalDelete({
        name: `${ids.length} voitures`,
        url: `/cars/${ids.join(",")}`,
      });
    }
  };

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                isChecked={cars.length === ids.length}
                check={checkAllRows}
              />
            </TableHeaderCell>
            {TB_HEADER_DATA.map((el) => {
              return (
                <TableHeaderCell key={el.text}>
                  <Body2>{el.text}</Body2>
                  {el.sortable && <Icon icon="expand" size="1.8rem" />}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell onClick={handleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => {
            const {
              id,
              created_at,
              name,
              registrationNumber,
              seller,
              sellerId,
              purchasingPrice,
              totalExpensesCost,
              licencePrice,
              totalCost,
              type,
              buyerId,
              buyer,
              soldPrice,
              profit,
            } = car;

            const onDelete = () => {
              toggleModalDelete({
                name: `${name}`,
                url: `/cars/${id}`,
              });
              return addIds([]);
            };
            return (
              <TableRow key={id}>
                <TableCell blurrable={false}>
                  <Checkbox
                    isChecked={!(ids.indexOf(id) === -1)}
                    check={() => checkRow(id)}
                  />
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{dayjs(created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell
                  onClick={() => {
                    setDocument({ type: "cars", id });
                  }}
                  blurrable={false}
                >
                  <Body2>{name}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{registrationNumber}</Body2>
                </TableCell>
                <TableCell
                  blurrable={false}
                  onClick={() => setDocument({ type: "clients", id: sellerId })}
                >
                  <Body2>{seller}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{purchasingPrice.toLocaleString()}.00 DA</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{totalExpensesCost.toLocaleString()}.00 DA</Body2>
                </TableCell>
                <TableCell>
                  <Body2>
                    {licencePrice
                      ? `${licencePrice.toLocaleString()}.00 DA`
                      : "--"}
                  </Body2>
                </TableCell>
                <TableCell>
                  <Body2>{totalCost.toLocaleString()}.00 DA</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{type}</Body2>
                </TableCell>
                <TableCell
                  blurrable={false}
                  onClick={() => setDocument({ type: "clients", id: buyerId })}
                >
                  <Body2>{buyer ? buyer : "--"}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>
                    {soldPrice ? `${soldPrice.toLocaleString()}.00 DA` : "--"}
                  </Body2>
                </TableCell>
                <TableCell>
                  <Body2>
                    {buyer ? `${profit.toLocaleString()}.00 DA` : "--"}
                  </Body2>
                </TableCell>

                <TableCell blurrable={false} onClick={onDelete}>
                  <Icon icon="delete" size="1.8rem" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default CarsTable;
