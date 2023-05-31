import * as S from "styles/ProfilePage.styled";
import { Heading4 } from "styles/Typography";

import UpdateUserForm from "components/UpdateUserForm/UpdateUserForm";

import Meta from "components/Meta/Meta";

const ProfilePage = () => {
  return (
    <S.ProfileWrapper>
      <Meta title="Paramètres de profil" />
      <S.ProfilePicture>
        <Heading4>Saber </Heading4>
      </S.ProfilePicture>
      <UpdateUserForm />
    </S.ProfileWrapper>
  );
};

export default ProfilePage;
