import dayjs from "dayjs";
import formatPrice from "utils/formatPrice";

const retreiveCarDetails = (car: any) => {
  const {
    created_at,
    type,
    name,
    serialNumber,
    registrationNumber,
    secondRegistrationNumber,
    keys,
    mileage,
    color,
    year,
    purchasingPrice,
    costInEuros,
    euroPrice,
    seller,
    ownerName,
    totalExpensesCost,
    totalEurosAmount,
    totalCost,
    buyer,
    soldPrice,
    sold_date,
    given_keys,
    procuration,
    gray_card,
    folder,
    profit,
  } = car;

  const expenses = JSON.parse(car.expenses);
  let carPrice = "";
  let carEuroCalc = {},
    carExpenses = {},
    sellingDetails = {},
    licencePrice = {},
    features = {},
    selling_description = {};

  if (type === "locale") carPrice = formatPrice(purchasingPrice, "DA");
  if (type !== "locale") carPrice = formatPrice(costInEuros, "€");

  if (type !== "locale") {
    carEuroCalc = {
      "prix d'achat": formatPrice(costInEuros, "€"),
      "prix ​​de 100 €": formatPrice(euroPrice, "DA"),
      "prix ​​final": formatPrice(purchasingPrice, "DA"),
    };
  }

  if (Array.isArray(expenses)) {
    expenses.forEach((exp: any) => {
      const { id, type, raison, euroCost, totalCost } = exp;

      const abroadCost =
        type !== "locale"
          ? {
              "coût ​​en €": formatPrice(euroCost, "€"),
              "prix ​​de 100 €": formatPrice(euroPrice, "DA"),
            }
          : {};

      const currentExpense = {
        raison: `${raison}`,
        ...abroadCost,
        "coût ​​final": formatPrice(totalCost, "DA"),
      };

      return (carExpenses = { ...carExpenses, [id]: currentExpense });
    });
  }

  if (buyer) {
    sellingDetails = {
      "date ​​de vente": sold_date
        ? dayjs(sold_date).format("DD-MM-YYYY")
        : "TBD",
      "clés données": given_keys ? `${given_keys}` : "0",
      procuration: JSON.parse(procuration) ? "Oui" : "Non",
      "Cart grise": JSON.parse(gray_card) ? "Oui" : "Non",
      dossier: folder,
      acheteur: buyer,
      "prix ​​de vente": formatPrice(soldPrice, "DA"),
    };
  }

  if (car.features) features = { caractéristiques: car.features };
  if (car.selling_details) {
    selling_description = { Details: car.selling_details };
  }

  if (car.licencePrice > 0) {
    licencePrice = {
      "prix ​​de la licence": formatPrice(car.licencePrice, "DA"),
    };
  }

  let profitText = formatPrice(profit, "DA");

  if (profit < 0) profitText += " _RD";
  if (profit > 0) profitText += " _GR";

  return [
    {
      columns: 3,
      section: "Détails de la voiture",
      details: {
        voiture: name,
        "numéro de châssis": serialNumber,
        matricule: registrationNumber,
        "Deuxième matricule": secondRegistrationNumber,
        couleur: color,
        année: year,
        clés: `${keys}`,
        kilométrage: `${mileage} Km`,
        Propriétaire: ownerName,
      },
    },
    {
      columns: 1,
      section: "Caractéristiques de la voiture",
      details: features,
    },
    {
      columns: 3,
      section: "Détails d'achat",
      details: {
        "Date d'achat": dayjs(created_at).format("DD-MM-YYYY"),
        vendeur: seller,
        "prix d'achat": carPrice,
      },
    },
    {
      columns: 3,
      section: "Calcul de l'Euro",
      details: carEuroCalc,
    },
    {
      columns: 4,
      section: "Dépenses",
      details: { licencePrice, ...carExpenses },
    },

    {
      columns: 3,
      section: "Détails de la vente",
      details: sellingDetails,
    },
    {
      columns: 1,
      section: "Plus de détails sur la vente",
      details: selling_description,
    },
    {
      columns: 4,
      section: "Totaux",
      details: {
        "total des euros achetés": formatPrice(totalEurosAmount, "€"),
        "coût total des dépenses": formatPrice(totalExpensesCost, "DA"),
        "total du prix d'achat": formatPrice(totalCost, "DA"),
        intérêt: profitText,
      },
    },
  ];
};

export default retreiveCarDetails;
