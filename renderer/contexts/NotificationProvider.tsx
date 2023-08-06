import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface Notification {
  message: string;
  type: "success" | "error" | "warning";
}

export interface NotificationCtxType {
  notification: Notification | null;
  setNotification: Dispatch<SetStateAction<Notification | null>>;
}

export const NotificationCtx = createContext<NotificationCtxType | null>(null);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  return (
    <NotificationCtx.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationCtx.Provider>
  );
};

export default NotificationProvider;
