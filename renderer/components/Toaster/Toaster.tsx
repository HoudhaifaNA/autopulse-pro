import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";
import { ToasterWrapper } from "./ToasterStyle";

export interface ToasterProps {
  type: "success" | "error" | "warning";
  children: string;
}

const Toaster = ({ children, type }: ToasterProps) => {
  return (
    <ToasterWrapper type={type}>
      <Icon icon={type} />
      <Body2>{children}</Body2>
      <Icon icon="close" />
    </ToasterWrapper>
  );
};

export default Toaster;
