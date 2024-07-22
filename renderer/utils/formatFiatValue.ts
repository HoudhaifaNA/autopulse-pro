const formatFiatValue = (amount: number = 0, currency: "EUR" | "DZD", isBalance?: boolean, showSymbol?: boolean) => {
  let fiatValue = amount;

  const currencySymbol = currency === "EUR" ? "€" : "DA";
  let colorStatusTag = "";
  if (isBalance) {
    if (amount < 0) colorStatusTag = " _RD";
    if (amount > 0) colorStatusTag = " _GR";
  }

  if (isBalance && !showSymbol) {
    fiatValue = Math.abs(amount);
  }

  const fiatText = `${fiatValue.toLocaleString()}.00 ${currencySymbol} ${colorStatusTag}`;

  return fiatText;
};

export default formatFiatValue;
