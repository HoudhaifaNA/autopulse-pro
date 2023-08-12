import { useContext } from "react";
import useSWR from "swr";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";
import Button from "components/Button/Button";

import retreiveCarDetails from "components/CarDocument/retreiveCarDetails";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import dayjs from "dayjs";

type NestedValueType = {
  [key: string]: string;
};

const renderNestedValues = (nestedValue: NestedValueType, rowStart: number) => {
  return Object.entries(nestedValue).map(([key, value], ind) => {
    return <DetailItem key={ind} $index={rowStart} title={key} value={value} />;
  });
};

const CarDocument = () => {
  const { setModal, currDocument, setDocument, toggleModalDelete } =
    useContext(GlobalContext);
  const { id } = currDocument;
  const { data } = useSWR(`/cars/${id}`, fetcher);

  const CAR_DETAILS = data ? retreiveCarDetails(data.car) : [];

  const editCar = (car: any) => {
    const {
      type,
      costInEuros,
      sellerId,
      seller,
      ownerId,
      ownerName,
      licencePrice,
      created_at,
    } = car;

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
  };
  const deleteCar = (car: any) => {
    toggleModalDelete({
      name: `${car.name}`,
      url: `/cars/${id}`,
    });
  };

  const renderSellingBtn = (isSold: boolean) => {
    const toggleSellModal = () => setModal({ name: "sell", data: { id } });

    return (
      !isSold && (
        <Button variant="primary" icon="sell" onClick={toggleSellModal}>
          Vendre cette voiture
        </Button>
      )
    );
  };
  const renderUnsellingBtn = (car: any) => {
    const {
      name,
      serialNumber,
      given_keys,
      procuration,
      gray_card,
      folder,
      selling_details,
      buyer,
      soldPrice,
      sold_date,
      buyerId,
    } = car;

    const toggleUpdateSale = () => {
      setModal({
        name: "sell",
        edit: true,
        data: {
          id,
          soldPrice,
          sold_date: sold_date ? dayjs(sold_date) : new Date(),
          given_keys,
          folder,
          procuration: JSON.parse(procuration),
          gray_card: JSON.parse(gray_card),
          selling_details: selling_details ?? "",
          buyer: { id: buyerId, name: buyer },
        },
      });
    };
    const toggleRepurchase = () => {
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
    };
    const toggleUnsellModal = () => {
      toggleModalDelete({
        name: `${name} (${serialNumber}) avec ${buyer}`,
        url: `/cars/unsold/${id}`,
        method: "patch",
      });
    };

    return (
      buyer && (
        <>
          <Button variant="primary" icon="sell" onClick={toggleUpdateSale}>
            Modifier la vente
          </Button>
          <Button variant="primary" icon="cancel" onClick={toggleUnsellModal}>
            Annuler al vente
          </Button>
          <Button variant="primary" icon="finance" onClick={toggleRepurchase}>
            Rachat
          </Button>
        </>
      )
    );
  };

  return (
    data && (
      <DetailsViewer title="Document de voiture">
        <div style={{ display: "flex", gap: "2rem" }}>
          {renderSellingBtn(data.car.buyer)}
          {renderUnsellingBtn(data.car)}
          <Button
            variant="primary"
            icon="edit"
            onClick={() => editCar(data.car)}
          >
            Modifier
          </Button>
          <Button
            variant="danger"
            icon="delete"
            onClick={() => deleteCar(data.car)}
          >
            Supprimer
          </Button>
        </div>
        {CAR_DETAILS.map(({ section, columns, details }) => {
          const sectionDetails = Object.entries(details);
          const sections = [
            "Détails d'achat",
            "Calcul de l'Euro",
            "Détails de la vente",
            "Totaux",
          ];
          return (
            sectionDetails.length > 0 && (
              <DetailSection key={section}>
                <DetailHeader title={section} />
                <DetailContent $columns={columns}>
                  {sectionDetails.map(([key, value], ind) => {
                    const docs = ["vendeur", "acheteur"];
                    const handleClick = () => {
                      if (key.toLowerCase() === "vendeur") {
                        return setDocument({
                          type: "clients",
                          id: data.car.sellerId,
                        });
                      } else if (key.toLowerCase() === "propriétaire") {
                        return setDocument({
                          type: "licences",
                          id: data.car.ownerId,
                        });
                      } else if (key.toLowerCase() === "acheteur") {
                        return setDocument({
                          type: "clients",
                          id: data.car.buyerId,
                        });
                      }
                    };

                    let otherProps = {};
                    if (
                      docs.indexOf(key) !== -1 ||
                      (key.toLowerCase() === "propriétaire" &&
                        data.car.ownerId > 0)
                    ) {
                      otherProps = { onClick: handleClick };
                    }

                    if (typeof value === "string") {
                      return (
                        <DetailItem
                          key={ind}
                          title={key}
                          value={value}
                          blurrable={sections.indexOf(section) !== -1}
                          {...otherProps}
                        />
                      );
                    } else if (value && typeof value === "object") {
                      return renderNestedValues(value, ind);
                    }
                  })}
                </DetailContent>
              </DetailSection>
            )
          );
        })}
      </DetailsViewer>
    )
  );
};

export default CarDocument;
