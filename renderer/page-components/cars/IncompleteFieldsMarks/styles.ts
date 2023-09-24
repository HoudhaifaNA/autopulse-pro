import styled from "styled-components";

interface MarkProps {
  $color: "#ffa801" | "#f53b57" | "#00d8d6" | "#000000";
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
