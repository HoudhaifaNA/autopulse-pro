import styled from "styled-components";

interface SideBarItemProps {
  $isActive: boolean;
}

export const SideBar = styled.aside`
  flex-basis: 20%;
  height: 100%;
  border-right: 0.1rem solid ${({ theme }) => theme.colors.neutral["300"]};

  /* background-color: blue; */
`;

export const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
`;
export const SideBarItem = styled.li<SideBarItemProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary["500"] : theme.colors.neutral["700"])};
  cursor: pointer;
`;
