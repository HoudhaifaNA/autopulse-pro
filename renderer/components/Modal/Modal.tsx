import { ReactElement } from "react";

import Icon from "components/Icon/Icon";
import * as S from "components/Modal/Modal.styled";
import { Heading5 } from "styles/Typography";

interface ModalProps {
  title: string;
  children: [ReactElement, ReactElement];
}

const Modal = ({ title, children }: ModalProps) => {
  return (
    <S.ModalWrapper>
      <S.ModalHeader>
        <Heading5>{title}</Heading5>
        <Icon icon="close" size="2.4rem" />
      </S.ModalHeader>
      <S.ModalContent>{children[0]}</S.ModalContent>
      <S.ModalActions>{children[1]}</S.ModalActions>
    </S.ModalWrapper>
  );
};

export default Modal;
