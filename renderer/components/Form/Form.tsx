import { ComponentPropsWithoutRef, ReactNode } from "react";

import * as S from "components/Form/Form.styled";

interface FormProps extends ComponentPropsWithoutRef<"form"> {
  children: ReactNode;
}

const Form = ({ children, ...props }: FormProps) => {
  return (
    <S.Form {...props}>
      <S.FormContent>{children}</S.FormContent>
      <input type="submit" style={{ display: "none" }} />
    </S.Form>
  );
};

export default Form;
