import useSWR from "swr";

import { fetcher } from "utils/API";
import redirectToPath from "utils/convertPath";

interface UserResponse {
  user: {
    username: string;
  };
}

const useCurrentUser = () => {
  const { data, error } = useSWR<UserResponse>(`/users/getMe`, fetcher);

  if (error) {
    if (error?.response?.status === 401) {
      redirectToPath("/login");
    }
  }

  return data?.user.username;
};

export default useCurrentUser;
