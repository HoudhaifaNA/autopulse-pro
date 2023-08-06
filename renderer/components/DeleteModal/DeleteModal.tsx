import { useContext, useState } from "react";
import styled from "styled-components";
import { mutate } from "swr";

import {
  Input,
  InputContainer,
  InputIcon,
  InputWrapper,
} from "components/Input/InputContainer.styled";
import { FormGroup } from "components/Input/Input.styled";
import { Body1, LabelText } from "styles/Typography";

import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import Icon from "components/Icon/Icon";
import Button from "components/Button/Button";

import API from "utils/API";
import { GlobalContext } from "pages/_app";

interface DeleteModalProps {
  name: string;
  url: string;
  method?: "patch" | "delete";
}

const DeleteModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > div {
    width: 50%;
  }
`;

const DeleteModal = ({ name, url, method }: DeleteModalProps) => {
  const { setNotification, toggleModalDelete, setDocument } =
    useContext(GlobalContext);
  const [password, setPassword] = useState("");
  const [visibility, toggleVisibility] = useState(false);

  const deleteAction = async () => {
    let endpoint = `/${url.split("/")[1]}`;
    if (endpoint === "/transactions") endpoint = "/transactions/money";
    try {
      let apiMethod = method ?? "delete";
      const payload = method ? { password } : { data: { password } };
      //@ts-ignore
      await API[apiMethod](url, payload);
      mutate(endpoint);
      toggleModalDelete("");
      setDocument({ type: "", data: {} });
    } catch (err: any) {
      console.log(err.response.data.message);
      setNotification({ status: "error", message: err.response.data.message });
    }
  };

  return (
    <Modal title={method ? "Annuler la vente" : "Suprimmer"}>
      <ModalContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteAction();
          }}
        >
          <DeleteModalWrapper>
            {method ? (
              <Body1>
                Annuler la vente de <b>{name}</b>
              </Body1>
            ) : (
              <Body1>
                Cela supprimera définitivement <b>{name}</b>
              </Body1>
            )}

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
        <Button
          type="submit"
          variant={method ? "primary" : "danger"}
          onClick={deleteAction}
        >
          {method ? "Annuler la vente" : "Suprimmer"}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default DeleteModal;
