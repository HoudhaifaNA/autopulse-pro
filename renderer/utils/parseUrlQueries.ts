const PARAMS_TRANSLATION: any = {
  productionYears: "Années de production",
  brand: "Marque",
  model: "Model",
  purchased_at: "Date d'achat",
  type: "Type",
  sold_at: "Date de vente",
  isLicenceInComplete: "Licence status",
  isPPInComplete: "Prix d'achat status",
  isExpenseCostInComplete: "Dépenses status",
  isSoldPriceInComplete: "Prix de vente status",
  isSold: "Vente de la voiture",
  purchase_price_eur: "Prix EUR",
  purchase_price_dzd: "Prix DZD",
  expense_cost: "Coût dépenses",
  total_cost: "Coût total",
  sold_price: "Prix de vente",
  profit: "Intérêt",
  last_transaction_date: "Date d. transaction",
  created_at: "Date de création",
  dzd_balance: "Sold DZD",
  eur_balance: "Sold EUR",
  expense_date: "Date de dépense",
  cost: "Coût total",
  transaction_date: "Date d. transaction",
  amount: "Montante",
  direction: "Direction",
  issue_date: "Date d'émission",
  received_at: "Date de livraison",
  price: "Prix",
  is_valid: "Validité",
  is_expirated: "Expiration",
  has_received: "Recu",
  date_range: "Date",
};

const parseUrlQueries = (url: string) => {
  const queryString = url.split("?")[1];

  const pairs = queryString.split("&");
  const queryParams: Record<string, { key: string; value: string }> = {};

  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    queryParams[key] = {
      key: PARAMS_TRANSLATION[key],
      value: decodeURIComponent(value.replace(/\+/g, " ")),
    };
  }

  return queryParams;
};

export default parseUrlQueries;
