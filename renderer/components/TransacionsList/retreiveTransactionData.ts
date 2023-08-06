import dayjs from "dayjs";
import { Transaction } from "../../../interfaces";
import formatPrice from "utils/formatPrice";

const retreiveTransactionData = (
  transaction: Transaction,
  currency: string
) => {
  let { date, type, info1, info2, info3, info4, total } = transaction;

  date = dayjs(transaction.date).format("DD-MM-YYYY");
  if (type === "euros") info3 = formatPrice(Number(info3), "€");
  const totalText = formatPrice(Number(total), currency);

  return [date, info1, info2, info3, info4, totalText];
};

export default retreiveTransactionData;
