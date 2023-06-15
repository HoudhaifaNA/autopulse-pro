import { ReactNode, useContext } from "react";

import * as S from "components/Modal/Modal.styled";
import { Heading5 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import truncateText from "utils/truncate";
import { GlobalContext } from "pages/_app";

interface ModalProps {
  title: string;
  children: ReactNode;
}

export const ModalContent = S.ModalContent;
export const ModalActions = S.ModalActions;

const Modal = ({ title, children }: ModalProps) => {
  const { _, setModal } = useContext(GlobalContext);
  const closeModal = () => setModal("");

  return (
    <>
      <div
        className="background-black"
        style={{ zIndex: "400000" }}
        onClick={closeModal}
      />
      <S.ModalWrapper>
        <S.ModalHeader>
          <Heading5 title={title}>{truncateText(title, 40)}</Heading5>
          <div onClick={closeModal}>
            <Icon icon="close" size="2.4rem" />
          </div>
        </S.ModalHeader>
        {children}
      </S.ModalWrapper>
    </>
  );
};

export default Modal;
