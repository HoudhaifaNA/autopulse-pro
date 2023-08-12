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
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { GlobalContext } from "pages/_app";
import useClickOutside from "hooks/useClickOutside";
import Dropdown from "components/Dropdown/Dropdown";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Button/Button";
import { mutate } from "swr";

interface IProps {
  cars: any[];
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  rowsNumbers: number[] | null;
}

const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Date", sortField: "created_at", sortable: true },
  { text: "Nom", sortField: "name", sortable: true },
  { text: "Num. châssis", sortable: false },
  { text: "Matricule", sortable: false },
  { text: "Couleur", sortable: false },
  { text: "Année", sortable: true },
  { text: "Propriétaire", sortable: false },
  { text: "Vendeur", sortable: true },
  { text: "Achateur", sortable: true },
  { text: "Categorie", sortable: false },
];

const CarsTable = ({ cars, orderBy, setOrderBy, rowsNumbers }: IProps) => {
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
    if (cars.length === ids.length) {
      addIds([]);
    } else {
      cars.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = async () => {
    if (ids.length > 0) {
      toggleModalDelete({
        name: `${ids.length} voitures`,
        url: `/cars/${ids.join(",")}`,
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
                isChecked={cars.length > 0 && cars.length === ids.length}
                check={checkAllRows}
              />
            </TableHeaderCell>
            {TB_HEADER_DATA.map((el) => {
              let turn = 0;
              if (
                el.sortField === orderBy.split(" ")[0] &&
                orderBy.endsWith("DESC")
              ) {
                turn = 0.5;
              }

              return (
                <TableHeaderCell
                  key={el.text}
                  onClick={() => {
                    if (el.sortable && el.sortField) {
                      if (orderBy === el.sortField) {
                        setOrderBy(`${el.sortField} DESC`);
                      } else {
                        setOrderBy(el.sortField);
                      }
                    }
                  }}
                >
                  <Body2>{el.text}</Body2>
                  {el.sortable && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        transform: `rotate(${turn}turn)`,
                      }}
                    >
                      <Icon icon="expand" size="1.8rem" />
                    </div>
                  )}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell onClick={handleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car, ind) => {
            const {
              id,
              created_at,
              name,
              serialNumber,
              registrationNumber,
              color,
              year,
              seller,
              sellerId,
              ownerId,
              ownerName,
              costInEuros,
              licencePrice,
              type,
              buyerId,
              buyer,
              soldPrice,
              sold_date,
              given_keys,
              folder,
              procuration,
              gray_card,
              selling_details,
              fields_status,
            } = car;

            const onDelete = () => {
              toggleModalDelete({
                name: `${name}`,
                url: `/cars/${id}`,
              });
              return addIds([]);
            };
            return (
              <TableRow
                key={id}
                className={fields_status === "Missing fields" ? "red" : ""}
              >
                <TableCell blurrable={false}>
                  <Checkbox
                    isChecked={!(ids.indexOf(id) === -1)}
                    check={() => checkRow(id)}
                  />
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{rowsNumbers ? rowsNumbers[ind] : ind + 1}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{dayjs(created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell
                  onClick={() => {
                    setDocument({ type: "cars", id });
                  }}
                >
                  <Body2>{name}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{serialNumber}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{registrationNumber}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{color}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{year}</Body2>
                </TableCell>
                <TableCell
                  onClick={() => {
                    if (ownerId > 0) {
                      setDocument({ type: "licences", id: ownerId });
                    }
                  }}
                >
                  <Body2 style={{ color: ownerId > 0 ? "#ab0000" : "#000" }}>
                    {ownerName}
                  </Body2>
                </TableCell>
                <TableCell
                  onClick={() => setDocument({ type: "clients", id: sellerId })}
                >
                  <Body2>{seller}</Body2>
                </TableCell>

                <TableCell
                  onClick={() => setDocument({ type: "clients", id: buyerId })}
                >
                  <Body2>{buyer ? buyer : "--"}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{type}</Body2>
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
                      <>
                        {buyer && (
                          <ButtonItem
                            $ghostColor="#595959"
                            onClick={() => {
                              setModal({
                                name: "sell",
                                edit: true,
                                data: {
                                  id,
                                  soldPrice,
                                  sold_date: sold_date
                                    ? dayjs(sold_date)
                                    : new Date(),
                                  given_keys,
                                  folder,
                                  procuration: JSON.parse(procuration),
                                  gray_card: JSON.parse(gray_card),
                                  selling_details: selling_details ?? "",
                                  buyer: { id: buyerId, name: buyer },
                                },
                              });
                            }}
                          >
                            <Button variant="ghost" icon="sell">
                              Modifier la vente
                            </Button>
                          </ButtonItem>
                        )}
                        {buyer && (
                          <ButtonItem
                            $ghostColor="#595959"
                            onClick={() => {
                              toggleModalDelete({
                                name: `${name} (${serialNumber}) avec ${buyer}`,
                                url: `/cars/unsold/${id}`,
                                method: "patch",
                              });
                            }}
                          >
                            <Button variant="ghost" icon="cancel">
                              Annuler la vente
                            </Button>
                          </ButtonItem>
                        )}
                      </>

                      <>
                        {!buyer && (
                          <ButtonItem
                            $ghostColor="#595959"
                            onClick={() => {
                              setModal({ name: "sell", data: { id } });
                            }}
                          >
                            <Button variant="ghost" icon="sell">
                              Vendre
                            </Button>
                          </ButtonItem>
                        )}
                      </>
                      {buyer && (
                        <ButtonItem
                          $ghostColor="#595959"
                          onClick={() => {
                            setModal({
                              name: "cars",
                              edit: true,
                              data: {
                                ...car,
                                type: "locale",
                                repurchase: true,
                                seller: { id: 0, name: "" },
                                expenses: [],
                                owner: {
                                  id: 0,
                                  name: "",
                                  price: 0,
                                },
                                created_at: new Date(),
                              },
                            });
                          }}
                        >
                          <Button variant="ghost" icon="finance">
                            Rachat
                          </Button>
                        </ButtonItem>
                      )}
                      <ButtonItem
                        $ghostColor="#595959"
                        onClick={() => {
                          setModal({
                            name: "cars",
                            edit: true,
                            data: {
                              ...car,
                              type,
                              costInEuros,
                              seller: { id: sellerId, name: seller },
                              isExchange: JSON.parse(car.isExchange),
                              exchangeTypes: JSON.parse(car.exchangeTypes),
                              expenses: JSON.parse(car.expenses),
                              owner: {
                                id: ownerId,
                                name: ownerName,
                                price: licencePrice,
                              },
                              created_at: dayjs(created_at),
                            },
                          });
                        }}
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

export default CarsTable;
