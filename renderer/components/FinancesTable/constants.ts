export const TRANSACTIONS_HEADER = [
  { text: "Date", sortable: true },
  { text: "Client", sortable: true },
  { text: "Méthode", sortable: false },
  { text: "Direction", sortable: false },
  { text: "Montant", sortable: true },
];

export const EUROS_TRANSFERS_HEADER = [
  { text: "Date", sortable: true },
  { text: "Client", sortable: true },
  { text: "Méthode", sortable: false },
  { text: "Direction", sortable: false },
  { text: "Montant des euros", sortable: true },
  { text: "Prix de €100", sortable: true },
  { text: "Total", sortable: true },
];

export const HEADERS = {
  transactions: TRANSACTIONS_HEADER,
  "virements des euros": EUROS_TRANSFERS_HEADER,
};
