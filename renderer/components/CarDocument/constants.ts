const retreiveCarDetails = (car: any) => {
  const expenses = JSON.parse(car.expenses);

  const carPrice =
    car.type === "locale"
      ? {
          "prix ​​final": `${car.purchasingPrice.toLocaleString()}.00 DZD`,
        }
      : {
          "prix ​​d'achat": `€${car.costInEuros.toLocaleString()}.00`,
          "prix ​​de €100": `${car.euroPrice.toLocaleString()}.00 DZD`,
          "prix ​​final": `${car.purchasingPrice.toLocaleString()}.00 DZD`,
        };

  let carExpenses = {};
  expenses.forEach((exp: any) => {
    if (exp.type === "locale") {
      return (carExpenses = {
        ...carExpenses,
        [exp.id]: {
          raison: `${exp.raison}`,
          "coût ​​final": `${exp.totalCost.toLocaleString()}.00 DZD`,
        },
      });
    } else {
      return (carExpenses = {
        ...carExpenses,
        [exp.id]: {
          raison: `${exp.raison}`,
          "coût ​​en €": `${exp.euroCost}.00 DZD`,
          "prix ​​de €100": `${exp.euroPrice}.00 DZD`,
          "coût ​​final": `${exp.totalCost.toLocaleString()}.00 DZD`,
        },
      });
    }
  });

  const sellingDetails = car.buyer
    ? {
        acheteur: car.buyer,
        "prix ​​de vente": `${car.soldPrice.toLocaleString()}.00 DZD`,
      }
    : {};

  let profit = `${car.profit}.00 DZD`;
  if (car.profit < 0) profit += " _RD";
  if (car.profit > 0) profit += " _GR";

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
      },
    },
    {
      columns: 4,
      section: "Détails d'achat",
      details: {
        vendeur: car.seller,
        carPrice,
        licence: car.moudjahid,
        "prix ​​de la licence": `${car.licencePrice.toLocaleString()}.00 DZD`,
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
        "total des euros achetés": `€${car.totalEurosAmount.toLocaleString()}.00`,
        "total du prix d'achat": `${car.totalCost.toLocaleString()}.00 DZD`,
        intérêt: profit,
      },
    },
  ];
};

export default retreiveCarDetails;
