import { ReactElement } from "react";

import Icon from "components/Icon/Icon";
import * as S from "components/Modal/Modal.styled";
import { Heading5 } from "styles/Typography";

interface ModalProps {
  title: string;
  actionsComponent: ReactElement;
  children: ReactElement;
}

const Modal = ({ title, actionsComponent, children }: ModalProps) => {
  return (
    <S.ModalWrapper>
      <S.ModalHeader>
        <Heading5>{title}</Heading5>
        <Icon icon="close" iconSize="2.4rem" />
      </S.ModalHeader>
      <S.ModalContent>{children}</S.ModalContent>
      <S.ModalActions>{actionsComponent}</S.ModalActions>
    </S.ModalWrapper>
  );
};

export default Modal;
