import { useState } from "react";

import * as S from "styles/profile/styles";
import { Heading3 } from "styles/Typography";
import Meta from "components/Meta/Meta";
import SideBar from "page-components/profile/SideBar";
import UpdatePasswordForm from "page-components/profile/UpdatePasswordForm";
import UserSettings from "page-components/profile/UserSettings";

import { useAppSelector } from "store";

const ProfilePage = () => {
  const { name } = useAppSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState<"settings" | "security">("settings");

  return (
    <S.ProfileWrapper>
      <Meta title="Paramètres de profil" />
      <S.ProfilePicture>
        <Heading3>{name || "--"} </Heading3>
      </S.ProfilePicture>
      <S.MainWrapper>
        <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <S.CurrentPage>
          {currentPage === "security" && <UpdatePasswordForm />}
          {currentPage === "settings" && <UserSettings />}
        </S.CurrentPage>
      </S.MainWrapper>
    </S.ProfileWrapper>
  );
};

export default ProfilePage;
