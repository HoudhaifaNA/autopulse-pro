const formatPrice = (
  price: number = 0,
  currency: string,
  isBalance?: boolean
) => {
  let priceVal = price;
  if (isBalance) priceVal = Math.abs(price);
  if (currency === "euro" || currency === "UAE") currency = "€";
  let priceText = `${priceVal.toLocaleString()}.00 ${currency}`;

  if (isBalance) {
    if (price < 0) priceText += " _RD";
    if (price > 0) priceText += " _GR";
  }
  return priceText;
};

export default formatPrice;
