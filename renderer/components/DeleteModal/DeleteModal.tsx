import { useContext, useState } from "react";

import {
  Input,
  InputContainer,
  InputIcon,
  InputWrapper,
} from "components/Input/InputContainer.styled";
import { Body1, LabelText } from "styles/Typography";

import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import Button from "components/Button/Button";

import API from "utils/API";
import Icon from "components/Icon/Icon";
import styled from "styled-components";
import { FormGroup } from "components/Input/Input.styled";
import { GlobalContext } from "pages/_app";

interface DeleteModalProps {
  name: string;
  url: string;
}

const DeleteModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > div {
    width: 50%;
  }
`;

const DeleteModal = ({ name, url }: DeleteModalProps) => {
  const { setNotification, toggleModalDelete } = useContext(GlobalContext);
  const [password, setPassword] = useState("");
  const [visibility, toggleVisibility] = useState(false);

  const deleteAction = async () => {
    try {
      await API.delete(url, { data: { password } });
      toggleModalDelete("");
    } catch (err: any) {
      console.log(err.response.data.message);
      setNotification({ status: "error", message: err.response.data.message });
    }
  };
  return (
    <Modal title="Supprimer la">
      <ModalContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteAction();
          }}
        >
          <DeleteModalWrapper>
            <Body1>
              Cela supprimera définitivement <b>{name}</b>
            </Body1>

            <FormGroup>
              <LabelText>Votre mot de passe</LabelText>
              <InputContainer>
                <InputWrapper>
                  <Input
                    type={visibility ? "text" : "password"}
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  <InputIcon onClick={() => toggleVisibility(!visibility)}>
                    <Icon
                      icon={visibility ? "visibility_off" : "visibility"}
                      size="1.8rem"
                    />
                  </InputIcon>
                </InputWrapper>
              </InputContainer>
            </FormGroup>
          </DeleteModalWrapper>
          <input type="submit" style={{ display: "none" }} />
        </form>
      </ModalContent>
      <ModalActions>
        <Button type="submit" variant="danger" onClick={deleteAction}>
          Suprimmer
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default DeleteModal;
