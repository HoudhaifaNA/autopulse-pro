import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import Icon from "components/Icon/Icon";
import * as S from "./Navbar.styled";

import { NAVBAR_ITEMS } from "./constants";
import { NavbarItem } from "./types";

const renderNavItems = (items: NavbarItem[], short: boolean, currentPath: string) => {
  return items.map(({ name, icon, link }) => {
    const [isActive, setActive] = useState(false);

    useEffect(() => {
      // Check if active on normal path or html path when redirecting to a page on production
      const sameUrl =
        `${currentPath.split("/")[0]}${link}` === currentPath ||
        `${currentPath.split("/")[0]}${link}.html` === currentPath;
      setActive(sameUrl);
    }, [currentPath]);

    return (
      <S.NavbarItem key={name} $active={isActive} $short={short}>
        <Link href={link}>
          <Icon icon={icon} size="2.4rem" />
          {!short && <span>{name}</span>}
        </Link>
      </S.NavbarItem>
    );
  });
};

const Navbar = () => {
  const [short, setShort] = useState(false);
  const { asPath } = useRouter();

  return (
    <S.NavbarWrapper $short={short}>
      <S.LogoWrapper onClick={() => setShort(!short)}>
        <Image
          src={`${short ? "/images/short-logo.png" : "/images/logo.png"}`}
          alt="zauto logo"
          width={short ? 60 : 200}
          height={short ? 50 : 70}
        />
      </S.LogoWrapper>
      <S.MainNavbarList>{renderNavItems(NAVBAR_ITEMS, short, asPath)}</S.MainNavbarList>
      <S.SecondaryNavList>
        <S.NavbarItem $active={true} $short={short} onClick={() => {}}>
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
