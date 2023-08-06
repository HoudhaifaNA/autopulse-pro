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
  licences: any[];
  rowsNumbers: number[] | null;
}

const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Moudjahid", sortable: true },
  { text: "Numéro de série", sortable: false },
  { text: "Wilaya", sortable: false },
  { text: "Prix", sortable: true },
  { text: "Statut", sortable: false },
  { text: "Date d'expiration", sortable: true },
  { text: "Vendeur", sortable: true },
];

const licenceStatus = (isValid: string) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";
  if (isValid === "true") {
    status = "Active";
    color = "success";
  }
  if (isValid === "false") {
    status = "Invalide";
    color = "error";
  }
  return <Badge type={color}>{status}</Badge>;
};

const LicencesTable = ({ licences, rowsNumbers }: IProps) => {
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
    if (licences.length === ids.length) {
      addIds([]);
    } else {
      licences.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = async () => {
    if (ids.length > 0) {
      toggleModalDelete({
        name: `${ids.length} licences`,
        url: `/licences/${ids.join(",")}`,
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
                isChecked={licences.length === ids.length}
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
          {licences.map((licence, ind) => {
            const {
              id,
              created_at,
              sellerId,
              seller,
              moudjahid,
              serialNumber,
              wilaya,
              price,
              isValid,
              validUntil,
            } = licence;

            const onDelete = async () => {
              toggleModalDelete({
                name: `licence de ${moudjahid}`,
                url: `/licences/${id}`,
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
                  <Body2>{rowsNumbers ? rowsNumbers[ind] : ind + 1}</Body2>
                </TableCell>
                <TableCell
                  onClick={() => {
                    setDocument({ type: "licences", id });
                  }}
                >
                  <Body2>{moudjahid}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{serialNumber ?? "--"}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{wilaya ?? "--"}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{price.toLocaleString()}.00 DA</Body2>
                </TableCell>
                <TableCell>{licenceStatus(isValid)}</TableCell>
                <TableCell>
                  <Body2>{dayjs(validUntil).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell
                  onClick={() => {
                    setDocument({ type: "clients", id: sellerId });
                  }}
                >
                  <Body2>{seller}</Body2>
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
                            name: "licences",
                            edit: true,
                            data: {
                              id,
                              created_at: dayjs(created_at),
                              releasedDate: dayjs(validUntil).subtract(
                                5,
                                "years"
                              ),
                              moudjahid,
                              seller: { id: sellerId, name: seller },
                              serialNumber,
                              wilaya,
                              price,
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

export default LicencesTable;
