import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "components/Icon/Icon";
import * as S from "./Navbar.styled";

interface items {
  text: string;
  icon: string;
  link: string;
  active?: boolean;
}

const NAVBAR_ITEMS: items[] = [
  { text: "Tableau de bord", icon: "dashboard", link: "/" },
  { text: "Voitures", icon: "car", link: "/voitures" },
  { text: "Clients", icon: "clients", link: "/clients", active: true },
  { text: "Licences", icon: "document", link: "/licences" },
  { text: "Finance", icon: "finance", link: "/finance" },
  { text: "Paramètres", icon: "setting", link: "/paramètres" },
];

const renderNavItems = (items: items[], short: boolean) => {
  return items.map(({ text, icon, link, active }) => {
    return (
      <S.NavbarItem key={text} $active={active} $short={short}>
        <Link href={link}>
          <Icon icon={icon} iconSize="2.4rem" />
          {!short && <span>{text}</span>}
        </Link>
      </S.NavbarItem>
    );
  });
};

const Navbar = () => {
  const [short, setShort] = useState(false);

  return (
    <S.NavbarWrapper $short={short}>
      <S.LogoWrapper onClick={() => setShort(!short)}>
        <Image src="/images/logo.png" alt="zauto logo" width={50} height={50} />
      </S.LogoWrapper>
      <S.MainNavbarList>{renderNavItems(NAVBAR_ITEMS, short)}</S.MainNavbarList>
      <S.SecondaryNavList>
        <S.NavbarItem $active={true} $short={short}>
          <Link href={"/logout"}>
            <Icon icon="logout" iconSize="2.4rem" />
            {!short && <span>Se déconnecter</span>}
          </Link>
        </S.NavbarItem>
      </S.SecondaryNavList>
    </S.NavbarWrapper>
  );
};

export default Navbar;
