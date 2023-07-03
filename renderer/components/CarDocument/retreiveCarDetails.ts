const formatPrice = (price: any, currency: string) => {
  return `${price.toLocaleString()}.00 ${currency}`;
};

const retreiveCarDetails = (car: any) => {
  const {
    type,
    name,
    serialNumber,
    registrationNumber,
    keys,
    mileage,
    color,
    year,
    purchasingPrice,
    costInEuros,
    euroPrice,
    seller,
    ownerName,
    totalEurosAmount,
    totalCost,
    buyer,
    soldPrice,
  } = car;

  let carPrice = {},
    carExpenses = {},
    sellingDetails = {},
    licencePrice = {},
    features = {};
  const expenses = JSON.parse(car.expenses);

  if (type === "locale") {
    carPrice = { "prix ​​final": formatPrice(purchasingPrice, "DA") };
  } else {
    carPrice = {
      "prix ​​d'achat": formatPrice(costInEuros, "€"),
      "prix ​​de 100 €": formatPrice(euroPrice, "DA"),
      "prix ​​final": formatPrice(purchasingPrice, "DA"),
    };
  }

  expenses.forEach((exp: any) => {
    if (exp.type === "locale") {
      return (carExpenses = {
        ...carExpenses,
        [exp.id]: {
          raison: `${exp.raison}`,
          "coût ​​final": formatPrice(exp.totalCost, "DA"),
        },
      });
    } else {
      return (carExpenses = {
        ...carExpenses,
        [exp.id]: {
          raison: `${exp.raison}`,
          "coût ​​en €": formatPrice(exp.euroCost, "€"),
          "prix ​​de 100 €": formatPrice(exp.euroPrice, "DA"),
          "coût ​​final": formatPrice(exp.totalCost, "DA"),
        },
      });
    }
  });

  if (buyer) {
    sellingDetails = {
      acheteur: buyer,
      "prix ​​de vente": formatPrice(soldPrice, "DA"),
    };
  }

  if (car.features) {
    features = { caractéristiques: car.features };
  }

  if (car.licencePrice > 0) {
    licencePrice = {
      "prix ​​de la licence": formatPrice(car.licencePrice, "DA"),
    };
  }

  let profit = formatPrice(car.profit, "DA");
  if (car.profit < 0) profit += " _RD";
  if (car.profit > 0) profit += " _GR";

  return [
    {
      columns: 3,
      section: "Détails de la voiture",
      details: {
        voiture: name,
        "numéro de châssis": serialNumber,
        matricule: registrationNumber,
        couleur: color,
        année: year,
        clés: `${keys}`,
        kilométrage: `${mileage} Km`,
      },
    },
    {
      columns: 1,
      section: "Caractéristiques de la voiture",
      details: features,
    },
    {
      columns: 4,
      section: "Détails d'achat",
      details: {
        vendeur: seller,
        carPrice,
        Propriétaire: ownerName,
        ...licencePrice,
      },
    },
    {
      columns: 4,
      section: "Dépenses",
      details: carExpenses,
    },

    {
      columns: 4,
      section: "Détails de la vente",
      details: sellingDetails,
    },
    {
      columns: 4,
      section: "Totaux",
      details: {
        "total des euros achetés": formatPrice(totalEurosAmount, "€"),
        "total du prix d'achat": formatPrice(totalCost, "DA"),
        intérêt: profit,
      },
    },
  ];
};

export default retreiveCarDetails;
