import styled from "styled-components";

interface IconProps {
  icon: string;
  size: string;
}

const SvgWrapper = styled.svg<{ $size: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  fill: currentColor;
`;

const Icon = ({ icon, size }: IconProps) => {
  return (
    <SvgWrapper $size={size}>
      <use xlinkHref={`/sprite.svg#${icon}`} />;
    </SvgWrapper>
  );
};

export default Icon;
