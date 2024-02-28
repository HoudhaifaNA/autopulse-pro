import styled from "styled-components";

export const Path = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PathSegment = styled.div`
  text-transform: capitalize;
  transform-origin: all 0.2s ease-in;
  padding: 1rem;
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
