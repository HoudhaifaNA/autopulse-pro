import { useContext, useState } from "react";
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

interface IProps {
  procurations: any[];
}

const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Date", sortable: true },
  { text: "Moudjahid", sortable: true },
  { text: "Vendeur", sortable: false },
  { text: "Voiture", sortable: false },
  { text: "Prix", sortable: true },
  { text: "Statut", sortable: false },
  { text: "Date de procuration", sortable: true },
  { text: "Date de réception", sortable: true },
];

const procurationStatus = (hasReceived: string) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";
  if (hasReceived === "true") {
    status = "Reçue";
    color = "success";
  }
  if (hasReceived === "false") {
    status = "Non reçue";
    color = "error";
  }
  return <Badge type={color}>{status}</Badge>;
};

const ProcurationsTable = ({ procurations }: IProps) => {
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
    if (procurations.length === ids.length) {
      addIds([]);
    } else {
      procurations.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = async () => {
    if (ids.length > 0) {
      toggleModalDelete({
        name: `${ids.length} procurations`,
        url: `/procurations/${ids.join(",")}`,
      });
      return addIds([]);
    }
  };

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                isChecked={procurations.length === ids.length}
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
          {procurations.map((procuration, ind) => {
            const {
              id,
              created_at,
              issued_date,
              received_date,
              licenceId,
              carId,
              moudjahid,
              seller,
              sellerId,
              carName,
              hasReceived,
              price,
              type,
            } = procuration;

            const onDelete = async () => {
              toggleModalDelete({
                name: `Procuration de ${moudjahid}`,
                url: `/procurations/${id}`,
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
                <TableCell
                  onClick={() => {
                    setDocument({ type: "licences", id: licenceId });
                  }}
                >
                  <Body2>{moudjahid}</Body2>
                </TableCell>
                <TableCell
                  onClick={() => {
                    setDocument({ type: "clients", id: sellerId });
                  }}
                >
                  <Body2>{seller}</Body2>
                </TableCell>
                <TableCell
                  onClick={() => {
                    setDocument({ type: "cars", id: carId });
                  }}
                >
                  <Body2>{carName}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{price.toLocaleString()}.00 DA</Body2>
                </TableCell>
                <TableCell>{procurationStatus(hasReceived)}</TableCell>
                <TableCell blurrable={false}>
                  <Body2>{dayjs(issued_date).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>
                    {received_date
                      ? dayjs(received_date).format("DD-MM-YYYY")
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
                    <Dropdown $right="0" $top="1rem" $width="25rem">
                      <>
                        {hasReceived === "false" && (
                          <ButtonItem
                            onClick={() =>
                              setModal({
                                name: "procurations",
                                edit: true,
                                data: {
                                  id,
                                  created_at: dayjs(created_at),
                                  issued_date: dayjs(issued_date),
                                  received_date: new Date(),
                                  moudjahid,
                                  licence: { id: licenceId, name: moudjahid },
                                  price,
                                  type,
                                },
                              })
                            }
                          >
                            <Button variant="ghost" icon="checkmark">
                              Confirmer la réception
                            </Button>
                          </ButtonItem>
                        )}
                      </>
                      <ButtonItem
                        $ghostColor="#595959"
                        onClick={() =>
                          setModal({
                            name: "procurations",
                            edit: true,
                            data: {
                              id,
                              created_at: dayjs(created_at),
                              issued_date: dayjs(issued_date),
                              received_date:
                                hasReceived === "true"
                                  ? dayjs(received_date)
                                  : null,
                              moudjahid,
                              licence: { id: licenceId, name: moudjahid },
                              price,
                              type,
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

export default ProcurationsTable;
