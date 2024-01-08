import { ReactNode } from "react";

import * as S from "./styles";
import Button from "components/Button/Button";

interface PageHeaderProps {
  CTAText?: string;
  CTAIcon?: string;
  onCTAClick?: () => void;
  children?: ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  const { CTAText, CTAIcon, onCTAClick, children } = props;

  const renderCTABtn = () => {
    if (CTAText && onCTAClick) {
      return (
        <Button variant="primary" icon={CTAIcon} onClick={onCTAClick}>
          {CTAText}
        </Button>
      );
    }
  };

  return (
    <S.Wrapper>
      <S.HeaderActionsWrapper>{children}</S.HeaderActionsWrapper>
      {renderCTABtn()}
    </S.Wrapper>
  );
};

export default PageHeader;
