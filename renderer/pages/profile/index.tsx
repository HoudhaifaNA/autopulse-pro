import useSWR from "swr";

import * as S from "styles/ProfilePage.styled";
import { Heading4 } from "styles/Typography";

import UpdateUserForm from "components/UpdateUserForm/UpdateUserForm";

import Meta from "components/Meta/Meta";
import { fetcher } from "utils/API";

const ProfilePage = () => {
  const { data, isLoading } = useSWR("/users/getMe", fetcher);
  let username = "";
  if (isLoading) username = "...";
  if (data) username = data.user.username;

  return (
    <S.ProfileWrapper>
      <Meta title="Paramètres de profil" />
      <S.ProfilePicture>
        <Heading4>{username} </Heading4>
      </S.ProfilePicture>
      <UpdateUserForm username={username} />
    </S.ProfileWrapper>
  );
};

export default ProfilePage;
