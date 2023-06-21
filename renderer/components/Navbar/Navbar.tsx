import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import Icon from "components/Icon/Icon";
import * as S from "./Navbar.styled";
import { GlobalContext } from "pages/_app";

interface items {
  text: string;
  icon: string;
  link: string;
}

const NAVBAR_ITEMS: items[] = [
  // { text: "Tableau de bord", icon: "dashboard", link: "/dashboard" },
  { text: "Voitures", icon: "car", link: "/cars" },
  { text: "Clients", icon: "clients", link: "/clients" },
  { text: "Licences", icon: "document", link: "/licences" },
  { text: "Finances", icon: "finance", link: "/finances" },
  { text: "Dépenses", icon: "shopping", link: "/expenses" },
  { text: "Paramètres", icon: "account_settings", link: "/profile" },
];

const renderNavItems = (
  items: items[],
  short: boolean,
  currentPath: string
) => {
  return items.map(({ text, icon, link }) => {
    const [isActive, setActive] = useState(false);

    useEffect(() => {
      // Check if active on normal path or html path when redirecting to a page on production
      const sameUrl = link === currentPath || `${link}.html` === currentPath;
      setActive(sameUrl);
    }, [currentPath]);

    return (
      <S.NavbarItem key={text} $active={isActive} $short={short}>
        <Link href={link}>
          <Icon icon={icon} size="2.4rem" />
          {!short && <span>{text}</span>}
        </Link>
      </S.NavbarItem>
    );
  });
};

const Navbar = () => {
  const { setToLogout, toggleWarningModal } = useContext(GlobalContext);
  const [short, setShort] = useState(false);
  const { asPath } = useRouter();

  return (
    <S.NavbarWrapper $short={short}>
      <S.LogoWrapper onClick={() => setShort(!short)}>
        <Image src="/images/logo.png" alt="zauto logo" width={50} height={50} />
      </S.LogoWrapper>
      <S.MainNavbarList>
        {renderNavItems(NAVBAR_ITEMS, short, asPath)}
      </S.MainNavbarList>
      <S.SecondaryNavList>
        <S.NavbarItem
          $active={true}
          $short={short}
          onClick={() => {
            toggleWarningModal(true);
            setToLogout(true);
          }}
        >
          <div>
            <Icon icon="logout" size="2.4rem" />
            {!short && <span>Se déconnecter</span>}
          </div>
        </S.NavbarItem>
      </S.SecondaryNavList>
    </S.NavbarWrapper>
  );
};

export default Navbar;
