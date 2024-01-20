import styled from "styled-components";

export const PrintModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
  width: 60rem;
`;
export const PrintListConfig = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const PrintConfigItem = styled.div<{ $selected: boolean }>`
  position: relative;
  flex-basis: 16rem;
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-transform: capitalize;
  border: 0.2rem solid ${({ $selected, theme }) => ($selected ? theme.colors.primary[500] : theme.colors.neutral[300])};
  border-radius: 0.4rem;
  user-select: none;
  cursor: pointer;
`;
