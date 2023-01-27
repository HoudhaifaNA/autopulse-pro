import styled from "styled-components";

interface IconProps {
  icon: string;
  iconSize: string;
}

const SvgWrapper = styled.svg<{ $iconSize: string }>`
  width: ${({ $iconSize }) => $iconSize};
  height: ${({ $iconSize }) => $iconSize};
  fill: currentColor;
`;

const Icon = ({ icon, iconSize }: IconProps) => {
  return (
    <SvgWrapper $iconSize={iconSize}>
      <use xlinkHref={`./sprite.svg#${icon}`} />;
    </SvgWrapper>
  );
};

export default Icon;
