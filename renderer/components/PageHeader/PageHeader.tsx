import Button from "components/Buttons/Button";
import { Heading3 } from "styles/Typography";
import { Wrapper } from "./PageHeader.styled";

interface PageHeaderProps {
  title: string;
  CTAText: string;
  CTAIcon: string;
  CTAonClick: () => void;
}

const PageHeader = (props: PageHeaderProps) => {
  const { title, CTAText, CTAIcon, CTAonClick } = props;
  return (
    <Wrapper>
      <Heading3>{title}</Heading3>
      <Button variant="primary" icon={CTAIcon} onClick={CTAonClick}>
        {CTAText}
      </Button>
    </Wrapper>
  );
};

export default PageHeader;
