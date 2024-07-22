import styled, { css, keyframes } from "styled-components";

interface StyledNavbarProps {
  $short: boolean;
}

interface StyledNavbarItemProps extends StyledNavbarProps {
  $color: string;
  $active?: boolean;
}

const collapse = keyframes`
  0%{
    min-width: 23.5rem;
  }
  100%{
    min-width: 9rem;
  }
`;

export const NavbarWrapper = styled.div<StyledNavbarProps>`
  min-width: 23.5rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 0.1rem solid ${({ theme }) => theme.colors.neutral["300"]};
  animation: ${({ $short }) =>
    $short
      ? css`
          ${collapse} .1s linear forwards
        `
      : ""};

  overflow: auto;

  direction: rtl;
  ::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.5rem;
    left: 0;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #b3b3b3;
    border-radius: 0.5rem;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const MainNavbarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  direction: ltr;
`;

export const NavbarItem = styled.li<StyledNavbarItemProps>`
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary["50"] : theme.colors.white)};
  border-radius: 0.8rem;

  a,
  div {
    display: flex;
    align-items: center;
    justify-content: ${({ $short }) => ($short ? "center" : "flex-start")};
    gap: 1rem;
    text-decoration: none;
    padding: 1.2rem 1rem;
    color: ${({ theme, $active, $color }) => ($active && $color === "#949494" ? theme.colors.primary["500"] : $color)};
    outline: none;
    cursor: pointer;
  }

  span {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.6rem;
    letter-spacing: 0.0125em;
  }

  &:hover {
    background-color: ${({ theme, $active }) => (!$active ? theme.colors.neutral["50"] : "")};
  }
`;

export const MultiLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  gap: 1rem;
  span {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const SecondaryNavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  flex: 1;
  direction: ltr;

  ${NavbarItem} {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
