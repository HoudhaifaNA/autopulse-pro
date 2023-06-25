import { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import Badge, { BadgeProps } from "components/Badge/Badge";
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
import { GlobalContext } from "pages/_app";
import Dropdown from "components/Dropdown/Dropdown";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Button/Button";
import useClickOutside from "hooks/useClickOutside";

interface IProps {
  clients: any[];
}

const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Date créée", sortable: true },
  { text: "Type", sortable: false },
  { text: "Nom", sortable: true },
  { text: "Numéro de téléphone", sortable: false },
  { text: "Solde du compte", sortable: true },
  { text: "Statue de payment", sortable: false },
  { text: "Dernière transaction", sortable: true },
];

const clientStatus = (balance: number) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";
  if (balance < 0) {
    status = "Débiteur";
    color = "error";
  }
  if (balance === 0) {
    status = "Équilibré";
    color = "success";
  }
  if (balance > 0) {
    status = "Créancier";
    color = "warning";
  }
  return <Badge type={color}>{status}</Badge>;
};

const ClientsTable = ({ clients }: IProps) => {
  const [isDropdownActive, toggleDropdown] = useState<null | number>(null);
  const { setDocument, toggleModalDelete, setModal } =
    useContext(GlobalContext);
  const [ids, addIds] = useState<number[]>([]);
  const checkRow = (id: number) => {
    if (ids.indexOf(id) === -1) {
      addIds((ids) => [...ids, id]);
    } else {
      addIds((ids) => ids.filter((el) => el !== id));
    }
  };

  const checkAllRows = () => {
    if (clients.length === ids.length) {
      addIds([]);
    } else {
      clients.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = () => {
    if (clients.length === ids.length) {
      toggleModalDelete({
        name: `${ids.length} client`,
        url: `/clients/`,
      });
    } else if (ids.length > 0) {
      toggleModalDelete({
        name: `${ids.length} client`,
        url: `/clients/${ids.join(",")}`,
      });
    }
    return addIds([]);
  };
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                isChecked={clients.length === ids.length}
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
          {clients.map((client, ind) => {
            const {
              id,
              created_at,
              clientType,
              fullName,
              phoneNumber,
              balance,
              lastTransactionDate,
            } = client;
            const onDelete = () => {
              toggleModalDelete({
                name: `${fullName} et sa transactions (voitures, licences, transferts d'argent)`,
                url: `/clients/${id}`,
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
                  <Body2>{ind + 1}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{dayjs(created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{clientType}</Body2>
                </TableCell>
                <TableCell
                  blurrable={false}
                  onClick={() => {
                    setDocument({ type: "clients", id });
                  }}
                >
                  <Body2>{fullName}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{phoneNumber ? phoneNumber : "--"}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>
                    {Math.abs(balance).toLocaleString()}.00{" "}
                    {clientType === "euro" ? "€" : "DA"}
                  </Body2>
                </TableCell>
                <TableCell>{clientStatus(balance)}</TableCell>
                <TableCell blurrable={false}>
                  <Body2>
                    {lastTransactionDate
                      ? dayjs(lastTransactionDate).format("DD-MM-YYYY")
                      : "--"}
                  </Body2>
                </TableCell>
                <TableCell
                  blurrable={false}
                  onClick={() => {
                    if (isDropdownActive === ind) {
                      toggleDropdown(null);
                    } else {
                      toggleDropdown(ind);
                    }
                  }}
                >
                  <Icon icon="more_vert" size="1.8rem" />

                  {isDropdownActive === ind && (
                    <Dropdown $right="0" $top="1rem" $width="20rem">
                      <ButtonItem
                        $ghostColor="#595959"
                        onClick={() =>
                          setModal({
                            name: "clients",
                            edit: true,
                            data: {
                              id,
                              fullName,
                              phoneNumber,
                              clientType,
                              balance,
                            },
                          })
                        }
                      >
                        <Button variant="ghost" icon="edit">
                          Modifier
                        </Button>
                      </ButtonItem>
                      <ButtonItem $ghostColor="#FF4040" onClick={onDelete}>
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
    </TableWrapper>
  );
};

export default ClientsTable;
