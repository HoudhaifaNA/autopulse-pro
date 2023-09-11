import styled from "styled-components";

interface MarkProps {
  $color: "#bd0000" | "#2300bd" | "#00bd8b" | "#f2b416";
}

export const MarksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Mark = styled.div<MarkProps>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;
