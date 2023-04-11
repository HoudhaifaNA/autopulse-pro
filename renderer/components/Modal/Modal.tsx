import { ReactNode } from "react";

import Icon from "components/Icon/Icon";
import * as S from "components/Modal/Modal.styled";
import { Heading5 } from "styles/Typography";

interface ModalProps {
  title: string;
  children: ReactNode;
}

export const ModalContent = S.ModalContent;
export const ModalActions = S.ModalActions;

const Modal = ({ title, children }: ModalProps) => {
  return (
    <S.ModalWrapper>
      <S.ModalHeader>
        <Heading5>{title}</Heading5>
        <Icon icon="close" size="2.4rem" />
      </S.ModalHeader>
      {children}
    </S.ModalWrapper>
  );
};

export default Modal;
