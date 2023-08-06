import useCtx from "hooks/useCtx";
import { NotificationCtx } from "contexts/NotificationProvider";

const useNotificationCtx = () => {
  const ctx = useCtx(NotificationCtx);
  return ctx;
};

export default useNotificationCtx;
