import { toast } from "react-toastify";

import { Body2 } from "styles/Typography";

type NotificationType = "success" | "warn" | "error" | "info";

const notify = (type: NotificationType, message: string) => {
  toast[type](<Body2>{message}</Body2>, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default notify;
