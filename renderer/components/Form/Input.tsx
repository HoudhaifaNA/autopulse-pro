import React from "react";
import { LabelText } from "styles/Typography";
import { FormGroup, InputStyle } from "./InputStyle";

const Input = () => {
  return (
    <FormGroup>
      <LabelText>Name:</LabelText>
      <InputStyle type="text" placeholder="Entrez votre nom" />
    </FormGroup>
  );
};

export default Input;
