import styled from "styled-components";

export const StatTicket = styled.div`
  display: flex;
  gap: 1rem;
  height: 9.2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.neutral["50"]};
  border-radius: 0.4rem;
`;

export const TicketIcon = styled.div`
  width: 5.2rem;
  height: 5.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  border-radius: 0.4rem;

  svg {
    fill: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const TicketContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.black};

  & p::first-letter {
    text-transform: capitalize;
  }
`;
