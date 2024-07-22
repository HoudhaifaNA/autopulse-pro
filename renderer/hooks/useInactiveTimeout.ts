import { useEffect } from "react";

import { useAppSelector } from "store";
import API from "utils/API";
import redirectToPath from "utils/convertPath";

const useInactiveTimeout = () => {
  const { inactiveTimeThreshold } = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const inactiveTimeThresholdInMilliseconds = 1000 * 60 * inactiveTimeThreshold;
    let timer: NodeJS.Timeout;

    const handleInactivity = async () => {
      await API.post("/users/logout");
      redirectToPath("/login");
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleInactivity, inactiveTimeThresholdInMilliseconds);
    };

    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("mouseup", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("keypress", resetTimer);
    document.addEventListener("keyup", resetTimer);

    return () => {
      document.removeEventListener("mousedown", resetTimer);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("mouseup", resetTimer);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("keypress", resetTimer);
      document.removeEventListener("keyup", resetTimer);
    };
  }, [inactiveTimeThreshold]);
};

export default useInactiveTimeout;
