import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { useDispatch } from "react-redux";

import { Body2 } from "styles/Typography";
import * as S from "./styles";
import { Transaction } from "../../../../interfaces";
import Icon from "components/Icon/Icon";
import { IconWrapper } from "page-components/cars/CarForm/CarType/styles";
import { ModalActions } from "components/Modal/Modal.styled";
import Button from "components/Button/Button";

import ClientPrinted from "../ClientPrinted";
import { useAppSelector } from "store";
import { PrintModalConfig } from "types/modals";
import { removeModal } from "store/reducers/modals";

const CURRENCIES = ["DZD", "EUR"] as const;
const TYPES = ["car", "paper", "procuration", "licence", "Fiat"] as const;
const DIRECTIONS = ["sortante", "entrante"] as const;
const PRINT_TYPES = ["Tout", "Dernier"] as const;

const PrintModal = ({ modalId }: { modalId: string }) => {
  const dispatch = useDispatch();
  const modalsList = useAppSelector((state) => state.modals.modalsList);
  const currentModal = modalsList.find(({ id }) => id === modalId) as PrintModalConfig;
  const lastRef = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState<Transaction["currency"]>();
  const [types, setTypes] = useState<Transaction["type"][]>([]);
  const [direction, setDirection] = useState<Transaction["direction"]>();
  const [printType, setPrintType] = useState<"Tout" | "Dernier">("Tout");

  const renderCurrencies = () => {
    return CURRENCIES.map((cur) => {
      const isSelected = currency === cur;
      const toggleCurrency = () => {
        if (isSelected) {
          setCurrency(undefined);
        } else {
          setCurrency(cur);
        }
      };

      return (
        <S.PrintConfigItem $selected={isSelected} key={cur} onClick={toggleCurrency}>
          <IconWrapper>{isSelected && <Icon icon="success" size="2.4rem" />}</IconWrapper>
          <Body2>{cur}</Body2>
        </S.PrintConfigItem>
      );
    });
  };
  const renderTypes = () => {
    return TYPES.map((tp) => {
      const isSelected = types.includes(tp);

      const toggleCurrency = () => {
        if (isSelected) {
          setTypes((prevTypes) => prevTypes.filter((prev) => prev !== tp));
        } else {
          setTypes([...types, tp]);
        }
      };

      return (
        <S.PrintConfigItem $selected={isSelected} key={tp} onClick={toggleCurrency}>
          <IconWrapper>{isSelected && <Icon icon="success" size="2.4rem" />}</IconWrapper>
          <Body2>{tp}</Body2>
        </S.PrintConfigItem>
      );
    });
  };

  const renderDirections = () => {
    return DIRECTIONS.map((dir) => {
      const isSelected = direction === dir;
      const toggleCurrency = () => {
        if (isSelected) {
          setDirection(undefined);
        } else {
          setDirection(dir);
        }
      };

      return (
        <S.PrintConfigItem $selected={isSelected} key={dir} onClick={toggleCurrency}>
          <IconWrapper>{isSelected && <Icon icon="success" size="2.4rem" />}</IconWrapper>
          <Body2>{dir}</Body2>
        </S.PrintConfigItem>
      );
    });
  };
  const renderPrintTypes = () => {
    return PRINT_TYPES.map((pType) => {
      const isSelected = printType === pType;

      const toggleCurrency = () => setPrintType(pType);

      return (
        <S.PrintConfigItem $selected={isSelected} key={pType} onClick={toggleCurrency}>
          <IconWrapper>{isSelected && <Icon icon="success" size="2.4rem" />}</IconWrapper>
          <Body2>{pType}</Body2>
        </S.PrintConfigItem>
      );
    });
  };

  return (
    <S.PrintModalWrapper>
      <div style={{ display: "none" }}>
        <ClientPrinted
          ref={allRef}
          id={currentModal.clientId}
          filter={{ currency, types: types.join(","), direction }}
          type="all"
        />
        <ClientPrinted ref={lastRef} id={currentModal.clientId} type="last" />
      </div>
      <S.PrintListConfig>{renderTypes()}</S.PrintListConfig>
      <S.PrintListConfig>{renderCurrencies()}</S.PrintListConfig>
      <S.PrintListConfig>{renderDirections()}</S.PrintListConfig>
      <S.PrintListConfig>{renderPrintTypes()}</S.PrintListConfig>
      <ModalActions>
        <ReactToPrint
          content={() => (printType === "Tout" ? allRef.current : lastRef.current)}
          onAfterPrint={() => dispatch(removeModal(modalId))}
          trigger={() => (
            <Button type="submit" variant="primary">
              Imprimer
            </Button>
          )}
        />
      </ModalActions>
    </S.PrintModalWrapper>
  );
};

export default PrintModal;
