import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";
import { ToasterWrapper } from "./Toaster.styled";

export interface ToasterProps {
  type: "success" | "error" | "warning";
  children: string;
}

const Toaster = ({ type, children }: ToasterProps) => {
  return (
    <ToasterWrapper $type={type}>
      <Icon icon={type} size="2rem" />
      <Body2>{children}</Body2>
      <Icon icon="close" size="2rem" />
    </ToasterWrapper>
  );
};

export default Toaster;
