import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import Icon from "components/Icon/Icon";
import * as S from "./styles";

import { NAVBAR_ITEMS } from "./constants";
import { NavbarItem } from "./types";
import { useDispatch } from "react-redux";
import { addModal } from "store/reducers/modals";

const renderNavItems = (items: NavbarItem[], isShort: boolean, currentPath: string) => {
  return items.map(({ name, icon, link }) => {
    let color = "#949494";
    if (link.includes("dashboard")) color = "#6A3599";
    if (link.includes("cars")) color = "#ffa801";
    if (link.includes("clients")) color = "#000000";
    if (link.includes("licences")) color = "#00d8d6";
    if (link.includes("expenses")) color = "#f53b57";
    if (link.includes("papers")) color = "#6D340B";
    if (link.includes("procurations")) color = "#DA0C91";
    if (link.includes("euro")) color = "#45A1E4";
    if (link.includes("dinar")) color = "#0BA350";
    if (link.includes("stock")) color = "#346272";
    if (link.includes("profile")) color = "#8D8D0B";

    const isActive = `${link}` === currentPath || `${link}.html` === currentPath;

    return (
      <S.NavbarItem key={name} $active={isActive} $short={isShort} $color={color}>
        <Link href={link}>
          <Icon icon={icon} size="2.4rem" />
          {!isShort && <span>{name}</span>}
        </Link>
      </S.NavbarItem>
    );
  });
};

const Navbar = () => {
  const [short, setShort] = useState(false);
  const { asPath } = useRouter();
  const dispatch = useDispatch();

  const addLogoutModal = () => dispatch(addModal({ name: "warning", title: "Déconnecter", type: "logout" }));

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
        <S.NavbarItem $active={true} $short={short} onClick={addLogoutModal} $color="#949494">
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
