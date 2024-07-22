import dayjs from "dayjs";
import { DateValue } from "@mantine/dates";

const dateToString = (date: Date | DateValue) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export default dateToString;
