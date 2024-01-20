import styled from "styled-components";

export const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  overflow-y: auto;
`;

export const Path = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PathSegment = styled.div`
  text-transform: capitalize;
  transform-origin: all 0.2s ease-in;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.primary["300"]};

  cursor: pointer;

  p {
    font-weight: 500;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary["50"]};
  }
`;

export const CardsList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  width: 80%;
`;

export const CardActions = styled.div`
  position: absolute;
  opacity: 0;
  visibility: hidden;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  transition: all 0.2s ease-in;
`;

export const Card = styled.div`
  position: relative;
  grid-column: span 1;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.primary["50"]};
  transition: all 0.1s ease-in;
  cursor: pointer;

  p {
    font-weight: 600;
    text-transform: capitalize;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};
  }

  &:hover ${CardActions} {
    visibility: visible;
    opacity: 1;
  }
`;
