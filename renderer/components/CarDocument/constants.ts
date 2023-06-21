const retreiveCarDetails = (car: any) => {
  const expenses = JSON.parse(car.expenses);

  const carPrice =
    car.type === "locale"
      ? {
          "prix ​​final": `${car.purchasingPrice.toLocaleString()}.00 DA`,
        }
      : {
          "prix ​​d'achat": `${car.costInEuros.toLocaleString()}.00 €`,
          "prix ​​de 100 €": `${car.euroPrice.toLocaleString()}.00 DA`,
          "prix ​​final": `${car.purchasingPrice.toLocaleString()}.00 DA`,
        };

  let carExpenses = {};
  expenses.forEach((exp: any) => {
    if (exp.type === "locale") {
      return (carExpenses = {
        ...carExpenses,
        [exp.id]: {
          raison: `${exp.raison}`,
          "coût ​​final": `${exp.totalCost.toLocaleString()}.00 DA`,
        },
      });
    } else {
      return (carExpenses = {
        ...carExpenses,
        [exp.id]: {
          raison: `${exp.raison}`,
          "coût ​​en €": `${exp.euroCost}.00 DA`,
          "prix ​​de 100 €": `${exp.euroPrice}.00 DA`,
          "coût ​​final": `${exp.totalCost.toLocaleString()}.00 DA`,
        },
      });
    }
  });

  const sellingDetails = car.buyer
    ? {
        acheteur: car.buyer,
        "prix ​​de vente": `${car.soldPrice.toLocaleString()}.00 DA`,
      }
    : {};

  let profit = `${car.profit}.00 DA`;
  if (car.profit < 0) profit += " _RD";
  if (car.profit > 0) profit += " _GR";
  const licencePrice =
    car.licencePrice > 0
      ? {
          "prix ​​de la licence": `${car.licencePrice.toLocaleString()}.00 DA`,
        }
      : "";
  return [
    {
      columns: 3,
      section: "Détails de la voiture",
      details: {
        voiture: car.name,
        "numéro de châssis": car.serialNumber,
        matricule: car.registrationNumber,
        couleur: car.color,
        année: car.year,
        clés: `${car.keys}`,
        kilométrage: `${car.mileage} Km`,
      },
    },
    {
      columns: 1,
      section: "Caractéristiques de la voiture",
      details: car.features ? { caractéristiques: car.features } : {},
    },
    {
      columns: 4,
      section: "Détails d'achat",
      details: {
        vendeur: car.seller,
        carPrice,
        Propriétaire: car.ownerName,
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
        "total des euros achetés": `${car.totalEurosAmount.toLocaleString()}.00 €`,
        "total du prix d'achat": `${car.totalCost.toLocaleString()}.00 DA`,
        intérêt: profit,
      },
    },
  ];
};

export default retreiveCarDetails;
