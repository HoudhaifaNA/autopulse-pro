import styled from "styled-components";

interface BlackOverlayProps {
  $zIndexMultiplier: number;
}

const BlackOverlay = styled.div<BlackOverlayProps>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${({ $zIndexMultiplier }) => $zIndexMultiplier * 4999};
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
`;

export default BlackOverlay;
