import styled from "styled-components";

export const TicketListWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  margin: 4rem 0;
  border-radius: 0.4rem;
`;

export const TicketListItems = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  gap: 2rem;

  & > a {
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.1);
    }
  }
`;
