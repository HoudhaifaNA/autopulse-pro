import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "components/Modal/Modal.styled";
import { Heading5 } from "styles/Typography";
import BlackOverlay from "styles/BlackOverlay";
import Icon from "components/Icon/Icon";

import useDragger from "hooks/useDragger";
import { AppDispatch, useAppSelector } from "store";
import { addModal, removeModal } from "store/reducers/modals";
import truncateText from "utils/truncate";
import { AddModalPayload } from "types";

interface ModalProps {
  title: string;
  modalId: string;
  zIndexMultiplier?: number;
  children: ReactNode;
}

export const ModalContent = S.ModalContent;
export const ModalActions = S.ModalActions;

const WARNING_MODAL_PAYLOAD: AddModalPayload = {
  name: "warning",
  title: "Confirmer la fermeture",
  type: "closer",
};

const Modal = ({ title, zIndexMultiplier = 1, modalId, children }: ModalProps) => {
  const [signal, toggleSignal] = useState(false);
  const modalsList = useAppSelector((state) => state.modals.modalsList);
  const dispatch = useDispatch<AppDispatch>();

  const holderElementId = `holder-${modalId}`;
  const modalElementId = `modal-${modalId}`;
  useDragger(modalElementId, holderElementId);

  const isWarningOpen = modalsList.find(({ name }) => name === "warning");

  const closeModal = () => {
    if (isWarningOpen) dispatch(removeModal(modalId));
    if (!isWarningOpen) dispatch(addModal(WARNING_MODAL_PAYLOAD));
  };

  useEffect(() => {
    if (signal) toggleSignal(false);
  }, [signal]);

  return (
    <>
      <BlackOverlay $zIndexMultiplier={zIndexMultiplier} onClick={() => toggleSignal(true)} />
      <S.ModalWrapper id={modalElementId} className={signal ? "signal" : ""} $zIndexMultiplier={zIndexMultiplier}>
        <S.ModalHeader id={holderElementId}>
          <Heading5 title={title}>{truncateText(title, 60)}</Heading5>
          <S.CloseModalButton onClick={closeModal}>
            <Icon icon="close" size="2.4rem" />
          </S.CloseModalButton>
        </S.ModalHeader>
        <ModalContent>{children}</ModalContent>
      </S.ModalWrapper>
    </>
  );
};

export default Modal;
