import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";
import { ToasterWrapper } from "./ToasterStyle";

export interface ToasterProps {
  type: "success" | "error" | "warning";
  children: string;
}

const Toaster = ({ type, children }: ToasterProps) => {
  return (
    <ToasterWrapper $type={type}>
      <Icon icon={type} iconSize="2rem" />
      <Body2>{children}</Body2>
      <Icon icon="close" iconSize="2rem" />
    </ToasterWrapper>
  );
};

export default Toaster;
